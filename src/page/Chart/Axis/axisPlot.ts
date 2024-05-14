import * as d3 from "d3";
import { XScaleConfigItemType, YScaleConfigItemType, xScaleConfigType, yScaleConfigType } from "../BaseSetup/ShareDataType";
import {
  Shared_ChartBaseData,
  Shared_ChartDimension,
  Shared_ChartPlotData,
  Shared_XScaleConfig,
  Shared_XYrelation,
  Shared_YScaleConfig,
  updateShared_XScaleConfig,
  updateShared_YScaleConfig,
  updateYScaleConfigByKey,
} from "../BaseSetup/SharedDataUtility";
import { ChartDataType } from "../BaseSetup/chartdataTypes";
import { formatVolume, multiFormat } from "./dateFormat";

function custumticformat(i: d3.NumberValue, stockid: string, datatotag: keyof ChartDataType): string | null {
  return multiFormat(i, "temp:1D", Shared_ChartPlotData[datatotag]);
}
function customvolumformat(volume: d3.NumberValue): string | null {
  return formatVolume(volume);
}

function xaxisgenerator(
  xScale: d3.ScaleLinear<number, number> | d3.ScaleTime<number, number>,
  xAxisObject: Partial<Pick<xScaleConfigType[string], "scaleSide" | "ticlavelmappedwith">> = { scaleSide: "Bottom", ticlavelmappedwith: "xindex" }
) {
  // const { scaleSide, scaledatatag, mappedwith } = xAxisObject;
  const scaleSide = xAxisObject.scaleSide || "Bottom";
  // If ticlavelmappedwith is not provided, use a default value or handle accordingly
  const ticlavelmappedwith = xAxisObject.ticlavelmappedwith || "xindex";
  const axisGenerator = scaleSide === "Top" ? d3.axisTop(xScale) : d3.axisBottom(xScale);
  const [start, end] = d3.extent(xScale.range()) as [number, number];
  const pxPerTick = 100;
  const tickCount = Math.ceil((end - start) / pxPerTick);
  // return axisGenerator.ticks(tickCount).tickFormat((i) => i);

  if (ticlavelmappedwith == "timestamp") {
    return axisGenerator.ticks(tickCount).tickFormat((i: Date | d3.NumberValue) => {
      // Convert the Date or number value to a string
      // console.log("i111", i);
      if (i instanceof Date) {
        return i.toLocaleDateString(); // Format date using toLocaleDateString
      } else {
        //   return i.toString(); // Convert other values to string
        return custumticformat(i, "stockid", ticlavelmappedwith) as string;
      }
    });
  }

  return axisGenerator.ticks(tickCount).tickFormat((i) => {
    // Convert the Date or number value to a string
    return i.toString();
  });
}
function yaxisgenerator(
  yScale: d3.ScaleLinear<number, number>,
  yAxisObject: Partial<Pick<yScaleConfigType[string], "scaleSide" | "yscaleTag">> = { scaleSide: "Left", yscaleTag: "MAIN" }
) {
  const scaleSide = yAxisObject.scaleSide || "Left";
  const yscaletag = yAxisObject.yscaleTag || "MAIN";

  const axisGenerator = scaleSide === "Left" ? d3.axisLeft(yScale) : d3.axisRight(yScale);

  const [start, end] = d3.extent(yScale.range()) as [number, number];
  //console.log("ygenratror",yscaletag,scaleSide)
  const pxPerTick = 40;
  const tickCount = Math.ceil((end - start) / pxPerTick);
  // console.log("tickCount",tickCount);

  if (yscaletag == "BR") {
    return axisGenerator.ticks(tickCount).tickFormat((i: Date | d3.NumberValue) => {
      // Convert the Date or number value to a string
      // console.log("i111", i);
      if (i instanceof Date) {
        return i.toLocaleDateString(); // Format date using toLocaleDateString
      } else {
        //   return i.toString(); // Convert other values to string
        return customvolumformat(i) as string;
      }
    });
  } else {
    return axisGenerator.ticks(tickCount);
  }
}

