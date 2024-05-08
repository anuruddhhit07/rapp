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
  Shared_DataToplot,
  Shared_Xscaleconfig,
  Shared_Yaxisrange,
  Shared_Yscaleconfig,
  getUniqueKeysAndYScaleTagsFromDataToplotKeyValue,
  getUniqueScaleTags,
  setYaxisRatio,
  updateXscaleconfig,
  updateYscaleconfig,
} from "../SharedObject";
import { DataToplotType } from "../types/plotConfigType";

export class PlotAxis {
  private static instance: PlotAxis | null = null;
  private axisChart: AxisChart;
  // public axisarea: d3.Selection<SVGGElement, any, HTMLElement, any>;
  axisarea: d3.Selection<SVGGElement, any, HTMLElement, any>;
  private constructor(
    axisarea: d3.Selection<SVGGElement, any, HTMLElement, any>,
    axisChart: AxisChart
  ) {
    this.axisChart = axisChart;
    this.axisarea = axisarea;
    this.rendorXaxis();
    this.rendorYaxis();
  }

  static getInstance(
    axisarea: d3.Selection<SVGGElement, any, HTMLElement, any>,
    axisChart: AxisChart
  ): PlotAxis {
    if (!PlotAxis.instance) {
      PlotAxis.instance = new PlotAxis(axisarea, axisChart);
    }
    return PlotAxis.instance;
  }

