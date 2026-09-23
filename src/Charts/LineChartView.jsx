import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import './LineChartView.css';

export default function LineChartView({
    data,
    title,
    xKey,
    yKey

}){

    return(

        <div className="chart-container">

            <h3 className="chart-title">{title}</h3>

            <ResponsiveContainer width="100%" height="100%">

                <LineChart data={data}>

                   <CartesianGrid
                        stroke="#41508d"
                        strokeDasharray="5 5"
                        vertical={false}
                     />

                    <XAxis
                        dataKey={xKey}
                        tick={{ fill: "#ffffff", fontSize: 14 }}
                        tickLine={false}
                        axisLine={false}
                    />

                       <YAxis
                          tick={{ fill: "#ffffff", fontSize: 14 }}
                          tickLine={false}
                          axisLine={false}
                        />

                       <Tooltip
                        contentStyle={{
                            backgroundColor: "#1a255f",
                            border: "none",
                            borderRadius: "10px",
                            color: "#fff"
                          }}
                       />

                      <Line
                        type="monotone"
                        dataKey={yKey}
                        stroke="#4ea8ff"
                        strokeWidth={4}
                       dot={{
                           r: 5,
                           fill: "#4ea8ff",
                           stroke: "#fff",
                           strokeWidth: 2
                         }}
                        activeDot={{
                          r: 8
                          }}
                       />

                </LineChart>

            </ResponsiveContainer>

        </div>

    )

}