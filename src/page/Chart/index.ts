import { ProxyCallback, buildProxy } from "./BaseSetup/ProxyBuilder";
import {
  Shared_ChartBaseData,
  Shared_PlotInfo,
  Shared_XScaleConfig,
  Shared_YScaleConfig,
  generateRelationObject,
  getUniquePlotsWithStatusTrue,
  getYaxisRatio,
  updateSharedChartData,
  updateXscaleconfig,
  updateYScaleConfigByKey,
  updateYscaleconfig,
  updateplotInfo,
} from "./BaseSetup/SharedDataUtility";
import {} from "./BaseSetup/BaseProp";
import { ChartBaseData } from "./BaseSetup/ShareDataType";

// console.log(Shared_YScaleConfig);
// console.log(Shared_XScaleConfig);
// console.log(Shared_PlotInfo);


const callback: ProxyCallback = (
  action,
  path,
  target,
  newValue,
  previousValue,
  parentobj
) => {
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
    const uniquePlotsData=getUniquePlotsWithStatusTrue(parentobj) as {plotName: Set<string>;
      xscaleTag: Set<string>;
      yscaleTag: Set<string>;
      yaxisTag: Set<string>}
    updateSharedChartData(uniquePlotsData as any)
    const yaxisRangeArray= getYaxisRatio(Array.from(uniquePlotsData.yaxisTag))
    // console.log(yaxisRangeArray);
    Object.entries(yaxisRangeArray).forEach(([yaxisTag, value]) => {
      console.log(yaxisTag,value)
      updateYScaleConfigByKey("yaxisTag", yaxisTag,value)
    })
    generateRelationObject()
    // updateYScaleConfigByKey()
    // console.log("range",AA)
    // Shared_ChartBaseData

  }
};

const proxy_plotinfo = buildProxy(
  Shared_PlotInfo,
  callback,
  [],
  Shared_PlotInfo
);

// // console.log("before",Shared_PlotInfo.ClosePlot.plotStatus)
// proxy_plotinfo.ClosePlot.plotStatus = !Shared_PlotInfo.ClosePlot.plotStatus;
// proxy_plotinfo.OpenPlot.plotStatus = !Shared_PlotInfo.OpenPlot.plotStatus;
// console.log(Shared_PlotInfo);
// console.log(Shared_ChartBaseData)

export default proxy_plotinfo;
