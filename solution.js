const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('orders.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {

    const partOneSolution = (ordersArr) => {
      // I created an array that contains all the customer ids and their spending
      // Incase there were multiple transactions from one account I created a conditional
      // Sadly this caused the time complexity to go up to probably n squared with the nested loops
      // Space complexity stays constant
      const customerSpending = []

      for (const order of ordersArr) {
        if (!customerSpending.forEach((customer) => customer.customerId === order.customer_id)) {
          customerSpending.push({customerId: order.customer_id, totalSpent: order.price_per_unit})
        } else {
          customerSpending.forEach((customer) => {
            if (customer.customerId === order.customer_id) {
              customer.totalSpent + order.price_per_unit
            }
          })
        }
      }

      const topFiveCustomers = customerSpending.sort((a, b) => b.totalSpent - a.totalSpent).slice(0,5)
      console.log(topFiveCustomers)
    }
    partOneSolution(results)
  });