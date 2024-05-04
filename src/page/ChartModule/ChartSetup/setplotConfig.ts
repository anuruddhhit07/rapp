import { ChartDataObj } from "../types/chartdataTypes";
import { PlotConfigType } from "../types/plotConfigType";

export class PlotConfig {
    private static instance: PlotConfig | null = null;
   
  
    private constructor(ChartData: ChartDataObj) {
        this.setPlot(ChartData)
    }
    static getInstance(
        ChartData: ChartDataObj
      ): PlotConfig {
        if (!PlotConfig.instance) {
            PlotConfig.instance = new PlotConfig(ChartData);
        }
        return PlotConfig.instance;
      }

      setDefaultConfig(){
        const plotConfigDefault: PlotConfigType[] = {
            
        }
      }

      setPlot(ChartData: ChartDataObj) {

      }
}