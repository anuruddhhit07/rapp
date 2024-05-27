import { Shared_ChartDimension } from "../BaseSetup/SharedDataUtility";
export function drawCrosshair({ BackGroup, index, y, valuestring, currentXscale }) {
    const { width, margin, svgWidth, height } = Shared_ChartDimension;
    // Remove any existing crosshair elements
    BackGroup.selectAll(".crosshair").remove();
    // Draw crosshair lines
    BackGroup.append("line")
        .attr("class", "crosshair crosshair-x")
        .attr("x1", margin.left + margin.innerLeft)
        .attr("y1", y)
        .attr("x2", svgWidth - margin.right)
        .attr("y2", y)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "5 5")
        .attr("pointer-events", "none")
        .style("display", "block");
    BackGroup.append("line")
        .attr("class", "crosshair crosshair-y")
        .attr("x1", currentXscale(index))
        .attr("y1", margin.top + margin.innerTop * 2)
        .attr("x2", currentXscale(index))
        .attr("y2", margin.top + margin.innerTop + height)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "5 5")
        .attr("pointer-events", "none")
        .style("display", "block");
    // Draw crosshair background rectangle
    BackGroup.append("rect")
        .attr("class", "crosshair crosshair-background")
        .attr("x", svgWidth - margin.right)
        .attr("y", y - 8)
        .attr("width", 100)
        .attr("height", 18)
        .attr("fill", "lightblue")
        .attr("rx", 5)
        .attr("ry", 5);
    // Draw crosshair value text
    BackGroup.append("text")
        .attr("class", "crosshair crosshair-text")
        .attr("x", svgWidth - margin.right)
        .attr("y", y)
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .style("fill", "blue")
        .style("font-size", "10px")
        .text(` ${valuestring}`);
}
//   function handleTooltipAndCrosshair(svg, BackGroup, FrontGroup, Shared_XScaleConfig, Shared_ChartPlotData, Shared_yaxisProp, Shared_YScaleConfig, x, y) {
//     // Display tooltip and crosshair elements
//     svg.selectAll('.tooltip').style('display', 'block');
//     BackGroup.selectAll('.crosshair').style('display', 'block');
//     // Get current zoom transform
//     const currentTransform = FrontGroup.property('__zoom');
//     const zoomXscaleAxis = 'bot';
//     const currentXscale = currentTransform.rescaleX(Shared_XScaleConfig[zoomXscaleAxis].xscale().XSCALE);
//     // Calculate x value and index
//     const xValue = currentXscale.invert(x);
//     let index = Math.round(xValue) < 0 ? 0 : Math.round(xValue) > Shared_ChartPlotData[Shared_XScaleConfig[zoomXscaleAxis].xscaleDataTag].length - 1
//         ? Shared_ChartPlotData[Shared_XScaleConfig[zoomXscaleAxis].xscaleDataTag].length - 1 : Math.round(xValue);
//     // Get the corresponding y-axis tag and value string
//     const tagyaxis = getAxisKeyForRangeValue(y);
//     let valuestring = "";
//     if (tagyaxis) {
//         const yscaletag = Shared_yaxisProp[tagyaxis].yscaleTag;
//         valuestring = Shared_YScaleConfig[yscaletag[0]].yscale().YSCALE?.invert(y).toFixed(2) as string;
//     }
//     // Update tooltips and draw crosshair
//     updateTooltips(svg, index);
//     drawCrosshair({
//         BackGroup: BackGroup,
//         index: index,
//         y: y,
//         valuestring: valuestring,
//         currentXscale: currentXscale,
//     });
// }
