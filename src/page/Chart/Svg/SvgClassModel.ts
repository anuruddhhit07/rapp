import * as d3 from "d3";

import { createGroupAdv, createMultipleSqure, enhanceGroup } from "./SVGUtility";
import { PlotStatusByButtonTag } from "../types";
import {
  Shared_ChartBaseData,
  Shared_ChartDimension,
  Shared_PlotInfo,
  Shared_yaxisProp,
} from "../BaseSetup/SharedDataUtility";

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
  Buttonpanel!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  ToolTipArea!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  BackChartGroup!:d3.Selection<SVGGElement, any, HTMLElement, any>;
  constructor() {
    const { targetID, svgWidth, svgHeight, margin, width, height } =
      Shared_ChartDimension;
    this.setupSVG();
    this.BackGroup = createGroupAdv(this.svg, "back-area").drawBorder(
      0,
      0,
      svgWidth,
      svgHeight,
      "red",
      2,
      "blue",
      0
    );

    this.BackChartGroup = createGroupAdv(this.svg, "backchart-border")
    

    this.FrontGroup = createGroupAdv(this.svg, "main-border").drawBorder(
      margin.left + margin.innerLeft,
      margin.top + margin.innerTop,
      width + margin.innerRight,
      height,
      "green",
      3,
      "yellow",
      0
    );

    this.ResetButton = createGroupAdv(this.svg, "reset-area").drawBorder(
      svgWidth - margin.right,
      svgHeight - margin.bottom,
      margin.right,
      margin.bottom,
      "red",
      2,
      "green",
      0.5
    );
    // .onEvent1("click", (event) => {
    //   // this.resetplot(event);
    // });
  }

  static getInstance(): SVGClass {
    if (!SVGClass.instance) {
      SVGClass.instance = new SVGClass();
    }
    return SVGClass.instance;
  }

  createYaxiseventArea(callback: any) {
    // const yaxistag=Shared_yaxisProp
    // console.log(numberofeventArea)
    const uniqueyaxisTag = Array.from(Shared_ChartBaseData.yaxisTag);
    const svg = this.svg; // Store a reference to this.svg
    //console.log(uniqueyaxisTag)
    //console.log(svg.selectAll(".rect.yzoom"))
    svg.selectAll(".rect.yzoom").each(function () {
      // console.log(console.log(d3.select(this).attr("class")))
      // console.log(d3.select(this).attr("class").split("yzoom-"))
      const yaxisTag = d3.select(this).attr("class").split("yzoom-")[1];
      // console.log(uniqueyaxisTag, yaxisTag); // Corrected variable name
      // console.log(this);
      if (!uniqueyaxisTag.includes(yaxisTag)) {
        // Corrected variable name
        console.log(uniqueyaxisTag, "removed-", yaxisTag);
        svg.select(`.yzoom-${yaxisTag}`).remove(); // Access svg outside the loop
      }
    });

    this.svg.selectAll(`.yzoom`).remove();
    // const uniqueyaxisTga = Array.from(Shared_ChartBaseData.yaxisTag);
    const { targetID, svgWidth, svgHeight, margin, width, height } =
      Shared_ChartDimension;
    uniqueyaxisTag.forEach((yaxistag, index) => {
      const yrange = Shared_yaxisProp[yaxistag].range;

      createGroupAdv(this.svg, `yzoom yzoom-${yaxistag}`)
        // .translate(svgWidth - margin.right, 0)
        .drawBorder(
          svgWidth - margin.right,
          yrange[1],
          margin.right,
          yrange[0] - yrange[1],
          "red",
          5,
          "green",
          0 / (index + 1)
        )
        .call(callback);
    });
    //
    // createGroupAdv(this.svg, `yzoom-${}`)
    //     .drawBorder(svgWidth - margin.right, svgHeight - margin.bottom, margin.right, margin.bottom, "red", 2, "blue", 0.2)
  }

  createbuttonpanel(
    callback: any,
    numberofbutton: number,
    buttonProp: PlotStatusByButtonTag
  ) {
    const arrayLength = Object.keys(buttonProp).length;
    // Initialize the array with false values
    const initialPlotStatusArray: boolean[] = new Array(arrayLength).fill(
      false
    );
    const buttonidarray: string[] = [];
    // Iterate over each key in the interface and set the initial value in the array
    Object.keys(buttonProp).forEach((key, index) => {
      initialPlotStatusArray[index] = buttonProp[key].plotStatus;
      buttonidarray[index] = buttonProp[key].buttonid;
    });

    // const replacingArray = Array(numberofbutton).fill(false, 0, numberofbutton-1);
    // const updatedState = [...initialPlotStatusArray, ...replacingArray.slice(initialPlotStatusArray.length)];

    const replacingifArray = Array(numberofbutton).fill(
      "no-idset",
      0,
      numberofbutton - 1
    );
    const updatedIdArray = [
      ...buttonidarray,
      ...replacingifArray.slice(buttonidarray.length),
    ];

    this.Buttonpanel = createMultipleSqure(this.svg, "top-button-panel")
      .translate(
        Shared_ChartDimension.margin.left +
          Shared_ChartDimension.margin.innerLeft,
        0
      )
      // .drawBorder(0,0,100,20,"green",3,"yellow",1)
      .createSquaresHorizontally(
        numberofbutton,
        Shared_ChartDimension.margin.top,
        2,
        initialPlotStatusArray,
        updatedIdArray
      )
      .attachClickEvent(callback);
  }

  createTooltipArea() {
    const uniqueyaxisTag = Array.from(Shared_ChartBaseData.yaxisTag);
    const uniquePlotplotName = Array.from(Shared_ChartBaseData.plotName);
    console.log(Shared_ChartBaseData)
    console.log(uniqueyaxisTag)
    this.BackChartGroup.selectAll(`.tooltip`).remove()
    uniqueyaxisTag.map(yaxistag=>{
      
      const plotnameArray=Shared_yaxisProp[yaxistag].plotname
      let index=0
      plotnameArray.forEach((pltname)=>{

        if (Shared_PlotInfo[pltname].tooltip && Shared_PlotInfo[pltname].getTooltipHTML){
          
      //   createGroupAdv(this.svg, `tooltip tooltip-${yaxistag}-${pltname}`)
      enhanceGroup(this.BackChartGroup,`tooltip tooltip-${yaxistag}-${pltname}`)
        .translate(
        Shared_ChartDimension.margin.innerLeft +
          Shared_ChartDimension.margin.left ,
        (Shared_yaxisProp[yaxistag].range[1]+Shared_ChartDimension.margin.innerTop*index)
      )
         .drawBorder(
        0,
        0,
        Shared_ChartDimension.svgWidth,
        Shared_ChartDimension.margin.innerTop,
        "red",
        2,
        "blue",
        0
      );

    }
    index++
      })
   
    })

   
  }

  setupSVG(): void {
    const { targetID, svgWidth, svgHeight, margin, width, height } =
      Shared_ChartDimension;
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
  }
}

export default SVGClass;
