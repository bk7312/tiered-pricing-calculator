import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { PlotType } from "./types";

export default function LineGraph({
  data,
  unit,
  price,
}: {
  data: PlotType;
  unit: string;
  price: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={400} className="max-w-2xl p-4">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: -5,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="usage"
          name="Usage"
          label={{
            value: `Usage ${unit ? `(${unit})` : ""}`,
            position: "insideBottom",
            offset: -5,
          }}
        />
        <YAxis
          dataKey="cost"
          name="Cost"
          label={{
            value: `Cost ${price ? `(${price})` : ""}`,
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Line type="monotone" dataKey="cost" stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
