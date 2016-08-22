const ipc = require('./ipc')
const fs = require('fs')
const path = require('path')

function indexSnippets(directory) {
  let index = {}
  const snippetsPath = path.join(directory, 'snippets')
  fs.readdir(snippetsPath, (err, data) => {
    if (err) { throw err }
    data.map((file) => {
      const filePath = path.join(snippetsPath, file)
      fs.readFile(filePath, (err, data) => {
        if (err) { throw err }
        index[file] = data.toString()
      })
    })
  })
  return index
}


module.exports = (pluginContext) => {
  const index = indexSnippets(pluginContext.cwd)
  ipc.on('newSnippet', (name, contents) => {
    index[name] = contents
  })
  return (value, env = {}) => {
    return new Promise((resolve, reject) => {
      if (index[value]) {
        resolve([{
          id: value,
          title: value,
          value: index[value],
        }])
      }
    })
  }
}

/*
[
    {
      "id": "42",
      "icon": "fa-calculator",
      "title": "The answer is 42",
      "subtitle": "Answer to the Ultimate Question of Life, the Universe, and Everything",
      "preview": "<span>42!</span>",
      "value": 42
    }
]
*/
