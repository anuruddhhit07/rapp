import { AxisChart } from "./AxisUtility/AxisScale";
import { PlotAxis } from "./AxisUtility/PlotAxis";
import SetupChart from "./ChartSetup/setchart";
import { PlotConfig } from "./ChartSetup/setplotConfig";
import { arrangeData } from "./dataUtility/arrangeData";
import { ChartOptions, Margin } from "./types/chartSetuptype";
import { ChartDataIN, ChartDataObj } from "./types/chartdataTypes";
import * as d3 from "d3";
import {
  Shared_ChartPlotData,
  updateChartPlotData,
  Shared_ChartBaseProp,
  Shared_Xscaleconfig,
  Shared_Yscaleconfig,
  Shared_DataToplot,
} from "./SharedObject";

class CandlestickChartTS {
  //   private chartdata: ChartDataObj;
  private setupdata: SetupChart;
  private axisChart: AxisChart;
  private PlotDataConfig: PlotConfig;
  private svg!: d3.Selection<SVGSVGElement, any, HTMLElement, any>;
  private axisarea!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  // private margin: Margin
  constructor(stockdata: ChartDataIN, targetID: string) {
    this.setupdata = SetupChart.getInstance(500, 200, { targetID: targetID });
    updateChartPlotData(arrangeData(stockdata));
    this.axisChart = AxisChart.getInstance();
    this.PlotDataConfig = PlotConfig.getInstance();

    this.setupSVG();
    PlotAxis.getInstance(this.svg);
    // // this.svg=this.setupdata.setupSVG(this.svg)

    console.log(this);
    console.log(Shared_ChartPlotData);
    console.log(Shared_ChartBaseProp);
    console.log(Shared_Xscaleconfig);
    console.log(Shared_Yscaleconfig["OHLC"].datadomain());
    console.log(Shared_DataToplot)
  }

  setupSVG() {
    const { targetID, svgWidth, svgHeight, margin, width, height } =
      Shared_ChartBaseProp;
    const svgElementExists: boolean = d3.select(`#svg-${targetID}`).empty();
    this.svg = svgElementExists
      ? d3
          .select(`#${targetID}`)
          .append("svg")
          .attr("id", `svg-${targetID}`)
          .attr("width", svgWidth)
          .attr("height", svgHeight)
      : d3.select(`#svg-${targetID}`);

    this.svg
      .append("defs")
      .append("clipPath")
      .attr("id", `clip1-${targetID}`)
      .append("rect")
      .attr("x", margin.left + margin.innerLeft)
      .attr("y", margin.top + margin.innerTop)
      .attr("width", width + 0 * margin.innerLeft)
      .attr("height", height);

    // Return the SVG as a string

    this.svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .style("fill", "lightblue")
      .style("opacity", 0.5);

    this.axisarea = this.svg.append("g");
  }
}

export default CandlestickChartTS;
