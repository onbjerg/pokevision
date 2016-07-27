# Pokévision

This is a small client for [Pokévision](https://pokevision.com) in Node.js.

## Installation

```
npm i --save pokevision
```

## Usage

```js
import pokevision from 'pokevision'

const lat = -33.870958946626885
const lng = 151.21347069740295

// Optionally pass a third `filter` parameter, which is a whitelist
// array of Pokémon IDs (as displayed in the Pokédex).
pokevision(lat, lng)
  .then(({ status, pokemon }) => {
    console.log(`Pokemon at ${lat}, ${lng}`, pokemon)
  })
  .catch((err) => {
    // Catch any errors (e.g. throttled requests)
    console.error(err)
  })
```

Check out more examples [here](/examples).
