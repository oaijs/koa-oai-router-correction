const middleware = require('koa-oai-router-middleware');

const { init } = require('../helpers');
const correction = require('../..');

describe('correction', () => {
  it('enable collectionFormat, should correct success', async () => {
    const { request } = await init({
      apiDoc: './test/correction/api',
      plugins: {
        correction: correction(),
        middleware: middleware(),
      },
      options: {
        middleware: './test/correction/controllers',
      },
    });

    const array = ['a', 'b', 'c'];

    const csv = await request.get('/api/pets-csv').query({ tags: array.join(',') });
    const ssv = await request.get('/api/pets-ssv').query({ tags: array.join(' ') });
    const tsv = await request.get('/api/pets-tsv').query({ tags: array.join('\\') });
    const pipes = await request.get('/api/pets-pipes').query({ tags: array.join('|') });

    expect(csv.body.tags).toEqual(array);
    expect(ssv.body.tags).toEqual(array);
    expect(tsv.body.tags).toEqual(array);
    expect(pipes.body.tags).toEqual(array);
  });

  it('disable collectionFormat, should not correct', async () => {
    const { request } = await init({
      apiDoc: './test/correction/api',
      plugins: {
        correction: correction(),
        middleware: middleware(),
      },
      options: {
        middleware: './test/correction/controllers',
        correction: {
          collectionFormat: false,
        },
      },
    });

    const array = ['a', 'b', 'c'];

    const csv = await request.get('/api/pets-csv').query({ tags: array.join(',') });
    const ssv = await request.get('/api/pets-ssv').query({ tags: array.join(' ') });
    const tsv = await request.get('/api/pets-tsv').query({ tags: array.join('\\') });
    const pipes = await request.get('/api/pets-pipes').query({ tags: array.join('|') });

    expect(csv.body.tags).toEqual(array.join(','));
    expect(ssv.body.tags).toEqual(array.join(' '));
    expect(tsv.body.tags).toEqual(array.join('\\'));
    expect(pipes.body.tags).toEqual(array.join('|'));
  });
});
