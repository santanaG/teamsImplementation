export default (url, id) => `${url.replace(/\/$/, '')}/v3/conversations/${id}/activities`
