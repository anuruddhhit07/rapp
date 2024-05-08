import { zoomIdentity } from "d3";
import { defaultChartBaseProp } from "./SharedDefaultValue";
import { XScaleConfigType, XscaleItemProp, YScaleConfigType, YaxisPropItem, YscaleItemProp, yaxisrangeType } from "./types/AxisScaleType";
import { ChartBaseSetupType } from "./types/chartSetuptype";
import { ChartDataObj } from "./types/chartdataTypes";
import { DataToplotObjType, DataToplotType } from "./types/plotConfigType";

export let Shared_ChartPlotData: ChartDataObj = {
  timestamp: [],
  xindex: [],
  open: [],
  high: [],
  low: [],
  close: [],
  volume: [],
  // Other properties as needed
};

export let Shared_ChartBaseProp: ChartBaseSetupType = defaultChartBaseProp;

export let Shared_Xscaleconfig: XScaleConfigType = {};
export let Shared_Yscaleconfig: YScaleConfigType = {};

export let Shared_DataToplot: DataToplotType = {};
export let Shared_Yaxisrange: yaxisrangeType = {};

export function updateChartPlotData(data: ChartDataObj) {
  Shared_ChartPlotData = data;
}

export function updateChartBaseProp(partialData: Partial<ChartBaseSetupType>): void {
  Object.assign(Shared_ChartBaseProp, partialData);
}

export function resetYaxisrange():void{
  Shared_Yaxisrange={}
}

export function updateYaxisProp(key: string, partialData: Partial<YaxisPropItem>): void {
  // Check if the key already exists in Xscaleconfig
  if (Shared_Yaxisrange.hasOwnProperty(key)) {
    // Merge the partial data with the existing XscaleItemProp object
    Shared_Yaxisrange[key] = { ...Shared_Yaxisrange[key], ...partialData };
  } else {
    // If the key does not exist, create a new XscaleItemProp object with the provided data
    Shared_Yaxisrange[key] = {
      range: [0, 0],
      borderColor: "red",
      borderWidth: 2,
      fill: "green",
      opacity: 0.2,
      ...partialData,
    };
  }
}

export function updateXscaleconfig(key: string, partialData: Partial<XscaleItemProp>): void {
  // Check if the key already exists in Xscaleconfig
  if (Shared_Xscaleconfig.hasOwnProperty(key)) {
    // Merge the partial data with the existing XscaleItemProp object
    Shared_Xscaleconfig[key] = { ...Shared_Xscaleconfig[key], ...partialData };
  } else {
    // If the key does not exist, create a new XscaleItemProp object with the provided data
    Shared_Xscaleconfig[key] = {
      xscaleName: "",
      y_point: 0,
      scaleSide: "Top",
      scaleType: "linear",
      scaledatatag: "timestamp",
      scalerange: [0, 0],
      datadomain: [0, 0],
      ticlavelmappedwith: "timestamp",
      plotstatus: false,
      zooming: false,
      Xscale: null,
      currentTransformX:zoomIdentity,
      ...partialData,
    };
  }
}

export function updateYscaleconfig(key: string, partialData: Partial<YscaleItemProp>): void {
  // Check if the key already exists in Yscaleconfig
  if (Shared_Yscaleconfig.hasOwnProperty(key)) {
    // Merge the partial data with the existing YscaleItemProp object
    Shared_Yscaleconfig[key] = { ...Shared_Yscaleconfig[key], ...partialData };
  } else {
    // If the key does not exist, create a new YscaleItemProp object with the provided data
    Shared_Yscaleconfig[key] = {
      plotstatus: false,
      yaxistag: "mainyaxis",
      yaxisratio: null,
      yaxisrange: null,
      yscaletag: "TR",
      xpoint: 0,
      scaleSide: "Left",
      ypadding: 0,
      transform: { k: 0 },
      scaledata_max: () => [],
      scaledata_min: () => [],
      changeRangeTag: false,
      // datadomain: (minvisrange?: number, maxvisrange?: number) => [0, 0],
      datadomain:(minvisrange?: number, maxvisrange?: number) => [0, 0],
      Yscale: null,
      currentTransformY: zoomIdentity,
      yzoomstatus: false,
      ...partialData, // Merge with provided partial data
    };
  }
}

