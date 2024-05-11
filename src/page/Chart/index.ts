import { ProxyCallback, buildProxy } from "./BaseSetup/ProxyBuilder"
import { Shared_PlotInfo, Shared_XScaleConfig,Shared_YScaleConfig, updateXscaleconfig, updateYscaleconfig, updateplotInfo } from "./BaseSetup/SharedDataUtility"
import {} from "./BaseSetup/index"

console.log(Shared_YScaleConfig)
console.log(Shared_XScaleConfig)
console.log(Shared_PlotInfo)
let Shared_ChartData={}

const callback: ProxyCallback = (
  action,
  path,
  target,
  newValue,
  previousValue,
  parentobj
) => {
//   parentobj.updatechildrenNumer()
  console.log(
    `Action: ${action}, Path: ${path}, New Value:`,
    newValue,
    "Previous Value:",
    previousValue,
    "parentobj:",parentobj
  );
  // console.log(parentobj)

  console.log(path.split('.')[1])
  if (path.split('.')[1]=='plotStatus'){
    
  }
};

const proxy_plotinfo=buildProxy(Shared_PlotInfo,callback,[],Shared_PlotInfo)

proxy_plotinfo.ClosePlot.plotStatus=false
console.log(Shared_PlotInfo)

export default Shared_PlotInfo