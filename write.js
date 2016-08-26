module.exports = (pluginContext) => {
  return (key, env = {}) => {
    return new Promise((resolve, reject) => {
      resolve([{
        id: key,
        title: `Create snippet called "${key}"`,
        value: key,
      }])
    })
  }
}

