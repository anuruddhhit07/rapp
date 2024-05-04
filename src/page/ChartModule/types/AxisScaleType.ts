import { ChartDataObj } from "./chartdataTypes";

export interface XScaleConfigType  {
    [key: string]: {
        ypoint: number;
        scaleSide: string;
        scaleType: string;
        scaledatatag: string;
        scalerange: [number, number];
        datadomain: number[] | (() => number[]);
        mappedwith: string;
        plotaxis: boolean;
        zooming: boolean;
    };
};

export interface YScaleConfigType {
    [key: string]: {
        // Define properties for each configuration
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
    status: boolean;
    yscaleName: string;
    x_point: number;
    xaxisdataTag:keyof ChartDataObj;  // for auto yvalue change on zooming based on min and max data in xdata range
    scaleSide:'Right'|'Left';
    changeRangeTag:boolean,
    highestYDataTag: keyof ChartDataObj;
    lowestYDataTag: keyof ChartDataObj;
}