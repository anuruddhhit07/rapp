type backtestLineItem ={
    ID: number;
    index: number;
    buyorsell: "PatternBaseIndex" | "trigger" | "buy" | "sell" | "cancel_PatternBaseIndex" | "cancel_trigger";
    buyprice?: number;
    exitPrice?: number;
    pnl?: number;
    Comment?: string;
  };

type backtestresult = {
    status: boolean;
    backtestLine: backtestLineItem[];
    backtestreport: string;
  };
  
  // type backtestfinaloutput = {
  //   // query_output: any[];
  //   // common_output: {};
  //   backtestresult: backtestresult ;
  // };

const backtestarray:backtestLineItem[][] = [
    [
      { ID: 0, index: 57, buyorsell: "trigger" },
      { ID: 0, index: 58, buyorsell: "buy" },
      { ID: 0, index: 59, buyorsell: "sell", pnl: 24.53300000000013 },
      { ID: 1, index: 62, buyorsell: "trigger" },
      { ID: 1, index: 63, buyorsell: "buy" },
      { ID: 1, index: 67, buyorsell: "sell", pnl: -26.559999999999945 },
      { ID: 2, index: 69, buyorsell: "trigger" },
      { ID: 2, index: 70, buyorsell: "buy" },
      { ID: 2, index: 73, buyorsell: "sell", pnl: 26.519999999999982 },
      { ID: 3, index: 83, buyorsell: "trigger" },
      { ID: 3, index: 84, buyorsell: "buy" },
      { ID: 3, index: 85, buyorsell: "sell", pnl: -27.680000000000064 },
      { ID: 4, index: 92, buyorsell: "trigger" },
      { ID: 4, index: 93, buyorsell: "buy" },
      { ID: 4, index: 94, buyorsell: "sell", pnl: 27.720000000000027 },
      { ID: 5, index: 95, buyorsell: "trigger" },
      { ID: 5, index: 96, buyorsell: "buy" },
      { ID: 5, index: 97, buyorsell: "sell", pnl: 31.1400000000001 },
      { ID: 6, index: 98, buyorsell: "trigger" },
      { ID: 6, index: 99, buyorsell: "buy" },
      { ID: 6, index: 100, buyorsell: "sell", pnl: 32.544000000000096 },
      { ID: 7, index: 105, buyorsell: "trigger" },
      { ID: 7, index: 106, buyorsell: "buy" },
      { ID: 7, index: 107, buyorsell: "sell", pnl: -36.200000000000045 },
      { ID: 8, index: 107, buyorsell: "trigger" },
      { ID: 8, index: 108, buyorsell: "buy" },
      { ID: 8, index: 109, buyorsell: "sell", pnl: -35.06400000000008 },
      { ID: 9, index: 111, buyorsell: "trigger" },
      { ID: 9, index: 112, buyorsell: "buy" },
      { ID: 9, index: 113, buyorsell: "sell", pnl: 36.20600000000013 },
      { ID: 10, index: 114, buyorsell: "trigger" },
      { ID: 10, index: 115, buyorsell: "buy" },
      { ID: 10, index: 117, buyorsell: "sell", pnl: -38.340000000000146 },
      { ID: 11, index: 139, buyorsell: "trigger" },
      { ID: 11, index: 140, buyorsell: "buy" },
      { ID: 11, index: 141, buyorsell: "sell", pnl: -38.00400000000013 },
      { ID: 12, index: 177, buyorsell: "trigger" },
      { ID: 12, index: 178, buyorsell: "buy" },
      { ID: 12, index: 180, buyorsell: "sell", pnl: -38.78800000000001 },
    ],
    [
      { ID: 0, index: 112, buyorsell: "trigger" },
      { ID: 0, index: 113, buyorsell: "buy" },
      { ID: 0, index: 114, buyorsell: "sell", pnl: 36.600000000000136 },
      { ID: 1, index: 115, buyorsell: "trigger" },
      { ID: 1, index: 117, buyorsell: "buy" },
      { ID: 1, index: 118, buyorsell: "sell", pnl: -38.67000000000007 },
    ],
    [
      { ID: 0, index: 55, buyorsell: 'trigger' },
      { ID: 0, index: 56, buyorsell: 'buy' },
      { ID: 0, index: 57, buyorsell: 'sell', pnl: 23.180000000000064 },
      { ID: 1, index: 70, buyorsell: 'trigger' },
      { ID: 1, index: 71, buyorsell: 'buy' },
      { ID: 1, index: 75, buyorsell: 'sell', pnl: -26.779999999999973 },
      { ID: 2, index: 80, buyorsell: 'trigger' },
      { ID: 2, index: 81, buyorsell: 'buy' },
      { ID: 2, index: 82, buyorsell: 'sell', pnl: 26.807999999999993 },
      { ID: 3, index: 93, buyorsell: 'trigger' },
      { ID: 3, index: 94, buyorsell: 'buy' },
      { ID: 3, index: 96, buyorsell: 'sell', pnl: 30.163999999999987 },
      { ID: 4, index: 99, buyorsell: 'trigger' },
      { ID: 4, index: 100, buyorsell: 'buy' },
      { ID: 4, index: 101, buyorsell: 'sell', pnl: 32.865999999999985 },
      { ID: 5, index: 112, buyorsell: 'trigger' },
      { ID: 5, index: 113, buyorsell: 'buy' },
      { ID: 5, index: 114, buyorsell: 'sell', pnl: 36.600000000000136 },
      { ID: 6, index: 123, buyorsell: 'trigger' },
      { ID: 6, index: 124, buyorsell: 'buy' },
      { ID: 6, index: 125, buyorsell: 'sell', pnl: -39.299999999999955 },
      { ID: 7, index: 157, buyorsell: 'trigger' },
      { ID: 7, index: 158, buyorsell: 'buy' },
      { ID: 7, index: 161, buyorsell: 'sell', pnl: 36.76999999999998 },
      { ID: 8, index: 161, buyorsell: 'trigger' },
      { ID: 8, index: 162, buyorsell: 'buy' },
      { ID: 8, index: 163, buyorsell: 'sell', pnl: -39.340000000000146 },
      { ID: 9, index: 174, buyorsell: 'trigger' },
      { ID: 9, index: 175, buyorsell: 'buy' },
      { ID: 9, index: 177, buyorsell: 'sell', pnl: -38.73000000000002 },
      { ID: 10, index: 193, buyorsell: 'trigger' },
      { ID: 10, index: 194, buyorsell: 'buy' },
      { ID: 10, index: 195, buyorsell: 'sell', pnl: -36.09400000000005 }
    ]
  ];
  
  export function getbackestdata(index =0):backtestresult {
    return {status:true, backtestLine:backtestarray[index],backtestreport:""};
  }

  // backtestLine: backtestLineItem[];
  // backtestreport: string;