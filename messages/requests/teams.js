import axios from 'axios'
import teamsEndpoint from '../utilities/teamsEndpoint.js'
import requestToResponse from '../utilities/requestToResponse.js'
import formatAxiosError from '../utilities/formatAxiosError.js'

export default (data, Authorization) => text => axios.post(
  teamsEndpoint(data.serviceUrl, data.conversation.id),
  requestToResponse(data, text),
  { headers: { Authorization } }
)
  .catch(error => Promise.reject(formatAxiosError(error, 'Teams API request')))