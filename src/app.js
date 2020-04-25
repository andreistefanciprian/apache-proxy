const express = require('express')
const os = require('os')
const app = express()

var version = "01";

//index page
app.get('', (req, res) => {
    console.log("Received request from " + req.connection.remoteAddress);
    res.status(200).send("Running on: " + os.hostname() + " | ver=" + version + "\n");

})

//get 500 Status Code
app.get('/500', (req, res) => {
    console.log("Received break request from " + req.connection.remoteAddress);
    res.status(500).send("Running on: " + os.hostname() + " | Status Page 500 NOT OK\n")
})

//trigger CPU intensive calc
app.get('/load', function(req, res, next) {
  var val = 0.0001
  for (i = 0; i < 1000000; i++) {
    val += Math.sqrt(val);
    console.log('Value is: ' + val + "\n")
  }
  res.status(200).send("Running on: " + os.hostname() + " | Generating CPU load ...\n")
});


// get 200 Status Code
app.get('/status', (req, res) => {
    console.log("Received status check request from " + req.connection.remoteAddress);
    res.status(200).send("Running on: " + os.hostname() + " | Status Page 200 OK\n")
})


app.listen(3000, () => {
    console.log('Welcome to Express app....')
})