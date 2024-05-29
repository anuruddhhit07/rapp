import SetupChart from "../ChartModule/BaseSetup/SetupChart";
import { arrangeData } from "./DataUtility/arrangeData";

import { ChartDataIN, TrendLineDataType } from "../types";
import * as d3 from "d3";

import { createClipPath, drawCirclesOnSVG, drawTrendLineOnSVG } from "../ChartModule/Svg/SVGUtility";

import SVGClass from "../ChartModule/Svg/SvgClassModel";

import {
  Shared_ChartBaseData,
  Shared_ButtonProp,
  collectKeysByButtonId,
  Shared_YScaleConfig,
  updateChartPlotData,
  Shared_ChartDimension,
  Shared_yaxisProp,
  updateShared_YScaleConfig,
  Shared_XScaleConfig,
  Shared_ChartPlotData,
  Shared_PlotInfo,
  Shared_XYrelation,
  Shared_TrendlineData,
  getAxisKeyForRangeValue,
} from "../ChartModule/BaseSetup/SharedDataUtility";
import proxy_plotinfo from "../ChartModule/BaseSetup";
import { InitializeBaseProp } from "../ChartModule/BaseSetup/BaseProp";
import { UpdatePlotInfo, UpdateXscaleconfig, UpdateYscaleconfig, drawXaxis, drawYaxis, intialRendorAxis } from "../ChartModule/Axis/axisPlot";
import { plotonsvg, plottrendlineonsvg } from "../ChartModule/Svg/svgPlot";
import { updateTooltips } from "../ChartModule/Svg/ToolTipUtility";
import { drawCrosshair, drawtrenline } from "./Svg/CrosshairUtility";
import { DefaultChartParameter } from "../types";
import { D3DragEvent, DraggedElementBaseType } from "d3";



class CandlestickChartTS {
  // private axisChart: AxisChart;
  private svg!: d3.Selection<SVGSVGElement, any, HTMLElement, any>;
  private SVGClass: SVGClass;
  axisGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  BackGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
  AxisXGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  AxisYGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  PlotGroup1!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  FrontGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  ResetButton!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  ToolTipArea!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  BackChartGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  Buttonpanel!: void;
  livefunction: (() => void) | undefined;
  togglehzline:boolean
  drawtrendline:boolean
  dragBehavior: d3.DragBehavior<Element, unknown, unknown>;

  constructor(stockdata: ChartDataIN, targetID: string,Candlestickparamater:DefaultChartParameter) {
    SetupChart.getInstance(Candlestickparamater?.divWidth??1600, Candlestickparamater?.divHeight??800, { targetID: targetID });
    updateChartPlotData(arrangeData(stockdata));
    InitializeBaseProp();
    UpdateXscaleconfig();
    UpdateYscaleconfig();
    UpdatePlotInfo();
    //console.log(Shared_YScaleConfig)
    this.togglehzline=false
    this.drawtrendline=false

    this.livefunction=Candlestickparamater.liveFunction
    this.SVGClass = SVGClass.getInstance();
    this.svg = this.SVGClass.svg;
    // console.log(Shared_ChartPlotData)
    this.SVGClass.createYaxiseventArea(this.zoomY);
    const numberofbutton = 11;
    this.BackGroup = this.SVGClass.BackGroup;

    this.FrontGroup = this.SVGClass.FrontGroup;
    this.ResetButton = this.SVGClass.ResetButton;
    this.BackChartGroup = this.SVGClass.BackChartGroup;
    // console.log(Shared_ButtonProp);
    this.Buttonpanel = this.SVGClass.createbuttonpanel(this.buttonClick.bind(this), numberofbutton, Shared_ButtonProp);
    this.SVGClass.createTooltipArea();
    this.ToolTipArea = this.SVGClass.ToolTipArea;

    this.FrontGroup.call(this.zoomX as any);
    this.FrontGroup.on("dblclick.zoom", null);
    this.FrontGroup.onEvent1("mousemove", (event: MouseEvent) => {
      // console.log(event)
      this.mousemovevent(event);
    });

    this.FrontGroup.onEvent1("mouseout", (event: MouseEvent) => {
      // console.log(event)
      // this.mousemovevent(event);
      // console.log("out");
      this.mouseoutvent(event);
    });

    this.FrontGroup.onEvent1("click", (event: MouseEvent) => {
      // Handle click event here
      // For example:
      // console.log("Click event:", event);
      this.clickEvent(event);
    });

    this.dragBehavior = d3
      .drag()
      .on("start", this.handleDragStart.bind(this))
      .on("drag", this.handleDrag.bind(this))
      .on("end", this.handleDragEnd.bind(this));

    intialRendorAxis(this.BackGroup, this.FrontGroup);
    this.rendorPlot();
    this.ResetButton.onEvent1("click", (event) => {
      this.resetplot(event);
    });
  }
  zoomX = d3.zoom().scaleExtent([0.5, 70]).on("zoom", this.zoomedX.bind(this));

