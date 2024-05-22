const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const withdrawalsSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  ref: {
    type: String,
    trim: true,
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
  },
  OrderForm: {
    type: mongoose.Schema.ObjectId,
  },
  taxRate: {
    type: Number,
  },
  subTotal: {
    type: Number,
  },
  taxTotal: {
    type: Number,
  },
  total: {
    type: Number,
  },
  paymentMode: {
    type: mongoose.Schema.ObjectId,
    ref: 'PaymentMode',
    autopopulate: true,
    required: true,
  },
  status: {
    type: String,
    default: 'personal',
  },
  attachedFile: {
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
  created_by:{
    type: String,
    default:"amr"
  }
});

withdrawalsSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Withdrawals', withdrawalsSchema);
