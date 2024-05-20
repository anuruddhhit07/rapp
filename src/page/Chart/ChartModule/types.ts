export interface DefaultChartParameter {
    divWidth?: number;
    divHeight?: number;
  }

  import { NumberValue, ScaleLinear } from "d3";

import * as d3 from 'd3'


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

// export interface ChartDataType {
//   xindex: number[];
//   close: number[];
//   open: number[];
// }

interface OHLCV {
    timestamp: number;
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
}
interface zigzagdata{
    sublist: { orgindex: number; value: number }[];
    tobebreakdata?: { tobebreakcandelid: number; pricetobebreak: number };
    tobebreakdowndata?: { tobebreakcandelid: number; pricetobebreakdown: number };
    brlist: {
      rejectat: number | null;
      broutfor: number;
      broutat: number;
      highatref: number;
      highatrejec: number;
      breakoutperiod: string;
    }[];
  }

interface indicatordata{
    LineInd: {
      crsi_avg: number[];
      crsi: number[];
    }[];
    signalline?: number[];
  }

interface backtestdata{
    backtestresult: {
      backtestLine: number[];
      backtestreport: string[];
    };
  }

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
      zigzagdata?: zigzagdata;
      indicatordata?: indicatordata;
      darvasBoxList?: any;
      btresult?: backtestdata;
    };
    fundadata?: {
      profitLossData?: any;
      quartersData?: any;
      shareholdingData?: any;
    };
  }

  export interface ChartDataType {
    xdata?: number[];
    xdata1?: number[];
    xdata2?: number[];
    timestamp: number[];
    line1?: number[];
    xindex:number[];
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
    ohlckeyvlaue?: any;
    zigzaglineX?: number[];
    zigzaglineY?: number[];
    fundaMappedX1?:string[]
    fundaX1?: number[];
    fundaY2?: number[];
    fundaY1?: FundData[];
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
    backtestresult?: number[];
    backtestreport?: string[];
  }

//   export {ChartDataIN,ChartDataObj}

export interface ChartBaseData{
  plotName: Set<string>, 
  xscaleTag: Set<keyof xScaleConfigType>,
  yscaleTag: Set<keyof yScaleConfigType>
  yaxisTag:Set<string>
}

export interface yaxisItemType{
  range:[number,number];
  plotname: string[];
   yscaleTag: string[]
  }


export interface yaxisType{
   [key:string] :yaxisItemType
}

// export interface ChartBaseData{
//   plotName: string[], 
//   xscaleTag: string[],
//   yscaleTag: string[]
// }

export interface XScaleConfigInputType {
  xscaleTag: string;
  ypoint: number;
  xsaleType:'Linear'|'TimeScale'|'Band'
  scaleSide:'Bottom'|'Top'
  ticlavelmappedwith:keyof ChartDataType
  xscaleRange: [number, number];
  xscaleDataTag:keyof ChartDataType;
  zoomstatus?: boolean;
}

export interface XScaleConfigItemType {
  xscaleTag: string;
  xsaleType:'Linear'|'TimeScale'|'Band'
  scaleSide:'Bottom'|'Top'
  ticlavelmappedwith:keyof ChartDataType
  ypoint: number;
  xscaleRange: [number, number];
  xscaleDataTag:keyof ChartDataType;
  zoomstatus: boolean;
  xscale: (this:XScaleConfigItemType) => {domain:any,XSCALE:any};
}

export interface xScaleConfigType {
  [key: string]: XScaleConfigItemType;
}

export interface YScaleConfigInputType {
  yscaleTag: string;
  scaleSide:'Left'|'Right'
  yaxisTag:string;
  xpoint: number;
  // yscaleRange: [number, number];
  yaxisrange?: [number, number];
  yscaleDataTag:'ohlc'|keyof ChartDataType;
  xscaleVisibleRange: [number, number];
  zoomstatus?: boolean;
  autozoom?:boolean;
}
export interface YScaleConfigItemType {
  yscaleTag: string;
  scaleSide:'Left'|'Right'
  yaxisTag:string;
  xpoint: number;
  // yscaleRange: [number, number];
  yaxisrange: [number, number]|null;
  yscaleDataTag:'ohlc'|keyof ChartDataType;
  xscaleVisibleRange: [number, number];
  zoomstatus: boolean;
  autozoom:boolean;
  ydomaindata:[number, number];
  yscale: (this:YScaleConfigItemType) => {domain: Iterable<NumberValue>; YSCALE: ScaleLinear<number, number>|null,TranSFormedYscale:ScaleLinear<number, number>|null};
  yzoomtransform:typeof d3.zoomIdentity

}

export interface yScaleConfigType {
  [key: string]: YScaleConfigItemType;
}

export interface PlotInfoInputType {
  plotStatus: boolean;
  plotName: string;
  xdataTag: keyof ChartDataType;
  ydataTag: 'ohlc'|keyof ChartDataType;
  xscaleTag: keyof xScaleConfigType;
  yscaleTag: keyof yScaleConfigType;
  plotType: string;
  plotcolor?: string;
  buttontag?:string
  tooltip?:boolean
}

export interface PlotInfoItem {
  plotStatus: boolean;
  plotName: string;
  xdata: number[];
  ydata: number[];
  xscaleTag: keyof xScaleConfigType;
  yscaleTag: keyof xScaleConfigType;
  plotType: string;
  plotcolor: string;
  buttontag:string;
  tooltip:boolean;
  getTooltipHTML?: (this:PlotInfoItem,yaxistag:string,index: number,tooltiparea:d3.Selection<SVGGElement, any, HTMLElement, any>) => void
}
export interface PlotInfoType {
  [key: string]: PlotInfoItem;
}

export interface XscaleYscaleRelation {
  [key: string]: string[];
}

export interface PlotStatusByButtonTag {
  [key: string]: { plotStatus: boolean, plotName: string,buttonid:string };
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


