const express = require('express');

const { catchErrors } = require('@/handlers/errorHandlers');
const { authorizationSuperAdmin ,authorizationAdmin , authorizationStaff } = require('@/handlers/rulesHandler');


const router = express.Router();

const employeeController = require('@/controllers/appControllers/employeeController');
const paymentModeController = require('@/controllers/appControllers/paymentModeController');
const clientController = require('@/controllers/appControllers/clientController');
const leadController = require('@/controllers/appControllers/leadController');
const invoiceController = require('@/controllers/appControllers/invoiceController');
const itemController = require('@/controllers/appControllers/itemController');
const quoteController = require('@/controllers/appControllers/quoteController');
const supplierController = require('@/controllers/appControllers/supplierController');
const supplierOrderController = require('@/controllers/appControllers/supplierOrderController');
const expenseController = require('@/controllers/appControllers/expenseController/expenseController');
const withdrawalsController = require('@/controllers/appControllers/withDrawalsController/withdrawalsController');

const expenseCategoryController = require('@/controllers/appControllers/expenseCategoryController');
const paymentInvoiceController = require('@/controllers/appControllers/paymentInvoiceController');

const paymentSupplierOrderController = require('@/controllers/appControllers/paymentSupplierOrderController');

const offerController = require('@/controllers/appControllers/offerController');
const transferMoneyrController = require('@/controllers/appControllers/trasnsferMoneyController/trasnsferMoneyController');



// //_________________________________ API for employees_____________________
router.route('/employee/create').post(authorizationSuperAdmin(catchErrors(employeeController.create)));
router.route('/employee/read/:id').get(authorizationAdmin(catchErrors(employeeController.read)));
router.route('/employee/update/:id').patch(authorizationSuperAdmin(catchErrors(employeeController.update)));
router.route('/employee/delete/:id').delete(authorizationSuperAdmin(catchErrors(employeeController.delete)));
router.route('/employee/search').get(authorizationAdmin(catchErrors(employeeController.search)));
router.route('/employee/list').get(authorizationAdmin(catchErrors(employeeController.list)));
router.route('/employee/filter').get(authorizationAdmin(catchErrors(employeeController.filter)));

// //_____________________________________ API for payment mode_____________________
router.route('/paymentMode/create').post(authorizationSuperAdmin(catchErrors(paymentModeController.create)));
router.route('/paymentMode/read/:id').get(authorizationAdmin(catchErrors(paymentModeController.read)));
router.route('/paymentMode/update/:id').patch(authorizationSuperAdmin(catchErrors(paymentModeController.update)));
router.route('/paymentMode/delete/:id').delete(authorizationSuperAdmin(catchErrors(paymentModeController.delete)));
router.route('/paymentMode/search').get(authorizationAdmin(catchErrors(paymentModeController.search)));
router.route('/paymentMode/list').get(authorizationAdmin(catchErrors(paymentModeController.list)));
router.route('/paymentMode/filter').get(authorizationAdmin(catchErrors(paymentModeController.filter)));

// //_____________________________________ API for clients __________________________________________________
router.route('/client/create').post(authorizationSuperAdmin(catchErrors(clientController.create)));
router.route('/client/read/:id').get(authorizationAdmin(catchErrors(clientController.read)));
router.route('/client/update/:id').patch(authorizationSuperAdmin(catchErrors(clientController.update)));
router.route('/client/delete/:id').delete(authorizationSuperAdmin(catchErrors(clientController.delete)));
router.route('/client/search').get(authorizationAdmin(catchErrors(clientController.search)));
router.route('/client/list').get(authorizationAdmin(catchErrors(clientController.list)));
router.route('/client/filter').get(authorizationAdmin(catchErrors(clientController.filter)));
router.route('/client/summary').get(authorizationAdmin(catchErrors(clientController.summary)));

