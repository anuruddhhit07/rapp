import {
  ChartDataType,
  ChartDimensionType,
  PlotInfoInputType,
  XScaleConfigInputType,
  YScaleConfigInputType,
} from "./ShareDataType";

export const chartData: ChartDataType = {
  xindex: [0, 1, 2, 5, 6],
  close: [11, 12, 13, 65, 34],
  open: [5, 8, 1, 3, 7],
};
export const plotInfoInput: PlotInfoInputType[] = [
  {
    plotStatus: true,
    plotName: "ClosePlot",
    xdataTag: "xindex",
    ydataTag: "close",
    xscaleTag: "bot",
    yscaleTag: "TL",
    plotType: "line",
    plotcolor: "red",
    buttontag:"ClosePlot"
  },
  {
    plotStatus: true,
    plotName: "LowPlot",
    xdataTag: "xindex",
    ydataTag: "close",
    xscaleTag: "bot",
    yscaleTag: "TR",
    plotType: "line",
    plotcolor: "red",
    buttontag:"LowPlot"
  },
  {
    plotStatus: true,
    plotName: "VolumePlot",
    xdataTag: "xindex",
    ydataTag: "open",
    xscaleTag: "top",
    yscaleTag: "BL",
    plotType: "line",
    buttontag:"VolumePlot"
  },
];
export const xScaleConfigInput: XScaleConfigInputType[] = [
  {
    xscaleTag: "bot",
    ypoint: 100,
    xscaleRange: [0, 100],
    xscaleDomainData: [0, 1, 2, 3, 4],
    zoomstatus: true,
  },
  {
    xscaleTag: "top",
    ypoint: 20,
    xscaleRange: [0, 100],
    xscaleDomainData: [0, 1, 2, 3, 4],
  },
];

export const yScaleConfigInput: YScaleConfigInputType[] = [
  {
    yscaleTag: "TL",
    yaxisTag:"1main",
    xpoint: 100,
    yscaleRange: [0, 100],
    yscaleDomainData: [0, 1, 2, 3, 4],
    xscaleVisibleRange: [0, 5],
  },
  {
    yscaleTag: "TR",
    yaxisTag:"1main",
    xpoint: 100,
    yscaleRange: [0, 100],
    yscaleDomainData: [0, 1, 2, 3, 4],
    xscaleVisibleRange: [0, 5],
  },
  {
    yscaleTag: "BL",
    yaxisTag:"volumeaxis",
    xpoint: 20,
    yscaleRange: [0, 100],
    yscaleDomainData: [0, 1, 2, 3, 4],
    xscaleVisibleRange: [0, 5],
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
      left: 10,
      innerLeft: 20,
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
