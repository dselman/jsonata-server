const express = require('express');
const jsonata = require('jsonata');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const port = 3000

app.post('/', (req, res) => {
    console.log('+++++++++');
    console.log(JSON.stringify(req.body, null, 4));
    const query = fs.readFileSync('jsonata.json').toString();
    console.log(query);
    const expression = jsonata(query);
    const result = expression.evaluate(req.body);
    console.log(result);
    res.send(result)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))