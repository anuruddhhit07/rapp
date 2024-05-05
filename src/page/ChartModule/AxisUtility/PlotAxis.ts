import * as d3 from "d3";
import { PlotConfig } from "../ChartSetup/setplotConfig";
import { XScaleConfigType } from "../types/AxisScaleType";
import { PlotConfigdataType } from "../types/plotConfigType";
import { AxisChart } from "./AxisScale";
import { multiFormat } from "../dataUtility/dateFormat";
import { ChartDataObj } from "../types/chartdataTypes";

export class PlotAxis {
  private static instance: PlotAxis | null = null;
  private chartdata: ChartDataObj;
  // type YScaleKeys = keyof typeof this.yScaleConfig;
  private constructor(
    svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>,
    axisChart: AxisChart,
    PlotDataConfig: PlotConfig,
    chartdata: ChartDataObj
  ) {
    this.chartdata = chartdata;
    this.rendorXaxis(svg, axisChart, PlotDataConfig);
  }

  static getInstance(
    svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>,
    axisChart: AxisChart,
    PlotDataConfig: PlotConfig,
    chartdata: ChartDataObj
  ): PlotAxis {
    if (!PlotAxis.instance) {
      PlotAxis.instance = new PlotAxis(
        svg,
        axisChart,
        PlotDataConfig,
        chartdata
      );
    }
    return PlotAxis.instance;
  }

  getUniqueScaleTags(activePlots: PlotConfigdataType): {
    yscaletags: string[];
    xscaletags: string[];
  } {
    const yscaletagsSet = new Set<string>();
    const xscaletagsSet = new Set<string>();

    for (const key in activePlots) {
      if (activePlots.hasOwnProperty(key)) {
        yscaletagsSet.add(activePlots[key].yscaletag);
        xscaletagsSet.add(activePlots[key].xscaletag);
      }
    }

    const yscaletags = Array.from(yscaletagsSet);
    const xscaletags = Array.from(xscaletagsSet);

    return { yscaletags, xscaletags };
  }

  custumticformat(
    i: d3.NumberValue,
    stockid: string,
    datatotag: keyof ChartDataObj
  ): string | null {
    return multiFormat(i, "temp:1D", this.chartdata[datatotag]);
  }

  xaxisgenerator(
    xScale: d3.ScaleLinear<number, number> | d3.ScaleTime<number, number>,
    xAxisObject: Partial<
      Pick<XScaleConfigType[string], "scaleSide" | "ticlavelmappedwith">
    > = { scaleSide: "Bottom", ticlavelmappedwith: "xindex" }
  ) {
    // const { scaleSide, scaledatatag, mappedwith } = xAxisObject;
    const scaleSide = xAxisObject.scaleSide || "Bottom";
    // If ticlavelmappedwith is not provided, use a default value or handle accordingly
    const ticlavelmappedwith = xAxisObject.ticlavelmappedwith || "xindex";
    const axisGenerator =
      scaleSide === "Top" ? d3.axisTop(xScale) : d3.axisBottom(xScale);
    const [start, end] = d3.extent(xScale.range()) as [number, number];
    const pxPerTick = 100;
    const tickCount = Math.ceil((end - start) / pxPerTick);
    // return axisGenerator.ticks(tickCount).tickFormat((i) => i);

    if (ticlavelmappedwith == "timestamp") {
      return axisGenerator.ticks(tickCount).tickFormat((i: Date | d3.NumberValue) => {
        // Convert the Date or number value to a string
        console.log("i111", i);
        if (i instanceof Date) {
          return i.toLocaleDateString(); // Format date using toLocaleDateString
        } else {
        //   return i.toString(); // Convert other values to string
          return this.custumticformat(i, "stockid", ticlavelmappedwith) as string
        }
        
      });
      
    }
 
    return axisGenerator.ticks(tickCount).tickFormat((i) => {
      // Convert the Date or number value to a string
      return i.toString();
    });
    //

    // const [start, end] = d3.extent(xScale.range());
    // const pxPerTick = 100;
    // const tickCount = Math.ceil((end - start) / pxPerTick);

    // if (mappedwith === "timestamp") {
    //     return axisGenerator
    //         .ticks(tickCount)
    //         .tickFormat((i: any) => multiFormat(i, this.stockid, this.dataset[scaledatatag!]));
    // }

    // return axisGenerator.ticks(tickCount).tickFormat((i: any) => i);
  }

  rendorXaxis(
    svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>,
    axisChart: AxisChart,
    PlotDataConfig: PlotConfig
  ) {
    svg.selectAll(`.axis`).remove();

    console.log(axisChart.xScaleConfig);
    console.log(PlotDataConfig.PlotData);
    const activePlots = PlotDataConfig.getActivePlots();
    console.log("AA", activePlots);

    const { yscaletags, xscaletags } = this.getUniqueScaleTags(activePlots);
    console.log("Unique yscaletags:", yscaletags);
    console.log("Unique xscaletags:", xscaletags);

    xscaletags.map((scaletag) => {
      const scaleconfig = axisChart.xScaleConfig[scaletag];
      console.log(scaleconfig);
      console.log("datadomain", scaleconfig.datadomain);

      svg
        .append("g")
        .attr("class", `axis x-axis x-axis-${scaleconfig.xscaleName}`)
        .attr("transform", `translate(${0},${scaleconfig.y_point})`)
        .call(
          this.xaxisgenerator(
            scaleconfig.Xscale as
              | d3.ScaleLinear<number, number>
              | d3.ScaleTime<number, number>,
            {
              scaleSide: scaleconfig.scaleSide,
              ticlavelmappedwith: scaleconfig.ticlavelmappedwith,
            }
          )
        );
      // .style("display", plotaxis ? "block" : "none");
    });
  }
}