  zoomedX(event: any) {
    const [x, y] = d3.pointer(event)
    this.rendorAxis();
    this.rendorPlot();
    this.handleTooltipAndCrosshair(x, y)
  }

  zoomY = d3.zoom().scaleExtent([0.5, 4]).on("zoom", this.zoomedY.bind(this));

  zoomedY(event: any) {
    const [xmousepoint, ymousepoint] = d3.pointer(event);
    //console.log("main1",main1)
    drawYaxis(this.BackGroup, this.svg, ymousepoint);
    this.rendorPlot();
  }

  dbClicktoDelete= (event: any) => {
    // console.log("targetElement", event);
    // const targetElement = d3.select((this.dragBehavior as any).activeElement);
    // console.log("targetElement", targetElement,targetElement1);
    const targetElement = d3.select(event.target);
    var point_id = targetElement.attr("Line_Point");
    const selectedLine_ID = targetElement.attr("Line_ID");

    // console.log(selectedLine_ID,point_id);

    const asscociateindex = this.getIndexForName(
      selectedLine_ID,
      Shared_TrendlineData
    );
    Shared_TrendlineData.splice(asscociateindex, 1);
    this.plottrendlineonsvgmid()
  }

  plottrendlineonsvgmid(){
    plottrendlineonsvg(this.FrontGroup,this.FrontGroup,this.dragBehavior,this.togglehzline,this.dbClicktoDelete)
  }

  handleDragStart = (event: D3DragEvent<SVGCircleElement, unknown, SVGCircleElement>) => {
    const targetElement = event.sourceEvent.target;
    (this.dragBehavior as any).activeElement = targetElement;
    d3.select(targetElement).style("fill", "yellow");
};

