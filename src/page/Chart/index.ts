import SetupChart from "../Chart/BaseSetup/SetupChart";
import { arrangeData } from "./DataUtility/arrangeData";

import { ChartDataIN } from "../Chart/BaseSetup/chartdataTypes";
import * as d3 from "d3";

import { createClipPath } from "../Chart/Svg/SVGUtility";

import SVGClass from "../Chart/Svg/SvgClassModel";

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
  getAxisKeyForRangeValue,
} from "../Chart/BaseSetup/SharedDataUtility";
import proxy_plotinfo from "../Chart/BaseSetup";
import { InitializeBaseProp } from "../Chart/BaseSetup/BaseProp";
import { UpdatePlotInfo, UpdateXscaleconfig, UpdateYscaleconfig, drawXaxis, drawYaxis, intialRendorAxis } from "../Chart/Axis/axisPlot";
import { plotonsvg } from "../Chart/Svg/svgPlot";
import { updateTooltips } from "../Chart/Svg/ToolTipUtility";
import { drawCrosshair } from "./Svg/CrosshairUtility";
import { DefaultChartParameter } from "./types";


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

  constructor(stockdata: ChartDataIN, targetID: string,Candlestickparamater:DefaultChartParameter) {
    SetupChart.getInstance(Candlestickparamater?.divWidth??1600, Candlestickparamater?.divHeight??800, { targetID: targetID });
    updateChartPlotData(arrangeData(stockdata));
    InitializeBaseProp();
    UpdateXscaleconfig();
    UpdateYscaleconfig();
    UpdatePlotInfo();
    //console.log(Shared_YScaleConfig)

    this.SVGClass = SVGClass.getInstance();
    this.svg = this.SVGClass.svg;
    // console.log(Shared_yaxisProp)
    this.SVGClass.createYaxiseventArea(this.zoomY);
    const numberofbutton = 6;
    this.BackGroup = this.SVGClass.BackGroup;

    this.FrontGroup = this.SVGClass.FrontGroup;
    this.ResetButton = this.SVGClass.ResetButton;
    this.BackChartGroup = this.SVGClass.BackChartGroup;
    this.Buttonpanel = this.SVGClass.createbuttonpanel(this.buttonClick.bind(this), numberofbutton, Shared_ButtonProp);
    this.SVGClass.createTooltipArea();
    this.ToolTipArea = this.SVGClass.ToolTipArea;

    this.FrontGroup.call(this.zoomX as any);
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

    intialRendorAxis(this.BackGroup, this.FrontGroup);
    this.rendorPlot();
    this.ResetButton.onEvent1("click", (event) => {
      this.resetplot(event);
    });
  }
  zoomX = d3.zoom().scaleExtent([0.5, 70]).on("zoom", this.zoomedX.bind(this));

  zoomedX(event: any) {
    this.rendorAxis();
    this.rendorPlot();
  }

  zoomY = d3.zoom().scaleExtent([0.5, 4]).on("zoom", this.zoomedY.bind(this));

  zoomedY(event: any) {
    const [xmousepoint, ymousepoint] = d3.pointer(event);
    //console.log("main1",main1)
    drawYaxis(this.BackGroup, this.svg, ymousepoint);
    this.rendorPlot();
  }

  // keyof typeof mapButtontoChart
  buttonClick(id: any, className: any, pressstate: any) {
    //console.log(id);

    const plotarray = collectKeysByButtonId(id) as [keyof typeof Shared_ButtonProp];
    plotarray.map((toggleplot) => {
      proxy_plotinfo[toggleplot].plotStatus = pressstate;
    });
    this.SVGClass.createYaxiseventArea(this.zoomY);
    this.SVGClass.createTooltipArea();
    this.rendorAxis();
    this.rendorPlot();

    console.log(Shared_yaxisProp);
  }

  rendorAxis() {
    // this.BackGroup.selectAll(`.axis`).remove();
    
    drawXaxis(this.BackGroup, this.FrontGroup);
    drawYaxis(this.BackGroup, this.svg);
  }

  isMouseInsideFrontGroup(x: number, y: number): boolean | undefined {
    // Get FrontGroup element dimensions
    const frontGroupRect = this.FrontGroup.node()?.getBoundingClientRect();
    console.log(frontGroupRect);

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
    const [x, y] = d3.pointer(event);
    // console.log("in");
    this.svg.selectAll(`.tooltip`).style("display", "block");
    this.BackGroup.selectAll(".crosshair").style("display", "block");
    const currentTransform = this.FrontGroup.property("__zoom");
    const zoomXscaleAxis = "bot";
    const currentXscale = currentTransform.rescaleX(Shared_XScaleConfig[zoomXscaleAxis].xscale().XSCALE);
    const xValue = currentXscale.invert(x);
    let index =
      Math.round(xValue) < 0
        ? 0
        : Math.round(xValue) > Shared_ChartPlotData[Shared_XScaleConfig[zoomXscaleAxis].xscaleDataTag].length - 1
        ? Shared_ChartPlotData[Shared_XScaleConfig[zoomXscaleAxis].xscaleDataTag].length - 1
        : Math.round(xValue);

    const tagyaxis = getAxisKeyForRangeValue(y);
    
    let valuestring = "";
    if (tagyaxis) {
      const yscaletag = Shared_yaxisProp[tagyaxis].yscaleTag;
      valuestring = Shared_YScaleConfig[yscaletag[0]].yscale().YSCALE?.invert(y).toFixed(2) as string;
      // console.log(AA);
    }

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
    this.svg.select("defs").selectAll("*").remove();
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
}

export default CandlestickChartTS;
