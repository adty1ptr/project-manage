const Customer = require('./model')
const response = require('../../util/helper/response')

async function add(req, res) {
    let datas = req.body

    Customer.create(datas, (err,data) => {
        if (err)
            response.err(err.message, res)
        else
            response.ok(data, res)
    })
}

module.exports = {
    add,
}