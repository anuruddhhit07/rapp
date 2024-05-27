import * as d3 from "d3";
import * as TechnicalIndicators from "./Technicalfn";
import { getbackestdata } from "./testbacktestresult";
// import TechClass from "./TechClass1";
// import techclass from './Technicalfn';
// const techclass = new TechClass();
function getStatusAndComment(item) {
    const commentObject = {
        "NO DATA 15m FOUND FOR THIS TRIGGERINDEX": "No data at 15min",
        "islowBelowREFclose": "Hit Low At 15min Opening",
        "isTargetAchieved": "Traget Acieved",
        "isPriceBelowStopLoss": "Stoploss hit",
    };
    const candletype = {
        "cancel_PatternBaseIndex": "Parent Candle",
        "cancel_trigger": "Child Candle",
        "PatternBaseIndex": "Parent Candle",
        "trigger": "Trigger Child Candle",
        "buy": "Buy here",
        "sell": "Sell here",
    };
    let status, comment, type1;
    if (item.buyorsell === "cancel_PatternBaseIndex" || item.buyorsell === "cancel_trigger") {
        type1 = candletype[item.buyorsell] || "No comment available";
        status = "Failed";
        comment = commentObject[item.Comment] || "No comment available";
        return `Status: ${status};  Type: ${type1}; Comments: ${comment}`;
    }
    else {
        type1 = candletype[item.buyorsell] || "No comment available";
        status = "Passed";
        //comment = commentObject[item.Comment] || "No comment available";
        if (item.buyorsell == "sell") {
            return `Status: ${status} ; Type: ${type1};  sellprice: ${item.exitPrice.toFixed(2)}   pnl: ${item.pnl.toFixed(2)}`;
        }
        if (item.buyorsell == "buy") {
            return `Status: ${status} ; Type: ${type1};   buyprice: ${item.buyprice.toFixed(2)}`;
        }
        return `Status: ${status};  Type: ${type1} `;
    }
    //return { status, comment ,type1};
}
const marketdepth = JSON.parse(localStorage.getItem("marketdepth"));
//console.log("loadedData", marketdepth);
function calculateRatios(A, D, intermediatePoints) {
    const totalWidth = D - A;
    const ratios = [];
    const points = [A, ...intermediatePoints, D];
    for (let i = 0; i < points.length - 1; i++) {
        const ratio = (points[i + 1] - points[i]) / totalWidth;
        ratios.push(ratio);
    }
    return ratios;
}
// Function to generate triangle points
function trianglePoints(x, y, size, direction) {
    const halfSize = size / 2;
    let points;
    if (direction === "up") {
        points = `${x},${y - halfSize} ${x + halfSize},${y + halfSize} ${x - halfSize},${y + halfSize}`;
    }
    else if (direction === "down") {
        points = `${x},${y + halfSize} ${x + halfSize},${y - halfSize} ${x - halfSize},${y - halfSize}`;
    }
    return points;
}
function convertUnixTimestamp(unixTimestamp) {
    // Create a new Date object
    var date = new Date(unixTimestamp * 1000);
    // Extract the various components of the date
    var day = date.getDate();
    var month = date.getMonth() + 1; // Months are zero indexed, so add 1
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    // Add leading zeros if necessary
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    // Concatenate the components into the desired format
    var formattedDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
    return formattedDate;
    //   var unixTimestamp = 1615547892; // Replace this with your Unix timestamp
    // var formattedDate = convertUnixTimestamp(unixTimestamp);
    // console.log(formattedDate); // Output will be in DD/MM/yyyy HH:mm format
}
function formatVolume(volume) {
    if (volume >= 1000000) {
        return (volume / 1000000).toFixed(0) + "M";
    }
    else if (volume >= 1000) {
        return (volume / 1000).toFixed(0) + "k";
    }
    else {
        return volume.toString();
    }
}
var formatMillisecond = d3.timeFormat(".%L"), formatSecond = d3.timeFormat(":%S"), formatMinute = d3.timeFormat("%I:%M"), formatHour = d3.timeFormat("%I %p"), formatDay = d3.timeFormat("%a %d"), formatWeek = d3.timeFormat("%b %d"), formatMonth = d3.timeFormat("%B %Y"), formatYear = d3.timeFormat("%Y");
function multiFormat(i, stockid = "temp:1D", xdata) {
    const parser = d3.timeParse("%s");
    const intervalid = stockid.split(":")[1];
    // console.log(i,stockid,stockhistorydata);
    //   console.log(intervalid);
    // console.log(xdata);
    var date = xdata[i];
    // console.log(intervalid);
    if (!date) {
        return null;
    }
    var date = parser(date);
    // console.log(i,date);
    switch (intervalid) {
        case "1m":
        case "3m":
        case "5m":
        case "15m":
        case "30m":
        case "45m":
            // console.log("in mintute");
            var fn = formatMinute(date);
            break;
        case "1H":
        case "2H":
        case "4H":
            // console.log("in houre");
            var fn = formatHour(date);
            break;
        case "1D":
            // console.log("in day");
            var fn = formatDay(date);
            break;
        case "1W":
            // console.log("in week");
            var fn = formatWeek(date);
            break;
        case "1M":
            // console.log("in month");
            var fn = formatMonth(date);
            break;
        default:
        // console.log("none");
    }
    return fn;
}
function findMinMaxAndIntermediate(yScaleKeys) {
    let minValue = Infinity;
    let maxValue = -Infinity;
    let allValues = [];
    for (const key in yScaleKeys) {
        if (yScaleKeys.hasOwnProperty(key)) {
            const array = yScaleKeys[key];
            const minInArray = Math.min(...array);
            const maxInArray = Math.max(...array);
            minValue = Math.min(minValue, minInArray);
            maxValue = Math.max(maxValue, maxInArray);
            allValues = allValues.concat(array);
        }
    }
    allValues = [...new Set(allValues)].sort((a, b) => a - b);
    const intermediatePoints = allValues.filter((value) => value > minValue && value < maxValue);
    return { min: minValue, max: maxValue, intermediate: intermediatePoints };
}
// Function to filter out null values from both arrays using reduce
function filterNullValuesUsingReduce(xdata, ydata) {
    return ydata.reduce((acc, currentValue, index) => {
        if (currentValue !== null) {
            acc.xdata.push(xdata[index]);
            acc.ydata.push(currentValue);
        }
        return acc;
    }, { xdata: [], ydata: [] });
    // const { xdataFiltered, ydataFiltered } = filterNullValuesUsingReduce(xdata, ydata)
}
function updateDataDomain1(yscaletag, newDomain) {
    // Find the object with the matching yscaletag
    const scaleConfigToUpdate = this.yScaleConfig.find((config) => config.yscaletag === yscaletag);
    // If the object is found, update its datadomain
    if (scaleConfigToUpdate) {
        scaleConfigToUpdate.datadomain = newDomain;
    }
    else {
        console.error(`No scale configuration found for yscaletag: ${yscaletag}`);
    }
}
// maxscaledata() {
//   // Filter high values within the visrange
//   const highWithinRange = this.dataset["high"].filter(
//     (d) => d >= this.visrange[0] && d <= this.visrange[1]
//   );
//   return d3.max(highWithinRange, (d) => d + d * 0.05);
// },
// minscaledata() {
//   // Filter low values within the visrange
//   const lowWithinRange = this.dataset["low"].filter(
//     (d) => d >= this.visrange[0] && d <= this.visrange[1]
//   );
//   return d3.min(lowWithinRange, (d) => d - d * 0.05);
// },
// datadomain() {
//   return [this.minscaledata(), this.maxscaledata()];
// },
// Example function to arrange data
// Example function to arrange data
function processDataSeries(data) {
    const x = [];
    const y = [];
    Object.keys(data).forEach((key) => {
        // Exclude the "TTM" key
        if (key !== "TTM") {
            x.push(key);
            y.push(data[key]);
        }
    });
    return { x, y };
}
function processDataPoint(data) {
    const result = [];
    Object.keys(data).forEach((key) => {
        // Exclude the "TTM" key
        if (key !== "TTM") {
            result.push({ x: key, y: data[key] });
        }
    });
    return result;
}
function mergeData(...datasets) {
    const mergedData = {};
    // console.log(...datasets);
    // Merge all datasets
    datasets.forEach((data) => {
        processDataPoint(data).forEach((item) => {
            if (!mergedData[item.x]) {
                mergedData[item.x] = {};
            }
            mergedData[item.x][data.name] = item.y;
        });
    });
    // Convert merged data to array
    const result = [];
    Object.keys(mergedData).forEach((key) => {
        const mergedItem = { x: key };
        datasets.forEach((data) => {
            mergedItem[data.name] = mergedData[key][data.name] || null;
        });
        result.push(mergedItem);
    });
    return result;
}
function getallmonths(data1, data2, data3, data4) {
    const allKeys = [
        ...Object.keys(data1),
        ...Object.keys(data2),
        ...Object.keys(data3),
        ...Object.keys(data4),
    ];
    const uniqueSortedKeys = Array.from(new Set(allKeys)).sort((a, b) => {
        const dateA = new Date(a.replace(/(\w{3}) (\d{4})/, "$1 01, $2"));
        const dateB = new Date(b.replace(/(\w{3}) (\d{4})/, "$1 01, $2"));
        return dateA - dateB;
    });
    return uniqueSortedKeys;
    // console.log(...dataObjects);
    // const mergedData = {};
    // for (const [index, dataObj] of dataObjects.entries()) {
    //   console.log("INDEX",index,dataObj);
    //   for (const key in dataObj) {
    //       console.log("Index:", index, "Key:", key, "Value:", dataObj[key]);
    //       if (!(key in mergedData)) {
    //           mergedData[key] = {};
    //       }
    //       mergedData[key] = dataObj[key];
    //   }
    //   return Object.keys(mergedData)
}
// }
function mergeDataall(...dataObjects) {
    const mergedData = {};
    for (const [index, dataObj] of dataObjects.entries()) {
        for (const key in dataObj) {
            console.log("Index:", index, "Key:", key, "Value:", dataObj[key]);
            if (!(key in mergedData)) {
                mergedData[key] = {};
            }
            mergedData[key] = dataObj[key];
        }
    }
    console.log("HJHJ", mergedData);
    // Fill in missing data with NaN
    // for (const key in mergedData) {
    //     for (const dataObj of dataObjects) {
    //         const name = dataObj.name ? dataObj.name : key;
    //         if (!(name in mergedData[key])) {
    //             mergedData[key][name] = NaN;
    //         }
    //     }
    // }
    return mergedData;
}
function getIndexByFirstTwoCharacters(arr, prefix) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].startsWith(prefix)) {
            return i;
        }
    }
    return -1; // Return -1 if prefix is not found in any item
}
function arrangeData(stockData, funda = 0) {
    console.log(stockData);
    const tempfundata = [
        { category: "A1", values: [10, 15, 20] },
        { category: "B1", values: [20, 25, 30] },
        { category: "C1", values: [15, 30, 22] },
        { category: "D1", values: [25, 30, 35] },
        { category: "E1", values: [30, 30, 22] },
    ];
    // const datafunda= {
    //   x:tempfundata.map(d => d.category),
    //   y:tempfundata.map(d => d.values[0]),
    //   // z:tempfundata.map(d => d.values[1])
    //   label:tempfundata.map((d,i) => `${i}`)
    // }
    const collectedData = tempfundata.map((d) => ({
        x: d.category,
        y: d.values[0],
        z: d.values[1],
        z2: d.values[2],
    }));
    // console.log("datafunda",datafunda);
    const ohlcDataArray = Object.keys(stockData).includes("histdata")
        ? stockData.histdata
        : [];
    const techDataobject = Object.keys(stockData).includes("techdata")
        ? stockData.techdata
        : [];
    const fundaDataobject = Object.keys(stockData).includes("fundadata")
        ? stockData.fundadata
        : [];
    // const stocktechdata= { zigzagdata: zigzgadta, indicatordata: techdata, darvasBoxList: darvasBoxList }
    const zigzagdata = Object.keys(techDataobject).includes("zigzagdata")
        ? techDataobject.zigzagdata
        : {};
    const indicatordata = Object.keys(techDataobject).includes("indicatordata")
        ? techDataobject.indicatordata
        : {};
    const darvasBoxList = Object.keys(techDataobject).includes("darvasBoxList")
        ? techDataobject.darvasBoxList
        : {};
    const backtestdata = Object.keys(techDataobject).includes("btresult")
        ? techDataobject.btresult
        : {};
    // console.log(techDataobject);
    // console.log(backtestdata);
    const profitLossData = Object.keys(fundaDataobject).includes("profitLossData")
        ? fundaDataobject.profitLossData
        : {};
    const quartersData = Object.keys(fundaDataobject).includes("quartersData")
        ? fundaDataobject.quartersData
        : {};
    const shareholdingData = Object.keys(fundaDataobject).includes("shareholdingData")
        ? fundaDataobject.shareholdingData
        : {};
    // console.log(shareholdingData);
    const Operating_Profit1 = Object.keys(profitLossData).includes("Operating Profit")
        ? profitLossData["Operating Profit"]
        : {};
    const EPS1 = Object.keys(quartersData).includes("EPS in Rs")
        ? quartersData["EPS in Rs"]
        : {};
    const fundatakeys = Object.keys(shareholdingData);
    const FIIindex = getIndexByFirstTwoCharacters(fundatakeys, "FI");
    const DIIindex = getIndexByFirstTwoCharacters(fundatakeys, "DI");
    const Publicindex = getIndexByFirstTwoCharacters(fundatakeys, "Pu");
    const Promoterindex = getIndexByFirstTwoCharacters(fundatakeys, "Pr");
    // console.log("index",FIIindex,DIIindex,Publicindex,Promoterindex)
    const FII1 = fundatakeys[FIIindex]
        ? shareholdingData[fundatakeys[FIIindex]]
        : {};
    // console.log("FII1",FII1);
    const DII1 = fundatakeys[DIIindex]
        ? shareholdingData[fundatakeys[DIIindex]]
        : {};
    // console.log("DII",DII1);
    const PUBLIC1 = fundatakeys[Publicindex]
        ? shareholdingData[fundatakeys[Publicindex]]
        : {};
    const PROMOTER1 = fundatakeys[Promoterindex]
        ? shareholdingData[fundatakeys[Promoterindex]]
        : {};
    const Operating_Profit = processDataPoint(Operating_Profit1);
    const EPS = processDataPoint(EPS1);
    const allmonth = getallmonths(FII1, DII1, PUBLIC1, PROMOTER1);
    const HoldingData = allmonth.map((item) => {
        return {
            x: item,
            y: Object.keys(PROMOTER1).includes(item) ? PROMOTER1[item] : 0,
            z: Object.keys(FII1).includes(item) ? FII1[item] : 0,
            z1: Object.keys(DII1).includes(item) ? DII1[item] : 0,
            z2: Object.keys(PUBLIC1).includes(item) ? PUBLIC1[item] : 0,
        };
    });
    // console.log(Operating_Profit);
    // console.log(EPS);
    // console.log(HoldingData);
    // console.log("AA",AA);
    //console.log(techDataobject,zigzagdata)
    // Extract OHLCV data
    const xdata = ohlcDataArray.map((data, i) => i);
    const timestamp = ohlcDataArray.map((data, i) => data.timestamp);
    const open = ohlcDataArray.map((data) => data.open);
    const high = ohlcDataArray.map((data) => data.high);
    const low = ohlcDataArray.map((data) => data.low);
    const close = ohlcDataArray.map((data) => data.close);
    const volume = ohlcDataArray.map((data) => data.volume);
    // console.log("open",open)
    // Return structured data object
    return {
        xdata: xdata,
        xdata1: [0, 15, 35, 45],
        //xdata2:[0,timestamp.length],
        xdata2: [timestamp[0], timestamp[timestamp.length - 1]],
        timestamp: timestamp,
        line1: [30, 60, 50, 20],
        open: open,
        high: high,
        low: low,
        close: close,
        ema: TechnicalIndicators.EMA,
        sma: TechnicalIndicators.SMA,
        rsi: TechnicalIndicators.RSI,
        atr: TechnicalIndicators.ATR,
        adx: TechnicalIndicators.ADX,
        ohlckeyvlaue: TechnicalIndicators.OHLCKEYVALUE,
        volume: volume,
        zigzaglineX: Object.keys(zigzagdata).includes("sublist")
            ? zigzagdata.sublist.map((item) => item.orgindex)
            : [],
        zigzaglineY: Object.keys(zigzagdata).includes("sublist")
            ? zigzagdata.sublist.map((item) => item.value)
            : [],
        fundaX1: collectedData.map((d) => d.x),
        fundaY1: collectedData,
        fundabarY1: collectedData,
        tempfundata: tempfundata,
        Operating_ProfitX: Operating_Profit.map((d) => d.x),
        Operating_ProfitY: Operating_Profit,
        EPS_X: EPS.map((d) => d.x),
        EPS_Y: EPS,
        HoldingData_X: HoldingData.map((d) => d.x),
        HoldingData_Y: HoldingData,
        pricetobreaklineX: Object.keys(zigzagdata).includes("tobebreakdata")
            ? [
                timestamp[zigzagdata.tobebreakdata.tobebreakcandelid],
                timestamp[timestamp.length - 1],
            ]
            : [],
        pricetobreaklineY: Object.keys(zigzagdata).includes("tobebreakdata")
            ? [
                zigzagdata.tobebreakdata.pricetobebreak,
                zigzagdata.tobebreakdata.pricetobebreak,
            ]
            : [],
        pricetobreakdownlineX: Object.keys(zigzagdata).includes("tobebreakdowndata")
            ? [
                timestamp[zigzagdata.tobebreakdowndata.tobebreakcandelid],
                timestamp[timestamp.length - 1],
            ]
            : [],
        pricetobreakdownlineY: Object.keys(zigzagdata).includes("tobebreakdowndata")
            ? [
                zigzagdata.tobebreakdowndata.pricetobebreakdown,
                zigzagdata.tobebreakdowndata.pricetobebreakdown,
            ]
            : [],
        crsidataavgY: Object.keys(indicatordata).includes("LineInd")
            ? indicatordata.LineInd.map((item) => item.crsi_avg)
            : [],
        crsidataY: Object.keys(indicatordata).includes("LineInd")
            ? indicatordata.LineInd.map((item) => item.crsi)
            : [],
        //breakoutlines: () => [{ x: [1, 5, 7], y: [430, 460, 450],label:"1" }, { x: [50, 150, 175], y: [435, 430, 420],label:"2" }]
        breakoutlines: () => Object.keys(zigzagdata).includes("brlist")
            ? zigzagdata.brlist.map((item) => {
                if (item.rejectat == null)
                    return {
                        x: [item.broutfor, item.broutat],
                        y: [item.highatref, item.highatref],
                        label: item.breakoutperiod,
                    };
                return {
                    x: [item.broutfor, item.rejectat, item.broutat],
                    y: [item.highatref, item.highatrejec, item.highatrejec],
                    label: item.breakoutperiod,
                };
            })
            : [],
        MDline: () => marketdepth
            ? marketdepth.map((item) => ({
                x: item.timestamp,
                y: item.gapup,
                z: item.gapdown,
            }))
            : [],
        SIGNALLINE: Array.isArray(indicatordata.signalline) ? indicatordata.signalline.map(item => item) : [],
        backtestresult: Object.keys(backtestdata).includes("backtestresult") && Object.keys(backtestdata.backtestresult).includes("backtestLine")
            ? backtestdata.backtestresult.backtestLine
            : [],
        backtestreport: Object.keys(backtestdata).includes("backtestresult") && Object.keys(backtestdata.backtestresult).includes("backtestreport")
            ? backtestdata.backtestresult.backtestreport
            : []
        //rsi40:[40,40]
        // You can add more properties if needed
    };
}
// function getLineObjects(dataset) {
//     return [
//         { name: "EMA", plot: false, data: dataset.ema, xdata: "xdata", linetype: "solid", color: "green", yscalenumber: 1, fill: "none", strokewidth: 2, strokedasharray: "5,5", yscaletag: 'TL', xscaletag: 'bot' },
//         { name: "SMA", plot: false, data: dataset.sma, xdata: "xdata", linetype: "dashed", color: "#4285F4", yscalenumber: 2, fill: "none", strokewidth: 2, strokedasharray: "5,5", yscaletag: 'TL', xscaletag: 'bot' },
//         { name: "Close", plot: true, data: dataset.close, xdata: "xdata", linetype: "solid", color: "blue", yscalenumber: 1, fill: "none", strokewidth: 2, strokedasharray: "5,5", yscaletag: 'TL', xscaletag: 'bot' },
//         { name: "Volume", plot: false, data: dataset.volume, xdata: "xdata", linetype: "dashed", color: "#FF00FF", yscalenumber: 2, fill: "none", strokewidth: 2, strokedasharray: "25,5", yscaletag: 'TL', xscaletag: 'bot' },
//         { name: "Open", plot: true, data: dataset.open, xdata: "xdata", linetype: "dashed", color: "red", yscalenumber: 2, fill: "none", strokewidth: 2, strokedasharray: "15,5", yscaletag: 'TL', xscaletag: 'bot' },
//         { name: "twmp", plot: true, data: dataset.line1, xdata: "xdata1", linetype: "solid", color: "black", yscalenumber: 2, fill: "none", strokewidth: 2, strokedasharray: "0", yscaletag: 'BR', xscaletag: 'top' },
//         { name: "EMA2", plot: true, data: dataset.ema(dataset.open, 12), xdata: "xdata", linetype: "solid", color: "black", yscalenumber: 1, fill: "none", strokewidth: 2, strokedasharray: "0", yscaletag: 'TL', xscaletag: 'bot' }
//         // Add more line objects as needed...
//     ];
// }
// updateLineObjects() {
//   this.lineObjects.forEach(line => {
//       line.data = () => line.data();
//   });
// }
function generateYAxisConfig1(uniqueYscaletags, filteredYconfig) {
    if (uniqueYscaletags.length === 1) {
        return [{ yaxistag: "YY1", ratio: 1, name: "y1" }];
    }
    else if (uniqueYscaletags.length === 2) {
        return [
            { yaxistag: "YY1", ratio: 0.7, name: "y1" },
            { yaxistag: "YY2", ratio: 0.3, name: "y2" },
        ];
    }
    else if (uniqueYscaletags.length === 3) {
        return [
            { yaxistag: "YY1", ratio: 0.4, name: "y1" },
            { yaxistag: "YY2", ratio: 0.3, name: "y2" },
            { yaxistag: "YY3", ratio: 0.3, name: "y3" },
        ];
    }
    else {
        return []; // Return an empty array or handle other cases as needed
    }
}
function generateYAxisConfig(filteredYconfig) {
    const yAxisConfig = [];
    // Total number of yaxistags
    // console.log(filteredYconfig);
    const uniqueArray = [...new Set(filteredYconfig)];
    const totalYaxistags = uniqueArray.length;
    // Calculate ratio for each yaxistag
    const ratioIncrement = 1 / totalYaxistags;
    let ratioarray;
    if (uniqueArray.length == 2) {
        ratioarray = [0.7, 0.3];
    }
    if (uniqueArray.length == 3) {
        ratioarray = [0.6, 0.2, 0.2];
    }
    // console.log(ratioarray);
    // Iterate over each yaxistag in filteredYconfig
    uniqueArray.forEach((yaxistag, index) => {
        // Create a new entry in yAxisConfig for each yaxistag
        // console.log(ratioarray && ratioarray.length > 0 ? ratioarray[index] : ratioIncrement);
        yAxisConfig.push({
            yaxistag: yaxistag,
            ratio: ratioarray && ratioarray.length > 0
                ? ratioarray[index]
                : ratioIncrement,
            name: `y${index + 1}`, // You can customize the name as needed
        });
    });
    // console.log(yAxisConfig);
    return yAxisConfig;
}
function getYAxisTag(yScaleConfig, yscaletag) {
    const yAxisConfig = yScaleConfig.find((config) => config.yscaletag === yscaletag);
    return yAxisConfig ? yAxisConfig.yaxistag : null;
}
function findKeyByNumber(data, number) {
    for (const key in data) {
        const range = data[key];
        if (number >= range[1] && number <= range[0]) {
            return key;
        }
    }
    return null; // Return null if number is not within any range
}
function getXScaleTagsByDataTag(objectData, tagtomatch, matchvalue, tagtoget) {
    const scaletags = [];
    for (const key in objectData) {
        if (Object.hasOwnProperty.call(objectData, key)) {
            const config = objectData[key];
            // console.log(config)
            // console.log(config[tagtomatch],matchvalue)
            // console.log(config[tagtoget])
            if (config[tagtomatch] === matchvalue) {
                scaletags.push(key);
            }
            // console.log("scaletags",scaletags)
        }
    }
    // for (const config of objectData) {
    //   // console.log(config);
    //   if (config[tagtomatch] === matchvalue) {
    //     scaletags.push(config[tagtoget]);
    //   }
    // }
    return scaletags;
}
function getNextName(existingNames) {
    let maxIndex = -1;
    // Loop through existing names to find the highest index
    existingNames.forEach((item) => {
        const index = parseInt(item.name.split("_")[1]);
        if (index > maxIndex) {
            maxIndex = index;
        }
    });
    // Increment the highest index by 1
    const nextIndex = maxIndex + 1;
    // Construct the new name
    const nextName = "tr_" + nextIndex;
    return nextName;
}
function getIndexForName(name, dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].name === name) {
            return i;
        }
    }
    return -1; // Return -1 if the name is not found
}
function getIndexesByValues(array, values) {
    let indexes = [];
    values.forEach((value) => {
        let index = array.indexOf(value);
        indexes.push(index);
    });
    return indexes;
}
function groupButtonsByPanel(buttonObjects) {
    // Filter buttonObjects to include only items where plot is true
    const filteredButtonObjects = buttonObjects.filter((item) => item.plot);
    // Group filteredButtonObjects based on panelName
    const groupedButtonObjects = filteredButtonObjects.reduce((grouped, button) => {
        // If the panelName is not yet a key in the grouped object, initialize it as an empty array
        if (!grouped[button.panelName]) {
            grouped[button.panelName] = [];
        }
        // Push the button object into the array corresponding to its panelName
        grouped[button.panelName].push(button);
        return grouped;
    }, {});
    return groupedButtonObjects;
}
function identifyDataType(data) {
    try {
        if (Array.isArray(data) && data.length > 0) {
            const firstItem = data[0];
            const keys = Object.keys(firstItem);
            // console.log("firstItem",firstItem,keys);
            for (let key of keys) {
                if (Array.isArray(firstItem[key])) {
                    return {
                        datatype: "type1",
                        text: "Type 1: Array of objects with arrays as values",
                    };
                }
            }
            return {
                datatype: "type2",
                text: "Type 2: Array of objects with non-array values",
            };
            //return 'Type 2: Array of objects with non-array values';
        }
        return "Unknown type";
    }
    catch (_a) {
        return "data is null";
    }
}
function identifyDataType1(data, name = "") {
    // if (name == 'SIGNALLINE') {
    //   console.log("object", data);
    // }
    if (Array.isArray(data) && data.length > 0) {
        let index = 0;
        let obj = data[index];
        // Find the first non-null object
        while (obj === null && index < data.length) {
            index++;
            obj = data[index];
        }
        let keysArray = Object.keys(obj);
        // if (name == 'SIGNALLINE') {
        //   console.log("object22", obj, keysArray);
        // }
        // Check if we found a non-null object and if it has the expected properties
        if (obj && typeof obj === "object") {
            // Check if it's an array of objects with properties x, y, and label
            if ("x" in obj && "y" in obj && "label" in obj) {
                return {
                    text: "Time-series data with labels",
                    datatype: "type2",
                    data: data,
                };
            }
            // Check if it's an array of objects with properties x, y, and z
            else if (("x" in obj && "y" in obj && "z" in obj) ||
                ("x" in obj && "y" in obj)) {
                let flattenedData = {};
                for (let point of data) {
                    for (let key in point) {
                        if (!flattenedData[key]) {
                            flattenedData[key] = [];
                        }
                        flattenedData[key].push(point[key]);
                    }
                }
                // console.log("flattenedData",flattenedData);
                return {
                    text: "Three-dimensional coordinate data",
                    datatype: "type3",
                    data: flattenedData,
                };
            }
            else if (keysArray.includes("x") &&
                keysArray.length > 1 &&
                !keysArray.includes("y") &&
                !keysArray.includes("z")) {
                const predefinedKeys = ["x", "y", "z", "z1", "z2", "z3", "z4"];
                const keyValueMap = {};
                const keysArrayReverse = {};
                keysArray.forEach((key, index) => {
                    // if (key !== 'x') {
                    const mappedKey = predefinedKeys[index];
                    keyValueMap[key] = mappedKey;
                    // }
                });
                predefinedKeys.forEach((key, index) => {
                    // if (key !== 'x') {
                    const mappedKey = keysArray[index];
                    keysArrayReverse[key] = mappedKey;
                    // }
                });
                const convertedData = {};
                // console.log("data", data);
                // Iterate over each object in the data array
                // Iterate over each object in the data array
                data.forEach((item) => {
                    Object.keys(item).forEach((key) => {
                        const mappedKey = keyValueMap[key];
                        if (!convertedData[mappedKey])
                            convertedData[mappedKey] = [];
                        convertedData[mappedKey].push(item[key]);
                    });
                });
                // console.log(convertedData);
                return {
                    text: "Time-series data with labels and NOt y and z",
                    datatype: "type3",
                    data: convertedData,
                    keyValueMap: keysArrayReverse,
                };
            }
        }
    }
    // Otherwise, it's an array of numeric values
    return { text: "Array of numeric values", datatype: "type1", data: data };
}
function convertToData1Format(data) {
    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }
    const keys = Object.keys(data[0]); // Get keys from the first object assuming all objects have the same keys
    const coordinateKeys = keys.filter((key) => typeof data[0][key] === "number"); // Filter out non-numeric keys
    const labelKey = keys.find((key) => typeof data[0][key] === "string"); // Find the key with string values (assumed to be label)
    return data.map((item) => {
        const coordinates = {};
        coordinateKeys.forEach((key) => {
            const coordinateName = key.toLowerCase();
            if (!coordinates[coordinateName]) {
                coordinates[coordinateName] = [];
            }
            coordinates[coordinateName].push(item[key]);
        });
        let label = null;
        if (labelKey) {
            label = item[labelKey];
        }
        return Object.assign(Object.assign({}, coordinates), { label });
    });
}
function findOverallMinMax(jsonData) {
    let allYValues = [];
    let allZValues = [];
    jsonData.forEach((obj) => {
        allYValues.push(obj.y);
        allZValues.push(obj.z);
    });
    const overallMaxY = Math.max(...allYValues);
    const overallMinY = Math.min(...allYValues);
    const overallMaxZ = Math.max(...allZValues);
    const overallMinZ = Math.min(...allZValues);
    const overallMax = Math.max(overallMaxY, overallMaxZ);
    const overallMin = Math.min(overallMinY, overallMinZ);
    return { overallMax, overallMin };
}
// // Example usage:
// const filteredYconfig = ["YY1", "YY2"]; // Example filteredYconfig
// const yAxisConfig = generateYAxisConfig(filteredYconfig);
// console.log(yAxisConfig);
// // Example usage:
// const filteredYconfig = [["YY1"], ["YY1", "YY2"], ["YY1", "YY2", "YY3"]]; // Example filteredYconfig
// const yAxisConfig = generateYAxisConfig(filteredYconfig);
// console.log(yAxisConfig);
class CandlestickChart {
    constructor(stockData, svgWidth, svgHeight, chartOptions) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23;
        this.zoomedY = (event) => {
            const transform = event.transform;
            const [x, y] = d3.pointer(event);
            const yaxistag = findKeyByNumber(this.yAxisRange, y);
            // console.log(yaxistag);
            const sectedscale0 = getXScaleTagsByDataTag(this.yScaleConfig, "yaxistag", yaxistag, "yscaletag");
            const sectedscale = sectedscale0.filter((element) => this.uniqueYscaletags.includes(element));
            // console.log(sectedscale);
            if (sectedscale.length == 0)
                return null;
            this.yScaleConfig[sectedscale[0]].transform["k"] = transform.k;
            this.setupYScales();
            this.updateAxes_y();
            //this.renderAxes();
            this.renderChart();
            // this.svg.select(".y-zoom-left").call(d3.axisRight(ys.copy().domain([0, height / transform.k])));
            // Update chart elements based on zoom transform
            // e.g., svg.selectAll(".line").attr("transform", transform);
        };
        this.createButtonArray = (filteredpanelobject, buttonArray) => {
            // console.log(filteredpanelobject);
            // console.log(buttonArray);
            const panelwidth = filteredpanelobject.width;
            const panelheight = filteredpanelobject.height;
            const x0 = filteredpanelobject.x;
            const y0 = filteredpanelobject.y;
            // console.log(x0,y0);
            var totalWidth = panelwidth;
            var buttonWidth = totalWidth / buttonArray.length;
            var buttonPanel = this.svg
                .append("g")
                .attr("class", "button-panel")
                .attr("transform", `translate(${x0}, ${y0})`);
            var buttons = buttonPanel
                .selectAll(".button")
                .data(buttonArray)
                .enter()
                .append("g")
                .attr("class", "button")
                .attr("transform", function (d, i) {
                return "translate(" + i * buttonWidth + ", 0)";
            });
            buttons
                .append("rect")
                .attr("class", (d, i) => {
                return `${d.classtag}`;
            })
                .attr("width", buttonWidth)
                .attr("height", (d, i) => {
                return `${panelheight}`;
            })
                .attr("fill", (d, i) => {
                return `${d.color}`;
            })
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("opacity", (d, i) => {
                return `${d.opacity}`;
            })
                .on("click", (d, datum) => {
                return datum.buttonclick();
            })
                .attr("fill", (d, datum) => {
                // console.log("Hello",d,datum);
                // console.log("object",d.plot);
                return d.pressstatus == "NA"
                    ? "#90caf9"
                    : d.pressstatus
                        ? "#a5d6a7"
                        : "#e57373";
            });
            buttons
                .append("text")
                .attr("x", buttonWidth / 2)
                .attr("y", (d, i) => {
                return `${panelheight - panelheight / 4}`;
            })
                .attr("text-anchor", "middle")
                .text(function (d, i) {
                //  console.log(d);
                return d.label;
            })
                .style("pointer-events", "none");
        };
        //this.dragBehavior = d3.drag().on("start", this.handleDragStart).on("drag", this.handleDrag).on("end", this.handleDragEnd);
        this.handleDragStart = (event) => {
            // console.log("drag start", event, this);
            const targetElement = event.sourceEvent.target;
            // console.log("targetElement", targetElement);
            this.dragBehavior.activeElement = targetElement;
            d3.select(targetElement).style("fill", "yellow");
        };
        // Example usage:
        // drawBarPlot(config, filteredData, currentXscale, currentYscale);
        this.zoomedYold = (event) => {
            console.log("in zoomdy");
            // console.log("inzoom", event.sourceEvent ? event.sourceEvent.type : event);
            // console.log("inzoom", event);
            if (event.sourceEvent && event.sourceEvent.type === "dblclick")
                return;
            const currentTransformY = event.transform;
            const [x, y] = d3.pointer(event);
            const yaxistag = findKeyByNumber(this.yAxisRange, y);
            // console.log(yaxistag);
            const sectedscale = getXScaleTagsByDataTag(this.yScaleConfig, "yaxistag", yaxistag, "yscaletag");
            // console.log(sectedscale);
            if (sectedscale.length == 0)
                return null;
            // console.log(sectedscale);
            const scaleConfigsToUpdate = this.yScaleConfig.filter((scale) => scale.yscaletag === sectedscale[0]);
            scaleConfigsToUpdate.forEach((scale) => {
                scale.ypadding = () => 0;
            });
            this.setupYScales();
            this.updateAxes_y();
            this.renderChart();
        };
        this.zoomedX = (event) => {
            // console.log("in zoomdx")
            // console.log(this)
            //console.log("inzoom", event.sourceEvent ? event.sourceEvent.type : event);
            if (event.sourceEvent && event.sourceEvent.type === "dblclick")
                return;
            const currentTransformY = this.svg.select(".y-zoom").property("__zoom");
            const currentTransformX = event.transform;
            let newVisibleRange = {};
            for (const key in this.xScaleConfig) {
                if (Object.hasOwnProperty.call(this.xScaleConfig, key)) {
                    const item = this.xScaleConfig[key];
                    if (item.hasOwnProperty("xScale")) {
                        const xScale = item.xScale;
                        if (xScale.bandwidth) {
                            // Check if scaleBand
                            // Calculate new domain based on current domain and zoom transformation
                            //  console.log("old domain",xScale.domain());
                            //   const newDomainStart = xScale.domain()[0] - currentTransformX.x / currentTransformX.k;
                            //   const newDomainEnd = newDomainStart + (xScale.domain()[1] - xScale.domain()[0]) / currentTransformX.k;
                            //   const newDomain = [newDomainStart, newDomainEnd];
                            //   console.log("newDomain",newDomain);
                            //   // Calculate new visible range based on the new domain
                            //   newVisibleRange[key] = [xScale(newDomain[0]), xScale(newDomain[1])];
                        }
                        else {
                            // Linear scale
                            // For linear scale, apply zoom transformation directly
                            const newXScale = currentTransformX.rescaleX(xScale);
                            newVisibleRange[key] = [
                                newXScale.domain()[0],
                                newXScale.domain()[1],
                            ];
                        }
                    }
                }
            }
            // console.log(newVisibleRange);
            if (newVisibleRange["bot"].length == 0)
                return null;
            // console.log(this.yScaleConfig)
            for (const key in this.yScaleConfig) {
                if (Object.hasOwnProperty.call(this.yScaleConfig, key)) {
                    const item = this.yScaleConfig[key];
                    if (item.changeRangeTag) {
                        item.visrange = () => newVisibleRange["bot"];
                    }
                }
            }
            //console.log(this.xScaleConfig);
            this.setupXScale();
            this.updateAxes_x(currentTransformX);
            this.setupYScales();
            this.updateAxes_y();
            this.renderChart();
            // if (currentTransformY) {
            //   this.svg.select(".y-zoom").call(this.zoomY.transform, currentTransformY);
            // }
        };
        this.chartOptions = chartOptions;
        this.stockData = stockData;
        //this.stockTechData = stockTechData;
        this.svgWidth = svgWidth;
        this.svgHeight = svgHeight;
        this.targetID = chartOptions.targetID;
        this.stockid = chartOptions.stockid;
        this.golivehandle = chartOptions.liveupdatefunction;
        // console.log(chartOptions.chartsettings);
        this.margin = {
            top: 20,
            right: 50,
            bottom: 20,
            left: 10,
            innerLeft: 20,
            innerRight: 100,
            innerBottom: 20,
            innertop: 20,
        };
        this.width =
            svgWidth -
                this.margin.left -
                this.margin.right -
                this.margin.innerRight -
                this.margin.innerLeft;
        this.height =
            svgHeight -
                this.margin.top -
                this.margin.bottom -
                this.margin.innertop -
                this.margin.innerBottom;
        this.a = 1;
        this.yaxispadding = 50 * 0;
        this.tooltipshow = true;
        this.backtestreport = true;
        this.backgroundProp = { color: "lightblue", opacity: 0.1 };
        this.buttonProps = { color: "#90a7d5", opacity: 0.7 };
        this.topyscalepadding = 1;
        this.livebutton = false;
        this.toggleTrendLine = false;
        this.mdbutton = (_c = (_b = (_a = chartOptions.chartsettings) === null || _a === void 0 ? void 0 : _a.mdbutton) === null || _b === void 0 ? void 0 : _b.status) !== null && _c !== void 0 ? _c : false;
        this.fiibutton = (_f = (_e = (_d = chartOptions.chartsettings) === null || _d === void 0 ? void 0 : _d.fiibutton) === null || _e === void 0 ? void 0 : _e.status) !== null && _f !== void 0 ? _f : false;
        ;
        this.opbutton = (_j = (_h = (_g = chartOptions.chartsettings) === null || _g === void 0 ? void 0 : _g.opbutton) === null || _h === void 0 ? void 0 : _h.status) !== null && _j !== void 0 ? _j : false;
        ;
        this.epsbutton = (_m = (_l = (_k = chartOptions.chartsettings) === null || _k === void 0 ? void 0 : _k.epsbutton) === null || _l === void 0 ? void 0 : _l.status) !== null && _m !== void 0 ? _m : false;
        ;
        this.brlinebutton = (_q = (_p = (_o = chartOptions.chartsettings) === null || _o === void 0 ? void 0 : _o.brlinebutton) === null || _p === void 0 ? void 0 : _p.status) !== null && _q !== void 0 ? _q : false;
        ;
        this.crsibutton = (_t = (_s = (_r = chartOptions.chartsettings) === null || _r === void 0 ? void 0 : _r.crsibutton) === null || _s === void 0 ? void 0 : _s.status) !== null && _t !== void 0 ? _t : false;
        ;
        this.adxbutton = (_w = (_v = (_u = chartOptions.chartsettings) === null || _u === void 0 ? void 0 : _u.adxbutton) === null || _v === void 0 ? void 0 : _v.status) !== null && _w !== void 0 ? _w : false;
        ;
        this.atrbutton = (_z = (_y = (_x = chartOptions.chartsettings) === null || _x === void 0 ? void 0 : _x.atrbutton) === null || _y === void 0 ? void 0 : _y.status) !== null && _z !== void 0 ? _z : false;
        ;
        this.emabutton = (_2 = (_1 = (_0 = chartOptions.chartsettings) === null || _0 === void 0 ? void 0 : _0.emabutton) === null || _1 === void 0 ? void 0 : _1.status) !== null && _2 !== void 0 ? _2 : false;
        ;
        this.rsibutton = (_5 = (_4 = (_3 = chartOptions.chartsettings) === null || _3 === void 0 ? void 0 : _3.rsibutton) === null || _4 === void 0 ? void 0 : _4.status) !== null && _5 !== void 0 ? _5 : false;
        ;
        this.trendbutton = (_8 = (_7 = (_6 = chartOptions.chartsettings) === null || _6 === void 0 ? void 0 : _6.trendbutton) === null || _7 === void 0 ? void 0 : _7.status) !== null && _8 !== void 0 ? _8 : false;
        ;
        this.zigzagbutton = (_11 = (_10 = (_9 = chartOptions.chartsettings) === null || _9 === void 0 ? void 0 : _9.zigzagbutton) === null || _10 === void 0 ? void 0 : _10.status) !== null && _11 !== void 0 ? _11 : false;
        ;
        this.closebutton = (_14 = (_13 = (_12 = chartOptions.chartsettings) === null || _12 === void 0 ? void 0 : _12.closebutton) === null || _13 === void 0 ? void 0 : _13.status) !== null && _14 !== void 0 ? _14 : false;
        ;
        this.cdbutton = (_17 = (_16 = (_15 = chartOptions.chartsettings) === null || _15 === void 0 ? void 0 : _15.cdbutton) === null || _16 === void 0 ? void 0 : _16.status) !== null && _17 !== void 0 ? _17 : true;
        ;
        this.volbutton = (_20 = (_19 = (_18 = chartOptions.chartsettings) === null || _18 === void 0 ? void 0 : _18.volbutton) === null || _19 === void 0 ? void 0 : _19.status) !== null && _20 !== void 0 ? _20 : false;
        ;
        this.sigbutton = (_23 = (_22 = (_21 = chartOptions.chartsettings) === null || _21 === void 0 ? void 0 : _21.sigbutton) === null || _22 === void 0 ? void 0 : _22.status) !== null && _23 !== void 0 ? _23 : false;
        ;
        this.drawTrendLinePlot = this.drawTrendLinePlot.bind(this);
        // this.handleDragStart= this.handleDragStart.bind(this);
        // this.handleDrag= this.handleDrag.bind(this);
        // this.handleDragEnd= this.handleDragEnd.bind(this);
        this.TrendLineData1 = [];
        this.dataset = arrangeData(stockData);
        // console.log(this.dataset)
        this.xScaleConfig = {
            bot: {
                ypoint: this.svgHeight - this.margin.bottom,
                scaleSide: "Bottom",
                scaleType: "linear",
                scaledatatag: "timestamp",
                scalerange: [
                    this.margin.left + this.margin.innerLeft,
                    this.svgWidth - this.margin.right - this.margin.innerRight,
                ],
                // datadomain: [0, this.dataset.xdata[this.dataset.xdata.length - 1]],
                datadomain: () => [0, this.dataset.timestamp.length],
                mappedwith: "timestamp",
                //scaleRole: "main",
                plotaxis: true,
                zooming: true,
            },
            bot2: {
                // fundaX: [1, 4, 8,12,20],
                // fundaY: [20, 40, 50,25,10],
                ypoint: this.svgHeight - this.margin.bottom,
                scaleSide: "Top",
                scaleType: "scaleband",
                scaledatatag: "fundaX1",
                scalerange: [
                    this.margin.left + this.margin.innerLeft,
                    this.svgWidth - this.margin.right - this.margin.innerRight,
                ],
                datadomain: () => this.dataset.fundaX1,
                mappedwith: null,
                //scaleRole: "main",
                plotaxis: true,
                zooming: false,
            },
            FNYEAR_X: {
                // fundaX: [1, 4, 8,12,20],
                // fundaY: [20, 40, 50,25,10],
                ypoint: this.svgHeight - this.margin.bottom,
                scaleSide: "Top",
                scaleType: "scaleband",
                scaledatatag: "Operating_ProfitX",
                scalerange: [
                    this.margin.left + this.margin.innerLeft,
                    this.svgWidth - this.margin.right - this.margin.innerRight,
                ],
                datadomain: () => this.dataset.Operating_ProfitX,
                mappedwith: null,
                //scaleRole: "main",
                plotaxis: true,
                zooming: false,
            },
            FNQUR_X: {
                // fundaX: [1, 4, 8,12,20],
                // fundaY: [20, 40, 50,25,10],
                ypoint: this.svgHeight - this.margin.bottom,
                scaleSide: "Top",
                scaleType: "scaleband",
                scaledatatag: "EPS_X",
                scalerange: [
                    this.margin.left + this.margin.innerLeft,
                    this.svgWidth - this.margin.right - this.margin.innerRight,
                ],
                datadomain: () => this.dataset.EPS_X,
                mappedwith: null,
                //scaleRole: "main",
                plotaxis: true,
                zooming: false,
            },
            HOLD_X: {
                // fundaX: [1, 4, 8,12,20],
                // fundaY: [20, 40, 50,25,10],
                ypoint: this.svgHeight - this.margin.bottom,
                scaleSide: "Top",
                scaleType: "scaleband",
                scaledatatag: "HoldingData_X",
                scalerange: [
                    this.margin.left + this.margin.innerLeft,
                    this.svgWidth - this.margin.right - this.margin.innerRight,
                ],
                datadomain: () => this.dataset.HoldingData_X,
                mappedwith: null,
                //scaleRole: "main",
                plotaxis: true,
                zooming: false,
            },
            top: {
                ypoint: this.margin.top,
                scaleSide: "Top",
                scaleType: "linear",
                scaledatatag: "xdata1",
                scalerange: [
                    this.margin.left + this.margin.innerLeft,
                    this.svgWidth - this.margin.right - this.margin.innerRight,
                ],
                datadomain: () => [
                    0,
                    this.dataset.xdata1[this.dataset.xdata1.length - 1],
                ],
                mappedwith: null,
                //scaleRole: "nonmain",
                plotaxis: false,
                zooming: true,
            },
        };
        this.yScaleConfig = {
            TR: {
                // yscaletag: "TR",
                yaxistag: "YY1",
                xpoint: this.svgWidth - this.margin.right,
                scaleSide: "Right",
                ypadding: () => 0.1,
                transform: { k: 1 },
                scaledata_max: () => this.dataset["high"],
                scaledata_min: () => this.dataset["low"],
                changeRangeTag: true,
                visrange: () => [0, this.dataset["xdata"].length],
                maxscaledata() {
                    // Filter high values within the visrange
                    // console.log(this.visrange())
                    const highWithinRange = this.scaledata_max().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.max(highWithinRange, (d) => d);
                },
                minscaledata() {
                    // Filter low values within the visrange
                    const lowWithinRange = this.scaledata_min().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.min(lowWithinRange, (d) => d);
                },
                datadomain() {
                    const maxData = this.maxscaledata();
                    const minData = this.minscaledata();
                    // Calculate the current center point of the scale
                    const center = (maxData + minData) / 2;
                    // Calculate the new range extent based on transform.k
                    const newExtent = (maxData - minData) / this.transform.k / 2;
                    // Calculate the new maximum and minimum data values
                    const newMax = center + newExtent;
                    const newMin = center - newExtent;
                    // console.log("DATAPOMI",minData,maxData);
                    // console.log("variable",newMin,newMax);
                    // return [
                    //   newMin,
                    //   newMax ,
                    // ];
                    // console.log(this.visrange());
                    const lowerlimit = newMin > minData ? minData : newMin;
                    const higherlimit = newMax > maxData ? maxData : newMax;
                    const padding = (higherlimit - lowerlimit) * this.ypadding();
                    return [lowerlimit - padding, higherlimit + padding];
                },
                // maxscaledata: () => d3.max(this.dataset["high"], (d) => d + d * 0.05),
                // minscaledata: () => d3.min(this.dataset["low"], (d) => d - d * 0.05),
                // datadomain() {
                //   return [this.minscaledata(), this.maxscaledata()];
                // },
            },
            BR: {
                //yscaletag: "BR",
                yaxistag: "YY2",
                xpoint: this.svgWidth - this.margin.right,
                scaleSide: "Right",
                ypadding: () => 0,
                transform: { k: 1 },
                scaledata: () => this.dataset["volume"],
                changeRangeTag: true,
                visrange: () => [0, this.dataset["xdata"].length],
                maxscaledata() {
                    // Filter high values within the visrange
                    const highWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.max(highWithinRange, (d) => d + d * this.ypadding());
                },
                minscaledata() {
                    // Filter low values within the visrange
                    return 0;
                    // const lowWithinRange = this.scaledata().filter(
                    //   (d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]
                    // );
                    // return d3.min(lowWithinRange, (d) => d - d * this.ypadding());
                },
                datadomain() {
                    const maxData = this.maxscaledata();
                    const minData = this.minscaledata();
                    // Calculate the current center point of the scale
                    const center = (maxData + minData) / 2;
                    // Calculate the new range extent based on transform.k
                    const newExtent = (maxData - minData) / this.transform.k / 2;
                    // Calculate the new maximum and minimum data values
                    const newMax = center + newExtent;
                    const newMin = center - newExtent;
                    // console.log(this.visrange());
                    // console.log("maxData",maxData);
                    return [0, newMax < maxData ? maxData : newMax];
                },
            },
            BL: {
                // yscaletag: "BL",
                yaxistag: "YY2",
                xpoint: this.margin.left + this.margin.innerLeft,
                scaleSide: "Right",
                ypadding: () => 0.1,
                transform: { k: 1 },
                scaledata: () => [0, 100],
                changeRangeTag: false,
                visrange: () => [0, this.dataset["xdata"].length],
                maxscaledata() {
                    // Filter high values within the visrange
                    if (this.scaledata().length === 2)
                        return this.scaledata()[1];
                    const highWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.max(highWithinRange, (d) => d + d * this.ypadding());
                },
                minscaledata() {
                    // Filter low values within the visrange
                    if (this.scaledata().length === 2)
                        return this.scaledata()[0];
                    const lowWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.min(lowWithinRange, (d) => d - d * this.ypadding());
                },
                datadomain() {
                    const maxData = this.maxscaledata();
                    const minData = this.minscaledata();
                    // Calculate the current center point of the scale
                    const center = (maxData + minData) / 2;
                    // Calculate the new range extent based on transform.k
                    const newExtent = (maxData - minData) / this.transform.k / 2;
                    // Calculate the new maximum and minimum data values
                    const newMax = center + newExtent;
                    const newMin = center - newExtent;
                    return [newMin, newMax];
                },
            },
            CRSI: {
                // yscaletag: "BL",
                yaxistag: "YY2",
                xpoint: this.margin.left + this.margin.innerLeft,
                scaleSide: "Right",
                ypadding: () => 0.05,
                transform: { k: 1 },
                scaledata: () => this.dataset["crsidataY"],
                // scaledata: () => [0,2],
                changeRangeTag: false,
                visrange: () => [0, this.dataset["xdata"].length],
                maxscaledata() {
                    // Filter high values within the visrange
                    if (this.scaledata().length === 2)
                        return this.scaledata()[1];
                    const highWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.max(highWithinRange, (d) => d + d * this.ypadding());
                },
                minscaledata() {
                    // Filter low values within the visrange
                    if (this.scaledata().length === 2)
                        return this.scaledata()[0];
                    const lowWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.min(lowWithinRange, (d) => d - d * this.ypadding());
                },
                datadomain() {
                    const maxData = this.maxscaledata();
                    const minData = this.minscaledata();
                    // Calculate the current center point of the scale
                    const center = (maxData + minData) / 2;
                    // Calculate the new range extent based on transform.k
                    const newExtent = (maxData - minData) / this.transform.k / 2;
                    // Calculate the new maximum and minimum data values
                    const newMax = center + newExtent;
                    const newMin = center - newExtent;
                    // console.log("CRSI",[newMin, newMax]);
                    return [newMin, newMax];
                },
            },
            BL1: {
                //yscaletag: "BL1",
                yaxistag: "YY2",
                xpoint: this.margin.left + this.margin.innerLeft,
                scaleSide: "Left",
                ypadding: () => 0,
                transform: { k: 1 },
                scaledata: () => [-1, 2],
                changeRangeTag: false,
                visrange: () => [0, this.dataset["xdata"].length],
                maxscaledata() {
                    // Filter high values within the visrange
                    if (this.scaledata().length === 2)
                        return this.scaledata()[1];
                    const highWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.max(highWithinRange, (d) => d + d * this.ypadding());
                },
                minscaledata() {
                    if (this.scaledata().length === 2)
                        return this.scaledata()[0];
                    // Filter low values within the visrange
                    const lowWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.min(lowWithinRange, (d) => d - d * this.ypadding());
                },
                datadomain() {
                    const maxData = this.maxscaledata();
                    const minData = this.minscaledata();
                    // Calculate the current center point of the scale
                    const center = (maxData + minData) / 2;
                    // Calculate the new range extent based on transform.k
                    const newExtent = (maxData - minData) / this.transform.k / 2;
                    // Calculate the new maximum and minimum data values
                    const newMax = center + newExtent;
                    const newMin = center - newExtent;
                    return [-1, 2];
                    // return [
                    //   newMin > minData ? minData : newMin,
                    //   newMax < maxData ? maxData : newMax,
                    // ];
                },
            },
            TL: {
                // yscaletag: "TL",
                yaxistag: "YY1",
                xpoint: this.margin.left + this.margin.innerLeft,
                scaleSide: "Right",
                ypadding: () => 0.1,
                transform: { k: 1 },
                scaledata: () => [
                    findOverallMinMax(this.dataset.MDline()).overallMin,
                    findOverallMinMax(this.dataset.MDline()).overallMax,
                ],
                changeRangeTag: false,
                visrange: () => [0, 200],
                maxscaledata() {
                    console.log(this.scaledata());
                    if (this.scaledata().length === 2)
                        return this.scaledata()[1];
                    // Filter high values within the visrange
                    const highWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.max(highWithinRange, (d) => d);
                },
                minscaledata() {
                    // Filter low values within the visrange
                    if (this.scaledata().length === 2)
                        return this.scaledata()[0];
                    const lowWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.min(lowWithinRange, (d) => d);
                },
                datadomain() {
                    const maxData = this.maxscaledata();
                    const minData = this.minscaledata();
                    // Calculate the current center point of the scale
                    const center = (maxData + minData) / 2;
                    // Calculate the new range extent based on transform.k
                    const newExtent = (maxData - minData) / this.transform.k / 2;
                    // Calculate the new maximum and minimum data values
                    const newMax = center + newExtent;
                    const newMin = center - newExtent;
                    const lowerlimit = newMin;
                    const higherlimit = newMax;
                    const padding = (higherlimit - lowerlimit) * this.ypadding();
                    return [lowerlimit - padding, higherlimit + padding];
                    // console.log("RANGE",[newMin, newMax]);
                    // return [newMin, newMax];
                },
            },
            BB: {
                // yscaletag: "BB",
                yaxistag: "YY3",
                xpoint: this.svgWidth - this.margin.right,
                scaleSide: "Right",
                ypadding: () => 0.1,
                transform: { k: 1 },
                scaledata: () => this.dataset.fundaY,
                changeRangeTag: false,
                visrange: () => [0, 50],
                maxscaledata() {
                    // Filter high values within the visrange
                    // console.log(this.visrange());
                    const highWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    // console.log("obhighWithinRange", highWithinRange);
                    return d3.max(highWithinRange, (d) => d + d * 0.05);
                },
                minscaledata() {
                    // Filter low values within the visrange
                    const lowWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.min(lowWithinRange, (d) => d - d * 0.05);
                },
                datadomain() {
                    const maxData = this.maxscaledata();
                    const minData = this.minscaledata();
                    // Calculate the current center point of the scale
                    const center = (maxData + minData) / 2;
                    // Calculate the new range extent based on transform.k
                    const newExtent = (maxData - minData) / this.transform.k / 2;
                    // Calculate the new maximum and minimum data values
                    const newMax = center + newExtent;
                    const newMin = center - newExtent;
                    // console.log(minData, maxData);
                    return [
                        newMin > minData ? minData : newMin,
                        newMax < maxData ? maxData : newMax,
                    ];
                },
            },
            BB1: {
                // fundaX: [1, 4, 8,12,20],
                // fundaY: [20, 40, 50,25,10],
                // yscaletag: "BB",
                yaxistag: "YY3",
                xpoint: this.margin.left + this.margin.innerLeft,
                scaleSide: "Right",
                ypadding: () => 0.1,
                transform: { k: 1 },
                scaledata: () => this.dataset.fundaY1.flatMap((d) => Object.values(d).filter((value, index) => index !== 0)),
                changeRangeTag: false,
                visrange: () => [0, 50],
                maxscaledata() {
                    // Filter high values within the visrange
                    // console.log(this.visrange());
                    const highWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    // console.log("obhighWithinRange", highWithinRange);
                    return d3.max(highWithinRange, (d) => d + d * 0.05);
                },
                minscaledata() {
                    // Filter low values within the visrange
                    const lowWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.min(lowWithinRange, (d) => d - d * 0.05);
                },
                datadomain() {
                    const maxData = this.maxscaledata();
                    const minData = this.minscaledata();
                    // Calculate the current center point of the scale
                    const center = (maxData + minData) / 2;
                    // Calculate the new range extent based on transform.k
                    const newExtent = (maxData - minData) / this.transform.k / 2;
                    // Calculate the new maximum and minimum data values
                    const newMax = center + newExtent;
                    const newMin = center - newExtent;
                    console.log(minData, maxData);
                    return [
                        newMin > minData ? minData : newMin,
                        newMax < maxData ? maxData : newMax,
                    ];
                },
            },
            FNYEAR_Y: {
                // fundaX: [1, 4, 8,12,20],
                // fundaY: [20, 40, 50,25,10],
                // yscaletag: "BB",
                yaxistag: "YY3",
                xpoint: this.margin.left + this.margin.innerLeft,
                scaleSide: "Right",
                ypadding: () => 0.1,
                transform: { k: 1 },
                scaledata: () => this.dataset.Operating_ProfitY.flatMap((d) => Object.values(d).filter((value, index) => index !== 0)),
                changeRangeTag: false,
                visrange: () => [0, 50],
                maxscaledata() {
                    // Filter high values within the visrange
                    // console.log(this.visrange());
                    const highWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    // console.log("obhighWithinRange", highWithinRange);
                    return d3.max(highWithinRange, (d) => d + d * 0.05);
                },
                minscaledata() {
                    // Filter low values within the visrange
                    const lowWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.min(lowWithinRange, (d) => d - d * 0.05);
                },
                datadomain() {
                    const maxData = this.maxscaledata();
                    const minData = this.minscaledata();
                    // Calculate the current center point of the scale
                    const center = (maxData + minData) / 2;
                    // Calculate the new range extent based on transform.k
                    const newExtent = (maxData - minData) / this.transform.k / 2;
                    // Calculate the new maximum and minimum data values
                    const newMax = center + newExtent;
                    const newMin = center - newExtent;
                    // console.log(minData, maxData);
                    return [
                        newMin > minData ? minData : newMin,
                        newMax < maxData ? maxData : newMax,
                    ];
                },
            },
            FNQUR_Y: {
                // fundaX: [1, 4, 8,12,20],
                // fundaY: [20, 40, 50,25,10],
                // yscaletag: "BB",
                yaxistag: "YY3",
                xpoint: this.margin.left + this.margin.innerLeft,
                scaleSide: "Right",
                ypadding: () => 0.1,
                transform: { k: 1 },
                scaledata: () => this.dataset.EPS_Y.flatMap((d) => Object.values(d).filter((value, index) => index !== 0)),
                changeRangeTag: false,
                visrange: () => [0, 50],
                maxscaledata() {
                    // Filter high values within the visrange
                    // console.log(this.visrange());
                    const highWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    // console.log("obhighWithinRange", highWithinRange);
                    return d3.max(highWithinRange, (d) => d + d * 0.05);
                },
                minscaledata() {
                    // Filter low values within the visrange
                    const lowWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.min(lowWithinRange, (d) => d - d * 0.05);
                },
                datadomain() {
                    const maxData = this.maxscaledata();
                    const minData = this.minscaledata();
                    // Calculate the current center point of the scale
                    const center = (maxData + minData) / 2;
                    // Calculate the new range extent based on transform.k
                    const newExtent = (maxData - minData) / this.transform.k / 2;
                    // Calculate the new maximum and minimum data values
                    const newMax = center + newExtent;
                    const newMin = center - newExtent;
                    // console.log(minData, maxData);
                    return [
                        newMin > minData ? minData : newMin,
                        newMax < maxData ? maxData : newMax,
                    ];
                },
            },
            HOLD_Y: {
                // fundaX: [1, 4, 8,12,20],
                // fundaY: [20, 40, 50,25,10],
                // yscaletag: "BB",
                yaxistag: "YY3",
                xpoint: this.margin.left + this.margin.innerLeft,
                scaleSide: "Right",
                ypadding: () => 0.1,
                transform: { k: 1 },
                scaledata: () => this.dataset.HoldingData_Y.flatMap((d) => Object.values(d).filter((value, index) => index !== 0)),
                changeRangeTag: false,
                visrange: () => [0, 50],
                maxscaledata() {
                    // Filter high values within the visrange
                    // console.log(this.visrange());
                    const highWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    // console.log("obhighWithinRange", highWithinRange);
                    return d3.max(highWithinRange, (d) => d + d * 0.05);
                },
                minscaledata() {
                    // Filter low values within the visrange
                    const lowWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.min(lowWithinRange, (d) => d - d * 0.05);
                },
                datadomain() {
                    const maxData = this.maxscaledata();
                    const minData = this.minscaledata();
                    // Calculate the current center point of the scale
                    const center = (maxData + minData) / 2;
                    // Calculate the new range extent based on transform.k
                    const newExtent = (maxData - minData) / this.transform.k / 2;
                    // Calculate the new maximum and minimum data values
                    const newMax = center + newExtent;
                    const newMin = center - newExtent;
                    // console.log(minData, maxData);
                    return [
                        newMin > minData ? minData : newMin,
                        newMax < maxData ? maxData : newMax,
                    ];
                },
            },
            BBBAR: {
                // fundaX: [1, 4, 8,12,20],
                // fundaY: [20, 40, 50,25,10],
                // yscaletag: "BB",
                yaxistag: "YY3",
                xpoint: this.margin.left + this.margin.innerLeft + this.width,
                scaleSide: "Left",
                ypadding: () => 0.1,
                transform: { k: 1 },
                scaledata: () => this.dataset.fundabarY1.flatMap((d) => Object.values(d).filter((value, index) => index !== 0)),
                changeRangeTag: false,
                visrange: () => [0, 50],
                maxscaledata() {
                    // Filter high values within the visrange
                    // console.log(this.visrange());
                    const highWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    // console.log("obhighWithinRange", highWithinRange);
                    return d3.max(highWithinRange, (d) => d + d * 0.05);
                },
                minscaledata() {
                    // Filter low values within the visrange
                    const lowWithinRange = this.scaledata().filter((d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]);
                    return d3.min(lowWithinRange, (d) => d - d * 0.05);
                },
                datadomain() {
                    const maxData = this.maxscaledata();
                    const minData = this.minscaledata();
                    // Calculate the current center point of the scale
                    const center = (maxData + minData) / 2;
                    // Calculate the new range extent based on transform.k
                    const newExtent = (maxData - minData) / this.transform.k / 2;
                    // Calculate the new maximum and minimum data values
                    const newMax = center + newExtent;
                    const newMin = center - newExtent;
                    // console.log(minData, maxData);
                    return [
                        newMin > minData ? minData : newMin,
                        newMax < maxData ? maxData : newMax,
                    ];
                },
            },
        };
        // console.log("hello", this.yScaleConfig[0].tempfn());
        //this.datatoplot = getLineObjects(this.dataset);
        // console.log(this.yScaleConfig["BB1"].scaledata());
        this.datatoplot = {
            OHLC: {
                plot: this.cdbutton,
                data: () => this.dataset,
                xdata: "xdata",
                xdatamap: false,
                linetype: "solid",
                color: "blue",
                yscalenumber: 1,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "15,5",
                yscaletag: "TR",
                xscaletag: "bot",
                plottype: "ohlc",
                tagclass: "ohlc_",
            },
            Close: {
                plot: this.closebutton,
                data: () => this.dataset.close,
                xdata: "xdata",
                xdatamap: false,
                linetype: "solid",
                color: "green",
                yscalenumber: 1,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "0",
                yscaletag: "TR",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "cline_",
            },
            Volume: {
                plot: this.volbutton,
                data: () => this.dataset.volume,
                xdata: "xdata",
                xdatamap: false,
                linetype: "dashed",
                color: "#FF00FF",
                yscalenumber: 2,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "25,5",
                yscaletag: "BR",
                xscaletag: "bot",
                plottype: "bar",
                tagclass: "volume_",
            },
            Volume_SMA: {
                plot: this.volbutton,
                data: () => this.dataset.sma(this.dataset.volume, 12),
                xdata: "xdata",
                xdatamap: false,
                linetype: "dashed",
                color: "black",
                yscalenumber: 2,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "0",
                yscaletag: "BR",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "volume_",
            },
            ZigZag: {
                plot: this.zigzagbutton,
                data: () => this.dataset.zigzaglineY,
                xdata: "zigzaglineX",
                xdatamap: false,
                linetype: "dashed",
                color: "blue",
                yscalenumber: 2,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "0",
                yscaletag: "TR",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "zigzag_",
            },
            pricetobreak: {
                plot: this.brlinebutton,
                data: () => this.dataset.pricetobreaklineY,
                xdata: "pricetobreaklineX",
                xdatamap: true,
                linetype: "dashed",
                color: "green",
                yscalenumber: 2,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "0",
                yscaletag: "TR",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "zigzag_",
            },
            pricetobreakdownline: {
                plot: this.brlinebutton,
                data: () => this.dataset.pricetobreakdownlineY,
                xdata: "pricetobreakdownlineX",
                xdatamap: true,
                linetype: "dashed",
                color: "red",
                yscalenumber: 2,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "0",
                yscaletag: "TR",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "zigzag_",
            },
            crsidat: {
                plot: this.crsibutton,
                data: () => this.dataset.crsidataY,
                xdata: "xdata",
                xdatamap: false,
                linetype: "dashed",
                color: "green",
                yscalenumber: 2,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "0",
                yscaletag: "CRSI",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "crsi_",
            },
            crsidat_avg: {
                plot: this.crsibutton,
                data: () => this.dataset.crsidataavgY,
                xdata: "xdata",
                xdatamap: false,
                linetype: "dashed",
                color: "red",
                yscalenumber: 2,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "0",
                yscaletag: "CRSI",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "crsi_",
            },
            RSI: {
                plot: this.rsibutton,
                data: () => this.dataset.rsi(this.dataset.close, 12),
                xdata: "xdata",
                xdatamap: false,
                linetype: "solid",
                color: "red",
                yscalenumber: 2,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "0",
                yscaletag: "BL",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "rsi_",
            },
            RSI30: {
                plot: this.rsibutton,
                data: () => [30, 30],
                xdatamap: true,
                xdata: "xdata2",
                linetype: "solid",
                color: "black",
                yscalenumber: 2,
                fill: "none",
                strokewidth: 1,
                strokedasharray: "3,3",
                yscaletag: "BL",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "rsi_",
            },
            RSI70: {
                plot: this.rsibutton,
                data: () => [70, 70],
                xdatamap: true,
                xdata: "xdata2",
                linetype: "solid",
                color: "black",
                yscalenumber: 2,
                fill: "none",
                strokewidth: 1,
                strokedasharray: "3,3",
                yscaletag: "BL",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "rsi_",
            },
            ATR: {
                plot: this.atrbutton,
                data: () => this.dataset.atr(this.dataset.high, this.dataset.low, this.dataset.close, 12),
                xdata: "xdata",
                xdatamap: false,
                linetype: "solid",
                color: "yellow",
                yscalenumber: 2,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "0",
                yscaletag: "BL1",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "atr_",
            },
            ADX: {
                plot: this.adxbutton,
                data: () => this.dataset.adx(this.dataset.high, this.dataset.low, this.dataset.close, 12),
                xdata: "xdata",
                xdatamap: false,
                linetype: "solid",
                color: "blue",
                yscalenumber: 2,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "0",
                yscaletag: "BL",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "adx_",
            },
            ADX20: {
                plot: this.adxbutton,
                data: () => [20, 20],
                xdatamap: true,
                xdata: "xdata2",
                linetype: "solid",
                color: "black",
                yscalenumber: 2,
                fill: "none",
                strokewidth: 1,
                strokedasharray: "3,3",
                yscaletag: "BL",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "adx_",
            },
            EPS: {
                plot: this.epsbutton,
                data: () => this.dataset.EPS_Y,
                xdata: "EPS_X",
                xdatamap: false,
                linetype: "solid",
                color: { y: "green", z: "red" },
                yscalenumber: 2,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "0",
                yscaletag: "FNQUR_Y",
                xscaletag: "FNQUR_X",
                plottype: "bar",
                tagclass: "eps_",
            },
            OP: {
                plot: this.opbutton,
                data: () => this.dataset.Operating_ProfitY,
                xdata: "Operating_ProfitX",
                xdatamap: false,
                linetype: "solid",
                color: { y: "blue", z: "red" },
                yscalenumber: 2,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "0",
                yscaletag: "FNYEAR_Y",
                xscaletag: "FNYEAR_X",
                plottype: "bar",
                tagclass: "op_",
            },
            FII: {
                plot: this.fiibutton,
                data: () => this.dataset.HoldingData_Y,
                xdata: "HoldingData_X",
                xdatamap: false,
                linetype: "solid",
                color: { y: "green", z: "red", z1: "blue", z2: "black" },
                yscalenumber: 2,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "0",
                yscaletag: "HOLD_Y",
                xscaletag: "HOLD_X",
                plottype: "bar",
                tagclass: "fii_",
            },
            EMA1: {
                plot: this.emabutton,
                data: () => this.dataset.ema(this.dataset.close, 10),
                xdata: "xdata",
                xdatamap: false,
                linetype: "solid",
                color: "red",
                yscalenumber: 1,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "10,1",
                yscaletag: "TR",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "techline_",
            },
            EMA: {
                plot: this.emabutton,
                data: () => this.dataset.ema(this.dataset.close, 30),
                xdata: "xdata",
                xdatamap: false,
                linetype: "solid",
                color: "blue",
                yscalenumber: 1,
                fill: "none",
                strokewidth: 2,
                strokedasharray: "5,5",
                yscaletag: "TR",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "techline_",
            },
            BREOUTLINES: {
                plot: this.brlinebutton,
                data: () => this.dataset.breakoutlines(),
                xdata: "xdata",
                xdatamap: false,
                linetype: "solid",
                color: "black",
                yscalenumber: 1,
                fill: "none",
                strokewidth: 1,
                strokedasharray: "0",
                yscaletag: "TR",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "brline_",
            },
            MDLINES: {
                plot: this.mdbutton,
                data: () => this.dataset.MDline(),
                xdata: "xdata",
                xdatamap: true,
                linetype: "solid",
                color: { y: "green", z: "red" },
                yscalenumber: 1,
                fill: "none",
                strokewidth: 1,
                strokedasharray: "0",
                yscaletag: "TL",
                xscaletag: "bot",
                plottype: "line",
                tagclass: "mdline_",
            },
            SIGNALLINE: {
                plot: this.sigbutton,
                data: () => this.dataset.SIGNALLINE,
                xdata: "xdata",
                xdatamap: false,
                linetype: "solid",
                color: { y: "green", z: "red" },
                yscalenumber: 1,
                fill: "none",
                strokewidth: 1,
                strokedasharray: "0",
                yscaletag: "BL1",
                xscaletag: "bot",
                plottype: "scatter",
                tagclass: "signalline_",
            },
        };
        // this.uniqueYscaletags = [
        //   ...new Set(
        //     this.datatoplot
        //       .filter((data) => data.plot)
        //       .map((data) => data.yscaletag)
        //   ),
        // ];
        this.uniqueYscaletags = [
            ...new Set(Object.values(this.datatoplot)
                .filter((data) => data.plot)
                .map((data) => data.yscaletag)),
        ];
        // console.log(this.uniqueYscaletags);
        const filteredYconfig = Object.keys(this.yScaleConfig)
            .filter((key) => this.uniqueYscaletags.includes(key))
            .map((key) => this.yScaleConfig[key].yaxistag);
        this.yAxisConfig = generateYAxisConfig(filteredYconfig);
        // console.log(this.yAxisConfig);
        // this.uniqueXscaletags = [
        //   ...new Set(
        //     this.datatoplot
        //       .filter((data) => data.plot)
        //       .map((data) => data.xscaletag)
        //   ),
        // ];
        this.uniqueXscaletags = [
            ...new Set(Object.values(this.datatoplot)
                .filter((data) => data.plot)
                .map((data) => data.xscaletag)),
        ];
        // console.log(this.uniqueXscaletags);
        Object.keys(this.xScaleConfig).forEach((key) => {
            this.xScaleConfig[key].plotaxis = this.uniqueXscaletags.includes(key)
                ? true
                : false;
        });
        //  console.log(this.xScaleConfig);
        this.buttonPanelParams = [
            {
                className: "utli-button-panel",
                x: this.margin.left + this.margin.innerLeft,
                y: this.margin.top,
                width: 550,
                height: this.margin.innertop,
                color: "cyan",
            },
            {
                className: "tech-button-panel",
                x: this.margin.left + this.margin.innerLeft + 550,
                y: this.margin.top,
                width: 50,
                height: this.margin.innertop,
                color: "blue",
            },
            {
                className: "basic-button-panel",
                x: this.margin.left + this.margin.innerLeft,
                y: this.margin.top * 2,
                width: 200,
                height: this.margin.innertop,
                color: "green",
            },
            {
                className: "fund-button-panel",
                x: this.margin.left + this.margin.innerLeft + this.width - 250,
                y: this.margin.top,
                width: 250,
                height: this.margin.innertop,
                color: "blue",
            },
        ];
        this.buttonObjects = [
            {
                plot: true,
                imageUrl: null,
                classtag: "live",
                label: "Live",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.livebutton,
                panelName: "utli-button-panel",
                onClickHandler: () => this.golivehandle(),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "zoom",
                label: "Reset",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: "NA",
                panelName: "utli-button-panel",
                onClickHandler: () => this.restzoom(),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "trline",
                label: "Line",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.toggleTrendLine,
                panelName: "utli-button-panel",
                onClickHandler: () => this.trendline({ classtag: "trline" }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "vol",
                label: "Vol",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.volbutton,
                panelName: "utli-button-panel",
                onClickHandler: () => this.handleplotData({ classtag: "vol", classgroupName: "volume_" }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "cd",
                label: "CD",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.cdbutton,
                panelName: "utli-button-panel",
                onClickHandler: () => this.handleplotData({ classtag: "cd", classgroupName: "ohlc_" }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "close",
                label: "C",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.closebutton,
                panelName: "utli-button-panel",
                onClickHandler: () => this.handleplotData({ classtag: "close", classgroupName: "cline_" }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "zigzag",
                label: "Zig",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.zigzagbutton,
                panelName: "utli-button-panel",
                onClickHandler: () => this.handleplotData({
                    classtag: "zigzag",
                    classgroupName: "zigzag_",
                }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "trend",
                label: "TR",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.trendbutton,
                panelName: "utli-button-panel",
                onClickHandler: () => this.handleplotData({ classtag: "trend", classgroupName: "tr_" }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "rsi",
                label: "RSI",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.rsibutton,
                panelName: "utli-button-panel",
                onClickHandler: () => this.handleplotData({ classtag: "rsi", classgroupName: "rsi_" }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "ema",
                label: "EMA",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.emabutton,
                panelName: "utli-button-panel",
                onClickHandler: () => this.handleplotData({ classtag: "ema", classgroupName: "techline_" }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "atr",
                label: "ATR",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.atrbutton,
                panelName: "utli-button-panel",
                onClickHandler: () => this.handleplotData({ classtag: "atr", classgroupName: "atr_" }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "adx",
                label: "ADX",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.adxbutton,
                panelName: "utli-button-panel",
                onClickHandler: () => this.handleplotData({ classtag: "adx", classgroupName: "adx_" }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "crsi",
                label: "CRSI",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.crsibutton,
                panelName: "utli-button-panel",
                onClickHandler: () => this.handleplotData({ classtag: "crsi", classgroupName: "crsi_" }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "brline",
                label: "BRL",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.brlinebutton,
                panelName: "utli-button-panel",
                onClickHandler: () => this.handleplotData({
                    classtag: "brline",
                    classgroupName: "brline_",
                }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "signalline",
                label: "SIG",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.sigbutton,
                panelName: "fund-button-panel",
                onClickHandler: () => this.handleplotData({
                    classtag: "signalline",
                    classgroupName: "signalline_",
                }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "eps",
                label: "EP",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.epsbutton,
                panelName: "fund-button-panel",
                onClickHandler: () => this.handleplotData({ classtag: "eps", classgroupName: "eps_" }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "op",
                label: "OP",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.opbutton,
                panelName: "fund-button-panel",
                onClickHandler: () => this.handleplotData({ classtag: "op", classgroupName: "op_" }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "fii",
                label: "FII",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.fiibutton,
                panelName: "fund-button-panel",
                onClickHandler: () => this.handleplotData({ classtag: "fii", classgroupName: "fii_" }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "md",
                label: "MD",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: this.mdbutton,
                panelName: "fund-button-panel",
                onClickHandler: () => this.handleplotData({ classtag: "md", classgroupName: "mdline_" }),
                buttonclick: function () {
                    return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "go",
                label: "GO",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: "NA",
                panelName: "fund-button-panel",
                stockid: "temp:1D",
                // onClickHandler: () => this.handleplotData({ classgroupName: "go_" }),
                buttonclick: function () {
                    const url = `https://gocharting.com/terminal?ticker=NSE:${this.stockid.split(":")[0]}&layout=1`;
                    window.open(url, "_blank");
                    // return this.onClickHandler();
                },
            },
            {
                plot: true,
                imageUrl: null,
                classtag: "sceener",
                label: "SC",
                color: this.buttonProps.color,
                opacity: this.buttonProps.opacity,
                pressstatus: "NA",
                panelName: "fund-button-panel",
                stockid: "temp:1D",
                // onClickHandler: () => this.handleplotData({ classgroupName: "go_" }),
                buttonclick: () => {
                    // console.log(this);
                    const url = `https://www.screener.in/company/${this.stockid.split(":")[0]}/consolidated/`; // Replace this with the URL you want to open
                    window.open(url, "_blank");
                    // return this.onClickHandler();
                },
            },
        ];
        // const xScaleWithMainRole = this.xScaleConfig.find(
        //   (scale) => scale.scaleRole === "main"
        // );
        // this.xscaleMaintag = xScaleWithMainRole
        //   ? xScaleWithMainRole.xscaletag
        //   : null;
        this.dragBehavior = d3
            .drag()
            .on("start", this.handleDragStart.bind(this))
            .on("drag", this.handleDrag.bind(this))
            .on("end", this.handleDragEnd.bind(this));
        this.initChart();
    }
    initChart() {
        this.setupSVG();
        this.setupScales();
        this.setupZoom();
        this.setupEventHandlers();
        this.renderChart();
        this.renderAxes();
        this.renderYAxisLines();
    }
    setupSVG() {
        const svgElementExists = d3.select(`#svg-${this.targetID}`).empty();
        this.svg = svgElementExists
            ? d3
                .select(`#${this.targetID}`)
                .append("svg")
                .attr("id", `svg-${this.targetID}`)
                .attr("width", this.svgWidth)
                .attr("height", this.svgHeight)
            : d3.select(`#svg-${this.targetID}`);
        this.svg
            .append("defs")
            .append("clipPath")
            .attr("id", `clip1-${this.targetID}`)
            .append("rect")
            .attr("x", this.margin.left + this.margin.innerLeft)
            .attr("y", this.margin.top + this.margin.innertop)
            .attr("width", this.width + 0 * this.margin.innerLeft)
            .attr("height", this.height);
        this.axisarea = this.svg.append("g");
        this.chartarea = this.svg.append("g");
        this.crosstooltiparea = this.svg.append("g");
        this.tooltip = this.svg.append("g");
        this.zoomareaX = this.svg.append("g");
        this.zoomareaY = this.svg.append("g");
        // this.zoomaLeftarea= this.svg.append("g");
        this.trlineara = this.svg.append("g");
        this.setupCrosshair();
        this.setupEventTopArea();
        // this.zoomareaY = this.svg.append("g");
    }
    setupCrosshair() {
        // Append vertical line for crosshair
        const x1 = this.margin.left + this.margin.innerLeft;
        const width = this.width;
        const y1 = this.margin.top + this.margin.innertop;
        const height = this.height;
        this.crosstooltiparea = this.crosstooltiparea
            .attr("class", "crosshair1")
            .attr("transform", `translate(${0}, ${0})`);
        this.tooltip
            .attr("class", "tooltip")
            .attr("transform", `translate(${x1},${y1})`);
    }
    moveCrosshair(event) {
        this.svg.selectAll(`.crosshair`).remove();
        this.svg.selectAll(".tooliptext").remove();
        if (!this.svg.select(".x-zoom").property("__zoom"))
            return null;
        const [x, y] = d3.pointer(event);
        const yaxistag = findKeyByNumber(this.yAxisRange, y);
        // console.log(yaxistag);
        // this.uniqueYscaletags = [
        //   ...new Set(
        //     Object.values(this.datatoplot)
        //       .filter(data => data.plot)
        //       .map(data => data.yscaletag)
        //   )
        // ];
        // console.log(this.uniqueYscaletags);
        const sectedscale0 = getXScaleTagsByDataTag(this.yScaleConfig, "yaxistag", yaxistag, "yscaletag");
        const sectedscale = sectedscale0.filter((element) => this.uniqueYscaletags.includes(element));
        if (sectedscale.length == 0)
            return null;
        // console.log(sectedscale);
        const presentKeys = sectedscale[0];
        const ys = this.yScaleConfig[presentKeys].yScale;
        const currentTransformX = this.svg.select(".x-zoom").property("__zoom");
        const currentXscale = currentTransformX.rescaleX(this.xScaleConfig["bot"].xScale);
        const xValue = currentXscale.invert(x);
        let index = Math.round(xValue) < 0
            ? 0
            : Math.round(xValue) > this.dataset.xdata.length - 1
                ? this.dataset.xdata.length - 1
                : Math.round(xValue);
        //  console.log(x,xValue,index)
        //  console.log(y)
        const rightmostlimit = this.margin.left + this.margin.innerLeft + this.width;
        if (currentXscale(index) > rightmostlimit)
            return (index = index - 1);
        // console.log("aa",index);
        const secondlastItem = this.dataset.close[index - 1];
        const roch = ((this.dataset.close[index] -
            this.dataset.close[this.dataset.close.length - 1]) /
            this.dataset.close[index]) *
            100;
        // console.log(this.dataset.close[this.dataset.close.length - 1],this.dataset.close[index]);
        // console.log("roch",roch);
        const rocp = secondlastItem
            ? ((this.dataset.close[index] - secondlastItem) / secondlastItem) * 100
            : NaN;
        this.crosshairX = this.crosstooltiparea
            .append("line")
            .attr("class", "crosshair crosshair-x")
            .attr("x1", this.margin.left + this.margin.innerLeft)
            .attr("y1", y)
            .attr("x2", this.svgWidth - this.margin.right)
            .attr("y2", y)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "5 5")
            .attr("pointer-events", "none")
            .style("display", "block");
        // if (presentKeys[0]=='TR'){
        // Append white rectangular background
        this.crosshairTextBackground = this.crosstooltiparea
            .append("rect")
            .attr("class", "crosshair crosshair-background")
            .attr("x", this.svgWidth - this.margin.right + 3) // Adjust the x-coordinate as needed
            .attr("y", y - 8) // Adjust the y-coordinate to center the text vertically
            .attr("width", 100) // Adjust the width as needed
            .attr("height", 18) // Adjust the height as needed
            .attr("fill", "lightblue")
            .attr("rx", 5) // Radius for rounded corners
            .attr("ry", 5);
        // Append text at the end of the line
        this.crosshairText = this.crosstooltiparea
            .append("text")
            .attr("class", "crosshair crosshair-text")
            .attr("x", this.svgWidth - this.margin.right + 5) // Adjust the x-coordinate as needed
            .attr("y", y)
            .attr("dy", "0.35em") // Adjust vertical alignment as needed
            .attr("text-anchor", "start")
            .style("fill", "blue") // Font color
            .style("font-size", "10px")
            .text(`${ys.invert(y).toFixed(2)}`);
        // }
        this.crosshairY = this.crosstooltiparea
            .append("line")
            .attr("class", "crosshair crosshair-y")
            .attr("x1", currentXscale(index))
            .attr("y1", this.margin.top + this.margin.innertop)
            .attr("x2", currentXscale(index))
            .attr("y2", this.margin.top + this.margin.innertop + this.height)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "5 5")
            .attr("pointer-events", "none")
            .style("display", "block");
        if (this.tooltipshow) {
            this.tooltip.style("display", "block");
            this.tooltip
                .append("rect")
                .attr("class", "tooliptext")
                .attr("width", this.width / 2)
                .attr("height", 10)
                .attr("fill", "white")
                // .attr('stroke', 'black')
                .style("opacity", 1);
            this.tooltip
                .append("text")
                .attr("class", "tooliptext")
                .attr("x", 10)
                .attr("y", 10)
                .attr("font-size", "12px")
                .append("tspan")
                .text(`${this.stockid}`)
                .attr("fill", "blue")
                .append("tspan")
                .attr("dx", "10")
                .text(`N: ${this.dataset.timestamp.length - index - 1}`)
                .attr("fill", "blue")
                .append("tspan")
                .attr("dx", "10")
                .text(`N2: ${index}`)
                .attr("fill", "blue")
                .append("tspan")
                .attr("dx", "10")
                .text(`Date: ${convertUnixTimestamp(this.dataset.timestamp[index])}`)
                .attr("fill", "blue")
                .append("tspan")
                .attr("dx", "10")
                .text(`Open: ${this.dataset.open[index].toFixed(2)}`)
                .attr("fill", "blue")
                .append("tspan")
                .attr("dx", "10")
                .text(`High: ${this.dataset.high[index].toFixed(2)}`)
                .attr("fill", "blue")
                .append("tspan")
                .attr("dx", "10")
                .text(`Low: ${this.dataset.low[index].toFixed(2)}`)
                .attr("fill", "blue")
                .append("tspan")
                .attr("dx", "10")
                .text(`Close: ${this.dataset.close[index].toFixed(2)}`)
                .attr("fill", "blue")
                .append("tspan")
                .attr("dx", "10")
                .text(`HL%: ${((this.dataset.high[index] / this.dataset.low[index] - 1) *
                100).toFixed(2)}`)
                .attr("fill", this.dataset.close[index] < this.dataset.open[index] ? "red" : "blue")
                .append("tspan")
                .attr("dx", "10")
                .text(`BL%: ${((this.dataset.close[index] / this.dataset.open[index] - 1) *
                100).toFixed(2)}`)
                .attr("fill", this.dataset.close[index] < this.dataset.open[index] ? "red" : "blue")
                .append("tspan")
                .attr("dx", "10")
                .text(`ROCH: ${roch.toFixed(2)}`)
                .attr("fill", roch < 0 ? "red" : "blue")
                .append("tspan")
                .attr("dx", "10")
                .text(`ROCP: ${rocp.toFixed(2)}`)
                .attr("fill", rocp < 0 ? "red" : "blue");
            //.text('Date: ')
            // .attr('fill', 'blue')
        }
        if (this.backtestreport) {
            //console.log("DF",this.dataset.backtestreport);
            // console.log(index,this.dataset.backtestresult);
            // this.tooltip
            //   .append("text")
            //   .attr("class", "tooliptext")
            if (!this.dataset.backtestreport) {
                return; // Exit the function if backtestreport is not defined
            }
            // const bckdata=this.dataset.backtestresult
            // console.log(bckdata);
            const getcandlebacktestinfor = this.dataset.backtestresult.filter(item => item.index == index);
            //console.log(getcandlebacktestinfor[0]);
            if (getcandlebacktestinfor.length > 0) {
                const comment = getStatusAndComment(getcandlebacktestinfor[0]);
                // console.log(comment);
                this.tooltip.append("text")
                    .attr("class", "tooliptext")
                    .attr("x", 10)
                    .attr("y", 30)
                    .attr("font-size", "16px")
                    .append("tspan")
                    .text(`${comment} `)
                    .attr("fill", "black");
            }
            const reportText = this.dataset.backtestreport;
            let lines;
            try {
                lines = reportText.split('\n');
            }
            catch (_a) {
                return;
            }
            // Define initial y-coordinate
            let yOffset = 50;
            // Append each line of the report
            lines.forEach(line => {
                this.tooltip.append("text")
                    .attr("class", "tooliptext")
                    .attr("x", 10)
                    .attr("y", yOffset)
                    .attr("font-size", "12px")
                    .text(line)
                    .attr("fill", "blue");
                // Increment y-coordinate for the next line
                yOffset += 15; // Adjust as needed for spacing between lines
            });
        }
    }
    hideCrosshair() {
        // Hide crosshair lines and circle when mouse leaves chart area
        this.svg.selectAll(`.crosshair`).style("display", "none");
        this.tooltip.style("display", "none");
        // this.crosshairY.style('display', 'none');
        // this.crosshairCircle.style('display', 'none');
    }
    handleMouseDown(event) {
        console.log("mouse down", event);
        const [x, y] = d3.pointer(event);
        console.log("down", x, y);
    }
    mousehandleclick(event) {
        if (this.toggleTrendLine == false)
            return null;
        // console.log("mousehandleclick", event);
        // event.sourceEvent.type);
        const [x, y] = d3.pointer(event);
        // console.log("mousehandleclick", x, y);
        console.log(this.yAxisRange);
        const yaxistag = findKeyByNumber(this.yAxisRange, y);
        // console.log(yaxistag);
        const sectedscale0 = getXScaleTagsByDataTag(this.yScaleConfig, "yaxistag", yaxistag, "yscaletag");
        const sectedscale = sectedscale0.filter((element) => this.uniqueYscaletags.includes(element));
        if (sectedscale.length == 0)
            return null;
        // const presentKeys = sectedscale.filter((key) =>
        //   Object.keys(this.yScales).includes(key)
        // );
        // if (presentKeys.length == 0) return;
        // console.log(presentKeys);
        console.log(sectedscale);
        const presentKeys = sectedscale[0];
        console.log(presentKeys);
        // console.log(this.yAxisConfig )
        const xs = this.xScaleConfig["bot"].xScale;
        const ys = this.yScaleConfig[presentKeys].yScale;
        const currentTransformX = this.svg.select(".x-zoom").property("__zoom");
        const rxs = currentTransformX.rescaleX(xs);
        let newKey = getNextName(this.TrendLineData1);
        console.log(newKey);
        this.TrendLineData1.push({
            name: newKey,
            x1: rxs.domain()[0],
            y1: ys.invert(y),
            x2: rxs.domain()[1],
            y2: ys.invert(y),
            plot: true,
            xdata: "xdata",
            linetype: "solid",
            color: "blue",
            yscaletag: presentKeys,
            xscaletag: "bot",
            plottype: newKey,
            tagclass: "tr_",
        });
        // console.log(this.TrendLineData1);
        this.TrendLineData1.forEach((config) => {
            if (config.plot) {
                this.drawTrendLinePlot(config);
            }
        });
        // console.log(this.drawTrendLinePlot);
        // for (let key in this.TrendLineData1) {
        //   // console.log(key); // This will print each key in the object
        //   const config = this.TrendLineData1[key];
        //   // console.log(this.drawTrendLinePlot);
        //   if (config.plot) {
        //     this.drawTrendLinePlot(config)
        //   }
        // }
    }
    handleDoubleClick(event) {
        // if (this.toggleTrendLine==false) return null
    }
    setupEventTopArea() {
        // this.zoomareaX
        //   .attr("transform", `translate(${this.margin.left + this.margin.innerLeft}, ${this.margin.top + this.margin.innertop})`);
        this.zoomareaX
            .append("rect")
            .attr("class", "x-zoom")
            .attr("x", this.margin.left + this.margin.innerLeft)
            .attr("y", this.margin.top + this.margin.innertop)
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("fill", this.backgroundProp.color)
            .attr("fill-opacity", this.backgroundProp.opacity)
            .on("mousemove", this.moveCrosshair.bind(this))
            .on("mouseleave", this.hideCrosshair.bind(this))
            .on("click", this.mousehandleclick.bind(this));
        this.zoomareaY
            .append("rect")
            .attr("class", "y-zoom")
            .attr("x", this.svgWidth - this.margin.right)
            .attr("y", this.margin.top + this.margin.innertop)
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("fill", "green")
            .attr("fill-opacity", 0.2);
        // .on("mousemove", this.moveCrosshair.bind(this))
        // .on("mouseleave", this.hideCrosshair.bind(this))
        // .on("dblclick", this.handleDoubleClick.bind(this))
        // .on("mousedown", this.handleMouseDown.bind(this))
        // .on("click", this.mousehandleclick.bind(this));
        // this.zoomaLeftarea
        //   .append("rect")
        //   .attr("class", "y-zoom-left")
        //   .attr("x", this.margin.left)
        //   .attr("y", this.margin.top + this.margin.innertop)
        //   .attr("width", this.margin.left+this.margin.innerLeft)
        //   .attr("height", this.height)
        //   .attr("fill", "green")
        //   .attr("fill-opacity", 0.2)
    }
    setupScales() {
        this.setupXScale();
        this.setupYScales();
    }
    setupXScale() {
        //this.uniqueXscaletags.forEach(key => {
        for (const key in this.xScaleConfig) {
            if (Object.hasOwnProperty.call(this.xScaleConfig, key)) {
                const item = this.xScaleConfig[key];
                // Update plotaxis based on the condition
                // item.plotaxis = !this.uniqueXscaletags.includes(item.xscaletag);
                const scalerange = item.scalerange;
                const datadomain = item.datadomain();
                const scaleType = item.scaleType;
                let xScale;
                if (scaleType === "linear") {
                    xScale = d3.scaleLinear().range(scalerange).domain(datadomain);
                }
                if (scaleType === "scaleband") {
                    xScale = d3.scaleBand().range(scalerange).domain(datadomain);
                }
                // Update item with new xScale property
                this.xScaleConfig[key].xScale = xScale;
                // Now 'item' is reassigned with the updated properties
            }
        }
        // console.log(this.xScaleConfig)
    }
    setupYScales() {
        // console.log("in setupYScales");
        // console.log("AA",this.yAxisConfig)
        this.yAxisRange = {};
        const totalHeight = this.height - this.yaxispadding;
        const totalRatio = this.yAxisConfig.reduce((acc, axis) => acc + axis.ratio, 0);
        let cumulativeRatio = 0;
        let tempcumulativeRatio = 0;
        this.yAxisConfig.forEach((axis) => {
            const startY = this.margin.top +
                this.yaxispadding +
                this.margin.innertop +
                (totalHeight * tempcumulativeRatio) / totalRatio;
            const endY = startY + (totalHeight * axis.ratio) / totalRatio;
            this.yAxisRange[axis.yaxistag] = [endY, startY];
            tempcumulativeRatio += axis.ratio;
        });
        // console.log("yAxisConfig",this.yAxisConfig);
        // const filteredYScaleConfig = this.yScaleConfig.filter((scale) =>
        //   this.uniqueYscaletags.includes(scale.yscaletag)
        // );
        const filteredYScaleConfig = Object.keys(this.yScaleConfig).filter((key) => this.uniqueYscaletags.includes(key));
        // console.log(this.uniqueYscaletags);
        // console.log(filteredYScaleConfig);
        filteredYScaleConfig.forEach((yscaletag) => {
            // console.log(yscaletag)
            // console.log(this.yScaleConfig)
            const scaleitem = this.yScaleConfig[yscaletag];
            // console.log(scaleitem);
            const currentyaxistag = scaleitem.yaxistag;
            const isYY3Present = this.yAxisConfig.some((item) => item.yaxistag === currentyaxistag);
            if (isYY3Present) {
                const scalerange = this.yAxisRange[currentyaxistag];
                const datadomain = scaleitem.datadomain();
                // console.log("datadomain", datadomain);
                const yScale = d3.scaleLinear().range(scalerange).domain(datadomain);
                //.padding(0.1);
                this.yScaleConfig[yscaletag].yScale = yScale;
                // this.yScales[scaleitem.yscaletag] = yScale;
            }
        });
        // console.log(this.yScaleConfig);
        // filteredYScaleConfig.forEach((scaleitem) => {
        //   const currentyaxistag = scaleitem.yaxistag;
        //   const isYY3Present = this.yAxisConfig.some(
        //     (item) => item.yaxistag === currentyaxistag
        //   );
        //   // console.log("currentyaxistag",currentyaxistag,isYY3Present);
        //   if (isYY3Present) {
        //     const scalerange = this.yAxisRange[currentyaxistag];
        //     const datadomain = scaleitem.datadomain();
        //     // console.log("datadomain", datadomain);
        //     const yScale = d3.scaleLinear().range(scalerange).domain(datadomain);
        //     this.yScales[scaleitem.yscaletag] = yScale;
        //   }
        // });
        // console.log("yScales",this.yScales);
    }
    setupZoom() {
        // const currentTransformX = this.svg.select(".x-zoom").property("__zoom");
        this.zoomX = d3
            .zoom()
            .scaleExtent([0.5, 10])
            .translateExtent([
            [-this.width / 2, -this.height / 2],
            [this.width + this.width / 2, this.height],
        ])
            .extent([
            [0, 0],
            [this.width, this.height],
        ])
            .on("zoom", this.zoomedX);
        // this.zoomY = d3
        //   .zoom()
        //   .scaleExtent([-1, 30])
        //   .translateExtent([
        //     [-this.width / 2, -this.height / 2],
        //     [this.width + this.width / 2, this.height + this.height / 2],
        //   ])
        //   .extent([
        //     [0, 0],
        //     [this.width, this.height],
        //   ])
        //   .on("zoom", this.zoomedY);
        this.zoomY = d3
            .zoom()
            .scaleExtent([-1, 30])
            .translateExtent([
            [-this.width / 2, -this.height / 2],
            [this.width + this.width / 2, this.height + this.height / 2],
        ])
            .extent([
            [0, 0],
            [this.width, this.height],
        ])
            .on("zoom", this.zoomedY);
        this.svg.select(".x-zoom").call(this.zoomX);
        this.svg.select(".y-zoom").call(this.zoomY);
        // this.svg.select(".y-zoom-left").call(this.zoomLeft);
    }
    xaxisgenerator(xScale, xAxisObject = {}) {
        //const xscaleType = xAxisObject.scaleType;
        const xscaledatatag = xAxisObject.scaledatatag;
        const xmappedwith = xAxisObject.mappedwith;
        let axisGenerator;
        if (xAxisObject.scaleSide == "Top") {
            axisGenerator = d3.axisTop(xScale);
        }
        else {
            axisGenerator = d3.axisBottom(xScale);
        }
        // const axisGenerator = d3.axisBottom(xScaleLinear);
        const [start, end] = d3.extent(xScale.range());
        const pxPerTick = 100;
        const tickCount = Math.ceil((end - start) / pxPerTick);
        // console.log(this.stockid);
        if (xmappedwith == "timestamp") {
            // console.log(xAxisObject);
            //console.log( this.dataset[xscaledatatag])
            // return axisGenerator.ticks(tickCount).tickFormat((i) => i);
            return axisGenerator
                .ticks(tickCount)
                .tickFormat((i) => multiFormat(i, this.stockid, this.dataset[xscaledatatag]));
        }
        if (xmappedwith == null) {
            return axisGenerator.ticks(tickCount).tickFormat((i) => i);
        }
        // return axisGenerator.ticks(tickCount).tickFormat((i) => i);
    }
    yaxisgenerator(yScale, yAxisObject = {}, yscaletag = "") {
        // console.log(yAxisObject);
        let axisGenerator;
        if (yAxisObject.scaleSide == "Left") {
            axisGenerator = d3.axisLeft(yScale);
        }
        else {
            axisGenerator = d3.axisRight(yScale);
        }
        const [start, end] = d3.extent(yScale.range());
        const pxPerTick = 40;
        const tickCount = Math.ceil((end - start) / pxPerTick);
        if (yscaletag == "BR") {
            return axisGenerator.ticks(tickCount).tickFormat((d) => formatVolume(d));
        }
        else {
            return axisGenerator.ticks(tickCount);
        }
    }
    restzoom() {
        this.svg.select(".x-zoom").call(this.zoomX.transform, d3.zoomIdentity);
        // const scaleConfigsToUpdate = this.yScaleConfig.filter(
        //   (scale) => scale.yscaletag !== "BB"
        // );
        for (const key in this.yScaleConfig) {
            if (Object.hasOwnProperty.call(this.yScaleConfig, key)) {
                // const scaleitem = this.yScaleConfig[key];
                // this.yScaleConfig[key].xScale = xScale;
                this.yScaleConfig[key].visrange = () => [
                    0,
                    this.dataset["xdata"].length,
                ];
                this.yScaleConfig[key].transform["k"] = 1;
            }
        }
        this.renderAxes();
    }
    trendline(prop) {
        const { classtag } = prop;
        this.toggleTrendLine = !this.toggleTrendLine;
        // console.log(this.toggleTrendLine);
        // console.log("classtag",classtag);
        this.svg
            .select(`.${classtag}`)
            .attr("opacity", this.toggleTrendLine ? 0.8 : this.buttonProps.opacity)
            .attr("fill", this.toggleTrendLine ? "#a5d6a7" : "#e57373");
        // this.svg.select(".x-zoom").call(this.zoomX.transform, d3.zoomIdentity);
        // this.svg.select(".y-zoom").call(this.zoomY.transform, d3.zoomIdentity);
    }
    handleplotData(buttonoptios) {
        const { classgroupName, classtag } = buttonoptios;
        if (classgroupName !== "tr_") {
            Object.values(this.datatoplot).forEach((data) => {
                if (data.tagclass === classgroupName) {
                    data.plot = !data.plot; // Toggle the plot property
                    this.svg
                        .select(`.${classtag}`)
                        .attr("fill", data.plot ? "#a5d6a7" : "#e57373");
                }
            });
        }
        // console.log(this.datatoplot);
        if (classgroupName === "tr_") {
            const matchedData = this.TrendLineData1.filter((data) => data.tagclass === classgroupName);
            if (matchedData.length == 0)
                return null;
            matchedData.forEach((data) => {
                data.plot = !data.plot; // Toggle the plot property
                this.svg
                    .select(`.${classtag}`)
                    .attr("fill", data.plot ? "#a5d6a7" : "#e57373");
            });
        }
        // const uniqueYscaletags_config = [
        //   ...new Set(
        //     this.datatoplot
        //       .filter((item) => item.plot)
        //       .map((item) => item.yscaletag)
        //   ),
        // ];
        // console.log("hello", uniqueYscaletags_config, uniqueYscaletags_config.length);
        this.uniqueYscaletags = [
            ...new Set(Object.values(this.datatoplot)
                .filter((data) => data.plot)
                .map((data) => data.yscaletag)),
        ];
        const filteredYconfig = Object.keys(this.yScaleConfig)
            .filter((key) => this.uniqueYscaletags.includes(key))
            .map((key) => this.yScaleConfig[key].yaxistag);
        this.yAxisConfig = generateYAxisConfig(filteredYconfig);
        // console.log(this.yAxisConfig)
        // console.log(this.uniqueYscaletags)
        // if (this.uniqueYscaletags.length === 2 || this.uniqueYscaletags.length === 3) {
        //   this.yAxisConfig = [
        //     { yaxistag: "YY1", ratio: 0.7, name: "y1" },
        //     { yaxistag: "YY2", ratio: 0.3, name: "y2" },
        //   ];
        // } else if (this.uniqueYscaletags.length ) {
        //   this.yAxisConfig = [{ yaxistag: "YY1", ratio: 1, name: "y1" }];
        // }
        // Update the chart
        this.setupYScales();
        this.renderAxes();
        this.renderChart();
        this.renderYAxisLines();
    }
    createButtonPanel(params) {
        const { className, x, y, width, height, color } = params;
        const buttonPanel = this.svg
            .append("g")
            .attr("class", className)
            .attr("transform", `translate(${x}, ${y})`);
        // Example styling for the button panel
        buttonPanel
            .append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", color);
        return buttonPanel;
    }
    setupEventHandlers() {
        const groupedButtonObjects = groupButtonsByPanel(this.buttonObjects);
        const panelNames = Object.keys(groupedButtonObjects);
        panelNames.forEach((panelName) => {
            // console.log(panelName);
            // const panelobject=this.buttonPanelParams[panelName]
            const filteredpanelobject = this.buttonPanelParams.filter((item) => item.className === panelName)[0];
            const groupbuttons = groupedButtonObjects[panelName];
            // console.log(filteredpanelobject);
            this.createButtonArray(filteredpanelobject, groupbuttons);
        });
    }
    renderAxes() {
        this.uniqueXscaletags = [
            ...new Set(Object.values(this.datatoplot)
                .filter((data) => data.plot)
                .map((data) => data.xscaletag)),
        ];
        // console.log(this.uniqueXscaletags);
        Object.keys(this.xScaleConfig).forEach((key) => {
            this.xScaleConfig[key].plotaxis = this.uniqueXscaletags.includes(key)
                ? true
                : false;
        });
        // console.log(this.xScaleConfig)
        this.svg.selectAll(`.axis`).remove();
        for (const xscaletag in this.xScaleConfig) {
            if (Object.hasOwnProperty.call(this.xScaleConfig, xscaletag)) {
                const item = this.xScaleConfig[xscaletag];
                if (item.hasOwnProperty("xScale")) {
                    const xScale = item.xScale;
                    //const xscaletag = item.xscaletag;
                    const ypoint = item.ypoint;
                    const plotaxis = item.plotaxis;
                    //console.log(xscaletag)
                    this.svg
                        .append("g")
                        .attr("class", `axis x-axis x-axis-${xscaletag}`)
                        .attr("transform", `translate(${0},${ypoint})`)
                        .call(this.xaxisgenerator(xScale, item))
                        .style("display", plotaxis ? "block" : "none");
                }
            }
        }
        const filteredYScaleConfig = Object.keys(this.yScaleConfig).filter((key) => this.uniqueYscaletags.includes(key));
        filteredYScaleConfig.forEach((yscaletag) => {
            // console.log(yscaletag)
            // console.log(this.yScaleConfig)
            const scaleitem = this.yScaleConfig[yscaletag];
            const yScale = scaleitem.yScale;
            const xpoint = scaleitem.xpoint;
            const yaxistag = scaleitem.yaxistag;
            const isYY3Present = this.yAxisConfig.some((item) => item.yaxistag === yaxistag);
            if (isYY3Present) {
                this.axisarea
                    .append("g")
                    .attr("class", `axis y-axis y-axis-${yscaletag}`)
                    .attr("transform", `translate(${xpoint},${0})`)
                    .call(this.yaxisgenerator(yScale, scaleitem, yscaletag));
            }
        });
    }
    updateAxes_x(currentTransformX) {
        // this.svg.selectAll(".x-axis").call(this.xaxisgenerator(newXScale));
        // this.svg.selectAll(".x-axis-tot").call(this.xaxisgenerator(newXScale));
        // console.log(currentTransformX, currentTransformX);
        for (const xscaletag in this.xScaleConfig) {
            if (Object.hasOwnProperty.call(this.xScaleConfig, xscaletag)) {
                const item = this.xScaleConfig[xscaletag];
                if (item.hasOwnProperty("xScale")) {
                    let currentxscale;
                    const xScale = item.xScale;
                    const ypoint = item.ypoint;
                    const plotaxis = item.plotaxis;
                    if (xScale.bandwidth) {
                        // console.log("scaleband", xScale.bandwidth());
                        currentxscale = xScale;
                    }
                    else {
                        currentxscale = currentTransformX.rescaleX(xScale);
                    }
                    //console.log(xscaletag,item)
                    this.svg
                        .selectAll(`.x-axis-${xscaletag}`)
                        .call(this.xaxisgenerator(currentxscale, item))
                        .style("display", plotaxis ? "block" : "none");
                }
            }
        }
    }
    updateAxes_y() {
        const filteredYScaleConfig = Object.keys(this.yScaleConfig).filter((key) => this.uniqueYscaletags.includes(key));
        filteredYScaleConfig.forEach((yscaletag) => {
            // console.log(yscaletag)
            // console.log(this.yScaleConfig)
            const scaleitem = this.yScaleConfig[yscaletag];
            const yscale = scaleitem.yScale;
            this.axisarea
                .select(`.y-axis-${yscaletag}`)
                .call(this.yaxisgenerator(yscale, scaleitem, yscaletag));
        });
    }
    renderChart() {
        this.svg.selectAll(`.allplot`).remove();
        for (const key in this.datatoplot) {
            if (Object.hasOwnProperty.call(this.datatoplot, key)) {
                const config = this.datatoplot[key];
                // Your logic here, using the 'data' object
                // console.log({...config,name:key});
                if (config.plot) {
                    this.drawdatatoPlot(Object.assign(Object.assign({}, config), { name: key }));
                }
            }
        }
        // this.datatoplot.forEach((config) => {
        //   if (config.plot) {
        //     // console.log(config.plot)
        //     this.drawdatatoPlot(config);
        //   }
        // });
        this.TrendLineData1.forEach((config) => {
            if (config.plot) {
                this.drawTrendLinePlot(config);
            }
        });
    }
    renderYAxisLines() {
        const yScaleKeys = Object.keys(this.yAxisRange);
        const { min: startP, max: endP, intermediate: intermediatePointP, } = findMinMaxAndIntermediate(this.yAxisRange);
        this.svg.selectAll(`.y-axis-division`).remove();
        for (let i = 0; i < yScaleKeys.length - 1; i++) {
            const startY = this.yAxisRange[yScaleKeys[i]][0];
            const endY = this.yAxisRange[yScaleKeys[i + 1]][1];
            const uniqueClass = `line-${i}`;
            const y = (startY + endY) / 2;
            const line = this.svg
                .append("line")
                .attr("x1", this.margin.left + this.margin.innerLeft)
                .attr("y1", y)
                .attr("x2", this.svgWidth - this.margin.right - this.margin.innerRight)
                .attr("y2", y)
                .attr("class", `y-axis-division`)
                .attr("stroke", "gray")
                .attr("stroke-width", 4)
                .attr("stroke-dasharray", "0")
                .classed(uniqueClass, true)
                .attr("id", `yaxisline_${i}`);
            const dragLine = line.call(d3
                .drag()
                .on("start", (event) => {
                // Store the initial y position of the line
            })
                .on("drag", (event) => {
                const draggedElement = event.sourceEvent.target;
                const idName = draggedElement.getAttribute("id");
                const newY = event.y;
                dragLine.attr("y1", newY).attr("y2", newY);
                const dragLineId = dragLine.attr("id");
                const yAxisLineIndex = parseInt(dragLineId.split("_")[1]);
                intermediatePointP[yAxisLineIndex] = newY;
                const ratiosss = calculateRatios(startP, endP, intermediatePointP);
                for (let ii = 0; ii < ratiosss.length; ii++) {
                    this.yAxisConfig[ii].ratio = ratiosss[ii];
                }
                this.setupYScales();
                this.renderAxes();
                this.renderChart();
            }));
        }
    }
    drawdatatoPlot(config) {
        // { name: "EMA", data: this.dataset.ema, xdata: "xdata1", linetype: "solid",
        //  color: "#FF5733", yscalenumber: 1, plot: false, fill: "none",
        // strokewidth: 2, strokedasharray: "5,5", yscaletag: 'TL', xscaletag: 'bot' },
        const { name, data: ylinedata, xdata: xlinedatatag, xdatamap, color, fill, yscaletag, strokewidth, strokedasharray, xscaletag, plottype, tagclass, } = config;
        // console.log("1", name, yscaletag, xscaletag)
        if (this.yScaleConfig[yscaletag] === undefined)
            return null;
        const currentTransformX = this.svg.select(".x-zoom").property("__zoom");
        if (!this.dataset.hasOwnProperty(xlinedatatag))
            return null;
        const filteredXScaleConfig = this.xScaleConfig[xscaletag];
        // console.log("2",name,yscaletag,xscaletag)
        let xData;
        if (xdatamap && filteredXScaleConfig.scaleType == "linear") {
            const tempxdata = this.dataset[xlinedatatag];
            const tmepxscaledata = this.dataset[filteredXScaleConfig.mappedwith];
            xData = getIndexesByValues(tmepxscaledata, tempxdata);
            // console.log(`pass through mapping: ${name}`)
        }
        else {
            xData = this.dataset[xlinedatatag];
        }
        let yData;
        yData = ylinedata();
        //const yScale = lineData.yscalenumber === 1 ? yScale1 : yScale2;
        // console.log(name, "filteredData", filteredData)
        const lineXscale = filteredXScaleConfig.xScale;
        let currentXscale;
        if (lineXscale.bandwidth) {
            currentXscale = lineXscale;
        }
        else {
            currentXscale = currentTransformX.rescaleX(lineXscale);
        }
        const currentYscale = this.yScaleConfig[yscaletag].yScale;
        const currentyaxis = this.yScaleConfig[yscaletag].yaxistag;
        if (plottype === "line") {
            this.drawLinePlot(config, currentXscale, currentYscale, xlinedatatag, ylinedata);
        }
        if (plottype === "scatter") {
            this.drawLineScatterPlot(config, currentXscale, currentYscale, xlinedatatag, ylinedata);
        }
        if (plottype === "bar") {
            this.drawBarPlot(config, currentXscale, currentYscale, xlinedatatag, ylinedata);
        }
        if (plottype === "ohlc") {
            // console.log("bar",xscaletag,yscaletag,currentyaxis)
            // console.log(filteredData)
            this.drawCDPlot(config, this.dataset, currentXscale, currentYscale, currentyaxis);
        }
    }
    drawTrendLinePlot(config) {
        const { name, color, fill, yscaletag, strokewidth, strokedasharray, xscaletag, plottype, tagclass, } = config;
        // console.log(name, yscaletag, xscaletag);
        if (this.yScaleConfig[yscaletag] === undefined)
            return null;
        const currentTransformX = this.svg.select(".x-zoom").property("__zoom");
        const lineXscale = this.xScaleConfig[xscaletag].xScale;
        const currentXscale = currentTransformX.rescaleX(lineXscale);
        const currentYscale = this.yScaleConfig[yscaletag].yScale;
        // const currentyaxis = getYAxisTag(this.yScaleConfig, yscaletag);
        // if (!this.dataset.hasOwnProperty(xlinedatatag)) return null;
        this.svg.selectAll(`.tr-plot-${name}`).remove();
        this.svg.selectAll(`.tr-${name}`).remove();
        this.trlineara
            .append("line")
            .attr("class", `allplot tr-${name} tr-plot-${name} ${tagclass}`)
            .attr("clip-path", `url(#clip1-${this.targetID})`)
            .attr("x1", currentXscale(config.x1))
            .attr("y1", currentYscale(config.y1))
            .attr("x2", currentXscale(config.x2))
            .attr("y2", currentYscale(config.y2))
            .style("stroke", "black")
            .style("stroke-width", 2);
        this.trlineara
            .append("circle")
            .attr("class", `allplot endpoint-circle1-${name} tr-${name} ${tagclass}`)
            .attr("clip-path", `url(#clip1-${this.targetID})`)
            .attr("cx", currentXscale(config.x1)) // Use the x-coordinate of the endpoint
            .attr("cy", currentYscale(config.y1)) // Use the y-coordinate of the endpoint
            .attr("r", 7) // Adjust the radius as needed
            .style("fill", "red")
            .attr("Line_Point", 1)
            .attr("Line_ID", (d, i) => `${name}`)
            // .call(this.dragBehavior)
            // .on("dblclick", this.dbClicktoDelete)
            //.on("click", this.clicktoselect.bind(this))
            .call(this.dragBehavior)
            .on("dblclick", this.dbClicktoDelete.bind(this));
        this.trlineara
            .append("circle")
            .attr("class", `allplot endpoint-circle2-${name} tr-${name} ${tagclass}`)
            .attr("clip-path", `url(#clip1-${this.targetID})`)
            .attr("cx", currentXscale(config.x2)) // Use the x-coordinate of the endpoint
            .attr("cy", currentYscale(config.y2)) // Use the y-coordinate of the endpoint
            .attr("r", 7) // Adjust the radius as needed
            .style("fill", "red")
            .attr("Line_Point", 2)
            .attr("Line_ID", (d, i) => `${name}`)
            // .call(this.dragBehavior)
            // .on("dblclick", this.dbClicktoDelete)
            //.on("click", this.clicktoselect.bind(this))
            .call(this.dragBehavior);
    }
    dbClicktoDelete(event) {
        console.log("targetElement", event);
        // const targetElement = event.target;
        // console.log("targetElement", targetElement);
        const targetElement = d3.select(event.target);
        const selectedLine_ID = targetElement.attr("Line_ID");
        console.log(selectedLine_ID);
        const asscociateindex = getIndexForName(selectedLine_ID, this.TrendLineData1);
        console.log(asscociateindex);
        this.TrendLineData1.splice(asscociateindex, 1);
        this.svg.selectAll(`.tr_`).remove();
        this.TrendLineData1.forEach((config) => {
            if (config.plot) {
                this.drawTrendLinePlot(config);
            }
        });
    }
    handleDrag(event) {
        // console.log("draging",event,this)
        const targetElement = d3.select(this.dragBehavior.activeElement);
        // console.log("targetElement", targetElement);
        // console.log("activeelemnt",this.dragBehavior.activeElement);
        var point_id = targetElement.attr("Line_Point");
        const selectedLine_ID = targetElement.attr("Line_ID");
        // console.log(point_id,selectedLine_ID);
        // const associateLineClass = `tr-${selectedLine_ID}`
        // const associatePoinrClass =`endpoint-circle${point_id}-${selectedLine_ID}`
        // console.log(associateLineClass,associatePoinrClass);
        const asscociateindex = getIndexForName(selectedLine_ID, this.TrendLineData1);
        // console.log("asscociateindex",asscociateindex);
        const [x, y] = d3.pointer(event);
        // console.log("mousehandleclick", x, y);
        const yaxistag = findKeyByNumber(this.yAxisRange, y);
        // console.log(yaxistag);
        const sectedscale0 = getXScaleTagsByDataTag(this.yScaleConfig, "yaxistag", yaxistag, "yscaletag");
        const sectedscale = sectedscale0.filter((element) => this.uniqueYscaletags.includes(element));
        // console.log(sectedscale);
        if (sectedscale.length == 0)
            return null;
        const presentKeys = sectedscale[0];
        // console.log(presentKeys)
        const xs = this.xScaleConfig["bot"].xScale;
        const ys = this.yScaleConfig[presentKeys].yScale;
        const currentTransformX = this.svg.select(".x-zoom").property("__zoom");
        const rxs = currentTransformX.rescaleX(xs);
        // console.log("currentTransformX",currentTransformX);
        // console.log(rxs.domain());
        const newx = rxs.invert(x);
        const newy = ys.invert(y);
        // console.log(newx, newy);
        if (point_id == 1) {
            if (newx !== null && newy !== null) {
                this.TrendLineData1[asscociateindex].x1 = newx;
                this.TrendLineData1[asscociateindex].y1 = newy;
            }
            else {
                // Handle the case where newx or newy is null
                // For example:
                console.error("newx or newy is null");
            }
        }
        if (point_id == 2) {
            if (newx !== null && newy !== null) {
                this.TrendLineData1[asscociateindex].x2 = newx;
                this.TrendLineData1[asscociateindex].y2 = newy;
            }
            else {
                // Handle the case where newx or newy is null
                // For example:
                console.error("newx or newy is null");
            }
        }
        this.TrendLineData1.forEach((config) => {
            if (config.plot) {
                this.drawTrendLinePlot(config);
            }
        });
    }
    handleDragEnd(event) {
        // console.log("drageend",event,this)
    }
    drawLineScatterPlot(config, currentXscale, currentYscale, xlinedatatag, ylinedata) {
        const { name, color, xscaletag, fill, strokewidth, strokedasharray, tagclass, xdatamap, } = config;
        let tempdata = [];
        // console.log("*****Start", name);
        let xaxisdata;
        let linedataxtag = this.dataset[xlinedatatag];
        // console.log(xscaletag);
        // const x_orgdata=this.dataset[xscaletag.mappedwith]
        let ylinedta = ylinedata();
        let lineXdata;
        let lineYdata;
        // console.log("x_orgdata",x_orgdata);
        // console.log(name, ylinedta);
        let checklinedata1 = identifyDataType1(ylinedta, name);
        // console.log(name, checklinedata1);
        // console.log(object);
        const xaxisdatatag = this.xScaleConfig[xscaletag].scaledatatag;
        const xaxisscaletype = this.xScaleConfig[xscaletag].scaleType;
        if (xaxisscaletype == "linear") {
            xaxisdata = this.dataset[xaxisdatatag].map((item, i) => i);
        }
        else {
            xaxisdata = this.dataset[xaxisdatatag];
        }
        // console.log(xaxisdata);
        // console.log(linedataxtag);
        if (xaxisdata.length == linedataxtag.length) {
            // console.log("Both data same length for xaxis with xdatamap=", xdatamap);
            // if (!xdatamap) {
            //   lineXdata = xaxisdata
            // } else {
            //   lineXdata = getIndexesByValues(this.dataset[xscaletag.mappedwith], xaxisdata);
            //   // console.log("xData1",xData1);
            // }
            lineXdata = xaxisdata;
        }
        else {
            // console.log("Both data not same length for xaxis with xdatamap=", xdatamap);
            // if (!xdatamap) {
            //   lineXdata = linedataxtag
            // } else {
            //   lineXdata = getIndexesByValues(this.dataset[this.xScaleConfig[xscaletag].mappedwith], linedataxtag);
            //   // console.log("xData1",xData1);
            // }
            lineXdata = linedataxtag;
        }
        if (checklinedata1.datatype == "type1") {
            tempdata.push({ x: lineXdata, y: ylinedta });
        }
        if (checklinedata1.datatype == "type2") {
            tempdata = ylinedta;
        }
        if (checklinedata1.datatype == "type3") {
            tempdata = [checklinedata1.data];
        }
        if (name == "MDLINES" || name == "EPS") {
            console.log(name, checklinedata1, ylinedta);
            console.log("tempdata", name, tempdata);
        }
        // console.log("tempdata", name, tempdata);
        // console.log("*****End", name);
        tempdata.forEach((data, index) => {
            // console.log("dataaaa", name, data);
            const totalline = Object.keys(data).length - 1;
            const yDomain = currentYscale.domain();
            const yMidpoint = (yDomain[1] + yDomain[0]) / 2;
            const maxDistanceFromMidpoint = 0.5 * (yDomain[1] - yDomain[0]); // Adjust as needed, this example limits the offset to half of the domain
            // Calculate the actual distance from the midpoint based on the maximum distance
            const actualDistanceFromMidpoint = Math.min(maxDistanceFromMidpoint, Math.abs(yDomain[1] - yMidpoint));
            // Calculate the offset amount to equally spread from the midpoint
            const offsetAmount = totalline === 1 ? 0 : actualDistanceFromMidpoint / (totalline - 1); // Subtract 1 because you don't want an offset for the first plot
            // Now you can use offsetAmount to offset the points on the y-axis
            // Calculate the offset for each plot
            // const yOffset = index * offsetAmount;
            Object.keys(data).forEach((key, index2) => {
                // console.log(key);
                if (key !== "x") {
                    const filteredData0 = data[key]
                        .map((d, i) => {
                        if (d !== null || d !== NaN) {
                            return {
                                x: data.x[i],
                                y: ((index2 - 1) * offsetAmount) / 2,
                                labelvalue: d,
                            };
                        }
                    })
                        .filter((d) => d !== undefined); // Remove undefined values (null filter)
                    let filteredData = {};
                    if (xdatamap) {
                        // console.log("dfgfbhfg",name,filteredData0);
                        // console.log(filteredData0.map(item=>item.x));
                        // console.log(this.dataset[this.xScaleConfig[xscaletag].mappedwith]);
                        const mappedx = getIndexesByValues(this.dataset[this.xScaleConfig[xscaletag].mappedwith], filteredData0.map((item) => item.x));
                        filteredData = filteredData0.map((item, index) => (Object.assign(Object.assign({}, item), { x: mappedx[index] })));
                    }
                    else {
                        filteredData = filteredData0;
                    }
                    // console.log("222", name, filteredData);
                    this.chartarea
                        .selectAll(`.scatter-dot-${name}${index}${key}`) // Select existing or new elements with class "scatter-dot"
                        .data(filteredData) // Bind data to the selection
                        .enter() // Create placeholders for data points that don't have corresponding elements
                        .append("circle") // Append a circle element for each data point
                        .attr("class", `allplot scatter-dot scatter-dot-${name}${index}${key} ${tagclass}`) // Assign classes for styling and identification
                        .attr("clip-path", `url(#clip1-${this.targetID})`) // Apply clipping if necessary
                        .attr("cx", (d) => currentXscale.bandwidth
                        ? currentXscale(d.x) + currentXscale.bandwidth() / 2
                        : currentXscale(d.x)) // Set x position based on data
                        .attr("cy", (d) => {
                        // console.log(d);
                        return currentYscale(d.y);
                    }) // Set y position based on data
                        .attr("r", 4) // Set radius of the circle
                        .attr("fill", (d) => d.labelvalue == 0
                        ? "red"
                        : d.labelvalue == null
                            ? "blue"
                            : "green") // Set fill color
                        //.attr("stroke", "red") // Set stroke color
                        // .attr("stroke-width", strokewidth) // Set stroke width
                        .attr("fill-opacity", 0.5) // Set fill opacity
                        .each(function (d) {
                        if (d.x === 0) {
                            Object.keys(d).forEach((property) => {
                                if (property !== "x") {
                                    const label = (checklinedata1.keyValueMap || {})[key];
                                    d3.select(this.parentNode)
                                        .append("text")
                                        .attr("class", `allplot label-${name}${index}${key}`)
                                        .attr("x", currentXscale(d.x))
                                        .attr("y", currentYscale(d.y))
                                        .attr("dx", -10)
                                        .attr("dy", -5)
                                        .text(label);
                                }
                            });
                        }
                    });
                    // const line = d3.line()
                    //   .x((d, i) => {
                    //     //console.log("name",name);
                    //     // if (name == "MDLINES") {
                    //     //   console.log(name,d.x,d.y,color);
                    //     //   // console.log("222",name,filteredData);
                    //     //   // console.log("doamin",currentXscale.domain());
                    //     //   // console.log("range",currentXscale.range());
                    //     //   // console.log("bandwidth",currentXscale.bandwidth());
                    //     //   // console.log(currentXscale(d.x));
                    //     // }
                    //     return currentXscale.bandwidth ? currentXscale(d.x) + currentXscale.bandwidth() / 2 : currentXscale(d.x)
                    //   })
                    //   .y((d, i) => {
                    //     if (name == "MDLINES") {
                    //       console.log(d.y,currentYscale.range(),currentYscale(d.y));
                    //     }
                    //     return currentYscale(d.y)
                    //   });
                    // this.chartarea
                    //   .append("path")
                    //   .datum(filteredData) // Map 'y' values to include corresponding 'x' values
                    //   .attr("class", `allplot line-plot-${name}${index}${key} ${tagclass}`)
                    //   .attr("clip-path", `url(#clip1-${this.targetID})`)
                    //   .attr("d", line)
                    //   .attr("stroke", typeof color === "object" ? color[key] : color)
                    //   .attr("fill", "none") // Since it's a line plot, fill should be none
                    //   .attr("stroke-width", strokewidth)
                    //   .attr("stroke-dasharray", strokedasharray)
                    //   .attr("fill-opacity", 0.5);
                }
            });
        });
    }
    drawLinePlot(config, currentXscale, currentYscale, xlinedatatag, ylinedata) {
        const { name, color, xscaletag, fill, strokewidth, strokedasharray, tagclass, xdatamap, } = config;
        let tempdata = [];
        // console.log("*****Start", name);
        let xaxisdata;
        let linedataxtag = this.dataset[xlinedatatag];
        // console.log(xscaletag);
        // const x_orgdata=this.dataset[xscaletag.mappedwith]
        let ylinedta = ylinedata();
        let lineXdata;
        let lineYdata;
        // console.log("x_orgdata",x_orgdata);
        // console.log(name,ylinedta);
        let checklinedata1 = identifyDataType1(ylinedta);
        // console.log(name,checklinedata1);
        // console.log(object);
        const xaxisdatatag = this.xScaleConfig[xscaletag].scaledatatag;
        const xaxisscaletype = this.xScaleConfig[xscaletag].scaleType;
        if (xaxisscaletype == "linear") {
            xaxisdata = this.dataset[xaxisdatatag].map((item, i) => i);
        }
        else {
            xaxisdata = this.dataset[xaxisdatatag];
        }
        // console.log(xaxisdata);
        // console.log(linedataxtag);
        if (xaxisdata.length == linedataxtag.length) {
            // console.log("Both data same length for xaxis with xdatamap=", xdatamap);
            // if (!xdatamap) {
            //   lineXdata = xaxisdata
            // } else {
            //   lineXdata = getIndexesByValues(this.dataset[xscaletag.mappedwith], xaxisdata);
            //   // console.log("xData1",xData1);
            // }
            lineXdata = xaxisdata;
        }
        else {
            // console.log("Both data not same length for xaxis with xdatamap=", xdatamap);
            // if (!xdatamap) {
            //   lineXdata = linedataxtag
            // } else {
            //   lineXdata = getIndexesByValues(this.dataset[this.xScaleConfig[xscaletag].mappedwith], linedataxtag);
            //   // console.log("xData1",xData1);
            // }
            lineXdata = linedataxtag;
        }
        if (checklinedata1.datatype == "type1") {
            tempdata.push({ x: lineXdata, y: ylinedta });
        }
        if (checklinedata1.datatype == "type2") {
            tempdata = ylinedta;
        }
        if (checklinedata1.datatype == "type3") {
            tempdata = [checklinedata1.data];
        }
        if (name == "MDLINES" || name == "EPS") {
            console.log(name, checklinedata1, ylinedta);
            console.log("tempdata", name, tempdata);
        }
        // console.log("tempdata",name,tempdata);
        // console.log("*****End", name);
        tempdata.forEach((data, index) => {
            // console.log("dataaaa", name, data);
            Object.keys(data).forEach((key) => {
                // console.log(key);
                if (key === "y" || key === "z") {
                    const filteredData0 = data[key]
                        .map((d, i) => {
                        if (d !== null) {
                            return { x: data.x[i], y: d };
                        }
                    })
                        .filter((d) => d !== undefined); // Remove undefined values (null filter)
                    let filteredData = {};
                    if (xdatamap) {
                        // console.log("dfgfbhfg",name,filteredData0);
                        // console.log(filteredData0.map(item=>item.x));
                        // console.log(this.dataset[this.xScaleConfig[xscaletag].mappedwith]);
                        const mappedx = getIndexesByValues(this.dataset[this.xScaleConfig[xscaletag].mappedwith], filteredData0.map((item) => item.x));
                        filteredData = filteredData0.map((item, index) => (Object.assign(Object.assign({}, item), { x: mappedx[index] })));
                    }
                    else {
                        filteredData = filteredData0;
                    }
                    // console.log("222",name,filteredData);
                    const line = d3
                        .line()
                        .x((d, i) => {
                        //console.log("name",name);
                        // if (name == "MDLINES") {
                        //   console.log(name,d.x,d.y,color);
                        //   // console.log("222",name,filteredData);
                        //   // console.log("doamin",currentXscale.domain());
                        //   // console.log("range",currentXscale.range());
                        //   // console.log("bandwidth",currentXscale.bandwidth());
                        //   // console.log(currentXscale(d.x));
                        // }
                        return currentXscale.bandwidth
                            ? currentXscale(d.x) + currentXscale.bandwidth() / 2
                            : currentXscale(d.x);
                    })
                        .y((d, i) => {
                        if (name == "MDLINES") {
                            console.log(d.y, currentYscale.range(), currentYscale(d.y));
                        }
                        return currentYscale(d.y);
                    });
                    this.chartarea
                        .append("path")
                        .datum(filteredData) // Map 'y' values to include corresponding 'x' values
                        .attr("class", `allplot line-plot-${name}${index}${key} ${tagclass}`)
                        .attr("clip-path", `url(#clip1-${this.targetID})`)
                        .attr("d", line)
                        .attr("stroke", typeof color === "object" ? color[key] : color)
                        .attr("fill", "none") // Since it's a line plot, fill should be none
                        .attr("stroke-width", strokewidth)
                        .attr("stroke-dasharray", strokedasharray)
                        .attr("fill-opacity", 0.5);
                    if ("label" in data) {
                        const avgX = data.x.reduce((sum, point) => sum + point, 0) / data.x.length;
                        const avgY = data.y.reduce((sum, point) => sum + point, 0) / data.y.length;
                        this.chartarea
                            .append("text")
                            .attr("class", `allplot text-${name}${index} line-plot-${name}${index}${key} ${tagclass} ${tagclass}`)
                            .attr("clip-path", `url(#clip1-${this.targetID})`)
                            .attr("x", currentXscale(avgX))
                            .attr("y", currentYscale(avgY))
                            .attr("dy", -5) // Adjust the vertical position if needed
                            .text(`${data.label}`);
                    }
                }
            });
        });
    }
    // Example usage:
    // drawLinePlot(config, filteredData, currentXscale, currentYscale);
    drawBarPlot(config, currentXscale, currentYscale, xlinedatatag, ylinedata) {
        const { name, color, xscaletag, fill, strokewidth, strokedasharray, tagclass, yscaletag, xdatamap, } = config;
        let tempdata = [];
        // console.log("*****Start", name);
        let xaxisdata;
        let linedataxtag = this.dataset[xlinedatatag];
        // console.log(xscaletag);
        // const x_orgdata=this.dataset[xscaletag.mappedwith]
        let ylinedta = ylinedata();
        let lineXdata;
        let lineYdata;
        // console.log("x_orgdata",x_orgdata);
        // console.log(name,ylinedta);
        let checklinedata1 = identifyDataType1(ylinedta);
        // console.log(name,checklinedata1);
        // console.log(object);
        const xaxisdatatag = this.xScaleConfig[xscaletag].scaledatatag;
        const xaxisscaletype = this.xScaleConfig[xscaletag].scaleType;
        if (xaxisscaletype == "linear") {
            xaxisdata = this.dataset[xaxisdatatag].map((item, i) => i);
        }
        else {
            xaxisdata = this.dataset[xaxisdatatag];
        }
        // console.log(xaxisdata);
        // console.log(linedataxtag);
        if (xaxisdata.length == linedataxtag.length) {
            // console.log("Both data same length for xaxis with xdatamap=", xdatamap);
            // if (!xdatamap) {
            //   lineXdata = xaxisdata
            // } else {
            //   lineXdata = getIndexesByValues(this.dataset[xscaletag.mappedwith], xaxisdata);
            //   // console.log("xData1",xData1);
            // }
            lineXdata = xaxisdata;
        }
        else {
            // console.log("Both data not same length for xaxis with xdatamap=", xdatamap);
            // if (!xdatamap) {
            //   lineXdata = linedataxtag
            // } else {
            //   lineXdata = getIndexesByValues(this.dataset[this.xScaleConfig[xscaletag].mappedwith], linedataxtag);
            //   // console.log("xData1",xData1);
            // }
            lineXdata = linedataxtag;
        }
        if (checklinedata1.datatype == "type1") {
            tempdata.push({ x: lineXdata, y: ylinedta });
        }
        if (checklinedata1.datatype == "type2") {
            tempdata = ylinedta;
        }
        if (checklinedata1.datatype == "type3") {
            tempdata = [checklinedata1.data];
        }
        // console.log(yscaletag);
        // console.log(this.yScaleConfig[yscaletag]);
        // console.log(this.yScaleConfig[yscaletag].yaxistag);
        const currentyaxis = this.yScaleConfig[yscaletag].yaxistag;
        // console.log("tempdata", yscaletag, currentyaxis, name, tempdata);
        // console.log("*****End", name);
        // // Calculate the width of each bar
        // console.log(currentyaxis,currentXscale(1),currentXscale(0))
        const tickwidth = currentXscale.bandwidth
            ? currentXscale.bandwidth()
            : currentXscale(1) - currentXscale(0);
        const barWidth = 3; //calculate based on your data and chart configuration */;
        // const chartHeight=this.yAxisRange[currentyaxis][0]-this.yAxisRange[currentyaxis][1]
        // console.log("barr");
        // console.log(this.yAxisRange)
        // console.log(this.yScaleConfig)
        // console.log(chartHeight)
        // console.log(currentYscale.domain())
        // console.log(currentYscale.range())
        tempdata.forEach((data, index) => {
            // console.log(name, data, index);
            // const category = d.category;
            // const values = d.values;
            const numberdata = Object.keys(data).length - 1;
            Object.keys(data).forEach((key, index1) => {
                // console.log(key);
                if (key !== "x") {
                    // console.log(key, data[key]);
                    // const filteredData = data[key].map((d, i) => {
                    //   if (d !== null) {
                    //     return { x: data.x[i], y: d };
                    //   }
                    // }).filter(d => d !== undefined);
                    const filteredData = { x: data.x, y: data[key] };
                    const barwidthh = tickwidth / 5;
                    const totalbarwidth = barwidthh * numberdata;
                    if (currentXscale.bandwidth) {
                        // console.log(filteredData,index1);
                        const groupX = (tickwidth - totalbarwidth) / 2;
                        this.chartarea
                            .selectAll(`.${tagclass}${key}`)
                            .data(filteredData.y)
                            .enter()
                            .append("rect")
                            .attr("class", `allplot bar bar-plot-${name}${index}${key} ${tagclass}${key} ${tagclass}`)
                            .attr("clip-path", `url(#clip1-${this.targetID})`)
                            .attr("x", (d, i) => currentXscale(filteredData.x[i]) +
                            groupX +
                            (index1 - 1) * barwidthh)
                            .attr("y", (d, i) => {
                            //  console.log(key,i,d);
                            return currentYscale(d);
                        })
                            .attr("width", barwidthh)
                            .attr("height", (d) => {
                            // console.log(d,currentYscale(d),this.yAxisRange[currentyaxis][0]-currentYscale(d))
                            return this.yAxisRange[currentyaxis][0] - currentYscale(d);
                        })
                            .attr("fill", (d, i) => {
                            // console.log(color);
                            //if (tagclass !== "volume_") return "blue";
                            return typeof color === "object" ? color[key] : color;
                        })
                            .attr("stroke-width", strokewidth)
                            .attr("stroke-dasharray", strokedasharray)
                            .attr("fill-opacity", 0.5)
                            .attr("stroke", "black")
                            .attr("stroke-width", 0.1);
                        this.chartarea
                            .selectAll(`.${tagclass}${key}-text`)
                            .data(filteredData.y)
                            .enter()
                            .append("text")
                            .attr("class", `allplot bar-text`)
                            .attr("x", (d, i) => currentXscale(filteredData.x[i]) +
                            groupX +
                            (index1 - 1) * barwidthh +
                            barwidthh / 2)
                            .attr("y", (d) => currentYscale(d) + 4) // Adjust the value (5) for vertical position
                            .attr("text-anchor", "middle")
                            .style("font-size", "10px")
                            .text((d) => d);
                    }
                    else {
                        this.chartarea
                            .selectAll(`.${tagclass}`)
                            .data(filteredData.y)
                            .enter()
                            .append("rect")
                            .attr("class", `allplot bar bar-plot-${name} ${tagclass}`)
                            .attr("clip-path", `url(#clip1-${this.targetID})`)
                            .attr("x", (d, i) => currentXscale(filteredData.x[i]) - tickwidth / 4)
                            .attr("y", (d) => currentYscale(d))
                            .attr("width", tickwidth / 2)
                            .attr("height", (d) => {
                            // console.log(d,currentYscale(d),this.yAxisRange[currentyaxis][0]-currentYscale(d))
                            return this.yAxisRange[currentyaxis][0] - currentYscale(d);
                        })
                            .attr("fill", (d, i) => {
                            // console.log(this,d,i);
                            if (tagclass !== "volume_")
                                return "blue";
                            return this.dataset.close[i] > this.dataset.open[i]
                                ? "green"
                                : "red";
                        })
                            .attr("stroke-width", strokewidth)
                            .attr("stroke-dasharray", strokedasharray)
                            .attr("fill-opacity", 0.5)
                            .attr("stroke", "black")
                            .attr("stroke-width", 0.1);
                    }
                }
            });
        });
        // // Append bars for the bar plot
        // if (currentXscale.bandwidth){
        // this.chartarea
        //   .selectAll(`.${tagclass}`)
        //   .data(filteredData.y)
        //   .enter()
        //   .append("rect")
        //   .attr("class", `allplot bar bar-plot-${name} ${tagclass}`)
        //   .attr("clip-path", `url(#clip1-${this.targetID})`)
        //   .attr("x", (d, i) => currentXscale(filteredData.x[i])+ tickwidth / 4)
        //   .attr("y", (d) => currentYscale(d))
        //   .attr("width", tickwidth / 2)
        //   .attr("height", (d) => {
        //     // console.log(d,currentYscale(d),this.yAxisRange[currentyaxis][0]-currentYscale(d))
        //     return this.yAxisRange[currentyaxis][0] - currentYscale(d);
        //   })
        //   .attr("fill", (d, i) => {
        //     // console.log(this,d,i);
        //     if (tagclass !== "volume_") return "blue";
        //     return this.dataset.close[i] > this.dataset.open[i] ? "green" : "red";
        //   })
        //   .attr("stroke-width", strokewidth)
        //   .attr("stroke-dasharray", strokedasharray)
        //   .attr("fill-opacity", 0.5)
        //   .attr("stroke", "black")
        //   .attr("stroke-width", 0.1);
        // }
        // else {
        //   this.chartarea
        //   .selectAll(`.${tagclass}`)
        //   .data(filteredData.y)
        //   .enter()
        //   .append("rect")
        //   .attr("class", `allplot bar bar-plot-${name} ${tagclass}`)
        //   .attr("clip-path", `url(#clip1-${this.targetID})`)
        //   .attr("x", (d, i) => currentXscale(filteredData.x[i]) - tickwidth / 4)
        //   .attr("y", (d) => currentYscale(d))
        //   .attr("width", tickwidth / 2)
        //   .attr("height", (d) => {
        //     // console.log(d,currentYscale(d),this.yAxisRange[currentyaxis][0]-currentYscale(d))
        //     return this.yAxisRange[currentyaxis][0] - currentYscale(d);
        //   })
        //   .attr("fill", (d, i) => {
        //     // console.log(this,d,i);
        //     if (tagclass !== "volume_") return "blue";
        //     return this.dataset.close[i] > this.dataset.open[i] ? "green" : "red";
        //   })
        //   .attr("stroke-width", strokewidth)
        //   .attr("stroke-dasharray", strokedasharray)
        //   .attr("fill-opacity", 0.5)
        //   .attr("stroke", "black")
        //   .attr("stroke-width", 0.1);
        // }
    }
    drawCDPlot(config, filteredData, currentXscale, currentYscale, currentyaxis) {
        const { name, color, fill, strokewidth, strokedasharray, tagclass } = config;
        // console.log(filteredData);
        // // Calculate the width of each bar
        const tickwidth = currentXscale(1) - currentXscale(0);
        const cdxdata = filteredData.xdata;
        const wick = this.chartarea.selectAll(".wickline").data(cdxdata);
        const candlesticks = this.chartarea.selectAll(".candlestick").data(cdxdata);
        wick
            .enter()
            .append("line")
            .attr("class", `allplot  wickline ${tagclass}`)
            .attr("clip-path", `url(#clip1-${this.targetID})`)
            .merge(wick)
            .attr("x1", (d, i) => currentXscale(i))
            .attr("y1", (d, i) => currentYscale(filteredData.high[i]))
            .attr("x2", (d, i) => currentXscale(i))
            .attr("y2", (d, i) => currentYscale(filteredData.low[i]))
            .attr("stroke", "black")
            .attr("stroke-width", 1);
        // .style("display", this.currenCDtDisplay === true ? "block" : "none");
        // drawCDPlot
        wick.exit().remove();
        candlesticks
            .enter()
            .append("rect")
            .attr("class", `allplot cd-plot-${name} ${tagclass}`)
            .attr("clip-path", `url(#clip1-${this.targetID})`)
            .merge(candlesticks)
            .attr("x", (d, i) => currentXscale(filteredData.xdata[i]) - tickwidth / 4)
            .attr("y", (d, i) => {
            // console.log(d,i,filteredData.close[i]);
            return currentYscale(Math.max(filteredData.open[i], filteredData.close[i]));
        })
            .attr("width", tickwidth / 2)
            .attr("height", (d, i) => {
            // console.log(d,currentYscale(d),this.yAxisRange[currentyaxis][0]-currentYscale(d))
            return Math.abs(currentYscale(filteredData.open[i]) -
                currentYscale(filteredData.close[i])) == 0
                ? currentYscale(filteredData.close[i]) * 0.001
                : Math.abs(currentYscale(filteredData.open[i]) -
                    currentYscale(filteredData.close[i]));
        })
            .attr("fill", (d, i) => filteredData.open[i] > filteredData.close[i] ? "red" : "green")
            .attr("stroke", "black")
            .attr("stroke-width", 1);
        candlesticks.exit().remove();
        // const circleData = [
        //   { index: 1, buyorsell: "trigger" },
        //   { index: 2, buyorsell: "buy" },
        //   { index: 5, buyorsell: "sell" },
        // ];
        // console.log(filteredData);
        const circleData = filteredData.backtestresult;
        const btcircles = this.chartarea.selectAll(".btcircle").data(circleData);
        // console.log("circleData",circleData,);
        btcircles.enter()
            .append("path")
            .attr("class", "allplot btcircle")
            .attr("clip-path", `url(#clip1-${this.targetID})`)
            .attr("d", (d) => {
            const x = currentXscale(d.index);
            let y;
            const candleIndex = d.index;
            const offset = 0.01;
            const size = d.size || 8; // Default size is 8 if not provided
            if (d.buyorsell === 'trigger') {
                return `M${x - size},${currentYscale(filteredData.low[candleIndex] - filteredData.low[candleIndex] * offset) - size} h${size * 2} v${size * 2} h-${size * 2} Z`;
            }
            else if (d.buyorsell === 'buy') {
                y = currentYscale(filteredData.low[candleIndex] - filteredData.low[candleIndex] * offset);
                return `M${x},${y - size} l${size},${size * 2} l${-size * 2},0 Z`;
            }
            else if (d.buyorsell === 'sell') {
                y = currentYscale(filteredData.high[candleIndex] + filteredData.high[candleIndex] * offset);
                return `M${x},${y + size} l${size},${-size * 2} l${-size * 2},0 Z`;
            }
            else if (d.buyorsell === 'PatternBaseIndex') {
                return `M${x - size},${currentYscale(filteredData.low[candleIndex] - filteredData.low[candleIndex] * offset) - size} h${size * 2} v${size * 2} h-${size * 2} Z`;
            }
            else if (d.buyorsell === 'cancel_trigger') {
                return `M${x - size},${currentYscale(filteredData.low[candleIndex] - filteredData.low[candleIndex] * offset) - size} h${size * 2} v${size * 2} h-${size * 2} Z`;
            }
            else if (d.buyorsell === 'cancel_PatternBaseIndex') {
                return `M${x - size},${currentYscale(filteredData.low[candleIndex] - filteredData.low[candleIndex] * offset) - size} h${size * 2} v${size * 2} h-${size * 2} Z`;
            }
        })
            .attr("fill", (d) => {
            if (d.buyorsell === 'trigger') {
                return "blue"; // No fill for squares
            }
            else if (d.buyorsell === 'buy') {
                return "cyan";
            }
            else if (d.buyorsell === 'sell') {
                return d.pnl > 0 ? "green" : "red";
            }
            else if (d.buyorsell === 'PatternBaseIndex') {
                return "yellow";
            }
            else if (d.buyorsell === 'cancel_trigger' && d.Comment == "NO DATA 15m FOUND FOR THIS TRIGGERINDEX") {
                return "black";
            }
            else if (d.buyorsell === 'cancel_PatternBaseIndex' && d.Comment == "NO DATA 15m FOUND FOR THIS TRIGGERINDEX") {
                return "black";
            }
            else if (d.buyorsell === 'cancel_trigger' && d.Comment != "NO DATA 15m FOUND FOR THIS TRIGGERINDEX") {
                return "brown";
            }
            else if (d.buyorsell === 'cancel_PatternBaseIndex' && d.Comment != "NO DATA 15m FOUND FOR THIS TRIGGERINDEX") {
                return "brown";
            }
        })
            .attr("stroke", "black")
            .attr("stroke-width", 1);
        btcircles.exit().remove();
    }
    updateDataDomain(yscaletag, newDomain) {
        // Find the object with the matching yscaletag
        const scaleConfigToUpdate = this.yScaleConfig.find((config) => config.yscaletag === yscaletag);
        // If the object is found, update its datadomain
        if (scaleConfigToUpdate) {
            scaleConfigToUpdate.datadomain = newDomain;
        }
        else {
            console.error(`No scale configuration found for yscaletag: ${yscaletag}`);
        }
    }
    updateChart(newDataObject, isstocklive) {
        const currentTransformX = this.svg.select(".x-zoom").property("__zoom");
        const currentTransformY = this.svg.select(".y-zoom").property("__zoom");
        // if (isstocklive) {
        this.svg.select(".live").attr("fill", isstocklive ? "#a5d6a7" : "#e57373");
        // } else {
        //   this.svg.select(".live").attr("fill", "red");
        // }
        this.dataset = arrangeData(newDataObject);
        //console.log(this.dataset);
        // const newData = newDataObject.histdata;
        //this.setupYScales();
        // Update x-axis scale domain
        // const xScaleMain = this.xScales[this.xscaleMaintag];
        // xScaleMain.domain([0, newData.length]);
        // Update axes
        //this.setupXScale()
        this.setupScales();
        this.updateAxes_x(currentTransformX);
        this.updateAxes_y();
        // Redraw chart elements and axes
        this.renderChart();
        this.renderAxes();
        if (currentTransformX) {
            this.svg.select(".x-zoom").call(this.zoomX.transform, currentTransformX);
        }
        // if (currentTransformY) {
        //   this.svg.select(".y-zoom").call(this.zoomY.transform, currentTransformY);
        // }
    }
    // Inside the CandlestickChart class
    createSVGButton(buttonObject) {
        // Extract properties from the button object
        const { x, y, width, height, imageUrl, label, onClickHandler, color, opacity, panelName, pressstatus, classtag, } = buttonObject;
        let parentGroup;
        if (panelName) {
            parentGroup = d3.select(`.${panelName}`);
        }
        else {
            // Default to the main SVG group if className is not recognized
            parentGroup = this.svg;
        }
        // console.log(panelName);
        // console.log(parentGroup);
        // Create the button group
        const buttonGroup = parentGroup
            .append("g")
            .attr("class", `svg-button `)
            .attr("transform", `translate(${x},${y})`);
        // Create the button rectangle
        buttonGroup
            .append("rect")
            .attr("class", `${classtag}`)
            .attr("width", width)
            .attr("height", height)
            .attr("fill", color)
            .attr("opacity", opacity)
            // .attr("fill", "blue") // Customize the button appearance as needed
            .on("click", onClickHandler); // Attach the click event handler
        if (imageUrl == null) {
            // Create the button label
            buttonGroup
                .append("text")
                .attr("x", width / 2)
                .attr("y", height / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .attr("fill", "white") // Customize the text color as needed
                .text(label)
                .style("pointer-events", "none");
        }
        else {
            // Create the image element
            buttonGroup
                .append("image")
                .attr("xlink:href", imageUrl) // Set the image URL
                .attr("width", width)
                .attr("height", height)
                .attr("opacity", opacity) // Set the opacity
                .on("click", onClickHandler);
        }
    }
    createSVGButtonsingle(x, y, width, height, text, color, onClickHandler) {
        // Create a group element to contain the button elements
        const buttonGroup = this.svg
            .append("g")
            .attr("class", "svg-button")
            .attr("transform", `translate(${x},${y})`);
        // Create the button rectangle
        buttonGroup
            .append("rect")
            .attr("width", width)
            .attr("height", height)
            // .attr("fill", "lightblue")
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("fill", color)
            .on("click", onClickHandler);
        // Create the button text
        buttonGroup
            .append("text")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .text(text)
            .style("pointer-events", "none"); // Ensure text doesn't intercept click events
    }
}
export default CandlestickChart;
//const btcircles = this.chartarea.selectAll(".btcircle").data(circleData);
// btcircles.enter()
//     .append("circle")
//     .attr("class", "allplot btcircle")
//     .attr("clip-path", `url(#clip1-${this.targetID})`)
//     .attr("cx", (d) => currentXscale(d.index))
//     .attr("cy", (d) => {
//      // console.log(d)
//         const candleIndex = d.index;
//         // const candle = filteredData[candleIndex];
//         // console.log("candle",candleIndex,filteredData)
//         //const isHigh = candle.high === filteredData.high[candleIndex];
//         if (d.buyorsell=='trigger'){
//           return currentYscale(filteredData.low[candleIndex])
//         }
//         if (d.buyorsell=='buy'){
//           return currentYscale(filteredData.low[candleIndex])
//         }
//         if (d.buyorsell=='sell'){
//           return currentYscale(filteredData.high[candleIndex])
//         }
//         })
//     .attr("r", 4)
//     .attr("fill", (d) => {
//       if (d.buyorsell=='trigger'){
//         return "blue"
//       }
//       if (d.buyorsell=='buy'){
//         return "green"
//       }
//       if (d.buyorsell=='sell'){
//         return "red"
//       }
//     }
//   )
//     .attr("stroke", "black")
//     .attr("stroke-width", 1);
// btcircles.exit().remove();
