import { ChartOptionsIn } from "../Svg/chartSetuptype";
declare class SetupChart {
    private static instance;
    private constructor();
    static getInstance(svgWidth: number, svgHeight: number, chartOptions: Partial<ChartOptionsIn>): SetupChart;
}
export default SetupChart;
