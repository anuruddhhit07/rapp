import SetupChart from "../ChartModule/BaseSetup/SetupChart";
import { arrangeData } from "./DataUtility/arrangeData";
import * as d3 from "d3";
import { createClipPath } from "../ChartModule/Svg/SVGUtility";
import SVGClass from "../ChartModule/Svg/SvgClassModel";
import { Shared_ChartBaseData, Shared_ButtonProp, collectKeysByButtonId, Shared_YScaleConfig, updateChartPlotData, Shared_ChartDimension, Shared_yaxisProp, updateShared_YScaleConfig, Shared_XScaleConfig, Shared_ChartPlotData, getAxisKeyForRangeValue, } from "../ChartModule/BaseSetup/SharedDataUtility";
import proxy_plotinfo from "../ChartModule/BaseSetup";
import { InitializeBaseProp } from "../ChartModule/BaseSetup/BaseProp";
import { UpdatePlotInfo, UpdateXscaleconfig, UpdateYscaleconfig, drawXaxis, drawYaxis, intialRendorAxis } from "../ChartModule/Axis/axisPlot";
import { plotonsvg } from "../ChartModule/Svg/svgPlot";
import { updateTooltips } from "../ChartModule/Svg/ToolTipUtility";
import { drawCrosshair } from "./Svg/CrosshairUtility";
class CandlestickChartTS {
    constructor(stockdata, targetID, Candlestickparamater) {
        var _a, _b;
        this.zoomX = d3.zoom().scaleExtent([0.5, 70]).on("zoom", this.zoomedX.bind(this));
        this.zoomY = d3.zoom().scaleExtent([0.5, 4]).on("zoom", this.zoomedY.bind(this));
        SetupChart.getInstance((_a = Candlestickparamater === null || Candlestickparamater === void 0 ? void 0 : Candlestickparamater.divWidth) !== null && _a !== void 0 ? _a : 1600, (_b = Candlestickparamater === null || Candlestickparamater === void 0 ? void 0 : Candlestickparamater.divHeight) !== null && _b !== void 0 ? _b : 800, { targetID: targetID });
        updateChartPlotData(arrangeData(stockdata));
        InitializeBaseProp();
        UpdateXscaleconfig();
        UpdateYscaleconfig();
        UpdatePlotInfo();
        //console.log(Shared_YScaleConfig)
        this.livefunction = Candlestickparamater.liveFunction;
        this.SVGClass = SVGClass.getInstance();
        this.svg = this.SVGClass.svg;
        // console.log(Shared_ChartPlotData)
        this.SVGClass.createYaxiseventArea(this.zoomY);
        const numberofbutton = 11;
        this.BackGroup = this.SVGClass.BackGroup;
        this.FrontGroup = this.SVGClass.FrontGroup;
        this.ResetButton = this.SVGClass.ResetButton;
        this.BackChartGroup = this.SVGClass.BackChartGroup;
        // console.log(Shared_ButtonProp);
        this.Buttonpanel = this.SVGClass.createbuttonpanel(this.buttonClick.bind(this), numberofbutton, Shared_ButtonProp);
        this.SVGClass.createTooltipArea();
        this.ToolTipArea = this.SVGClass.ToolTipArea;
        this.FrontGroup.call(this.zoomX);
        this.FrontGroup.onEvent1("mousemove", (event) => {
            // console.log(event)
            this.mousemovevent(event);
        });
        this.FrontGroup.onEvent1("mouseout", (event) => {
            // console.log(event)
            // this.mousemovevent(event);
            // console.log("out");
            this.mouseoutvent(event);
        });
        intialRendorAxis(this.BackGroup, this.FrontGroup);
        this.rendorPlot();
        this.ResetButton.onEvent1("click", (event) => {
            this.resetplot(event);
        });
    }
    zoomedX(event) {
        const [x, y] = d3.pointer(event);
        this.rendorAxis();
        this.rendorPlot();
        this.handleTooltipAndCrosshair(x, y);
    }
    zoomedY(event) {
        const [xmousepoint, ymousepoint] = d3.pointer(event);
        //console.log("main1",main1)
        drawYaxis(this.BackGroup, this.svg, ymousepoint);
        this.rendorPlot();
    }
    // keyof typeof mapButtontoChart
    buttonClick(id, className, pressstate) {
        // console.log(id);
        if (id == 'liverubfn') {
            if (this.livefunction) {
                this.livefunction();
            }
        }
        const plotarray = collectKeysByButtonId(id);
        plotarray.map((toggleplot) => {
            proxy_plotinfo[toggleplot].plotStatus = pressstate;
        });
        this.SVGClass.createYaxiseventArea(this.zoomY);
        this.SVGClass.createTooltipArea();
        this.rendorAxis();
        this.rendorPlot();
        // console.log(Shared_yaxisProp);
    }
    rendorAxis() {
        // this.BackGroup.selectAll(`.axis`).remove();
        drawXaxis(this.BackGroup, this.FrontGroup);
        drawYaxis(this.BackGroup, this.svg);
    }
    isMouseInsideFrontGroup(x, y) {
        var _a;
        // Get FrontGroup element dimensions
        const frontGroupRect = (_a = this.FrontGroup.node()) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        console.log(frontGroupRect);
        // Check if mouse coordinates are inside FrontGroup
        return frontGroupRect && x >= frontGroupRect.left && x <= frontGroupRect.right && y >= frontGroupRect.top && y <= frontGroupRect.bottom;
    }
    mouseoutvent(event) {
        // const [x, y] = d3.pointer(event)
        this.svg.selectAll(`.tooltip`).style("display", "none");
        this.BackGroup.selectAll(".crosshair").style("display", "none");
    }
    mousemovevent(event) {
        const { width, height, margin, svgWidth } = Shared_ChartDimension;
        const [x, y] = d3.pointer(event);
        // console.log("in");
        this.handleTooltipAndCrosshair(x, y);
    }
    handleTooltipAndCrosshair(x, y) {
        var _a;
        // Display tooltip and crosshair elements
        this.svg.selectAll('.tooltip').style('display', 'block');
        this.BackGroup.selectAll('.crosshair').style('display', 'block');
        // Get current zoom transform
        const currentTransform = this.FrontGroup.property('__zoom');
        const zoomXscaleAxis = 'bot';
        const currentXscale = currentTransform.rescaleX(Shared_XScaleConfig[zoomXscaleAxis].xscale().XSCALE);
        // Calculate x value and index
        const xValue = currentXscale.invert(x);
        let index = Math.round(xValue) < 0 ? 0 : Math.round(xValue) > Shared_ChartPlotData[Shared_XScaleConfig[zoomXscaleAxis].xscaleDataTag].length - 1
            ? Shared_ChartPlotData[Shared_XScaleConfig[zoomXscaleAxis].xscaleDataTag].length - 1 : Math.round(xValue);
        // Get the corresponding y-axis tag and value string
        const tagyaxis = getAxisKeyForRangeValue(y);
        let valuestring = "";
        if (tagyaxis) {
            const yscaletag = Shared_yaxisProp[tagyaxis].yscaleTag;
            valuestring = (_a = Shared_YScaleConfig[yscaletag[0]].yscale().YSCALE) === null || _a === void 0 ? void 0 : _a.invert(y).toFixed(2);
        }
        // Update tooltips and draw crosshair
        updateTooltips(this.svg, index);
        drawCrosshair({
            BackGroup: this.BackGroup,
            index: index,
            y: y,
            valuestring: valuestring,
            currentXscale: currentXscale,
        });
    }
    rendorPlot() {
        this.getclippath();
        plotonsvg(this.BackGroup, this.FrontGroup, this.AxisYGroup);
    }
    resetplot(event) {
        this.FrontGroup.call(this.zoomX.transform, d3.zoomIdentity);
        const yscaleTagSet = Array.from(Shared_ChartBaseData.yscaleTag);
        yscaleTagSet.map((scaletag) => {
            const scaleconfig = Shared_YScaleConfig[scaletag];
            this.svg.select(`.yzoom-${scaleconfig.yaxisTag}`).call(this.zoomY.transform, d3.zoomIdentity);
            updateShared_YScaleConfig(scaleconfig.yscaleTag, {
                yzoomtransform: d3.zoomIdentity,
            });
        });
        this.rendorAxis();
        this.rendorPlot();
    }
    getclippath() {
        //this.svg.select("defs").selectAll("*").remove();
        this.svg.selectAll(".clipplot").remove();
        const yaxistags = Array.from(Shared_ChartBaseData.yaxisTag);
        yaxistags.map((yaxistag) => {
            // console.log(Shared_yaxisProp[yaxistag].range);
            const { range } = Shared_yaxisProp[yaxistag];
            createClipPath(this.svg, `clip-${yaxistag}`, Shared_ChartDimension.margin.left + Shared_ChartDimension.margin.innerLeft, range[1], Shared_ChartDimension.width + Shared_ChartDimension.margin.innerRight, range[0] - range[1]);
        });
    }
    updatechart(stockdata) {
        // console.log(stockdata.histdata.length);
        updateChartPlotData(arrangeData(stockdata));
        // console.log(Shared_ChartPlotData);
        this.rendorAxis();
        this.rendorPlot();
    }
}
export default CandlestickChartTS;
