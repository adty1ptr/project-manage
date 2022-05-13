const { dbHost, dbName, dbPass, dbPort, dbUser } = require('../app/config')

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: dbHost,
        port: dbPort,
        user: dbUser,
        password: dbPass,
        database: dbName,
    },
})

module.exports = knex;