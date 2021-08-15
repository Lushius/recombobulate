const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    res.render('auth/login', {accessToken: req.accessToken});
})
router.get('/register', (req, res) => {
    res.render('auth/register', {accessToken: req.accessToken})
})

router.post('/login', (req, res) => {
    db.user.findOne({uName: req.body.uName}, (err, foundUser) => {
        if(err) return console.log(err);
        if(!foundUser) return res.send('<h1>Username could not be found</h1>');
        bcrypt.compare(req.body.password, foundUser.password, (err, match) => {
            if(err) return console.log(err);
            if(!match) return res.send('Incorrect password');
            const user = {
                uName: foundUser.uName,
            }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn: 20});
            res.cookie('authorization', accessToken)
            res.redirect('/');
        })
    })
})

router.post('/register', (req, res) => {
    db.user.findOne({uName: req.body.uName}, (err, found) => {
        if(err) return console.log(err);
        if(found) return res.send('<h1>Username already in use</h1>');
        db.user.findOne({email: req.body.email}, (err, found) => {
            if(err) return console.log(err);
            if(found) return res.send('<h1>Email already in use</h1>');
            bcrypt.genSalt(10, (err, salt) => {
                if(err) return console.log(err);
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if(err) return console.log(err);
                    const {fName, lName, uName, email, password} = req.body;
                    const newUser = {fName, lName, uName, email, password: hash}
                    db.user.create(newUser, (err, created) => {
                        if(err) return console.log(err);
                        console.log(created)
                        res.redirect('/auth/login')
                    })
                })
            })
        })
    })
})

module.exports = router;