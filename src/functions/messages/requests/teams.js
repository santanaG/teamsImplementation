import axios from 'axios'
import teamsEndpoint from '../utilities/teamsEndpoint.js'
import requestToResponse from '../utilities/requestToResponse.js'
import formatAxiosError from '../utilities/formatAxiosError.js'

export default (request, token) => text => axios.post(
  teamsEndpoint(request.body),
  requestToResponse(request, text),
  { headers: { Authorization: token } }
)
  .catch(error => Promise.reject(formatAxiosError(error, 'Graph API request')))