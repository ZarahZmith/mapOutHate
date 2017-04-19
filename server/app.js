'use strict';

const express = require('express');
const bodyParser = require('body-parser');

require('./database-setup');

let app = express();

app.use(bodyParser.json());

app.use('/report', require('./routes/reports.routes'));

app.use(require('./middleware/error-handler.middleware'));

app.listen(3000, function serverIsWorking() {
  console.log('The server is running');
});
