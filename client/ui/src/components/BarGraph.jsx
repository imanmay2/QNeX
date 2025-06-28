import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

import {  Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);



function BarGraph() {
    
    const barData = {
        labels: ['March','April','May','June'],
        datasets: [
            {
                label: 'No. of Tests Attempted',
                data: [10,15,20,8],
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

export {BarGraph};