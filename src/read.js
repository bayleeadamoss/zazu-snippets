module.exports = (pluginContext) => {
  return (query, env = {}) => {
    const { cwd, console } = pluginContext
    const snippets = require('./lib/snippets')(console, env)
    return new Promise((resolve, reject) => {
      const results = snippets.search(query)
      resolve(results ? results : [])
    })
  }
}
