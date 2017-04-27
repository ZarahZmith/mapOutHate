'use strict';

const reportsRouter = require('express').Router();
const Report = require('../models/Report.model');
const NodeGeocoder = require('node-geocoder');
let geocoder = NodeGeocoder();

/**
 * Allows someone to report a new incident
 * @param {Object}   req  Must have a body like: {type: String, description: String, address: String, city: String, state: String, zip: String}
 * @param {Object}   res  Shows the specific report
 * @param {Function} next Returns the specific error
 * @return {void}
 */
function addAReport(req, res, next) {
  if (!req.body.type || !req.body.description || !req.body.address || !req.body.city || !req.body.state || !req.body.state) {
    let error = new Error('Please give required report information.');
    error.status = 422;
    return next(error);
  }

  if (req.body.type === '' || req.body.description === '' || req.body.address === '' || req.body.city === '' || req.body.state === '' || req.body.zip === '') {
    let error = new Error('Please give required report information.');
    error.status = 422;
    return next(error);
  }

  let newReport = new Report({
    type: req.body.type,
    description: req.body.description,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  });
  newReport.createTime = Date.now();

  geocoder.geocode(newReport.address + ', ' + newReport.city + ', ' + newReport.state + ', ' + newReport.zip)
    .then(function createLatAndLong(responseObj) {
      newReport.latitude = responseObj[0].latitude;
      newReport.longitude = responseObj[0].longitude;
      newReport.save()
        .then(function makeNewReport(content) {
          res.json(content);
        })
        .catch(function errorHandler(err) {
          console.error(err);
          let theError = new Error('Could not geocode the address.');
          theError.status = 422; //unable to process request due to semantic error
          return next(theError);
        });
    })
    .catch(function errorHandler(err) {
      console.error(err);
      let theError = new Error('Could not save the report to the datanase.');
      theError.status = 500;
      return next(theError);
    });

}
reportsRouter.post('/', addAReport);

/**
 * Allows all reports to be recieved from the server
 * @param  {Object}   res  Displays all incident reports
 * @param  {Function} next Returns the specific error
 * @return {void}
 */
function viewAllReports(req, res, next) {
  Report.find()
    .then(function findReportInfo(reportInfo){
      res.json(reportInfo);
    })
    .catch(function errorHandler(err) {
      console.error(err);
      let theError = new Error('Could not get reports from the database.');
      theError.status = 500;
      return next(theError);
    });
}
reportsRouter.get('/all', viewAllReports);

module.exports = reportsRouter;