// //_____________________________________ API for leads __________________________________________________
router.route('/lead/create').post(authorizationSuperAdmin(catchErrors(leadController.create)));
router.route('/lead/read/:id').get(authorizationAdmin(catchErrors(leadController.read)));
router.route('/lead/update/:id').patch(authorizationSuperAdmin(catchErrors(leadController.update)));
router.route('/lead/delete/:id').delete(authorizationSuperAdmin(catchErrors(leadController.delete)));
router.route('/lead/search').get(authorizationAdmin(catchErrors(leadController.search)));
router.route('/lead/list').get(authorizationAdmin(catchErrors(leadController.list)));
router.route('/lead/filter').get(authorizationAdmin(catchErrors(leadController.filter)));
router.route('/lead/summary').get(authorizationAdmin(catchErrors(leadController.summary)));

// //_________________________________________________________________API for invoices_____________________
router.route('/invoice/create').post(authorizationSuperAdmin(catchErrors(invoiceController.create)));
router.route('/invoice/read/:id').get(authorizationAdmin(catchErrors(invoiceController.read)));
router.route('/invoice/update/:id').patch(authorizationSuperAdmin(catchErrors(invoiceController.update)));
router.route('/invoice/delete/:id').delete(authorizationSuperAdmin(catchErrors(invoiceController.delete)));
router.route('/invoice/search').get(authorizationAdmin(catchErrors(invoiceController.search)));
router.route('/invoice/list').get(authorizationAdmin(catchErrors(invoiceController.list)));
router.route('/invoice/filter').get(authorizationAdmin(catchErrors(invoiceController.filter)));
router.route('/invoice/pdf/:id').get(authorizationAdmin(catchErrors(invoiceController.generatePDF)));
router.route('/invoice/summary').get(authorizationAdmin(catchErrors(invoiceController.summary)));
router.route('/invoice/mail').post(authorizationSuperAdmin(catchErrors(invoiceController.sendMail)));

// //_________________________________________________________________API for items_____________________
router.route('/item/create').post(authorizationSuperAdmin(catchErrors(itemController.create)));
router.route('/item/read/:id').get(authorizationAdmin(catchErrors(itemController.read)));
router.route('/item/update/:id').patch(authorizationSuperAdmin(catchErrors(itemController.update)));
router.route('/item/delete/:id').delete(authorizationSuperAdmin(catchErrors(itemController.delete)));
router.route('/item/search').get(authorizationAdmin(catchErrors(itemController.search)));
router.route('/item/list').get(authorizationAdmin(catchErrors(itemController.list)));
router.route('/item/filter').get(authorizationAdmin(catchErrors(itemController.filter)));

// //_________________________________________________________________API for Quotes_____________________

router.route('/quote/create').post(authorizationStaff(catchErrors(quoteController.create)));
router.route('/quote/read/:id').get(authorizationStaff(catchErrors(quoteController.read)));
router.route('/quote/update/:id').patch(authorizationStaff(catchErrors(quoteController.update)));
router.route('/quote/delete/:id').delete(authorizationSuperAdmin(catchErrors(quoteController.delete)));
router.route('/quote/search').get(authorizationStaff(catchErrors(quoteController.search)));
router.route('/quote/list').get(authorizationStaff(catchErrors(quoteController.list)));
router.route('/quote/filter').get(authorizationStaff(catchErrors(quoteController.filter)));
router.route('/quote/pdf/:id').get(authorizationStaff(catchErrors(quoteController.generatePDF)));
router.route('/quote/summary').get(authorizationStaff(catchErrors(quoteController.summary)));
router.route('/quote/convert/:id').get(authorizationAdmin(catchErrors(quoteController.convertQuoteToInvoice)));
router.route('/quote/mail').post(authorizationStaff(catchErrors(quoteController.sendMail)));

// //___________________________________________ API for suppliers _____________________
router.route('/supplier/create').post(authorizationSuperAdmin(catchErrors(supplierController.create)));
router.route('/supplier/read/:id').get(authorizationAdmin(catchErrors(supplierController.read)));
router.route('/supplier/update/:id').patch(authorizationSuperAdmin(catchErrors(supplierController.update)));
router.route('/supplier/delete/:id').delete(authorizationSuperAdmin(catchErrors(supplierController.delete)));
router.route('/supplier/search').get(authorizationAdmin(catchErrors(supplierController.search)));
router.route('/supplier/list').get(authorizationAdmin(catchErrors(supplierController.list)));
router.route('/supplier/filter').get(authorizationAdmin(catchErrors(supplierController.filter)));

