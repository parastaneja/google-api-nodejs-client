const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
// const cors = require('cors');

var admin = require('./api/directory_v1/admin');

const app = express();

// app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));


app.use(function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "authorization,Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use('/admin',admin);



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});