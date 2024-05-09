import { Shared_ChartPlotData } from '../SharedObject';
import { ChartDataObj } from './chartdataTypes';

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
  setActiveCallback(callback: (activeIds: { plotid: string[]; xscaleid: string[]; yscaleid: string[] }) => void): void;
  updateActiveIds(): void;
}

const DefaultinputData: plotData_InputObj[] = [
  { id: "1", PlotName: "PL1", XdataTag: 'xindex', YdataTag: 'close', xscaleTage: 'BOT', yscaleTage: 'TR', plotstatus: true },
  { id: "2", PlotName: "PL2", XdataTag: 'xindex', YdataTag: 'high', xscaleTage: 'BOT', yscaleTage: 'TR', plotstatus: true },
  { id: "3", PlotName: "PL3", XdataTag: 'xindex', YdataTag: 'low', xscaleTage: 'BOT', yscaleTage: 'TR', plotstatus: true }
];

export function createPlotdataObj(inputData: plotData_InputObj[] = DefaultinputData): PlotDataObjType {
  let data: plotData_itemObject[] = inputData.map(item => ({
    id: item.id,
    PlotName: item.PlotName,
    plotstatus: item.plotstatus,
    Xdata: Shared_ChartPlotData[item.XdataTag],
    Ydata: Shared_ChartPlotData[item.YdataTag],
    xscaleTage: item.xscaleTage,
    yscaleTage: item.yscaleTage,
  }));

  const activeIds = {
    plotid: Array.from(new Set(data.filter(item => item.plotstatus).map(item => item.id))),
    xscaleid: Array.from(new Set(data.filter(item => item.plotstatus).map(item => item.xscaleTage))),
    yscaleid: Array.from(new Set(data.filter(item => item.plotstatus).map(item => item.yscaleTage))),
  };

  const updateActiveIds = function (): void {
    activeIds.plotid = Array.from(new Set(data.filter(item => item.plotstatus).map(item => item.id)));
    activeIds.xscaleid = Array.from(new Set(data.filter(item => item.plotstatus).map(item => item.xscaleTage)));
    activeIds.yscaleid = Array.from(new Set(data.filter(item => item.plotstatus).map(item => item.yscaleTage)));
  };

  const proxyData = new Proxy(data, {
    set: function (target, prop, value) {
      if (prop === 'length') {
        updateActiveIds();
      }
      return Reflect.set(target, prop, value);
    },
    deleteProperty: function (target, prop) {
      if (prop === 'length') {
        updateActiveIds();
      }
      return Reflect.deleteProperty(target, prop);
    }
  });

  const setActiveCallback = function (callback: (activeIds: { plotid: string[]; xscaleid: string[]; yscaleid: string[] }) => void): void {
    // throw new Error('Function not implemented.');
    console.log("activeIds",activeIds)
  };

  return {
    data: proxyData,
    activeIds,
    setActiveCallback,
    updateActiveIds
  };
}
