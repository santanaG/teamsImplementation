import axios from 'axios'

export default body => axios.post(
  `https://${process.env.FS_DOMAIN}.freshservice.com/api/v2/tickets`,
  {
    subject: `${body.fullName} reported an incident via Teams Chat`,
    description: body.slots.summary,
    email: body.email,
    priority: 3,
    status: 2,
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
