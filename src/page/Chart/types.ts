export interface DefaultChartParameter {
  divWidth?: number;
  divHeight?: number;
  liveFunction?: () => void;
}

import { NumberValue, ScaleLinear } from "d3";

import * as d3 from "d3";

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

const AA: OptionsFlags<Features> = {
  darkMode: true,
  newUserProfile: true,
};



export interface OHLCV {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
export type HistoryResponceData = {
  time: number;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};
export interface zigzagdatasub {
  sublist: { orgindex: number; value: number }[];
  tobebreakdata?: { tobebreakcandelid: number; pricetobebreak: number };
  tobebreakdowndata?: { tobebreakcandelid: number; pricetobebreakdown: number };
  brlist: {
    rejectat: number;
    broutfor: number;
    broutat: number;
    highatref: number;
    highatrejec: number;
    breakoutperiod: number;
  }[];
}

interface BreakStrengthResult {
  [percentageRange: number]: { totalWeight: number; numAttempts: number };
}
export interface ZigzaglineData {
  time: number;
  orgindex: number;
  value: number;
  zigind: string;
  zigType: string;
  trend?: string;
  // marker?: number;
}
export type BreakoutData = {
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
};
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

export type ZigzagData = {
  sublist: ZigzaglineData[]; // Replace 'any' with the appropriate type for 'sublist'
  brlist: BreakoutData[]; // Replace 'any' with the appropriate type for 'brlist'
  lastbreakout: { latestbrindex: number; breakoutperiod: number; latestbreakobj: BreakoutData; laststockindex: number }; // Replace 'any' with the appropriate type for 'lastbreakout'
  tobebreakdata: BreakoutData_ToBe_base;
  tobebreakdowndata: BreakdownData_ToBe_base;
  breakStrenth: BreakStrengthResult;
  Tr_patternMark: number;
};

interface indicatordata {
  LineInd: {
    crsi_avg: number[];
    crsi: number[];
  }[];
  signalline?: number[];
}

export type backtestitem={
  ID: number;
  index: number;
  buyorsell: "PatternBaseIndex" | "trigger" | "buy" | "sell" | "cancel_PatternBaseIndex" | "cancel_trigger";
  buyprice?: number;
  exitPrice?: number;
  pnl?: number;
  Comment?: string;
}

export type backtestresult = {
  status: boolean;
  backtestLine: backtestitem[];
  backtestreport: string;
};

// type backtestfinaloutput = {
//   // query_output: any[];
//   // common_output: {};
//   backtestresult: backtestresult ;
// };

interface FundData {
  category: string;
  values: number[];
}

interface CollectedData {
  x: string;
  y: number;
  z: number;
  z1: number;
  z2: number;
}

interface HoldingData {
  x: string;
  y: number;
  z: number;
  z1: number;
  z2: number;
}

interface ProcessedDataPoint {
  x: string;
  y: number;
}

export interface ChartDataIN {
  histdata: OHLCV[];
  techdata?: {
    zigzagdatasub?: zigzagdatasub;
    indicatordata?: indicatordata;
    darvasBoxList?: any;
    btresult?: backtestresult;
  };
  fundadata?: {
    profitLossData?: any;
    quartersData?: any;
    shareholdingData?: any;
  };
}

export interface brlistType {
  x: number[];
  y: number[];
  label: string;
}

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
  ema?: any; // Placeholder for EMA calculation function name
  sma?: any; // Placeholder for SMA calculation function name
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
  backtestresultline?: backtestitem[];
  backtestreport?: string;
  zigzagX?: number[];
  zigzagY?: number[];
  brlinedata?: brlistType[];
}

//   export {ChartDataIN,ChartDataObj}

export interface ChartBaseData {
  plotName: Set<string>;
  xscaleTag: Set<keyof xScaleConfigType>;
  yscaleTag: Set<keyof yScaleConfigType>;
  yaxisTag: Set<string>;
}

export interface yaxisItemType {
  range: [number, number];
  plotname: string[];
  yscaleTag: string[];
}

export interface yaxisType {
  [key: string]: yaxisItemType;
}

// export interface ChartBaseData{
//   plotName: string[],
//   xscaleTag: string[],
//   yscaleTag: string[]
// }

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

export interface XScaleConfigItemType {
  xscaleTag: string;
  xsaleType: "Linear" | "TimeScale" | "Band";
  scaleSide: "Bottom" | "Top";
  ticlavelmappedwith: keyof ChartDataType;
  ypoint: number;
  xscaleRange: [number, number];
  xscaleDataTag: keyof ChartDataType;
  zoomstatus: boolean;
  xscale: (this: XScaleConfigItemType) => { domain: any; XSCALE: any };
}

export interface xScaleConfigType {
  [key: string]: XScaleConfigItemType;
}

export interface YScaleConfigInputType {
  yscaleTag: string;
  scaleSide: "Left" | "Right";
  yaxisTag: string;
  xpoint: number;
  // yscaleRange: [number, number];
  yaxisrange?: [number, number];
  yscaleDataTag: "ohlc" | keyof ChartDataType;
  xscaleVisibleRange: [number, number];
  zoomstatus?: boolean;
  autozoom?: boolean;
}
export interface YScaleConfigItemType {
  yscaleTag: string;
  scaleSide: "Left" | "Right";
  yaxisTag: string;
  xpoint: number;
  // yscaleRange: [number, number];
  yaxisrange: [number, number] | null;
  yscaleDataTag: "ohlc" | keyof ChartDataType;
  xscaleVisibleRange: [number, number];
  zoomstatus: boolean;
  autozoom: boolean;
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
  buttonSvgIcon?:string;
  tooltip?: boolean;
  clipdata?: boolean;
}

export interface PlotInfoItem {
  plotStatus: boolean;
  plotName: string;
  xdata: () => number[];
  ydata: () => number[];
  xscaleTag: keyof xScaleConfigType;
  yscaleTag: keyof xScaleConfigType;
  plotType: string;
  plotcolor: string;
  buttontag: string;
  buttonSvgIcon:string;
  tooltip: boolean;
  getTooltipHTML?: (this: PlotInfoItem, yaxistag: string, index: number, tooltiparea: d3.Selection<SVGGElement, any, HTMLElement, any>) => void;
  clipdata: boolean;
}
export interface PlotInfoType {
  [key: string]: PlotInfoItem;
}

export interface XscaleYscaleRelation {
  [key: string]: string[];
}

export interface PlotStatusByButtonTag {
  [key: string]: { plotStatus: boolean; plotName: string; buttonid: string; buttonSvgIcon:string; };
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

// export interface ChartOptions extends ChartOptionsIn {
//   margin: Margin;
// }

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

export interface ChartDimensionType {
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
    innerTop: number; // Fixed typo in the property name "innertop" -> "innerTop"
  };
  readonly width: number;
  readonly height: number;
}

export type PartialChartBaseSetupType = Partial<ChartDimensionType>;
