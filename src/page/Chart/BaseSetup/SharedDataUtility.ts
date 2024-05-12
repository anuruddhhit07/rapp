import { ChartBaseData, PlotInfoItem, PlotInfoType, PlotStatusByButtonTag, XScaleConfigItemType, YScaleConfigItemType, xScaleConfigType, yScaleConfigType } from "./ShareDataType";
import { chartData, plotInfoInput, xScaleConfigInput, yScaleConfigInput } from "./SharedDefaultData";

// import { createNestedProxy } from "./proxyfunction";
export let Shared_PlotInfo: PlotInfoType = {};
export let Shared_XScaleConfig: xScaleConfigType = {};
export let Shared_YScaleConfig: yScaleConfigType = {};
export let Shared_ButtonProp:PlotStatusByButtonTag={}

export let Shared_ChartBaseData: ChartBaseData = {
  plotName: new Set<string>(),
  xscaleTag: new Set<keyof xScaleConfigType>(),
  yscaleTag: new Set<keyof yScaleConfigType>(),
  yaxisTag: new Set<string>(),
};

// export let Shared_ChartBaseData: ChartBaseData = {
//   plotName: [],
//   xscaleTag: [],
//   yscaleTag: []
// };


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
      buttontag:"no-button",
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
      yaxisTag:'1main',
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
  const { yscaleTag, yaxisTag,xpoint, yscaleRange, yscaleDomainData, zoomstatus,xscaleVisibleRange } =
  yscaleitem;

  const tempyscaleItem: YScaleConfigItemType = {
    yscaleTag: yscaleTag,
    yaxisTag:yaxisTag,
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
    buttontag
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
    buttontag:buttontag?buttontag:"no-button"
  };

  updateShared_PlotInfo(plotName, tempplotinforItem);
});
}



export function getUniquePlotsWithStatusTrue(plotInfo: PlotInfoType): { plotName: Set<string>, xscaleTag: Set<keyof xScaleConfigType>, yscaleTag: Set<keyof yScaleConfigType>,yaxisTag: Set<string> } {
  const uniquePlotNames: Set<string> = new Set();
  const uniquexscaletags: Set<keyof xScaleConfigType> = new Set()  ;
  const uniqueyscaletags: Set<keyof yScaleConfigType> = new Set();
  const uniqueyaxistags: Set<string> = new Set();

  Object.values(plotInfo)
    .filter(plot => plot.plotStatus)
    .forEach(plot => {
      uniquePlotNames.add(plot.plotName);
      uniquexscaletags.add(plot.xscaleTag) ;
      uniqueyscaletags.add(plot.yscaleTag);
      uniqueyaxistags.add(Shared_YScaleConfig[plot.yscaleTag as string].yaxisTag)
    });

  return { plotName: uniquePlotNames, xscaleTag: uniquexscaletags, yscaleTag: uniqueyscaletags,yaxisTag:uniqueyaxistags };
}


export function updateSharedChartData<T extends Record<string, any>>(data: { [K in keyof T]: T[K][] }): void {
  for (const key in data) {
    const typedKey = key as keyof ChartBaseData; // Cast key to keyof ChartBaseData
      Shared_ChartBaseData[typedKey].clear();
  }
   for (const key in data) {
    const typedKey = key as keyof ChartBaseData; // Cast key to keyof ChartBaseData
    data[key].forEach(value => Shared_ChartBaseData[typedKey].add(value));
  }

}

export function getPlotStatusByButtonTag(): void {
  // const statusByButtonTag: PlotStatusByButtonTag = {};

  Object.entries(Shared_PlotInfo).forEach(([key, plot]) => {
    if (plot.buttontag !== 'no-button') {
      Shared_ButtonProp[key] = { plotStatus: plot.plotStatus, plotName: plot.plotName,buttonid:`buttonid_${plot.buttontag}` };
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