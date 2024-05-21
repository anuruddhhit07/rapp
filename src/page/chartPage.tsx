import React, { useEffect, useRef } from 'react';
import { testdatamodule } from 'testdata';
import CandlestickChartTS from './Chart/ChartModule';
import { DefaultChartParameter } from './Chart/ChartModule/types';
import TechGroup from './Chart/TechModule';
import { Shared_Allstockdata, updateChartData } from './Chart/ChartModule/DataUtility/chartDataUitility';

const techGroup= TechGroup.getInstance();
// console.log(Shared_Allstockdata);

const testobj = new testdatamodule(1150);
const ohlcdata = testobj.getDataForPeriod(1150);
const divId = 'chartContainer';
const Candlestickparamater:DefaultChartParameter={}

updateChartData('histdata',ohlcdata)
// console.log(Shared_Allstockdata);
techGroup.attachOHLCV(ohlcdata);
const zigzag=techGroup.calculateZizZag()
// console.log(zigzag);
// updateChartData('techdata', undefined, 'zigzagdata', { sublist: [{ orgindex: 1, value: 20 }], brlist: [] });

// Shared_Allstockdata['techdata']={zigzagdatasub:{sublist: zigzag.sublist,brlist: zigzag.brlist}}
updateChartData('techdata', undefined,'zigzagdatasub',zigzag)
// console.log(Shared_Allstockdata);


const ChartPage = () => {
  const chartRef = useRef<CandlestickChartTS | null>(null);

  useEffect(() => {
    const chartContainer = document.getElementById(divId);
    if (!chartRef.current && chartContainer) {
      const width = chartContainer.offsetWidth; // Get the width of the chart container
      //const height = chartContainer.offsetHeight; // Get the height of the chart container
      const height=700
      chartRef.current = new CandlestickChartTS(Shared_Allstockdata, divId,{divWidth:width,divHeight:height});
    }
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount in class components

  return (
    <div id={divId} style={{ margin: '20px' }}>
      {/* Placeholder for chart */}
    </div>
  );
}

export default ChartPage;
