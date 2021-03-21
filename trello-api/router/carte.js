const express = require('express');
const router = express.Router();
const knex = require('../database');

const checkSignIn = (req, res, next) => {
    if(req.session.user_id) next();
}
// Retourne la liste des listes du tableau ID
router.get('/:liste_id', checkSignIn, async (req, res) => {
    const { liste_id } = req.params;

    const cartes = await knex.where({liste_id}).select().table('cartes');
    res.status(200).send(cartes);
});

router.post('/new', checkSignIn, async (req, res) => {
    const { body } = req;
    try{
        let response = await knex('cartes').insert({...body}, 'id');
        res.status(200).send(response);
    } catch(e){
        res.status(400).send();
    }
});

module.exports = router;