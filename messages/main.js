import 'dotenv/config'
import match from './utilities/match.js'
import auth from './requests/auth.js'
import formatError from './utilities/formatError.js'
import graph from './requests/graph.js'
import voiceflow from './requests/voiceflow.js'
import buildPayload from './utilities/buildPayload.js'
import teams from './requests/teams.js'

export const main = (context, request) => match({

  POST: () => Promise.all(auth())
    .catch(formatError)
    .then(([graphToken, botToken]) => graph(request.body.from.aadObjectId, graphToken)
      .then(contextVars => [buildPayload(request.body.text, contextVars), botToken]))
    .then(([payload, botToken]) => voiceflow(request.body.from.id, payload)
      .then(teams(request.body, botToken))),

  base: () => Promise.reject({ status: 405, body: 'Only POST allowed' })

})(request.method)
  .then(() => Object.assign(context.res, {
    status: 200,
    body: 'Message sent to Teams successfully'
  }))
  .catch(error => Object.assign(context.res, error) && context.log.error(error))
