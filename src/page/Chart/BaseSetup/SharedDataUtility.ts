import * as d3 from "d3";
import {
  ChartBaseData,
  ChartDimensionType,
  PlotInfoItem,
  PlotInfoType,
  PlotStatusByButtonTag,
  XScaleConfigItemType,
  XscaleYscaleRelation,
  YScaleConfigItemType,
  xScaleConfigType,
  yScaleConfigType,
} from "./ShareDataType";
import { defaultChartDimensionProp, defaultchartData, plotInfoInput, xScaleConfigInput, yScaleConfigInput } from "./SharedDefaultData";
import { ChartDataType } from "./chartdataTypes";
import { NumberValue, ScaleBand, ScaleLinear, ScaleTime } from "d3";

export let Shared_ChartPlotData: ChartDataType = defaultchartData;
export let Shared_ChartDimension: ChartDimensionType = defaultChartDimensionProp;
export let Shared_XScaleConfig: xScaleConfigType = {};
export let Shared_YScaleConfig: yScaleConfigType = {};

// import { createNestedProxy } from "./proxyfunction";
export let Shared_PlotInfo: PlotInfoType = {};

export let Shared_ButtonProp: PlotStatusByButtonTag = {};
export let Shared_XYrelation: XscaleYscaleRelation = {};

export let Shared_ChartBaseData: ChartBaseData = {
  plotName: new Set<string>(),
  xscaleTag: new Set<keyof xScaleConfigType>(),
  yscaleTag: new Set<keyof yScaleConfigType>(),
  yaxisTag: new Set<string>(),
};

export function updateChartPlotData(data: ChartDataType) {
  Shared_ChartPlotData = data;
}

export function updateChartBaseProp(partialData: Partial<ChartDimensionType>): void {
  Object.assign(Shared_ChartDimension, partialData);
}

// export let Shared_ChartBaseData: ChartBaseData = {
//   plotName: [],
//   xscaleTag: [],
//   yscaleTag: []
// };

export function getXscale(this: any): { domain: Iterable<NumberValue>; XSCALE: any } {
  // console.log("hello", this);
  const domain = d3.extent(Shared_ChartPlotData[this.xscaleDataTag as keyof ChartDataType]) as Iterable<NumberValue>;
  // console.log("domain1",domain,this.xsaleType);

  const XSCALE: ScaleLinear<number, number> | ScaleTime<number, number> | ScaleBand<string> | null =
    this.xsaleType == "Linear"
      ? d3.scaleLinear().range(this.xscaleRange).domain(domain)
      : this.xsaleType === "TimeScale"
      ? d3.scaleTime().range(this.xscaleRange).domain(domain)
      : d3
          .scaleBand<string>()
          .range(this.xscaleRange)
          .domain((domain as [number, number]).map((d: any) => d.toString()));

  // console.log("domain2",XSCALE.domain());

  return { domain: domain, XSCALE: XSCALE };
}

export function getYscale(this: YScaleConfigItemType): { domain: Iterable<NumberValue>; YSCALE: any } {
  // console.log("hello", this);
  // console.log(this.yaxisrange);
  // console.log(this.xscaleVisibleRange);
  // console.log(this.yscaleDataTag);

  let domain: Iterable<NumberValue> = [];
  let YSCALE: ScaleLinear<number, number> | null=null

  let visiblerange=[]
// if (this.xscaleVisibleRange[1]==0){
//   visiblerange= [0,Shared_ChartPlotData[this.yscaleDataTag as keyof ChartDataType].length]
// }

  if (this.yscaleDataTag == "ohlc") {

    visiblerange=this.xscaleVisibleRange[1]==0?[0,Shared_ChartPlotData["low"].length]:this.xscaleVisibleRange
    domain = [
      d3.min(Shared_ChartPlotData["low"].slice(visiblerange[0], visiblerange[1])) as number,
      d3.max(Shared_ChartPlotData["high"].slice(visiblerange[0], visiblerange[1])) as number,
    ];
  } else {
    visiblerange=this.xscaleVisibleRange[1]==0?[0,Shared_ChartPlotData[this.yscaleDataTag as keyof ChartDataType].length]:this.xscaleVisibleRange
    domain = d3.extent(
      Shared_ChartPlotData[this.yscaleDataTag as keyof ChartDataType].slice(visiblerange[0], visiblerange[1])
    ) as Iterable<NumberValue>;
  }

  // const domain = d3.extent(Shared_ChartPlotData[this.yscaleDataTag as keyof ChartDataType]) as Iterable<NumberValue>;
  // console.log("domain1",domain,this.xsaleType);

  if (this.yaxisrange!=null){
    YSCALE =d3.scaleLinear().range(this.yaxisrange).domain(domain)
  }
  
  // console.log(YSCALE?.domain());
 

  return { domain: domain, YSCALE: YSCALE };
}

