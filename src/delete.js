module.exports = (pluginContext) => {
  return (key, env = {}) => {
    const { console } = pluginContext
    const snippets = require('./lib/snippets')(console, env)
    return new Promise((resolve, reject) => {
      const value = snippets.search(key)
      const deleteConfirm = [{
        id: key, title: `Delete snippet called "${key}"`, value: key,
      }]
      resolve(value ? deleteConfirm : [])
    })
  }
}
