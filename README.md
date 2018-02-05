# Koa-OAI-Router-Correction

[license-img]: http://img.shields.io/badge/license-MIT-green.svg
[license-url]: http://opensource.org/licenses/MIT

[node-image]: https://img.shields.io/badge/node.js-v7.0.0-blue.svg
[node-url]: http://nodejs.org/download/

[npm-img]: https://img.shields.io/npm/v/koa-oai-router-correction.svg
[npm-url]: https://npmjs.org/package/koa-oai-router-correction

[travis-img]: https://travis-ci.org/oaijs/koa-oai-router-correction.svg
[travis-url]: https://travis-ci.org/oaijs/koa-oai-router-correction

[coveralls-img]: https://coveralls.io/repos/github/oaijs/koa-oai-router-correction/badge.svg
[coveralls-url]: https://coveralls.io/github/oaijs/koa-oai-router-correction

[downloads-image]: https://img.shields.io/npm/dm/koa-oai-router-correction.svg
[downloads-url]: https://npmjs.org/package/koa-oai-router-correction

[david-img]: https://img.shields.io/david/oaijs/koa-oai-router-correction.svg
[david-url]: https://david-dm.org/oaijs/koa-oai-router-correction

[router]: https://github.com/BiteBit/koa-oai-router

[param]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#parameter-object

[![License][license-img]][license-url]
[![Node Version][node-image]][node-url]
[![NPM Version][npm-img]][npm-url]
[![Build Status][travis-img]][travis-url]
[![Test Coverage][coveralls-img]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]
[![Dependency Status][david-img]][david-url]

Request form correction plugin for [koa-oai-router][router].

# Installation
```bash
npm i koa-oai-router-correction --save
```

# Info
|field|type|info|
|---|---|---|
|name|`string`|`correction`|
|evoked fields|`string`| `parameters`|
|evoked value|`object`| [OpenApi parameter object][param]|
|options|`object`| `collectionFormat` |

# Usage

## collectionFormat
Determines the format of the array if type array is used. Possible values are:
* csv - comma separated values `foo,bar`.
* ssv - space separated values `foo bar`.
* tsv - tab separated values `foo\tbar`.
* pipes - pipe separated values `foo|bar`.
* multi - corresponds to multiple parameter instances instead of multiple values for a single instance `foo=bar&foo=baz`. This is valid only for parameters in "query" or "formData".

Simple code:
```js
const Koa = require('koa');
const Router = require('koa-oai-router');
const middlewareLoader = require('koa-oai-router-middleware');
const correctionHandler = require('koa-oai-router-correction');

const app = new Koa();
const router = new Router({
  apiDoc: './api',
});

router.moount();

router.mount(middlewareLoader('./controllers'));
router.mount(correctionHandler({collectionFormat: true}));

app.use(bodyParser());
app.use(router.routes());
```

```bash
> curl -X GET http://localhost:3000/api/pets?tags=a,b,c
> {tags: ["a", "b", "c"]}
>
> curl -X GET http://localhost:3000/api/pets?tags=a|b|c
> {tags: ["a", "b", "c"]}
>
> curl -X GET http://localhost:3000/api/pets?tags=a b c
> {tags: ["a", "b", "c"]}
>
> curl -X GET http://localhost:3000/api/pets?tags=a\b\c
> {tags: ["a", "b", "c"]}
```