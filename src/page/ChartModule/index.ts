
import SetupChart from "./ChartSetup/SetupChart";
import { arrangeData } from "./dataUtility/arrangeData";

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
} from "../Chart/BaseSetup/SharedDataUtility";
import proxy_plotinfo from "../Chart";
import { InitializeBaseProp } from "../Chart/BaseSetup/BaseProp";
import {
  UpdateXscaleconfig,
  UpdateYscaleconfig,
  drawXaxis,
  drawYaxis,
  intialRendorAxis,
} from "../Chart/Axis/axisPlot";
import { plotonsvg } from "../Chart/Svg/svgPlot";
import { yaxisType } from "../Chart/BaseSetup/ShareDataType";

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
  Buttonpanel!: void;
  // plotaxis: PlotAxis;
  clipPathObj: {
    [key: keyof yaxisType]: d3.Selection<
      SVGClipPathElement,
      any,
      HTMLElement,
      any
    >;
  } = {};

  constructor(stockdata: ChartDataIN, targetID: string) {
    SetupChart.getInstance(500, 500, { targetID: targetID });
    updateChartPlotData(arrangeData(stockdata));
    InitializeBaseProp();
    UpdateXscaleconfig();
    UpdateYscaleconfig();
    //console.log(Shared_YScaleConfig)

    this.SVGClass = SVGClass.getInstance();
    this.svg = this.SVGClass.svg;
   // console.log(Shared_yaxisProp)
    this.SVGClass.createYaxiseventArea(this.zoomY)
    const numberofbutton = 6;
    this.BackGroup = this.SVGClass.BackGroup;
    // this.AxisYGroup = this.SVGClass.AxisYGroup;
    this.FrontGroup = this.SVGClass.FrontGroup;
    this.ResetButton = this.SVGClass.ResetButton;
    this.Buttonpanel = this.SVGClass.createbuttonpanel(
      this.buttonClick.bind(this),
      numberofbutton,
      Shared_ButtonProp
    );

    this.FrontGroup.call(this.zoomX as any);
    

    intialRendorAxis(this.BackGroup, this.FrontGroup);
    this.rendorPlot();
    this.ResetButton.onEvent1("click", (event) => {
      this.resetplot(event);
    });
  }
  zoomX = d3.zoom().scaleExtent([0.5, 30]).on("zoom", this.zoomedX.bind(this));

  zoomedX(event: any) {
    this.rendorAxis();
    this.rendorPlot();
  }

  zoomY = d3.zoom().scaleExtent([0.5, 4]).on("zoom", this.zoomedY.bind(this));
  //zoomY = d3.zoom().scaleExtent([0.5, 4]).on("zoom", ()=>console.log("object"));

  zoomedY(event: any) {
    const [xmousepoint, ymousepoint] = d3.pointer(event);
    //console.log("main1",main1)
    drawYaxis(this.BackGroup, this.svg, ymousepoint);
    this.rendorPlot();
  }

  // keyof typeof mapButtontoChart
  buttonClick(id: any, className: any, pressstate: any) {
    //console.log(id);

    const plotarray = collectKeysByButtonId(id) as [
      keyof typeof Shared_ButtonProp
    ];
    plotarray.map((toggleplot) => {
      proxy_plotinfo[toggleplot].plotStatus = pressstate;
    });
    this.SVGClass.createYaxiseventArea(this.zoomY)
    this.rendorAxis();
    this.rendorPlot();
  }

  rendorAxis() {
    // this.BackGroup.selectAll(`.axis`).remove();
    drawXaxis(this.BackGroup, this.FrontGroup);
    drawYaxis(this.BackGroup, this.svg);
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
      this.svg.select(`.yzoom-${scaleconfig.yaxisTag}`).call(this.zoomY.transform as any, d3.zoomIdentity)
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
        Shared_ChartDimension.margin.left +
          Shared_ChartDimension.margin.innerLeft,
        range[1],
        Shared_ChartDimension.width + Shared_ChartDimension.margin.innerRight,
        range[0] - range[1]
      );
    });
  }
}

export default CandlestickChartTS;
