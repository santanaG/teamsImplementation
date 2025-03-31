import 'dotenv/config'
import axios from 'axios'

const match = cases => key => (cases[key] ?? cases['default'] ?? (() => ''))()

const formatBlock = block => match({
  text: () => block.payload.message,
  end: () => '',
  choice: () => block.payload.choices.join('\n'),
  default: () => 'Unhandled Block Type',
})(block.type)

const buildPayload = payload => ({
  action: { type: 'text', payload },
  config: {
    tts: false,
    stripSSML: true,
    stopAll: false,
    excludeTypes: ['block', 'debug', 'flow'],
  }
})

const transformRequestToResponse = (req, text) => ({
  type: 'message',
  from: req.body.recipient,
  conversation: { id: req.body.conversation.id },
  recipient: req.body.from,
  text,
  textFormat: req.body.textFormat || 'plain'
})

const buildTeamsEndpoint = ({
  serviceUrl, conversation
}) => `${serviceUrl.replace(/\/$/, '')}/v3/conversations/${conversation.id}/activities`

const oAuthForm = () => {
  const form = new URLSearchParams()
  form.append('client_id', process.env.BOT_CLIENT_ID)
  form.append('client_secret', process.env.BOT_CLIENT_SECRET)
  form.append('grant_type', 'client_credentials')
  form.append('scope', 'https://api.botframework.com/.default')
  return form
}

const getBotAccessToken = ({ data }) => axios.post(
  'https://login.microsoftonline.com/botframework.com/oauth2/v2.0/token',
  oAuthForm(),
  { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
).then(({ data: data2 }) => [
  `${data2.token_type} ${data2.access_token}`,
  data
    .filter(block => ['text', 'choice'].includes(block.type))
    .map(formatBlock)
    .join('\n\n') || '[No response from Voiceflow]'
])

export const run = (context, req) => match({
  POST: () => axios.post(
    `https://general-runtime.voiceflow.com/state/user/${req.body.from.id}/interact`,
    buildPayload(req.body.text),
    { headers: { Authorization: process.env.VOICEFLOW_API_KEY } }
  )
  .then(getBotAccessToken)
  .then(([authenticationValue, voiceflowText]) => {
    const responsePayload = transformRequestToResponse(req, voiceflowText)
    const endpoint = buildTeamsEndpoint(req.body)
    return axios.post(
      endpoint,
      responsePayload,
      { headers: { Authorization: authenticationValue } }
    )
  })
  .then(() => {
    Object.assign(context.res, {
      status: 200,
      body: 'Message sent to Teams successfully'
    })
  })
  .catch(err => Object.assign(context.res, {
    status: 500, body: `Error forwarding to Voiceflow: ${err.message}`
  })),
  default: () => Object.assign(context.res, { status: 405, body: 'Only POST allowed' })
})(req.method)
