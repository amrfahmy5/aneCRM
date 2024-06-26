const downloadPdf = require('@/handlers/downloadHandler/downloadPdf');
const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const ModelQuote = mongoose.model('Quote');
const ModelInvoice = mongoose.model('Invoice');
const ModelSupplierOrder = mongoose.model('SupplierOrder');


const pug = require('pug');
const moment = require('moment');
let pdf = require('html-pdf');

router.route('/print/:modelName/:id').get(async (req, res) =>{//Invoice,Quote
  try {
  let { modelName,id } = req.params;
  modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1)
  // modelName=(modelName=="quote"||modelName=="Quote")?"Quote":"Invoice";
  let Model =  (modelName=="Quote")?ModelQuote:(modelName=="SupplierOrder")?ModelSupplierOrder:ModelInvoice;
  const result = await Model.findOne({ _id: id });
  const html =await pug.renderFile('views/pdf/' + modelName + '.pug', {
    model: result,
    moment: moment,
  });
    res.send(html);
  }
  catch (err) {
    console.log(err);
    res.send(err);
  }
});
router.route('/:subPath/:directory/:id').get(function (req, res) {
  const { subPath, directory, id } = req.params;

  // Handle the /payment/invoice/* route
  if (subPath == 'payment' && directory == 'invoice') {
    downloadPdf(req, res, { directory: 'PaymentInvoice', id });
  } else {
    downloadPdf(req, res, { directory, id });
  }
});

router.route('/:directory/:id').get(function (req, res) {
  const { directory, id } = req.params;

  downloadPdf(req, res, { directory, id });
});




module.exports = router;
