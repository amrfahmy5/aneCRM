const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const supplierOrderSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  number: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  recurring: {
    type: String,
    default: '0',
  },
  date: {
    type: Date,
    required: true,
  },
  expiredDate: {
    type: Date,
    required: true,
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: 'Supplier',
    required: true,
    autopopulate: true
  },
  items: [
    {
      itemName: {
        type: String,
        trim: true,
        required: true,
      },
      description: {
        type: String,
        trim: true,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
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
  credit: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  paymentInvoice: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'paymentInvoice',
    },
  ],
  paymentStatus: {
    type: String,
    default: 'unpaid',
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    default: 'draft',
  },
  pdfPath: {
    type: String,
    default: '',
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
supplierOrderSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('SupplierOrder', supplierOrderSchema);
