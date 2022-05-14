const knex = require('../../database')

const User = function(user) {
    this.name = user.name,
    this.email = user.email,
    this.password = user.password
    this.workerId = user.workerId
}

module.exports = User