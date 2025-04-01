import { describe, it, expect, vi, beforeEach } from 'vitest'
import sendToTeams from '../messages/requests/teams.js'
import axios from 'axios'
import teamsEndpoint from '../messages/utilities/teamsEndpoint.js'
import requestToResponse from '../messages/utilities/requestToResponse.js'
import formatAxiosError from '../messages/utilities/formatAxiosError.js'

vi.mock('axios')
vi.mock('../messages/utilities/teamsEndpoint.js')
vi.mock('../messages/utilities/requestToResponse.js')
vi.mock('../messages/utilities/formatAxiosError.js')

describe('sendToTeams', () => {
  const data = {
    serviceUrl: 'https://service.botframework.com',
    conversation: { id: 'abc123' }
  }
  const token = 'Bearer xyz'
  const text = 'Hello world'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('sends a formatted Teams message using axios', async () => {
    teamsEndpoint.mockReturnValue('https://api/endpoint')
    requestToResponse.mockReturnValue({ type: 'message', text })
    axios.post.mockResolvedValue({ status: 200 })

    const result = await sendToTeams(data, token)(text)

    expect(teamsEndpoint).toHaveBeenCalledWith(data.serviceUrl, data.conversation.id)
    expect(requestToResponse).toHaveBeenCalledWith(data, text)
    expect(axios.post).toHaveBeenCalledWith(
      'https://api/endpoint',
      { type: 'message', text },
      { headers: { Authorization: token } }
    )
    expect(result).toEqual({ status: 200 })
  })

  it('handles axios error with custom formatter', async () => {
    const error = new Error('Request failed')
    const formatted = new Error('Formatted error')
    axios.post.mockRejectedValue(error)
    formatAxiosError.mockReturnValue(formatted)

    await expect(sendToTeams(data, token)(text)).rejects.toThrow(formatted)

    expect(formatAxiosError).toHaveBeenCalledWith(error, 'Teams API request')
  })
})
