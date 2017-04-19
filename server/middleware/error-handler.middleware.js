'use strict';

module.exports = function errorHandler(err, req, res, next) {
  /*jshint unused:vars*/
  console.error('Error!', err.message);
  res.status(err.status || 500);
  res.json({message: err.message, status: err.status});
};
