import * as React from "react";
import { Chart } from "react-google-charts";

export const PieChart = props => {
    return (
    <div className={"my-pretty-chart-container"}>
        <Chart
          chartType="PieChart"
          data={props.data}
          width="100%"
          height="400px"
          legendToggle
          options={{
            // colors: ['#FB7A21'],
            backgroundColor: { fill:'transparent', color: '#808080' },
            color: 'black',
            legendTextStyle: { color: 'white', fontSize: 20 },
            titleTextStyle: { color: 'white', fontSize: 20 },
            // hAxis: {
            //     color: 'white'
            // },
            is3D: true,
            textStyle:{color: 'white', fontSize: 20}
          }}
        />
      </div>
    )
}

export default PieChart;