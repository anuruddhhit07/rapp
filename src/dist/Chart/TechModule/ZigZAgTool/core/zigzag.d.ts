import { ZigzaglineData, HistoryResponceData, BreakoutData, BreakoutData_ToBe_base, BreakdownData_ToBe_base } from "../../../types";
interface BreakStrengthResult {
    [percentageRange: number]: {
        totalWeight: number;
        numAttempts: number;
    };
}
interface GetLatestBreakout {
    latestbrindex: number;
    breakoutperiod: number;
    latestbreakobj: BreakoutData;
    laststockindex: number;
}
declare class ZigProcessor {
    private static instance;
    private data;
    private previouslow;
    private previoushigh;
    private previouspoint;
    private reqdnmove;
    private requpmove;
    private lasthighpoint;
    private lastlowpoint;
    private currentminind;
    private currentmaxind;
    private currentcdmin;
    private currentcdmax;
    private zigdata;
    private upsidecount;
    private downsidecount;
    private permitmove;
    constructor();
    static getInstance(): ZigProcessor;
    attachOHLCV(ohlcv: HistoryResponceData[]): void;
    private zdata;
    private up_move;
    private down_move;
    private get_newmove;
    private calculateEffortMetric;
    private getbreakouttrength;
    private getbreakout;
    private fullbrtable;
    private nearbrtable;
    private nearbreakdown;
    zseries(): {
        sublist: ZigzaglineData[];
        brlist: BreakoutData[];
        lastbreakout: GetLatestBreakout;
        tobebreakdata: BreakoutData_ToBe_base;
        tobebreakdowndata: BreakdownData_ToBe_base;
        breakStrenth: BreakStrengthResult;
        Tr_patternMark: number;
    };
}
export default ZigProcessor;
