const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const methods = createCRUDController('Withdrawals');
const summary = require('./summary');
methods.summary = summary;


module.exports = methods;
