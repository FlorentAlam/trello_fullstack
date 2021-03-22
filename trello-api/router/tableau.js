const express = require('express');
const router = express.Router();

const knex = require('../database');

const checkSignIn = (req, res, next) => {
    if(req.session.user_id) next();
}

// Retourne la liste des tableau de l'utilisateur ID
router.get('/', checkSignIn, async (req, res) => {
    const tableaux = await knex.select().table('tableaux');
    res.status(200).send(tableaux);
});

router.post('/new', checkSignIn, async (req, res) => {
    const { body } = req;
    try{
        let response = await knex('tableaux').insert({...body}, 'id');
        res.status(200).send(response);
    } catch(e){
        res.status(400).send();
    }
});

module.exports = router;