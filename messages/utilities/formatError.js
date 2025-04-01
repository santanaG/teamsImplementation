export default error => Promise.reject({
    status: error?.status || 500,
    body: error?.body || error?.message || String(error) || 'Unhandled error'
  })