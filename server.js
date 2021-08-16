require('dotenv').config('.env');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');


app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url} @ ${new Date().toLocaleTimeString()}`);
    const cookie = req.headers.cookie
    const token = cookie && cookie.split('=')[1];
    if(token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {console.log(err); req.uName = null; next()}
            req.uName = decoded.uName;
            console.log(token)
            console.log(req.uName)
            next();
        })
    } else {req.uName = null; next();}
});

// Controllers
app.use('/auth', require('./controllers/authCtrl'));


app.get('/', (req, res) => {
    res.render('home', {user: req.uName})
});
app.get('*', (req, res) => {
    res.send('<h1>Error 404: Page not found</h1>');
});
app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`))
