'use strict';

const express = require('express');

require('./database-setup');

let app = express();

app.listen(3000, function serverIsWorking() {
  console.log('The server is running');
});
