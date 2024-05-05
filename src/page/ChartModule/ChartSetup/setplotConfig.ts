import { AxisChart } from "../AxisUtility/AxisScale";
import { XScaleConfigType, YScaleConfigType } from "../types/AxisScaleType";
import { ChartDataObj } from "../types/chartdataTypes";
import { PlotConfigItemType, PlotConfigdataType } from "../types/plotConfigType";


export class PlotConfig {
  private static instance: PlotConfig | null = null;
  public PlotData:PlotConfigdataType={}
//   public yScaleConfig: YScaleConfigType = {};
//   public xScaleConfig: XScaleConfigType = {};

  private constructor(ChartData: ChartDataObj,axisChart:AxisChart) {
    // this.yScaleConfig=axisChart.yScaleConfig
    // this.xScaleConfig=axisChart.xScaleConfig
    console.log("axisChart",axisChart)
    this.setPlot(ChartData,axisChart);
    
    
  }
  static getInstance(ChartData: ChartDataObj,axisChart:AxisChart): PlotConfig {
    if (!PlotConfig.instance) {
      PlotConfig.instance = new PlotConfig(ChartData,axisChart);
    }
    return PlotConfig.instance;
  }


  setDefaultPlotConfig(axisChart:AxisChart): PlotConfigItemType[] {
    const yscalekeys = Object.keys(axisChart.yScaleConfig) as (keyof YScaleConfigType)[];
    const xscalekeys = Object.keys(axisChart.xScaleConfig) as (keyof XScaleConfigType)[];
    // Define a type for the keys of YScaleConfigType
    type YScaleKeys = keyof YScaleConfigType;
    console.log("xscalekeys",xscalekeys)
    console.log("yscalekeys",yscalekeys)

    // Create an array to store the plot configurations
    const plotConfigDefault: PlotConfigItemType[] = [
        {
            plotstatus: true,
            plotName: "MainPlot",
            Ydata: "ohlc",
            Xdata:"xdata",
            yscaletag: "OHLC",
            xscaletag: "mainx", // Example default value
            plottype: "ohlc", // Example default value
            tagclass: "ohlc_", // Example default value
            linetype: "solid", // Example default value
            color: "blue", // Example default value
            fill: "none", // Example default value
            strokewidth: 2, // Example default value
            strokedasharray: "15,5", // Example default value
            
          },
          {
            plotstatus: false,
            plotName: "VolumePlot",
            Ydata: "ohlc",
            Xdata:"xdata",
            yscaletag: "BR",
            xscaletag: "mainx", // Example default value
            plottype: "ohlc", // Example default value
            tagclass: "ohlc_", // Example default value
            // You can optionally omit other properties if you want to use their default values
          },
    ];

    

    // Iterate over the plot configurations and check if yscaleName exists in keys
    for (const plotConfig of plotConfigDefault) {
        if (!yscalekeys.includes(plotConfig.yscaletag)) {
            throw new Error(`Invalid yscaletag "${plotConfig.yscaletag}" Possible yscaletag can be belongs to
            any [${yscalekeys}] .`);
        }
        if (!xscalekeys.includes(plotConfig.xscaletag)) {
            throw new Error(`Invalid xscaletag "${plotConfig.xscaletag}" Possible xscaletag can be belongs to
            any [${xscalekeys}] .`);
        }
    }

    return plotConfigDefault;
}


  setPlot(ChartData: ChartDataObj,axisChart:AxisChart) {
    const plotconfigdata = this.setDefaultPlotConfig(axisChart)
    // let temparray={}
    plotconfigdata.forEach((item) => {
        const {plotstatus,plotName,Ydata,Xdata,yscaletag,xscaletag,plottype, tagclass,linetype='solid',
        color='red',fill='none',strokewidth=2,strokedasharray='15,5'  
        }=item
        this.PlotData[plotName]={
          plotstatus: plotstatus,
            ydata: () =>  Ydata=='ohlc'?ChartData:ChartData[Ydata],
            xdata: () =>  ChartData[Xdata],
            yscaletag: yscaletag,
            xscaletag: xscaletag,
            // xdata: "xdata",
            // xdatamap: false, // true only if xdata domain [timestamp[0],...,timestamp[1]] is different from xscaletag axis domain [0,...,timestamp.length]
            linetype: linetype,
            color: color,
            // yscalenumber: 1,
            fill: fill,
            strokewidth: strokewidth,
            strokedasharray: strokedasharray,
            plottype: plottype,
            tagclass: tagclass,
        }
    })
  }

  getActivePlots(): PlotConfigdataType {
    
    const activePlots: PlotConfigdataType = {};

    for (const key in this.PlotData) {
        if (this.PlotData.hasOwnProperty(key)) {
            if (this.PlotData[key].plotstatus) {
                activePlots[key] = this.PlotData[key];
            }
        }
    }

    return activePlots;
}

}
