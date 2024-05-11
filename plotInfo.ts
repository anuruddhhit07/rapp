// import { createNestedProxy } from "./proxyfunction";
let Shared_PlotInfo: PlotInfoType = {};
let Shared_XScaleConfig: xScaleConfigType = {};
let Shared_YScaleConfig: yScaleConfigType = {};



type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

const AA: OptionsFlags<Features> = {
  darkMode: true,
  newUserProfile: true,
};

interface ChartDataType {
  xindex: number[];
  close: number[];
  open: number[];
}

interface XScaleConfigInputType {
  xscaleTag: string;
  ypoint: number;
  xscaleRange: [number, number];
  xscaleDomainData: number[];
  zoomstatus?: boolean;
}

interface XScaleConfigItemType {
  xscaleTag: string;
  ypoint: number;
  xscaleRange: [number, number];
  xscaleDomainData: number[];
  zoomstatus: boolean;
}

interface xScaleConfigType {
  [key: string]: XScaleConfigItemType;
}

interface YScaleConfigInputType {
  yscaleTag: string;
  xpoint: number;
  yscaleRange: [number, number];
  yscaleDomainData: number[];
  xscaleVisibleRange: [number, number];
  zoomstatus?: boolean;
}
interface YScaleConfigItemType {
  yscaleTag: string;
  xpoint: number;
  yscaleRange: [number, number];
  yscaleDomainData: number[];
  xscaleVisibleRange: [number, number];
  zoomstatus: boolean;
}

interface yScaleConfigType {
  [key: string]: YScaleConfigItemType;
}

interface PlotInfoInputType {
  plotStatus: boolean;
  plotName: string;
  xdataTag: keyof ChartDataType;
  ydataTag: keyof ChartDataType;
  xscaleTag: keyof xScaleConfigType;
  yscaleTag: keyof xScaleConfigType;
  plotType: string;
  plotcolor?: string;
}

interface PlotInfoItem {
  plotStatus: boolean;
  plotName: string;
  xdata: number[];
  ydata: number[];
  xscaleTag: keyof xScaleConfigType;
  yscaleTag: keyof xScaleConfigType;
  plotType: string;
  plotcolor: string;
}
interface PlotInfoType {
  [key: string]: PlotInfoItem;
}

function updateShared_PlotInfo(
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

function updateShared_XScaleConfig(
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
function updateShared_YScaleConfig(
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

const chartData: ChartDataType = {
  xindex: [0, 1, 2, 5, 6],
  close: [11, 12, 13, 65, 34],
  open: [5, 8, 1, 3, 7],
};
const plotInfoInput: PlotInfoInputType[] = [
  {
    plotStatus: true,
    plotName: "ClosePlot",
    xdataTag: "xindex",
    ydataTag: "close",
    xscaleTag: "bot",
    yscaleTag: "TL",
    plotType: "line",
    plotcolor: "red",
  },
  {
    plotStatus: false,
    plotName: "OpenPlot",
    xdataTag: "xindex",
    ydataTag: "open",
    xscaleTag: "bot",
    yscaleTag: "TR",
    plotType: "line",
  },
];
const xScaleConfigInput: XScaleConfigInputType[] = [
  {
    xscaleTag: "bot",
    ypoint: 100,
    xscaleRange: [0, 100],
    xscaleDomainData: [0, 1, 2, 3, 4],
    zoomstatus: true,
  },
  {
    xscaleTag: "top",
    ypoint: 20,
    xscaleRange: [0, 100],
    xscaleDomainData: [0, 1, 2, 3, 4],
  },
];

const yScaleConfigInput: YScaleConfigInputType[] = [
  {
    yscaleTag: "TL",
    xpoint: 100,
    yscaleRange: [0, 100],
    yscaleDomainData: [0, 1, 2, 3, 4],
    xscaleVisibleRange: [0, 5],
  },
  {
    yscaleTag: "TR",
    xpoint: 20,
    yscaleRange: [0, 100],
    yscaleDomainData: [0, 1, 2, 3, 4],
    xscaleVisibleRange: [0, 5],
  },
];

// const xScaleConfig=
xScaleConfigInput.map((xscaleitem) => {
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

yScaleConfigInput.map((yscaleitem) => {
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

plotInfoInput.map((plotinfoitem) => {
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
console.log(Shared_PlotInfo);
console.log(Shared_XScaleConfig)
console.log(Shared_YScaleConfig)
// export {}

type NestedObject<T> = {
  [K in keyof T]: T[K] extends object ? NestedObject<T[K]> : T[K];
};

type UpdateCallback<T> = (rootProxy: T, proxy: NestedObject<T>) => void;

// function createNestedProxy<T extends object>(
//   obj: T,
//   updateCallback: UpdateCallback<T>,
//   rootProxy: T
// ): NestedObject<T> {
//   const proxy = new Proxy(obj, {
//     set(target, key, value) {
//       // If the value is an object, create a proxy for it recursively
//       if (typeof value === 'object' && value !== null) {
//         target[key as keyof typeof target] = createNestedProxy(value as any, updateCallback, rootProxy);
//       } else {
//         target[key as keyof typeof target] = value;
//       }
//       // Call the update callback whenever a property is set
//       updateCallback(rootProxy, proxy);
//       return true;
//     }
//   });
//   return proxy as NestedObject<T>;
// }