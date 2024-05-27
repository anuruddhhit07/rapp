export interface ChartOptionsIn {
    targetID: string;
    stockid: string;
    liveupdatefunction: () => void;
    chartsettings?: {
        tooltipshow?: {
            status: boolean;
        };
        mdbutton?: {
            status: boolean;
        };
        fiibutton?: {
            status: boolean;
        };
        opbutton?: {
            status: boolean;
        };
        epsbutton?: {
            status: boolean;
        };
        brlinebutton?: {
            status: boolean;
        };
        crsibutton?: {
            status: boolean;
        };
        adxbutton?: {
            status: boolean;
        };
        atrbutton?: {
            status: boolean;
        };
        emabutton?: {
            status: boolean;
        };
        rsibutton?: {
            status: boolean;
        };
        trendbutton?: {
            status: boolean;
        };
        zigzagbutton?: {
            status: boolean;
        };
        closebutton?: {
            status: boolean;
        };
        cdbutton?: {
            status: boolean;
        };
        volbutton?: {
            status: boolean;
        };
        sigbutton?: {
            status: boolean;
        };
        livebutton?: {
            status: boolean;
        };
        toggleTrendLine?: {
            status: boolean;
        };
        backgroundProp?: {
            color: string;
            opacity: number;
        };
        buttonProps?: {
            color: string;
            opacity: number;
        };
    };
}
export interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
    innerLeft: number;
    innerRight: number;
    innerBottom: number;
    innertop: number;
}
export interface ChartOptions extends ChartOptionsIn {
    margin: Margin;
}
export interface CandlestickData {
    xData: number;
    open: number;
    high: number;
    low: number;
    close: number;
}
export interface MulitlineLineChartData {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    label: string;
    color: string;
}
export interface ScatterDataType {
    xData: number;
    yData: number;
    label: string;
    color: string;
    size: number;
}
export interface ChartBaseSetupType {
    svgWidth: number;
    svgHeight: number;
    targetID: string;
    stockid: string;
    liveupdatefunction: () => void;
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
        innerLeft: number;
        innerRight: number;
        innerBottom: number;
        innerTop: number;
    };
    readonly width: number;
    readonly height: number;
}
export type PartialChartBaseSetupType = Partial<ChartBaseSetupType>;
export type CustomChartOptions = ChartOptionsIn & {
    [key: string]: never;
};
