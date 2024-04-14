// import React from 'react'
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import moment from 'moment';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
function dateFormat(date) {
  return moment(date).format('DD/MM/YYYY');
}
function ChartTS({ expenses }) {
  let totalExpensesDaily = expenses?.totalExpensesDaily;
  let totals = totalExpensesDaily?.map((expense) => {
    const { total } = expense;
    return total;
  });
  if (!totals) return '';
  let data = {
    labels: totalExpensesDaily?.map((inc) => {
      const { _id } = inc;
      return dateFormat(_id);
    }),
    datasets: [
      {
        label: 'Expenses',
        data: [...totals],
        backgroundColor: 'red',
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="whiteBox shadow" style={{ minHeight: '380px', height: '100%' }}>
      <div
        className="pad20"
        style={{
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <h3 style={{ color: '#22075e', marginBottom: 30 }}>Total Expense</h3>
        <Line data={data} />
      </div>
    </div>
  );
}
export default ChartTS;
