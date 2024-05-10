import { ChartBaseSetupType } from "./types/chartSetuptype";
import { ChartDataObj } from "./types/chartdataTypes";

interface plotData_InputObj {
    id: string;
    PlotName: string;
    XdataTag: keyof ChartDataObj;
    YdataTag: keyof ChartDataObj;
    xscaleTage: string;
    yscaleTage: string;
    plotstatus: boolean;
  }

export const defaultChartBaseProp: ChartBaseSetupType = {
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

export const DefaultinputData: plotData_InputObj[] = [
    {
      id: "1",
      PlotName: "PL1",
      XdataTag: "xindex",
      YdataTag: "close",
      xscaleTage: "BOT1",
      yscaleTage: "TR1",
      plotstatus: true,
    },
    {
      id: "2",
      PlotName: "PL2",
      XdataTag: "xindex",
      YdataTag: "high",
      xscaleTage: "BOT2",
      yscaleTage: "TR2",
      plotstatus: false,
    },
    {
      id: "3",
      PlotName: "PL3",
      XdataTag: "xindex",
      YdataTag: "low",
      xscaleTage: "BOT3",
      yscaleTage: "TR3",
      plotstatus: true,
    },
  ];
  