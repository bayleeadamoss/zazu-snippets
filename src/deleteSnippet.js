const snippets = require('./lib/snippets')

module.exports = (pluginContext) => {
  return (name, env = {}) => {
    snippets.delete(name)
    return Promise.resolve()
  }
}

