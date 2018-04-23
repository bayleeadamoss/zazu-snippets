## Snippet manager for Zazu

## Configuration (default)

By default the plugin will store your snippets in your home directory under `.zazu-snippets`.

## Configuration (specific folder name)

Changing the folder name from `.zazu-snippets` to `snippets` in your home directory.

~~~ javascript
{
  "name": "afaur/zazu-snippets",
  "variables": {
    "folder": "snippets"
  }
}
~~~

## Configuration (specific containing directory)

Changing the folder name from `.zazu-snippets` to `snippets` and storing it in a specific directory.

~~~ javascript
{
  "name": "afaur/zazu-snippets",
  "variables": {
    "directory": "/Users/username/Documents",
    "folder": "snippets"
  }
}
~~~

## Usage

Finding a snippet:

~~~
snip emoji
~~~

Creating a snippet from your clipboard:

~~~
snipc emoji
~~~

Delete a snippet by name:

~~~
snipd emoji
~~~

## Installing

Add the package to your plugins array in `./zazurc.json`.

~~~ json
{
  "plugins": [
    "tinytacoteam/zazu-snippets"
  ]
}
~~~
