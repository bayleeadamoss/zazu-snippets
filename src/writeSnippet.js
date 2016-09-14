const snippets = require('./lib/snippets')

module.exports = (pluginContext) => {
  return (name, env = {}) => {
    const content = pluginContext.clipboard.readText()
    snippets.create(name, content)
    return Promise.resolve()
  }
}

