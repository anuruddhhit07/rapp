import {
  ChartDimensionType,
  PlotInfoInputType,
  XScaleConfigInputType,
  YScaleConfigInputType,
} from "./types";
import { Shared_ChartDimension } from "./BaseSetup/SharedDataUtility";
import { ChartDataType } from "./types";

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
    plotStatus: true,
    plotName: "zigzaglot",
    xdataTag: "zigzagX",
    ydataTag: "zigzagY",
    xscaleTag: "bot",
    yscaleTag: "TR",
    plotType: "line",
    plotcolor: "blue",
    buttontag:"OHLCPlot",
    tooltip:true,
    clipdata:false
  },

 

  {
    plotStatus: true,
    plotName: "brlinelot",
    xdataTag: "xindex",
    ydataTag: "brlinedata",
    xscaleTag: "bot",
    yscaleTag: "TR",
    plotType: "multiline",
    plotcolor: "black",
    buttontag:"BrlInePlot",
    tooltip:true,
    clipdata:false
  },


  {
    plotStatus: false,
    plotName: "SMAPlot",
    xdataTag: "xindex",
    ydataTag: "ema",
    xscaleTag: "bot",
    yscaleTag: "TR",
    plotType: "line",
    plotcolor: "red",
    buttontag:"SMAPlot",
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
    plotcolor:"blue",
    tooltip:true
  },
  {
    plotStatus: false,
    plotName: "HighPlot",
    xdataTag: "xindex",
    ydataTag: "high",
    xscaleTag: "bot",
    yscaleTag: "LR",
    plotType: "scatter",
    buttontag:"HighPlot"
  },
  // {
  //   plotStatus: false,
  //   plotName: "LowPlot",
  //   xdataTag: "xindex",
  //   ydataTag: "low",
  //   xscaleTag: "bot",
  //   yscaleTag: "LR",
  //   plotType: "line",
  //   buttontag:"HighPlot"
  // },

  {
    plotStatus: false,
    plotName: "RSIplt",
    xdataTag: "xindex",
    ydataTag: "rsi",
    xscaleTag: "bot",
    yscaleTag: "rsi_scale",
    plotType: "line",
    plotcolor:"black",
    buttontag:"RSIPlot"
  },
  {
    plotStatus: false,
    plotName: "AdxPlt",
    xdataTag: "xindex",
    ydataTag: "adx",
    xscaleTag: "bot",
    yscaleTag: "rsi_scale",
    plotType: "line",
    plotcolor:'blue',
    buttontag:"ADXplot"
  },
  {
    plotStatus: false,
    plotName: "dmpPlt",
    xdataTag: "xindex",
    ydataTag: "dmp",
    xscaleTag: "bot",
    yscaleTag: "rsi_scale",
    plotType: "line",
    plotcolor:'green',
    buttontag:"ADXplot"
  },
  {
    plotStatus: false,
    plotName: "dmnPlt",
    xdataTag: "xindex",
    ydataTag: "dmn",
    xscaleTag: "bot",
    yscaleTag: "rsi_scale",
    plotType: "line",
    plotcolor:'red',
    buttontag:"ADXplot"
  },

  {
    plotStatus: false,
    plotName: "FundaPlot",
    xdataTag: "fundaX1",
    ydataTag: "fundaMultibarY",
    xscaleTag: "Funda_xscale",
    yscaleTag: "Funda_yscale",
    plotType: "mulitbar",
    buttontag:"FundaPlot",
    // plotcolor
  },
  {
    plotStatus: true,
    plotName: "backtestplot",
    xdataTag: "xindex",
    ydataTag: "backtestresultline",
    xscaleTag: "bot",
    yscaleTag: "TR",
    plotType: "backtest",
    plotcolor: "blue",
    buttontag:"backtestplot",
    tooltip:false,
    clipdata:false
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
  
  {
    xscaleTag: "Funda_xscale",
    xsaleType:'Linear',
    scaleSide:'Top',
    ticlavelmappedwith:'fundaMappedX1',
    ypoint: 20,
    xscaleRange: [0, 100],
    xscaleDataTag:'fundaX1',
    zoomstatus: false,
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
    yaxisTag:"rsiAxis",
    scaleSide:'Right',
    xpoint: 20,
    // yscaleRange: [0, 100],
    yscaleDataTag:'high',
    xscaleVisibleRange: [0, 0],
    autozoom:true,
    zoomstatus:true,
  },
  {
    yscaleTag: "rsi_scale",
    yaxisTag:"rsiAxis",
    scaleSide:'Right',
    xpoint: 0,
    // yscaleRange: [0, 100],
    yscaleDataTag:'rsi',
    xscaleVisibleRange: [0, 0],
    autozoom:false,
    zoomstatus:false,
  },
  {
    yscaleTag: "Funda_yscale",
    yaxisTag:"FundaAxis",
    scaleSide:'Right',
    xpoint: 20,
    // yscaleRange: [0, 100],
    yscaleDataTag:'fundaMultibarY',
    xscaleVisibleRange: [0, 0],
    autozoom:false,
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
