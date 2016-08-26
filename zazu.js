module.exports = {
  name: 'Zazu Snippets',
  icon: 'snip.svg',
  blocks: {
    external: [
      {
        id: 'SnipCache',
        type: 'ServiceScript',
        script: 'cacheSnippets.js',
        interval: 30 * 1000,
      },
    ],
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
        prefix: 'snipc',
        space: true,
        args: 'Required',
        script: 'write.js',
        connections: ['WriteSnippet'],
      },
      {
        id: 'Delete',
        type: 'PrefixScript',
        prefix: 'snipd',
        space: true,
        args: 'Required',
        script: 'delete.js',
        connections: ['DeleteSnippet'],
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
      {
        id: 'DeleteSnippet',
        type: 'UserScript',
        script: 'deleteSnippet.js',
        value: '{value}',
      },
    ],
  },
}

