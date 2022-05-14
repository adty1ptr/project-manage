const knex = require('../../../database')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secretKey } = require('../../config');

async function login(req, res) {
    const { email, password } = req.body;

    await knex("users")
        .where('email', email)
        .first()
        .then(retrievedUser => {
            if(!retrievedUser) throw new Error("User not found");

            return Promise.all([
                bcrypt.compare(password, retrievedUser.password),
                Promise.resolve(retrievedUser)
            ]).then(results => {
                const isPwdSame = results[0]
                if (!isPwdSame) res.json({
                    err: 1,
                    message: 'Password not same'
                })
                const payload = {id: results[1].id}
                jwt.sign(payload, secretKey, (error, token) => {
                    if(error) throw new Error("Sign in error!")
                    res.json({token, results})
                })
            })
        })
}

module.exports = {
    login,
}