const ipc = require('./lib/ipc')

module.exports = (pluginContext) => {
  return (name, env = {}) => {
    const content = pluginContext.clipboard.readText()
    ipc.emit('deleteSnippet', name, content)
    return Promise.resolve()
  }
}

