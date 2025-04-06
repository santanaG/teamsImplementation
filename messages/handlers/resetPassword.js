import axios from 'axios'

export default body => axios.post(
  `https://${process.env.FS_DOMAIN}.freshservice.com/api/v2/tickets`,
  {
    subject: `${body.fullName} requesting a Password Reset via Teams Chat`,
    description: `Reset Password for: ${body.slots.requestedForName}`,
    email: body.email,
    priority: 3, // Important
    status: 2, // Open
    group_id: 23000293321,  //IT Service
    source: 4,
    type: 'Incident'
  },
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${
        Buffer.from(`${process.env.FS_API_KEY}:X`).toString('base64')
      }`
    }
  }
)