  handleDrag = (event: { sourceEvent: { target: any; }; }) => {
    // console.log("drag start", event, this);
    // const targetElement = event.sourceEvent.target;
    const targetElement = d3.select((this.dragBehavior as any).activeElement);
    // console.log("targetElement", targetElement,targetElement1);

    var point_id = targetElement.attr("Line_Point");
    const selectedLine_ID = targetElement.attr("Line_ID");

    // console.log(selectedLine_ID,point_id);

    const asscociateindex = this.getIndexForName(
      selectedLine_ID,
      Shared_TrendlineData
    );

    const lineyaxistag=Shared_TrendlineData[asscociateindex].yaxiastag
    
    // console.log(asscociateindex,lineyaxistag);
    const targetelemmt=d3.select(".main-border-border").node();
    const [x, y] = d3.pointer(event,targetelemmt);

    const currentTransform = this.FrontGroup.property('__zoom');
    const zoomXscaleAxis = 'bot';
    const currentXscale = currentTransform.rescaleX(Shared_XScaleConfig[zoomXscaleAxis].xscale().XSCALE);

    // Calculate x value and index
    const xValue = currentXscale.invert(x);

    // let index = Math.round(xValue) < 0 ? 0 : Math.round(xValue) > Shared_ChartPlotData[Shared_XScaleConfig[zoomXscaleAxis].xscaleDataTag].length - 1
    //     ? Shared_ChartPlotData[Shared_XScaleConfig[zoomXscaleAxis].xscaleDataTag].length - 1 : Math.round(xValue);

    // Get the corresponding y-axis tag and value string
    const tagyaxis = getAxisKeyForRangeValue(y);
    if (tagyaxis !== '1main' && tagyaxis) {
      // Your code here
      return
  }
    let valuestring = "";
    let yvalue:number=NaN
    let yscale:d3.ScaleLinear<number, number, never>
    if (tagyaxis) {
        const yscaletag = Shared_yaxisProp[tagyaxis].yscaleTag;
        // valuestring = Shared_YScaleConfig[yscaletag[0]].yscale().YSCALE?.invert(y).toFixed(2) as string;
        // yvalue=Shared_YScaleConfig[yscaletag[0]].yscale().YSCALE?.invert(y) as number
        // yscale=Shared_YScaleConfig[yscaletag[0]].yscale().YSCALE as d3.ScaleLinear<number, number, never>
        const yscale=Shared_YScaleConfig[yscaletag[0]].yscale().TranSFormedYscale  as d3.ScaleLinear<number, number, never>
        yvalue=yscale.invert(y) as number

    }




    const newx = currentXscale.invert(x);
    const newy = yvalue;
    // console.log(newx, newy);

    if (point_id == '1') {
      if (!Number.isNaN(newx) && !Number.isNaN(newy)) {
        Shared_TrendlineData[asscociateindex].x1 = newx;
        Shared_TrendlineData[asscociateindex].y1 = newy;
      } else {
        // Handle the case where newx or newy is null
        // For example:
        console.error("newx or newy is null");
      }
    }

    if (point_id == "2") {
      if (!Number.isNaN(newx) && !Number.isNaN(newy)) {
        Shared_TrendlineData[asscociateindex].x2 = newx;
        Shared_TrendlineData[asscociateindex].y2 = newy;
      } else {
        // Handle the case where newx or newy is null
        // For example:
        console.error("newx or newy is null");
      }
    }

    plottrendlineonsvg(this.FrontGroup,this.FrontGroup,this.dragBehavior,this.togglehzline,this.dbClicktoDelete)
    
    // this.FrontGroup.selectAll(`.trendlineplot`).remove();
    // Shared_TrendlineData.forEach((config) => {
      
    //   // if (config.plot) {
    //     // if (yscale){
    //       const {name, x1, y1,x2, y2,yaxiastag}=config
    //       drawTrendLineOnSVG(this.FrontGroup,[x1,x2],[y1,y2],currentXscale,yscale,name,yaxiastag,'red',this.dragBehavior);
    //     // }
       
    //   // }
    // });
   


  };

  handleDragEnd = (event: { sourceEvent: { target: any; }; }) => {
    // console.log("drag start", event, this);
    const targetElement = event.sourceEvent.target;
    // console.log("targetElement", targetElement);
    (this.dragBehavior as any).activeElement = targetElement;
    d3.select(targetElement).style("fill", "blue");
  };

  

  // keyof typeof mapButtontoChart
  buttonClick(id: any, className: any, pressstate: any) {
    // console.log(id);

    const plotarray = collectKeysByButtonId(id) as [keyof typeof Shared_ButtonProp];
    
    plotarray.map((toggleplot) => {
      proxy_plotinfo[toggleplot].plotStatus = pressstate;
    });

    console.log(pressstate);

    if (id=='liverubfn'){
      if (this.livefunction){
        this.livefunction()
      }
    }

    if (id=='drawhzbtn'){
      // if (this.livefunction){
      //   this.livefunction()
      // }
      // console.log("drawhzbtn");

      this.drawtrendline=pressstate
      // console.log(this.drawtrendline);
      if (pressstate==true){
        this.togglehzline=pressstate
      }
    }


    if (id=='viewhzline'){
        //  const trendlines = d3.selectAll(".trendlineplot");
        this.togglehzline=pressstate
    }

    this.SVGClass.createYaxiseventArea(this.zoomY);
    this.SVGClass.createTooltipArea();
    this.rendorAxis();
    this.rendorPlot();


    // console.log(Shared_yaxisProp);
  }

  rendorAxis() {
    // this.BackGroup.selectAll(`.axis`).remove();
    
    drawXaxis(this.BackGroup, this.FrontGroup);
    drawYaxis(this.BackGroup, this.svg);
  }

