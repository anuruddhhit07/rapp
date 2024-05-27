import { ChartBaseData, ChartDimensionType, PlotInfoItem, PlotInfoType, PlotStatusByButtonTag, XScaleConfigItemType, XscaleYscaleRelation, YScaleConfigItemType, xScaleConfigType, yScaleConfigType, yaxisItemType, yaxisType } from "../../types";
import { ChartDataType } from "../../types";
import { NumberValue, ScaleLinear } from "d3";
export declare let Shared_ChartPlotData: ChartDataType;
export declare let Shared_ChartDimension: ChartDimensionType;
export declare let Shared_XScaleConfig: xScaleConfigType;
export declare let Shared_YScaleConfig: yScaleConfigType;
export declare let Shared_PlotInfo: PlotInfoType;
export declare let Shared_ButtonProp: PlotStatusByButtonTag;
export declare let Shared_XYrelation: XscaleYscaleRelation;
export declare let Shared_ChartBaseData: ChartBaseData;
export declare let Shared_yaxisProp: yaxisType;
export declare function updateChartPlotData(data: ChartDataType): void;
export declare function updateChartBaseProp(partialData: Partial<ChartDimensionType>): void;
export declare function updateYaxis(key: string, partialData: Partial<yaxisItemType>, reset?: boolean): void;
export declare function getAxisKeyForRangeValue(value: number): string | undefined;
export declare function getPlotNamesAndYScaleTagsByYAxisTag(): {
    [key: keyof yaxisType]: {
        plotName: (keyof PlotInfoType)[];
        yscaleTag: (keyof yScaleConfigType)[];
    };
};
export declare function getXscale(this: any): {
    domain: Iterable<NumberValue>;
    XSCALE: any;
};
export declare function getYscale(this: YScaleConfigItemType): {
    domain: Iterable<NumberValue>;
    YSCALE: ScaleLinear<number, number> | null;
    TranSFormedYscale: ScaleLinear<number, number> | null;
};
export declare function updateShared_PlotInfo(key: string, partialData: Partial<PlotInfoItem>): void;
export declare function updateShared_XScaleConfig(key: string, partialData: Partial<XScaleConfigItemType>): void;
export declare function updateShared_YScaleConfig(key: string, partialData: Partial<YScaleConfigItemType>): void;
export declare const updateXscaleconfig: (xScaleConfigInputArray?: import("../../types").XScaleConfigInputType[]) => void;
export declare const updateYscaleconfig: (yScaleConfigInputArray?: import("../../types").YScaleConfigInputType[]) => void;
export declare const updateplotInfo: (plotInfoInputArray?: import("../../types").PlotInfoInputType[]) => void;
export declare function getUniquePlotsWithStatusTrue(plotInfo: PlotInfoType): {
    plotName: Set<string>;
    xscaleTag: Set<keyof xScaleConfigType>;
    yscaleTag: Set<keyof yScaleConfigType>;
    yaxisTag: Set<string>;
};
export declare function updateSharedChartData<T extends Record<string, any>>(data: {
    [K in keyof T]: T[K][];
}): void;
export declare function getPlotStatusByButtonTag(): void;
export declare function collectKeysByButtonId(buttonId: string): string[];
export declare function updateYScaleConfigByKey(keyName: keyof YScaleConfigItemType, value: string, partialData: Partial<YScaleConfigItemType>): void;
export declare function getYaxisRatio(yaxistags: string[]): {
    [key: string]: {
        yaxisrange: [number, number];
    };
};
export declare function generateRelationObject(): void;
export declare function groupDataByPlotType(): {
    [key: string]: string[];
};
