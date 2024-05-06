import { YScaleConfigType } from "./AxisScaleType";
import { ChartDataObj } from "./chartdataTypes";



export interface DataToplotObjType {
    plotstatus: boolean; // Adjust the type according to the type of this.cdbutton
    xdata: () => number[] | number[][];
    ydata: () => number[] ; // Adjust the type according to the type of this.dataset
    // xdata: string;
    // xdatamap: boolean;
    linetype: "solid" | "dashed" | "dotted"; // Adjust according to possible values
    color: string|'red'|'blue';
    // yscalenumber: number;
    fill: "none" | "solid" | string; // Adjust according to possible values
    strokewidth: number;
    strokedasharray: string;
    yscaletag: string;
    xscaletag: string;
    plottype: "ohlc" | string; // Adjust according to possible values
    tagclass: string;
}

export interface DataToplotType {
    [key: string]: DataToplotObjType
}

export interface PlotConfigItemType<> {
    plotstatus: boolean;
    plotName: string;
    Ydata:keyof ChartDataObj|'ohlc';
    Xdata:keyof ChartDataObj
    yscaletag:string;
    xscaletag: string
    plottype: "ohlc" | string; // Adjust according to possible values
    tagclass: string;
    linetype?: "solid" | "dashed" | "dotted"; // Adjust according to possible values
    color?: string|'red'|'blue';
    fill?: "none" | "solid" | string; // Adjust according to possible values
    strokewidth?: number;
    strokedasharray?: string;
   
}