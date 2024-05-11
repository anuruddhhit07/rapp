

export {}

// xScaleConfigInput.map((xscaleitem) => {
//     const { xscaleTag, ypoint, xscaleRange, xscaleDomainData, zoomstatus } =
//       xscaleitem;
  
//     const tempxscaleItem: XScaleConfigItemType = {
//       xscaleTag: xscaleTag,
//       ypoint: ypoint,
//       xscaleRange: xscaleRange,
//       xscaleDomainData: xscaleDomainData,
//       zoomstatus: zoomstatus ? zoomstatus : false,
//     };
//     updateShared_XScaleConfig(xscaleTag, tempxscaleItem);
//   });
  
//   yScaleConfigInput.map((yscaleitem) => {
//     const { yscaleTag, xpoint, yscaleRange, yscaleDomainData, zoomstatus,xscaleVisibleRange } =
//     yscaleitem;
  
//     const tempyscaleItem: YScaleConfigItemType = {
//       yscaleTag: yscaleTag,
//       xpoint: xpoint,
//       yscaleRange: yscaleRange,
//       yscaleDomainData: yscaleDomainData,
//       xscaleVisibleRange:xscaleVisibleRange,
//       zoomstatus: zoomstatus ? zoomstatus : false,
//     };
//     updateShared_YScaleConfig(yscaleTag, tempyscaleItem);
//   });
  
//   plotInfoInput.map((plotinfoitem) => {
//     const {
//       plotStatus,
//       plotName,
//       xdataTag,
//       ydataTag,
//       xscaleTag,
//       yscaleTag,
//       plotType,
//       plotcolor,
//     } = plotinfoitem;
//     const tempplotinforItem: PlotInfoItem = {
//       plotStatus: plotStatus,
//       plotName: plotName,
//       xdata: chartData[xdataTag],
//       ydata: chartData[ydataTag],
//       xscaleTag: xscaleTag,
//       yscaleTag: yscaleTag,
//       plotType: plotType,
//       plotcolor: plotcolor ? plotcolor : "black",
//     };
  
//     updateShared_PlotInfo(plotName, tempplotinforItem);
//   });
//   console.log(Shared_PlotInfo);
//   console.log(Shared_XScaleConfig)
//   console.log(Shared_YScaleConfig)