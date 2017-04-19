'use strict';

const reportsRouter = require('express').Router();
const Report = require('../models/Report.model');

function addAReport(req, res, next) {
  let newReport = new Report({
    type: req.body.type,
    description: req.body.description,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  });
  newReport.createTime = Date.now();
  newReport.save()
    .then(function makeNewReport(content) {
      res.json(content);
    })
    .catch(function errorHandler(err) {
      console.error(err);
      let theError = new Error('Could not save the report to the datanase');
      theError.status = 500;
      return next(theError);
    });
}
reportsRouter.post('/', addAReport);

module.exports = reportsRouter;
