const express = require('express');
const router = express.Router();

const knex = require('../database');

const checkSignIn = (req, res, next) => {
    if(req.session.user_id) next();
}
// Retourne la liste des listes du tableau ID
router.get('/:tableau_id', checkSignIn, async (req, res) => {
    const { tableau_id } = req.params;

    const listes = await knex.where({tableau_id}).select().table('listes');
    res.status(200).send(listes);
});

router.post('/new', checkSignIn, async (req, res) => {
    const { body } = req;
    try{
        let response = await knex('listes').insert({...body}, 'id');
        res.status(200).send(response);
    } catch(e){
        res.status(400).send();
    }
});

router.put('/update', checkSignIn, async (req, res) => {
    const { body } = req;
    try{
        let response = await knex('listes')
                            .where('id', body.id)
                            .update({
                                name: body.name
                            });
        res.sendStatus(200);
    } catch(e){
        res.sendStatus(400);
    }
});

module.exports = router;