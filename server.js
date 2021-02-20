const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { connect } = require('./routes/todos');
const morgan = require('morgan');

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
app.use('/api/todos', todos);

// run server
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);
