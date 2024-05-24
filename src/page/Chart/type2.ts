import d3 from "d3";
import { NumberValue, ScaleLinear } from "d3";

// Base OHLCV Interface
export interface OHLCV {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }
  
  // History Response Data Type extending OHLCV
  export type HistoryResponceData = OHLCV & {
    time: number;
  };
  
  // Breakout Data Interfaces
  export interface BreakoutData {
    broutfor: number;
    broutat: number;
    rejectat: number;
    brekoutcandleago: number;
    breakoutperiod: number;
    breakoutpercentage: number;
    highatref: number;
    highatrejec: number;
    highatbr: number;
    closeatbr: number;
  }
  
  export interface BreakoutData_ToBe_base {
    pricetobebreak: number;
    lastclose: number;
    laginprct: number;
    candeldistance: number;
    tobebreakcandelid: number;
    timestamp: number;
  }
  
  export interface BreakoutData_ToBeTable extends BreakoutData_ToBe_base {
    ticker: string;
    cdarray: string[];
    trianglecheck: number;
  }
  
  export interface BreakdownData_ToBe_base {
    pricetobebreakdown: number;
    lastclose: number;
    laginprct: number;
    candeldistance: number;
    tobebreakcandelid: number;
    timestamp: number;
  }
  
  export interface BreakoutData_ToBeBreakDownTable extends BreakdownData_ToBe_base {
    ticker: string;
    cdarray: string[];
    trianglecheck: number;
  }
  
  // Zigzag Data Interfaces
  export interface ZigzaglineData {
    time: number;
    orgindex: number;
    value: number;
    zigind: string;
    zigType: string;
    trend?: string;
  }
  
  export type BreakStrengthResult = Record<number, { totalWeight: number; numAttempts: number }>;
  
  export interface ZigzagDataSub {
    sublist: { orgindex: number; value: number }[];
    tobebreakdata?: BreakoutData_ToBe_base;
    tobebreakdowndata?: BreakdownData_ToBe_base;
    brlist: {
      rejectat: number;
      broutfor: number;
      broutat: number;
      highatref: number;
      highatrejec: number;
      breakoutperiod: number;
    }[];
  }
  
  export type ZigzagData = {
    sublist: ZigzaglineData[];
    brlist: BreakoutData[];
    lastbreakout: {
      latestbrindex: number;
      breakoutperiod: number;
      latestbreakobj: BreakoutData;
      laststockindex: number;
    };
    tobebreakdata: BreakoutData_ToBe_base;
    tobebreakdowndata: BreakdownData_ToBe_base;
    breakStrenth: BreakStrengthResult;
    Tr_patternMark: number;
  };
  
  // Indicator Data Interface
  export interface IndicatorData {
    LineInd: {
      crsi_avg: number[];
      crsi: number[];
    }[];
    signalline?: number[];
  }
  
  // Backtest Item and Result Types
  export type BacktestItem = {
    ID: number;
    index: number;
    buyorsell: "PatternBaseIndex" | "trigger" | "buy" | "sell" | "cancel_PatternBaseIndex" | "cancel_trigger";
    buyprice?: number;
    exitPrice?: number;
    pnl?: number;
    Comment?: string;
  };
  
  export type BacktestResult = {
    status: boolean;
    backtestLine: BacktestItem[];
    backtestreport: string;
  };
  
  // Fund Data and Processed Data Point Interfaces
  export interface FundData {
    category: string;
    values: number[];
  }
  
  export interface ProcessedDataPoint {
    x: string;
    y: number;
  }
  
  export interface CollectedData {
    x: string;
    y: number;
    z: number;
    z1: number;
    z2: number;
  }
  
  export interface HoldingData extends CollectedData {}
  
  // Chart Data Interface
  export interface ChartDataIN {
    histdata: OHLCV[];
    techdata?: {
      zigzagdatasub?: ZigzagDataSub;
      indicatordata?: IndicatorData;
      darvasBoxList?: any;
      btresult?: BacktestResult;
    };
    fundadata?: {
      profitLossData?: any;
      quartersData?: any;
      shareholdingData?: any;
    };
  }
  
  // Chart Data Type Interface
  export interface ChartDataType {
    xdata?: number[];
    xdata1?: number[];
    xdata2?: number[];
    timestamp: number[];
    line1?: number[];
    xindex: number[];
    open: number[];
    high: number[];
    low: number[];
    close: number[];
    volume: number[];
    ema?: any;
    sma?: any;
    rsi?: any;
    atr?: any;
    adx?: any;
    dmp?: any;
    dmn?: any;
    ohlckeyvlaue?: any;
    zigzaglineX?: number[];
    zigzaglineY?: number[];
    fundaMappedX1?: string[];
    fundaX1?: number[];
    fundaY2?: number[];
    fundaY1?: FundData[];
    fundaMultibarY?: { [key: string]: number[] };
    fundabarY1?: FundData[];
    tempfundata?: FundData[];
    Operating_ProfitX?: string[];
    Operating_ProfitY?: ProcessedDataPoint[];
    EPS_X?: string[];
    EPS_Y?: ProcessedDataPoint[];
    HoldingData_X?: string[];
    HoldingData_Y?: HoldingData[];
    pricetobreaklineX?: number[];
    pricetobreaklineY?: number[];
    pricetobreakdownlineX?: number[];
    pricetobreakdownlineY?: number[];
    crsidataavgY?: number[];
    crsidataY?: number[];
    breakoutlines?: () => any[];
    MDline?: () => any[];
    SIGNALLINE?: number[];
    backtestresultline?: BacktestItem[];
    backtestreport?: string;
    zigzagX?: number[];
    zigzagY?: number[];
    brlinedata?: {
      x: number[];
      y: number[];
      label: string;
    }[];
  }
  
  // Chart Base Data Interface
  export interface ChartBaseData {
    plotName: Set<string>;
    xscaleTag: Set<keyof xScaleConfigType>;
    yscaleTag: Set<keyof yScaleConfigType>;
    yaxisTag: Set<string>;
  }
  
  export interface YAxisItemType {
    range: [number, number];
    plotname: string[];
    yscaleTag: string[];
  }
  
  export interface YAxisType {
    [key: string]: YAxisItemType;
  }
  
  // XScale Config Interfaces
  export interface XScaleConfigInputType {
    xscaleTag: string;
    ypoint: number;
    xsaleType: "Linear" | "TimeScale" | "Band";
    scaleSide: "Bottom" | "Top";
    ticlavelmappedwith: keyof ChartDataType;
    xscaleRange: [number, number];
    xscaleDataTag: keyof ChartDataType;
    zoomstatus?: boolean;
  }
  
  export interface XScaleConfigItemType extends XScaleConfigInputType {
    xscale: (this: XScaleConfigItemType) => { domain: any; XSCALE: any };
  }
  
  export interface xScaleConfigType {
    [key: string]: XScaleConfigItemType;
  }
  
  // YScale Config Interfaces
  export interface YScaleConfigInputType {
    yscaleTag: string;
    scaleSide: "Left" | "Right";
    yaxisTag: string;
    xpoint: number;
    yaxisrange?: [number, number] | null;
    yscaleDataTag: "ohlc" | keyof ChartDataType;
    xscaleVisibleRange: [number, number];
    zoomstatus?: boolean;
    autozoom?: boolean;
  }
  
  export interface YScaleConfigItemType extends YScaleConfigInputType {
    yaxisrange: [number, number] | null;
    ydomaindata: [number, number];
    yscale: (this: YScaleConfigItemType) => {
      domain: Iterable<NumberValue>;
      YSCALE: ScaleLinear<number, number> | null;
      TranSFormedYscale: ScaleLinear<number, number> | null;
    };
    yzoomtransform: typeof d3.zoomIdentity;
  }

 
  
  export interface yScaleConfigType {
    [key: string]: YScaleConfigItemType;
  }
  
  // Plot Info Interfaces
  export interface PlotInfoInputType {
    plotStatus: boolean;
    plotName: string;
    xdataTag: keyof ChartDataType;
    ydataTag: "ohlc" | keyof ChartDataType;
    xscaleTag: keyof xScaleConfigType;
    yscaleTag: keyof yScaleConfigType;
    plotType: string;
    plotcolor?: string;
    buttontag?: string;
    buttonSvgIcon?: string;
    tooltip?: boolean;
    clipdata?: boolean;
  }
  
  export interface PlotInfoItem extends PlotInfoInputType {
    xdata: () => number[];
    ydata: () => number[];
    getTooltipHTML?: (this: PlotInfoItem, yaxistag: string, index: number, tooltiparea: d3.Selection<SVGGElement, any, HTMLElement, any>) => void;
  }
  
  export interface PlotInfoType {
    [key: string]: PlotInfoItem;
  }
  
  // Xscale-Yscale Relation and Plot Status by Button Tag Interfaces
  export interface XscaleYscaleRelation {
    [key: string]: string[];
  }
  
  export interface PlotStatusByButtonTag {
    [key: string]: { plotStatus: boolean; plotName: string; buttonid: string; buttonSvgIcon: string };
  }
  
  // Margin Interface
  export interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
    innerLeft: number;
    innerRight: number;
    innerBottom: number;
    innerTop: number;
  }
  
  // Chart Dimension Type Interface
  export interface ChartDimensionType {
    svgWidth: number;
    svgHeight: number;
    targetID: string;
    stockid: string;
    liveupdatefunction: () => void;
    margin: Margin;
    readonly width: number;
    readonly height: number;
  }
  
  export type PartialChartBaseSetupType = Partial<ChartDimensionType>;
  