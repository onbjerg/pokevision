# Pokévision

This is a small client for [Pokévision](https://pokevision.com) in Node.js.

## Installation

```
npm i --save pokevision
```

## Usage

```js
import scan from 'pokevision'

const lat = -33.870958946626885
const lng = 151.21347069740295

// This will create a scan request, i.e. it will generate fresh data.
// If you want to get data from recent scans (i.e. from areas where people
// most likely are scanning all the time anyway), then you can use `fetch`
// which has the same function signature.
// Optionally pass a third `filter` parameter, which is a whitelist
// array of Pokémon IDs (as displayed in the Pokédex).
scan(lat, lng)
  .then(({ status, pokemon }) => {
    console.log(`Pokemon at ${lat}, ${lng}`, pokemon)
  })
  .catch((err) => {
    // Catch any errors (e.g. throttled requests)
    console.error(err)
  })
```

Check out more examples [here](/examples).
