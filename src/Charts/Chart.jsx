import './Chart.css';

import BarChartView from './BarChartView';
import LineChartView from './LineChartView';
import PieChartView from './PieChartView';
import AreaChartView from './AreaChartView';

export default function Chart(props) {

    const {
        type,
        data,
        title,
        xKey,
        yKey,
        nameKey,
        valueKey
    } = props;

    switch (type) {

        case "bar":
            return (
                 <BarChartView

                 title={title}
                 data={data}
                 xKey={xKey}
                 yKey={yKey}
                 color={props.color}

                />
            );

        case "line":
            return (
                <LineChartView
                    title={title}
                    data={data}
                    xKey={xKey}
                    yKey={yKey}
                />
            );

        case "pie":
            return (
                <PieChartView
                       title={title}
                       data={data}
                       nameKey={nameKey}
                       valueKey={valueKey}
                   />
            );

        case "area":
            return (
                <AreaChartView
                    title={title}
                    data={data}
                    xKey={xKey}
                    yKey={yKey}
                />
            );

        default:
            return <p>Tipo de gráfico no válido.</p>;
    }
}