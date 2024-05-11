import {
  ChartDataType,
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
  },
  {
    plotStatus: false,
    plotName: "OpenPlot",
    xdataTag: "xindex",
    ydataTag: "open",
    xscaleTag: "bot",
    yscaleTag: "TR",
    plotType: "line",
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
    xpoint: 100,
    yscaleRange: [0, 100],
    yscaleDomainData: [0, 1, 2, 3, 4],
    xscaleVisibleRange: [0, 5],
  },
  {
    yscaleTag: "TR",
    xpoint: 20,
    yscaleRange: [0, 100],
    yscaleDomainData: [0, 1, 2, 3, 4],
    xscaleVisibleRange: [0, 5],
  },
];