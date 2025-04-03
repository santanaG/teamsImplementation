import axios from 'axios'
import formatAxiosError from '../utilities/formatAxiosError.js'
import formatBlock from '../utilities/formatBlock.js'

export default (userId, payload) => axios.post(
  `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
  payload,
  { headers: { Authorization: process.env.VF_API_KEY } }
)
  .catch(error => Promise.reject(formatAxiosError(error, 'Voiceflow request')))
  .then(response => response.data
    .map(formatBlock)
    .filter(Boolean)
    .join('\n\n') || '[No response from Voiceflow]'
  )