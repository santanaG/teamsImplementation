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
  accessMailbox: accessMailbox(body),
  forwardRequest: forwardRequest(body),
  incidentReport: incidentReport(body),
  manageDistro: manageDistro(body),
  openTicket: openTicket(body),
  provisionApp: provisionApp(body),
  provisionGroup: provisionGroup(body),
  resetPassword: resetPassword(body),
  default: Promise.reject({ status: 400, body: `Unknown intent: ${body.intent}` })
})(body.intent, 'Intent')
