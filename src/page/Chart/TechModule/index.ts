import { IndicatorsNormalizedSync } from "./@ixjb94/indicators/dist";
import { OHLCV } from "../ChartModule/types";

let ta = new IndicatorsNormalizedSync();

class TechGroup {
    private static instance: TechGroup | null = null;
    private ohlcv: OHLCV[] | null = null;

    private constructor() {
        // Initialize any properties or configurations here
    }

    static getInstance(): TechGroup {
        if (!TechGroup.instance) {
            TechGroup.instance = new TechGroup();
        }
        return TechGroup.instance;
    }

    attachOHLCV(ohlcv: OHLCV[]): void {
        this.ohlcv = ohlcv;
    }

    // Method to calculate Simple Moving Average (SMA)
    calculateSMA(data: string | number[], period: number): number[] {
        if (!this.ohlcv) {
            throw new Error('OHLCV data has not been attached.');
        }
        if (typeof data === 'string') {
            const dataaaray = this.ohlcv.map(item => item[data as keyof OHLCV]);
            const sma=ta.sma(dataaaray, period).fill(NaN,0,50)
            // for (let i = 0; i < sma.length; i++) {
            //     if (isNaN(sma[i]) || sma[i] === undefined) {
            //         sma[i] = dataaaray[i];
            //     }
            // }

            return sma;
        } else if (Array.isArray(data)) {
            return ta.sma(data, period);
        } else {
            throw new Error('Invalid data format. Expecting string or number[].');
        }
    }

    // Method to calculate Exponential Moving Average (EMA)
    calculateEMA(data: string | number[], period: number) {
        // Implement EMA calculation logic here
    }
}

export default TechGroup;
