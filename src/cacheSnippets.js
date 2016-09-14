const ipc = require('./lib/ipc')
const fs = require('fs')
const path = require('path')

class Snippets {
  constructor (dir, console) {
    this.dir = dir
    this.index = {}
    this.console = console
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
    this.index[name] = content
    const filePath = path.join(this.snippetDir, name)
    fs.writeFile(filePath, content, (err) => {
      if (err) this.console.log('warn', err)
    })
  }

  search (name) {
    return this.index[name]
  }

  delete (name) {
    delete this.index[name]
    const filePath = path.join(this.snippetDir, name)
    fs.unlink(filePath, function (err) {
      if (err) this.console.log('warn', err)
    })
  }
}


module.exports = (pluginContext) => {
  const { cwd, console } = pluginContext
  const snippets = new Snippets(cwd, console)

  ipc.on('newSnippet', (name, contents) => {
    snippets.create(name, contents)
  })

  ipc.on('deleteSnippet', (name) => {
    snippets.delete(name)
  })

  ipc.on('searchSnippets', (name, cb) => {
    cb(snippets.search(name))
  })

  return () => {
    return Promise.resolve('pong')
  }
}
