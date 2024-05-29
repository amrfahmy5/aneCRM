const mongoose = require('mongoose');
const moment = require('moment');

const Model = mongoose.model('TransferMoney');

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
    startDate.add(-1,'hours')
    endDate.add(1,'hours')
    
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
          totalTransfer: [
            {
              $group: {
                _id: null,
                total: {
                  $sum: '$amount',
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
          ],
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
          transferFromByPaymentMode: [
            {
              $lookup: {
                from: 'paymentmodes',
                localField: 'moneyFrom',
                foreignField: '_id',
                as: 'moneyFrom.name',
              },
            },
            {
              $group: {
                _id: '$moneyFrom',
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
                _id: 0,
                mode: '$_id',
                count: '$count',
                total: '$total',
              },
            },
          ],
          transferToByPaymentMode: [
            {
              $lookup: {
                from: 'paymentmodes',
                localField: 'moneyTo',
                foreignField: '_id',
                as: 'moneyTo.name',
              },
            },
            {
              $group: {
                _id: '$moneyTo',
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
    const totalTransfer = response[0].totalTransfer ? response[0].totalTransfer[0] : 0;
    const transferFromByPaymentMode =  response2[0].transferFromByPaymentMode || [];
    const transferToByPaymentMode =  response2[0].transferToByPaymentMode || [];
    let transferFromByPM = []
    transferFromByPaymentMode.forEach(i => {
      let tempPM = {
        name : i.mode.name[0].name,
        totalMoneySend : i.total,
      }
      transferFromByPM.push(tempPM)

    });
    let transferToByPm = []
    transferToByPaymentMode.forEach(i => {
      let tempPM = {
        name : i.mode.name[0].name,
        totalMoneyReceived : i.total,
      }
      transferToByPm.push(tempPM);
    });

    const finalResult = {
      total: totalTransfer?.total.toFixed(2),
      transferFromByPM,
      transferToByPm,
    };

    return res.status(200).json({
      success: true,
      result: finalResult,
      message: `Successfully found all Expenses for the last ${defaultType}`,
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
