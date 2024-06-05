const mongoose = require('mongoose');
const moment = require('moment');

const Model = mongoose.model('SupplierOrder');

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
          totalSupplierOrder: [
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
          ],
          statusCounts: [
            {
              $group: {
                _id: '$status',
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
                status: '$_id',
                count: '$count',
                total: '$total'
              },
            },
          ],
          paymentStatusCounts: [
            {
              $group: {
                _id: '$paymentStatus',
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
                status: '$_id',
                count: '$count',
                total: '$total'
              },
            },
          ],
          overdueCounts: [
            {
              $match: {
                expiredDate: {
                  $lt: new Date(),
                },
              },
            },
            {
              $group: {
                _id: '$status',
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
                status: '$_id',
                count: '$count',
                total: '$total'
              },
            },
          ],
          totalSupplierOrderMonthly: [
            {
              $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' }},
                // _id: { $month: { $toDate: "$date" }  },
                // _id: {
                //   $dateToString: {
                //     date: '$date' ,
                //     format: "%Y-%m"
                //   }
                // },
                // _id: { month: { $month: { $toDate: "$date" } } },
                // _id: {$month: "$date"}, 
                
                //  averageValue: { $total: "$total" },
                total: { $sum: '$subTotal', },
              },
            },
            {
              $sort: { _id: -1 },
            }
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
          totalSupplierOrderMonthly: [
            {
              $group: {
                _id: {
                  $dateToString: {
                    date: '$date' ,
                    format: "%Y-%m"
                  }
                },
                total: { $sum: '$subTotal', },
              },
            },
            {
              $sort: { _id: 1 },
            }
          ],
        },
      },
    ]);
    let result = [];

    const totalSupplierOrders = response[0].totalSupplierOrder ? response[0].totalSupplierOrder[0] : 0;
    const statusResult = response[0].statusCounts || [];
    const paymentStatusResult = response[0].paymentStatusCounts || [];
    const overdueResult = response[0].overdueCounts || [];
    const totalSupplierOrderMonthly =  response2[0].totalSupplierOrderMonthly || [];

    const statusResultMap = statusResult.map((item) => {
      return {
        ...item,
        percentage: Math.round((item.count / totalSupplierOrders.count) * 100),
      };
    });

    const paymentStatusResultMap = paymentStatusResult.map((item) => {
      return {
        ...item,
        percentage: Math.round((item.count / totalSupplierOrders.count) * 100),
      };
    });

    const overdueResultMap = overdueResult.map((item) => {
      return {
        ...item,
        status: 'overdue',
        percentage: Math.round((item.count / totalSupplierOrders.count) * 100),
      };
    });

    statuses.forEach((status) => {
      const found = [...paymentStatusResultMap, ...statusResultMap, ...overdueResultMap].find(
        (item) => item.status === status
      );
      if (found) {
        result.push(found);
      }
    });

    const unpaid = await Model.aggregate([
      {
        $match: {
          removed: false,
          date: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate(),
          },
          paymentStatus: 'unpaid',
        },
      },
      {
        $group: {
          _id: null,
          total_amount: {
            $sum: '$total',
          },
        },
      },
      {
        $project: {
          _id: 0,
          total_amount: '$total_amount',
        },
      },
    ]);

    const finalResult = {
      total: totalSupplierOrders?.total.toFixed(2),
      total_undue: unpaid.length > 0 ? unpaid[0].total_amount.toFixed(2) : 0,
      type,
      performance: result,
      totalSupplierOrderMonthly
    };

    return res.status(200).json({
      success: true,
      result: finalResult,
      message: `Successfully found all SupplierOrders for the last ${defaultType}`,
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
