import { IndicatorsNormalizedSync } from "./@ixjb94/indicators/dist";
import { OHLCV } from "../types";
// import zigtagind from "./ZigZAgTool";
import ZigProcessor from "./ZigZAgTool/core/zigzag"
import { ZigzagData, zigzagdatasub } from "../types";


let ta = new IndicatorsNormalizedSync();

class TechGroup {
    private static instance: TechGroup | null = null;
    private ohlcv: OHLCV[] | null = null;
    private zigProcessor: ZigProcessor;

    private constructor() {
        this.zigProcessor = ZigProcessor.getInstance();
    }

    static getInstance(): TechGroup {
        if (!TechGroup.instance) {
            TechGroup.instance = new TechGroup();
        }
        return TechGroup.instance;
    }

    attachOHLCV(ohlcv: OHLCV[]): void {
        this.ohlcv = ohlcv;
        this.zigProcessor.attachOHLCV(ohlcv.map(item=>({...item,time:item.timestamp})))
    }

    // Method to calculate Simple Moving Average (SMA)
    calculateSMA(data: string | number[], period: number): number[] {
        if (!this.ohlcv) {
            throw new Error('OHLCV data has not been attached.');
        }
        if (typeof data === 'string') {
            const dataaaray = this.ohlcv.map(item => item[data as keyof OHLCV]);
            const sma=ta.sma(dataaaray, period)
            return sma;
        } else if (Array.isArray(data)) {
            return ta.sma(data, period);
        } else {
            throw new Error('Invalid data format. Expecting string or number[].');
        }
    }

    // Method to calculate Exponential Moving Average (EMA)
    calculateEMA(data: string | number[], period: number): number[] {
        if (!this.ohlcv) {
            throw new Error('OHLCV data has not been attached.');
        }
        if (typeof data === 'string') {
            const dataaaray = this.ohlcv.map(item => item[data as keyof OHLCV]);
            const ema=ta.ema(dataaaray, period)
            // console.log(ema);
            return ema;
        } else if (Array.isArray(data)) {
            return ta.ema(data, period);
        } else {
            throw new Error('Invalid data format. Expecting string or number[].');
        }
    }

    calculateRSI(data: string | number[], period: number): number[] {
        if (!this.ohlcv) {
            throw new Error('OHLCV data has not been attached.');
        }
        if (typeof data === 'string') {
            const dataaaray = this.ohlcv.map(item => item[data as keyof OHLCV]);
            const rsi=ta.rsi(dataaaray, period)
            return rsi;
        } else if (Array.isArray(data)) {
            return ta.rsi(data, period);
        } else {
            throw new Error('Invalid data format. Expecting string or number[].');
        }
    }

    calculateADX(period: number): {adx:number[],dmp:number[],dmn:number[]} {
        if (!this.ohlcv) {
            throw new Error('OHLCV data has not been attached.');
        }
        // if (typeof data === 'string') {
            
            const highdata = this.ohlcv.map(item => item['high' as keyof OHLCV]);
            const lowdata = this.ohlcv.map(item => item['low' as keyof OHLCV]);
            const adx=ta.adx(highdata,lowdata, period)

            const dm=ta.dm(highdata,lowdata, period)
            // console.log(dm);

            return {adx:adx,dmp:dm[0],dmn:dm[1]};

    }

    calculateZizZag(): zigzagdatasub {
        if (!this.ohlcv) {
            throw new Error('OHLCV data has not been attached.');
        }
        
        const zigzag = this.zigProcessor.zseries() as ZigzagData;
        
        const zigzagSubset: zigzagdatasub = {
            sublist: zigzag.sublist.map(({ orgindex, value }) => ({ orgindex, value })),
            tobebreakdata: zigzag.tobebreakdata
                ? { tobebreakcandelid: zigzag.tobebreakdata.tobebreakcandelid, pricetobebreak: zigzag.tobebreakdata.pricetobebreak }
                : undefined,
            tobebreakdowndata: zigzag.tobebreakdowndata
                ? { tobebreakcandelid: zigzag.tobebreakdowndata.tobebreakcandelid, pricetobebreakdown: zigzag.tobebreakdowndata.pricetobebreakdown }
                : undefined,
            brlist: zigzag.brlist
            .filter(({ broutfor }) => !isNaN(broutfor))
            .map(({ rejectat, broutfor, broutat, highatref, highatrejec, breakoutperiod }) => ({
                rejectat,
                broutfor,
                broutat,
                highatref,
                highatrejec,
                breakoutperiod
            }))
        };
        
        return zigzagSubset;
    }
    


}

export default TechGroup;
