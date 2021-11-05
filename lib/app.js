const express = require('express');
const cors = require('cors');
const problemsController = require('./controllers/problems.js');
const solutionsController = require('./controllers/solutions.js');

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());

app.use('/api/v1/problems', problemsController);
app.use('/api/v1/solutions', solutionsController);

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
