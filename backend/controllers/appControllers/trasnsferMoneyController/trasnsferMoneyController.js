const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const methods = createCRUDController('TransferMoney');
const summary = require('./summary');
methods.summary = summary;

module.exports = methods;
