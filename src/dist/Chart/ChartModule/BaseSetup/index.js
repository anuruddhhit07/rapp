import { buildProxy } from "./ProxyBuilder";
import { Shared_PlotInfo, generateRelationObject, getPlotNamesAndYScaleTagsByYAxisTag, getUniquePlotsWithStatusTrue, getYaxisRatio, updateSharedChartData, updateYScaleConfigByKey, updateYaxis, } from "./SharedDataUtility";
const callback = (action, path, target, newValue, previousValue, parentobj) => {
    //   parentobj.updatechildrenNumer()
    // console.log(
    //   `Action: ${action}, Path: ${path}, target: , ${target}, New Value:`,
    //   newValue,
    //   "Previous Value:",
    //   previousValue,
    //   "parentobj:",
    //   parentobj
    // );
    // // console.log(parentobj)
    //console.log(path.split(".")[1]);
    if (path.split(".")[1] == "plotStatus") {
        console.log("Enter In PROXY SET FUNTION");
        const uniquePlotsData = getUniquePlotsWithStatusTrue(parentobj);
        // console.log(uniquePlotsData);
        updateSharedChartData(uniquePlotsData);
        const yaxisRangeArray = getYaxisRatio(Array.from(uniquePlotsData.yaxisTag));
        const axisrelation = getPlotNamesAndYScaleTagsByYAxisTag();
        // console.log(axisrelation);
        updateYaxis('', {}, true);
        Object.entries(yaxisRangeArray).forEach(([yaxisTag, value]) => {
            // console.log(yaxisTag,value)
            updateYScaleConfigByKey("yaxisTag", yaxisTag, value);
            const otherparamter = axisrelation[yaxisTag];
            //console.log(otherparamter);
            updateYaxis(yaxisTag, { range: value.yaxisrange, plotname: otherparamter.plotName, yscaleTag: otherparamter.yscaleTag });
        });
        generateRelationObject();
        // updateYScaleConfigByKey()
        // console.log("range",AA)
        // Shared_ChartBaseData
    }
};
const proxy_plotinfo = buildProxy(Shared_PlotInfo, callback, [], Shared_PlotInfo);
// // console.log("before",Shared_PlotInfo.ClosePlot.plotStatus)
// proxy_plotinfo.ClosePlot.plotStatus = !Shared_PlotInfo.ClosePlot.plotStatus;
// proxy_plotinfo.OpenPlot.plotStatus = !Shared_PlotInfo.OpenPlot.plotStatus;
// console.log(Shared_PlotInfo);
// console.log(Shared_ChartBaseData)
export default proxy_plotinfo;
