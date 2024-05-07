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
  Shared_Yaxisrange,
  getKeysFromDataToplotKeyValue,
  groupDataByPlotType,
} from "./SharedObject";
import { createClipPath, createGroup, createGroupAdv, createRect, drawLineOnSVG } from "./SVG/SVGUtility";
import { yaxisrangeType } from "./types/AxisScaleType";

class CandlestickChartTS {
  private axisChart: AxisChart;
  private svg!: d3.Selection<SVGSVGElement, any, HTMLElement, any>;
  private axisarea!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  axisGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  BackGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
  AxisXGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  AxisYGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  PlotGroup1!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  FrontGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  plotaxis: PlotAxis;
  clipPathObj: { [key: keyof yaxisrangeType]: d3.Selection<SVGClipPathElement, any, HTMLElement, any> } = {};

  constructor(stockdata: ChartDataIN, targetID: string) {
    SetupChart.getInstance(500, 500, { targetID: targetID });
    updateChartPlotData(arrangeData(stockdata));
    this.axisChart = AxisChart.getInstance();
    PlotConfig.getInstance();
    this.setupSVG();
    const { svgWidth, svgHeight, margin, width, height } = Shared_ChartBaseProp;

    this.BackGroup = createGroupAdv(this.svg, "main-border").drawBorder(0, 0, svgWidth, svgHeight, "red", 2, "blue", 0.2);
    // .call(this.zoomX as any)
    // .onEvent1("mousemove", (event) => {
    //   this.mousefunction(event)
    //  })

    this.AxisXGroup = createGroupAdv(this.svg, "X-Area")
      .translate(0, svgHeight - margin.bottom)
      .drawBorder(0, 0, svgWidth - margin.right, margin.bottom, "red", 2, "green", 0.2);

    this.AxisYGroup = createGroupAdv(this.svg, "Y-Area")
      .translate(svgWidth - margin.right, 0)
      .drawBorder(0, 0, margin.right, svgHeight - margin.bottom, "red", 2, "green", 0.2)
      .call(this.zoomY as any);

    this.plotaxis = PlotAxis.getInstance(this.BackGroup, this.axisChart);
    // createClipPath
    console.log("Shared_yaxisrange", Shared_Yaxisrange, Object.entries(Shared_Yaxisrange));
    for (const [yaxistag, plotGroupData] of Object.entries(Shared_Yaxisrange)) {
      const { range, borderColor, borderWidth, fill, opacity } = plotGroupData;
      createClipPath(this.svg, `clip-${yaxistag}`, margin.left + margin.innerLeft, range[1], width + margin.innerRight, range[0] - range[1]);
    }

    console.log(this.clipPathObj);
    // for (const [plotGroupName, plotGroupData] of Object.entries(Shared_Yaxisrange)) {
    //   const { range, borderColor, borderWidth, fill, opacity } = plotGroupData;
    //   console.log(fill);
    //   // Create the plot group dynamically
    //   const plotGroup = createGroupAdv(this.svg, `plotaclass-${plotGroupName}`)
    //     .translate(0, 0)
    //     .drawBorder(margin.left+margin.innerLeft, range[1], width+margin.innerRight, range[0] - range[1], borderColor, borderWidth, fill, opacity)
    // }

    this.FrontGroup = createGroupAdv(this.svg, "main-border")
      .drawBorder(margin.left + margin.innerLeft, margin.top + margin.innerTop, width + margin.innerRight, height, "red", 2, "blue", 0)
      .call(this.zoomX as any)
      .onEvent1("mousemove", (event) => {
        this.mousefunction(event);
      });

    this.rendorPlot();
  }

  zoomX = d3
    .zoom()
    .scaleExtent([0.5, 10])
    .translateExtent([
      [-Shared_ChartBaseProp.width / 2, -0*Shared_ChartBaseProp.height / 2],
      [Shared_ChartBaseProp.width + Shared_ChartBaseProp.width / 2, 0*Shared_ChartBaseProp.height],
    ])
    .extent([
      [0, 0],
      [Shared_ChartBaseProp.width, 0],
    ])
    .on("zoom", this.zoomedX.bind(this));

  zoomedX(event: any) {
    // console.log(event)
    // const transform = event.transform;
    const [x, y] = d3.pointer(event);
    const currentTransformX: d3.ZoomTransform = event.transform;
    // console.log(`Group zoom! at zoomxgroup:${x},y:${y},transform:${currentTransformX} `);
    this.plotaxis.updateXaxis(currentTransformX);
    this.rendorPlot();
  }

  zoomY = d3
    .zoom()
    .scaleExtent([0.5, 1])
    // .translateExtent([
    //   [-Shared_ChartBaseProp.width / 2, -Shared_ChartBaseProp.height / 2],
    //   [Shared_ChartBaseProp.width + Shared_ChartBaseProp.width / 2, Shared_ChartBaseProp.height],
    // ])
    // .extent([
    //   [0, 0],
    //   [Shared_ChartBaseProp.width, Shared_ChartBaseProp.height],
    // ])
    .on("zoom", this.zoomedY.bind(this));

