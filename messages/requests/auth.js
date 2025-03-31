import axios from 'axios'
import formatAxiosError from '../utilities/formatAxiosError.js'

const createOAuthForm = scope => Object.entries({
  client_id: process.env.AZURE_APP_CLIENT_ID,
  client_secret: process.env.AZURE_APP_CLIENT_SECRET,
  grant_type: 'client_credentials',
  scope
})
  .reduce((form, entry) => form.append(...entry) || form, new URLSearchParams())

const requestBotToken = () => axios.post(
  'https://login.microsoftonline.com/botframework.com/oauth2/v2.0/token',
  createOAuthForm('https://api.botframework.com/.default'),
  { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
)
.catch(error => Promise.reject(formatAxiosError(error, 'Bot token request')))

const requestGraphToken = () => axios.post(
  'https://login.microsoftonline.com/organizations/oauth2/v2.0/token',
  createOAuthForm('https://graph.microsoft.com/.default'),
  { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
)
  .catch(error => Promise.reject(formatAxiosError(error, 'Graph token request')))

export default () => [requestGraphToken, requestBotToken].map(f => f())