export function updateSharedDataToplot(key: string, partialData: Partial<DataToplotObjType>): void {
  // Check if the key already exists in Shared_DataToplot
  if (Shared_DataToplot.hasOwnProperty(key)) {
    // Merge the partial data with the existing DataToplotObjType object
    Shared_DataToplot[key] = { ...Shared_DataToplot[key], ...partialData };
  } else {
    // If the key does not exist, create a new DataToplotObjType object with the provided data
    Shared_DataToplot[key] = {
      plotstatus: false,
      xdata: () => [],
      ydata: () => [],
      linetype: "solid",
      fill: "none",
      strokewidth: 1,
      strokedasharray: "",
      yscaletag: "",
      xscaletag: "",
      plottype: "ohlc",
      tagclass: "",
      plotcolor:"black",
      ...partialData, // Merge with provided partial data
    };
  }
}

export function getActivePlotData(): DataToplotType {
  const activePlotData: DataToplotType = {};

  // Iterate through each entry in Shared_DataToplot
  for (const key in Shared_DataToplot) {
    if (Shared_DataToplot.hasOwnProperty(key)) {
      const plotConfig = Shared_DataToplot[key];

      // Check if plotstatus is true
      if (plotConfig.plotstatus) {
        activePlotData[key] = plotConfig; // Add to activePlotData
      }
    }
  }

  return activePlotData;
}

export function getKeyFromDataToplotKeyValue(keyToMatch: keyof DataToplotObjType, valueToMatch: string): string | null {
  for (const key in Shared_DataToplot) {
    if (Shared_DataToplot.hasOwnProperty(key) && Shared_DataToplot[key][keyToMatch] === valueToMatch) {
      return key;
    }
  }
  return null; // Return null if no matching key is found
}

export function getKeysFromDataToplotKeyValue(keyValuePairs: [keyof DataToplotObjType, string | boolean][]): string[] {
  const matchingKeys: string[] = [];
  for (const key in Shared_DataToplot) {
    if (Shared_DataToplot.hasOwnProperty(key)) {
      let isMatch = true;
      for (const [keyToMatch, valueToMatch] of keyValuePairs) {
        if (Shared_DataToplot[key][keyToMatch] !== valueToMatch) {
          isMatch = false;
          break;
        }
      }
      if (isMatch) {
        matchingKeys.push(key);
      }
    }
  }
  return matchingKeys;
}

export function groupDataByPlotType(): { [key: string]: string[] } {
  const groupedData: { [key: string]: string[] } = {};

  // Loop through each data object
  Object.keys(Shared_DataToplot).forEach(key => {
    const plotType = Shared_DataToplot[key].plottype;

    // Check if the plotType exists in groupedData, if not, create an empty array for it
    if (!groupedData[plotType]) {
      groupedData[plotType] = [];
    }

    // Push the key into the corresponding plotType array
    groupedData[plotType].push(key);
  });

  return groupedData;
}

export function getUniqueKeysAndYScaleTagsFromDataToplotKeyValue(keyValuePairs: [keyof DataToplotObjType, string | boolean][]): {
  keys: string[];
  yscaletags: string[];
} {
  const matchingKeys: { keys: string[]; yscaletags: string[] } = { keys: [], yscaletags: [] };
  const keyYScaleTagSet: Set<string> = new Set();

  for (const key in Shared_DataToplot) {
    if (Shared_DataToplot.hasOwnProperty(key)) {
      let isMatch = true;
      for (const [keyToMatch, valueToMatch] of keyValuePairs) {
        if (Shared_DataToplot[key][keyToMatch] !== valueToMatch) {
          isMatch = false;
          break;
        }
      }
      if (isMatch) {
        const yscaletag = Shared_DataToplot[key].yscaletag;
        const keyYScaleTag = `${key}-${yscaletag}`;
        if (!keyYScaleTagSet.has(keyYScaleTag)) {
          matchingKeys.keys.push(key);
          matchingKeys.yscaletags.push(yscaletag);
          keyYScaleTagSet.add(keyYScaleTag);
        }
      }
    }
  }
  return matchingKeys;
}

