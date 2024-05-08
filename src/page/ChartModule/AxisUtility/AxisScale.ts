import SetupChart from "../ChartSetup/setchart";
import { XScaleConfigType, YScaleConfigType, xAxisItemType, yAxisItemType } from "../types/AxisScaleType";
import { ChartOptions, Margin } from "../types/chartSetuptype";
import { ChartDataObj } from "../types/chartdataTypes";
import * as d3 from "d3";
import {
  Shared_ChartBaseProp,
  Shared_ChartPlotData,
  Shared_Xscaleconfig,
  Shared_Yscaleconfig,
  getUniqueScaleTags,
  updateXscaleconfig,
  updateYscaleconfig,
} from "../SharedObject";

const defaultDatadomain = function(this: any, minvisrange?: number, maxvisrange?: number) {
  // Check if maxscaledata and minscaledata are defined before attempting to call them
  if (this.scaledata_min && this.scaledata_max && this.transform && this.ypadding) {
    const minData =
      minvisrange === undefined && maxvisrange === undefined
        ? d3.min(this.scaledata_min()) as unknown as number
        : d3.min(this.scaledata_min().slice(minvisrange, (maxvisrange as number) + 1)) as unknown as number;
    const maxData =
      minvisrange === undefined && maxvisrange === undefined
        ? d3.max(this.scaledata_max()) as unknown as number
        : d3.max(this.scaledata_max().slice(minvisrange, (maxvisrange as number) + 1)) as unknown as number;
    const center = (maxData + minData) / 2;
    const newExtent = (maxData - minData) / this.transform.k / 2;
    const newMax = center + newExtent;
    const newMin = center - newExtent;
    const lowerlimit = newMin > minData ? minData : newMin;
    const higherlimit = newMax > maxData ? maxData : newMax;
    const padding = (higherlimit - lowerlimit) * this.ypadding;
    return [lowerlimit - padding, higherlimit + padding];
  }
  return [0, 0];
};

const VolumeDatadomain = function(this: any, minvisrange?: number, maxvisrange?: number) {
  // Check if maxscaledata and minscaledata are defined before attempting to call them
  if (this.scaledata_min && this.scaledata_max && this.transform && this.ypadding) {
    const minData =0;
    const maxData =
      minvisrange === undefined && maxvisrange === undefined
        ? d3.max(this.scaledata_max()) as unknown as number
        : d3.max(this.scaledata_max().slice(minvisrange, (maxvisrange as number) + 1)) as unknown as number;
    const center = (maxData + minData) / 2;
    const newExtent = (maxData - minData) / this.transform.k / 2;
    const newMax = center + newExtent;
    const newMin = center - newExtent;
    const lowerlimit = newMin > minData ? minData : newMin;
    const higherlimit = newMax > maxData ? maxData : newMax;
    const padding = (higherlimit - lowerlimit) * this.ypadding;
    return [lowerlimit - padding, higherlimit + padding];
  }
  return [0, 0];
};

export class AxisChart {
  private static instance: AxisChart | null = null;
  // public xScaleConfig: XScaleConfigType = {};
  // public yScaleConfig: YScaleConfigType = {};
  // type YScaleKeys = keyof typeof this.yScaleConfig;
  private constructor() {
    this.setXScaleConfig();
    this.setYScaleConfig();
    this.setXscalefn();
    // this.setYscalefn();
  }

  static getInstance(): AxisChart {
    if (!AxisChart.instance) {
      AxisChart.instance = new AxisChart();
    }
    return AxisChart.instance;
  }

  getdefaultxaxis() {
    const { svgHeight, svgWidth, margin } = Shared_ChartBaseProp;
    const XscaleConfigDefault: xAxisItemType[] = [
      {
        y_point: svgHeight - margin.bottom,
        xscaleName: "mainx",
        scaleSide: "Bottom",
        scaleType: "linear",
        scaledatatag: "xindex",
        scalerange: [margin.left + margin.innerLeft, svgWidth - margin.right - margin.innerRight],
        ticlavelmappedwith: "timestamp", // just to display axis tick and reverse map if any dataplot have axis defeind in timestamp
        plotstatus: true,
        zooming: true,
      },
      {
        y_point: margin.top,
        xscaleName: "topx",
        scaleSide: "Top",
        scaleType: "linear",
        scaledatatag: "xindex",
        scalerange: [margin.left + margin.innerLeft, svgWidth - margin.right - margin.innerRight],
        ticlavelmappedwith: "xindex", // just to display axis tick and reverse map if any dataplot have axis defeind in timestamp
        plotstatus: true,
        zooming: true,
      },
    ];

    return XscaleConfigDefault.filter((item) => item.plotstatus == true);
  }

  setXScaleConfig() {
    const { svgHeight, svgWidth, margin } = Shared_ChartBaseProp;
    const { timestamp } = Shared_ChartPlotData;
    const xscaleconfigdata = this.getdefaultxaxis();

    xscaleconfigdata.forEach((item) => {
      const { xscaleName, y_point, scaleSide, scaledatatag, scaleType, scalerange, ticlavelmappedwith, plotstatus, zooming } = item;
      const datadomainFunction = () =>
        [d3.min(Shared_ChartPlotData[scaledatatag] as number[]) as number, d3.max(Shared_ChartPlotData[scaledatatag] as number[]) as number] as [
          number,
          number
        ];
      updateXscaleconfig(xscaleName, {
        xscaleName: xscaleName,
        y_point: y_point,
        scaleSide: scaleSide,
        scaleType: scaleType,
        scaledatatag: scaledatatag,
        scalerange: scalerange,
        // datadomain: [0, this.dataset.xdata[this.dataset.xdata.length - 1]],
        datadomain: datadomainFunction(),
        ticlavelmappedwith: ticlavelmappedwith, // just to display axis tick and reverse map if any dataplot have axis defeind in timestamp
        plotstatus: plotstatus,
        zooming: zooming,
        Xscale: null,
      });
    });
  }

