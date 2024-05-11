import { PlotInfoItem, PlotInfoType, XScaleConfigItemType, YScaleConfigItemType, xScaleConfigType, yScaleConfigType } from "./ShareDataType";
import { chartData, plotInfoInput, xScaleConfigInput, yScaleConfigInput } from "./SharedDefaultData";

// import { createNestedProxy } from "./proxyfunction";
export let Shared_PlotInfo: PlotInfoType = {};
export let Shared_XScaleConfig: xScaleConfigType = {};
export let Shared_YScaleConfig: yScaleConfigType = {};


export function updateShared_PlotInfo(
  key: string,
  partialData: Partial<PlotInfoItem>
): void {
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
      ...partialData, // Merge with additional partialData
    };
  }
}

export function updateShared_XScaleConfig(
  key: string,
  partialData: Partial<XScaleConfigItemType>
): void {
  // Check if the key already exists in Shared_DataToplot
  if (Shared_XScaleConfig.hasOwnProperty(key)) {
    // Merge the partial data with the existing DataToplotObjType object
    Shared_XScaleConfig[key] = { ...Shared_XScaleConfig[key], ...partialData };
  } else {
    // If the key does not exist, create a new DataToplotObjType object with the provided data
    Shared_XScaleConfig[key] = {
      xscaleTag: "bot",
      ypoint: 100,
      xscaleRange: [0, 100],
      xscaleDomainData: [0, 1, 2, 3, 4],
      zoomstatus: true,
      ...partialData, // Merge with additional partialData
    };
  }
}
export function updateShared_YScaleConfig(
  key: string,
  partialData: Partial<YScaleConfigItemType>
): void {
  // Check if the key already exists in Shared_DataToplot
  if (Shared_YScaleConfig.hasOwnProperty(key)) {
    // Merge the partial data with the existing DataToplotObjType object
    Shared_YScaleConfig[key] = { ...Shared_YScaleConfig[key], ...partialData };
  } else {
    // If the key does not exist, create a new DataToplotObjType object with the provided data

    Shared_YScaleConfig[key] = {
      yscaleTag: "bot",
      xpoint: 100,
      yscaleRange: [0, 100],
      yscaleDomainData: [0, 1, 2, 3, 4],
      xscaleVisibleRange: [0, 10],
      zoomstatus: true,
      ...partialData, // Merge with additional partialData
    };
  }
}

export const updateXscaleconfig=(xScaleConfigInputArray=xScaleConfigInput)=>{
  xScaleConfigInputArray.map((xscaleitem) => {
    const { xscaleTag, ypoint, xscaleRange, xscaleDomainData, zoomstatus } =
      xscaleitem;
  
    const tempxscaleItem: XScaleConfigItemType = {
      xscaleTag: xscaleTag,
      ypoint: ypoint,
      xscaleRange: xscaleRange,
      xscaleDomainData: xscaleDomainData,
      zoomstatus: zoomstatus ? zoomstatus : false,
    };
    updateShared_XScaleConfig(xscaleTag, tempxscaleItem);
  });
}


export const updateYscaleconfig=(yScaleConfigInputArray=yScaleConfigInput)=>{
  yScaleConfigInputArray.map((yscaleitem) => {
  const { yscaleTag, xpoint, yscaleRange, yscaleDomainData, zoomstatus,xscaleVisibleRange } =
  yscaleitem;

  const tempyscaleItem: YScaleConfigItemType = {
    yscaleTag: yscaleTag,
    xpoint: xpoint,
    yscaleRange: yscaleRange,
    yscaleDomainData: yscaleDomainData,
    xscaleVisibleRange:xscaleVisibleRange,
    zoomstatus: zoomstatus ? zoomstatus : false,
  };
  updateShared_YScaleConfig(yscaleTag, tempyscaleItem);
});
}

export const updateplotInfo=(plotInfoInputArray=plotInfoInput)=>{
  plotInfoInputArray.map((plotinfoitem) => {
  const {
    plotStatus,
    plotName,
    xdataTag,
    ydataTag,
    xscaleTag,
    yscaleTag,
    plotType,
    plotcolor,
  } = plotinfoitem;
  const tempplotinforItem: PlotInfoItem = {
    plotStatus: plotStatus,
    plotName: plotName,
    xdata: chartData[xdataTag],
    ydata: chartData[ydataTag],
    xscaleTag: xscaleTag,
    yscaleTag: yscaleTag,
    plotType: plotType,
    plotcolor: plotcolor ? plotcolor : "black",
  };

  updateShared_PlotInfo(plotName, tempplotinforItem);
});
}