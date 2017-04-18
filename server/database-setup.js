'use strict';

const mongoose = require('mongoose');

if (!process.env.MY_DB_LOCATION) {
  console.error('No database detected!');
  process.exit(1046);
}

mongoose.connect(process.env.MY_DB_LOCATION);

mongoose.connection.on('error', function handleDBError(err) {
  console.error('Database error detected!', err);
  process.exit(1046);
});
