module.exports = {
  name: 'Zazu Snippets',
  icon: 'icon.png',
  blocks: {
    input: [
      {
        id: 'Read',
        type: 'PrefixScript',
        prefix: 'snip',
        space: true,
        args: 'Required',
        script: 'read.js',
        connections: ['Copy'],
      },
      {
        id: 'Write',
        type: 'PrefixScript',
        prefix: 'snip',
        space: true,
        args: 'Required',
        script: 'write.js',
        connections: ['WriteSnippet'],
      },
    ],
    output: [
      {
        id: 'Copy',
        type: 'CopyToClipboard',
        text: '{value}',
      },
      {
        id: 'WriteSnippet',
        type: 'UserScript',
        script: 'writeSnippet.js',
        value: '{value}',
      },
    ],
  },
}

