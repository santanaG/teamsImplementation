export default cases => (key, member, ...rest) => Promise.all([
  cases[key],
  cases['default'],
  Object.assign(new Error(
    `No match case for ${key} key in member expression ${member}`),
    { status: 500 }
  )
])
  .then(([func, base, error]) => {
    if (typeof func == 'function') return func(...rest)
    if (typeof base == 'function') return base(...rest)
    
    return Promise.reject(error)
  })