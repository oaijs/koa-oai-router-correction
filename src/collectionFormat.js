const _ = require('lodash');

const COLLECTION_FORMAT_MAP = {
  csv: ',',
  ssv: ' ',
  tsv: '\\',
  pipes: '|',
  // multi: '&', // No need to correct, koa will auto parse it to array.
};

function collectionFormatHandler(ctx, fieldValue) {
  _.each(fieldValue, (field) => {
    const origin = ctx.request.query[field.name];
    const splitWord = COLLECTION_FORMAT_MAP[field.collectionFormat];

    if (!origin || !splitWord) return;

    ctx.request.query[field.name] = _.split(origin, splitWord);
  });
}

module.exports = collectionFormatHandler;
