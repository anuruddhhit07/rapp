import SetupChart from "../ChartSetup/setchart";
import {
  XScaleConfigType,
  YScaleConfigType,
  xAxisItemType,
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
    this.setXscalefn(ChartData)
    this.setYscalefn(ChartData)
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

  getdefaultxaxis(ChartOptions: SetupChart, ChartData: ChartDataObj) {
    const { svgHeight, svgWidth, margin } = ChartOptions;
    const XscaleConfigDefault: xAxisItemType[] = [
      {
        y_point: svgHeight - margin.bottom,
        xscaleName:"mainx",
        scaleSide: "Bottom",
        scaleType: "linear",
        scaledatatag: "xindex",
        scalerange: [
          margin.left + margin.innerLeft,
          svgWidth - margin.right - margin.innerRight,
        ],
        ticlavelmappedwith: "timestamp", // just to display axis tick and reverse map if any dataplot have axis defeind in timestamp
        plotstatus: true,
        zooming: true,
      },
      {
        y_point: margin.top,
        xscaleName:"topx",
        scaleSide: "Top",
        scaleType: "linear",
        scaledatatag: "xindex",
        scalerange: [
          margin.left + margin.innerLeft,
          svgWidth - margin.right - margin.innerRight,
        ],
        ticlavelmappedwith: "xindex", // just to display axis tick and reverse map if any dataplot have axis defeind in timestamp
        plotstatus: true,
        zooming: true,
      }
      
    ];

    return XscaleConfigDefault.filter((item) => item.plotstatus == true);
  }

  setXScaleConfig(ChartOptions: SetupChart, ChartData: ChartDataObj) {
    const { svgHeight, svgWidth, margin } = ChartOptions;
    const { timestamp } = ChartData;
    const xscaleconfigdata = this.getdefaultxaxis(ChartOptions, ChartData);

    xscaleconfigdata.forEach((item) => {
      const {
        xscaleName,
        y_point,
        scaleSide,
        scaledatatag,
        scaleType,scalerange,ticlavelmappedwith,plotstatus,zooming
      } = item;
      const datadomainFunction = () => [d3.min(ChartData[scaledatatag] as number[]) as number, d3.max(ChartData[scaledatatag] as number[]) as number] as [number, number];
      this.xScaleConfig[xscaleName] = {
        xscaleName:xscaleName,
        y_point: y_point,
        scaleSide:scaleSide,
        scaleType: scaleType,
        scaledatatag: scaledatatag,
        scalerange: scalerange,
        // datadomain: [0, this.dataset.xdata[this.dataset.xdata.length - 1]],
        datadomain: datadomainFunction(),
        ticlavelmappedwith: ticlavelmappedwith, // just to display axis tick and reverse map if any dataplot have axis defeind in timestamp
        plotstatus: plotstatus,
        zooming: zooming,
        Xscale:null
        // Xscale: scaleType === 'linear' ? 
        // d3.scaleLinear().range(scalerange).domain(datadomainFunction()) : 
        // scaleType === 'TimeScale' ?
        // d3.scaleTime().range(scalerange).domain(datadomainFunction()) :
        // d3.scaleBand<string>().range(scalerange).domain(
        //     ChartData[scaledatatag].map((d: any) => d.toString()) // Convert numbers to strings
        // )
      }
    

    })

    
  }

  getdefaultyaxis(ChartOptions: SetupChart, ChartData: ChartDataObj) {
    const { svgHeight, svgWidth, margin } = ChartOptions;
    const YscaleConfigDefault: yAxisItemType[] = [
      {
        plotstatus: true,
        yscaleName: "OHLC",
        xaxisdataTag: "xindex",
        scaleSide: "Right",
        x_point: svgWidth - margin.right,
        changeRangeTag: true,
        highestYDataTag: "high",
        lowestYDataTag: "low",
        yaxisnumer:1
      },
      {
        plotstatus: true,
        yscaleName: "BR",
        xaxisdataTag: "xindex",
        scaleSide: "Right",
        x_point: 50,
        changeRangeTag: true,
        highestYDataTag: "high",
        lowestYDataTag: "low",
        yaxisnumer:2
      },
    ];

    return YscaleConfigDefault.filter((item) => item.plotstatus == true);
  }

  setYScaleConfig(ChartOptions: SetupChart, ChartData: ChartDataObj) {
    const yscaleconfigdata = this.getdefaultyaxis(ChartOptions, ChartData);

    yscaleconfigdata.forEach((item) => {
      const {
        yscaleName,
        yaxisnumer,
        plotstatus,
        x_point,
        scaleSide,
        xaxisdataTag,
        changeRangeTag,
        highestYDataTag,
        lowestYDataTag,
      } = item;
      this.yScaleConfig[yscaleName] = {
        plotstatus: plotstatus,
        yaxistag: yscaleName,
        yaxisnumer:yaxisnumer,
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

  getActiveXScales(): XScaleConfigType {
    const activeXScales: XScaleConfigType = {};

    for (const key in this.xScaleConfig) {
        if (this.xScaleConfig.hasOwnProperty(key)) {
            if (this.xScaleConfig[key].plotstatus) {
              activeXScales[key] = this.xScaleConfig[key];
            }
        }
    }
    return activeXScales;
}

  setXscalefn(ChartData: ChartDataObj){
    const xscaletagsarray = Object.keys(this.xScaleConfig);
    xscaletagsarray.map((scaletag) => {
      let scaleconfig = this.xScaleConfig[scaletag];
      
      if (scaleconfig.Xscale == null) {
        const Xscale =
          scaleconfig.scaleType === "linear"
            ? d3
                .scaleLinear()
                .range(scaleconfig.scalerange)
                .domain(scaleconfig.datadomain)
            : scaleconfig.scaleType === "TimeScale"
            ? d3
                .scaleTime()
                .range(scaleconfig.scalerange)
                .domain(scaleconfig.datadomain)
            : d3
                .scaleBand<string>()
                .range(scaleconfig.scalerange)
                .domain(
                  ChartData[scaleconfig.scaledatatag].map((d: any) =>
                    d.toString()
                  ) // Convert numbers to strings
                );

        // scaleconfig = this.updateXscaleConfig(scaleconfig, "Xscale", Xscale);

        // scaleconfig = {
        //   ...scaleconfig,
        //   Xscale: Xscale,
        // };
        // this.xScaleConfig[scaletag]=scaleconfig
        this.xScaleConfig[scaletag].Xscale=Xscale
      }
    })
  }

  setYscalefn(ChartData: ChartDataObj){
    const yscaletagsarray = Object.keys(this.yScaleConfig);
    console.log("yscaletagsarray",yscaletagsarray)
  }

}
