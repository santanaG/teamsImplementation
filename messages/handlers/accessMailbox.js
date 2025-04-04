import axios from 'axios'

export default body => axios.post(
  `https://${process.env.FS_DOMAIN}.com/api/v2/service_catalog/items/70/place_request`,
  {
    description: '',
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
