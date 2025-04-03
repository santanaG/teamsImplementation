import axios from 'axios'

export default body => axios.post(
  `https://${process.env.FS_DOMAIN}.freshservice.com/api/v2/tickets`,
  {
    subject: `${body.fullName} opened a ticket via Teams Chat`,
    description: body.slots.summary,
    email: body.email,
    priority: 1,
    status: 2,
    group_id: 23000293321,  //IT Service
    channel: 'chat',
    type: 'incident'
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
