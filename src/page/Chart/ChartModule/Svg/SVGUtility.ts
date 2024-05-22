// SVGUtility.ts

import * as d3 from "d3";
import { BaseType, groups, index, Selection } from "d3";
import { CandlestickData, MulitlineLineChartData, ScatterDataType } from "./chartSetuptype";

declare module "d3" {
  interface Selection<GElement extends BaseType, Datum, PElement extends BaseType, PDatum> {
    drawBorder(
      x: number,
      y: number,
      width: number,
      height: number,
      borderColor: string,
      borderWidth: number,
      fill: string,
      opacity: number,
      iconContent?: string,
      isPath?: boolean
    ): this;
    importData(data: any[]): this;
    translate(x: number, y: number): this;
    insertHTML(html: string): this;
    onEvent1(eventName: string, eventHandler: (this: SVGGElement, event: any, d: any) => void): this;
    createSquaresHorizontally(numSquares: number, squareWidth: number, spacing: number, pressstate: boolean[], idarray: string[],svgicon:string[]): this;
    attachClickEvent(callback: (id: string, className: string, pressstate: boolean) => void): this;
    addIconImageToRect(iconSvg: string): this;
  }
}

export function createGroupAdv(
  svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>,
  className: string // Add a parameter for the class name
): d3.Selection<SVGGElement, any, HTMLElement, any> {
  const group = svg.append("g");

  // Set the class attribute for the group
  group.attr("class", className);
  let lastRect: Selection<SVGRectElement, unknown, HTMLElement, any> | null = null;

  // Add a method to draw a border around the group
  group.drawBorder = function (
    x: number,
    y: number,
    width: number,
    height: number,
    borderColor: string,
    borderWidth: number,
    fill: string,
    opacity: number,
    iconContent?: string,
    isPath?: boolean
  ) {
    lastRect = this.append("rect")
      .attr("class", `${className}-border`) // Add class attribute
      .attr("x", x)
      .attr("y", y)
      .attr("width", width)
      .attr("height", height)
      .attr("opacity", opacity)
      .attr("fill", fill)
      .style("stroke", borderColor)
      .style("stroke-width", borderWidth);

    if (iconContent) {
      const foreignObject = this.append("foreignObject").attr("width", width).attr("height", height).attr("x", x).attr("y", y);

      foreignObject
        .append("xhtml:div")
        .html(
          isPath
            ? `<svg class="svgclass" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"><use xlink:href="${iconContent}" /></svg>`
            : iconContent
        )
        .style("width", "50%")
        .style("height", "50%")
        .style("display", "flex")
        .style("justify-content", "center")
        .style("align-items", "center");
    }
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

  group.insertHTML = function (html: string) {
    this.selectAll(`.${className}-html`).remove();
    const htmlGroup = this.append("g").attr("class", `${className}-html`);
    htmlGroup.html(html); // Set the HTML content of the new group
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

  group.addIconImageToRect = function (iconSvg: string) {
    if (!lastRect) {
      throw new Error("No rectangle found. Please draw a border first.");
    }

    const foreignObject = this.append("foreignObject")
      .attr("width", lastRect.attr("width"))
      .attr("height", lastRect.attr("height"))
      .attr("x", lastRect.attr("x"))
      .attr("y", lastRect.attr("y"));
    // .on("click", clickhandler);

    foreignObject
      .append("xhtml:div")
      .html(iconSvg)
      .style("width", "100%")
      .style("height", "100%")
      .style("display", "flex")
      .style("justify-content", "center")
      .style("align-items", "center");

    return this;
  };

  return group;
}

export function appendSvgElementsArray(mainSvg: d3.Selection<SVGSVGElement, any, any, any>, symbolIds: string[], svgProps: {
  x: number;
  y: number;
  width: number;
  height: number;
}): void {
  const { x, y, width, height } = svgProps;

  // Create nested SVG at the specified location with the given width and height
  const nestedSvg = mainSvg.append('g')
  // // .append('svg')
  //   .attr('x', x)
  //   .attr('y', y)
  //   .attr('width', width*symbolIds.length)
  //   .attr('height', height);

  // Append use element to nestedSvg for each symbolId
  symbolIds.forEach((symbolId, index) => {
    nestedSvg.append('use')
      .attr('xlink:href', `#${symbolId}`)
      .attr('width', width)
      .attr('height', height)
      .attr('x', index * width) // Adjust the y position for each symbol
      .style('fill', 'red');
  });
}
export function appendSvgElementsArray1(mainSvg: d3.Selection<SVGSVGElement, any, any, any>, symbolIds: string[], svgProps: {
  x: number;
  y: number;
  width: number;
  height: number;
}): void {
  const { x, y, width, height } = svgProps;

  // Create nested SVG at the specified location with the given width and height
  const nestedSvg = mainSvg.append('g').append('svg')
    .attr('x', x)
    .attr('y', y)
    .attr('width', width*symbolIds.length)
    .attr('height', height);

  // Append use element to nestedSvg for each symbolId
  symbolIds.forEach((symbolId, index) => {
    nestedSvg.append('use')
      .attr('xlink:href', `#${symbolId}`)
      .attr('width', width)
      .attr('height', height)
      .attr('x', index * width) // Adjust the y position for each symbol
      .style('fill', 'red');
  });
}


export function enhanceGroup(
  groupmain: d3.Selection<SVGGElement, any, HTMLElement, any>,
  className: string // Add a parameter for the class name
): d3.Selection<SVGGElement, any, HTMLElement, any> {
  // Set the class attribute for the group
  const group = groupmain.append("g");

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

  group.insertHTML = function (html: string) {
    this.selectAll(`.${className}-html`).remove();
    const htmlGroup = this.append("g").attr("class", `${className}-html`);
    htmlGroup.html(html); // Set the HTML content of the new group
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
  let defs: d3.Selection<d3.BaseType, any, HTMLElement, any> = svg.select("defs");
  if (defs.empty()) {
    defs = svg.append("defs") as any;
  }

  // Append the clip path to the defs element
  const clipPath = defs.append("clipPath").attr("id", id).attr("class", "clipplot");

  // Append a rect to the clip path
  clipPath.append("rect").attr("x", x).attr("y", y).attr("width", width).attr("height", height).style("fill", "steelblue");

  return clipPath;
}

export function createSVGDefs2(svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>, symbolDef: string ): void {
  // Select the existing defs element if available, or create a new one
  let defsElement: d3.Selection<SVGDefsElement, any, HTMLElement, any> = svg.select<SVGDefsElement>("defs");
  if (defsElement.empty()) {
    defsElement = svg.append("defs");
  }

  defsElement.html(symbolDef);
}

export function createSVGDefs3(svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>, symbolDefs: { [key: string]: string }): void {
  // Select the existing defs element if available, or create a new one
  let defsElement: d3.Selection<SVGDefsElement, any, HTMLElement, any> = svg.select<SVGDefsElement>("defs");
  if (defsElement.empty()) {
    defsElement = svg.append("defs");
  }
  // defsElement.html(symbolDef);

  Object.entries(symbolDefs).forEach(([id, svgString]) => {
    defsElement.append("g").html(svgString);
  });
}



export function createMultipleSqure(
  svg: d3.Selection<SVGSVGElement, any, HTMLElement, any>,
  className: string // Add a parameter for the class name
): d3.Selection<SVGGElement, any, HTMLElement, any> {
  const group = svg.append("g");

  // Set the class attribute for the group
  group.attr("class", className);

  // Define squaresData array
  let squaresData: {
    x: number;
    y: number;
    size: number;
    id: string;
    class: string;
    pressstate: boolean | undefined;
    svgicon:string
  }[];

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
    idarray: string[] | undefined = undefined,
    svgicon:string[] 
  ) {
    squaresData = Array.from({ length: numSquares }, (_, i) => ({
      x: i * (squareWidth + spacing),
      y: 0,
      size: squareWidth,
      id: idarray ? idarray[i] : "no-idset",
      class: `${className}-square`,
      pressstate: pressstate ? pressstate[i] : undefined,
      svgicon: svgicon ? svgicon[i] : 'square',
    }));

    console.log("squaresData",squaresData);

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
      .attr("opacity",.2)
      .style("fill", (d) => {
        if (typeof d.pressstate === "undefined") return "gray"; // Color for undefined state
        return d.pressstate ? "green" : "steelblue"; // Colors for true and false states
      })
      // .style("stroke", "black") // Set border color
      .style("stroke-width", "2px"); // Set border width


      group
      .selectAll('use') // Use selectAll instead of select to bind data to all existing <use> elements
      .data(squaresData) // Bind data to the selection
      .enter() // Enter selection for data not yet existing as elements
      .append('use') // Append a <use> element for each data point
      .attr('xlink:href', (d) => {
        if (typeof d.svgicon === "undefined") return `#${'symbol1'}`; // Color for undefined state
        console.log(d.svgicon);
        return `#${d.svgicon}`   // Colors for true and false states
      })
      // `#${'home'}`) // Set the xlink:href attribute
      .attr("width", (d) => d.size) // Set the width based on data
      .attr("height", (d) => d.size) // Set the height based on data
      .attr('x',(d) => d.x) // Set the x position based on data
      .attr('y', (d) => d.y) // Set the y position based on data
      .attr("id", (d) => `svg${d.id}`)
      .style('fill',(d) => {
        if (typeof d.pressstate === "undefined") return "gray"; // Color for undefined state
        return d.pressstate ? "green" : "red"; // Colors for true and false states
      })
      .attr('pointer-events', 'none') 

    return this; // Return the group selection for chaining
  };

  // Add method to attach click event to squares
  group.attachClickEvent = function (callback: (id: string, className: string, pressstate: boolean) => void) {
    this.selectAll("rect").on("click", function (d) {
      const rect = d3.select(this);
      const id = rect.attr("id");
      const className = rect.attr("class");

      // Find the index of the clicked rectangle in the squaresData array
      const dataIndex = squaresData.findIndex((item) => item.id === id);

      if (dataIndex !== -1) {
        // Toggle the pressstate in the squaresData array only if it's not undefined
        if (typeof squaresData[dataIndex].pressstate !== "undefined") {
          squaresData[dataIndex].pressstate = !squaresData[dataIndex].pressstate;

          // Update the fill color based on the updated pressstate
          rect.style("fill", squaresData[dataIndex].pressstate ? "green" : "steelblue");
          d3.selectAll(`#svg${id}`).style("fill", squaresData[dataIndex].pressstate ? "green" : "red");
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
    .attr("height", (d) => yaxisRange[0] - yScale(d)) // Calculate the height of the bar
    .attr("fill", barColor); // Set color for the bar
}

export function DrawMultilineonSVG(
  svgGroup: d3.Selection<SVGGElement, any, any, any>,
  multilineData: {
    x: number[];
    y: number[];
    label: string;
  }[],
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>,
  yaxistag: string,
  plotColor: string
) {
  // Iterate over each line data in multilineData
  multilineData.forEach((lineData, index) => {
    // Create a line generator for the current line

    const avgX = lineData.x.reduce((sum, point) => sum + point, 0) / lineData.x.length;
    const avgY = lineData.y.reduce((sum, point) => sum + point, 0) / lineData.y.length;

    const lineGenerator = d3
      .line<number>()
      .x((d, i) => xScale(lineData.x[i]))
      .y((d, i) => yScale(lineData.y[i]));

    // Append a path element to the SVG group for the current line
    svgGroup
      .append("path")
      .datum(lineData.y) // Set data for the line
      .attr("class", `all allplot multilineplot multilineplot-${lineData.label}`)
      .attr("clip-path", `url(#clip-${yaxistag})`)
      .attr("fill", "none")
      .attr("stroke", plotColor) // Set color for the line
      .attr("stroke-width", 1) // Set width for the line
      .attr("d", lineGenerator as any); // Generate the line path using the line generator

      svgGroup
      .append('text')
      .attr('x', xScale(avgX))
      .attr('y', yScale(avgY) - 10)
      .attr('fill', plotColor)
      .attr('class', `all multilineplot avg-label-${lineData.label}`)
      .text(`${lineData.label}`);

  });
}

export function drawMultiBarChartOnSVG(
  svgGroup: d3.Selection<SVGGElement, any, any, any>,
  xData: number[],
  yData: { [key: string]: number[] }, // Updated yData to accept an object with multiple arrays
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>,
  classNameTag: string,
  yaxistag: string,
  yaxisRange: [number, number],
  barColors: { [key: string]: string } // Object to map each y-data array to its corresponding bar color
) {
  // Calculate the width of each bar group based on the scale
  const tickWidth = xScale(xData[1]) - xScale(xData[0]);

  // Number of different bar series (categories)
  const numCategories = Object.keys(yData).length;

  // Add a gap between groups of bars
  const groupGap = tickWidth * 0.2; // 20% of the tick width as gap
  const effectiveTickWidth = tickWidth - groupGap;

  // Calculate the width of each individual bar
  const barWidth = effectiveTickWidth / numCategories;

  // Iterate over each key in yData
  Object.keys(yData).forEach((key, index) => {
    const yDataArray = yData[key];

    // Append a rectangle element for each data point in the current yData array
    svgGroup
      .selectAll(`.bar-${key}`) // Select bars corresponding to the current key
      .data(yDataArray)
      .enter()
      .append("rect")
      .attr("class", `all allplot mulitbarplot mulitbarplot-${classNameTag} bar-${key}`)
      .attr("clip-path", `url(#clip-${yaxistag})`)
      .attr("x", (d, i) => xScale(xData[i]) - effectiveTickWidth / 2 + index * barWidth + (effectiveTickWidth - barWidth * numCategories) / 2) // Adjust x position to distribute bars evenly with a gap
      .attr("y", (d) => yScale(d)) // Set y position based on the data value
      .attr("width", barWidth) // Set the width of the bar
      .attr("height", (d) => yaxisRange[0] - yScale(d)) // Calculate the height of the bar
      .attr("fill", barColors[key]); // Set color for the bar based on the key
  });
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

export function drawMultipleLineChartOnSVG(svgGroup: d3.Selection<SVGGElement, any, any, any>, lineData: MulitlineLineChartData[], classNameTag: string) {
  // Create line generators for each line
  const lineGenerators: any[] = [];

  lineData.forEach((data) => {
    const lineGenerator = d3
      .line()
      .x((d: any) => d.x1)
      .y((d: any) => d.y1);

    lineGenerators.push(lineGenerator);
  });

  // Draw lines
  lineData.forEach((data, index) => {
    svgGroup
      .append("path")
      .datum([data]) // Set data for the line
      .attr("class", `all multiline multiline-line multiline-${classNameTag}`)
      .attr("d", lineGenerators[index])
      .attr("stroke", data.color)
      .attr("stroke-width", 2) // Adjust the stroke width as needed
      .attr("fill", "none");
  });

  // Add labels to the lines
  lineData.forEach((data) => {
    svgGroup
      .append("text")
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
  labelstatus: boolean
) {
  // Draw the scatter plot points
  svgGroup
    .selectAll(".scatter-point")
    .data(scatterData)
    .enter()
    .append("circle")
    .attr("class", ` all scatterplot scatter-point  scatter-point-${classNameTag}`)
    .attr("clip-path", `url(#clip-${yaxistag})`)
    .attr("cx", (d) => xScale(d.xData))
    .attr("cy", (d) => yScale(d.yData))
    .attr("r", (d) => d.size)
    .attr("fill", (d) => d.color)
    .attr("stroke", "none");

  // Add labels to the scatter plot points
  if (labelstatus) {
    svgGroup
      .selectAll(".scatter-label")
      .data(scatterData)
      .enter()
      .append("text")
      .attr("class", `all scatterplot scatter-label scatter-label-${classNameTag}`)
      .attr("clip-path", `url(#clip-${yaxistag})`)
      .attr("x", (d) => xScale(d.xData) + 5) // Adjust the offset as needed
      .attr("y", (d) => yScale(d.yData) - 5) // Adjust the offset as needed
      .text((d) => d.label)
      .attr("fill", "black")
      .style("font-size", "10px"); // Adjust the font size as needed
  }
}
