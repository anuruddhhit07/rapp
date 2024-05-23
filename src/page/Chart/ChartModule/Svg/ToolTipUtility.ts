import { color } from "d3";
import { PlotInfoItem, PlotInfoType } from "../types";
import { Shared_ChartBaseData, Shared_ChartPlotData, Shared_PlotInfo, Shared_YScaleConfig } from "../BaseSetup/SharedDataUtility";

function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year}:${hours}:${minutes}`;
  }

interface TooltipData {
    [key: string]: { value: string |number; color?: string };
  }
  
  export function getTooltipHTMLOHLC(
    this: PlotInfoItem,
    yaxistag: string,
    index: number,
    tooltiparea: d3.Selection<SVGGElement, any, HTMLElement, any>
  ) {
    // Remove existing tooltips
    if (Number.isNaN(index)) return
    tooltiparea.selectAll(`.tooliptext-${yaxistag}-${this.plotName}`).remove();
  
    const xPos = [0,50, 150, 80, 80,80]; // Adjust x positions as needed
  
    const data: TooltipData[] = [
      { I: { value: index } },
      { D: { value: formatTimestamp(Shared_ChartPlotData.timestamp[index]), color: 'blue' } },
      { O: { value: Shared_ChartPlotData.open[index] .toFixed(2), color: 'blue' } },
      { H: { value: Shared_ChartPlotData.high[index].toFixed(2), color: 'green' } },
      { L: { value: Shared_ChartPlotData.low[index].toFixed(2), color: 'red' } },
      { C: { value: Shared_ChartPlotData.close[index].toFixed(2), color: 'blue' } }
    ];
  
    let indexcount = 0;
    for (const item of data) {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          const value = item[key as keyof typeof item].value;
          tooltiparea
            .append('text')
            .attr('class', `tooliptext-${yaxistag}-${this.plotName}`)
            .attr('x',xPos.slice(0, indexcount + 1).reduce((acc, curr) => acc + curr, 0))
            .attr('y', 10)
            .append('tspan')
            .text(`${key}: ${value}`)
            .attr('fill', item[key as keyof typeof item].color || 'black');
          // Increment x position for the next data point
          indexcount++;
        //   console.log(indexcount);
        }
      }
    }
  }

  export function getTooltipHTMLVolume(
    this: PlotInfoItem,
    yaxistag: string,
    index: number,
    tooltiparea: d3.Selection<SVGGElement, any, HTMLElement, any>
  ) {
    // Remove existing tooltips
    tooltiparea.selectAll(`.tooliptext-${yaxistag}-${this.plotName}`).remove();
  
    const xPos = [0, 40, 70, 70, 70]; // Adjust x positions as needed
  
    const data: TooltipData[] = [
    //   { I: { value: index } },
      { V: { value: Shared_ChartPlotData.volume[index], color: 'blue' } },
    //   { H: { value: Shared_ChartPlotData.high[index].toFixed(2), color: 'green' } },
    //   { L: { value: Shared_ChartPlotData.low[index].toFixed(2), color: 'red' } },
    //   { C: { value: Shared_ChartPlotData.close[index].toFixed(2), color: 'blue' } }
    ];
  
    let indexcount = 0;
    for (const item of data) {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          const value = item[key as keyof typeof item].value;
          tooltiparea
            .append('text')
            .attr('class', `tooliptext-${yaxistag}-${this.plotName}`)
            .attr('x',xPos.slice(0, indexcount + 1).reduce((acc, curr) => acc + curr, 0))
            .attr('y', 10)
            .append('tspan')
            .text(`${key}: ${value}`)
            .attr('fill', item[key as keyof typeof item].color || 'black');
          // Increment x position for the next data point
          indexcount++;
        //   console.log(indexcount);
        }
      }
    }
  }

  export function getTooltipHTMLLine(
    this: PlotInfoItem,
    yaxistag: string,
    index: number,
    tooltiparea: d3.Selection<SVGGElement, any, HTMLElement, any>
  ) {
    // Remove existing tooltips
    tooltiparea.selectAll(`.tooliptext-${yaxistag}-${this.plotName}`).remove();
  
    const xPos = [0, 40, 70, 70, 70]; // Adjust x positions as needed
    // const xdata=
  
    const data: TooltipData[] = [
    //   { I: { value: index } },
      { [this.plotName]: { value:  this.ydata()[index] .toFixed(2), color: 'black' } },
    //   { H: { value: Shared_ChartPlotData.high[index].toFixed(2), color: 'green' } },
    //   { L: { value: Shared_ChartPlotData.low[index].toFixed(2), color: 'red' } },
    //   { C: { value: Shared_ChartPlotData.close[index].toFixed(2), color: 'blue' } }
    ];
  
    let indexcount = 0;
    for (const item of data) {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          const value = item[key as keyof typeof item].value;
          tooltiparea
            .append('text')
            .attr('class', `tooliptext-${yaxistag}-${this.plotName}`)
            .attr('x',xPos.slice(0, indexcount + 1).reduce((acc, curr) => acc + curr, 0))
            .attr('y', 10)
            .append('tspan')
            .text(`${key}: ${value}`)
            .attr('fill', item[key as keyof typeof item].color || 'black');
          // Increment x position for the next data point
          indexcount++;
        //   console.log(indexcount);
        }
      }
    }
  }

export function updateTooltips(svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>, index: number): void {
    const uniquePLot = Array.from(Shared_ChartBaseData.plotName);
    uniquePLot.forEach((plotname: keyof PlotInfoType) => {
      const plotInfo = Shared_PlotInfo[plotname];
      if (plotInfo && plotInfo.tooltip && plotInfo.getTooltipHTML) {
        const yscaleTag = plotInfo.yscaleTag;
        const yaxistag = Shared_YScaleConfig[yscaleTag].yaxisTag;
        const tooltipSelection = svg.select(`.tooltip-${yaxistag}-${plotname}`) as d3.Selection<SVGGElement, any, HTMLElement, any>; // Correct the selector
        plotInfo.getTooltipHTML(yaxistag, index, tooltipSelection);
      }
    });
  }