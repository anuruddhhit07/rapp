import SetupChart from "./ChartSetup/setchart"
import { arrangeData } from "./dataUtility/arrangeData"
import { ChartOptions } from "./types/chartSetuptype"
import { ChartDataIN, ChartDataObj } from "./types/chartdataTypes"


class CandlestickChartTS {
    private chartdata:ChartDataObj
    private setupdata : ChartOptions
    constructor(stockdata:ChartDataIN) {
        this.setupdata=new SetupChart(10,20)
        this.chartdata=arrangeData(stockdata)
        console.log(this);
        // console.log(this.setupdata);
        
    }

}

export default CandlestickChartTS