const express = require('express');
const router = express.Router();
const knex = require('../database');


// Retourne la liste des listes du tableau ID
router.get('/:liste_id', async (req, res) => {
    const { liste_id } = req.params;

    const cartes = await knex.where({liste_id}).select().table('cartes');
    res.status(200).send(cartes);
});

router.post('/new', async (req, res) => {
    const { body } = req;
    try{
        let response = await knex('cartes').insert({...body}, 'id');
        res.status(200).send(response);
    } catch(e){
        res.status(400).send();
    }
});

module.exports = router;