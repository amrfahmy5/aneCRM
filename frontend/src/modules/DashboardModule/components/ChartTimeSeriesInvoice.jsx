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
function ChartTSInvoice({ title,Date }) {

  let totals = Date?.map((item) => {
    const { total } = item;
    return total;
  });

  if (!totals) return '';
  let data = {
    labels: Date?.map((inc) => {
      return inc?._id;
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
        <h3 style={{ color: '#22075e', marginBottom: 30 }}>{title}</h3>
        <Line data={data} />
      </div>
    </div>
  );
}
export default ChartTSInvoice;
