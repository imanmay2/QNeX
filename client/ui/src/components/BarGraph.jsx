import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);



function BarGraph({ barData_ }) {
    // format: {3:1,2:2,1:0,12:1}
    let keys=Object.keys(barData_);
    let values=Object.values(barData_);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const barData = {
        labels: [months[keys[0]-1],months[keys[1]-1],months[keys[2]-1],months[keys[3]-1]],
        datasets: [
            {
                label: 'No. of Tests Attempted',
                data: values,   
                backgroundColor: 'rgba(75,192,192,0.6)',
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <Bar data={barData} options={barOptions} />
    )
}

export { BarGraph };