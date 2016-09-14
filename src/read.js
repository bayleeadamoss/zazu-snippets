const { htmlEncode }  = require('js-htmlencode')

module.exports = (pluginContext) => {
  const { cwd, console } = pluginContext
  const snippets = require('./lib/snippets')(cwd, console)

  return (query, env = {}) => {
    return new Promise((resolve, reject) => {
      const value = snippets.search(query)
      if (!value) {
        return Promise.resolve()
      } else {
        resolve([{
          id: query,
          title: query,
          value: value,
          preview: `
            <pre class='text'>${htmlEncode(value)}</pre>
            <div class='meta'>${value.length} characters</div>
          `
        }])
      }
    })
  }
}
