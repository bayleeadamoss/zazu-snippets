const ipc = require('./ipc')

module.exports = (pluginContext) => {
  return (key, env = {}) => {
    return new Promise((resolve, reject) => {
      ipc.emit('searchSnippets', key, function(value) {
        resolve([{
          id: key,
          title: key,
          value: value,
        }])
      })
    })
  }
}
