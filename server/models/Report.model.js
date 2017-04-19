const mongoose = require('mongoose');

let reportSchema = mongoose.Schema({
  type: String,
  description: String,
  address: String,
  city: String,
  state: String,
  zip: String
});

module.exports = mongoose.model('Report', reportSchema);
