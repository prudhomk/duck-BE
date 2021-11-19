import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Problem from '../lib/models/Problem.js';
import { text } from 'express';

describe('Duck-BE routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const problem = {
    description: 'It does not render',
    code: '<Hello World!>'
  };

  test('create a problem', async () => {
    const res = await request(app)
      .post('/api/v1/problems')
      .send(problem);

    expect(res.body).toEqual({ ...problem, id: '1' });
  });

  test('retrieves problem by description', async () => {
    const newProblem = await Problem.create(problem);
    
    const res = await request(app)
      .get('/api/v1/problems/description?description=render');
    
    expect(res.body).toEqual([newProblem]);
  });

  test('find a problem by id', async () => {
    const newProblem = await Problem.create(problem);

    const res = await request(app)
      .get(`/api/v1/problems/${newProblem.id}`);

    expect(res.body).toEqual({ ...problem, id: '1' });
  });

  test('find all problems', async () => {
    await Problem.create(problem);
    
    const secondProblem = {
      description: 'shits broken',
      code: '<app>aaaaaaaa</app>'
    };

    await Problem.create(secondProblem);
    const res = await request(app)
      .get('/api/v1/problems')
      .send(problem)
      .send(secondProblem);

    expect(res.body).toEqual([{ ...problem, id: '1' }, { ...secondProblem, id: '2' }]);
  });

  afterAll(() => {
    pool.end();
  });
});
