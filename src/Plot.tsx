import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

import useAppStore from './store.ts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Plot() {
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const data = {
    labels: labels.map((el) => el.spin),
    datasets: [
      // TODO
      // { fill: 'origin' },
      {
        label: 'Dataset 1',
        data: labels.map((el) => el.abundance),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
