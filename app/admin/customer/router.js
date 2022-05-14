const router = require('express').Router();
const { route } = require('../auth/router');
const custController = require('./controller')

router.get('/customers', custController.getAll)
router.post('/customer/add', custController.add)

module.exports = router;