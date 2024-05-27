import * as d3 from "d3";
import { BaseType } from "d3";
import { MulitlineLineChartData, ScatterDataType } from "./chartSetuptype";
import { backtestitem } from "../../types";
declare module "d3" {
    interface Selection<GElement extends BaseType, Datum, PElement extends BaseType, PDatum> {
        drawBorder(x: number, y: number, width: number, height: number, borderColor: string, borderWidth: number, fill: string, opacity: number, iconContent?: boolean): this;
        importData(data: any[]): this;
        translate(x: number, y: number): this;
        insertHTML(html: string): this;
        onEvent1(eventName: string, eventHandler: (this: SVGGElement, event: any, d: any) => void): this;
        createSquaresHorizontally(numSquares: number, squareWidth: number, spacing: number, pressstate: boolean[], idarray: string[], svgicon: string[]): this;
        attachClickEvent(callback: (id: string, className: string, pressstate: boolean) => void): this;
        addIconImageToRect(iconSvg: string): this;
    }
}
export declare function createGroupAdv(svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>, className: string): d3.Selection<SVGGElement, any, HTMLElement, any>;
export declare function appendSvgElementsArray(mainSvg: d3.Selection<SVGSVGElement, any, any, any>, symbolIds: string[], svgProps: {
    x: number;
    y: number;
    width: number;
    height: number;
}): void;
export declare function appendSvgElementsArray1(mainSvg: d3.Selection<SVGSVGElement, any, any, any>, symbolIds: string[], svgProps: {
    x: number;
    y: number;
    width: number;
    height: number;
}): void;
export declare function enhanceGroup(groupmain: d3.Selection<SVGGElement, any, HTMLElement, any>, className: string): d3.Selection<SVGGElement, any, HTMLElement, any>;
export declare function createClipPath(svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>, id: string, x: number, y: number, width: number, height: number): d3.Selection<SVGClipPathElement, any, HTMLElement, any>;
export declare function createSVGDefs2(svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>, symbolDef: string): void;
export declare function createSVGDefs3(svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>, symbolDefs: {
    [key: string]: string;
}): void;
export declare function createMultipleSqure(svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>, className: string): d3.Selection<SVGGElement, any, HTMLElement, any>;
export declare function createLine(svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>, x1: number, y1: number, x2: number, y2: number): void;
export declare function createRect(svg: d3.Selection<SVGGElement, any, HTMLElement, any>, x: number, y: number, width: number, height: number): d3.Selection<SVGRectElement, any, HTMLElement, any>;
export declare function drawLineOnSVG(svgGroup: d3.Selection<SVGGElement, any, any, any>, xData: number[], yData: number[], xScale: d3.ScaleLinear<number, number>, yScale: d3.ScaleLinear<number, number>, classNameTag: string, yaxistag: string, plotColor: string): void;
export declare function drawBarChartOnSVG(svgGroup: d3.Selection<SVGGElement, any, any, any>, xData: number[], yData: number[], xScale: d3.ScaleLinear<number, number>, yScale: d3.ScaleLinear<number, number>, classNameTag: string, yaxistag: string, yaxisRange: [number, number], barColor: string): void;
export declare function DrawMultilineonSVG(svgGroup: d3.Selection<SVGGElement, any, any, any>, multilineData: {
    x: number[];
    y: number[];
    label: string;
}[], xScale: d3.ScaleLinear<number, number>, yScale: d3.ScaleLinear<number, number>, yaxistag: string, plotColor: string): void;
export declare function drawMultiBarChartOnSVG(svgGroup: d3.Selection<SVGGElement, any, any, any>, xData: number[], yData: {
    [key: string]: number[];
}, // Updated yData to accept an object with multiple arrays
xScale: d3.ScaleLinear<number, number>, yScale: d3.ScaleLinear<number, number>, classNameTag: string, yaxistag: string, yaxisRange: [number, number], barColors: {
    [key: string]: string;
}): void;
export declare function drawCandlestickOnSVG(svgGroup: d3.Selection<SVGGElement, any, any, any>, xdata: number[], open: number[], high: number[], low: number[], close: number[], xScale: d3.ScaleLinear<number, number>, yScale: d3.ScaleLinear<number, number>, classNameTag: string, yaxistag: string): void;
export declare function drawMultipleLineChartOnSVG(svgGroup: d3.Selection<SVGGElement, any, any, any>, lineData: MulitlineLineChartData[], classNameTag: string): void;
export declare function drawScatterPlotOnSVG(svgGroup: d3.Selection<SVGGElement, any, any, any>, scatterData: ScatterDataType[], xScale: d3.ScaleLinear<number, number>, yScale: d3.ScaleLinear<number, number>, classNameTag: string, yaxistag: string, labelstatus: boolean): void;
export declare function drawBacktestPlotOnSVG(svgGroup: d3.Selection<SVGGElement, any, any, any>, backtestData: backtestitem[], xScale: d3.ScaleLinear<number, number>, yScale: d3.ScaleLinear<number, number>, classNameTag: string, yaxistag: string): void;
