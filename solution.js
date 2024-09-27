const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('orders.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    //console.log(results)
    // Part 1
    function partOneSolution(ordersArr) {
      // I created an array that contains all the customer ids and their spending
      // Incase there were multiple transactions from one account I created a conditional
      // Sadly this caused the time complexity to go up to probably n squared with the nested loops
      // Space complexity stays constant
      const customerSpending = []

      for (const order of ordersArr) {
        let isIncluded = false
        customerSpending.forEach((customer) => {
          if (customer.customerId === order.customer_id) isIncluded = true
        })

        if (!isIncluded) {
          customerSpending.push({customerId: order.customer_id, totalSpent: order.price_per_unit})
        } else {
          customerSpending.forEach((customer) => {
            if (customer.customerId === order.customer_id) {
              customer.totalSpent = customer.totalSpent + Number(order.price_per_unit)
            }
          })
        }
      }

      const topFiveCustomers = customerSpending.sort((a, b) => b.totalSpent - a.totalSpent).slice(0,5)
      console.log(topFiveCustomers)
    }
    
    // Part 2
    // Both functions are very similar and could be abstracted into one
    // Both functions have a time complexity of n^2 since they have two nested loops 
    // and these loops rely on the input meaning the bigger the input the more operations 
    // Their space complexity stays constant as no more variables are created depending on the input
    function mostCustomerOrders(ordersArr) {
      let customerOrders = []
      ordersArr.forEach((order) => {
        let isIncluded = false
        customerOrders.forEach((customer) => {
          if (customer.customerId === order.customer_id) isIncluded = true
        })
        if (isIncluded) {
          customerOrders.forEach((customer) => {
            if (customer.customerId === order.customer_id) {
              customer.orders += 1
            }
          })
        } else {
          customerOrders.push({customerId: order.customer_id, orders: 1})
        }
      })
      const CustomersWithMostOrders = customerOrders.sort((a,b) => b.orders - a.orders).slice(0,1)
      console.log(CustomersWithMostOrders)
    }

    function mostOrderedProduct(ordersArr) {
      const productOrders = []
      for (const order of ordersArr) {
        let isIncluded = false
        productOrders.forEach((product) => {
          if (product.productId === order.product_id) isIncluded = true
        })

        if (!isIncluded) {
          productOrders.push({productId: order.product_id, orders: order.quantity})
        } else {
          productOrders.forEach((product) => {
            if (product.productId === order.product_id) {
              product.orders = product.orders + order.product_id
            }
          })
        }
      }
      const mostPopularProduct = productOrders.sort((a,b) => b.orders - a.orders).slice(0,1)
      console.log(mostPopularProduct)
    }

    mostOrderedProduct(results)
  });