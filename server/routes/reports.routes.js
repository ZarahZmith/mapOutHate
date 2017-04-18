const reportsRouter = require('express').Router();
const Report = require('../models/Report.model');

function addAReport(req, res, next) {

}
reportsRouter.post('/', addAReport);
