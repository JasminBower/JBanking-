const express = require("express");
const transactionsRouter = express.Router();
const { postTransaction, deleteTransactions} = require("../Controllers/transaction_controller");

transactionsRouter
	.route("/")
	.post(postTransaction)
	.delete(deleteTransactions)
	.all((req, res, next) => {
		res.status(405).send({});
	});

module.exports = { transactionsRouter };
