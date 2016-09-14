const ipc = require('./lib/ipc')

module.exports = (pluginContext) => {
  return (key, env = {}) => {
    return new Promise((resolve, reject) => {
      ipc.emit('searchSnippets', key, (value) => {
        if (!value) {
          return Promise.resolve()
        } else {
          resolve([{
            id: key,
            title: key,
            value: value,
          }])
        }
      })
    })
  }
}
