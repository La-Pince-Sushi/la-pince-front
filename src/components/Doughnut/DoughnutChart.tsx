import { FC } from 'react'; // Function Component
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData } from 'chart.js';

// Enregistrement obligatoire des éléments utilisés par Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Définition des props du composant
interface DoughnutChartProps {
  data: ChartData<'doughnut', number[], string>;
  options?: ChartOptions<'doughnut'>;
}

// Composant réutilisable
export const DoughnutChart: FC<DoughnutChartProps> = ({ data, options }) => {
  return <Doughnut data={data} options={options} />;
};