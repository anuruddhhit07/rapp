import {
  Shared_PlotInfo,
  getPlotStatusByButtonTag,
  getUniquePlotsWithStatusTrue,
  updateSharedChartData,
  updateXscaleconfig,
  updateYscaleconfig,
  updateplotInfo,

} from "./SharedDataUtility";

export function InitializeBaseProp() {
  updateXscaleconfig();
  updateYscaleconfig();
  updateplotInfo();
  const uniquePlotsData = getUniquePlotsWithStatusTrue(Shared_PlotInfo) as {
    plotName: Set<string>;
    xscaleTag: Set<string>;
    yscaleTag: Set<string>;
    yaxisTag: Set<string>;
  };
  updateSharedChartData(uniquePlotsData as any);
  getPlotStatusByButtonTag()
}

export {};

//console.log("00",Shared_PlotInfo)
