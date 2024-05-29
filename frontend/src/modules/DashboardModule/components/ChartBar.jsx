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
    BarElement,
} from 'chart.js';

import { Line, Pie, Bar } from 'react-chartjs-2';
import moment from 'moment';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,

    Title,
    Tooltip,
    Legend,
    ArcElement
);
// function dateFormat (date) {
//     return moment(date).format('DD/MM/YYYY')
// }
function ChartBars({ expenses, title }) {
    if (!expenses?.expensesCreatedbyCount) return '';

    var oilData = {
        labels: expenses?.expensesCreatedbyCount?.map((expense) => expense?.status),
        datasets: [
            {
                label: "",
                data: expenses?.expensesCreatedbyCount?.map((expense) => expense?.total),
                backgroundColor: [
                    '#e9724d',
                    '#d6d727',
                    '#92cad1',
                    '#79ccb3',
                    '#868686'
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
                <h3 style={{ color: '#22075e', marginBottom: 30 }}>{title}</h3>
                <Bar data={oilData} />

            </div>
        </div>
    );
}
export default ChartBars;
