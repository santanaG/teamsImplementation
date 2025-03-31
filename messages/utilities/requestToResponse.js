export default (request, text) => ({
  type: 'message',
  from: request.body.recipient,
  conversation: { id: request.body.conversation.id },
  recipient: request.body.from,
  text,
  textFormat: request.body.textFormat || 'plain'
})