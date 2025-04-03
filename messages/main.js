import 'dotenv/config'
import match from './utilities/match.js'
import message from './routes/message.js'
import intent from './routes/intent.js'

export const main = (context, request) => match({
  POST: match({
    message: message(request.body),
    intent: intent(request.body),
    default: Promise.reject({ status: 400, body: `Unknown case: ${request.body.type}` })
  })(request.body.type, 'Type'),
  default: Promise.reject({ status: 405, body: `Unsupported method: ${request.method}` })
})(request.method, 'Method')
  .then(response => Object.assign(context.res, response) && context.log(response))
  .catch(error => Object.assign(context.res, error) && context.error(error))
