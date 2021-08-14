const express = require('express');
const router = express.Router();
const db = require('../models')

router.get('/login', (req, res) => {
    res.render('auth/login');
})
router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/login', (req, res) => {
    db.user.findOne({uName: req.body.uName}, (err, user) => {
        if(err) return console.log(err);
        if(!user) return res.send('<h1>Username could not be found</h1>');
        res.redirect('/')
    })
})

router.post('/register', (req, res) => {
    // Check duplicates email and username
    //Gen salt
    //Hash pass
    //create user with hashed
    //write session
    //redirect
    const {uName, email} = req.body;
    db.user.findOne({uName}, (err, found) => {
        if(err) return console.log(err);
        if(found) return res.send('<h1>Username already in use</h1>');
        db.user.findOne({email}, (err, found) => {
            if(err) return console.log(err);
            if(found) return res.send('<h1>Email already in use</h1>');
            db.user.create(req.body, (err, newUser) => {
                if(err) return console.log(err);
                console.log(newUser)
                res.redirect('/auth/login')
            })
        })
    })
})

module.exports = router;