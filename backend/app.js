const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');
const path = require('path');
const helmet = require('helmet');
const es = require('express-sanitize');
const cookieSession = require('cookie-session');
require('dotenv').config();


const app = express();
app.use(es);

app.use(helmet());
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SES_KEY1, process.env.SES_KEY2],
  cookie: {
    httpOnly: true,
    maxAge: 900000,
    secure: true,
  }
}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/images',express.static(path.join(__dirname,'images')));
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment',commentRoutes);
app.use('/api/like',likeRoutes);



module.exports = app;