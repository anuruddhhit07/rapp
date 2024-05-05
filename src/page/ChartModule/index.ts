import { AxisChart } from "./AxisUtility/AxisScale";
import { PlotAxis } from "./AxisUtility/PlotAxis";
import SetupChart from "./ChartSetup/setchart";
import { PlotConfig } from "./ChartSetup/setplotConfig";
import { arrangeData } from "./dataUtility/arrangeData";
import { ChartOptions, Margin } from "./types/chartSetuptype";
import { ChartDataIN, ChartDataObj } from "./types/chartdataTypes";
import * as d3 from "d3";
import { Shared_ChartPlotData, updateChartPlotData,Shared_ChartBaseProp } from "./SharedObject";

class CandlestickChartTS {
//   private chartdata: ChartDataObj;
  private setupdata: SetupChart;
//   private axisChart: AxisChart;
//   private PlotDataConfig: PlotConfig;
  private svg! : d3.Selection<SVGSVGElement, any, HTMLElement, any>
  private axisarea!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  // private margin: Margin
  constructor(stockdata: ChartDataIN, targetID: string) {
    this.setupdata = SetupChart.getInstance(500, 200, { targetID: targetID });
    updateChartPlotData(arrangeData(stockdata));
    // arrangeData(stockdata)
    // this.chartdata = arrangeData(stockdata);
    // this.axisChart = AxisChart.getInstance(this.setupdata, this.chartdata);
    // this.PlotDataConfig = PlotConfig.getInstance(
    //   this.chartdata,
    //   this.axisChart
    // );


    // this.setupSVG(targetID);
    // PlotAxis.getInstance(this.svg,this.axisChart,this.PlotDataConfig,this.chartdata)
    // // this.svg=this.setupdata.setupSVG(this.svg)

    console.log(this);
    console.log(Shared_ChartPlotData)
    console.log(Shared_ChartBaseProp)
  }

  setupSVG(targetID: string) {
    const svgElementExists: boolean = d3.select(`#svg-${targetID}`).empty();
    this.svg =
      svgElementExists
        ? d3
            .select(`#${targetID}`)
            .append("svg")
            .attr("id", `svg-${targetID}`)
            .attr("width", this.setupdata.svgWidth)
            .attr("height", this.setupdata.svgHeight)
        : d3.select(`#svg-${targetID}`);

    this.svg
      .append("defs")
      .append("clipPath")
      .attr("id", `clip1-${targetID}`)
      .append("rect")
      .attr("x", this.setupdata.margin.left + this.setupdata.margin.innerLeft)
      .attr("y", this.setupdata.margin.top + this.setupdata.margin.innertop)
      .attr("width", this.setupdata.width + 0 * this.setupdata.margin.innerLeft)
      .attr("height", this.setupdata.height);

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
