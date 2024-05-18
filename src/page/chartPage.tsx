import React, { useEffect, useRef } from 'react';
import { testdatamodule } from 'testdata';
import CandlestickChartTS from './Chart/ChartModule';
import { DefaultChartParameter } from './Chart/ChartModule/types';

const testobj = new testdatamodule(1150);
const ohlcdata = testobj.getDataForPeriod(1150);
const divId = 'chartContainer';
const Candlestickparamater:DefaultChartParameter={}


// ohlcdata.map(item=>{

// })

const ChartPage = () => {
  const chartRef = useRef<CandlestickChartTS | null>(null);

  useEffect(() => {
    const chartContainer = document.getElementById(divId);
    if (!chartRef.current && chartContainer) {
      const width = chartContainer.offsetWidth; // Get the width of the chart container
      //const height = chartContainer.offsetHeight; // Get the height of the chart container
      const height=500
      chartRef.current = new CandlestickChartTS({ histdata: ohlcdata}, divId,{divWidth:width,divHeight:height});
    }
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount in class components

  return (
    <div id={divId} style={{ margin: '20px' }}>
      {/* Placeholder for chart */}
    </div>
  );
}

export default ChartPage;
