export default {
  text: {
    type: 'text',
    payload: {
      message: 'Hello, this is a text message.'
    }
  },
  choice: {
    type: 'choice',
    payload: {
      choices: ['Option 1', 'Option 2', 'Option 3']
    }
  },
  image: {
    type: 'image',
    payload: {
      image: 'https://example.com/image.jpg'
    }
  },
  audio: {
    type: 'audio',
    payload: {
      audio: 'https://example.com/audio.mp3'
    }
  },
  video: {
    type: 'video',
    payload: {
      video: 'https://example.com/video.mp4'
    }
  },
  card: {
    type: 'card',
    payload: {
      title: 'System Status',
      subtitle: 'All systems operational',
      image: 'https://example.com/status.png'
    }
  },
  end: {
    type: 'end',
    payload: {}
  },
  default: {
    type: 'customType',
    payload: {}
  }
}
