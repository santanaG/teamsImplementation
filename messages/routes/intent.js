import match from '../utilities/match.js'
import accessMailbox from '../handlers/accessMailbox.js'
import forwardRequest from '../handlers/forwardRequest.js'
import incidentReport from '../handlers/incidentReport.js'
import manageDistro from '../handlers/manageDistro.js'
import openTicket from '../handlers/openTicket.js'
import provisionGroup from '../handlers/ProvisionGroup.js'
import provisionApp from '../handlers/provisionApp.js'
import resetPassword from '../handlers/resetPassword.js'

export default body => match({
  accessMailbox,
  forwardRequest,
  incidentReport,
  manageDistro,
  openTicket,
  provisionApp,
  provisionGroup,
  resetPassword,
  default: () => Promise.reject(Object.assign(new Error(`Unknown intent: ${body.intent}`), { status: 400 }))
})(body.intent, 'Intent', body)
.then(() => ({ status: 200, body: 'Ticket opened successfully' }))
