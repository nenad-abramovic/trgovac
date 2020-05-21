const express = require('express');
const pool = require('./db');
const cors = require('cors');
const usersRouter = require('./routes/users');
const adsRouter = require('./routes/ads');

const app = express();
app.use(express.json());
app.use(cors());


app.use(express.static('build'));

app.use('/users', usersRouter);
app.use('/ads', adsRouter);

app.get('/data', async (req, res, next) => {
    try {
        let data = await pool.query({ 
            text: 'SELECT name FROM categories',
            rowMode: 'array' 
        });
        return res.json(data.rows.flat());
    } catch(e) {
        return res.json(e);
    }
});

app.listen(4000, () => {
  console.log('server started');
});