// //___________________________________________ API for suppliers _____________________
router.route('/supplierOrder/create').post(authorizationSuperAdmin(catchErrors(supplierOrderController.create)));
router.route('/supplierOrder/read/:id').get(authorizationAdmin(catchErrors(supplierOrderController.read)));
router.route('/supplierOrder/update/:id').patch(authorizationSuperAdmin(catchErrors(supplierOrderController.update)));
router.route('/supplierOrder/delete/:id').delete(authorizationSuperAdmin(catchErrors(supplierOrderController.delete)));
router.route('/supplierOrder/search').get(authorizationAdmin(catchErrors(supplierOrderController.search)));
router.route('/supplierOrder/list').get(authorizationAdmin(catchErrors(supplierOrderController.list)));
router.route('/supplierOrder/filter').get(authorizationAdmin(catchErrors(supplierOrderController.filter)));
router.route('/supplierOrder/summary').get(authorizationAdmin(catchErrors(supplierOrderController.summary)));

// //_____________________________________________ API for supplier payments_________________

router.route('/payment/supplierOrder/create').post(authorizationSuperAdmin(catchErrors(paymentSupplierOrderController.create)));
router.route('/payment/supplierOrder/read/:id').get(authorizationAdmin(catchErrors(paymentSupplierOrderController.read)));
router.route('/payment/supplierOrder/update/:id').patch(authorizationSuperAdmin(catchErrors(paymentSupplierOrderController.update)));
router.route('/payment/supplierOrder/delete/:id').delete(authorizationSuperAdmin(catchErrors(paymentSupplierOrderController.delete)));
router.route('/payment/supplierOrder/search').get(authorizationAdmin(catchErrors(paymentSupplierOrderController.search)));
router.route('/payment/supplierOrder/list').get(authorizationAdmin(catchErrors(paymentSupplierOrderController.list)));
router.route('/payment/supplierOrder/filter').get(authorizationAdmin(catchErrors(paymentSupplierOrderController.filter)));
router.route('/payment/supplierOrder/pdf/:id').get(authorizationAdmin(catchErrors(paymentSupplierOrderController.generatePDF)));
router.route('/payment/supplierOrder/summary').get(authorizationAdmin(catchErrors(paymentSupplierOrderController.summary)));

// //_________________________________________________________________API for Withdrawals_____________________

router.route('/withdrawals/create').post(authorizationSuperAdmin(catchErrors(withdrawalsController.create)));
router.route('/withdrawals/read/:id').get(authorizationAdmin(catchErrors(withdrawalsController.read)));
router.route('/withdrawals/update/:id').patch(authorizationSuperAdmin(catchErrors(withdrawalsController.update)));
router.route('/withdrawals/delete/:id').delete(authorizationSuperAdmin(catchErrors(withdrawalsController.delete)));
router.route('/withdrawals/search').get(authorizationAdmin(catchErrors(withdrawalsController.search)));
router.route('/withdrawals/list').get(authorizationAdmin(catchErrors(withdrawalsController.list)));
router.route('/withdrawals/filter').get(authorizationAdmin(catchErrors(withdrawalsController.filter)));
router.route('/withdrawals/summary').get(authorizationAdmin(catchErrors(withdrawalsController.summary)));

// //_________________________________________________________________API for expenses_____________________

router.route('/expense/create').post(authorizationSuperAdmin(catchErrors(expenseController.create)));
router.route('/expense/read/:id').get(authorizationAdmin(catchErrors(expenseController.read)));
router.route('/expense/update/:id').patch(authorizationSuperAdmin(catchErrors(expenseController.update)));
router.route('/expense/delete/:id').delete(authorizationSuperAdmin(catchErrors(expenseController.delete)));
router.route('/expense/search').get(authorizationAdmin(catchErrors(expenseController.search)));
router.route('/expense/list').get(authorizationAdmin(catchErrors(expenseController.list)));
router.route('/expense/filter').get(authorizationAdmin(catchErrors(expenseController.filter)));
router.route('/expense/summary').get(authorizationAdmin(catchErrors(expenseController.summary)));

