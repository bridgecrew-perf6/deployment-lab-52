const express = require('express')
const path = require('path')

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: `${process.env.ACCESS_TOKEN}`,
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar

rollbar.log("Malo e lelei!");

const app = express()

app.use(express.json)

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.use(express.static(path.join(__dirname, '../')))

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4440

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})