export function updateShared_PlotInfo(key: string, partialData: Partial<PlotInfoItem>): void {
  // Check if the key already exists in Shared_DataToplot
  if (Shared_PlotInfo.hasOwnProperty(key)) {
    // Merge the partial data with the existing DataToplotObjType object
    Shared_PlotInfo[key] = { ...Shared_PlotInfo[key], ...partialData };
  } else {
    // If the key does not exist, create a new DataToplotObjType object with the provided data
    Shared_PlotInfo[key] = {
      plotStatus: true,
      plotName: "PlotName",
      xdata: [],
      ydata: [],
      xscaleTag: "Bot1",
      yscaleTag: "TL",
      plotType: "line",
      plotcolor: "red",
      buttontag: "no-button",
      ...partialData, // Merge with additional partialData
    };
  }
}

export function updateShared_XScaleConfig(key: string, partialData: Partial<XScaleConfigItemType>): void {
  // Check if the key already exists in Shared_DataToplot
  if (Shared_XScaleConfig.hasOwnProperty(key)) {
    // Merge the partial data with the existing DataToplotObjType object
    Shared_XScaleConfig[key] = { ...Shared_XScaleConfig[key], ...partialData };
  } else {
    // If the key does not exist, create a new DataToplotObjType object with the provided data
    Shared_XScaleConfig[key] = {
      xsaleType: "Linear",
      xscaleTag: "bot",
      scaleSide: "Bottom",
      ticlavelmappedwith: "xindex",
      ypoint: 100,
      xscaleRange: [0, 100],
      xscaleDataTag: "xindex",
      zoomstatus: true,
      xscale: getXscale,
      ...partialData, // Merge with additional partialData
    };
  }
}
export function updateShared_YScaleConfig(key: string, partialData: Partial<YScaleConfigItemType>): void {
  // Check if the key already exists in Shared_DataToplot
  if (Shared_YScaleConfig.hasOwnProperty(key)) {
    // Merge the partial data with the existing DataToplotObjType object
    Shared_YScaleConfig[key] = { ...Shared_YScaleConfig[key], ...partialData };
  } else {
    // If the key does not exist, create a new DataToplotObjType object with the provided data

    Shared_YScaleConfig[key] = {
      yscaleTag: "bot",
      yaxisTag: "1main",
      scaleSide: "Left",
      xpoint: 100,
      // yscaleRange: [0, 100],
      yaxisrange: null,
      yscaleDataTag: "close",
      xscaleVisibleRange: [0, 10],
      zoomstatus: true,
      autozoom: true,
      yscale: getYscale,
      ...partialData, // Merge with additional partialData
    };
  }
}

export const updateXscaleconfig = (xScaleConfigInputArray = xScaleConfigInput) => {
  xScaleConfigInputArray.map((xscaleitem) => {
    const { xscaleTag, ypoint, xscaleRange, scaleSide, xsaleType, ticlavelmappedwith, xscaleDataTag, zoomstatus } = xscaleitem;

    const tempxscaleItem: XScaleConfigItemType = {
      xscaleTag: xscaleTag,
      xsaleType: xsaleType,
      scaleSide: scaleSide,
      ticlavelmappedwith: ticlavelmappedwith,
      ypoint: ypoint,
      xscaleRange: xscaleRange,
      xscaleDataTag: xscaleDataTag,
      zoomstatus: zoomstatus ? zoomstatus : false,
      xscale: getXscale,
    };
    updateShared_XScaleConfig(xscaleTag, tempxscaleItem);
  });
};

