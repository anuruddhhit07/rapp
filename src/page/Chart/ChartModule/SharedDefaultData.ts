import {
  ChartDimensionType,
  PlotInfoInputType,
  XScaleConfigInputType,
  YScaleConfigInputType,
} from "./types";
import { Shared_ChartDimension } from "./BaseSetup/SharedDataUtility";
import { ChartDataType } from "./BaseSetup/chartdataTypes";

export const defaultchartData: ChartDataType = {
  timestamp: [],
  xindex: [],
  open: [],
  high: [],
  low: [],
  close: [],
  volume: [],
};


export const plotInfoInput: PlotInfoInputType[] = [
  {
    plotStatus: true,
    plotName: "OHLCPlot",
    xdataTag: "xindex",
    ydataTag: "ohlc",
    xscaleTag: "bot",
    yscaleTag: "TR",
    plotType: "ohlc",
    plotcolor: "red",
    buttontag:"OHLCPlot",
    tooltip:true
  },
  {
    plotStatus: false,
    plotName: "LowPlot",
    xdataTag: "xindex",
    ydataTag: "low",
    xscaleTag: "bot",
    yscaleTag: "TR",
    plotType: "line",
    plotcolor: "black",
    buttontag:"LowPlot",
    tooltip:true
  },
  {
    plotStatus: false,
    plotName: "VolumePlot",
    xdataTag: "xindex",
    ydataTag: "volume",
    xscaleTag: "bot",
    yscaleTag: "BR",
    plotType: "bar",
    buttontag:"VolumePlot",
    tooltip:true
  },
  {
    plotStatus: true,
    plotName: "HighPlot",
    xdataTag: "xindex",
    ydataTag: "high",
    xscaleTag: "bot",
    yscaleTag: "LR",
    plotType: "scatter",
    buttontag:"HighPlot"
  },
];


export const xScaleConfigInput: XScaleConfigInputType[] = [
  {
    xscaleTag: "bot",
    xsaleType:'Linear',
    scaleSide:'Bottom',
    ticlavelmappedwith:'timestamp',
    ypoint: 20,
    xscaleRange: [0, 100],
    xscaleDataTag:'xindex',
    zoomstatus: true,
  },
  {
    xscaleTag: "top",
    xsaleType:'Linear',
    scaleSide:'Top',
    ticlavelmappedwith:'xindex',
    ypoint: 300,
    xscaleRange: [0, 100],
    xscaleDataTag:'xindex',
  },
];

export const yScaleConfigInput: YScaleConfigInputType[] = [
  {
    yscaleTag: "TR",
    yaxisTag:"1main",
    scaleSide:'Right',
    xpoint: 100,
    // yscaleRange: [0, 100],
    yscaleDataTag:'ohlc',
    xscaleVisibleRange: [0, 0],
    zoomstatus:true,
    autozoom:true
  },
  {
    yscaleTag: "TL",
    yaxisTag:"1main",
    scaleSide:'Left',
    xpoint: 100,
    // yscaleRange: [0, 100],
    yscaleDataTag:'close',
    xscaleVisibleRange: [0, 0],
    zoomstatus:true,
    autozoom:false
  },
  {
    yscaleTag: "BR",
    yaxisTag:"volumeaxis",
    scaleSide:'Right',
    xpoint: 20,
    // yscaleRange: [0, 100],
    yscaleDataTag:'volume',
    xscaleVisibleRange: [0, 0],
    autozoom:true,
    zoomstatus:true,
  },
  {
    yscaleTag: "LR",
    yaxisTag:"scatterAxis",
    scaleSide:'Right',
    xpoint: 20,
    // yscaleRange: [0, 100],
    yscaleDataTag:'high',
    xscaleVisibleRange: [0, 0],
    autozoom:true,
    zoomstatus:true,
  },
];

export const defaultChartDimensionProp: ChartDimensionType = {
  svgWidth: 500,
  svgHeight: 200,
  targetID: "chartContainer",
  stockid: "StockName:1D",
  liveupdatefunction: function (): void {
      throw new Error("Function not implemented.");
  },
  margin: {
      top: 20,
      right: 50,
      bottom: 20,
      left: 0,
      innerLeft: 0,
      innerRight: 100,
      innerBottom: 20,
      innerTop: 20
  },
  get width() {
      return this.svgWidth -
          this.margin.left -
          this.margin.right -
          this.margin.innerRight -
          this.margin.innerLeft;
  },
  get height() {
      return this.svgHeight -
          this.margin.top -
          this.margin.bottom -
          this.margin.innerTop -
          this.margin.innerBottom;
  }
};