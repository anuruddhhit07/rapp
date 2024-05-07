// SVGUtility.ts

import * as d3 from "d3";
import { BaseType, groups, index } from "d3";

declare module "d3" {
  interface Selection<
    GElement extends BaseType,
    Datum,
    PElement extends BaseType,
    PDatum
  > {
    drawBorder(
      x: number,
      y: number,
      width: number,
      height: number,
      borderColor: string,
      borderWidth: number,
      fill:string,
      opacity:number
    ): this;
    importData(data: any[]): this;
    translate(x: number, y: number):this
    onEvent1(
        eventName: string,
        eventHandler: (this: SVGGElement, event: any, d: any) => void
      ): this;
    //   onCall(func: Function): this;
  }
}

export function createGroupAdv(
    svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>,
    className: string // Add a parameter for the class name
  ): d3.Selection<SVGGElement, any, HTMLElement, any> {
    const group = svg.append("g");
  
    // Set the class attribute for the group
    group.attr("class", className);
  
    // Add a method to draw a border around the group
    group.drawBorder = function (
      x: number,
      y: number,
      width: number,
      height: number,
      borderColor: string,
      borderWidth: number,
      fill:string,
      opacity:number
    ) {
      this.append("rect")
        .attr("class", `${className}-border`) // Add class attribute
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height)
        .attr("opacity", opacity)
        .attr("fill", fill)
        .style("stroke", borderColor)
        .style("stroke-width", borderWidth);
      return this; // Return the group selection for chaining
    };
  
    // Add a method to import data to the group
    group.importData = function (data: any[]) {
      // Example: bind data to group elements
      const rects = this.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", `${className}-data`) // Add class attribute
        .attr("x", (d, i) => i * 30)
        .attr("y", 0)
        .attr("width", 20)
        .attr("height", (d) => d.value)
        .style("fill", "steelblue");
      return this; // Return the group selection for chaining
    };
  
    // Add a method to translate the group
    group.translate = function (x: number, y: number) {
      this.attr("transform", `translate(${x},${y})`);
      return this; // Return the group selection for chaining
    };

    
    group.onEvent1 = function (
        eventName: string,
        eventHandler: (this: SVGGElement, event: any, d: any) => void // Adjust the listener function signature
    ) {
        this.on(eventName, function(this: SVGGElement, event, d) { // Adjust the listener function parameters
            return eventHandler.call(this, event, d); // Call the event handler with the correct parameters
        });
        return this; // Return the group selection for chaining
    };

    // group.onCall = function (func: Function) {
    //     func.call(this); // Call the external function in the context of the group
    //     return this; // Return the group selection for chaining
    // };
  
  
    return group;
  }

  export function createClipPath(
    svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>,
    id: string,
    x: number,
    y: number,
    width: number,
    height: number
  ): d3.Selection<SVGClipPathElement, any, HTMLElement, any> {
    const clipPath = svg.append("defs")
      .append("clipPath")
      .attr("id", id);
  
    clipPath.append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("width", width)
      .attr("height", height)
      .style("fill", "steelblue");
  
    return clipPath;
  }
  
  

export function createGroup(
  svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>
): d3.Selection<SVGGElement, any, HTMLElement, any> {
  return svg.append("g");
}

export function createLine(
  svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): void {
  svg
    .append("line")
    .attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2);
}

export function createRect(
  svg: d3.Selection<SVGGElement, any, HTMLElement, any>,
  x: number,
  y: number,
  width: number,
  height: number
): d3.Selection<SVGRectElement, any, HTMLElement, any> {
  return svg
    .append("rect")
    .attr("x", x)
    .attr("y", y)
    .attr("width", width)
    .attr("height", height);
}

export function drawLineOnSVG(
  svgGroup: d3.Selection<SVGGElement, any, any, any>,
  xData: number[],
  yData: number[],
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>,
  classNameTag:string,
  yaxistag:string
) {
  // Create a line generator
  const lineGenerator = d3.line()
    .x((d, i) => xScale(xData[i]))
    .y((d, i) => yScale(yData[i]));
  
  // Append a path element to the SVG group
  svgGroup.append("path")
    .datum(yData) // Set data for the line
    .attr("class", `all linePlot-${classNameTag}`)
    .attr("clip-path", `url(#clip-${yaxistag})`)
    .attr("fill", "none")
    .attr("stroke", "steelblue") // Set color for the line
    .attr("stroke-width", 2) // Set width for the line
    .attr("d", lineGenerator as any); // Generate the line path using the line generator
}
