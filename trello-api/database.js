const secret = require('./secret');


const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: secret.DB_HOST,
        user: secret.DB_USER,
        password: secret.DB_PASSWORD,
        database: secret.DB_NAME
    }
})

module.exports = knex;