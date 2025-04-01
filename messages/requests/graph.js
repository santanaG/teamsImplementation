import axios from 'axios'
import formatAxiosError from '../utilities/formatAxiosError.js'

export default (aadObjectId, Authorization) => axios.get(
  `https://graph.microsoft.com/v1.0/users/${aadObjectId}`,
  { headers: { Authorization } }
)
  .catch(error => Promise.reject(formatAxiosError(error, 'Graph API request')))
  .then(({ data }) => ({
    fullName: data.displayName,
    email: data.mail || data.userPrincipalName,
    title: data.jobTitle,
    department: data.department
  }))