export function UpdateXscaleconfig() {
  updateShared_XScaleConfig("bot", {
    ypoint: Shared_ChartDimension.svgHeight - Shared_ChartDimension.margin.bottom,
    xscaleRange: [
      Shared_ChartDimension.margin.innerLeft + Shared_ChartDimension.margin.left,
      Shared_ChartDimension.svgWidth - Shared_ChartDimension.margin.right,
    ],
  });

  updateShared_XScaleConfig("top", {
    ypoint: Shared_ChartDimension.margin.top,
    xscaleRange: [
      Shared_ChartDimension.margin.innerLeft + Shared_ChartDimension.margin.left,
      Shared_ChartDimension.svgWidth - Shared_ChartDimension.margin.right,
    ],
  });
}

export function UpdateYscaleconfig() {
  updateShared_YScaleConfig("TR", {
    xpoint: Shared_ChartDimension.svgWidth - Shared_ChartDimension.margin.right,
    //   xscaleVisibleRange:[0,Shared_ChartPlotData]
    //xpoint: 50,
  });

  updateShared_YScaleConfig("TL", {
    xpoint: Shared_ChartDimension.margin.innerLeft + Shared_ChartDimension.margin.left,
    // xpoint:100
  });

  updateShared_YScaleConfig("BR", {
    xpoint: Shared_ChartDimension.svgWidth - Shared_ChartDimension.margin.right,
    // xpoint:200
  });
}


function XAxisOnSVG(scaleconfig: XScaleConfigItemType, currentTransformXb: any, axisAreaonSVG: any) {
  if (scaleconfig.xscale != null) {
    const XSL = scaleconfig.xscale().XSCALE as d3.ScaleLinear<number, number>;
    let currentxscale = currentTransformXb.rescaleY(XSL);
    axisAreaonSVG.selectAll(`.x-axis-${scaleconfig.xscaleTag}`).remove();

    axisAreaonSVG
    .append("g")
    .attr("class", `axis x-axis x-axis-${scaleconfig.xscaleTag}`)
    .attr("transform", `translate(${0},${scaleconfig.ypoint})`)
    .call(
      xaxisgenerator(currentxscale, {
        scaleSide: scaleconfig.scaleSide,
        ticlavelmappedwith: scaleconfig.ticlavelmappedwith,
      })
    );
  }
}

function YAxisOnSVG(scaleconfig: YScaleConfigItemType, axisAreaonSVG: any) {
  if (scaleconfig.yscale != null) {
    const YSL = scaleconfig.yscale().YSCALE as d3.ScaleLinear<number, number>;
    // const ydomain=scaleconfig.yscale().domain
    // console.log("ydomain",ydomain);

    // updateShared_YScaleConfig(scaleconfig.yscaleTag, {
    //   ydomaindata: ydomain,
    // });

    // console.log(scaleconfig.yzoomtransform);
    let currentyscale = scaleconfig.yzoomtransform.rescaleY(YSL);
    axisAreaonSVG.selectAll(`.y-axis-${scaleconfig.yscaleTag}`).remove();

    axisAreaonSVG
      .append("g")
      .attr("class", `axis y-axis y-axis-${scaleconfig.yscaleTag}`)
      .attr("transform", `translate(${scaleconfig.xpoint},${0})`)
      .call(
        yaxisgenerator(currentyscale, {
          scaleSide: scaleconfig.scaleSide,
          yscaleTag: scaleconfig.yscaleTag,
        })
      );
  }
}

export function intialRendorAxis(axisAreaonSVG: d3.Selection<SVGGElement, any, HTMLElement, any>,xzoomeventsvg: d3.Selection<SVGGElement, any, HTMLElement, any>,yzoomeventsvg: d3.Selection<SVGGElement, any, HTMLElement, any>) {
  axisAreaonSVG.selectAll(`.axis`).remove();
  const xscaleTagSet = Array.from(Shared_ChartBaseData.xscaleTag);
  xscaleTagSet.map((scaletag) => {
    const scaleconfig = Shared_XScaleConfig[scaletag];
    const currentTransformXb=xzoomeventsvg.property("__zoom");
    XAxisOnSVG(scaleconfig,currentTransformXb,axisAreaonSVG)
  });
  const yscaleTagSet = Array.from(Shared_ChartBaseData.yscaleTag);
  yscaleTagSet.map((scaletag) => {
    const scaleconfig = Shared_YScaleConfig[scaletag];
    // const currentTransformYb=yzoomeventsvg.property("__zoom");
    YAxisOnSVG(scaleconfig,axisAreaonSVG)
  });
}

