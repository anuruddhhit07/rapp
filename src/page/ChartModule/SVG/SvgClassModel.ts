import * as d3 from "d3";
import { Shared_ChartBaseProp } from "../SharedObject";
import { createGroupAdv, createMultipleSqure } from "./SVGUtility";

class SVGClass {
  private static instance: SVGClass | null = null;
  svg!: d3.Selection<SVGSVGElement, any, HTMLElement, any>;
  axisGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  BackGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
  AxisXGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  AxisYGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  PlotGroup1!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  FrontGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  ResetButton!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  Buttonpanel!:d3.Selection<SVGGElement, any, HTMLElement, any>;
  constructor() {
    const { targetID, svgWidth, svgHeight, margin, width, height } = Shared_ChartBaseProp;
    this.setupSVG();
    this.BackGroup = createGroupAdv(this.svg, "main-border").drawBorder(0, 0, svgWidth, svgHeight, "red", 2, "blue", 0.2);
    this.AxisYGroup = createGroupAdv(this.svg, "Y-Area")
      .translate(svgWidth - margin.right, 0)
      .drawBorder(0, 0, margin.right, svgHeight - margin.bottom, "red", 2, "green", 0.2);
    this.FrontGroup = createGroupAdv(this.svg, "main-border").drawBorder(
      margin.left + margin.innerLeft,
      margin.top + margin.innerTop,
      width + margin.innerRight,
      height,
      "red",
      2,
      "blue",
      0
    );

    this.ResetButton = createGroupAdv(this.svg, "reset-area")
      .drawBorder(svgWidth - margin.right, svgHeight - margin.bottom, margin.right, margin.bottom, "red", 2, "blue", 0.2)
      .onEvent1("click", (event) => {
        // this.resetplot(event);
      });

      
  }


  static getInstance(): SVGClass {
    if (!SVGClass.instance) {
      SVGClass.instance = new SVGClass();
    }
    return SVGClass.instance;
  }

  
  createbuttonpanel(callback :any){
    this.Buttonpanel=createMultipleSqure(this.svg, "top-button-panel")
    .translate(100, 30)
    // .drawBorder(0,0,100,20,"green",3,"yellow",1)
    .createSquaresHorizontally(6, 30, 2, Array(6).fill(true, 0, 5))
    .attachClickEvent(callback);
  }

  setupSVG(): void {
    const { targetID, svgWidth, svgHeight, margin, width, height } = Shared_ChartBaseProp;
    const svgElementExists: boolean = d3.select(`#svg-${targetID}`).empty();
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

export default SVGClass;
