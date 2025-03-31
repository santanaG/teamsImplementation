export default (error, label) => ({
  status: error?.response?.status || 500,
  body: `${label} failed: ${
    error?.response?.data?.error_description || error.message || 'Unhandled error'
  }`
})
