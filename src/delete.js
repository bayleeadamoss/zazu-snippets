const snippets = require('./lib/snippets')

module.exports = (pluginContext) => {
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

