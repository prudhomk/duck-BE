const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Problem = require('../lib/models/Problem.js');


describe('Duck-BE routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const problem = {
    name: 'Function is broken',
    description: 'It does not work',
    code: '<Hello World!>'
  };

  test('create a problem', async () => {
    const res = await request(app)
      .post('.api/v1/problems')
      .send(problem);

    expect(res.body).toEqual({ ...problem, id: '1' });
  });

  afterAll(() => {
    pool.end();
  });
});
