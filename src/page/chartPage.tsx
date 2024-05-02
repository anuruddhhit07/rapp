import React, { useEffect } from 'react';
import{drawLineChart} from "chartpakage"


const data = [1, 2, 3, 4, 5];
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
