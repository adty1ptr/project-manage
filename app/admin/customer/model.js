const res = require('express/lib/response');
const knex = require('../../../database')

const Customer = function(cust) {
    this.name = cust.name,
    this.organizationNumber = cust.organizationNumber,
    this.city = cust.city,
    this.address = cust.address,
    this.postalCode = cust.postalCode,
    this.isActive = cust.isActive
}

Customer.create = async (datas, result) => {
    const cust = new Customer(datas);
    let custId
    await knex('customers').insert(cust).returning('id')
        .then(([id]) => {
            custId = parseInt(id.id)
            const pmInsert = datas.projectManagers.map(item => ({ 
                workerId: item.workerId, 
                email: item.email, 
                isActive: item.isActive
            }))
            const workerInsert = datas.workers.map(item => ({
                workerId: item.workerId, 
                email: item.email, 
                isActive: item.isActive
            }))

            Promise.all([
                knex('users').insert(pmInsert).returning('id'),
                knex('users').insert(workerInsert).returning('id'),
            ]).then(resultInsert => {
                const pmIds = resultInsert[0].map(item => ({ customer_id: custId, pm_id: parseInt(item.id) }))
                const workerIds = resultInsert[1].map(item => ({ customer_id: custId, worker_id: parseInt(item.id) }))

                return Promise.all([
                    knex('pm_customer').insert(pmIds),
                    knex('worker_customer').insert(workerIds)
                ])
            })
        })
        .then(() => {
            knex.select('customers.*')
            .from('customers')
            .leftJoin('pm_customer', 'customers.id', 'pm_customer.pm_id')
            .leftJoin('users as pm', 'pm.id', 'pm_customer.pm_id')
            .where('customers.id', custId)
            .then(data => {
                console.log(data);
                result(null, data);
            })
        })
}

module.exports = Customer;