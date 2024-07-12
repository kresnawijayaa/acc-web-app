const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Middleware untuk melayani file statis dari build React
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

// Menangani permintaan lain dan mengarahkan ke index.html dari build React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

module.exports = app;
