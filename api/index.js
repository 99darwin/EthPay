const // Main starting point of the application
    express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    app = express();

// DB Setup
mongoose.connect('mongodb://localhost:27017/ethpay',{useMongoClient: true});
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());
app.options('*', cors());

// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const api = require('./api/');

app.use(api);

server.listen(port);
console.log('Server listening on:', port);
