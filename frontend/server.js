const express = require('express');
const app = express();
const port = 4000;


app.use(express.static(__dirname + "/dist/"));
app.get(/.*/,function(req,res ) {
  res.sendFile(__dirname + "/dist/index.html");
})
