require('dotenv').config('.env');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');


app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
    if (req.url != '/favicon.ico' && req.url != '/styles/main.css') {
        console.log(`${req.method} - ${req.url} @ ${new Date().toLocaleTimeString()}`);
        console.log(req.headers.cookie)
    }
    const authHeader = req.headers.cookie;
    const token = authHeader && authHeader.split('=')[1];
    console.log(token)
    next();
});

// Controllers
app.use('/auth', require('./controllers/authCtrl'));


app.get('/', (req, res) => {
    res.render('home', {accessToken: req.accessToken})
});
app.get('*', (req, res) => {
    res.send('<h1>Error 404: Page not found</h1>');
});
app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`))
