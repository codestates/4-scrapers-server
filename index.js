const express = require('express');
const app = express();
const cors = require('cors');
const usersRouter = require('./routes/users');
const newsSearchRouter = require('./routes/newsSearch');
app.use(express.json());

app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: true
    })
);

app.use('/user', usersRouter);
app.use('/search', newsSearchRouter);

app.listen(5000, ()=> {
    console.log('server on 5000')
})