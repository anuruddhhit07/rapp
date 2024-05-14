import { AxisChart } from "./AxisUtility/AxisScale";
import { PlotAxis } from "./AxisUtility/PlotAxis";
import SetupChart from "./ChartSetup/setchart";
import { PlotConfig } from "./ChartSetup/setplotConfig";
import { arrangeData } from "./dataUtility/arrangeData";
import { CandlestickData, ChartOptions, Margin, ScatterDataType } from "./types/chartSetuptype";
import { ChartDataIN, ChartDataObj } from "./types/chartdataTypes";
import * as d3 from "d3";
import { createPlotdataObj } from "./types/PlotDataUtility";
import { ProxyCallback, buildProxy } from "./types/ProxyBuilder";
import {
  // Shared_ChartPlotData,
  // updateChartPlotData,
  Shared_ChartBaseProp,
  Shared_Xscaleconfig,
  Shared_Yscaleconfig,
  Shared_DataToplot,
  setYaxisRatio,
  Shared_Yaxisrange,
  getKeysFromDataToplotKeyValue,
  groupDataByPlotType,
  updateSharedDataToplot,
} from "./SharedObject";
import {
  createClipPath,
  createGroupAdv,
  createMultipleSqure,
  createRect,
  drawBarChartOnSVG,
  drawCandlestickOnSVG,
  drawLineOnSVG,
  drawScatterPlotOnSVG,
} from "./SVG/SVGUtility";
import { yaxisrangeType } from "./types/AxisScaleType";

import { xscaleObj } from "./types/XScaleUtility";
import SVGClass from "./SVG/SvgClassModel";
import { proxiedParentObj, createChildObject, parentObj } from "./types/AdvanceObj";
import {
  Shared_ChartBaseData,
  Shared_ButtonProp,
  Shared_PlotInfo,
  collectKeysByButtonId,
  getPlotStatusByButtonTag,
  Shared_YScaleConfig,
  Shared_XScaleConfig,
  updateChartPlotData,
  Shared_ChartPlotData,
  Shared_ChartDimension,
  Shared_XYrelation,
} from "../Chart/BaseSetup/SharedDataUtility";
import proxy_plotinfo from "../Chart";
import { InitializeBaseProp } from "../Chart/BaseSetup/BaseProp";
import { UpdateXscaleconfig, UpdateYscaleconfig, drawXaxis, drawYaxis, intialRendorAxis } from "../Chart/Axis/axisPlot";

class CandlestickChartTS {
  // private axisChart: AxisChart;
  private svg!: d3.Selection<SVGSVGElement, any, HTMLElement, any>;
  private axisarea!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  private SVGClass: SVGClass;
  axisGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  BackGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
  AxisXGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  AxisYGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  PlotGroup1!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  FrontGroup!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  ResetButton!: d3.Selection<SVGGElement, any, HTMLElement, any>;
  Buttonpanel!: void;
  // plotaxis: PlotAxis;
  clipPathObj: {
    [key: keyof yaxisrangeType]: d3.Selection<SVGClipPathElement, any, HTMLElement, any>;
  } = {};

  constructor(stockdata: ChartDataIN, targetID: string) {
    SetupChart.getInstance(700, 700, { targetID: targetID });
    console.log(Shared_ChartDimension);
    updateChartPlotData(arrangeData(stockdata))
    InitializeBaseProp();
    UpdateXscaleconfig()
    UpdateYscaleconfig()
    
    console.log(Shared_ChartPlotData);
    console.log(Shared_ChartBaseData);
    // console.log(Shared_ButtonProp);
    // console.log(Shared_YScaleConfig);
    console.log(Shared_XYrelation);
    console.log(Shared_YScaleConfig)
    console.log(Shared_YScaleConfig['TR'].yscale());

    this.SVGClass = SVGClass.getInstance();
    this.svg = this.SVGClass.svg;
    const { svgWidth, svgHeight, margin, width, height } = Shared_ChartDimension;

    const numberofbutton = 6;
    this.BackGroup = this.SVGClass.BackGroup;
    this.AxisYGroup = this.SVGClass.AxisYGroup;
    this.FrontGroup = this.SVGClass.FrontGroup;
    this.ResetButton = this.SVGClass.ResetButton;
    this.Buttonpanel = this.SVGClass.createbuttonpanel(this.buttonClick.bind(this), numberofbutton, Shared_ButtonProp);

    // this.BackGroup = createGroupAdv(this.svg, "main-border").drawBorder(0, 0, svgWidth, svgHeight, "red", 2, "yellow", 0.2)

    this.FrontGroup.call(this.zoomX as any)
    this.AxisYGroup.call(this.zoomY as any)

    intialRendorAxis(this.BackGroup)

    
  }
  zoomX = d3
    .zoom()
    .scaleExtent([0.5, 30])
    .on("zoom", this.zoomedX.bind(this));

    zoomedX(event: any) {
      this.rendorAxis()
    }

    zoomY = d3
    .zoom()
    .scaleExtent([0.5, 4])
    .on("zoom", this.zoomedY.bind(this));

    zoomedY(event: any) {
      const [xmousepoint, ymousepoint] = d3.pointer(event)
      drawYaxis(this.BackGroup,this.AxisYGroup,ymousepoint)
    }
  
  // keyof typeof mapButtontoChart
  buttonClick(id: any, className: any, pressstate: any) {
    console.log(id);

    const plotarray = collectKeysByButtonId(id) as [keyof typeof Shared_ButtonProp];
    plotarray.map((toggleplot) => {
      proxy_plotinfo[toggleplot].plotStatus = pressstate;
    });

    console.log(Shared_ChartBaseData);
    console.log(Shared_YScaleConfig);
    console.log(Shared_XScaleConfig);
    console.log(Shared_XYrelation);
    this.rendorAxis()

  }

  rendorAxis(){
    // this.BackGroup.selectAll(`.axis`).remove();
    drawXaxis(this.BackGroup,this.FrontGroup)
    drawYaxis(this.BackGroup,this.AxisYGroup)
  }

}

export default CandlestickChartTS;
