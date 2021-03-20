const express = require('express');
const router = express.Router();

const knex = require('../database');

// Retourne la liste des tableau de l'utilisateur ID
router.get('/', async (req, res) => {
    const tableaux = await knex.select().table('tableaux');
    res.status(200).send(tableaux);
});

router.post('/new', async (req, res) => {
    const { body } = req;
    try{
        let response = await knex('tableaux').insert({...body}, 'id');
        res.status(200).send(response);
    } catch(e){
        res.status(400).send();
    }
});

module.exports = router;