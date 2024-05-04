import { AxisChart } from "./AxisUtility/AxisScale"
import SetupChart from "./ChartSetup/setchart"
import { PlotConfig } from "./ChartSetup/setplotConfig"
import { arrangeData } from "./dataUtility/arrangeData"
import { ChartOptions, Margin } from "./types/chartSetuptype"
import { ChartDataIN, ChartDataObj } from "./types/chartdataTypes"


class CandlestickChartTS {
    private chartdata:ChartDataObj
    private setupdata : SetupChart
    private axisChart:AxisChart
    private PlotConfig:PlotConfig
    // private margin: Margin
    constructor(stockdata:ChartDataIN) {
        this.setupdata=SetupChart.getInstance(500, 200)
        this.chartdata=arrangeData(stockdata)
        this.axisChart=AxisChart.getInstance(this.setupdata,this.chartdata)
        this.PlotConfig=PlotConfig.getInstance(this.chartdata)
        console.log(this.axisChart)
        // this.chartAxis= 
        // this.margin=this.setupdata.margin
        // console.log(this.setupdata);
        console.log(this);
        
    }

}

export default CandlestickChartTS