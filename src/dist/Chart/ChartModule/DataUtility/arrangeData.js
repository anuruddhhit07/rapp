import TechGroup from "../../TechModule";
const techGroup = TechGroup.getInstance();
export function arrangeData(stockData, funda = 0) {
    console.log(stockData);
    const ohlcDataArray = stockData.histdata || [];
    const techDataobject = stockData.techdata || {};
    const fundaDataobject = stockData.fundadata || {};
    const zigzagdata = techDataobject.zigzagdatasub || {};
    const indicatordata = techDataobject.indicatordata || {};
    const backtestdata = techDataobject.btresult || {};
    const profitLossData = fundaDataobject.profitLossData || {};
    const quartersData = fundaDataobject.quartersData || {};
    const shareholdingData = fundaDataobject.shareholdingData || {};
    const Operating_Profit1 = profitLossData["Operating Profit"] || {};
    const EPS1 = quartersData["EPS in Rs"] || {};
    const fundatakeys = Object.keys(shareholdingData);
    const fundaMappedX1 = ["2018", "2019", "2020", "2021", "2022", "2023"];
    const ADX = techGroup.calculateADX(14);
    // console.log(zigzagdata);
    // const brlinedata:=zigzagdata.brlist.map(({broutfor,rejectat,broutat,highatref,highatrejec,breakoutperiod})=>({
    //     x:[broutfor,rejectat,broutat],
    //     y:[highatref,highatrejec,highatrejec],
    //     label:breakoutperiod.toString()
    // }))
    // console.log(brlinedata);
    // console.log(zigzagdata.brlist);
    return {
        xindex: ohlcDataArray.map((item, index) => index),
        timestamp: ohlcDataArray.map(item => item.timestamp),
        open: ohlcDataArray.map(item => item.open),
        high: ohlcDataArray.map(item => item.high),
        low: ohlcDataArray.map(item => item.low),
        close: ohlcDataArray.map(item => item.close),
        volume: ohlcDataArray.map(item => item.volume),
        fundaMappedX1: fundaMappedX1,
        fundaX1: fundaMappedX1.map((item, index) => index),
        fundaY2: [10, 41, 21, 5, 41, 15],
        fundaMultibarY: { a1: [200, 41, 21, 5, 41, 15], b1: [100, 41, 21, 5, 41, 1] },
        ema: techGroup.calculateEMA('close', 25),
        rsi: techGroup.calculateRSI('close', 14),
        adx: ADX.adx,
        dmp: ADX.dmp,
        dmn: ADX.dmn,
        zigzagX: zigzagdata.sublist.map(({ orgindex }) => orgindex),
        zigzagY: zigzagdata.sublist.map(({ value }) => value),
        brlinedata: zigzagdata.brlist.map(({ broutfor, rejectat, broutat, highatref, highatrejec, breakoutperiod }) => ({
            x: [broutfor, rejectat, broutat],
            y: [highatref, highatrejec, highatrejec],
            label: breakoutperiod.toString()
        })),
        backtestresultline: backtestdata.backtestLine ? backtestdata.backtestLine : []
    };
}