  getdefaultyaxis() {
    const { svgHeight, svgWidth, margin } = Shared_ChartBaseProp;
    const YscaleConfigDefault: yAxisItemType[] = [
      {
        plotstatus: true,
        yscaletag: "OHLC",
        scaleSide: "Right",
        x_point: svgWidth - margin.right,
        changeRangeTag: true,
        highestYDataTag: "high",
        lowestYDataTag: "low",
        yaxistag: "mainyaxis",
        yaxisratio: null,
        yzoomstatus: true,
        datadomain:defaultDatadomain
      },
      {
        plotstatus: true,
        yscaletag: "BR",
        scaleSide: "Left",
        x_point: margin.left + margin.innerLeft,
        changeRangeTag: true,
        highestYDataTag: "volume",
        lowestYDataTag: "volume",
        yaxistag: "second",
        yaxisratio: null,
        yzoomstatus: true,
        datadomain:VolumeDatadomain
      },
      {
        plotstatus: true,
        yscaletag: "TL",
        scaleSide: "Right",
        x_point: 10,
        changeRangeTag: false,
        highestYDataTag: "high",
        lowestYDataTag: "close",
        yaxistag: "mainyaxis",
        yaxisratio: null,
        yzoomstatus: true,
        datadomain:defaultDatadomain
      },
    ];

    return YscaleConfigDefault.filter((item) => item.plotstatus == true);
  }

  setYScaleConfig() {
    const yscaleconfigdata = this.getdefaultyaxis();

    yscaleconfigdata.forEach((item) => {
      const { yscaletag, yaxistag, plotstatus, x_point, scaleSide, changeRangeTag, highestYDataTag, lowestYDataTag, yzoomstatus,datadomain } = item;
      updateYscaleconfig(yscaletag, {
        plotstatus: plotstatus,
        yzoomstatus: yzoomstatus,
        yaxistag: yaxistag,
        yscaletag: yscaletag,
        xpoint: x_point, // Example value, replace with actual values
        scaleSide: scaleSide,
        ypadding: 0.1,
        transform: { k: 1 },
        scaledata_max: () => Shared_ChartPlotData[highestYDataTag] as number[], // Example value, replace with actual values
        scaledata_min: () => Shared_ChartPlotData[lowestYDataTag] as number[], // Example value, replace with actual values
        changeRangeTag: changeRangeTag,
        datadomain: datadomain,
        
      });
    });
  }

  // getYScaleConfigType() {
  //   type YScaleKeys = keyof typeof this.yScaleConfig;
  // }

  getXScaleConfig() {
    return Shared_Xscaleconfig;
  }

  getActiveXScales(): XScaleConfigType {
    const activeXScales: XScaleConfigType = {};

    for (const key in Shared_Xscaleconfig) {
      if (Shared_Xscaleconfig.hasOwnProperty(key)) {
        if (Shared_Xscaleconfig[key].plotstatus) {
          activeXScales[key] = Shared_Xscaleconfig[key];
        }
      }
    }
    return activeXScales;
  }

  setXscalefn() {
    const xscaletagsarray = Object.keys(Shared_Xscaleconfig);
    xscaletagsarray.map((scaletag) => {
      let scaleconfig = Shared_Xscaleconfig[scaletag];

      if (scaleconfig.Xscale == null) {
        const Xscale =
          scaleconfig.scaleType === "linear"
            ? d3.scaleLinear().range(scaleconfig.scalerange).domain(scaleconfig.datadomain)
            : scaleconfig.scaleType === "TimeScale"
            ? d3.scaleTime().range(scaleconfig.scalerange).domain(scaleconfig.datadomain)
            : d3
                .scaleBand<string>()
                .range(scaleconfig.scalerange)
                .domain(
                  Shared_ChartPlotData[scaleconfig.scaledatatag].map((d: any) => d.toString()) // Convert numbers to strings
                );
        updateXscaleconfig(scaletag, {
          Xscale: Xscale,
        });
      }
    });
  }

  setYscalefn() {
    const { yscaletags } = getUniqueScaleTags();
    const yscaletagsarray = yscaletags;
    //console.log("yscaletagsarray",yscaletagsarray)

    yscaletagsarray.map((scaletag) => {
      let scaleconfig = Shared_Yscaleconfig[scaletag];
      if (scaleconfig.Yscale == null) {
        if (scaleconfig.yaxisrange != null) {
          console.log(scaletag, scaleconfig.yaxisrange, scaleconfig.datadomain());
          const Yscale = d3.scaleLinear().range(scaleconfig.yaxisrange).domain(scaleconfig.datadomain());
          updateYscaleconfig(scaletag, {
            Yscale: Yscale,
          });
        }
      }
    });
  }
}
