const express = require('express');
var cors = require('cors');
const app = express();

const accounts = require('./routes/accounts');

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));
app.use('/api/accounts', accounts);

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));