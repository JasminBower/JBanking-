const { addTransaction, deleteAllTransactions } = require("../Models/model");
const Joi = require('joi');

exports.postTransaction = (req, res, next) => {
	const {body} = req
    const schema = Joi.object({
	  amount: Joi.string().pattern(new RegExp(/\d+\.\d+/)).required(),
	  timestamp: Joi.string().isoDate().required()
    });
    const transaction =  schema.validate(body)

	addTransaction(transaction)
		.then((data) => {
		res.status(201).send({});
		})
		.catch((err) => {
			next(err);
		});
};

exports.deleteTransactions = (req, res, next) => {
	deleteAllTransactions()
	.then(() => {
	   res.sendStatus(204)
	}).catch((err) => {
		next(err)
	})

}
