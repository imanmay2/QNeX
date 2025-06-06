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
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81],
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