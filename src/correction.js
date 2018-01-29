const Debug = require('debug');
const Router = require('koa-oai-router');

const collectionFormatHandler = require('./collectionFormat');

const debug = Debug('koa-oai-router:correction');
const { Plugin } = Router;

function middlewareWrapper(middlewareOpts, middlewareArgs = {}) {
  const {
    endpoint,
    field,
    fieldValue,
    operation,
    operationValue,
  } = middlewareOpts;

  const {
    collectionFormat = true,
  } = middlewareArgs;

  return (ctx, next) => {
    debug('before', ctx.request.query, ctx.request.body, ctx.params);

    if (collectionFormat) collectionFormatHandler(ctx, fieldValue);

    debug('after', ctx.request.query, ctx.request.body, ctx.params);

    return next();
  };
}

/**
 * Correct invalid form to valid form.
 * @param {object} args
 * @param {boolean} args.collectionFormat default true
 */
module.exports = (args) => {
  return new Plugin({
    name: 'correction',
    field: 'parameters',
    middlewareArgs: args,
    middlewareWrapper,
  });
};
