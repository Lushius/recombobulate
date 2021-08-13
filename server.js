require('dotenv').config('.env');
const express = require('express');
const app = express();
const db = require('./models')


app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`))
