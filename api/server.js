const express = require('express');
const pool = require('./db');
const usersRouter = require('./routes/users/users');
const adsRouter = require('./routes/ads/ads');

const app = express();
app.use(express.json());

app.use(express.static('build'));

app.use('/users', usersRouter);
app.use('/ads', adsRouter);

app.listen(process.env.PORT, () => {
  console.log('server started');
});