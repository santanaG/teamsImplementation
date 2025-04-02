import 'dotenv/config'
import match from './utilities/match.js'
import message from './routes/message.js'

export const main = (context, request) => match({
  POST: () => match({
    message: message(request),
    voiceflow: () => Promise.reject({ status: 501, body: 'Not Implemented' }),
    freshservice: () => Promise.reject({ status: 501, body: 'Not Implemented' }),
    default: () => Promise.reject({ status: 400, body: `Unknown case: ${request.body.type}` })
  })(request.body.type),
  default: () => Promise.reject({ status: 405, body: 'Only POST allowed' })
})(request.method)
  .then(() => Object.assign(context.res, {
    status: 200,
    body: 'Message sent to Teams successfully'
  }))
  .catch(error => Object.assign(context.res, error) && context.log.error(error))
