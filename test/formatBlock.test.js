import { describe, it, expect } from 'vitest'
import formatBlock from '../messages/utilities/formatBlock.js'
import block from './blockExamples.js'

const result = {
  text: 'Hello, this is a text message.',
  choice: 'Option 1\nOption 2\nOption 3',
  image: '[Image: https://example.com/image.jpg]',
  audio: '[Audio: https://example.com/audio.mp3]',
  video: '[Video: https://example.com/video.mp4]',
  card: '**System Status**\nAll systems operational\n[Image: https://example.com/status.png]',
  end: '',
  default: '[Unhandled Block Type: customType]'
}


describe('Formats All blocks Correctly', () => {
  it('Text', () => expect(formatBlock(block.text)).toEqual(result.text))
  it('Choice', () => expect(formatBlock(block.choice)).toEqual(result.choice))
  it('Image', () => expect(formatBlock(block.image)).toEqual(result.image))
  it('Audio', () => expect(formatBlock(block.audio)).toEqual(result.audio))
  it('Video', () => expect(formatBlock(block.video)).toEqual(result.video))
  it('Card', () => expect(formatBlock(block.card)).toEqual(result.card))
  it('End', () => expect(formatBlock(block.end)).toEqual(result.end))
  it('Unknown', () => expect(formatBlock(block.default)).toEqual(result.default))
})