  public testfun(): void {
    console.log("first", this.axisarea);
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
    //console.log("ygenratror",yscaletag,scaleSide)
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

  rendorXaxis() {
    this.axisarea.selectAll(`.x-axis`).remove();

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
      this.axisarea
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

  rendorYaxis() {
    this.axisarea.selectAll(`.y-axis`).remove();
    // console.log(Shared_Yaxisrange);
    setYaxisRatio();
    // console.log(Shared_Yaxisrange);
    this.axisChart.setYscalefn();


    const plotaxies = true;
    let yscaletagsarray: string[] = [];
    if (plotaxies) {
      const { yscaletags } = getUniqueScaleTags();
      yscaletagsarray = yscaletags;
    } else {
      yscaletagsarray = Object.keys(Shared_Yscaleconfig);
    }

    yscaletagsarray.map((scaletag) => {
      let scaleconfig = Shared_Yscaleconfig[scaletag];
      if (scaleconfig.Yscale == null) {
        throw new Error(`Scale cannot be null for scaletag: ${scaletag}`);
      }
      this.axisarea
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
  }

  public updateXaxis(currentTransformX: any) {
    //axisarea.selectAll(`.x-axis`).remove();
    //console.log("first",this.axisarea)
    // return
    const plotaxies = false;
    let xscaletagsarray: string[] = [];

    xscaletagsarray = Object.keys(Shared_Xscaleconfig);

    xscaletagsarray.map((scaletag) => {
      let scaleconfig = Shared_Xscaleconfig[scaletag];
      if (scaleconfig.Xscale == null) {
        throw new Error(`Scale cannot be null for scaletag: ${scaletag}`);
      }

      let currentxscale = currentTransformX.rescaleX(scaleconfig.Xscale) as
        | d3.ScaleLinear<number, number>
        | d3.ScaleTime<number, number>;

      updateXscaleconfig(scaletag, {
        currentTransformX: currentTransformX,
      });

      const allowrange = [
        Shared_ChartPlotData[scaleconfig.scaledatatag][0],
        Shared_ChartPlotData[scaleconfig.scaledatatag].slice(-1)[0],
      ];

      let newVisibleRange: (number | Date)[] = [
        currentxscale.domain()[0],
        currentxscale.domain()[1],
      ];

      // Convert dates to timestamps
      newVisibleRange = newVisibleRange.map((value) => {
        return typeof value === "number" ? value : (value as Date).getTime();
      });

      // Check if either value is NaN and update accordingly
      if (
        isNaN(newVisibleRange[0] as number) ||
        newVisibleRange[0] < allowrange[0]
      ) {
        newVisibleRange[0] = allowrange[0]; // Restore the start of the range
      }

      if (
        isNaN(newVisibleRange[1] as number) ||
        newVisibleRange[1] > allowrange[1]
      ) {
        newVisibleRange[1] = allowrange[1]; // Restore the end of the range
      }

      // Convert timestamps back to dates if necessary
      newVisibleRange = newVisibleRange.map((value) => {
        return typeof value === "number" ? value : new Date(value);
      });

      // console.log("newVisibleRange",newVisibleRange);

      const { yscaletags } = getUniqueKeysAndYScaleTagsFromDataToplotKeyValue([
        ["xscaletag", scaletag],
        ["plotstatus", true],
      ]);

      yscaletags.forEach((yscaletag) => {
        let yscaleconfig = Shared_Yscaleconfig[yscaletag];

        if (!yscaleconfig.changeRangeTag) {
          return;
        }

        // updateYscaleconfig(yscaletag, {
        //   visrange: () => newVisibleRange as [number, number],
        // });

        let Yscale = d3
          .scaleLinear()
          .range(yscaleconfig.yaxisrange as [number, number])
          .domain(
            yscaleconfig.datadomain(
              newVisibleRange[0] as number,
              newVisibleRange[1] as number
            )
          );

          // console.log("datadomain",yscaleconfig.datadomain(
          //   newVisibleRange[0] as number,
          //   newVisibleRange[1] as number
          // ))
          // console.log("datadomain2",yscaleconfig.datadomain2(
          //   newVisibleRange[0] as number,
          //   newVisibleRange[1] as number
          // ))

        const currentTransformY =
          Shared_Yscaleconfig[yscaletag].currentTransformY;
        let currentyscale = currentTransformY.rescaleY(Yscale);

          // if (yscaletag=='BR'){
          //   currentyscale.domain([0, currentyscale.domain()[1]]);
          // }
        

        this.axisarea.selectAll(`.y-axis-${yscaleconfig.yscaletag}`).call(
          this.yaxisgenerator(currentyscale as d3.ScaleLinear<number, number>, {
            scaleSide: yscaleconfig.scaleSide,
            yscaletag: yscaleconfig.yscaletag,
          }) as any
        );
      });

      this.axisarea.selectAll(`.x-axis-${scaleconfig.xscaleName}`).call(
        this.xaxisgenerator(
          currentxscale as
            | d3.ScaleLinear<number, number>
            | d3.ScaleTime<number, number>,
          {
            scaleSide: scaleconfig.scaleSide,
            ticlavelmappedwith: scaleconfig.ticlavelmappedwith,
          }
        ) as any
      );
    });
  }

  public updateYaxis(
    currentTransformY: d3.ZoomTransform,
    ymousepoint?: number 
  ) {
    //axisarea.selectAll(`.x-axis`).remove();
    //console.log("first",this.axisarea)
    // return

    const { yscaletags } = getUniqueScaleTags();
    yscaletags.map((scaletag) => {
      let scaleconfig = Shared_Yscaleconfig[scaletag];
      //  console.log(scaleconfig);
      //  console.log(scaletag,scaleconfig.yzoomstatus);

      if (ymousepoint!=undefined ) {
        if (scaleconfig.yaxisrange) {
          let insidepoint =
            ymousepoint > scaleconfig.yaxisrange[1] &&
            ymousepoint < scaleconfig.yaxisrange[0] &&
            scaleconfig.yzoomstatus;
          if (!insidepoint) {
            return;
          }
        }
      } else {
        if (!scaleconfig.yzoomstatus) {
          return;
        }
      }

      if (scaleconfig.Yscale == null) {
        throw new Error(`Scale cannot be null for scaletag: ${scaletag}`);
      }

      let currentyscale = currentTransformY.rescaleY(
        scaleconfig.Yscale
      ) as d3.ScaleLinear<number, number>;

      // if (scaletag=='BR'){
      //   currentyscale.domain([0, currentyscale.domain()[1]]);
      // }

      updateYscaleconfig(scaleconfig.yscaletag, {
        currentTransformY: currentTransformY,
      });

      this.axisarea.selectAll(`.y-axis-${scaleconfig.yscaletag}`).call(
        this.yaxisgenerator(currentyscale as d3.ScaleLinear<number, number>, {
          scaleSide: scaleconfig.scaleSide,
          yscaletag: scaleconfig.yscaletag,
        }) as any
      );
    });
  }
}
