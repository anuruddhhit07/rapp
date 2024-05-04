import { ChartDataObj } from "./chartdataTypes";



export interface PlotConfigType {
    plot: boolean; // Adjust the type according to the type of this.cdbutton
    data: () => number[] | number[][]; // Adjust the type according to the type of this.dataset
    xdata: string;
    xdatamap: boolean;
    linetype: "solid" | "dashed" | "dotted"; // Adjust according to possible values
    color: string;
    yscalenumber: number;
    fill: "none" | "solid" | string; // Adjust according to possible values
    strokewidth: number;
    strokedasharray: string;
    yscaletag: string;
    xscaletag: string;
    plottype: "ohlc" | string; // Adjust according to possible values
    tagclass: string;
}

export interface PlotConfigItemType<T extends keyof ChartDataObj = keyof ChartDataObj> {
    plotstatus: boolean;
    plotName: string;
    datatoPlot:keyof ChartDataObj|'ohlc'
}