import SetupChart from "../ChartSetup/setchart";
import {
  XScaleConfigType,
  YScaleConfigType,
  yAxisItemType,
} from "../types/AxisScaleType";
import { ChartOptions, Margin } from "../types/chartSetuptype";
import { ChartDataObj } from "../types/chartdataTypes";
import * as d3 from "d3";

export class AxisChart {
  private static instance: AxisChart | null = null;
  public xScaleConfig: XScaleConfigType = {};
  public yScaleConfig: YScaleConfigType = {};
  // type YScaleKeys = keyof typeof this.yScaleConfig;
  private constructor(ChartOptions: SetupChart, ChartData: ChartDataObj) {
    this.setXScaleConfig(ChartOptions, ChartData);
    this.setYScaleConfig(ChartOptions, ChartData);
  }

  static getInstance(
    ChartOptions: SetupChart,
    ChartData: ChartDataObj
  ): AxisChart {
    if (!AxisChart.instance) {
      AxisChart.instance = new AxisChart(ChartOptions, ChartData);
    }
    return AxisChart.instance;
  }

  setXScaleConfig(ChartOptions: SetupChart, ChartData: ChartDataObj) {
    const { svgHeight, svgWidth, margin } = ChartOptions;
    const { timestamp } = ChartData;
    this.xScaleConfig = {
      bot: {
        ypoint: svgHeight - margin.bottom,
        scaleSide: "Bottom",
        scaleType: "linear",
        scaledatatag: "timestamp",
        scalerange: [
          margin.left + margin.innerLeft,
          svgWidth - margin.right - margin.innerRight,
        ],
        // datadomain: [0, this.dataset.xdata[this.dataset.xdata.length - 1]],
        datadomain: () => [0, timestamp.length],
        mappedwith: "timestamp", // just to display axis tick and reverse map if any dataplot have axis defeind in timestamp
        //scaleRole: "main",
        plotaxis: true,
        zooming: true,
      },
    };
  }

  getdefaultyaxis(ChartOptions: SetupChart, ChartData: ChartDataObj) {
    const { svgHeight, svgWidth, margin } = ChartOptions;
    const YscaleConfigDefault: yAxisItemType[] = [
      {
        status: true,
        yscaleName: "OHLC",
        xaxisdataTag: "xindex",
        scaleSide: "Right",
        x_point: svgWidth - margin.right,
        changeRangeTag: true,
        highestYDataTag: "high",
        lowestYDataTag: "low",
      },
      {
        status: true,
        yscaleName: "BR",
        xaxisdataTag: "xindex",
        scaleSide: "Right",
        x_point: 50,
        changeRangeTag: true,
        highestYDataTag: "high",
        lowestYDataTag: "low",
      },
    ];

    return YscaleConfigDefault.filter((item) => item.status == true);
  }

  setYScaleConfig(ChartOptions: SetupChart, ChartData: ChartDataObj) {
    const yscaleconfigdata = this.getdefaultyaxis(ChartOptions, ChartData);

    yscaleconfigdata.forEach((item) => {
      const {
        yscaleName,
        x_point,
        scaleSide,
        xaxisdataTag,
        changeRangeTag,
        highestYDataTag,
        lowestYDataTag,
      } = item;
      this.yScaleConfig[yscaleName] = {
        yaxistag: yscaleName,
        xpoint: x_point, // Example value, replace with actual values
        scaleSide: scaleSide,
        ypadding: () => 0.1,
        transform: { k: 1 },
        scaledata_max: () => ChartData[highestYDataTag], // Example value, replace with actual values
        scaledata_min: () => ChartData[lowestYDataTag], // Example value, replace with actual values
        changeRangeTag: changeRangeTag,
        visrange:(minrange:number=d3.min(ChartData[xaxisdataTag] as number[]) as number,maxrange:number= d3.max(ChartData[xaxisdataTag] as number[]) as number ) => [
            minrange,maxrange
        ], // Example value, replace with actual values
        maxscaledata() {
            if (changeRangeTag){
                const highWithinRange = this.scaledata_max().filter(
                    (d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]
                  );
                  return d3.max(highWithinRange, (d) => d)as number
            } 
            return d3.max(this.scaledata_max()) as number
           
        },
        minscaledata() {
          // Example implementation
          if (changeRangeTag){
            const lowWithinRange = this.scaledata_min().filter(
                (d, i) => i >= this.visrange()[0] && i <= this.visrange()[1]
              );
              return d3.min(lowWithinRange, (d) => d) as number;
          }
          return d3.min(this.scaledata_min()) as number
        },
        datadomain() {
            const maxData = this.maxscaledata();
            const minData = this.minscaledata();
            // Calculate the current center point of the scale
            const center = (maxData + minData) / 2;
            // Calculate the new range extent based on transform.k
            const newExtent = (maxData - minData) / this.transform.k / 2;
            // Calculate the new maximum and minimum data values
            const newMax = center + newExtent;
            const newMin = center - newExtent;
  
            // console.log("DATAPOMI",minData,maxData);
            // console.log("variable",newMin,newMax);
            // return [
            //   newMin,
            //   newMax ,
            // ];
            // console.log(this.visrange());
  
            const lowerlimit = newMin > minData ? minData : newMin;
            const higherlimit = newMax > maxData ? maxData : newMax;
            const padding = (higherlimit - lowerlimit) * this.ypadding();
            return [lowerlimit - padding, higherlimit + padding];
          },
      };
    });
  }

  getYScaleConfigType(){
    type YScaleKeys = keyof typeof this.yScaleConfig;
  }

  getXScaleConfig() {
    return this.xScaleConfig;
  }
}
