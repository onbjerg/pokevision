import pokevision from '../src'

pokevision(-33.870958946626885, 151.21347069740295, [41])
  .then(({ status, pokemon }) => console.log(status, pokemon))
  .catch((err) => console.error(err))
