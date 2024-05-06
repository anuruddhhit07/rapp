import * as d3 from "d3";
import { PlotConfig } from "../ChartSetup/setplotConfig";
import {
  XScaleConfigType,
  XscaleItemProp,
  YScaleConfigType,
} from "../types/AxisScaleType";
import { AxisChart } from "./AxisScale";
import { formatVolume, multiFormat } from "../dataUtility/dateFormat";
import { ChartDataObj } from "../types/chartdataTypes";
import { error } from "console";
import {
  Shared_ChartPlotData,
  Shared_Xscaleconfig,
  Shared_Yscaleconfig,
  getActivePlotData,
  getUniqueScaleTags,
  setYaxisRatio,
} from "../SharedObject";
import { DataToplotType } from "../types/plotConfigType";

export class PlotAxis {
  private static instance: PlotAxis | null = null;
  private axisChart: AxisChart;
  private constructor(
    svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>,
    axisChart: AxisChart
  ) {
    this.axisChart = axisChart;
    this.rendorXaxis(svg);
    this.rendorYaxis(svg);
  }

  static getInstance(
    svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>,
    axisChart: AxisChart
  ): PlotAxis {
    if (!PlotAxis.instance) {
      PlotAxis.instance = new PlotAxis(svg, axisChart);
    }
    return PlotAxis.instance;
  }

  custumticformat(
    i: d3.NumberValue,
    stockid: string,
    datatotag: keyof ChartDataObj
  ): string | null {
    return multiFormat(i, "temp:1D", Shared_ChartPlotData[datatotag]);
  }

  customvolumformat(volume: d3.NumberValue): string | null {
    return formatVolume(volume);
  }

  updateXscaleConfig<T, K extends keyof T>(
    xscaleConfigItem: T,
    keyToUpdate: K,
    keyValue: T[K]
  ): T {
    return {
      ...xscaleConfigItem,
      [keyToUpdate]: keyValue,
    };
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
      return axisGenerator
        .ticks(tickCount)
        .tickFormat((i: Date | d3.NumberValue) => {
          // Convert the Date or number value to a string
          // console.log("i111", i);
          if (i instanceof Date) {
            return i.toLocaleDateString(); // Format date using toLocaleDateString
          } else {
            //   return i.toString(); // Convert other values to string
            return this.custumticformat(
              i,
              "stockid",
              ticlavelmappedwith
            ) as string;
          }
        });
    }

    return axisGenerator.ticks(tickCount).tickFormat((i) => {
      // Convert the Date or number value to a string
      return i.toString();
    });
  }
  yaxisgenerator(
    yScale: d3.ScaleLinear<number, number>,
    yAxisObject: Partial<
      Pick<YScaleConfigType[string], "scaleSide" | "yscaletag">
    > = { scaleSide: "Left", yscaletag: "MAIN" }
  ) {
    const scaleSide = yAxisObject.scaleSide || "Left";
    const yscaletag = yAxisObject.yscaletag || "MAIN";

    const axisGenerator =
      scaleSide === "Left" ? d3.axisLeft(yScale) : d3.axisRight(yScale);

    const [start, end] = d3.extent(yScale.range()) as [number, number];
    console.log("ygenratror",yscaletag,scaleSide)
    const pxPerTick = 40;
    const tickCount = Math.ceil((end - start) / pxPerTick);
    if (yscaletag == "BR") {
      return axisGenerator
        .ticks(tickCount)
        .tickFormat((i: Date | d3.NumberValue) => {
          // Convert the Date or number value to a string
          // console.log("i111", i);
          if (i instanceof Date) {
            return i.toLocaleDateString(); // Format date using toLocaleDateString
          } else {
            //   return i.toString(); // Convert other values to string
            return this.customvolumformat(i) as string;
          }
        });
    } else {
      return axisGenerator.ticks(tickCount);
    }
  }

  rendorXaxis(svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>) {
    svg.selectAll(`.x-axis`).remove();

    const plotaxies = false;
    let yscaletagsarray: string[];
    let xscaletagsarray: string[] = [];

    if (plotaxies) {
      const { yscaletags, xscaletags } = getUniqueScaleTags();
      yscaletagsarray = yscaletags;
      xscaletagsarray = xscaletags;
    } else {
      xscaletagsarray = Object.keys(Shared_Xscaleconfig);
    }

    xscaletagsarray.map((scaletag) => {
      let scaleconfig = Shared_Xscaleconfig[scaletag];
      if (scaleconfig.Xscale == null) {
        throw new Error(`Scale cannot be null for scaletag: ${scaletag}`);
      }
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
  setYscale() {}
  rendorYaxis(svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>) {
    svg.selectAll(`.y-axis`).remove();
    setYaxisRatio();
    this.axisChart.setYscalefn();

    const plotaxies = true;
    let yscaletagsarray: string[] = [];
    if (plotaxies) {
      const { yscaletags } = getUniqueScaleTags();
      yscaletagsarray = yscaletags;
    } else {
      yscaletagsarray = Object.keys(Shared_Yscaleconfig);
    }

    console.log(yscaletagsarray);
    yscaletagsarray.map((scaletag) => {
      let scaleconfig = Shared_Yscaleconfig[scaletag];
      if (scaleconfig.Yscale == null) {
        throw new Error(`Scale cannot be null for scaletag: ${scaletag}`);
      }
      svg
        .append("g")
        .attr("class", `axis y-axis y-axis-${scaleconfig.yscaletag}`)
        .attr("transform", `translate(${scaleconfig.xpoint},${0})`)
        .call(
          this.yaxisgenerator(
            scaleconfig.Yscale as d3.ScaleLinear<number, number>,
            {
              scaleSide: scaleconfig.scaleSide,
              yscaletag: scaleconfig.yscaletag,
            }
          )
        );
    });

    // yscaletagsarray.map((scaletag) => {
    //   let scaleconfig = Shared_Xscaleconfig[scaletag];
    //   if (scaleconfig.Xscale == null) {
    //     throw new Error(`Scale cannot be null for scaletag: ${scaletag}`);
    //   }
    //    svg
    //     .append("g")
    //     .attr("class", `axis x-axis x-axis-${scaleconfig.xscaleName}`)
    //     .attr("transform", `translate(${0},${scaleconfig.y_point})`)
    //     .call(
    //       this.xaxisgenerator(
    //         scaleconfig.Xscale as
    //           | d3.ScaleLinear<number, number>
    //           | d3.ScaleTime<number, number>,
    //         {
    //           scaleSide: scaleconfig.scaleSide,
    //           ticlavelmappedwith: scaleconfig.ticlavelmappedwith,
    //         }
    //       )
    //     );
    //   // .style("display", plotaxis ? "block" : "none");
    // });
  }
}
