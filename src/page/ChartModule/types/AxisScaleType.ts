import { ScaleBand, ScaleLinear, ScaleTime } from "d3";
import { ChartDataObj } from "./chartdataTypes";

export interface XscaleItemProp {
    xscaleName:string;
        y_point: number;
        scaleSide: 'Top'|'Bottom';
        scaleType: 'linear' | 'scaleband' | 'TimeScale';
        scaledatatag: keyof ChartDataObj;
        scalerange: [number, number];
        datadomain: [number, number] ;
        ticlavelmappedwith: keyof ChartDataObj;
        plotstatus: boolean;
        zooming: boolean;
        Xscale: ScaleLinear<number, number> | ScaleTime<number, number> | ScaleBand<string> |null

}
export interface XScaleConfigType  {
    [key: string]: XscaleItemProp
};
export type UpdateXscaleConfig<T, K extends keyof T> = (xscaleConfigItem: T, keyToUpdate: K, keyValue: T[K]) => T;

export interface xAxisItemType<T extends keyof ChartDataObj = keyof ChartDataObj> {
    y_point: number;
    xscaleName:string;
    scaleType: 'linear' | 'scaleband' | 'TimeScale' ;
    scalerange: [number, number];
    plotstatus: boolean;
    zooming: boolean;
    scaledatatag:keyof ChartDataObj;  // for auto yvalue change on zooming based on min and max data in xdata range
    ticlavelmappedwith: keyof ChartDataObj;
    scaleSide:'Top'|'Bottom';
    
}

export interface YScaleConfigType {
    [key: string]: {
        // Define properties for each configuration
        plotstatus:boolean;
        yaxisnumer:number;
        yaxistag: string;
        xpoint: number;
        scaleSide: string;
        ypadding: () => number;
        transform: { k: number };
        scaledata_max: () => number[];
        scaledata_min: () => number[];
        changeRangeTag: boolean;
        visrange: (minrange?:number,maxrange?:number) => [number, number];
        maxscaledata: () => number;
        minscaledata: () => number;
        datadomain: () => [number, number];
    };
}

export interface yAxisItemType<T extends keyof ChartDataObj = keyof ChartDataObj> {
    plotstatus: boolean;
    yscaleName: string;
    yaxisnumer:number;
    x_point: number;
    xaxisdataTag:keyof ChartDataObj;  // for auto yvalue change on zooming based on min and max data in xdata range
    scaleSide:'Right'|'Left';
    changeRangeTag:boolean,
    highestYDataTag: keyof ChartDataObj;
    lowestYDataTag: keyof ChartDataObj;
}