const fs = require('fs')
const path = require('path')

class Snippets {
  constructor () {
    this.dir = '../../'
    this.index = {}
    this.console = console
    this.snippetDir = path.join(this.dir, 'snippets')
    this.indexSnippets()
  }

  indexSnippets () {
    fs.readdir(this.snippetDir, (err, data) => {
      if (err) return this.console.log('warn', err)
      data.map((file) => {
        const filePath = path.join(this.snippetDir, file)
        fs.readFile(filePath, (err, data) => {
          if (err) return this.console.log('warn', err)
          this.index[file] = data.toString()
        })
      })
    })
  }

  create (name, content) {
    this.index[name] = content
    const filePath = path.join(this.snippetDir, name)
    fs.writeFile(filePath, content, (err) => {
      if (err) return this.console.log('warn', err)
    })
  }

  search (name) {
    return this.index[name]
  }

  delete (name) {
    delete this.index[name]
    const filePath = path.join(this.snippetDir, name)
    fs.unlink(filePath, function (err) {
      if (err) return this.console.log('warn', err)
    })
  }
}

module.exports = new Snippets
