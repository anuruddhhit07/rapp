import { ChartDataIN,ChartDataType } from "../types";
import TechGroup from "../../TechModule";

const techGroup= TechGroup.getInstance();

export function arrangeData(this: any, stockData: ChartDataIN, funda: number = 0): ChartDataType {
    
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
    const fundaMappedX1=["2018","2019","2020","2021","2022","2023"]

    techGroup.attachOHLCV(ohlcDataArray);

    return {
        xindex:ohlcDataArray.map((item,index)=>index),
        timestamp:ohlcDataArray.map(item=>item.timestamp),
        open:ohlcDataArray.map(item=>item.open),
        high:ohlcDataArray.map(item=>item.high),
        low :ohlcDataArray.map(item=>item.low),
        close:ohlcDataArray.map(item=>item.close),
        volume:ohlcDataArray.map(item=>item.volume),
        fundaMappedX1:fundaMappedX1,
        fundaX1:fundaMappedX1.map((item: any,index: number)=>index),
        fundaY2:[10,41,21,5,41,15],
        fundaMultibarY:{a1:[200,41,21,5,41,15],b1:[100,41,21,5,41,1]},
        sma:techGroup.calculateSMA('close',10)
    }
}