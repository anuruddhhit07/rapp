import { ChartDataIN } from "../../types";
export declare let Shared_Allstockdata: ChartDataIN;
export declare function updateChartData<T extends keyof ChartDataIN>(key: T, value: ChartDataIN[T], subKey?: string, subValue?: any): void;
