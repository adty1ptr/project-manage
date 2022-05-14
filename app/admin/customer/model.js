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
    let cust = new Customer(datas.company);
    let custId
    cust = { ...cust, isActive: true }
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

Customer.getAll = async (query, result) => {
    let { sortBy = 'id', sortDesc = 'DESC', page = 1, itemsPerPage = 10 } = query

    let sortData = []
    if (Array.isArray(sortBy)) {
        console.log("here")
        for(var i = 0; i < sortBy.length; i++) {
            sortData.push({
                column: sortBy[i],
                order: (sortDesc[i] == 'true') ? 'DESC' : 'ASC',
            })
        }
    } else {
        sortData.push({
            column: sortBy,
            order: sortDesc,
        })
    }

    var pagination = {}
    if (page < 1) page = 1
    var offset = (page -1 ) * itemsPerPage

    return Promise.all([
        knex('customers').count('* as count').first(),
        knex.select('customers.*')
            .from('customers')
            .leftJoin('pm_customer', 'customers.id', 'pm_customer.pm_id')
            .leftJoin('users as pm', 'pm.id', 'pm_customer.pm_id')
    ]).then(([total, rows]) => {
        var count = total.count
        console.log(count);
        var rows = rows
        pagination.total = count;
        pagination.itemsPerPage = itemsPerPage;
        pagination.offset = offset;
        pagination.to = offset + rows.length;
        pagination.last_page = Math.ceil(count / itemsPerPage);
        pagination.current_page = page;
        pagination.from = offset;
        pagination.data = rows;

        result(null, pagination)
    }).catch ( (err) => {
        result(null, err)
    })
}

module.exports = Customer;