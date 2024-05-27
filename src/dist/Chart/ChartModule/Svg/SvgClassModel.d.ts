import * as d3 from "d3";
import { PlotStatusByButtonTag } from "../../types";
declare class SVGClass {
    private static instance;
    svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>;
    axisGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
    BackGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
    AxisXGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
    AxisYGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
    PlotGroup1: d3.Selection<SVGGElement, any, HTMLElement, any>;
    FrontGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
    ResetButton: d3.Selection<SVGGElement, any, HTMLElement, any>;
    Buttonpanel: d3.Selection<SVGGElement, any, HTMLElement, any>;
    ToolTipArea: d3.Selection<SVGGElement, any, HTMLElement, any>;
    BackChartGroup: d3.Selection<SVGGElement, any, HTMLElement, any>;
    constructor();
    static getInstance(): SVGClass;
    createYaxiseventArea(callback: any): void;
    createbuttonpanel(callback: any, numberofbutton: number, buttonProp: PlotStatusByButtonTag): void;
    createTooltipArea(): void;
    setupSVG(): void;
}
export default SVGClass;
