import { Shared_ChartBaseData, Shared_ChartPlotData, Shared_PlotInfo, Shared_XScaleConfig, Shared_YScaleConfig, Shared_yaxisProp, groupDataByPlotType, } from "../BaseSetup/SharedDataUtility";
import { DrawMultilineonSVG, drawBacktestPlotOnSVG, drawBarChartOnSVG, drawCandlestickOnSVG, drawLineOnSVG, drawMultiBarChartOnSVG, drawScatterPlotOnSVG } from "./SVGUtility";
function filterData(xdata, ydata, lowerLimit, upperLimit) {
    const filteredXData = [];
    const filteredYData = [];
    for (let i = 0; i < xdata.length; i++) {
        if (xdata[i] >= lowerLimit && xdata[i] <= upperLimit) {
            filteredXData.push(xdata[i]);
            filteredYData.push(ydata[i]);
        }
    }
    return { xdata: filteredXData, ydata: filteredYData };
}
export function plotonsvg(plotAreaonSVG, xzoomeventsvg, yzoomeventsvg) {
    //console.log("Plot On SVG");
    // console.log(Shared_ChartBaseData);
    const plotTag = Array.from(Shared_ChartBaseData.plotName);
    const groupedplotData = groupDataByPlotType();
    plotAreaonSVG.selectAll(`.lineplot`).remove();
    plotAreaonSVG.selectAll(`.barplot`).remove();
    plotAreaonSVG.selectAll(`.ohlcplot`).remove();
    plotAreaonSVG.selectAll(`.scatterplot`).remove();
    plotAreaonSVG.selectAll(`.mulitbarplot`).remove();
    plotAreaonSVG.selectAll(`.multilineplot`).remove();
    plotAreaonSVG.selectAll(`.backtestplot`).remove();
    for (let plotType in groupedplotData) {
        if (Object.prototype.hasOwnProperty.call(groupedplotData, plotType)) {
            //console.log(plotType);
            if (plotType == "line") {
                groupedplotData[plotType].forEach((PlotName) => {
                    // console.log(PlotName);
                    if (plotTag.includes(PlotName)) {
                        // console.log(PlotName);
                        drawPlotLineByName(PlotName, plotAreaonSVG, xzoomeventsvg);
                    }
                });
            }
            if (plotType == "multiline") {
                groupedplotData[plotType].forEach((PlotName) => {
                    // console.log(PlotName);
                    if (plotTag.includes(PlotName)) {
                        // console.log(PlotName);
                        drawPlotMultiLineByName(PlotName, plotAreaonSVG, xzoomeventsvg);
                    }
                });
            }
            if (plotType == "bar") {
                groupedplotData[plotType].forEach((PlotName) => {
                    // console.log(PlotName);
                    if (plotTag.includes(PlotName)) {
                        // console.log(PlotName);
                        drawPlotBarByName(PlotName, plotAreaonSVG, xzoomeventsvg);
                    }
                });
            }
            if (plotType == "mulitbar") {
                groupedplotData[plotType].forEach((PlotName) => {
                    // console.log(PlotName);
                    if (plotTag.includes(PlotName)) {
                        // console.log(PlotName);
                        drawPlotMulitBarByName(PlotName, plotAreaonSVG, xzoomeventsvg);
                    }
                });
            }
            if (plotType == "ohlc") {
                groupedplotData[plotType].forEach((PlotName) => {
                    // console.log(PlotName);
                    if (plotTag.includes(PlotName)) {
                        // console.log(PlotName);
                        drawPlotOHLCByName(PlotName, plotAreaonSVG, xzoomeventsvg);
                    }
                });
            }
            if (plotType == "backtest") {
                groupedplotData[plotType].forEach((PlotName) => {
                    // console.log(PlotName);
                    if (plotTag.includes(PlotName)) {
                        // console.log(PlotName);
                        drawPlotBackTestByName(PlotName, plotAreaonSVG, xzoomeventsvg);
                    }
                });
            }
            if (plotType == "scatter") {
                groupedplotData[plotType].forEach((PlotName) => {
                    // console.log(PlotName);
                    if (plotTag.includes(PlotName)) {
                        // console.log(PlotName);
                        drawPlotScatteryName(PlotName, plotAreaonSVG, xzoomeventsvg);
                    }
                });
            }
        }
    }
}
function drawPlotBackTestByName(plotName, PlotGroupArea, xzoomeventsvg) {
    // const visiblerange=Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].xscaleVisibleRange
    // // console.log(visiblerange);
    // //console.log(visiblerange)
    // // console.log(Shared_PlotInfo); 
    // let XDATA:number[]=[]
    // let open:number[]=[]
    // let high:number[]=[]
    // let low:number[]=[]
    // let close:number[]=[]
    // if (visiblerange[1]==0){
    //     XDATA = Shared_PlotInfo[plotName].xdata()
    //     open = Shared_ChartPlotData.open;
    //     high = Shared_ChartPlotData.high;
    //     low = Shared_ChartPlotData.low;
    //     close = Shared_ChartPlotData.close;
    // } else {
    //     XDATA = Shared_PlotInfo[plotName].xdata().slice(visiblerange[0], visiblerange[1]);
    //     open = Shared_ChartPlotData.open.slice(visiblerange[0], visiblerange[1]);
    //     high = Shared_ChartPlotData.high.slice(visiblerange[0], visiblerange[1]);
    //     low = Shared_ChartPlotData.low.slice(visiblerange[0], visiblerange[1]);
    //     close = Shared_ChartPlotData.close.slice(visiblerange[0], visiblerange[1]);
    // }
    // console.log(visiblerange,XDATA,Shared_PlotInfo[plotName].xdata());
    // const YDATA = Shared_DataToplot[plotName].ydata();
    let plotColor = Shared_PlotInfo[plotName].plotcolor;
    // // const currentTransformX = Shared_Xscaleconfig[Shared_DataToplot[plotName].xscaletag].currentTransformX;
    const currentTransformX = xzoomeventsvg.property("__zoom");
    // const currentTransformY = yzoomeventsvg.property("__zoom");
    const currentTransformY = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yzoomtransform;
    // console.log(currentTransformY);
    // // const currentTransformY = this.AxisYGroup.property("__zoom");
    const xScale = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].xscale().XSCALE;
    const yScale = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yscale().TranSFormedYscale;
    //let newxScale = currentTransformX.rescaleX(xScale);
    const zoomstatus = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].zoomstatus;
    let newxScale = zoomstatus ? currentTransformX.rescaleX(xScale) : xScale;
    let newyScale = yScale;
    const yaxistag = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yaxisTag;
    const yaxisraange = Shared_yaxisProp[yaxistag].range;
    //console.log(XDATA,YDATA,plotColor);
    // console.log(currentTransformX,currentTransformY);
    // console.log(Shared_ChartPlotData.backtestresultline);
    const backtestdata = Shared_ChartPlotData.backtestresultline;
    // const backtestdata: backtestitem[]=  []
    drawBacktestPlotOnSVG(PlotGroupArea, backtestdata, newxScale, newyScale, plotName, yaxistag);
}
function drawPlotScatteryName(plotName, PlotGroupArea, xzoomeventsvg) {
    const visiblerange = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].xscaleVisibleRange;
    let XDATA = [];
    let YDATA = [];
    if (visiblerange[1] == 0) {
        XDATA = Shared_PlotInfo[plotName].xdata();
        YDATA = Shared_PlotInfo[plotName].ydata();
    }
    else {
        XDATA = Shared_PlotInfo[plotName].xdata().slice(visiblerange[0], visiblerange[1]);
        YDATA = Shared_PlotInfo[plotName].ydata().slice(visiblerange[0], visiblerange[1]);
    }
    // const xScaleType = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].xsaleType
    // if (xScaleType=="Linear"){
    //   XDATA=XDATA.map((item,index)=>index)
    // }
    // const YDATA = Shared_DataToplot[plotName].ydata();
    let plotColor = Shared_PlotInfo[plotName].plotcolor;
    // // const currentTransformX = Shared_Xscaleconfig[Shared_DataToplot[plotName].xscaletag].currentTransformX;
    const currentTransformX = xzoomeventsvg.property("__zoom");
    // const currentTransformY = yzoomeventsvg.property("__zoom");
    const currentTransformY = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yzoomtransform;
    // console.log(currentTransformY);
    // // const currentTransformY = this.AxisYGroup.property("__zoom");
    const xScale = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].xscale().XSCALE;
    const yScale = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yscale().TranSFormedYscale;
    const zoomstatus = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].zoomstatus;
    let newxScale = zoomstatus ? currentTransformX.rescaleX(xScale) : xScale;
    let newyScale = yScale;
    const yaxistag = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yaxisTag;
    // console.log(XDATA,YDATA,plotColor);
    // console.log(currentTransformX,currentTransformY);
    let scatterData = [];
    XDATA.map((xdata, index) => {
        scatterData.push({ xData: xdata,
            yData: YDATA[index],
            label: `${index}`,
            color: "red",
            size: 2 });
    });
    drawScatterPlotOnSVG(PlotGroupArea, scatterData, newxScale, newyScale, plotName, yaxistag, false);
}
function drawPlotLineByName(plotName, PlotGroupArea, xzoomeventsvg) {
    const visiblerange = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].xscaleVisibleRange;
    let XDATA = [];
    let YDATA = [];
    let XDATA_fillter1 = [];
    let YDATA_fillter1 = [];
    // console.log(Shared_PlotInfo); 
    // console.log(plotName);
    if (visiblerange[1] == 0) {
        XDATA = Shared_PlotInfo[plotName].xdata();
        YDATA = Shared_PlotInfo[plotName].ydata();
    }
    else {
        // console.log(Shared_PlotInfo[plotName].clipdata);
        if (Shared_PlotInfo[plotName].clipdata) {
            // console.log(plotName,visiblerange)
            const filterdata = filterData(Shared_PlotInfo[plotName].xdata(), Shared_PlotInfo[plotName].ydata(), visiblerange[0], visiblerange[1]);
            XDATA = filterdata.xdata;
            YDATA = filterdata.ydata;
        }
        else {
            XDATA = Shared_PlotInfo[plotName].xdata();
            YDATA = Shared_PlotInfo[plotName].ydata();
        }
    }
    // console.log(plotName,XDATA.length,Shared_PlotInfo[plotName].clipdata,visiblerange);
    let plotColor = Shared_PlotInfo[plotName].plotcolor;
    // // const currentTransformX = Shared_Xscaleconfig[Shared_DataToplot[plotName].xscaletag].currentTransformX;
    const currentTransformX = xzoomeventsvg.property("__zoom");
    // const currentTransformY = yzoomeventsvg.property("__zoom");
    const currentTransformY = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yzoomtransform;
    // console.log(currentTransformY);
    // // const currentTransformY = this.AxisYGroup.property("__zoom");
    const xScale = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].xscale().XSCALE;
    const yScale = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yscale().TranSFormedYscale;
    //let newxScale = currentTransformX.rescaleX(xScale);
    const zoomstatus = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].zoomstatus;
    let newxScale = zoomstatus ? currentTransformX.rescaleX(xScale) : xScale;
    let newyScale = yScale;
    const yaxistag = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yaxisTag;
    // console.log(XDATA,YDATA,plotColor);
    // console.log(currentTransformX,currentTransformY);
    const validDataIndices = [];
    const filteredYData = [];
    YDATA.forEach((d, i) => {
        if (!isNaN(d) && d !== undefined) {
            validDataIndices.push(i);
            filteredYData.push(d);
        }
    });
    // Create arrays containing valid x and y data points
    const validXData = validDataIndices.map(i => XDATA[i]);
    drawLineOnSVG(PlotGroupArea, validXData, filteredYData, newxScale, newyScale, plotName, yaxistag, plotColor);
}
function drawPlotMultiLineByName(plotName, PlotGroupArea, xzoomeventsvg) {
    const visiblerange = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].xscaleVisibleRange;
    let Multilinedata = [];
    Multilinedata = Shared_PlotInfo[plotName].ydata();
    // console.log(plotName,XDATA.length,Shared_PlotInfo[plotName].clipdata,visiblerange);
    let plotColor = Shared_PlotInfo[plotName].plotcolor;
    // // const currentTransformX = Shared_Xscaleconfig[Shared_DataToplot[plotName].xscaletag].currentTransformX;
    const currentTransformX = xzoomeventsvg.property("__zoom");
    // const currentTransformY = yzoomeventsvg.property("__zoom");
    const currentTransformY = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yzoomtransform;
    // console.log(currentTransformY);
    // // const currentTransformY = this.AxisYGroup.property("__zoom");
    const xScale = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].xscale().XSCALE;
    const yScale = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yscale().TranSFormedYscale;
    //let newxScale = currentTransformX.rescaleX(xScale);
    const zoomstatus = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].zoomstatus;
    let newxScale = zoomstatus ? currentTransformX.rescaleX(xScale) : xScale;
    let newyScale = yScale;
    const yaxistag = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yaxisTag;
    // console.log(XDATA,YDATA,plotColor);
    // console.log(currentTransformX,currentTransformY);
    // const validDataIndices: number[] = [];
    // const filteredYData: number[] = [];
    // YDATA.forEach((d, i) => {
    //   if (!isNaN(d) && d !== undefined) {
    //     validDataIndices.push(i);
    //     filteredYData.push(d);
    //   }
    // });
    // // Create arrays containing valid x and y data points
    // const validXData: number[] = validDataIndices.map(i => XDATA[i]);
    // console.log(Multilinedata);
    DrawMultilineonSVG(PlotGroupArea, Multilinedata, newxScale, newyScale, yaxistag, plotColor);
}
function drawPlotBarByName(plotName, PlotGroupArea, xzoomeventsvg) {
    const visiblerange = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].xscaleVisibleRange;
    let XDATA = [];
    let YDATA = [];
    if (visiblerange[1] == 0) {
        XDATA = Shared_PlotInfo[plotName].xdata();
        YDATA = Shared_PlotInfo[plotName].ydata();
    }
    else {
        // console.log(Shared_PlotInfo[plotName]);
        XDATA = Shared_PlotInfo[plotName].xdata().slice(visiblerange[0], visiblerange[1]);
        YDATA = Shared_PlotInfo[plotName].ydata().slice(visiblerange[0], visiblerange[1]);
    }
    const xScaleType = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].xsaleType;
    // if (xScaleType=="Linear"){
    //   XDATA=XDATA.map((item,index)=>index)
    // }
    let plotColor = Shared_PlotInfo[plotName].plotcolor;
    // // const currentTransformX = Shared_Xscaleconfig[Shared_DataToplot[plotName].xscaletag].currentTransformX;
    const currentTransformX = xzoomeventsvg.property("__zoom");
    // const currentTransformY = yzoomeventsvg.property("__zoom");
    const currentTransformY = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yzoomtransform;
    // console.log(currentTransformY);
    // // const currentTransformY = this.AxisYGroup.property("__zoom");
    const xScale = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].xscale().XSCALE;
    const yScale = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yscale().TranSFormedYscale;
    //let newxScale = currentTransformX.rescaleX(xScale);
    const zoomstatus = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].zoomstatus;
    let newxScale = zoomstatus ? currentTransformX.rescaleX(xScale) : xScale;
    let newyScale = yScale;
    const yaxistag = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yaxisTag;
    const yaxisraange = Shared_yaxisProp[yaxistag].range;
    // console.log(XDATA,YDATA,plotColor);
    // console.log(currentTransformX,currentTransformY);
    drawBarChartOnSVG(PlotGroupArea, XDATA, YDATA, newxScale, newyScale, plotName, yaxistag, yaxisraange, plotColor);
}
function drawPlotMulitBarByName(plotName, PlotGroupArea, xzoomeventsvg) {
    const visiblerange = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].xscaleVisibleRange;
    let XDATA = [];
    let YDATA = {};
    if (visiblerange[1] == 0) {
        XDATA = Shared_PlotInfo[plotName].xdata();
        YDATA = Shared_PlotInfo[plotName].ydata();
    }
    else {
        XDATA = Shared_PlotInfo[plotName].xdata().slice(visiblerange[0], visiblerange[1]);
        // YDATA = Shared_PlotInfo[plotName].ydata.slice(visiblerange[0], visiblerange[1]) as unknown as { [key: string]: number[] }
        let tempyData = Shared_PlotInfo[plotName].ydata();
        Object.keys(tempyData).forEach(key => {
            YDATA[key] = tempyData[key].slice(visiblerange[0], visiblerange[1]);
        });
    }
    // const xScaleType = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].xsaleType
    // if (xScaleType=="Linear"){
    //   XDATA=XDATA.map((item,index)=>index)
    // }
    // console.log(YDATA);
    let plotColor = Shared_PlotInfo[plotName].plotcolor;
    // // const currentTransformX = Shared_Xscaleconfig[Shared_DataToplot[plotName].xscaletag].currentTransformX;
    const currentTransformX = xzoomeventsvg.property("__zoom");
    // const currentTransformY = yzoomeventsvg.property("__zoom");
    const currentTransformY = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yzoomtransform;
    // console.log(currentTransformY);
    // // const currentTransformY = this.AxisYGroup.property("__zoom");
    const xScale = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].xscale().XSCALE;
    const yScale = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yscale().TranSFormedYscale;
    //let newxScale = currentTransformX.rescaleX(xScale);
    const zoomstatus = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].zoomstatus;
    let newxScale = zoomstatus ? currentTransformX.rescaleX(xScale) : xScale;
    let newyScale = yScale;
    const yaxistag = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yaxisTag;
    const yaxisraange = Shared_yaxisProp[yaxistag].range;
    // console.log(XDATA,YDATA,plotColor);
    // console.log(currentTransformX,currentTransformY);
    drawMultiBarChartOnSVG(PlotGroupArea, XDATA, YDATA, newxScale, newyScale, plotName, yaxistag, yaxisraange, { a1: "brown", b1: "lightblue" });
}
function drawPlotOHLCByName(plotName, PlotGroupArea, xzoomeventsvg) {
    const visiblerange = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].xscaleVisibleRange;
    // console.log(visiblerange);
    //console.log(visiblerange)
    // console.log(Shared_PlotInfo); 
    let XDATA = [];
    let open = [];
    let high = [];
    let low = [];
    let close = [];
    if (visiblerange[1] == 0) {
        XDATA = Shared_PlotInfo[plotName].xdata();
        open = Shared_ChartPlotData.open;
        high = Shared_ChartPlotData.high;
        low = Shared_ChartPlotData.low;
        close = Shared_ChartPlotData.close;
    }
    else {
        XDATA = Shared_PlotInfo[plotName].xdata().slice(visiblerange[0], visiblerange[1]);
        open = Shared_ChartPlotData.open.slice(visiblerange[0], visiblerange[1]);
        high = Shared_ChartPlotData.high.slice(visiblerange[0], visiblerange[1]);
        low = Shared_ChartPlotData.low.slice(visiblerange[0], visiblerange[1]);
        close = Shared_ChartPlotData.close.slice(visiblerange[0], visiblerange[1]);
    }
    // console.log(visiblerange,XDATA,Shared_PlotInfo[plotName].xdata());
    // const YDATA = Shared_DataToplot[plotName].ydata();
    let plotColor = Shared_PlotInfo[plotName].plotcolor;
    // // const currentTransformX = Shared_Xscaleconfig[Shared_DataToplot[plotName].xscaletag].currentTransformX;
    const currentTransformX = xzoomeventsvg.property("__zoom");
    // const currentTransformY = yzoomeventsvg.property("__zoom");
    const currentTransformY = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yzoomtransform;
    // console.log(currentTransformY);
    // // const currentTransformY = this.AxisYGroup.property("__zoom");
    const xScale = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].xscale().XSCALE;
    const yScale = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yscale().TranSFormedYscale;
    //let newxScale = currentTransformX.rescaleX(xScale);
    const zoomstatus = Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].zoomstatus;
    let newxScale = zoomstatus ? currentTransformX.rescaleX(xScale) : xScale;
    let newyScale = yScale;
    const yaxistag = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yaxisTag;
    const yaxisraange = Shared_yaxisProp[yaxistag].range;
    //console.log(XDATA,YDATA,plotColor);
    // console.log(currentTransformX,currentTransformY);
    // console.log(Shared_ChartPlotData.backtestresultline);
    // const backtestdata=  Shared_ChartPlotData.backtestresultline
    drawCandlestickOnSVG(PlotGroupArea, XDATA, open, high, low, close, newxScale, newyScale, plotName, yaxistag);
}