  isMouseInsideFrontGroup(x: number, y: number): boolean | undefined {
    // Get FrontGroup element dimensions
    const frontGroupRect = this.FrontGroup.node()?.getBoundingClientRect();
    // console.log(frontGroupRect);

    // Check if mouse coordinates are inside FrontGroup
    return frontGroupRect && x >= frontGroupRect.left && x <= frontGroupRect.right && y >= frontGroupRect.top && y <= frontGroupRect.bottom;
  }

  mouseoutvent(event: MouseEvent) {
    // const [x, y] = d3.pointer(event)
    this.svg.selectAll(`.tooltip`).style("display", "none");
    this.BackGroup.selectAll(".crosshair").style("display", "none");
   
  }
  mousemovevent(event: MouseEvent) {
    const { width, height, margin, svgWidth } = Shared_ChartDimension;
   
    const targetelemmt=d3.select(".main-border-border").node();
    const [x, y] = d3.pointer(event,targetelemmt);
   
    // console.log("in");
    this.handleTooltipAndCrosshair(x, y)
  }
  clickEvent(event: MouseEvent) {
    const { width, height, margin, svgWidth } = Shared_ChartDimension;
    const targetelemmt=d3.select(".main-border-border").node();
    const [x, y] = d3.pointer(event,targetelemmt);
    const currentTransform = this.FrontGroup.property('__zoom');
    const zoomXscaleAxis = 'bot';
    const currentXscale = currentTransform.rescaleX(Shared_XScaleConfig[zoomXscaleAxis].xscale().XSCALE);

    // Calculate x value and index
    const xValue = currentXscale.invert(x);
    let index = Math.round(xValue) < 0 ? 0 : Math.round(xValue) > Shared_ChartPlotData[Shared_XScaleConfig[zoomXscaleAxis].xscaleDataTag].length - 1
        ? Shared_ChartPlotData[Shared_XScaleConfig[zoomXscaleAxis].xscaleDataTag].length - 1 : Math.round(xValue);
    // Get the corresponding y-axis tag and value string
    const tagyaxis = getAxisKeyForRangeValue(y);
    // console.log("this.drawtrendline",this.drawtrendline)
    if (tagyaxis !== '1main' && tagyaxis || !this.drawtrendline) {
      // Your code here
      return
  }
    let valuestring = "";
    let yvalue:number=NaN
    // let yscale:d3.ScaleLinear<number, number, never>
    if (tagyaxis) {
        const yscaletag = Shared_yaxisProp[tagyaxis].yscaleTag;
        valuestring = Shared_YScaleConfig[yscaletag[0]].yscale().YSCALE?.invert(y).toFixed(2) as string;
        // yvalue=Shared_YScaleConfig[yscaletag[0]].yscale().YSCALE?.invert(y) as number
        // yscale=Shared_YScaleConfig[yscaletag[0]].yscale().YSCALE as d3.ScaleLinear<number, number, never>
        const yscale=Shared_YScaleConfig[yscaletag[0]].yscale().TranSFormedYscale  as d3.ScaleLinear<number, number, never>
        yvalue=yscale.invert(y) as number
    }

   

    let x1=currentXscale.domain()[0]
    let x2=currentXscale.domain()[1]
    let y1=yvalue
    let y2=yvalue
    let newKey = this.getNextName(Shared_TrendlineData);
    Shared_TrendlineData.push({name:newKey,x1:x1,y1:y1,x2:x2,y2:y2,yaxiastag:tagyaxis?tagyaxis:"noyaxistag"})
    plottrendlineonsvg(this.FrontGroup,this.FrontGroup,this.dragBehavior,this.togglehzline,this.dbClicktoDelete)
  }



  getNextName(existingNames:TrendLineDataType):string {
    let maxIndex = -1;
  
    // Loop through existing names to find the highest index
    existingNames.forEach((item: { name: string; }) => {
      const index = parseInt(item.name.split("_")[1]);
      if (index > maxIndex) {
        maxIndex = index;
      }
    });
  
    // Increment the highest index by 1
    const nextIndex = maxIndex + 1;
  
    // Construct the new name
    const nextName = "tr_" + nextIndex;
  
    return nextName;
  }

