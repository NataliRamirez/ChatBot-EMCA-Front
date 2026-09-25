import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function BarChartView({
    data,
    title,
    xKey,
    yKey,
    color
}){

    return(
         <ResponsiveContainer width="100%" height="100%">

    <BarChart data={data}>

        <CartesianGrid
            stroke="#44508b"
            strokeDasharray="4 4"
            vertical={false}
        />

        <XAxis
            dataKey={xKey}
            tick={{ fill:"#fff" }}
            tickLine={false}
            axisLine={false}
        />

        <YAxis
            tick={{ fill:"#fff" }}
            tickLine={false}
            axisLine={false}
        />

        <Tooltip
            contentStyle={{
                background:"#16235d",
                borderRadius:"10px",
                border:"none",
                color:"#fff"
            }}
        />

                <Bar

                   dataKey={yKey}
                   fill={color}
                   radius={[8,8,0,0]}
                   barSize={45}
                    label

                  />
           </BarChart>

          </ResponsiveContainer>
    )

}