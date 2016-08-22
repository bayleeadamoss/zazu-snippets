module.exports = (pluginContext) => {
  return (value, env = {}) => {
    return new Promise((resolve, reject) => {
      resolve([{
        id: value,
        title: `Create snippet called "${value}"`,
        value: value,
      }])
    })
  }
}

