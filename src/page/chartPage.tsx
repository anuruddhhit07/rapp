import React, { useEffect, useRef, useState } from "react";
import { testdatamodule } from "testdata";


// import {CandlestickChartTS,TechGroup} from "./Chart/index";
// import { DefaultChartParameter } from "./Chart/types";
// import { Shared_Allstockdata, updateChartData } from "./Chart/ChartModule/DataUtility/chartDataUitility";
// import { getbackestdata } from "./Chart/TechModule/testdata/becktestreportdata";

// import {CandlestickChartTS,TechGroup,getbackestdata,updateChartData,Shared_Allstockdata} from "../dist";
// import {CandlestickChartTS,TechGroup,Shared_Allstockdata,updateChartData} from "../dist";
import {CandlestickChartTS,TechGroup,Shared_Allstockdata,updateChartData,getbackestdata} from "webpacklib";
// // import  {getbackestdata2}  from "Achartlib/dist/Chart/ChartModule/DataUtility/chartDataUitility";
// import {getbackestdata2} from "Achartlib/dist/Chart/ChartModule/DataUtility/chartDataUitility"
// import {getbackestdata} from "Achartlib/dist/Chart/TechModule"

// import {CandlestickChartTS,TechGroup,Shared_Allstockdata,updateChartData,getbackestdata} from "Achartlib/dist/index.js";

const techGroup = TechGroup.getInstance();


console.log(getbackestdata());

const testobj = new testdatamodule(1500);


const divId = "chartContainer";
// const Candlestickparamater: DefaultChartParameter = {};
const backtestdata=getbackestdata()
// console.log(getbackestdata(0));
// console.log(testdata);


const ChartPage = () => {
  const chartobj = useRef<CandlestickChartTS | null>(null);
  const intervalId: any = useRef();
  const [isIntervalRunning, setIsIntervalRunning] = useState(false);
  const datacount = useRef(300);

  const handleToggleInterval = () => {
    // console.log("hereerrtre");
    setIsIntervalRunning((prevState) => !prevState);
  };

  useEffect(() => {
    const ohlcdata = testobj.getDataRange(0,datacount.current);

    updateChartData("histdata", ohlcdata);
    techGroup.attachOHLCV(ohlcdata);
    const zigzag = techGroup.calculateZizZag();
    updateChartData("techdata", undefined, "zigzagdatasub", zigzag);
    updateChartData("techdata", undefined, "btresult", backtestdata);

    const chartContainer = document.getElementById(divId);
    if (!chartobj.current && chartContainer) {
      const width = chartContainer.offsetWidth; // Get the width of the chart container
      //const height = chartContainer.offsetHeight; // Get the height of the chart container
      const height = 500;
      chartobj.current = new CandlestickChartTS(Shared_Allstockdata, divId, { divWidth: width, divHeight: height,liveFunction:handleToggleInterval });
    }
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount in class components

  const simulateNewData = () => {
    // console.log("simulateNewData");
    datacount.current=datacount.current+1
    // console.log(datacount.current);
    const ohlcdata = testobj.getDataRange(0,datacount.current);
    // console.log(ohlcdata.length);
    updateChartData("histdata", ohlcdata);
    techGroup.attachOHLCV(ohlcdata);
    const zigzag = techGroup.calculateZizZag();
    updateChartData("techdata", undefined, "zigzagdatasub", zigzag);
    chartobj.current?.updatechart(Shared_Allstockdata)

  };

  const startInterval = () => {
    if (!intervalId.current) {
      intervalId.current = setInterval(simulateNewData, 1000);
      setIsIntervalRunning(true);
      
    }
  };

  const stopInterval = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
    setIsIntervalRunning(false);
  };

  useEffect(() => {
    if (isIntervalRunning) {
      startInterval();
    } else {
      stopInterval();
    }

    return () => {
      stopInterval();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntervalRunning]);

  return (
    <>
      {/* <button onClick={handleToggleInterval}>Change ID</button> */}
      <div id={divId} style={{ margin: "20px" }}>
        {/* Placeholder for chart */}
      </div>
    </>
  );
};

export default ChartPage;
