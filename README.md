# `handlebars-group-by`

> Handlebars helper which allows you to group lists by a property of each item.

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url]

## Install

With [Node.js](http://nodejs.org):

    $ npm install handlebars-group-by

With [Bower](http://bower.io):

    $ bower install shannonmoeller/handlebars-group-by

## Helper

### `{{#group [list] by=[property]}}`

- `list` `Array` - Array whose items should be grouped together.
- `by` `String` - The name of the property by whose value items should be grouped.

Data:

```js
{
    posts: [
        { year: 2014, title: 'foo', body: 'foo bar' },
        { year: 2014, title: 'bar', body: 'bar baz' },
        { year: 2014, title: 'baz', body: 'baz bat' },
        { year: 2015, title: 'bat', body: 'bat qux' },
        { year: 2015, title: 'qux', body: 'qux foo' }
    ]
}
```

Template:

```html
{{#group posts by="year"}}
	<h1>{{ value }}</h1>

	{{#each items}}
		<h2>{{ title }}</h2>
		<p>{{ body }}</p>

	{{/each}}
{{/group}}
```

Output:

```html
<h1>2014</h1>

<h2>foo</h2>
<p>foo bar</p>

<h2>bar</h2>
<p>bar baz</p>

<h2>baz</h2>
<p>baz bat</p>

<h1>2015</h1>

<h2>bat</h2>
<p>bat qux</p>

<h2>qux</h2>
<p>qux foo</p>
```

## Api

Helpers are registered by passing in your instance of Handlebars. This allows
you to selectively register the helpers on various instances of Handlebars.

### `groupBy(handlebars)`

- `handlebars` `Handlebars` - An instance of Handlebars.

```js
var handlebars = require('handlebars'),
    groupBy = require('handlebars-group-by');

groupBy(handlebars);
```

### `groupBy.register(handlebars)`

- `handlebars` `Handlebars` - An instance of Handlebars.

Helpers are also exposed via a `register` method for use with [Assemble](http://assemble.io/).

```js
var handlebars = require('handlebars'),
    groupBy = require('handlebars-group-by');

groupBy.register(handlebars);

// or

grunt.initConfig({
    assemble: {
        options: {
            helpers: ['path/to/handlebars-group-by.js']
        }
    }
});
```

## Contribute

[![Tasks][waffle-img]][waffle-url] [![Chat][gitter-img]][gitter-url] [![Tip][gittip-img]][gittip-url]

Standards for this project, including tests, code coverage, and semantics are enforced with a build tool. Pull requests must include passing tests with 100% code coverage and no linting errors.

### Test

```sh
$ gulp test
```

## License

MIT

[coveralls-img]: http://img.shields.io/coveralls/shannonmoeller/handlebars-group-by/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/shannonmoeller/handlebars-group-by
[downloads-img]: http://img.shields.io/npm/dm/handlebars-group-by.svg?style=flat-square
[gitter-img]:    http://img.shields.io/badge/chat-shannonmoeller/handlebars--group-by-blue.svg?style=flat-square
[gitter-url]:    https://gitter.im/shannonmoeller/handlebars-group-by
[gittip-img]:    http://img.shields.io/gittip/shannonmoeller.svg?style=flat-square
[gittip-url]:    https://www.gittip.com/shannonmoeller
[npm-img]:       http://img.shields.io/npm/v/handlebars-group-by.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/handlebars-group-by
[travis-img]:    http://img.shields.io/travis/shannonmoeller/handlebars-group-by.svg?style=flat-square
[travis-url]:    https://travis-ci.org/shannonmoeller/handlebars-group-by
[waffle-img]:    http://img.shields.io/github/issues/shannonmoeller/handlebars-group-by.svg?style=flat-square
[waffle-url]:    http://waffle.io/shannonmoeller/handlebars-group-by
