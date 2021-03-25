const express = require('express');
const router = express.Router();
const knex = require('../database');

const checkSignIn = (req, res, next) => {
    if(req.session.user_id) next();
}

router.post('/new', checkSignIn, async (req, res) => {
    const { body } = req;
    try{
        let response = await knex('etiquettes').insert({...body}, 'id');
        res.status(200).send(response);
    } catch(e){
        res.status(400).send();
    }
});

router.put('/update/:etiquette_id', checkSignIn, async (req, res) => {
    const { etiquette_id } = req.params;
    const { body } = req;
    try{
        let response = await knex('etiquettes').where('id', etiquette_id).update({...body});
        res.status(200).send();
    } catch(e){
        res.status(400).send();
    }
})

router.delete('/delete/:etiquette_id', checkSignIn, async (req, res) => {
    const { etiquette_id } = req.params;
    try{
        let response = await knex('etiquettes').where('id', etiquette_id).del();
        res.status(200).send();
    } catch(e){
        res.status(400).send();
    }
});

module.exports = router;