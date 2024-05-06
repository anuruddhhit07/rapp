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
import { createGroup, createGroupAdv, createRect } from "./SVG/SVGUtility";

class CandlestickChartTS {
  private axisChart: AxisChart;
  private svg!: d3.Selection<SVGSVGElement, any, HTMLElement, any>;
  private axisarea!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  axisGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  AllGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
  AxisXGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  AxisYGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  constructor(stockdata: ChartDataIN, targetID: string) {
    SetupChart.getInstance(500, 500, { targetID: targetID });
    updateChartPlotData(arrangeData(stockdata));
    this.axisChart = AxisChart.getInstance();
    PlotConfig.getInstance();
    this.setupSVG();
    const {svgWidth,svgHeight,margin}=Shared_ChartBaseProp



    this.AllGroup = createGroupAdv(this.svg, "main-border")
    .drawBorder(0, 0, svgWidth, svgHeight, "red", 2,"blue",.2)

    this.AxisXGroup = createGroupAdv(this.svg, "X-Area")
    .translate(0,svgHeight-margin.bottom)
    .drawBorder(0, 0,svgWidth-margin.right, margin.bottom, "red", 2,"green",.2)

    this.AxisYGroup = createGroupAdv(this.svg, "Y-Area")
    .translate(svgWidth-margin.right,0)
    .drawBorder(0, 0,margin.right, svgHeight-margin.bottom, "red", 2,"green",.2)


    // this.axisGroup = createGroup(this.svg);
    PlotAxis.getInstance(this.AllGroup, this.axisChart);

    
    // this.drawBackGround();
  }

  drawBackGround() {
    const { margin, width, height } = Shared_ChartBaseProp;
    this.drawPlots(
      this.AllGroup,
      margin.left + margin.innerLeft,
      margin.top + margin.innerTop,
      width,
      height
    )
      .attr("fill", "blue")
      .attr("opacity", 0.1);
  }

  drawPlots(
    svggrop: d3.Selection<SVGGElement, any, HTMLElement, any>,
    x: number,
    y: number,
    width: number,
    height: number
  ): d3.Selection<SVGRectElement, any, HTMLElement, any> {
    // Example: Draw a plot
    return createRect(svggrop, x, y, width, height);
  }

  setupSVG() {
    const { targetID, svgWidth, svgHeight, margin, width, height } =
      Shared_ChartBaseProp;
    // console.log(Shared_ChartBaseProp)
    const svgElementExists: boolean = d3.select(`#svg-${targetID}`).empty();
    console.log("svgElementExists", svgElementExists);
    this.svg = svgElementExists
      ? d3
          .select(`#${targetID}`)
          .append("svg")
          .attr("id", `svg-${targetID}`)
          .attr("width", svgWidth)
          .attr("height", svgHeight)
      : d3.select(`#svg-${targetID}`);

    this.svg
      .append("rect")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", 1);

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
    // let plotGroup = createGroup(this.svg);
    // this.drawPlots(plotGroup,margin.left + margin.innerLeft,margin.top + margin.innerTop,20,50)

    // this.svg
    //   .append("rect")
    //   .attr("width", "100%")
    //   .attr("height", "100%")
    //   .style("fill", "lightblue")
    //   .style("opacity", 0.5);

    // this.axisarea = this.svg.append("g");
  }
}

export default CandlestickChartTS;
