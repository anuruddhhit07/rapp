// SVGUtility.ts

import * as d3 from "d3";
import { BaseType, groups, index } from "d3";
import { CandlestickData, MulitlineLineChartData, ScatterDataType } from "./chartSetuptype";

declare module "d3" {
  interface Selection<GElement extends BaseType, Datum, PElement extends BaseType, PDatum> {
    drawBorder(x: number, y: number, width: number, height: number, borderColor: string, borderWidth: number, fill: string, opacity: number): this;
    importData(data: any[]): this;
    translate(x: number, y: number): this;
    onEvent1(eventName: string, eventHandler: (this: SVGGElement, event: any, d: any) => void): this;
    createSquaresHorizontally( numSquares: number,squareWidth: number,spacing: number,pressstate:boolean[],idarray:string[]):this
    attachClickEvent(callback: (id: string, className: string, pressstate: boolean) => void):this
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
  group.drawBorder = function (x: number, y: number, width: number, height: number, borderColor: string, borderWidth: number, fill: string, opacity: number) {
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
    this.on(eventName, function (this: SVGGElement, event, d) {
      // Adjust the listener function parameters
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
  // Select the existing defs element if available, or create a new one
  let defs:d3.Selection<d3.BaseType, any, HTMLElement, any> = svg.select('defs') ;
  if (defs.empty()) {
    defs = svg.append('defs') as any;
  }

  // Append the clip path to the defs element
  const clipPath = defs.append('clipPath').attr('id', id).attr('class', 'clipplot');

  // Append a rect to the clip path
  clipPath.append('rect')
    .attr('x', x)
    .attr('y', y)
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'steelblue');

  return clipPath;
}

export function createMultipleSqure(
  svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>,
  className: string // Add a parameter for the class name
): d3.Selection<SVGGElement, any, HTMLElement, any> {
  const group = svg.append("g");

  // Set the class attribute for the group
  group.attr("class", className);

  // Define squaresData array
  let squaresData: { x: number; y: number; size: number; id: string; class: string; pressstate: boolean| undefined; }[];

  // Add method to translate the group
  group.translate = function (x: number, y: number) {
    this.attr("transform", `translate(${x},${y})`);
    return this; // Return the group selection for chaining
  };

  // Add method to draw border
  group.drawBorder = function (x: number, y: number, width: number, height: number, borderColor: string, borderWidth: number, fill: string, opacity: number) {
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

  // Add method to create squares horizontally
  group.createSquaresHorizontally = function (
    numSquares: number,
    squareWidth: number,
    spacing: number,
    pressstate: boolean[] | undefined = undefined,
    idarray:string[] | undefined = undefined
  ) {

    squaresData = Array.from({ length: numSquares }, (_, i) => ({
      x: i * (squareWidth + spacing),
      y: 0,
      size: squareWidth,
      id: idarray ? idarray[i] : 'no-idset',
      class: `${className}-square`,
      pressstate: pressstate ? pressstate[i] : undefined 
    }));

    // console.log("squaresData",squaresData);

    this.selectAll("rect")
      .data(squaresData)
      .enter()
      .append("rect")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", (d) => d.size)
      .attr("height", (d) => d.size)
      .attr("id", (d) => d.id)
      .attr("class", (d) => d.class)
      .style("fill", (d) => {
        if (typeof d.pressstate === 'undefined') return "gray"; // Color for undefined state
        return d.pressstate ? "green" : "steelblue"; // Colors for true and false states
      });

    return this; // Return the group selection for chaining
  };

  // Add method to attach click event to squares
  group.attachClickEvent = function (callback: (id: string, className: string, pressstate: boolean) => void) {
    this.selectAll("rect")
    .on("click", function (d) {
      const rect = d3.select(this);
      const id = rect.attr("id");
      const className = rect.attr("class");

      // Find the index of the clicked rectangle in the squaresData array
      const dataIndex = squaresData.findIndex(item => item.id === id);

      if (dataIndex !== -1) {
        // Toggle the pressstate in the squaresData array only if it's not undefined
        if (typeof squaresData[dataIndex].pressstate !== 'undefined') {
          squaresData[dataIndex].pressstate = !squaresData[dataIndex].pressstate;

          // Update the fill color based on the updated pressstate
          rect.style("fill", squaresData[dataIndex].pressstate ? "green" : "steelblue");
        }

        // Call the callback function with square ID, class name, and pressstate
        callback(id, className, squaresData[dataIndex].pressstate as boolean);
      }

    });
    return this; // Return the group selection for chaining
  };

  return group;
}





export function createLine(svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>, x1: number, y1: number, x2: number, y2: number): void {
  svg.append("line").attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2);
}

export function createRect(
  svg: d3.Selection<SVGGElement, any, HTMLElement, any>,
  x: number,
  y: number,
  width: number,
  height: number
): d3.Selection<SVGRectElement, any, HTMLElement, any> {
  return svg.append("rect").attr("x", x).attr("y", y).attr("width", width).attr("height", height);
}

export function drawLineOnSVG(
  svgGroup: d3.Selection<SVGGElement, any, any, any>,
  xData: number[],
  yData: number[],
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>,
  classNameTag: string,
  yaxistag: string,
  plotColor: string
) {
  // Create a line generator
  const lineGenerator = d3
    .line()
    .x((d, i) => xScale(xData[i]))
    .y((d, i) => yScale(yData[i]));

  // Append a path element to the SVG group
  svgGroup
    .append("path")
    .datum(yData) // Set data for the line
    .attr("class", `all allplot lineplot linePlot-${classNameTag}`)
    .attr("clip-path", `url(#clip-${yaxistag})`)
    .attr("fill", "none")
    .attr("stroke", plotColor) // Set color for the line
    .attr("stroke-width", 2) // Set width for the line
    .attr("d", lineGenerator as any); // Generate the line path using the line generator
}

export function drawBarChartOnSVG(
  svgGroup: d3.Selection<SVGGElement, any, any, any>,
  xData: number[],
  yData: number[],
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>,
  classNameTag: string,
  yaxistag: string,
  yaxisRange: [number, number],
  barColor: string
) {
  // Calculate the width of each bar based on the scale
  const barWidth = xScale(xData[1]) - xScale(xData[0]);

  // Append a rectangle element for each data point
  svgGroup
    .selectAll(".bar")
    .data(yData)
    .enter()
    .append("rect")
    .attr("class", `all allplot barplot barplot-${classNameTag}`)
    .attr("clip-path", `url(#clip-${yaxistag})`)
    .attr("x", (d, i) => xScale(xData[i]) - barWidth / 4) // Adjust x position to center the bar
    .attr("y", (d) => yScale(d)) // Set y position based on the data value
    .attr("width", barWidth / 2) // Set the width of the bar
    .attr("height", (d) => (yaxisRange[0] - yScale(d))>0?(yaxisRange[0] - yScale(d)):0) // Calculate the height of the bar
    .attr("fill", barColor); // Set color for the bar
}



export function drawCandlestickOnSVG(
  svgGroup: d3.Selection<SVGGElement, any, any, any>,
  xdata: number[],
  open: number[],
  high: number[],
  low: number[],
  close: number[],
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>,
  classNameTag: string,
  yaxistag: string
) {
  // Create a group for each candlestick
  const tickwidth = xScale(1) - xScale(0);
  const cdxdata = xdata;
  const wick = svgGroup.selectAll(".wickplot").data(cdxdata);
  const candlesticks = svgGroup.selectAll(".candleplot").data(cdxdata);

  wick
    .enter()
    .append("line")
    .attr("class", `all ohlcplot wickplot wickplot-${classNameTag}`)
    .attr("clip-path", `url(#clip-${yaxistag})`)
    .merge(wick as any)
    .attr("x1", (d, i) => xScale(xdata[i]))
    .attr("y1", (d, i) => yScale(high[i]))
    .attr("x2", (d, i) => xScale(xdata[i]))
    .attr("y2", (d, i) => yScale(low[i]))
    .attr("stroke", "black")
    .attr("stroke-width", 1);

  wick.exit().remove();

  candlesticks
    .enter()
    .append("rect")
    .attr("class", `all ohlcplot candleplot candleplot-${classNameTag}`)
    .attr("clip-path", `url(#clip-${yaxistag})`)
    .merge(candlesticks as any)
    .attr("x", (d, i) => xScale(xdata[i]) - tickwidth / 4)
    .attr("y", (d, i) => {
      // console.log(d,i,filteredData.close[i]);
      return yScale(Math.max(open[i], close[i]));
    })
    .attr("width", tickwidth / 2)
    .attr("height", (d, i) => {
      // console.log(d,currentYscale(d),this.yAxisRange[currentyaxis][0]-currentYscale(d))
      return Math.abs(yScale(open[i]) - yScale(close[i])) == 0 ? yScale(close[i]) * 0.001 : Math.abs(yScale(open[i]) - yScale(close[i]));
    })
    .attr("fill", (d, i) => (open[i] > close[i] ? "red" : "green"))
    .attr("stroke", "black")
    .attr("stroke-width", 1);

  candlesticks.exit().remove();
}

export function drawMultipleLineChartOnSVG(
  svgGroup: d3.Selection<SVGGElement, any, any, any>,
  lineData: MulitlineLineChartData[],
  classNameTag: string,
) {
  // Create line generators for each line
  const lineGenerators: any[] = [];

  lineData.forEach((data) => {
    const lineGenerator = d3.line()
      .x((d: any) => d.x1)
      .y((d: any) => d.y1);

    lineGenerators.push(lineGenerator);
  });

  // Draw lines
  lineData.forEach((data, index) => {
    svgGroup.append("path")
      .datum([data]) // Set data for the line
      .attr("class", `all multiline multiline-line multiline-${classNameTag}`)
      .attr("d", lineGenerators[index])
      .attr("stroke", data.color)
      .attr("stroke-width", 2) // Adjust the stroke width as needed
      .attr("fill", "none");
  });

  // Add labels to the lines
  lineData.forEach((data) => {
    svgGroup.append("text")
    .attr("class", `all multiline multiline-label multiline-label-${classNameTag}`)
      .attr("x", (data.x1 + data.x2) / 2)
      .attr("y", (data.y1 + data.y2) / 2)
      .text(data.label)
      .attr("fill", data.color)
      .attr("text-anchor", "middle");
  });
}


export function drawScatterPlotOnSVG(
  svgGroup: d3.Selection<SVGGElement, any, any, any>,
  scatterData: ScatterDataType[],
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>,
  classNameTag: string,
  yaxistag: string,
  labelstatus:boolean
) {
  // Draw the scatter plot points
  svgGroup.selectAll(".scatter-point")
    .data(scatterData)
    .enter().append("circle")
    .attr("class", ` all scatterplot scatter-point  scatter-point-${classNameTag}`)
    .attr("clip-path", `url(#clip-${yaxistag})`)
    .attr("cx", (d) => xScale(d.xData))
    .attr("cy", (d) => yScale(d.yData))
    .attr("r", (d) => d.size)
    .attr("fill", (d) => d.color)
    .attr("stroke", "none");

  // Add labels to the scatter plot points
  if (labelstatus){
    svgGroup.selectAll(".scatter-label")
    .data(scatterData)
    .enter().append("text")
    .attr("class", `all scatterplot scatter-label scatter-label-${classNameTag}`)
    .attr("clip-path", `url(#clip-${yaxistag})`)
    .attr("x", (d) => xScale(d.xData) + 5) // Adjust the offset as needed
    .attr("y", (d) => yScale(d.yData) - 5) // Adjust the offset as needed
    .text((d) => d.label)
    .attr("fill", "black")
    .style("font-size", "10px"); // Adjust the font size as needed
  }
  
}