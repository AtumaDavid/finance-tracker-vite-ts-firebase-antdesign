import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  PieLabelRenderProps,
} from "recharts";

interface Transaction {
  type: string;
  date: string;
  amount: number;
  tag?: string;
}

interface ChartsProps {
  sortedTransactions: Transaction[];
}

export default function Charts({ sortedTransactions }: ChartsProps) {
  // Parse date to ensure correct sorting and display
  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  // Sort transactions by date
  const sortedData = [...sortedTransactions].sort(
    (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
  );

  // Combine data for the chart with cumulative totals
  const chartData = sortedData.reduce(
    (acc, transaction, index) => {
      const prevEntry =
        index > 0
          ? acc[index - 1]
          : {
              cumulativeIncome: 0,
              cumulativeExpense: 0,
            };

      const newEntry = {
        date: transaction.date,
        cumulativeIncome:
          transaction.type === "Income"
            ? prevEntry.cumulativeIncome + transaction.amount
            : prevEntry.cumulativeIncome,
        cumulativeExpense:
          transaction.type === "expense"
            ? prevEntry.cumulativeExpense + transaction.amount
            : prevEntry.cumulativeExpense,
      };

      return [...acc, newEntry];
    },
    [] as Array<{
      date: string;
      cumulativeIncome: number;
      cumulativeExpense: number;
    }>
  );

  // Pie Chart Data - Spending by Category
  const spendingByCategory = sortedData
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => {
      const category = transaction.tag || "Uncategorized";
      return {
        ...acc,
        [category]: (acc[category] || 0) + transaction.amount,
      };
    }, {} as Record<string, number>);

  const spendingData = Object.entries(spendingByCategory).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // Color palette for pie chart
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#FF6384",
    "#36A2EB",
  ];

  // Custom label render function
  const renderPieLabel = ({
    name,
    percent,
  }: PieLabelRenderProps & { name: string }) => {
    return `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`;
  };

  return (
    <div className="charts-wrapper">
      <div>
        <h2>Income and Expense Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickCount={5}
              axisLine={false}
              tickLine={false}
              fontSize={10}
            />
            <YAxis axisLine={false} tickLine={false} fontSize={10} width={50} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f5f5f5",
                border: "none",
                borderRadius: 8,
              }}
              formatter={(value, name) => [
                `₦${Number(value).toLocaleString()}`,
                name === "cumulativeIncome"
                  ? "Cumulative Income"
                  : "Cumulative Expense",
              ]}
            />
            <Legend iconSize={10} fontSize={10} />
            <Line
              type="monotone"
              dataKey="cumulativeIncome"
              name="Cumulative Income"
              stroke="#4ade80"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="cumulativeExpense"
              name="Cumulative Expense"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2>Spending by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={spendingData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              // label={({ name, percent }) =>
              //   `${name} ${(percent * 100).toFixed(0)}%`
              // }
              label={renderPieLabel}
            >
              {spendingData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [
                `₦${Number(value).toLocaleString()}`,
                "Amount",
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
