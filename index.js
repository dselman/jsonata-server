const express = require('express');
const jsonata = require('jsonata');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000

app.post('/', (req, res) => {
    console.log('+++++++++');
    console.log(JSON.stringify(req.body, null, 4));
    const expression = jsonata(`{
        "$class": "io.clause.revenueshare.MonthlySalesReport",
        "sales" : [
         $map($.data, function($v, $i, $a) {
               {
                "$class" : "io.clause.revenueshare.Sale",
                "transactionId" : "0",
                "timestamp" : $v[0],
                "product" : {
                    "$class" : "io.clause.revenueshare.Product",
                    "name" : $v[1],
                    "listPrice" : {
                        "$class": "org.accordproject.money.MonetaryAmount",
                        "doubleValue": 200.0,
                        "currencyCode": "USD"
                    }
                },
                "price" : {
                    "$class": "org.accordproject.money.MonetaryAmount",
                    "doubleValue": $number(($v[2]),
                    "currencyCode": "USD"
                }
            }
    })
        ]
    }`);
    const result = expression.evaluate(req.body);
    console.log(result);
    res.send(result)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))