const express = require("express");
const app = express();
const { errorHandler } = require("./errorHandling");
const { transactionsRouter } = require("./Routes/transactions_router");
const { statisticsRouter } = require("./Routes/statistics_router");

app.use(express.json());

app.use("/transactions", transactionsRouter);
app.use("/statistics", statisticsRouter);

app.use(errorHandler);

module.exports = app;
