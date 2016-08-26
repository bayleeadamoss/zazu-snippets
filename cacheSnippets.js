const ipc = require('./ipc')
const fs = require('fs')
const path = require('path')

class Snippets {
  constructor (dir) {
    this.dir = dir
    this.index = {}
    this.snippetDir = path.join(this.dir, 'snippets')
    this.indexSnippets()
  }

  indexSnippets () {
    fs.readdir(this.snippetDir, (err, data) => {
      if (err) { throw err }
      data.map((file) => {
        const filePath = path.join(this.snippetDir, file)
        fs.readFile(filePath, (err, data) => {
          if (err) { throw err }
          this.index[file] = data.toString()
        })
      })
    })
  }

  create (name, content) {
    this.index[name] = contents
    const filePath = path.join(this.snippetDir, name)
    fs.writeFile(filePath, content)
  }

  search (name) {
    return this.index[name]
  }
}


module.exports = (pluginContext) => {
  const snippets = new Snippets(pluginContext.cwd)

  ipc.on('newSnippet', (name, contents) => {
    snippets.create(name, contents)
  })

  ipc.on('searchSnippets', (name, cb) => {
    cb(snippets.search(name))
  })

  return () => {
    resolve('pong')
  }
}
