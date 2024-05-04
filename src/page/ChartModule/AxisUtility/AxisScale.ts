import SetupChart from "../ChartSetup/setchart";
import { XScaleConfigType } from "../types/AxisScaleType";
import { ChartOptions, Margin } from "../types/chartSetuptype";
import { ChartDataObj } from "../types/chartdataTypes";

export class AxisChart {
  private static instance: AxisChart | null = null;
  private svgHeight:number
  private svgWidth:number
  private margin:Margin
  private dataset:ChartDataObj

  public xScaleConfig: XScaleConfigType = {};
  private constructor(ChartOptions: SetupChart,ChartData:ChartDataObj) {
    console.log(ChartOptions.svgHeight);
    this.svgHeight=ChartOptions.svgHeight
    this.svgWidth=ChartOptions.svgWidth
    this.margin=ChartOptions.margin
    this.dataset=ChartData
    this.setXScaleConfig();
  }

  static getInstance(ChartOptions: SetupChart,ChartData:ChartDataObj): AxisChart {
    if (!AxisChart.instance) {
      AxisChart.instance = new AxisChart(ChartOptions,ChartData);
    }
    return AxisChart.instance;
  }

  setXScaleConfig() {
    console.log("Main method", this.xScaleConfig,this);
    this.xScaleConfig = {
      bot: {
        ypoint: this.svgHeight - this.margin.bottom,
        scaleSide: "Bottom",
        scaleType: "linear",
        scaledatatag: "timestamp",
        scalerange: [
          this.margin.left + this.margin.innerLeft,
          this.svgWidth - this.margin.right - this.margin.innerRight,
        ],
        // datadomain: [0, this.dataset.xdata[this.dataset.xdata.length - 1]],
        datadomain: () => [0, this.dataset.timestamp.length],
        mappedwith: "timestamp", // just to display axis tick and reverse map if any dataplot have axis defeind in timestamp
        //scaleRole: "main",
        plotaxis: true,
        zooming: true,
      },
    };
  }

  getXScaleConfig(){
    return this.xScaleConfig
  }
}
