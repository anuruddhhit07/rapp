import { defaultChartBaseProp } from "./SharedDefaultValue";
import { XScaleConfigType, XscaleItemProp, YScaleConfigType, YscaleItemProp } from "./types/AxisScaleType";
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

export let Shared_Xscaleconfig:XScaleConfigType={}
export let Shared_Yscaleconfig:YScaleConfigType={}

export function updateChartPlotData(data: ChartDataObj) {
    Shared_ChartPlotData = data;
}

export function updateChartBaseProp(partialData: Partial<ChartBaseSetupType>): void {
    Object.assign(Shared_ChartBaseProp, partialData);
}

export function updateXscaleconfig(key: string, partialData: Partial<XscaleItemProp>): void {
    // Check if the key already exists in Xscaleconfig
    if (Shared_Xscaleconfig.hasOwnProperty(key)) {
        // Merge the partial data with the existing XscaleItemProp object
        Shared_Xscaleconfig[key] = { ...Shared_Xscaleconfig[key], ...partialData };
    } else {
        // If the key does not exist, create a new XscaleItemProp object with the provided data
        Shared_Xscaleconfig[key] = {xscaleName: '',
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

export function updateYscaleconfig(key: string, partialData: Partial<YscaleItemProp>): void {
    // Check if the key already exists in Yscaleconfig
    if (Shared_Yscaleconfig.hasOwnProperty(key)) {
        // Merge the partial data with the existing YscaleItemProp object
        Shared_Yscaleconfig[key] = { ...Shared_Yscaleconfig[key], ...partialData };
    } else {
        // If the key does not exist, create a new YscaleItemProp object with the provided data
        Shared_Yscaleconfig[key] = {
            plotstatus: false,
            yaxisnumer: 0,
            yaxistag: '',
            xpoint: 0,
            scaleSide: '',
            ypadding: () => 0,
            transform: { k: 0 },
            scaledata_max: () => [],
            scaledata_min: () => [],
            changeRangeTag: false,
            visrange: (minrange?: number, maxrange?: number) => [0, 0],
            maxscaledata: () => 0,
            minscaledata: () => 0,
            datadomain: () => [0, 0],
            ...partialData // Merge with provided partial data
        };
    }
}
