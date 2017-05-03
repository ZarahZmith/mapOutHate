'use strict';

const mongoose = require('mongoose');

if (!process.env.MONGODB_URI) {
  console.error('No database detected!');
  process.exit(1046);
}

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('error', function handleDBError(err) {
  console.error('Database error detected!', err);
  process.exit(1046);
});
