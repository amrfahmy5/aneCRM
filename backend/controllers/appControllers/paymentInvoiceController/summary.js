const mongoose = require('mongoose');
const moment = require('moment');

const Model = mongoose.model('PaymentInvoice');

const summary = async (req, res) => {
  try {
    let defaultType = 'month';

    const { type } = req.query;

    if (type) {
      if (['week', 'month', 'year'].includes(type)) {
        defaultType = type;
      } else {
        return res.status(400).json({
          success: false,
          result: null,
          message: 'Invalid type',
        });
      }
    }

    const currentDate = moment();
    let startDate = currentDate.clone().startOf(defaultType);
    let endDate = currentDate.clone().endOf(defaultType);
    startDate.add(-1,'hours');
    endDate.add(1,'hours');
    
    // get total amount of invoices
    const result = await Model.aggregate([
      {
        $match: {
          removed: false,
          date: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate(),
          },
        },
      },
      {
        $group: {
          _id: null, // Group all documents into a single group
          count: {
            $sum: 1,
          },
          total: {
            $sum: '$amount',
          },
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id from the result
          count: 1,
          total: 1,
        },
      },
    ]);

    const response2 = await Model.aggregate([
      {
        $match: {
          removed: false
        },
      },
      {
        $facet: {
          invoicePaymentByPaymentMode: [
            {
              $lookup: {
                from: 'paymentmodes',
                localField: 'paymentMode',
                foreignField: '_id',
                as: 'paymentMode.name',
              },
            },
            {
              $group: {
                _id: '$paymentMode',
                count: {
                  $sum: 1,
                },
                totalPayment: {
                  $sum: '$amount',
                },
              },
            },
            {
              $project: {
                _id: 0,
                mode: '$_id',
                count: '$count',
                total: '$totalPayment',
              },
            },
          ]
        },
      },
    ]);

    const invoicePaymentByPaymentMode =  response2[0].invoicePaymentByPaymentMode || [];
    let paymentInvoiceByPM = []
    invoicePaymentByPaymentMode.forEach(i => {
      let temp = {
        name : i.mode.name[0].name,
        totalPaymentInvoice : i.total,
      }
      paymentInvoiceByPM.push(temp);
    });
    result[0].paymentInvoiceByPM =paymentInvoiceByPM;
    // console.log(paymentInvoiceByPM);

    return res.status(200).json({
      success: true,
      result: result.length > 0 ? result[0] : { count: 0, total: 0 },
      message: `Successfully fetched the summary of payment invoices for the last ${defaultType}`,
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Oops there is an Error',
      error: error,
    });
  }
};

module.exports = summary;
