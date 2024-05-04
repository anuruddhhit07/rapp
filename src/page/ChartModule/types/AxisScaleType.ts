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