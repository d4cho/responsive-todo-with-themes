const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

// initialize express app
const app = express();

// get config file. Can access env variables with process.env.FOO
dotenv.config({ path: './config/config.env' });

// morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// port
const PORT = process.env.PORT || 5000;

// connect to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log(err));

// middleware
app.use(express.json());

// routes
const todos = require('./routes/todos');
const themes = require('./routes/themes');
app.use('/api/todos', todos);
app.use('/api/themes', themes);

// for production
// must be after routes
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// run server
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);
