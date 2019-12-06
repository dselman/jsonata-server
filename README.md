# jsonata-server
Little express server that processes incoming POST requests using JSONata.

Edit the file `jsonata.json` to define your JSONata query.

Launch the server using `node index.js`

HTTP POST JSON data to `/` - the results of running the JSONata query will be returned in the response.