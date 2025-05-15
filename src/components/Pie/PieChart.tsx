import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: any;
  options: any;
}

export const PieChart = ({ data, options }: PieChartProps) => {
  return <Pie data={data} options={options} />;
};