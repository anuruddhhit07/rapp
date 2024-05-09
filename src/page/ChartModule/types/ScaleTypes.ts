import * as d3 from 'd3';

interface Xscale_InputObj {
  id: string;
  xscaleName: string;
  y_point: number;
  scaledata: number[];
  scalerange: [number, number]
}

interface ScaleX_itemObject {
  id: string;
  xscaleName: string;
  y_point: number;
  scaleSide: "Top" | "Bottom";
  scaleType: "linear" | "scaleband" | "TimeScale";
  scaledata: number[];
  scalerange: [number, number];
  ticlavelmappedwith: string;
  plotstatus: boolean;
  zooming: boolean;
  
  datadomain: () => [number, number];
  createScale: () => void;
  Xscale: d3.ScaleLinear<number, number> | d3.ScaleTime<number, number> | d3.ScaleBand<string>;
}

interface XscaleObj {
  data: ScaleX_itemObject[];
  activeIds: number[];
  callback?: (activeIds: number[]) => void;
  setActiveCallback(callback: (activeIds: number[]) => void): void;
  updateActiveIds(): void;
}

function createXscaleObj(inputData: Xscale_InputObj[]): XscaleObj {
  let data: ScaleX_itemObject[] = inputData.map(item => ({
    id: item.id,
    xscaleName: item.xscaleName,
    y_point: item.y_point,
    scaleSide: "Bottom", // Example default value
    scaleType: "linear", // Example default value
    scaledata: item.scaledata,
    scalerange: [0, 100], // Example default range
    ticlavelmappedwith: "", // Example default value
    plotstatus: true, // Example default value
    zooming: false, // Example default value

    datadomain: function(): [number, number] {
      // Example implementation of datadomain method
      return [d3.min(this.scaledata), d3.max(this.scaledata)] as [number, number]; // Example domain
    },

    createScale: function(): void {
      if (this.scaleType === 'linear') {
        this.Xscale = d3.scaleLinear()
          .domain(this.datadomain())
          .range(this.scalerange);
      } else if (this.scaleType === 'band') {
        this.Xscale = d3.scaleBand()
          .domain(d3.range(this.scalerange.length) as any)
          .range(this.scalerange);
      }
    },
    Xscale: null as any // Type assertion since it will be assigned later
  }));

  return {
    data: data,
    activeIds: [],
    setActiveCallback(callback) {
      this.callback = callback;
    },
    updateActiveIds() {
      this.activeIds = this.data.filter(item => item.plotstatus).map(item => parseInt(item.id));
      if (this.callback) {
        this.callback(this.activeIds);
      }
    }
  };
}

// Example usage:
const inputData: Xscale_InputObj[] = [
  { id: "1", xscaleName: "XScale1", y_point: 10, scaledata: [10,14,15],scalerange: [0, 10] },
  { id: "2", xscaleName: "XScale2", y_point: 20, scaledata: [10,14,15],scalerange: [0, 20] },
  { id: "3", xscaleName: "XScale3", y_point: 30, scaledata: [10,14,15],scalerange: [10, 30] }
];

const xscaleObj: XscaleObj = createXscaleObj(inputData);
xscaleObj.data.forEach(item => item.createScale()); // Create scales for each item
console.log(xscaleObj.activeIds); // Example usage of activeIds
export  {xscaleObj}
