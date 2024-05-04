import { ChartOptionsIn, Margin } from "../types/chartSetuptype";

const ChartOptionsDefault: ChartOptionsIn = {
  targetID: "DivID",
  stockid: "StockName:1D",
  liveupdatefunction: () => {},
  chartsettings: {
    mdbutton: { status: false },
    fiibutton: { status: false },
    opbutton: { status: false },
    epsbutton: { status: false },
    brlinebutton: { status: false },
    crsibutton: { status: false },
    adxbutton: { status: false },
    atrbutton: { status: false },
    emabutton: { status: false },
    rsibutton: { status: false },
    trendbutton: { status: false },
    zigzagbutton: { status: false },
    closebutton: { status: false },
    cdbutton: { status: false },
    volbutton: { status: false },
    sigbutton: { status: false },
  },
};

const marginDefault: Margin = {
  top: 20,
  right: 50,
  bottom: 20,
  left: 10,
  innerLeft: 20,
  innerRight: 100,
  innerBottom: 20,
  innertop: 20,
};

class SetupChart {
  svgWidth: number;
  svgHeight: number;
  targetID: string;
  stockid: string;
  liveupdatefunction: () => void;
  margin: Margin;
  private static instance: SetupChart | null = null; // Static property to hold the instance

  private constructor(svgWidth: number, svgHeight: number, chartOptions: ChartOptionsIn = ChartOptionsDefault) {
    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
    this.targetID = chartOptions.targetID;
    this.stockid = chartOptions.stockid;
    this.liveupdatefunction = chartOptions.liveupdatefunction;
    this.margin = marginDefault;
  }

  // Static method to create or retrieve the singleton instance
  static getInstance(svgWidth: number, svgHeight: number, chartOptions?: ChartOptionsIn): SetupChart {
    if (!SetupChart.instance) {
      SetupChart.instance = new SetupChart(svgWidth, svgHeight, chartOptions);
    }
    return SetupChart.instance;
  }
}

export default SetupChart;
