import { ChartBaseSetupType } from "./types/chartSetuptype";

export const defaultChartBaseProp: ChartBaseSetupType = {
    svgWidth: 500,
    svgHeight: 200,
    targetID: "chartContainer",
    stockid: "StockName:1D",
    margin: {
        top: 20,
        right: 50,
        bottom: 20,
        left: 10,
        innerLeft: 20,
        innerRight: 100,
        innerBottom: 20,
        innerTop: 20
    },
    get width() {
        return this.svgWidth -
        this.margin.left -
        this.margin.right -
        this.margin.innerRight -
        this.margin.innerLeft;
    },
    get height() {
        return this.svgHeight -
        this.margin.top -
        this.margin.bottom -
        this.margin.innerTop -
        this.margin.innerBottom;
    }
};