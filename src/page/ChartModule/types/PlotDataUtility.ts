import { Shared_ChartPlotData } from "../SharedObject";
import { ChartDataObj } from "./chartdataTypes";

type ProxyTarget = Record<string, any>;

interface ProxyHandler<T extends ProxyTarget> {
  get(target: T, key: string): any;
  set(target: T, key: string, value: any): boolean;
}

interface plotData_itemObject {
  id: string;
  PlotName: string;
  plotstatus: boolean;
  Xdata: number;
  Ydata: number;
  xscaleTage: string;
  yscaleTage: string;
}

interface plotData_InputObj {
  id: string;
  PlotName: string;
  XdataTag: keyof ChartDataObj;
  YdataTag: keyof ChartDataObj;
  xscaleTage: string;
  yscaleTage: string;
  plotstatus: boolean;
}

interface plotData_itemObject {
  id: string;
  PlotName: string;
  plotstatus: boolean;
  Xdata: number;
  Ydata: number;
  xscaleTage: string;
  yscaleTage: string;
}

interface PlotDataObjType {
  data: plotData_itemObject[];
  activeIds: { plotid: string[]; xscaleid: string[]; yscaleid: string[] };
  setActiveCallback(
    callback: (activeIds: {
      plotid: string[];
      xscaleid: string[];
      yscaleid: string[];
    }) => void
  ): void;
  updateActiveIds(): void;
}

const DefaultinputData: plotData_InputObj[] = [
  {
    id: "1",
    PlotName: "PL1",
    XdataTag: "xindex",
    YdataTag: "close",
    xscaleTage: "BOT1",
    yscaleTage: "TR1",
    plotstatus: true,
  },
  {
    id: "2",
    PlotName: "PL2",
    XdataTag: "xindex",
    YdataTag: "high",
    xscaleTage: "BOT2",
    yscaleTage: "TR2",
    plotstatus: false,
  },
  {
    id: "3",
    PlotName: "PL3",
    XdataTag: "xindex",
    YdataTag: "low",
    xscaleTage: "BOT3",
    yscaleTage: "TR3",
    plotstatus: true,
  },
];

const handler0: ProxyHandler<ProxyTarget> = {
  get(target, key) {
    if (key == 'isProxy')
      return true;

    const prop = target[key];
    // return if property not found
    if (typeof prop == 'undefined')
      return;

    // set value as proxy if object
    if (!prop.isProxy && typeof prop === 'object')
      target[key] = new Proxy(prop, handler0);

    return target[key];
  },
  set(target, key, value) {
    console.log('Setting', target, `.${key} to equal`, value);
    console.log("thissss",this);
    console.log(target);
    console.log(this);
    
    if (key=='plotstatus'){
      console.log("target",target.plotstatus);
      console.log(Reflect.get(target, key, value));
      if (target.plotstatus !== value) {
        console.log("for change");
      }
    }
    target[key] = value;
    return true;
  }
};

export function createPlotdataObj(this: any, 
  inputData: plotData_InputObj[] = DefaultinputData
): PlotDataObjType {
  let data: plotData_itemObject[] = inputData.map((item) => ({
    id: item.id,
    PlotName: item.PlotName,
    plotstatus: item.plotstatus,
    Xdata: Shared_ChartPlotData[item.XdataTag],
    Ydata: Shared_ChartPlotData[item.YdataTag],
    xscaleTage: item.xscaleTage,
    yscaleTage: item.yscaleTage,
  }));

  const activeIds = {
    plotid: Array.from(
      new Set(data.filter((item) => item.plotstatus).map((item) => item.id))
    ),
    xscaleid: Array.from(
      new Set(data.filter((item) => item.plotstatus).map((item) => item.xscaleTage))
    ),
    yscaleid: Array.from(
      new Set(data.filter((item) => item.plotstatus).map((item) => item.yscaleTage))
    ),
  };

  const updateActiveIds = function (): void {
    activeIds.plotid = Array.from(
      new Set(data.filter((item) => item.plotstatus).map((item) => item.id))
    );
    activeIds.xscaleid = Array.from(
      new Set(data.filter((item) => item.plotstatus).map((item) => item.xscaleTage))
    );
    activeIds.yscaleid = Array.from(
      new Set(data.filter((item) => item.plotstatus).map((item) => item.yscaleTage))
    );
  };

  const setActiveCallback = function (
    callback: (activeIds: {
      plotid: string[];
      xscaleid: string[];
      yscaleid: string[];
    }) => void
  ): void {
    console.log("activeIds", activeIds);
    // Implement your logic for handling the callback here
  };
 
  const proxyData = new Proxy(data, handler0) as plotData_itemObject[]  // Cast for type safety

  

  return {
    data: proxyData,
    activeIds,
    setActiveCallback,
    updateActiveIds, // Expose updateActiveIds directly
  };
}


