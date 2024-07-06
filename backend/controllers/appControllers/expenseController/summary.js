const mongoose = require('mongoose');
const moment = require('moment');
const enxpenseCategoryController = require('@/controllers/appControllers/expenseCategoryController');

const Model = mongoose.model('Expense');
const ModelExpenseCategory = mongoose.model('Expense');

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
          totalExpense: [
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
          expenseCategoryCounts: [
            {
              $lookup: {
                from: 'expensecategories',
                localField: 'expenseCategory',
                foreignField: '_id',
                as: 'expenseCategory.name',
              },
            },
            {
              $group: {
                _id: '$expenseCategory',
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
                total: '$total',
              },
            },
          ],
          totalExpensesDaily: [
            {
              $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },//'%Y-%m-%d'
                total: { $sum: '$total', },
                count: { $sum: 1 },
              },
            },
            {
              $sort: { _id: -1 },
            }
          ],
          expensesCreatedbyCount: [
            // { "$match": { "status": "personal" } },
            {
              $group: {
                _id: '$created_by',
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
                total: '$total',
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
          totalExpenseMonthly: [
            {
              $group: {
                _id: {
                  $dateToString: {
                    date: '$date' ,
                    format: "%Y-%m"
                  }
                },
                total: { $sum: '$total', },
              },
            },
            {
              $sort: { _id: 1 },
            }
          ],
          expenseByPaymentMode: [
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

    const totalExpenseByPM =  response2[0].expenseByPaymentMode || [];
    let expensesByPM = []
    totalExpenseByPM.forEach(i => {
      let tempPM = {
        name : i.mode.name[0].name,
        totalExpense : i.total,
      }
      expensesByPM.push(tempPM);
    });
    
    const totalExpenseMonthly =  response2[0].totalExpenseMonthly || [];

    const totalExpenses = response[0].totalExpense ? response[0].totalExpense[0] : 0;
    let resultCategories = [];
    response[0].expenseCategoryCounts.map((e) => {
      let temp = {
        categoryName: e.status.name[0].name,
        count: e.count,
        categoryTotal: e.total,
      };
      resultCategories.push(temp);
    });

    const finalResult = {
      total: totalExpenses?.total.toFixed(2),
      type,
      performance: resultCategories,
      expensesCreatedbyCount:response[0].expensesCreatedbyCount,
      totalExpensesDaily: response[0].totalExpensesDaily,
      totalExpenseMonthly,
      expensesByPM
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
