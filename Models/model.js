const {statistics} = require('../utils')
const totalTransactions = [];


exports.addTransaction = (transaction) => {
const now = new Date();
const transDate = new Date(transaction.value.timestamp);

  return new Promise((resolve, reject) => {

    if(transaction.error || transDate > now ){
	   throw ({status: 422, body: {}});
    } else if ((now - transDate) < (1000 * 60) === false){
		totalTransactions.push(transaction.value);
		throw ({status: 204, body: {}});
	} else 
    totalTransactions.push(transaction.value);
	resolve(totalTransactions)
    }).catch(err => {
		throw err;
	});
};

exports.recentStatistics = () => {

	//return statistics(totalTransactions)
 
  return new Promise((resolve, reject) => {
	  resolve(statistics(totalTransactions));
	}).catch(err => {
	   reject(err);
	});
};

exports.deleteAllTransactions = () => {
	totalTransactions.forEach(transaction => {
	   delete transaction 
   });
  
  return new Promise((resolve, reject) => {
	   if(totalTransactions.length === 0);
	   resolve();
	}).catch(err => {
	   reject(err);
   });
};