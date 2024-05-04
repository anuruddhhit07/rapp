import { AxisChart } from "../AxisUtility/AxisScale";
import { YScaleConfigType } from "../types/AxisScaleType";
import { ChartDataObj } from "../types/chartdataTypes";
import { PlotConfigItemType, PlotConfigType } from "../types/plotConfigType";


export class PlotConfig {
  private static instance: PlotConfig | null = null;
  public yScaleConfig: YScaleConfigType = {};


  private constructor(ChartData: ChartDataObj,axisChart:AxisChart) {
    this.setPlot(ChartData);
    this.yScaleConfig=axisChart.yScaleConfig
    
  }
  static getInstance(ChartData: ChartDataObj,axisChart:AxisChart): PlotConfig {
    if (!PlotConfig.instance) {
      PlotConfig.instance = new PlotConfig(ChartData,axisChart);
    }
    return PlotConfig.instance;
  }


  setDefaultPlotConfig(): PlotConfigItemType<keyof YScaleConfigType>[] {
    const keys = Object.keys(this.yScaleConfig) as (keyof YScaleConfigType)[];
    // Define a type for the keys of YScaleConfigType
    type YScaleKeys = keyof YScaleConfigType;

    // Create an array to store the plot configurations
    const plotConfigDefault: PlotConfigItemType<YScaleKeys>[] = [
        {
            plotstatus: true,
            plotName: "MainPlot",
            datatoPlot: "ohlc",
            yscaleName: "OHLC",
            linetype: "solid", // Example default value
            color: "blue", // Example default value
            fill: "none", // Example default value
            strokewidth: 2, // Example default value
            strokedasharray: "15,5", // Example default value
            yscaletag: "TR", // Example default value
            xscaletag: "bot", // Example default value
            plottype: "ohlc", // Example default value
            tagclass: "ohlc_", // Example default value
          },
          {
            plotstatus: true,
            plotName: "VolumePlot",
            datatoPlot: "volume",
            yscaleName: "BR",
            // You can optionally omit other properties if you want to use their default values
          },
    ];

    

    // Iterate over the plot configurations and check if yscaleName exists in keys
    for (const plotConfig of plotConfigDefault) {
        if (!keys.includes(plotConfig.yscaleName)) {
            throw new Error(`Invalid yscaleName "${plotConfig.yscaleName}" Possible yscaleName can be belongs to
            any [${keys}] .`);
        }
    }

    return plotConfigDefault;
}


  setPlot(ChartData: ChartDataObj) {
    const plotconfigdata = this.setDefaultPlotConfig()
    
  }

}
