const mongoose = require('mongoose');
const moment = require('moment');

const Model = mongoose.model('Withdrawals');
const ModelWithdrawalsCategory = mongoose.model('Withdrawals');

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
    let startDate = start_date ? moment(start_date, "DD-MM-YYYY").clone() : currentDate.clone().startOf(defaultType) ;
    let endDate = end_date ? moment(end_date, "DD-MM-YYYY").clone() : currentDate.clone().endOf(defaultType) ;
    startDate.add(-1,'hours')
    endDate.add(1,'hours')
    
    const statuses = ['draft', 'pending', 'overdue', 'paid', 'unpaid', 'partially'];
    const response = await Model.aggregate([
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
        $facet: {
          totalWithdrawalss: [
            {
              $group: {
                _id: null,
                total: {
                  $sum: '$total',
                },
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $project: {
                _id: 0,
                total: '$total',
                count: '$count',
              },
            },
          ]
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
          withdrawalsByPaymentMode: [
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
                total: {
                  $sum: '$total',
                },
              },
            },
            {
              $project: {
                _id: 0,
                mode: '$_id',
                count: '$count',
                total: '$total',
              },
            },
          ]
        },
      },
    ]);
    const totalWithdrawalsByPM =  response2[0].withdrawalsByPaymentMode || [];
    let withdrawalssByPM = []
    totalWithdrawalsByPM.forEach(i => {
      let tempPM = {
        name : i.mode.name[0].name,
        totalWithdrawals : i.total,
      }
      withdrawalssByPM.push(tempPM);
    });
    

    const totalWithdrawalss = response[0].totalWithdrawalss ? response[0].totalWithdrawalss[0] : 0;




    const finalResult = {
      total: totalWithdrawalss?.total.toFixed(2),
      type,
      withdrawalssByPM
    };

    return res.status(200).json({
      success: true,
      result: finalResult,
      message: `Successfully found all Withdrawalss for the last ${defaultType}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Oops there is an Error',
      error: error,
    });
  }
};

module.exports = summary;