  getIndexForName(name:string, dataArray:TrendLineDataType) {
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].name === name) {
        return i;
      }
    }
    return -1; // Return -1 if the name is not found
  }
  
  // getIndexesByValues(array, values) {
  //   let indexes = [];
  //   values.forEach((value) => {
  //     let index = array.indexOf(value);
  //     indexes.push(index);
  //   });
  //   return indexes;
  // }

 handleTooltipAndCrosshair(x: d3.NumberValue, y: number) {
    // Display tooltip and crosshair elements
    this.svg.selectAll('.tooltip').style('display', 'block');
    this.BackGroup.selectAll('.crosshair').style('display', 'block');
    // this.svg.selectAll(`.trendlineplot`).style("display", "block");
    // Get current zoom transform
    const currentTransform = this.FrontGroup.property('__zoom');
    const zoomXscaleAxis = 'bot';
    const currentXscale = currentTransform.rescaleX(Shared_XScaleConfig[zoomXscaleAxis].xscale().XSCALE);

    // Calculate x value and index
    const xValue = currentXscale.invert(x);
    let index = Math.round(xValue) < 0 ? 0 : Math.round(xValue) > Shared_ChartPlotData[Shared_XScaleConfig[zoomXscaleAxis].xscaleDataTag].length - 1
        ? Shared_ChartPlotData[Shared_XScaleConfig[zoomXscaleAxis].xscaleDataTag].length - 1 : Math.round(xValue);

    // Get the corresponding y-axis tag and value string
    const tagyaxis = getAxisKeyForRangeValue(y);
    let valuestring = "";
    if (tagyaxis) {
        const yscaletag = Shared_yaxisProp[tagyaxis].yscaleTag;
        valuestring = Shared_YScaleConfig[yscaletag[0]].yscale().YSCALE?.invert(y).toFixed(2) as string;
    }

    // Update tooltips and draw crosshair
    updateTooltips(this.svg, index);
    drawCrosshair({
        BackGroup: this.BackGroup,
        index: index,
        y: y,
        valuestring: valuestring,
        currentXscale: currentXscale,
    });
}

  
  rendorPlot() {
    this.getclippath();
    plotonsvg(this.BackGroup, this.FrontGroup, this.AxisYGroup);
    plottrendlineonsvg(this.FrontGroup,this.FrontGroup,this.dragBehavior,this.togglehzline,this.dbClicktoDelete)
  }

  resetplot(event: any) {
    this.FrontGroup.call(this.zoomX.transform as any, d3.zoomIdentity);
    const yscaleTagSet = Array.from(Shared_ChartBaseData.yscaleTag);
    yscaleTagSet.map((scaletag) => {
      const scaleconfig = Shared_YScaleConfig[scaletag];
      this.svg.select(`.yzoom-${scaleconfig.yaxisTag}`).call(this.zoomY.transform as any, d3.zoomIdentity);
      updateShared_YScaleConfig(scaleconfig.yscaleTag, {
        yzoomtransform: d3.zoomIdentity,
      });
    });

    this.rendorAxis();
    this.rendorPlot();
  }

  getclippath() {
    //this.svg.select("defs").selectAll("*").remove();
    this.svg.selectAll(".clipplot").remove();
    const yaxistags = Array.from(Shared_ChartBaseData.yaxisTag);
    yaxistags.map((yaxistag) => {
      // console.log(Shared_yaxisProp[yaxistag].range);
      const { range } = Shared_yaxisProp[yaxistag];
      createClipPath(
        this.svg,
        `clip-${yaxistag}`,
        Shared_ChartDimension.margin.left + Shared_ChartDimension.margin.innerLeft,
        range[1],
        Shared_ChartDimension.width + Shared_ChartDimension.margin.innerRight,
        range[0] - range[1]
      );
    });
  }
  updatechart(stockdata: ChartDataIN){
    // console.log(stockdata.histdata.length);
    updateChartPlotData(arrangeData(stockdata));
    // console.log(Shared_ChartPlotData);
    this.rendorAxis();
    this.rendorPlot();
    

  }

}

export default CandlestickChartTS;
