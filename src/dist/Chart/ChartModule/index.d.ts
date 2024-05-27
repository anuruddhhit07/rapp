import { ChartDataIN } from "../types";
import * as d3 from "d3";
import { DefaultChartParameter } from "../types";
declare class CandlestickChartTS {
    private svg;
    private SVGClass;
    axisGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
    BackGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
    AxisXGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
    AxisYGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
    PlotGroup1: d3.Selection<SVGGElement, any, HTMLElement, any>;
    FrontGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
    ResetButton: d3.Selection<SVGGElement, any, HTMLElement, any>;
    ToolTipArea: d3.Selection<SVGGElement, any, HTMLElement, any>;
    BackChartGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
    Buttonpanel: void;
    livefunction: (() => void) | undefined;
    constructor(stockdata: ChartDataIN, targetID: string, Candlestickparamater: DefaultChartParameter);
    zoomX: d3.ZoomBehavior<Element, unknown>;
    zoomedX(event: any): void;
    zoomY: d3.ZoomBehavior<Element, unknown>;
    zoomedY(event: any): void;
    buttonClick(id: any, className: any, pressstate: any): void;
    rendorAxis(): void;
    isMouseInsideFrontGroup(x: number, y: number): boolean | undefined;
    mouseoutvent(event: MouseEvent): void;
    mousemovevent(event: MouseEvent): void;
    handleTooltipAndCrosshair(x: d3.NumberValue, y: number): void;
    rendorPlot(): void;
    resetplot(event: any): void;
    getclippath(): void;
    updatechart(stockdata: ChartDataIN): void;
}
export default CandlestickChartTS;
