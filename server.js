require('dotenv').config('.env');
const express = require('express');
const app = express();
const db = require('./models')

app.use((req, res, next) => {
    if (req.url != '/favicon.ico') {
        console.log(`${req.method} - ${req.url} @ ${new Date().toLocaleTimeString()}`);
        next();
    }
});

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('home')
});
app.get('*', (req, res) => {
    res.send('<h1>Error 404: Page not found</h1>');
});
app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`))
