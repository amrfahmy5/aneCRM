const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const transferSchemaMoney = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  moneyFrom: {
    type: mongoose.Schema.ObjectId,
    ref: 'PaymentMode',
    autopopulate: true,
  },
  moneyTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'PaymentMode',
    autopopulate: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});
transferSchemaMoney.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('TransferMoney', transferSchemaMoney);
