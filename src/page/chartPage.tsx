import React, { useEffect, useRef } from 'react';
import { testdatamodule } from 'testdata';
import CandlestickChartTS from './ChartModule';

const testobj = new testdatamodule(150);
const ohlcdata = testobj.getDataForPeriod(150);
const divId = 'chartContainer';

const ChartPage = () => {
  const chartRef = useRef<CandlestickChartTS | null>(null);

  useEffect(() => {
    if (!chartRef.current) {
      chartRef.current = new CandlestickChartTS({ histdata: ohlcdata }, divId);
    }
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount in class components

  return (
    <div id={divId} style={{ margin: '20px' }}>
      {/* Placeholder for chart */}
    </div>
  );
}

export default ChartPage;
