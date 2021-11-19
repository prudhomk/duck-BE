import Router from 'express';
import Problem from '../models/Problem.js';

export default Router()
  .post('/', (req, res, next) => {
    Problem.create(req.body)
      .then(prob => res.send(prob))
      .catch(next);
  })

  .get('/description', (req, res, next) => {
    Problem.findProblemByDesc(req.query)
      .then(prob => res.send(prob))
      .catch(next);
  });
