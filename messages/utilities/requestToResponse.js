export default ({ recipient, conversation, from, textFormat }, text) => ({
  type: 'message',
  from: recipient,
  conversation: { id: conversation.id },
  recipient: from,
  text,
  textFormat: textFormat || 'plain'
})