import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import cors from 'cors';
import problemsController from './controllers/problems.js';
// import solutionsController from './controllers/solutions.js';

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());

app.use('/api/v1/problems', problemsController);
// app.use('/api/v1/solutions', solutionsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
