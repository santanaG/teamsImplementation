import auth from './requests/auth.js'
import formatError from './utilities/formatError.js'
import graph from './requests/graph.js'
import voiceflow from './requests/voiceflow.js'
import buildPayload from './utilities/buildPayload.js'
import teams from './requests/teams.js'

export default request => Promise.all(auth())
  .catch(formatError)
  .then(([graphToken, botToken]) => graph(request.body.from.aadObjectId, graphToken)
    .then(contextVars => [buildPayload(request.body.text, contextVars), botToken]))
  .then(([payload, botToken]) => voiceflow(request.body.from.id, payload)
    .then(teams(request.body, botToken)))