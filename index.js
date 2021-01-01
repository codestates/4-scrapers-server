require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const usersRouter = require('./routes/users');
const newsSearchRouter = require('./routes/newsSearch');
const socialLoginRouter = require('./routes/socialLogin')
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());


app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: true
    })
);

app.use('/user', usersRouter);
app.use('/search', newsSearchRouter);
app.use('/auth', socialLoginRouter);

app.listen(5000, ()=> {
    console.log('server on 5000')
})