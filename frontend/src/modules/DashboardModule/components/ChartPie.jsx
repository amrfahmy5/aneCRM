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

import { Line, Pie } from 'react-chartjs-2';
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
// function dateFormat (date) {
//     return moment(date).format('DD/MM/YYYY')
// }
function ChartPies({ expenses }) {
  console.log(expenses?.performance);
  if (!expenses?.performance) return '';

  var oilData = {
    labels: expenses?.performance?.map((expense) => expense?.categoryName),
    datasets: [
      {
        data: expenses?.performance?.map((expense) => expense?.categoryTotal),
        backgroundColor: [
          '#595959',
          '#1890ff',
          '#1890ff',
          '#ffa940',
          '#ff4d4f',
          '#13c2c2',
          '#95de64',
          '#ff4d4f',
          '#95de64',
          '#13c2c2',
          '#722ed1',
          '#614700',
        ],
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
        <h3 style={{ color: '#22075e', marginBottom: 30 }}>Expense Category</h3>
      </div>
      <Pie data={oilData} />
    </div>
  );
}
export default ChartPies;
