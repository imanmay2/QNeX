import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);



function PieChart({attempted,notAttempted}) {
    
    const pieData = {
        labels: ['Test Not Attempted', 'Test Attempted'],
        datasets: [
            {
                label: 'Tests',
                data: [notAttempted,attempted],
                backgroundColor: ['#FF6384', '#36A2EB'],
                borderWidth: 1,
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

   
    return (
            <Pie data={pieData} options={pieOptions} />
    )
}

export {PieChart};