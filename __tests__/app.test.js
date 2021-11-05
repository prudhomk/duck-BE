import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Problem from '../lib/models/Problem.js';


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

  test('retrieves problem by description', async () => {
    const newProblem = await Problem.create(problem);
    
    const res = await request(app)
      .get('/api/v1/problems/description=render');
    
    expect(res.body).toEqual(newProblem);
  });

  afterAll(() => {
    pool.end();
  });
});
