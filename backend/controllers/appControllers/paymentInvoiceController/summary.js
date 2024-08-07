const mongoose = require('mongoose');
const moment = require('moment');

const Model = mongoose.model('PaymentInvoice');

const summary = async (req, res) => {
  try {
    let defaultType = 'month';

    const { type, start_date, end_date } = req.query;

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
    let startDate = start_date!="null" && start_date ? moment(start_date, "DD-MM-YYYY").clone() : currentDate.clone().startOf(defaultType) ;
    let endDate = end_date!="null" && end_date? moment(end_date, "DD-MM-YYYY").clone() : currentDate.clone().endOf(defaultType) ;
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
          ],
          totalPaymentMonthly: [
            {
              $group: {
                _id: {
                  $dateToString: {
                    date: '$date' ,
                    format: "%Y-%m"
                  }
                },
                amount: { $sum: '$amount', },
              },
            },
            {
              $sort: { _id: 1 },
            }
          ],
        },
      },
    ]);
    const invoicePaymentByPaymentMode =  response2[0]?.invoicePaymentByPaymentMode || [];
    const totalPaymentMonthly = response2[0]?.totalPaymentMonthly || [];
    let paymentInvoiceByPM = []
    invoicePaymentByPaymentMode.forEach(i => {
      let temp = {
        name : i.mode.name[0].name,
        totalPaymentInvoice : i.total,
      }
      paymentInvoiceByPM.push(temp);
    });

    if(result.length>0){
      result[0].paymentInvoiceByPM =paymentInvoiceByPM;
      result[0].totalPaymentMonthly=totalPaymentMonthly;
    }

    return res.status(200).json({
      success: true,
      result: result.length > 0 ? result[0] : { count: 0, total: 0 ,totalPaymentMonthly:totalPaymentMonthly,paymentInvoiceByPM :paymentInvoiceByPM},
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
