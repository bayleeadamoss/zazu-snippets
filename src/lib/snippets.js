const fs = require('fs')
const os = require('os')
const path = require('path')
const fuzzy = require('fuzzyfind')
const { htmlEncode } = require('js-htmlencode')

class Snippets {
  constructor (console, env={}) {
    // If user defined a folder name use it otherwise use zazu-snippets
    const folder = (env.hasOwnProperty('folder')) ? env.folder : 'zazu-snippets'
    // Default is os specific `[home_directory]/zazu-snippets`
    this.snippetDir = path.join(os.homedir(), folder)
    // Make directory if it does not already exist
    if (!fs.existsSync(this.snippetDir)) { fs.mkdirSync(this.snippetDir) }
    this.index = {}
    this.console = console
    this.indexSnippets()
  }

  indexSnippets () {
    fs.readdir(this.snippetDir, (err, data) => {
      if (err) return this.console.log('warn', err)
      data.map((file) => {
        if (file !== '.gitkeep' && file !== '.DS_Store') {
          const filePath = path.join(this.snippetDir, file)
          fs.readFile(filePath, (err, data) => {
            if (err) return this.console.log('warn', err)
            this.index[file] = data.toString()
          })
        }
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
    const accessor = (obj) => obj.key
    const items = Object.keys(this.index).map((key) => {
      return {
        key,
        value: this.index[key],
      }
    })
    return fuzzy(name, items, { accessor }).map((result) => {
      return {
        id: result.key,
        title: result.key,
        subtitle: 'Copy snippet to clipboard.',
        value: result.value,
        preview: `
          <pre class='text'>${htmlEncode(result.value)}</pre>
          <div class='meta'>${result.value.length} characters</div>
        `
      }
    })
  }

  delete (name) {
    delete this.index[name]
    const filePath = path.join(this.snippetDir, name)
    fs.unlink(filePath, function (err) {
      if (err) return this.console.log('warn', err)
    })
  }
}

var singleton = null
module.exports = (console, env={}) => {
  return singleton || (singleton = new Snippets(console, env))
}
