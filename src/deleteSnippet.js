module.exports = (pluginContext) => {
  const { cwd, console } = pluginContext
  const snippets = require('./lib/snippets')(cwd, console)

  return (name, env = {}) => {
    snippets.delete(name)
    return Promise.resolve()
  }
}

