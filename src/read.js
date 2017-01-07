module.exports = (pluginContext) => {
  return (query, env = {}) => {
    const { cwd, console } = pluginContext
    return new Promise((resolve, reject) => {
      const snippets = require('./lib/snippets')(cwd, console)
      const results = snippets.search(query)
      if (!results) {
        resolve([])
      } else {
        resolve(results)
      }
    })
  }
}
