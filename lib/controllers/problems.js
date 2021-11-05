import Router from 'express';
import Problem from '../models/Problem.js';

export default Router()
  .post('/', (req, res, next) => {
    Problem.create(req.body)
      .then(problem => res.send(problem))
      .catch(next);
  });
