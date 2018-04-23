module.exports = (pluginContext) => {
  return (name, env = {}) => {
    const { console } = pluginContext
    const snippets = require('./lib/snippets')(console, env)
    const content = pluginContext.clipboard.readText()
    snippets.create(name, content)
    return Promise.resolve()
  }
}

