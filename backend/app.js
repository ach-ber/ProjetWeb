

const express = require('express');
const Routes = require('./routes/routes');
const app = express();
const port = process.env.PORT | 4000;



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/api',Routes);


app.listen(port, () => 
    console.log('server listenning on port 4000'));