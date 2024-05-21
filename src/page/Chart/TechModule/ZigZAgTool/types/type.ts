import { type } from "os";
type ChartParamaters = {
  chartparameter: string;
  booltype: boolean;
  t_or_f: boolean;
  value: number;
};

interface StrategyOption {
  TC: string;
  value1: number;
  value2: number;
  operator: string;
  day: string;
}

interface Strategy {
  strategy_name: string;
  options: StrategyOption[];
}

type AngelStockData = {
  token: string;
  symbol: string;
  name: string;
  expiry: string;
  strike: string;
  lotsize: string;
  instrumenttype: string;
  exch_seg: string;
  tick_size: string;
};

type InservalID = "1D" | "1W" | "1M";

type StockDatawithbarCount = {
  ticker: string;
  barcount: number;
};

type TickerData = {
  ticker: string;
  barcount: number;
};
type TickerDataArray = TickerData[];

type GetCandleData = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

type StockData = {
  [symbol: string]: Array<GetCandleData>;
};
type TradingviewTimeframe = number | "1D" | "1W" | "1M";

interface StockHistoryData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ticker: string;
  lastupdate: number;
  lastupdatets: string;
}

type BreakoutData = {
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

interface BreakOuttableData {
  timestamp: number;
  volume: string;
  open: number;
  close: number;
  ema20: number;
  ema5: number;
  sma200: number;
  rsi9: number;
  adx: number;
  dmp: number;
  dmn: number;
  ticker: string;
  broutfor: number;
  broutat: number;
  rejectat: number;
  brekoutcandleago: number;
  highatref: number;
  highatrejec: number;
  closeatbr: number;
  breakoutperiod: number;
  breakoutpercentage: number;
  adxatbr: number;
  cdarray: string[];
  trianglecheck: number;
}

type TechStockData = {
  timestamp: number;
  open: number;
  close: number;
  volume: string;
  ema20: number;
  ema5: number;
  sma200: number;
  rsi9: number;
  adx: number;
  dmp: number;
  dmn: number;
  vwap: number;
  atr10: number;
  atrp10: number;
  crsi: number;
  crsi_avg: number;
};

interface BreakoutData_ToBe_base {
  pricetobebreak: number;
  lastclose: number;
  laginprct: number;
  candeldistance: number;
  tobebreakcandelid: number;
  timestamp: number;
}

interface BreakoutData_ToBeTable extends BreakoutData_ToBe_base {
  ticker: string;
  cdarray: string[];
  trianglecheck: number;
}

interface BreakdownData_ToBe_base {
  pricetobebreakdown: number;
  lastclose: number;
  laginprct: number;
  candeldistance: number;
  tobebreakcandelid: number;
  timestamp: number;
}

interface BreakoutData_ToBeBreakDownTable extends BreakdownData_ToBe_base {
  ticker: string;
  cdarray: string[];
  trianglecheck: number;
}

// interface BreakoutData_ToBeBreakDownTable1 {
//   ticker: string;
//   pricetobebreakdown: number;
//   lastclose: number;
//   laginprct: number;
//   candeldistance: number;
//   tobebreakcandelid: number;
//   timestamp: number;
//   cdarray:string[]
//   trianglecheck:number;
// }

interface BreakOuttableDatawithid extends BreakOuttableData {
  id: number;
}
interface BreakoutData_ToBeTablewithid extends BreakoutData_ToBeTable {
  id: number;
}

type BreakoutDataFullTable = {
  [key in breaktablename]?: BreakOuttableDatawithid[] | BreakoutData_ToBeTablewithid[];
};

type breakindicatorname =
  | "Trange"
  | "brekoutcandleago"
  | "Adx_Br"
  | "Adx_C"
  | "RSI"
  | "EMA(20)"
  | "EMA(5)"
  | "BR %"
  | "BUY_VAL CONF"
  | "Current Price"
  | "Volume"
  | "NearBr";

type breaktablename =
  | "stockbreakoutdatadaily"
  | "stockbreakoutdataweekly"
  | "stockbreakoutdatamonthly"
  | "stocktobebreakoutdatadaily"
  | "stocktobebreakoutdataweekly"
  | "stocktobebreakoutdatamonthly"
  | "Change_1D"
  | "Change_1W"
  | "Change_1M"
  | "Avg_voulme_1D"
  | "Avg_voulme_1W"
  | "Avg_voulme_1M"
  | "TC_1D"
  | "TC_1W"
  | "TC_1M";

type BreakoutFilter = {
  indicatorname: breakindicatorname;
  minvalue: number;
  maxvalue: number;
  tablename: breaktablename;
};
type RequestTimeframe = "1m" | "3m" | "5m" | "15m" | "30m" | "45m" | "1H" | "2H" | "4H" | "1D" | "1W" | "1M";

export interface ChartOptionalParamter {
  pcD?: number;
  //param2?: string;
}

type HistoryRequestData = {
  prefix: string;
  tickerlist: string[];
  barcount: number;
  interval: RequestTimeframe;
  optional: ChartOptionalParamter;
};

type LiveRequestData = {
  prefix: string;
  ticker: string;
  interval: RequestTimeframe;
  forcestopid: 0 | 1;
};

type HistoryResponceData = {
  time: number;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

interface BreakStrengthResult {
  [percentageRange: number]: { totalWeight: number; numAttempts: number };
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

type TechData = {
  CDP: Record<string, any>; // Replace 'any' with the appropriate type for 'CDP'
  LineInd: any[]; // Replace 'any' with the appropriate type for 'LineInd'
  signaldata?: any;
};

type darvasBoxList = {
  boxStart: number;
  boxEnd: number;
  boxHigh: number;
  boxLow: number;
  breakoutClose: any;
  priceRange: number;
};

type BreakStrengthModel = {
  [key: string]: {
    totalWeight: number;
    numAttempts: number;
  };
};

type backtestresult = {
  status: boolean;
  backtestLine: any[];
  backtestreport: string;
};

type backtestfinaloutput = {
  query_output: any[];
  common_output: {};
  backtestresult: backtestresult | [];
};

type CDTechData = {
  zigzagdatasub: ZigzagData;
  indicatordata: TechData;
  darvasBoxList: darvasBoxList[];
  btresult: backtestfinaloutput;
  //BreakStrength:BreakStrengthModel
};

type allStockData = {
  [stockName: string]: HistoryResponceData[];
};

type alltechStockData = {
  [stockName: string]: CDTechData;
};

type globalServerParamater = {
  minBoxDuration: number;
  priceRangePercentage: number;
  pchangePercentageD: number;
  pchangePercentageW: number;
  pchangePercentageM: number;
};

type loginUser = {
  username: string;
  password: string;
  email: string;
};

interface AllstockStoreData {
  histdata: allStockData;
  techdata: alltechStockData;
  fundadata?: any;
}

interface AllstockSeparatedData {
  [key: string]: {
    histdata: HistoryResponceData[]; // Replace 'any' with the specific type for historical data arrays if available
    techdata: CDTechData; // Replace 'any' with the specific type for technical data objects if available
    fundadata?: any;
  };
}

interface stockfundamentalDataModel {
  ticker: string;
  fundamental_data: string;
}

interface stocktrackModel {
  trackname: string;
  trackdata: string;
}

interface ZigzaglineData {
  time: number;
  orgindex: number;
  value: number;
  zigind: string;
  zigType: string;
  trend?: string;
  // marker?: number;
}
interface LineIDdata {
  timestamp: number;
  open: number;
  close: number;
  volume: string;
  ema20: number;
  ema5: number;
  sma200: number;
  rsi9: number;
  adx: number;
  dmp: number;
  dmn: number;
  vwap: number;
  atr10: number;
  atrp10: number;
  crsi: number;
  crsi_avg: number;
}

export type {
  AngelStockData,
  InservalID,
  StockDatawithbarCount,
  TickerDataArray,
  TradingviewTimeframe,
  GetCandleData,
  StockData,
  StockHistoryData,
  BreakoutData,
  TechStockData,
  BreakOuttableData,
  BreakoutData_ToBe_base,
  BreakdownData_ToBe_base,
  BreakoutData_ToBeTable,
  BreakoutFilter,
  breaktablename,
  BreakOuttableDatawithid,
  BreakoutData_ToBeTablewithid,
  BreakoutDataFullTable,
  HistoryRequestData,
  HistoryResponceData,
  allStockData,
  LiveRequestData,
  loginUser,
  CDTechData,
  alltechStockData,
  AllstockStoreData,
  AllstockSeparatedData,
  BreakoutData_ToBeBreakDownTable,
  globalServerParamater,
  stockfundamentalDataModel,
  stocktrackModel,
  ChartParamaters,
  ZigzaglineData,
  LineIDdata,
  Strategy,
  backtestfinaloutput,
  backtestresult,
};
