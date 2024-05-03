import { ChartDataIN, ChartDataObj } from "../types/chartdataTypes";

export function arrangeData(stockData: ChartDataIN, funda: number = 0): ChartDataObj {
    const ohlcDataArray = stockData.histdata || [];
    const techDataobject = stockData.techdata || {};
    const fundaDataobject = stockData.fundadata || {};
  
    const zigzagdata = techDataobject.zigzagdata || {};
    const indicatordata = techDataobject.indicatordata || {};
    const backtestdata = techDataobject.btresult || {};
  
    const profitLossData = fundaDataobject.profitLossData || {};
    const quartersData = fundaDataobject.quartersData || {};
    const shareholdingData = fundaDataobject.shareholdingData || {};
  
    const Operating_Profit1 = profitLossData["Operating Profit"] || {};
    const EPS1 = quartersData["EPS in Rs"] || {};
  
    const fundatakeys = Object.keys(shareholdingData);

    return {
        xindex:ohlcDataArray.map((item,index)=>index),
        timestamp:ohlcDataArray.map(item=>item.timestamp),
        open:ohlcDataArray.map(item=>item.open),
        high:ohlcDataArray.map(item=>item.high),
        low :ohlcDataArray.map(item=>item.low),
        close:ohlcDataArray.map(item=>item.close),
        volume:ohlcDataArray.map(item=>item.volume)
    }
}