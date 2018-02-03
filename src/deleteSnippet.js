module.exports = (pluginContext) => {
  return (name, env = {}) => {
    const { console } = pluginContext
    const snippets = require('./lib/snippets')(console, env)
    snippets.delete(name)
    return Promise.resolve()
  }
}

