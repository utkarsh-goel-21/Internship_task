import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ActivityChart = ({ stats }) => {
  // Group stats by date
  const byDate = {};

  stats.forEach((entry) => {
    if (!byDate[entry.date]) {
      byDate[entry.date] = { date: entry.date, productive: 0, unproductive: 0, neutral: 0 };
    }
    byDate[entry.date][entry.category] += Math.round(entry.timeSpent / 60);
  });

  const chartData = Object.values(byDate)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((d) => ({
      ...d,
      date: new Date(d.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e293b] border border-[#475569] rounded-lg p-3 text-xs">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((p) => (
            <p key={p.name} style={{ color: p.color }}>
              {p.name}: {p.value}m
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-[#1e293b] border-[#475569]">
      <CardHeader>
        <CardTitle className="text-white text-sm font-semibold uppercase tracking-wider">
          Daily Activity (minutes)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <p className="text-[#94a3b8] text-sm">No data yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="date"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }}
              />
              <Bar dataKey="productive" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="unproductive" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="neutral" fill="#475569" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityChart;