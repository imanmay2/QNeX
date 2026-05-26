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
                backgroundColor: ['#fb7185', '#2563eb'],
                borderColor: ['#fff1f2', '#eff6ff'],
                borderWidth: 2,
                hoverOffset: 8,
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 12,
                    boxHeight: 12,
                    color: '#475569',
                    font: {
                        weight: 700,
                    },
                },
            },
        },
    };

   
    return (
            <Pie data={pieData} options={pieOptions} />
    )
}

export {PieChart};
