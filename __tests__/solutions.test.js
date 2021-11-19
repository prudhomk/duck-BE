import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Problem from '../lib/models/Problem.js';
import Solution from '../lib/models/Solution.js';

describe('Duck-BE routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const problem = {
    description: 'It does not render',
    code: '<Hello World!>'
  };

  const solution = {
    description: 'I fixed it',
    code: '<h1>Hello World!</h1>',
    problem: '1'
  };

  test('creates a solution', async () => {
    const newProblem = await Problem.create(problem);

    const res = await request(app)
      .post('/api/v1/solutions')
      .send({ ...solution, problem: newProblem.id });

    expect(res.body).toEqual({ ...solution, id: '1' });
  });

  test('retrieves a solution by description', async () => {
    const newProblem = await Problem.create(problem);
    const newSolution = await Solution.create(solution);

    const res = await request(app)
      .get('/api/v1/solutions/description?description=fixed');

    expect(res.body).toEqual([newSolution]);
  });

  afterAll(() => {
    pool.end();
  });
});
