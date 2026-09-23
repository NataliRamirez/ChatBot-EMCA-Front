import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Legend,
    Cell
} from "recharts";

export default function PieChartView({
    data,
    title,
    nameKey,
    valueKey
}) {

    const COLORS = [
        "#3b82f6",
        "#22c55e",
        "#f59e0b",
        "#ef4444"
    ];

    return (
        <div className="chart-container">

            <h3 className="chart-title">{title}</h3>

            <ResponsiveContainer width="100%" height="100%">

                <PieChart>
                    

                    <Pie
                        data={data}
                        dataKey={valueKey}
                        nameKey={nameKey}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        contentStyle={{
                            background: "#1a255f",
                            border: "none",
                            borderRadius: "10px",
                            color: "#fff"
                        }}
                    />

                    <Legend
                        verticalAlign="bottom"
                        align="center"
                    />

                </PieChart>

            </ResponsiveContainer>

        </div>
    );
}