export function getUniqueScaleTags(): {
  yscaletags: string[];
  xscaletags: string[];
} {
  const activePlots = getActivePlotData();
  const yscaletagsSet = new Set<string>();
  const xscaletagsSet = new Set<string>();

  for (const key in activePlots) {
    if (activePlots.hasOwnProperty(key)) {
      yscaletagsSet.add(activePlots[key].yscaletag);
      xscaletagsSet.add(activePlots[key].xscaletag);
    }
  }

  const yscaletags = Array.from(yscaletagsSet);
  const xscaletags = Array.from(xscaletagsSet);

  return { yscaletags, xscaletags };
}

export function getUniqueYaxisTags(): {
  yaxistags: string[];
  uniqueaxis: number;
} {
  const activePlots = getActivePlotData();
  // console.log("activePlots",activePlots);
  const yaxistagtagsSet = new Set<string>();
  for (const key in activePlots) {
    if (activePlots.hasOwnProperty(key)) {
      yaxistagtagsSet.add(Shared_Yscaleconfig[activePlots[key].yscaletag].yaxistag);
    }
  }

  const yaxistags = Array.from(yaxistagtagsSet).sort();
  // console.log("yaxistags",yaxistags);
  return { yaxistags, uniqueaxis: yaxistags.length };
}

export function updateYScaleConfigByKey(keyName: keyof YscaleItemProp, value: string, partialData: Partial<YscaleItemProp>): void {
  // Filter YScaleConfigType entries based on the provided key and value
  const yScaleConfigEntries = Object.entries(Shared_Yscaleconfig).filter(([_, config]) => config[keyName] === value);

  // Update specified properties for each group
  yScaleConfigEntries.forEach(([key, config]) => {
    Shared_Yscaleconfig[key] = { ...config, ...partialData };
  });
}

export function setYaxisRatio(): void {
  resetYaxisrange()
  const { yaxistags } = getUniqueYaxisTags();
  // console.log("yaxistags",yaxistags)

  const totalHeight = Shared_ChartBaseProp.height;

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
  yaxistags.forEach((yaxistag, index) => {
    const ratio = ratioarray && ratioarray.length > 0 ? ratioarray[index] : ratioIncrement;
    // console.log("ratio",ratio)
    // console.log("yaxistags",yaxistag)
    // yaxisratioObj[yaxistag] = ratio;

    const startY = Shared_ChartBaseProp.margin.top + Shared_ChartBaseProp.margin.innerTop + totalHeight * tempcumulativeRatio;
    const endY = startY + totalHeight * ratio;
    // console.log(yaxistag,[endY, startY]);
    updateYScaleConfigByKey("yaxistag", yaxistag, { yaxisrange: [endY, startY], yaxisratio: ratio });

    // Shared_yaxisrange.push([endY, startY]);

    updateYaxisProp(yaxistag,{
      range:[endY, startY],
      fill:index==0?"red":"yellow"
    })
    tempcumulativeRatio += ratio;
  });
}

// export function setYcalefn(): void {
//     const {yscaletags}=getUniqueScaleTags()
//     const yscaletagsarray = yscaletags;
//     console.log("yscaletagsarray",yscaletagsarray)

//     yscaletagsarray.map((scaletag) => {
//       let scaleconfig = Shared_Yscaleconfig[scaletag];
//       if (scaleconfig.Yscale == null) {
//         if (scaleconfig.yaxisrange!=null){
//           console.log(scaletag,scaleconfig.yaxisrange,scaleconfig.datadomain())
//           const Yscale =d3.scaleLinear().range(scaleconfig.yaxisrange).domain(scaleconfig.datadomain())
//           updateYscaleconfig(scaletag,{
//             Yscale: Yscale
//           })
//         }
//       }
//     });
// }
