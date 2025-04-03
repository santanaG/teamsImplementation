import auth from './requests/auth.js'
import formatError from './utilities/formatError.js'
import graph from './requests/graph.js'
import voiceflow from './requests/voiceflow.js'
import buildPayload from './utilities/buildPayload.js'
import teams from './requests/teams.js'

export default body => Promise.all(auth())
  .catch(formatError)
  .then(([graphToken, botToken]) => graph(body.from.aadObjectId, graphToken)
    .then(contextVars => [buildPayload(body.text, contextVars), botToken]))
  .then(([payload, botToken]) => voiceflow(body.from.id, payload)
    .then(teams(body, botToken)))
  .then(() => ({ status: 200, body: 'Message sent to Teams successfully' }))