import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
  Legend,
} from "recharts";
import { IChartDatum } from "../../interfaces";

type TResponsiveAreaChartProps = {
  kpi: string;
  data: IChartDatum[];
  colors: {
    stroke: string;
    fill: string;
  };
};

export const ResponsiveAreaChart = ({
  kpi,
  data,
  colors,
}: TResponsiveAreaChartProps) => {
  return (
    <ResponsiveContainer height={400}>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend align="right" iconType="plainline" />
        <Line
          name={`${data?.[0]?.date} - ${data?.[data.length - 1]?.date}`}
          type="monotone"
          dataKey="value"
          stroke="#489AD2"
          dot={false}
        />
        <Line
          name={`${data?.[0]?.date} - ${data?.[data.length - 1]?.date}`}
          type="monotone"
          dataKey={(dataPoint) => dataPoint.value * Math.floor((Math.random()*2))}
          stroke={colors?.stroke}
          dot={false}
          strokeDasharray="4 1 2"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
