const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.Promise = global.Promise;

const PaymentSupplierOrderSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  number: {
    type: Number,
    required: true,
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: 'Supplier',
    autopopulate: true,
    required: true,
  },
  supplierOrder: {
    type: mongoose.Schema.ObjectId,
    ref: 'SupplierOrder',
    required: true,
    autopopulate: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMode: {
    type: mongoose.Schema.ObjectId,
    ref: 'PaymentMode',
    autopopulate: true,
  },
  ref: {
    type: String,
  },
  description: {
    type: String,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
PaymentSupplierOrderSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('PaymentSupplierOrder', PaymentSupplierOrderSchema);
