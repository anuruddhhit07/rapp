
export function updateTooltip(this:any,tooltipGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>, data: any): void {
    console.log(this)
    // Clear previous text
    // tooltipGroup.selectAll("text").remove();

    // // Initial y position for the text elements
    // let yPos = 10;

    // // Iterate over the data object keys to append text elements with tspan
    // for (const key in data) {
    //     if (data.hasOwnProperty(key)) {
    //         tooltipGroup.append("text")
    //             .attr("x", 10)
    //             .attr("y", yPos)
    //             .append("tspan")
    //             .text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${data[key as keyof OHLCData]}`);
    //         yPos += 20; // Increment y position for the next line
    //     }
    // }
}