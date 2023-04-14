/* global require __dirname, process */
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3002;
const app = express();

app.use(express.static(path.resolve(__dirname, '../')));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(port);
console.log('server started on port ' + port);
