import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function AreaChartView({
    data,
    title,
    xKey,
    yKey

}){

    return(

        <div className="chart-container">

            <h3 className="chart-title">{title}</h3>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <CartesianGrid/>
                    <XAxis dataKey={xKey}/>
                    <YAxis/>
                    <Tooltip/>
                    <Area dataKey={yKey}/>
                </AreaChart>
            </ResponsiveContainer>

        </div>

    )

}