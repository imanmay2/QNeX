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



function PieChart() {
    const pieData = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                label: 'Votes',
                data: [12, 19, 3],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
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