import match from './match.js'

export default block => match({
  text: () => block.payload.message,
  choice: () => block.payload.choices.join('\n'),
  image: () => `[Image: ${block.payload.image}]`,
  audio: () => `[Audio: ${block.payload.audio}]`,
  video: () => `[Video: ${block.payload.video}]`,
  card: () => `**${block.payload.title}**\n${block.payload.subtitle}\n[Image: ${block.payload.image}]`,
  end: () => '', // optional: indicate conversation ended
  default: () => `[Unhandled Block Type: ${block.type}]`
})(block.type)
