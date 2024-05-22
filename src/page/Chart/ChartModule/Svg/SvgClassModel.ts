import * as d3 from "d3";

import { appendSvgElementsArray, createGroupAdv, createMultipleSqure, createSVGDefs3, enhanceGroup } from "./SVGUtility";
import { PlotStatusByButtonTag } from "../types";
import {
  Shared_ChartBaseData,
  Shared_ChartDimension,
  Shared_PlotInfo,
  Shared_yaxisProp,
} from "../BaseSetup/SharedDataUtility";
import { svgDefs } from "./svgSybolLibraray";


const trendSvg = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
  <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M18 5C17.4477 5 17 5.44772 17 6C17 6.27642 17.1108 6.52505 17.2929 6.70711C17.475 6.88917 17.7236 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5ZM15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6C21 7.65685 19.6569 9 18 9C17.5372 9 17.0984 8.8948 16.7068 8.70744L8.70744 16.7068C8.8948 17.0984 9 17.5372 9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15C6.46278 15 6.90157 15.1052 7.29323 15.2926L15.2926 7.29323C15.1052 6.90157 15 6.46278 15 6ZM6 17C5.44772 17 5 17.4477 5 18C5 18.5523 5.44772 19 6 19C6.55228 19 7 18.5523 7 18C7 17.7236 6.88917 17.475 6.70711 17.2929C6.52505 17.1108 6.27642 17 6 17Z" fill="#000000"/>
  </svg>`;

  const homesvg=`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 512 512">
  <g id="icomoon-ignore">
  </g>
  <path d="M512 295.222l-256-198.713-256 198.714v-81.019l256-198.713 256 198.714zM448 288v192h-128v-128h-128v128h-128v-192l192-144z"></path>
  </svg>`

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
      0.5,homesvg,false
    )
    // .addIconImageToRect(trendSvg)
   
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

    interface PlotData {
      plotStatus: boolean;
      plotName: string;
      buttonid: string;
    }
    
    interface GroupedData {
      [buttonid: string]: PlotData[];
    }

    const groupedData:GroupedData= {};
    for (const key in buttonProp) {
      const buttonid = buttonProp[key].buttonid;
      if (!(buttonid in groupedData)) {
        groupedData[buttonid] = [];
      }
      groupedData[buttonid].push(buttonProp[key]);
    }

    // console.log(groupedData);

    const arrayLength = Object.keys(groupedData).length;
    // console.log(arrayLength);
    // Initialize the array with false values
    const initialPlotStatusArray: boolean[] = new Array(arrayLength).fill(
      false
    );
    const buttonidarray: string[] = [];
    // Iterate over each key in the interface and set the initial value in the array
    Object.keys(groupedData).forEach((key, index) => {
      initialPlotStatusArray[index] = groupedData[key][0].plotStatus; // Assuming each group has at least one plot data object
      buttonidarray[index] = key;
    });

    // const replacingArray = Array(numberofbutton).fill(false, 0, numberofbutton-1);
    // const updatedState = [...initialPlotStatusArray, ...replacingArray.slice(initialPlotStatusArray.length)];

    const replacingifArray = Array(numberofbutton).fill(
      "no-idset",
      0,
      numberofbutton - 1
    );

// console.log(object);

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
        Shared_ChartDimension.margin.top*1.5,
        2,
        initialPlotStatusArray,
        updatedIdArray,
        ['barchart','hline','E5','Volume','CRSI','RSI','ADX','EPS']
      )
      .attachClickEvent(callback);
      
      // appendSvgElementsArray(this.svg,['icon-user','symbol1'],svgProps)
  }

  createTooltipArea() {
    const uniqueyaxisTag = Array.from(Shared_ChartBaseData.yaxisTag);
    const uniquePlotplotName = Array.from(Shared_ChartBaseData.plotName);
    // console.log(Shared_ChartBaseData)
    // console.log(uniqueyaxisTag)
    this.BackChartGroup.selectAll(`.tooltip`).remove()
    // console.log(Shared_yaxisProp);
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

      createSVGDefs3(this.svg,svgDefs)
    
  }
}

export default SVGClass;
