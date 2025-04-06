!process.env.WEBSITE_INSTANCE_ID && await import('dotenv/config')
import match from './utilities/match.js'
import message from './routes/message.js'
import intent from './routes/intent.js'

export const main = (context, request) => match({
  POST: () => match({
    message,
    intent,
    default: () => Promise.reject(Object.assign(
      new Error(`Unknown case: ${request.body.type}`), { status: 400 }
    ))
  })(request.body.type, 'Type', request.body),
  default: () => Promise.reject(Object.assign(
    new Error(`Unsupported method: ${request.method}`), { status: 405 }
  ))
})(request.method, 'Method')
  .then(response => Object.assign(context.res, response) && context.log(response))
  .catch(error => Object.assign(context.res, error) && context.log.error(error))
