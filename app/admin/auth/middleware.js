const { secretKey } = require('../../config')
const jwt = require('jsonwebtoken')
const knex = require('../../../database')

function authenticate (req, res, next) {
    const authHeader = req.get("Authorization")
    const token = authHeader.split(" ")[1]

    jwt.verify(token, secretKey, (error, payload) => {
        if (error) throw new Error("sign in error!")
        knex("users")
            .where('id', id)
            .first()
            .then(user => {
                req.user = user
                next()
            })
            .catch(err => {
                res.json({
                    err: 1,
                    message: err.message,
                })
            })
    })
}