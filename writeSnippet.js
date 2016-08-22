const ipc = require('./ipc')
const fs = require('fs')
const path = require('path')

module.exports = (pluginContext) => {
  return (name, env = {}) => {
    const filePath = path.join(pluginContext.cwd, 'snippets', name)
    const content = pluginContext.clipboard.readText()
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, (err) => {
        if (err) { return reject(err) }
        ipc.emit('newSnippet', name, content)
        resolve()
      })
    })
  }
}

