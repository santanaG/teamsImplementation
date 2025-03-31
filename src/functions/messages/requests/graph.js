import axios from "axios"

export default (aadObjectId, token) => axios.get(
  `https://graph.microsoft.com/v1.0/users/${aadObjectId}`,
  { headers: { Authorization: `Bearer ${token}` } }
)
  .catch(error => Promise.reject(formatAxiosError(error, 'Graph API request')))
  .then(res => ({
    fullName: res.data.displayName,
    email: res.data.mail || res.data.userPrincipalName,
    title: res.data.jobTitle,
    department: res.data.department
  }))
