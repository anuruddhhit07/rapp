import { ScaleBand, ScaleLinear, ScaleTime } from "d3";
import { ChartDataObj } from "./chartdataTypes";


export interface YaxisPropItem {
    range:[number, number],
    borderColor: string,
    borderWidth: number,
    fill:string,
    opacity:number
}

export type yaxisrangeType = {
    [key: string]: YaxisPropItem
}; ;

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
        currentTransformX:d3.ZoomTransform

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

export interface YscaleItemProp {
    // Define properties for each configuration
    plotstatus:boolean;
    yaxistag:string;
    yaxisratio:number|null
    yaxisrange:[number,number] | null
    yscaletag: string;
    xpoint: number;
    scaleSide: 'Left'|'Right';
    ypadding:number;
    transform: { k: number };
    scaledata_max: () => number[];
    scaledata_min: () => number[];
    changeRangeTag: boolean;
    // visrange: (minrange?:number,maxrange?:number) => [number, number];
    // maxscaledata: () => number;
    // minscaledata: () => number;
    // datadomain: (minvisrange?: number, maxvisrange?: number) => [number, number];
    Yscale: ScaleLinear<number, number> |null
    currentTransformY:d3.ZoomTransform
    yzoomstatus:boolean,
    datadomain:(this: any, minvisrange?: number | undefined, maxvisrange?: number | undefined) => number[]
};

export interface YScaleConfigType {
    [key: string]: YscaleItemProp
}

export interface yAxisItemType<T extends keyof ChartDataObj = keyof ChartDataObj> {
    plotstatus: boolean;
    yscaletag: string;
    yaxistag:string;
    yaxisratio:number|null;
    x_point: number;
    xaxisdataTag:keyof ChartDataObj;  // for auto yvalue change on zooming based on min and max data in xdata range
    scaleSide:'Right'|'Left';
    changeRangeTag:boolean,
    highestYDataTag: keyof ChartDataObj;
    lowestYDataTag: keyof ChartDataObj;
    yzoomstatus:boolean,
    datadomain:(this: any, minvisrange?: number | undefined, maxvisrange?: number | undefined) => number[]
}