const express = require('express');
const router = express.Router();
const knex = require('../database');

const checkSignIn = (req, res, next) => {
    if(req.session.user_id) next();
}
// Retourne la liste des cartes de la liste ID
router.get('/:liste_id', checkSignIn, async (req, res) => {
    const { liste_id } = req.params;

    const cartes = await knex.where({liste_id}).select().table('cartes');

    for(let i = 0; i < cartes.length; i++){
        const etiquettes = await knex.where({carte_id: cartes[i].id}).select().table('etiquettes');
        const checklist = await knex.where({carte_id: cartes[i].id}).select().table('checklistItems');
        cartes[i].etiquettes = etiquettes;
        cartes[i].checklists = checklist;
    }
    console.log(cartes);
    res.status(200).send(cartes);
});

router.post('/update-etiquettes', async (req, res) => {
    const { body } = req;
    try{
        let response = await knex('etiquettes').insert({...body}, 'id');
        res.status(200).send(response);
    } catch(e){
        res.status(400).send();
    }
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