// function createProxy(plotDataObj: PlotDataObjType): PlotDataObjType {
//   return new Proxy(plotDataObj, {
//     set: function (target, prop, value) {
//       console.log(target, prop, value)
//       if (prop === 'data') {
//         // Trigger the callback when plotstatus changes
//         const oldValue = target[prop];
//         const newValue = value;
//         if (oldValue !== newValue) {
//           const callback = target.setActiveCallback.bind(target);
//           for (let i = 0; i < newValue.length; i++) {
//             if (oldValue[i]?.plotstatus !== newValue[i]?.plotstatus) {
//               const activeIds = {
//                 plotid: newValue.map((item: { id: any; }) => item.id) as  string[] ,
//                 xscaleid: newValue.map((item: { xscaleTage: any; }) => item.xscaleTage) as  string[],
//                 yscaleid: newValue.map((item: { yscaleTage: any; }) => item.yscaleTage) as  string[]
//               };
//               console.log("activeIds",activeIds)
//               // callback(activeIds);
//               break;
//             }
//           }
//         }
//       }
//       return Reflect.set(target, prop, value);
//     }
//   });
// }

// // Usage example:
// const plotDataObj: PlotDataObjType = {
//   data: [
//     { id: '1', PlotName: 'Plot 1', plotstatus: true, Xdata: 0, Ydata: 0, xscaleTage: 'x1', yscaleTage: 'y1' },
//     { id: '2', PlotName: 'Plot 2', plotstatus: false, Xdata: 0, Ydata: 0, xscaleTage: 'x2', yscaleTage: 'y2' },
//   ],
//   activeIds: { plotid: [], xscaleid: [], yscaleid: [] },
//   setActiveCallback: (callback) => { console.log(callback); },
//   updateActiveIds: () => { console.log('Updating active IDs...'); }
// };

// const proxiedPlotDataObj = createProxy(plotDataObj);
// export {proxiedPlotDataObj}

// Changing plotstatus should trigger the callback
// proxiedPlotDataObj.data[0].plotstatus = false;

// const handler: ProxyHandler<ProxyTarget> = {
//   get(target, key) {
//     if (key == 'isProxy')
//       return true;

//     const prop = target[key];
//     // return if property not found
//     if (typeof prop == 'undefined')
//       return;

//     // set value as proxy if object
//     if (!prop.isProxy && typeof prop === 'object')
//       target[key] = new Proxy(prop, handler);

//     return target[key];
//   },
//   set(target, key, value) {
//     console.log('Setting', target, `.${key} to equal`, value);
//     // console.log(plotDataObj);
//     console.log(target);
    
//     if (key=='plotstatus'){
//       console.log("target",target.plotstatus);
//       console.log(Reflect.get(target, key, value));
//       if (target.plotstatus !== value) {
//         console.log("for change");
//         // for (let i = 0; i < plotDataObj.data.length; i++) {

//         // }

//       }

//     //   const callback=plotDataObj.setActiveCallback.bind(target)
//     // console.log(key);

//       // const oldValue = target[prop];
//       // const newValue = value;
//       // if (oldValue !== newValue) {
//       //   const callback = target.setActiveCallback.bind(target);
//       //   for (let i = 0; i < newValue.length; i++) {
//       //     if (oldValue[i]?.plotstatus !== newValue[i]?.plotstatus) {
//       //       const activeIds = {
//       //         plotid: newValue.map((item: { id: any; }) => item.id) as  string[] ,
//       //         xscaleid: newValue.map((item: { xscaleTage: any; }) => item.xscaleTage) as  string[],
//       //         yscaleid: newValue.map((item: { yscaleTage: any; }) => item.yscaleTage) as  string[]
//       //       };
//       //       console.log("activeIds",activeIds)
//       //       // callback(activeIds);
//       //       break;
//       //     }
//       //   }
//       // }

//     }
//     // callback()

//     // const callback = target.setActiveCallback.bind(target)
//     // console.log(callback);
//     // callback("test call back")

//     // todo : call callback

//     target[key] = value;
//     return true;
//   }
// };

// const test = {
//   string: "data",
//   number: 231321,
//   object: {
//     string: "data",
//     number: 32434
//   },
//   array: [
//     1, 2, 3, 4, 5
//   ],
// };

// export const proxyobj = new Proxy(test, handler);
// export const proxyobj2 = new Proxy(plotDataObj, handler)

// console.log(proxyobj);
// console.log(proxyobj);
// console.log(proxyobj.string); // "data"
// proxyobj.string = "Hello";
// console.log(proxyobj.string); // "Hello"
// console.log(proxyobj.object); // { "string": "data", "number": 32434 }
// proxyobj.object.string = "World";
// console.log(proxyobj.object.string);

// const handler1: ProxyHandler<plotData_itemObject> = {
//   get(target: plotData_itemObject, key: string | symbol): any {
//     if (key === 'isProxy') {
//       return true;
//     }

//     // Type assertion for safe property access
//     const prop = target[key as keyof plotData_itemObject];

//     // Handle undefined properties gracefully
//     if (typeof prop === 'undefined') {
//       return undefined; // Or return a default value if applicable
//     }

//     // Recursively create proxies for nested objects
//     // if (!prop.isProxy && typeof prop === 'object') {
//     //   target[key] = new Proxy(prop, handler1);
//     // }

//     return prop;
//   },

//   set(target: plotData_itemObject, key: string, value: any) {
//     // ... existing logic
//     console.log("target",target);

//     if (key === 'plotstatus') {
//       console.log("target", target.plotstatus);
//       console.log(Reflect.get(target, key, value));
//       if (target.plotstatus !== value) {
//         console.log("for change");
//         updateActiveIds(); // Call updateActiveIds directly
//       }
//     }
//     // target[key] = value;
//     return true;
//   },
// };

