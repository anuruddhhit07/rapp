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

const handler: ProxyHandler<ProxyTarget> = {
  get(target, key) {
    if (key == 'isProxy')
      return true;

    const prop = target[key];

    const isProxy = Symbol("isProxy")

    // return if property not found
    if (typeof prop == 'undefined')
      return;

    // set value as proxy if object
    if (!prop.isProxy && typeof prop === 'object')
      target[key] = new Proxy(prop, handler);

    return target[key];
  },
  set(target, key, value) {
    console.log('Setting', target, `.${key} to equal`, value);

    // todo : call callback

    target[key] = value;
    return true;
  }
};

const test = {
  string: "data",
  number: 231321,
  object: {
    string: "data",
    number: 32434
  },
  array: [
    1, 2, 3, 4, 5
  ],
};

const proxyobj = new Proxy(test, handler);
