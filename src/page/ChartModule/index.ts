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
  setYaxisRatio,
} from "./SharedObject";

class CandlestickChartTS {
  private axisChart: AxisChart;
  private svg!: d3.Selection<SVGSVGElement, any, HTMLElement, any>;
  private axisarea!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  constructor(stockdata: ChartDataIN, targetID: string) {
    SetupChart.getInstance(500, 500, { targetID: targetID });
    updateChartPlotData(arrangeData(stockdata));
    this.axisChart = AxisChart.getInstance();
    PlotConfig.getInstance();
    this.setupSVG();
    
    PlotAxis.getInstance(this.axisarea,this.axisChart);
    
    
    
    console.log(this);
    
   
  }

  setupSVG() {
    const { targetID, svgWidth, svgHeight, margin, width, height } =
      Shared_ChartBaseProp;
      // console.log(Shared_ChartBaseProp)
    const svgElementExists: boolean = d3.select(`#svg-${targetID}`).empty();
    console.log("svgElementExists",svgElementExists)
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
