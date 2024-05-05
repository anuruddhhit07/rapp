import {
  ChartOptionsIn,
  Margin,
  CustomChartOptions,
} from "../types/chartSetuptype";
import * as d3 from "d3";
import { updateChartBaseProp } from "../SharedObject";

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
  width!: number;
  height!: number;
  private static instance: SetupChart | null = null; // Static property to hold the instance

  private constructor(
    svgWidth: number,
    svgHeight: number,
    chartOptions: ChartOptionsIn
  ) {
    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
    this.targetID = chartOptions.targetID;
    this.stockid = chartOptions.stockid;
    this.liveupdatefunction = chartOptions.liveupdatefunction;
    this.margin = marginDefault;
    this.setDimensions();
    updateChartBaseProp({
      svgWidth:svgWidth,
      svgHeight:svgHeight,
      targetID:chartOptions.targetID,
      stockid:chartOptions.stockid,
  })
  }

  // Static method to create or retrieve the singleton instance
  static getInstance(
    svgWidth: number,
    svgHeight: number,
    chartOptions: Partial<ChartOptionsIn>
  ): SetupChart {
    if (!SetupChart.instance) {
      for (const key in chartOptions) {
        if (key in ChartOptionsDefault) {
          ChartOptionsDefault[key as keyof ChartOptionsIn] = chartOptions[
            key as keyof ChartOptionsIn
          ] as any; // Type assertion
        }
      }
      console.log("ChartOptionsDefault", ChartOptionsDefault);
      SetupChart.instance = new SetupChart(
        svgWidth,
        svgHeight,
        ChartOptionsDefault
      );
    }
    return SetupChart.instance;
  }
  setDimensions() {
    this.width =
      this.svgWidth -
      this.margin.left -
      this.margin.right -
      this.margin.innerRight -
      this.margin.innerLeft;
    this.height =
      this.svgHeight -
      this.margin.top -
      this.margin.bottom -
      this.margin.innertop -
      this.margin.innerBottom;
  }
  public setupSVG(
    svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>
  ): d3.Selection<SVGSVGElement, any, HTMLElement, any> {
    const svgElementExists: boolean = d3
      .select(`#svg-${this.targetID}`)
      .empty();
    svg = svgElementExists
      ? d3
          .select(`#${this.targetID}`)
          .append("svg")
          .attr("id", `svg-${this.targetID}`)
          .attr("width", this.svgWidth)
          .attr("height", this.svgHeight)
      : d3.select(`#svg-${this.targetID}`);

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", `clip1-${this.targetID}`)
      .append("rect")
      .attr("x", this.margin.left + this.margin.innerLeft)
      .attr("y", this.margin.top + this.margin.innertop)
      .attr("width", this.width + 0 * this.margin.innerLeft)
      .attr("height", this.height);

    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .style("fill", "lightblue")
      .style("opacity", 0.5);

    return svg;
  }
}

export default SetupChart;
