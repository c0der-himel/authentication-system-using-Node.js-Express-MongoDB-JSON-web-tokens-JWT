const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/courses', (req, res) => res.render('courses'));
app.use(authRoutes);
app.use((req, res) => res.status(404).render('404'));

// server & database connection
const PORT = process.env.PORT || 5000;
const username = 'node-auth-admin';
const password = 'admin123';
const dbName = 'node-auth';
const dbURI = `mongodb+srv://${username}:${password}@nodejs.2gw6h.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(PORT, () => {
      console.log('Connected to Database.');
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
