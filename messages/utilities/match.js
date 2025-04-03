export default cases => (key, member) => Promise.resolve(
  cases[key] ??
  cases['default'] ??
  Promise.reject({
    status: 500,
    body: `No match case for ${key} key in member expression ${member}`
  })
)
