const express = require('express');
const router = express.Router();
// const passport = require('passport');
const bcrypt = require('bcrypt');
const knex = require('../database');

const checkSignIn = (req, res, next) => {
    if(req.session.user_id) next();
}

router.post('/connexion', async (req, res) => {
    const {email, password} = req.body;

    let user = await knex.where({email}).select().table('users');
    if(!user.length) return res.status(400).send("USER_NOT_FOUND_ERROR");
    bcrypt.compare(password, user[0].password, (err, isMatch) => {
        if(err) return res.status(400).send("INTERNAL_ERROR");
        if(isMatch){
            req.session.user_id = user[0].id;
            return res.send({userId: user[0].id});
        } else {
            return res.status(400).send("PASSWORD_ERROR");
        }
    })
});

router.post('/inscription', async (req, res) => {
    const {email, password} = req.body;

    let user = await knex.where({email: email}).select().table('users');
    if(user.length) return res.status(400).send("USER_ALREADY_REGISTERED_ERROR");

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return res.status(400).send("INTERNAL_ERROR");
        bcrypt.hash(password, salt, async (err, hash) => {
            if(err) return res.status(400).send("INTERNAL_ERROR");;
            await knex('users').insert({email, password: hash});
            return res.sendStatus(200);
        })
    })
});

router.get('/deconnexion', (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
})

module.exports = router;