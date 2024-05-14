import { Shared_ChartBaseData, Shared_ChartPlotData, Shared_PlotInfo, Shared_XScaleConfig, Shared_YScaleConfig, groupDataByPlotType } from "../BaseSetup/SharedDataUtility";
import { ChartDataType } from "../BaseSetup/chartdataTypes";
import { drawLineOnSVG } from "./SVGUtility";

export function plotonsvg(plotAreaonSVG: d3.Selection<SVGGElement, any, HTMLElement, any>,xzoomeventsvg: d3.Selection<SVGGElement, any, HTMLElement, any>,yzoomeventsvg: d3.Selection<SVGGElement, any, HTMLElement, any>){
console.log("Plot On SVG");
console.log(Shared_ChartBaseData); 
const plotTag=Array.from(Shared_ChartBaseData.plotName)
const groupedplotData = groupDataByPlotType()


plotAreaonSVG.selectAll(`.lineplot`).remove();
for (let plotType in groupedplotData) {
    if (Object.prototype.hasOwnProperty.call(groupedplotData, plotType)) {

        console.log(plotType);

        if (plotType == "line") {
            
            groupedplotData[plotType].forEach((PlotName) => {
                // console.log(PlotName);
                if (plotTag.includes(PlotName)){
                    // console.log(PlotName);
                    drawPlotLineByName(PlotName, plotAreaonSVG,xzoomeventsvg,yzoomeventsvg)
                }
            })

        }

    }}

}

function drawPlotLineByName(plotName: string, PlotGroupArea: d3.Selection<SVGGElement, any, HTMLElement, any>,xzoomeventsvg: d3.Selection<SVGGElement, any, HTMLElement, any>,yzoomeventsvg: d3.Selection<SVGGElement, any, HTMLElement, any>) {
    const XDATA = Shared_PlotInfo[plotName].xdata
    const YDATA = Shared_PlotInfo[plotName].ydata
   
    // const YDATA = Shared_DataToplot[plotName].ydata();
    let plotColor = Shared_PlotInfo[plotName].plotcolor;
    // // const currentTransformX = Shared_Xscaleconfig[Shared_DataToplot[plotName].xscaletag].currentTransformX;
    const currentTransformX = xzoomeventsvg.property("__zoom")
    const currentTransformY = yzoomeventsvg.property("__zoom");
    // // const currentTransformY = this.AxisYGroup.property("__zoom");
    const xScale =Shared_XScaleConfig[Shared_PlotInfo[plotName].xscaleTag].xscale().XSCALE as d3.ScaleLinear<number, number>;
    const yScale = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yscale().YSCALE as d3.ScaleLinear<number, number>;

    let newxScale = currentTransformX.rescaleX(xScale);
    let newyScale = currentTransformY.rescaleY(yScale);

    const yaxistag = Shared_YScaleConfig[Shared_PlotInfo[plotName].yscaleTag].yaxisTag;

    // console.log(XDATA,YDATA,plotColor);
    // console.log(currentTransformX,currentTransformY);

    drawLineOnSVG(PlotGroupArea, XDATA as number[], YDATA as number[], newxScale, newyScale, plotName, yaxistag, plotColor);
  }