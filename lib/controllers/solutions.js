import Router from 'express';
import Solution from '../models/Solution.js';

export default Router()
  .post('/', (req, res, next) => {
    Solution.create(req.body)
      .then(sol => res.send(sol))
      .catch(next);
  })

  .get('/description', (req, res, next) => {
    Solution.findSolutionByDesc(req.query)
      .then(sol => res.send(sol))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Solution.findById(req.params.id)
      .then(sol => res.send(sol))
      .catch(next);
  });
