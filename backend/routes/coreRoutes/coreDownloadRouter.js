const downloadPdf = require('@/handlers/downloadHandler/downloadPdf');
const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const ModelQuote = mongoose.model('Quote');
const ModelInvoice = mongoose.model('Invoice');

const pug = require('pug');
const moment = require('moment');
let pdf = require('html-pdf');

outer.route('/amr').get(async (req, res) =>{//Invoice,Quote
  res.send("hiiii");
  console.log("hiiiihiiiihiiii")

});
router.route('/print/:modelName/:id').get(async (req, res) =>{//Invoice,Quote
  try {

  
  const { modelName,id } = req.params;
  console.log("hooooooooooooooooooooo");
  console.log(modelName);
  let Model =  (modelName=="quote"||modelName=="Quote")?ModelQuote:ModelInvoice;

  const result = await Model.findOne({ _id: id });
  const html =await pug.renderFile('views/pdf/' + modelName + '.pug', {
    model: result,
    moment: moment,
  });
    res.send(html);
  }
  catch (err) {
    console.log("asdasdasdasdasd");
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
