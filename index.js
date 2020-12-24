const express = require('express');
const app = express();
const cors = require('cors');

app.use(
    cors({
      origin: 'http://4-scrapers.s3-website.ap-northeast-2.amazonaws.com/',
      methods: ['GET', 'POST'],
      credentials: true
    })
);


app.use('/', (req,res) => {
    res.send('hello practice node server-deploy');
})
app.listen(5000, ()=> {
    console.log('server on 5000')
})