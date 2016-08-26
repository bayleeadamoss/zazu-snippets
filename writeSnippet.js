const ipc = require('./ipc')

module.exports = (pluginContext) => {
  return (name, env = {}) => {
    const content = pluginContext.clipboard.readText()
    return new Promise((resolve, reject) => {
      ipc.emit('newSnippet', name, content)
    })
  }
}

