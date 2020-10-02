const express = require('express');
const connectDB = require('../config/db');
const cors = require('cors');

const accounts = require('./routes/accounts');

const app = express();

connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.use('/api/accounts', accounts);

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));