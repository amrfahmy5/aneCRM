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
function ChartTSTWO({ title1,title2,Date , Date2=[] }) {

  // let totals = Date?.map((item) => {
  //   const { total } = item;
  //   return total;
  // });
  // let totals2 = Date2?.map((item) => {
  //   const { total } = item;
  //   return total;
  // });
  if (!Date||!Date2) return '';

  var res = Date.map(item => {
    let keys1 = Object.keys(item);
    let max = 0;
    const temp = Date2.reduce((prev, item2) => {
      let maxTemp = keys1.filter(key => item['_id'] === item2['_id']).length;

      if (maxTemp > max) {
        max = maxTemp;
        prev = item2;
      }
      return prev;
    }, {})

    if (temp) {
      return { ...item, ...temp }
    }
  });

  let total =res.map(item=>item.total?item.total:0)
  let amount =res.map(item=>item.amount?item.amount:0)


  let data = {
    labels: res?.map((inc) => {
      return inc?._id;
    }),
    datasets: [
      {
        label: title1,
        data: [...total],
        backgroundColor: 'red',
        tension: 0.2,
      },
      {
        label: title2,
        data: [...amount],
        backgroundColor: 'green',
        tension: 0.2,
      },
    ],
  };



  // let data2 = {
  //   labels: Date2?.map((inc) => {
  //     return inc?._id;
  //   }),
  //   datasets: [
  //     {
  //       label: title,
  //       data: [...totals],
  //       backgroundColor: 'green',
  //       tension: 0.2,
  //     },
  //   ],
  // };
  return (
    <div className="whiteBox shadow" style={{ minHeight: '380px', height: '100%' }}>
      <div
        className="pad20"
        style={{
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <h3 style={{ color: '#22075e', marginBottom: 30 }}>Monthly {title1}</h3>
        <Line data={data} />
      </div>
    </div>
  );
}
export default ChartTSTWO;
