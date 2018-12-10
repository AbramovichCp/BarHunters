const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.use(express.static('public'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const db = require('./config/db.config');

require('./routes/event.route')(app);

// Create a Server
const server = app.listen(8080, function() {
  let host = server.address().address;
  let port = server.address().port;

  console.log('App listening at http://localhost:%s', port);
});