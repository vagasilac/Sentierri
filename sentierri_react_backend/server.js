const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const AWS = require('aws-sdk');

const app = express();

// Apply middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use your routes
const routes = require('./routes/index');
app.use('/api', routes);

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server on port 3000 (or the port specified in the environment)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
