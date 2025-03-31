export default (message, variables = {}) => ({
  action: { type: 'text', payload: message },
  config: {
    tts: false,
    stripSSML: true,
    stopAll: false,
    excludeTypes: ['block', 'debug', 'flow']
  },
  state: { variables }
})
