exports.statistics = (totalTransactions) => {
  const now = new Date();
  const amountArr = [];
  const stats = {
        sum: 0,
        avg: 0,
        max: 0,
        min: 0,
        count: 0
    };

    totalTransactions.forEach(transaction => {
      const date = new Date(transaction.timestamp);
      const transactionAmount = Number(transaction.amount);
  
      if((now - date) < (1000 * 60) === true){
        stats.count++
        stats.sum += transactionAmount;
        amountArr.push(transactionAmount)
      };
    });
    const sortedAmount = amountArr.sort()
    const maximum = sortedAmount[sortedAmount.length -1] !== undefined? sortedAmount[sortedAmount.length - 1] : 0;
    const minimum = sortedAmount[0] !== undefined? sortedAmount[0] : 0;
  
    
   
     stats.avg = (stats.sum / stats.count).toFixed(2);
     stats.sum = stats.sum.toFixed(2);
     stats.max = maximum.toFixed(2);
     stats.min = minimum.toFixed(2);

  return stats;

};
