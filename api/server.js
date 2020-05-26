const express = require('express');
const usersRouter = require('./routes/users/usersRouter');
const adsRouter = require('./routes/ads/adsRouter');
const categoriesRouter = require('./routes/categories/categoriesRouter');
const placesRouter = require('./routes/places/placesRouter');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('build'));

app.use('/users', usersRouter);
app.use('/ads', adsRouter);
app.use('/categories', categoriesRouter);
app.use('/places', placesRouter);


const pool = require('./db');

app.use('/data', async (req, res) => {
  try {
    let x;
    console.log(req.query.category, req.query.place);
    let data = await pool.query({
      text: "SELECT * FROM categories WHERE name LIKE COALESCE($1, '%')",
      values: [ req.query.category ]
    });
    return res.status(200).json({
      ...data.rows
    })
  } catch(e) {
    console.log(e);
    return res.status(200).json({
      e
    });
  }
});


app.listen(process.env.PORT, () => {
  console.log('server started');
});