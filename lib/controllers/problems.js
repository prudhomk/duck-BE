import Router from 'express';
import Problem from '../models/Problem.js';

export default Router()
  .post('/', (req, res, next) => {
    Problem.create(req.body)
      .then(problem => res.send(problem))
      .catch(next);
  })

  .get('/description', (req, res, next) => {
    Problem.findDescription(req.query)
      .then(problems => res.send(problems))
      .catch(next);
  });
