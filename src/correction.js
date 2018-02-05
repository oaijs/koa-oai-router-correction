const Debug = require('debug');
const Router = require('koa-oai-router');

const collectionFormatHandler = require('./collectionFormat');

const debug = Debug('koa-oai-router:correction');
const { Plugin } = Router;

/**
 * Correct invalid form to valid form.
 * @param {object} args
 * @param {boolean} args.collectionFormat default true
 */
class CorrectionPlugin extends Plugin {
  constructor() {
    super();

    this.pluginName = 'correction';
    this.field = 'parameters';
  }

  async handler(docOpts) {
    const {
      endpoint,
      field,
      fieldValue,
      operation,
      operationValue,
    } = docOpts;

    const {
      collectionFormat = true,
    } = this.args || {};

    return (ctx, next) => {
      debug('before', ctx.request.query, ctx.request.body, ctx.params);

      if (collectionFormat) collectionFormatHandler(ctx, fieldValue);

      debug('after', ctx.request.query, ctx.request.body, ctx.params);

      return next();
    };
  }
}

module.exports = CorrectionPlugin;
