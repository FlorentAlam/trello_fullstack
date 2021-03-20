const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err){
            return res.sendStatus(400);
        }
        if(!user){
            return res.sendStatus(400);
        }
        req.logIn(user, (err) => {
            if(err){
                return res.sendStatus(400);
            }
            return res.status(200);
        });
    })(req, res, next);
});

module.exports = router;