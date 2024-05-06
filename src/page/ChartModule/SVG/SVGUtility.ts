// SVGUtility.ts

import * as d3 from "d3";
import { BaseType } from "d3";

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
    // Add other custom methods as needed
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
  
    // Add other methods as needed
  
    return group;
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
