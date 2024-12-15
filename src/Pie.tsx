import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import useAppStore from './store.ts';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Pie() {
    const { selected } = useAppStore();

    // Is it cool? Maybe not.
    // It draws the stuff? Yea.
    let labels = [];
    selected.isotopes.forEach((iso) => {
        const spins = labels.map((label) => label.spin);
        if (!spins.includes(iso.spin)) {
            labels.push({ spin: iso.spin, abundance: iso.isotopic_composition });
        } else {
            const labels_draft = [];
            labels.forEach((lbl) => {
                if (lbl.spin == iso.spin) {
                    const new_label = {
                        spin: lbl.spin,
                        abundance: lbl.abundance + iso.isotopic_composition,
                    };
                    labels_draft.push(new_label);
                } else {
                    labels_draft.push(lbl);
                }
            })
            labels = labels_draft;
        }
    });

    const data = {
        labels: labels.map((el) => el.spin),
        datasets: [
            // TODO
            // { fill: 'origin' },
            {
                label: 'Dataset 1',
                data: labels.map((el) => el.abundance),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

  return <Doughnut data={data} />;
}
