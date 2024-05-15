import {
  Shared_ChartBaseData,
  Shared_ChartPlotData,
  Shared_PlotInfo,
  Shared_XScaleConfig,
  Shared_YScaleConfig,
  Shared_yaxisProp,
  groupDataByPlotType,
} from "../BaseSetup/SharedDataUtility";
import { ChartDataType } from "../BaseSetup/chartdataTypes";
import { drawBarChartOnSVG, drawCandlestickOnSVG, drawLineOnSVG, drawScatterPlotOnSVG } from "./SVGUtility";
import { ScatterDataType } from "./chartSetuptype";

export function plotonsvg(
  plotAreaonSVG: d3.Selection<SVGGElement, any, HTMLElement, any>,
  xzoomeventsvg: d3.Selection<SVGGElement, any, HTMLElement, any>,
  yzoomeventsvg: d3.Selection<SVGGElement, any, HTMLElement, any>
) {
  //console.log("Plot On SVG");
  // console.log(Shared_ChartBaseData);
  const plotTag = Array.from(Shared_ChartBaseData.plotName);
  const groupedplotData = groupDataByPlotType();

  plotAreaonSVG.selectAll(`.lineplot`).remove();
  plotAreaonSVG.selectAll(`.barplot`).remove();
  plotAreaonSVG.selectAll(`.ohlcplot`).remove();
  plotAreaonSVG.selectAll(`.scatterplot`).remove();

  
  
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

      if (plotType == "bar") {
        groupedplotData[plotType].forEach((PlotName) => {
          // console.log(PlotName);
          if (plotTag.includes(PlotName)) {
            // console.log(PlotName);
            drawPlotBarByName(PlotName, plotAreaonSVG, xzoomeventsvg);
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
function drawPlotScatteryName(
  plotName: string,
  PlotGroupArea: d3.Selection<SVGGElement, any, HTMLElement, any>,
  xzoomeventsvg: d3.Selection<SVGGElement, any, HTMLElement, any>
) {
    const visiblerange=Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].xscaleVisibleRange

    let XDATA:number[]=[]
    let YDATA:number[]=[]

    if (visiblerange[1]==0){
        XDATA = Shared_PlotInfo[plotName].xdata
        YDATA = Shared_PlotInfo[plotName].ydata
    }
    else {
        XDATA = Shared_PlotInfo[plotName].xdata.slice(visiblerange[0], visiblerange[1])
        YDATA = Shared_PlotInfo[plotName].ydata.slice(visiblerange[0], visiblerange[1])
    }

//   const XDATA = Shared_PlotInfo[plotName].xdata;
//   const YDATA = Shared_PlotInfo[plotName].ydata;

  // const YDATA = Shared_DataToplot[plotName].ydata();
  let plotColor = Shared_PlotInfo[plotName].plotcolor;
  // // const currentTransformX = Shared_Xscaleconfig[Shared_DataToplot[plotName].xscaletag].currentTransformX;
  const currentTransformX = xzoomeventsvg.property("__zoom");
  // const currentTransformY = yzoomeventsvg.property("__zoom");
  const currentTransformY =
    Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yzoomtransform;
  // console.log(currentTransformY);
  // // const currentTransformY = this.AxisYGroup.property("__zoom");
  const xScale = Shared_XScaleConfig[
    Shared_PlotInfo[plotName].xscaleTag
  ].xscale().XSCALE as d3.ScaleLinear<number, number>;
  const yScale = Shared_YScaleConfig[
    Shared_PlotInfo[plotName].yscaleTag
  ].yscale().TranSFormedYscale as d3.ScaleLinear<number, number>;

  let newxScale = currentTransformX.rescaleX(xScale);
  let newyScale = yScale;

  const yaxistag =
    Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yaxisTag;

  // console.log(XDATA,YDATA,plotColor);
  // console.log(currentTransformX,currentTransformY);

  
  let scatterData:ScatterDataType[]=[]
  XDATA.map((xdata,index)=>{
    scatterData.push({xData: xdata,
    yData: YDATA[index],
    label: `${index}`,
    color: "red",
    size: 2})
  })
  

  drawScatterPlotOnSVG(
    PlotGroupArea,
    scatterData,
    newxScale,
    newyScale,
    plotName,
    yaxistag,
    true
  );
}

function drawPlotLineByName(
  plotName: string,
  PlotGroupArea: d3.Selection<SVGGElement, any, HTMLElement, any>,
  xzoomeventsvg: d3.Selection<SVGGElement, any, HTMLElement, any>
) {
    const visiblerange=Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].xscaleVisibleRange

    let XDATA:number[]=[]
    let YDATA:number[]=[]

    if (visiblerange[1]==0){
        XDATA = Shared_PlotInfo[plotName].xdata
        YDATA = Shared_PlotInfo[plotName].ydata
    }
    else {
        XDATA = Shared_PlotInfo[plotName].xdata.slice(visiblerange[0], visiblerange[1])
        YDATA = Shared_PlotInfo[plotName].ydata.slice(visiblerange[0], visiblerange[1])
    }

//   const XDATA = Shared_PlotInfo[plotName].xdata;
//   const YDATA = Shared_PlotInfo[plotName].ydata;

  // const YDATA = Shared_DataToplot[plotName].ydata();
  let plotColor = Shared_PlotInfo[plotName].plotcolor;
  // // const currentTransformX = Shared_Xscaleconfig[Shared_DataToplot[plotName].xscaletag].currentTransformX;
  const currentTransformX = xzoomeventsvg.property("__zoom");
  // const currentTransformY = yzoomeventsvg.property("__zoom");
  const currentTransformY =
    Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yzoomtransform;
  // console.log(currentTransformY);
  // // const currentTransformY = this.AxisYGroup.property("__zoom");
  const xScale = Shared_XScaleConfig[
    Shared_PlotInfo[plotName].xscaleTag
  ].xscale().XSCALE as d3.ScaleLinear<number, number>;
  const yScale = Shared_YScaleConfig[
    Shared_PlotInfo[plotName].yscaleTag
  ].yscale().TranSFormedYscale as d3.ScaleLinear<number, number>;

  let newxScale = currentTransformX.rescaleX(xScale);
  let newyScale = yScale;

  const yaxistag =
    Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yaxisTag;

  // console.log(XDATA,YDATA,plotColor);
  // console.log(currentTransformX,currentTransformY);

  drawLineOnSVG(
    PlotGroupArea,
    XDATA as number[],
    YDATA as number[],
    newxScale,
    newyScale,
    plotName,
    yaxistag,
    plotColor
  );
}

function drawPlotBarByName(
  plotName: string,
  PlotGroupArea: d3.Selection<SVGGElement, any, HTMLElement, any>,
  xzoomeventsvg: d3.Selection<SVGGElement, any, HTMLElement, any>
) {
    const visiblerange=Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].xscaleVisibleRange

    let XDATA:number[]=[]
    let YDATA:number[]=[]

    if (visiblerange[1]==0){
        XDATA = Shared_PlotInfo[plotName].xdata
        YDATA = Shared_PlotInfo[plotName].ydata
    }
    else {
        XDATA = Shared_PlotInfo[plotName].xdata.slice(visiblerange[0], visiblerange[1])
        YDATA = Shared_PlotInfo[plotName].ydata.slice(visiblerange[0], visiblerange[1])
    }

  // const YDATA = Shared_DataToplot[plotName].ydata();
  let plotColor = Shared_PlotInfo[plotName].plotcolor;
  // // const currentTransformX = Shared_Xscaleconfig[Shared_DataToplot[plotName].xscaletag].currentTransformX;
  const currentTransformX = xzoomeventsvg.property("__zoom");
  // const currentTransformY = yzoomeventsvg.property("__zoom");
  const currentTransformY =
    Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yzoomtransform;
  // console.log(currentTransformY);
  // // const currentTransformY = this.AxisYGroup.property("__zoom");
  const xScale = Shared_XScaleConfig[
    Shared_PlotInfo[plotName].xscaleTag
  ].xscale().XSCALE as d3.ScaleLinear<number, number>;
  const yScale = Shared_YScaleConfig[
    Shared_PlotInfo[plotName].yscaleTag
  ].yscale().TranSFormedYscale as d3.ScaleLinear<number, number>;

  let newxScale = currentTransformX.rescaleX(xScale);
  let newyScale = yScale;

  const yaxistag =
    Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yaxisTag;
    const yaxisraange=Shared_yaxisProp[yaxistag].range

  //console.log(XDATA,YDATA,plotColor);
  // console.log(currentTransformX,currentTransformY);

  drawBarChartOnSVG(
    PlotGroupArea,
    XDATA as number[],
    YDATA as number[],
    newxScale,
    newyScale,
    plotName,
    yaxistag,
    yaxisraange,
    plotColor
  );
}
function drawPlotOHLCByName(
    plotName: string,
    PlotGroupArea: d3.Selection<SVGGElement, any, HTMLElement, any>,
    xzoomeventsvg: d3.Selection<SVGGElement, any, HTMLElement, any>
  ) {
    const visiblerange=Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].xscaleVisibleRange
    //console.log(visiblerange)
    let XDATA:number[]=[]
    let open:number[]=[]
    let high:number[]=[]
    let low:number[]=[]
    let close:number[]=[]
    if (visiblerange[1]==0){
        XDATA = Shared_PlotInfo[plotName].xdata
        open = Shared_ChartPlotData.open;
        high = Shared_ChartPlotData.high;
        low = Shared_ChartPlotData.low;
        close = Shared_ChartPlotData.close;
    } else {
        XDATA = Shared_PlotInfo[plotName].xdata.slice(visiblerange[0], visiblerange[1]);
        open = Shared_ChartPlotData.open.slice(visiblerange[0], visiblerange[1]);
        high = Shared_ChartPlotData.high.slice(visiblerange[0], visiblerange[1]);
        low = Shared_ChartPlotData.low.slice(visiblerange[0], visiblerange[1]);
        close = Shared_ChartPlotData.close.slice(visiblerange[0], visiblerange[1]);
    }
    
  
    // const YDATA = Shared_DataToplot[plotName].ydata();
    let plotColor = Shared_PlotInfo[plotName].plotcolor;
    // // const currentTransformX = Shared_Xscaleconfig[Shared_DataToplot[plotName].xscaletag].currentTransformX;
    const currentTransformX = xzoomeventsvg.property("__zoom");
    // const currentTransformY = yzoomeventsvg.property("__zoom");
    const currentTransformY =
      Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yzoomtransform;
    // console.log(currentTransformY);
    // // const currentTransformY = this.AxisYGroup.property("__zoom");
    const xScale = Shared_XScaleConfig[
      Shared_PlotInfo[plotName].xscaleTag
    ].xscale().XSCALE as d3.ScaleLinear<number, number>;
    const yScale = Shared_YScaleConfig[
      Shared_PlotInfo[plotName].yscaleTag
    ].yscale().TranSFormedYscale as d3.ScaleLinear<number, number>;
  
    let newxScale = currentTransformX.rescaleX(xScale);
    let newyScale =yScale;
  
    const yaxistag =
      Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yaxisTag;
      const yaxisraange=Shared_yaxisProp[yaxistag].range
  
    //console.log(XDATA,YDATA,plotColor);
    // console.log(currentTransformX,currentTransformY);
  
    drawCandlestickOnSVG(
      PlotGroupArea,
      XDATA as number[],
      open as number[],
      high as number[],
      low as number[],
      close as number[],
      newxScale,
      newyScale,
      plotName,
      yaxistag);
  }
  