export const updateYscaleconfig = (yScaleConfigInputArray = yScaleConfigInput) => {
  yScaleConfigInputArray.map((yscaleitem) => {
    const { yscaleTag, yaxisTag, xpoint, yaxisrange, yscaleDataTag, zoomstatus, scaleSide, xscaleVisibleRange, autozoom } = yscaleitem;

    const tempyscaleItem: YScaleConfigItemType = {
      yscaleTag: yscaleTag,
      yaxisTag: yaxisTag,
      scaleSide: scaleSide,
      xpoint: xpoint,
      // yscaleRange: yscaleRange,
      yscaleDataTag: yscaleDataTag,
      yaxisrange: yaxisrange ? yaxisrange : null,
      xscaleVisibleRange: xscaleVisibleRange,
      zoomstatus: zoomstatus ? zoomstatus : false,
      autozoom: autozoom ? autozoom : false,
      yscale: getYscale,
    };
    updateShared_YScaleConfig(yscaleTag, tempyscaleItem);
  });
};

export const updateplotInfo = (plotInfoInputArray = plotInfoInput) => {
  plotInfoInputArray.map((plotinfoitem) => {
    const { plotStatus, plotName, xdataTag, ydataTag, xscaleTag, yscaleTag, plotType, plotcolor, buttontag } = plotinfoitem;
    const tempplotinforItem: PlotInfoItem = {
      plotStatus: plotStatus,
      plotName: plotName,
      xdata: Shared_ChartPlotData[xdataTag],
      ydata: Shared_ChartPlotData[ydataTag],
      xscaleTag: xscaleTag,
      yscaleTag: yscaleTag,
      plotType: plotType,
      plotcolor: plotcolor ? plotcolor : "black",
      buttontag: buttontag ? buttontag : "no-button",
    };

    updateShared_PlotInfo(plotName, tempplotinforItem);
  });
};

export function getUniquePlotsWithStatusTrue(plotInfo: PlotInfoType): {
  plotName: Set<string>;
  xscaleTag: Set<keyof xScaleConfigType>;
  yscaleTag: Set<keyof yScaleConfigType>;
  yaxisTag: Set<string>;
} {
  const uniquePlotNames: Set<string> = new Set();
  const uniquexscaletags: Set<keyof xScaleConfigType> = new Set();
  const uniqueyscaletags: Set<keyof yScaleConfigType> = new Set();
  const uniqueyaxistags: Set<string> = new Set();

  Object.values(plotInfo)
    .filter((plot) => plot.plotStatus)
    .forEach((plot) => {
      uniquePlotNames.add(plot.plotName);
      uniquexscaletags.add(plot.xscaleTag);
      uniqueyscaletags.add(plot.yscaleTag);
      uniqueyaxistags.add(Shared_YScaleConfig[plot.yscaleTag as string].yaxisTag);
    });

  return { plotName: uniquePlotNames, xscaleTag: uniquexscaletags, yscaleTag: uniqueyscaletags, yaxisTag: uniqueyaxistags };
}

export function updateSharedChartData<T extends Record<string, any>>(data: { [K in keyof T]: T[K][] }): void {
  for (const key in data) {
    const typedKey = key as keyof ChartBaseData; // Cast key to keyof ChartBaseData
    Shared_ChartBaseData[typedKey].clear();
  }
  for (const key in data) {
    const typedKey = key as keyof ChartBaseData; // Cast key to keyof ChartBaseData
    data[key].forEach((value) => Shared_ChartBaseData[typedKey].add(value));
  }
}

export function getPlotStatusByButtonTag(): void {
  // const statusByButtonTag: PlotStatusByButtonTag = {};

  Object.entries(Shared_PlotInfo).forEach(([key, plot]) => {
    if (plot.buttontag !== "no-button") {
      Shared_ButtonProp[key] = { plotStatus: plot.plotStatus, plotName: plot.plotName, buttonid: `buttonid_${plot.buttontag}` };
    }
  });

  // return statusByButtonTag;
}

