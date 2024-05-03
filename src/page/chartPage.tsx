import React, { useEffect } from 'react';
import{drawLineChart} from "chartpakage"
import { testdatamodule } from 'testdata';
// import { Indicators } from '@ixjb94/indicators';
import CandlestickChartTS from './ChartModule';



const testobj= new testdatamodule(20)
// console.log("BB",testobj.getSeriesPeriod('close'));
// const sma1= testobj.getSMAForPeriod(10).then(data => console.log(data))
// console.log("AA",sma1);
const ohlcdata=testobj.getDataForPeriod(15)

const chartobj= new CandlestickChartTS({histdata:ohlcdata})

const data = testobj.getSeriesPeriod('close');
const divId = 'chartContainer'; // ID of the div where you want to render the chart

const ChartPage = () => {
  useEffect(() => {
    // Call drawLineChart function when component mounts
    drawLineChart(data, divId);
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount in class components

  return (
    <div id={divId}>
      {/* Placeholder for chart */}
    </div>
  );
}

export default ChartPage;
