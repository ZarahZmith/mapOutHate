'use strict';

const express = require('express');
const bodyParser = require('body-parser');

require('./database-setup');

let app = express();

app.use(express.static(__dirname + '/../build/'));

app.use(bodyParser.json());

app.use('/report', require('./routes/reports.routes'));

app.use(require('./middleware/error-handler.middleware'));

app.listen(process.env.PORT || 3000, function serverIsWorking() {
  console.log('The server is running');
});
