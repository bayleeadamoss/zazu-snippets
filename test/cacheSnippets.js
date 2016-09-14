const describe = require('tape')
const Snippets = require('../src/lib/snippets')

const snippets = Snippets(__dirname, { log: () => {} })

describe('search for major items', (assert) => {
  assert.plan(1)

  snippets.index = {
    'migrations': 'foo',
    'rails_migrations': 'bar',
    'work_email': 'princess@tinytacoteam.github.io',
  }

  const results = snippets.search('migrations')
  assert.ok(results.length === 2)
})

describe('search for minor items', (assert) => {
  assert.plan(1)

  snippets.index = {
    'migrations': 'foo',
    'rails_migrations': 'bar',
    'work_email': 'princess@tinytacoteam.github.io',
  }

  const results = snippets.search('work')
  assert.ok(results.length === 1)
})

describe('search for no items', (assert) => {
  assert.plan(1)

  snippets.index = {
    'migrations': 'foo',
    'rails_migrations': 'bar',
    'work_email': 'princess@tinytacoteam.github.io',
  }

  const results = snippets.search('meow')
  assert.ok(results.length === 0)
})