  zoomedY(event: any) {
    // console.log(event)
    // const transform = event.transform;
    const [xmousepoint, ymousepoint] = d3.pointer(event);
    const currentTransformY: d3.ZoomTransform = event.transform;

    // console.log("new currentTransformY",currentTransformY);

    // const currentTransformYy = this.AxisYGroup.property("__zoom");
    //  console.log("old currentTransformY",currentTransformYy);

    // console.log(`Group zoom! at zoomxgroup:${xmousepoint},y:${ymousepoint},transform:${currentTransformY} `);
    this.plotaxis.updateYaxis(currentTransformY, xmousepoint, ymousepoint);
    this.rendorPlot();
  }

  rendorPlot() {
    const groupedplotData = groupDataByPlotType();
    // console.log("groupplot", groupedplotData);

    // console.log(Shared_DataToplot["ClosePlot"]);

    // 

    for (let plotType in groupedplotData) {
      if (Object.prototype.hasOwnProperty.call(groupedplotData, plotType)) {
        // console.log(`Plot Type: ${plotType}`);

        if (plotType == "line1") {
          this.BackGroup.selectAll(`.lineplot`).remove();
          // Loop through the keys corresponding to the current plot type
          groupedplotData[plotType].forEach((PlotName) => {
            // console.log(`Key: ${PlotName}`);
            // console.log(object);
            // Access the data object using the key
            const plotstatus = Shared_DataToplot[PlotName].plotstatus;

            if (!plotstatus) return;

            this.drawPlotLineByName(PlotName, this.BackGroup);

            // Do something with the data object
          });
        }
      }
    }
  }

  drawPlotLineByName(plotName: string, PlotGroupArea: d3.Selection<SVGGElement, any, HTMLElement, any>) {
    const XDATA = Shared_DataToplot[plotName].xdata();
    const YDATA = Shared_DataToplot[plotName].ydata();
    let plotColor=Shared_DataToplot[plotName].plotcolor
    const currentTransformX = Shared_Xscaleconfig[Shared_DataToplot[plotName].xscaletag].currentTransformX;
    const currentTransformY = Shared_Yscaleconfig[Shared_DataToplot[plotName].yscaletag].currentTransformY;
    const xScale = Shared_Xscaleconfig[Shared_DataToplot[plotName].xscaletag].Xscale as d3.ScaleLinear<number, number>;
    const yScale = Shared_Yscaleconfig[Shared_DataToplot[plotName].yscaletag].Yscale as d3.ScaleLinear<number, number>;

    let newxScale = currentTransformX.rescaleX(xScale);
    let newyScale = currentTransformY.rescaleY(yScale);
    
    const yaxistag = Shared_Yscaleconfig[Shared_DataToplot[plotName].yscaletag].yaxistag;

    drawLineOnSVG(PlotGroupArea, XDATA as number[], YDATA as number[], newxScale, newyScale, plotName, yaxistag,plotColor);
  }

  dbclickedfunction(event: any) {
    console.log(this);
    const [x, y] = d3.pointer(event, this.BackGroup);
    // console.log(`Group clicked! at dbclickedfunctionx:${x},y:${y} `);
  }

  mousefunction(event: any) {
    const [x, y] = d3.pointer(event);
    // console.log(`Group mousemove! at mousefunction:${x},y:${y} `);
  }

  drawBackGround() {
    const { margin, width, height } = Shared_ChartBaseProp;
    this.drawPlots(this.BackGroup, margin.left + margin.innerLeft, margin.top + margin.innerTop, width, height)
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
    const { targetID, svgWidth, svgHeight, margin, width, height } = Shared_ChartBaseProp;
    // console.log(Shared_ChartBaseProp)
    const svgElementExists: boolean = d3.select(`#svg-${targetID}`).empty();
    console.log("svgElementExists", svgElementExists);
    this.svg = svgElementExists
      ? d3.select(`#${targetID}`).append("svg").attr("id", `svg-${targetID}`).attr("width", svgWidth).attr("height", svgHeight)
      : d3.select(`#svg-${targetID}`);

    this.svg.append("rect").attr("width", svgWidth).attr("height", svgHeight).style("fill", "none").style("stroke", "black").style("stroke-width", 1);

    this.svg
      .append("defs")
      .append("clipPath")
      .attr("id", `clip1-${targetID}`)
      .append("rect")
      .attr("x", margin.left + margin.innerLeft)
      .attr("y", margin.top + margin.innerTop)
      .attr("width", width + 0 * margin.innerLeft)
      .attr("height", height);
  }
}

export default CandlestickChartTS;
