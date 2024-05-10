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
    callback: (activeIds: any) => void
  ): void;
  updateActiveIds(): void;
}

function createProxy(plotDataObj: PlotDataObjType): PlotDataObjType {
  return new Proxy(plotDataObj, {
    set: function (target, prop, value) {
      console.log(target, prop, value)
      if (prop === 'data') {
        // Trigger the callback when plotstatus changes
        const oldValue = target[prop];
        const newValue = value;
        if (oldValue !== newValue) {
          const callback = target.setActiveCallback.bind(target);
          for (let i = 0; i < newValue.length; i++) {
            if (oldValue[i]?.plotstatus !== newValue[i]?.plotstatus) {
              const activeIds = {
                plotid: newValue.map((item: { id: any; }) => item.id) as  string[] ,
                xscaleid: newValue.map((item: { xscaleTage: any; }) => item.xscaleTage) as  string[],
                yscaleid: newValue.map((item: { yscaleTage: any; }) => item.yscaleTage) as  string[]
              };
              console.log("activeIds",activeIds)
              // callback(activeIds);
              break;
            }
          }
        }
      }
      return Reflect.set(target, prop, value);
    }
  });
}

// Usage example:
const plotDataObj: PlotDataObjType = {
  data: [
    { id: '1', PlotName: 'Plot 1', plotstatus: true, Xdata: 0, Ydata: 0, xscaleTage: 'x1', yscaleTage: 'y1' },
    { id: '2', PlotName: 'Plot 2', plotstatus: false, Xdata: 0, Ydata: 0, xscaleTage: 'x2', yscaleTage: 'y2' },
  ],
  activeIds: { plotid: [], xscaleid: [], yscaleid: [] },
  setActiveCallback: (callback) => { console.log(callback); },
  updateActiveIds: () => { console.log('Updating active IDs...'); }
};

const proxiedPlotDataObj = createProxy(plotDataObj);
export {proxiedPlotDataObj}

// Changing plotstatus should trigger the callback
// proxiedPlotDataObj.data[0].plotstatus = false;
