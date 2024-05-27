import { updateChartBaseProp } from "../../ChartModule/BaseSetup/SharedDataUtility";
// import { updateChartBaseProp } from "../SharedObject";
const ChartOptionsDefault = {
    targetID: "DivID",
    stockid: "StockName:1D",
    liveupdatefunction: () => { },
    chartsettings: {
        mdbutton: { status: false },
        fiibutton: { status: false },
        opbutton: { status: false },
        epsbutton: { status: false },
        brlinebutton: { status: false },
        crsibutton: { status: false },
        adxbutton: { status: false },
        atrbutton: { status: false },
        emabutton: { status: false },
        rsibutton: { status: false },
        trendbutton: { status: false },
        zigzagbutton: { status: false },
        closebutton: { status: false },
        cdbutton: { status: false },
        volbutton: { status: false },
        sigbutton: { status: false },
    },
};
class SetupChart {
    constructor(svgWidth, svgHeight, chartOptions) {
        updateChartBaseProp({
            svgWidth: svgWidth,
            svgHeight: svgHeight,
            targetID: chartOptions.targetID,
            stockid: chartOptions.stockid,
        });
    }
    // Static method to create or retrieve the singleton instance
    static getInstance(svgWidth, svgHeight, chartOptions) {
        if (!SetupChart.instance) {
            for (const key in chartOptions) {
                if (key in ChartOptionsDefault) {
                    ChartOptionsDefault[key] = chartOptions[key]; // Type assertion
                }
            }
            //console.log("ChartOptionsDefault", ChartOptionsDefault);
            SetupChart.instance = new SetupChart(svgWidth, svgHeight, ChartOptionsDefault);
        }
        return SetupChart.instance;
    }
}
SetupChart.instance = null; // Static property to hold the instance
export default SetupChart;
