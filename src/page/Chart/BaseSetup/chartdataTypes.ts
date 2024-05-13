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
    fundaX1?: string[];
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