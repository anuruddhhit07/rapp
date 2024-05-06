import * as d3 from 'd3';

// Format functions
const formatMillisecond = d3.timeFormat(".%L");
const formatSecond = d3.timeFormat(":%S");
const formatMinute = d3.timeFormat("%I:%M");
const formatHour = d3.timeFormat("%I %p");
const formatDay = d3.timeFormat("%a %d");
const formatWeek = d3.timeFormat("%b %d");
const formatMonth = d3.timeFormat("%B %Y");
const formatYear = d3.timeFormat("%Y");

// Multi-format function
export const multiFormat = (i: d3.NumberValue, stockid: string = "temp:1D", xdata: string[]) => {
    const parser = d3.timeParse("%s");
    const intervalid = stockid.split(":")[1];
    const index = +i; // Convert to number
    
    if (isNaN(index) || index < 0 || index >= xdata.length) {
        return null;
    }

    const dateStr = xdata[index];
    const date = parser(dateStr) as Date;

    let fn: (date: Date) => string;
    switch (intervalid) {
        case "1m":
        case "3m":
        case "5m":
        case "15m":
        case "30m":
        case "45m":
            fn = formatMinute;
            break;
        case "1H":
        case "2H":
        case "4H":
            fn = formatHour;
            break;
        case "1D":
            fn = formatDay;
            break;
        case "1W":
            fn = formatWeek;
            break;
        case "1M":
            fn = formatMonth;
            break;
        default:
            fn = () => ''; // Default function
            break;
    }

    return fn(date);
};

export const  formatVolume=(volumei:d3.NumberValue):string=> {
    const volume = +volumei;
    if (volume >= 1000000) {
      return (volume / 1000000).toFixed(0) + "M";
    } else if (volume >= 1000) {
      return (volume / 1000).toFixed(0) + "k";
    } else {
      return volume.toString();
    }
  }
