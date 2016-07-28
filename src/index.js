import axios from 'axios'
import promiseRetry from 'promise-retry'

const baseURI = 'https://pokevision.com/map'

/**
 * Fetches map data. Does _not_ scan the area, only fetches readily available
 * data from the Pokevision API (i.e. data from recent scans).
 *
 * @param  {Number} lat
 * @param  {Number} lng
 * @param  {Array} filter = null
 * @param  {String} jobId = null
 * @return {Promise}
 */
export const fetch = (lat, lng, filter = null, jobId = null) => {
  return axios.get(`${baseURI}/data/${lat}/${lng}/${jobId}`).then((res) => {
    let {
      status,
      jobStatus,
      pokemon
    } = res.data

    // If the job is still running we will throw this error
    // which will prompt the promise to retry
    if (jobStatus && jobStatus === 'in_progress') {
      throw new Error('Job is in progress, retrying')
    }

    // Filter the Pokémon by their Pokedex ID if a filter is specified
    if (filter !== null) {
      pokemon = pokemon.filter((p) => filter.indexOf(p.pokemonId) !== -1)
    }

    return {
      status,
      pokemon
    }
  })
}

/**
 * Scans the area for new Pokémon and fetches the map data when the scan
 * is complete.
 *
 * @param  {Number} lat
 * @param  {Number} lng
 * @param  {Array} filter = null
 * @return {Promise}
 */
const scan = (lat, lng, filter = null) => {
  return axios.get(`${baseURI}/scan/${lat}/${lng}`).then((res) => {
    let {
      status,
      message,
      jobId
    } = res.data

    // Check if the HTTP request was succesful
    if (res.status !== 200) {
      throw new Error('Could not reach Pokevision')
    }

    // Check if Pokevision throttled us or similar
    if (status === 'error') {
      if (message === '{scan-throttle}') {
        throw new Error('Scan throttled')
      }
      throw new Error('Could not scan. Maybe Pokevision is down?')
    }

    // Fetch the map data from the job we created
    return promiseRetry((retry, tries) => {
      return fetch(lat, lng, filter, jobId).catch((err) => retry(err))
    })
  })
}
export default scan
