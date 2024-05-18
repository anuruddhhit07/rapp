import {
  Shared_PlotInfo,
  generateRelationObject,
  getPlotNamesAndYScaleTagsByYAxisTag,
  getPlotStatusByButtonTag,
  getUniquePlotsWithStatusTrue,
  getYaxisRatio,
  updateSharedChartData,
  updateXscaleconfig,
  updateYScaleConfigByKey,
  updateYaxis,
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
  const axisrelation=getPlotNamesAndYScaleTagsByYAxisTag()
  console.log(axisrelation);
  updateYaxis('',{},true)
  const yaxisRangeArray= getYaxisRatio(Array.from(uniquePlotsData.yaxisTag))
  Object.entries(yaxisRangeArray).forEach(([yaxisTag, value]) => {
    // console.log(yaxisTag,value)
    updateYScaleConfigByKey("yaxisTag", yaxisTag,value)
    const otherparamter=axisrelation[yaxisTag]
    //console.log(otherparamter);
    updateYaxis(yaxisTag,{range:value.yaxisrange,plotname:otherparamter.plotName as string[],yscaleTag:otherparamter.yscaleTag as string[]})
  })

  getPlotStatusByButtonTag()

  generateRelationObject()
 

}

export {};


 
//console.log("00",Shared_PlotInfo)
