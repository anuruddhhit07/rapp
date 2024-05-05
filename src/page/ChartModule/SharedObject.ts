import { defaultChartBaseProp } from "./SharedDefaultValue";
import { XScaleConfigType, XscaleItemProp, YScaleConfigType } from "./types/AxisScaleType";
import { ChartBaseSetupType } from "./types/chartSetuptype";
import { ChartDataObj } from "./types/chartdataTypes";

export let Shared_ChartPlotData: ChartDataObj = {
    timestamp: [],
    xindex: [],
    open: [],
    high: [],
    low: [],
    close: [],
    volume: []
    // Other properties as needed
};

export let Shared_ChartBaseProp:ChartBaseSetupType=defaultChartBaseProp

export let Xscaleconfig:XScaleConfigType={}
export let Yscaleconfig:YScaleConfigType={}

export function updateChartPlotData(data: ChartDataObj) {
    Shared_ChartPlotData = data;
}

export function updateChartBaseProp(partialData: Partial<ChartBaseSetupType>): void {
    Object.assign(Shared_ChartBaseProp, partialData);
}

export function updateXscaleconfig(key: string, partialData: Partial<XscaleItemProp>): void {
    // Check if the key already exists in Xscaleconfig
    if (Xscaleconfig.hasOwnProperty(key)) {
        // Merge the partial data with the existing XscaleItemProp object
        Xscaleconfig[key] = { ...Xscaleconfig[key], ...partialData };
    } else {
        // If the key does not exist, create a new XscaleItemProp object with the provided data
        Xscaleconfig[key] = {xscaleName: '',
        y_point: 0,
        scaleSide: 'Top',
        scaleType: 'linear',
        scaledatatag: 'timestamp',
        scalerange: [0, 0],
        datadomain: [0, 0],
        ticlavelmappedwith: 'timestamp',
        plotstatus: false,
        zooming: false,
        Xscale: null, ...partialData };
    }
}