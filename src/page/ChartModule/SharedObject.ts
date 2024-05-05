import { defaultChartBaseProp } from "./SharedDefaultValue";
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


export function updateChartPlotData(data: ChartDataObj) {
    Shared_ChartPlotData = data;
}

export function updateChartBaseProp(partialData: Partial<ChartBaseSetupType>): void {
    Object.assign(Shared_ChartBaseProp, partialData);
}