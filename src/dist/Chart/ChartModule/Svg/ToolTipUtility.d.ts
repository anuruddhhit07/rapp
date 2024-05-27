import { PlotInfoItem } from "../../types";
export declare function getTooltipHTMLOHLC(this: PlotInfoItem, yaxistag: string, index: number, tooltiparea: d3.Selection<SVGGElement, any, HTMLElement, any>): void;
export declare function getTooltipHTMLVolume(this: PlotInfoItem, yaxistag: string, index: number, tooltiparea: d3.Selection<SVGGElement, any, HTMLElement, any>): void;
export declare function getTooltipHTMLLine(this: PlotInfoItem, yaxistag: string, index: number, tooltiparea: d3.Selection<SVGGElement, any, HTMLElement, any>): void;
export declare function updateTooltips(svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>, index: number): void;
