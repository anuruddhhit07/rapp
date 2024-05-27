import { OHLCV } from "../types";
import { zigzagdatasub } from "../types";
declare class TechGroup {
    private static instance;
    private ohlcv;
    private zigProcessor;
    private constructor();
    static getInstance(): TechGroup;
    attachOHLCV(ohlcv: OHLCV[]): void;
    calculateSMA(data: string | number[], period: number): number[];
    calculateEMA(data: string | number[], period: number): number[];
    calculateRSI(data: string | number[], period: number): number[];
    calculateADX(period: number): {
        adx: number[];
        dmp: number[];
        dmn: number[];
    };
    calculateZizZag(): zigzagdatasub;
}
export default TechGroup;
