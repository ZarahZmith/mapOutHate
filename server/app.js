'use strict';

const express = require('express');

let app = express();

app.listen(3000, function serverIsWorking() {
  console.log('The server is running');
});
