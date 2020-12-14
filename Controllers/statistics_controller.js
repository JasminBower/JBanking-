const { recentStatistics } = require("../Models/model");

exports.getStatistics = (req, res, next) => {
    recentStatistics()
		.then((data) => {
           return res.status(200).send(data)
		})
		.catch((err) => {
		
            next(err)
		});
};
