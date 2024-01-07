var express = require('express');
var app = express();
require('dotenv').config();

app.use(express.json())

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

async function serverStart() {
  try {

    app.listen(process.env.PORT,  () => {
      console.log(`Sistem start http://${process.env.HOST}:${process.env.PORT}`);
    });
  } catch (error) {
    console.error('[serverStart][Error]', error);
  }
}

serverStart();
