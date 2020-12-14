const express = require("express");
const statisticsRouter = express.Router();
const {getStatistics} = require('../Controllers/statistics_controller')

statisticsRouter
	.route("/")
	.get(getStatistics)
	.all((req, res, next) => {
		res.status(405).send({});
	});

module.exports = { statisticsRouter };
