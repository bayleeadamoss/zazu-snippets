module.exports = (pluginContext) => {
  const { cwd, console } = pluginContext
  const snippets = require('./lib/snippets')(cwd, console)

  return (name, env = {}) => {
    const content = pluginContext.clipboard.readText()
    snippets.create(name, content)
    return Promise.resolve()
  }
}

