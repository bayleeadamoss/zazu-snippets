const fs = require('fs')
const os = require('os')
const path = require('path')
const fuzzy = require('fuzzyfind')
const { htmlEncode } = require('js-htmlencode')

class Snippets {
  constructor (console, env={}) {
    this.console = console
    this.env = env
    // Default or configured path to snippet directory
    this.snippetDir = path.join(this.getDirectory(), this.getFolder())
    // Make directory if it does not already exist
    if (!fs.existsSync(this.snippetDir)) { fs.mkdirSync(this.snippetDir) }
    this.index = {}
    this.indexSnippets()
  }

  // Determines if a variable was set
  envHas(variable) { return this.env.hasOwnProperty(variable) }

  // If user defined a directory use it otherwise use home directory
  getDirectory() {
    return (this.envHas('directory') ? path.normalize(this.env.directory) : os.homedir())
  }

  // If user defined a folder name use it otherwise use .zazu-snippets
  getFolder() {
    return (this.envHas('folder') ? this.env.folder : '.zazu-snippets')
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
