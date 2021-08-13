require('dotenv').config('.env');
const express = require('express');
const app = express();


app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`))