// //_________________________________________________________________API for expense categories________________

router.route('/expenseCategory/create').post(authorizationSuperAdmin(catchErrors(expenseCategoryController.create)));
router.route('/expenseCategory/read/:id').get(authorizationAdmin(catchErrors(expenseCategoryController.read)));
router.route('/expenseCategory/update/:id').patch(authorizationSuperAdmin(catchErrors(expenseCategoryController.update)));
router.route('/expenseCategory/delete/:id').delete(authorizationSuperAdmin(catchErrors(expenseCategoryController.delete)));
router.route('/expenseCategory/search').get(authorizationAdmin(catchErrors(expenseCategoryController.search)));
router.route('/expenseCategory/list').get(authorizationAdmin(catchErrors(expenseCategoryController.list)));
router.route('/expenseCategory/filter').get(authorizationAdmin(catchErrors(expenseCategoryController.filter)));

// //_____________________________________________ API for client payments_________________

router.route('/payment/invoice/create').post(authorizationSuperAdmin(catchErrors(paymentInvoiceController.create)));
router.route('/payment/invoice/read/:id').get(authorizationAdmin(catchErrors(paymentInvoiceController.read)));
router.route('/payment/invoice/update/:id').patch(authorizationSuperAdmin(catchErrors(paymentInvoiceController.update)));
router.route('/payment/invoice/delete/:id').delete(authorizationSuperAdmin(catchErrors(paymentInvoiceController.delete)));
router.route('/payment/invoice/search').get(authorizationAdmin(catchErrors(paymentInvoiceController.search)));
router.route('/payment/invoice/list').get(authorizationAdmin(catchErrors(paymentInvoiceController.list)));
router.route('/payment/invoice/filter').get(authorizationAdmin(catchErrors(paymentInvoiceController.filter)));
router.route('/payment/invoice/pdf/:id').get(authorizationAdmin(catchErrors(paymentInvoiceController.generatePDF)));
router.route('/payment/invoice/summary').get(authorizationAdmin(catchErrors(paymentInvoiceController.summary)));

//router.route('/payment/invoice/mail').post(authorizationSuperAdmin(catchErrors(paymentInvoiceController.sendMail)));

// //_________________________________________________________________API for Offers_____________________

router.route('/offer/create').post(authorizationSuperAdmin(catchErrors(offerController.create)));
router.route('/offer/read/:id').get(authorizationAdmin(catchErrors(offerController.read)));
router.route('/offer/update/:id').patch(authorizationSuperAdmin(catchErrors(offerController.update)));
router.route('/offer/delete/:id').delete(authorizationSuperAdmin(catchErrors(offerController.delete)));
router.route('/offer/search').get(authorizationAdmin(catchErrors(offerController.search)));
router.route('/offer/list').get(authorizationAdmin(catchErrors(offerController.list)));
router.route('/offer/filter').get(authorizationAdmin(catchErrors(offerController.filter)));
router.route('/offer/pdf/:id').get(authorizationAdmin(catchErrors(offerController.generatePDF)));
router.route('/offer/summary').get(authorizationAdmin(catchErrors(offerController.summary)));

// //_________________________________________________________________API for moneyTransfer_____________________

router.route('/transferMoney/create').post(authorizationSuperAdmin(catchErrors(transferMoneyrController.create)));
router.route('/transferMoney/read/:id').get(authorizationAdmin(catchErrors(transferMoneyrController.read)));
router.route('/transferMoney/update/:id').patch(authorizationSuperAdmin(catchErrors(transferMoneyrController.update)));
router.route('/transferMoney/delete/:id').delete(authorizationSuperAdmin(catchErrors(transferMoneyrController.delete)));
router.route('/transferMoney/search').get(authorizationAdmin(catchErrors(transferMoneyrController.search)));
router.route('/transferMoney/list').get(authorizationAdmin(catchErrors(transferMoneyrController.list)));
router.route('/transferMoney/filter').get(authorizationAdmin(catchErrors(transferMoneyrController.filter)));
router.route('/transferMoney/summary').get(authorizationAdmin(catchErrors(transferMoneyrController.summary)));


module.exports = router;
