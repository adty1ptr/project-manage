const config = require('../knexfile')[process.env.ENV_MODE]
const knex = require('knex')(config)

module.exports = knex;