export function collectKeysByButtonId(buttonId: string): string[] {
  const keys: string[] = [];

  // Iterate over each key-value pair in the interface
  Object.entries(Shared_ButtonProp).forEach(([key, value]) => {
    if (value.buttonid === buttonId) {
      keys.push(key); // Add the key to the array if the buttonid matches
    }
  });

  return keys;
}

export function updateYScaleConfigByKey(keyName: keyof YScaleConfigItemType, value: string, partialData: Partial<YScaleConfigItemType>): void {
  // Filter YScaleConfigType entries based on the provided key and value
  const yScaleConfigEntries = Object.entries(Shared_YScaleConfig).filter(([_, config]) => config[keyName] === value);
  // console.log("yScaleConfigEntries",yScaleConfigEntries);
  // Update specified properties for each group
  yScaleConfigEntries.forEach(([key, config]) => {
    Shared_YScaleConfig[key] = { ...config, ...partialData };
    
  });
  // console.log("Shared_YScaleConfig",Shared_YScaleConfig);
}

export function getYaxisRatio(yaxistags: string[]): { [key: string]: { yaxisrange: [number, number] } } {
  // resetYaxisrange()
  // const { yaxistags } = getUniqueYaxisTags();
  // console.log("yaxistags",yaxistags)

  const totalHeight = Shared_ChartDimension.height;

  const ratioIncrement = 1 / yaxistags.length;
  let ratioarray: number[];
  if (yaxistags.length == 2) {
    ratioarray = [0.7, 0.3];
  }
  if (yaxistags.length == 3) {
    ratioarray = [0.6, 0.2, 0.2];
  }

  // const yaxisratioObj: { [key: string]: number } = {};
  let tempcumulativeRatio = 0;
  let yaxisProp: { [key: string]: { yaxisrange: [number, number] } } = {};

  yaxistags.forEach((yaxistag, index) => {
    const ratio = ratioarray && ratioarray.length > 0 ? ratioarray[index] : ratioIncrement;
    // console.log("ratio",ratio)
    // console.log("yaxistags",yaxistag)
    // yaxisratioObj[yaxistag] = ratio;

    const startY = Shared_ChartDimension.margin.top + Shared_ChartDimension.margin.innerTop + totalHeight * tempcumulativeRatio;
    const endY = startY + totalHeight * ratio;
    // console.log(yaxistag,[endY, startY]);
    //updateYScaleConfigByKey("yaxistag", yaxistag, { yaxisrange: [endY, startY], yaxisratio: ratio });
    yaxisProp[yaxistag] = { yaxisrange: [endY, startY] };

    // Shared_yaxisrange.push([endY, startY]);

    // updateYaxisProp(yaxistag,{
    //   range:[endY, startY],
    //   fill:index==0?"red":"yellow"
    // })
    tempcumulativeRatio += ratio;
  });

  return yaxisProp;
}

export function generateRelationObject(): void {
  // Clear the existing data in Shared_XYrelation
  Shared_XYrelation = {};

  // Iterate over each entry in Shared_PlotInfo
  Object.values(Shared_PlotInfo).forEach((item) => {
    // Check if plotStatus is true
    if (item.plotStatus) {
      // Ensure xscaleTag is of type keyof xScaleConfigType
      const xscaleTag: keyof xScaleConfigType = item.xscaleTag as keyof xScaleConfigType;

      // If plotStatus is true, add the yscaleTag to the array associated with xscaleTag
      if (!Shared_XYrelation[xscaleTag]) {
        // If xscaleTag is not yet in Shared_XYrelation, initialize an empty array
        Shared_XYrelation[xscaleTag] = [];
      }
      // Add the yscaleTag to the array if it's not already present
      if (!Shared_XYrelation[xscaleTag].includes(item.yscaleTag as string)) {
        Shared_XYrelation[xscaleTag].push(item.yscaleTag as string);
      }
    }
  });
}
