export default context => error => {
  Object.assign(context.res, {
    status: error?.status || 500,
    body: error?.body || error?.message || String(error) || 'Unhandled error'
  })
}