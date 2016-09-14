module.exports = (pluginContext) => {
  const { cwd, console } = pluginContext
  const snippets = require('./lib/snippets')(cwd, console)

  return (key, env = {}) => {
    return new Promise((resolve, reject) => {
      const value = snippets.search(key)
      if (!value) {
        return Promise.resolve()
      } else {
        resolve([{
          id: key,
          title: `Delete snippet called "${key}"`,
          value: key,
        }])
      }
    })
  }
}