export function drawXaxis(axisAreaonSVG: d3.Selection<SVGGElement, any, HTMLElement, any>, xzoomeventsvg: d3.Selection<SVGGElement, any, HTMLElement, any>) {
  axisAreaonSVG.selectAll(`.x-axis`).remove();
  const xscaleTagSet = Array.from(Shared_ChartBaseData.xscaleTag);
  // console.log(xscaleTagSet);
  xscaleTagSet.map((scaletag) => {
    const scaleconfig = Shared_XScaleConfig[scaletag];
    // console.log("scaletag",scaletag);

    if (scaleconfig.xscale != null) {
      const XSL = scaleconfig.xscale().XSCALE as d3.ScaleLinear<number, number> | d3.ScaleTime<number, number>;

      const currentTransformXb = xzoomeventsvg.property("__zoom");

      let currentxscale = currentTransformXb.rescaleX(XSL);
      Shared_XYrelation[scaletag].map((yscaltag) => {
        // console.log("autozoom",Shared_YScaleConfig[yscaltag].autozoom);
        if (Shared_YScaleConfig[yscaltag].autozoom) {
          const newvisibleRange = currentxscale.domain();
          const allowablerange = [0, Shared_ChartPlotData[scaleconfig.xscaleDataTag].length];
          // console.log("allowablerange");
          updateShared_YScaleConfig(yscaltag, {
            xscaleVisibleRange: [Math.max(newvisibleRange[0], allowablerange[0]), Math.min(newvisibleRange[1], allowablerange[1])],
          });
        }
      });

      XAxisOnSVG(scaleconfig,currentTransformXb,axisAreaonSVG)
     
    }
  });
}




export function drawYaxis(
  axisAreaonSVG: d3.Selection<SVGGElement, any, HTMLElement, any>,
  yzoomeventsvg: d3.Selection<SVGGElement, any, HTMLElement, any>,
  ymousepoint?: number
) {
  

  
  const yscaleTagSet = Array.from(Shared_ChartBaseData.yscaleTag);
  axisAreaonSVG.selectAll(".y-axis").each(function () {
    const yScaleTag = d3.select(this).attr("class").split("y-axis-")[1];
    if (!yscaleTagSet.includes(yScaleTag)) {
      console.log(yScaleTag, yScaleTag);
      axisAreaonSVG.select(`.y-axis-${yScaleTag}`).remove();
    }
  });

  if (ymousepoint != undefined) {
    let insidepoint: boolean = false;
    yscaleTagSet.map((scaletag) => {
      const scaleconfig = Shared_YScaleConfig[scaletag];
      if (scaleconfig.yaxisrange) {
        insidepoint = ymousepoint > scaleconfig.yaxisrange[1] && ymousepoint < scaleconfig.yaxisrange[0];
      }
      if (scaleconfig.zoomstatus && insidepoint) {

        // console.log(scaleconfig.yscaleTag,scaleconfig.yzoomtransform);

        const initialTransform =scaleconfig.yzoomtransform
        // yzoomeventsvg.call(zoom.transform, d3.zoomIdentity.translate(initialTransform.x, initialTransform.y).scale(initialTransform.k))

        const currentTransformXb = yzoomeventsvg.property("__zoom");

        // const translateX = initialTransform.x - currentTransformXb.x;
        // const translateY = initialTransform.y - currentTransformXb.y;

        // const newTransform = {
        //   x: currentTransformXb.x + translateX,
        //   y: currentTransformXb.y + translateY,
        //   k: initialTransform.k
        // };



        console.log(scaleconfig.yscaleTag,currentTransformXb);
        updateShared_YScaleConfig(scaleconfig.yscaleTag, {
          yzoomtransform: currentTransformXb,
        });

        // console.log(Shared_YScaleConfig);

        YAxisOnSVG(scaleconfig, axisAreaonSVG);
      }
    });
    return;
  }

  yscaleTagSet.map((scaletag) => {
    const scaleconfig = Shared_YScaleConfig[scaletag];
    YAxisOnSVG(scaleconfig, axisAreaonSVG);
  });

}
