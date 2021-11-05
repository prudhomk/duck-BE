const express = require('express');

const app = express();

import cors from 'cors';

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
