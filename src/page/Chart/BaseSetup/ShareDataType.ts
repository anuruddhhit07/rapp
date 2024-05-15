import { ChartDataType } from "./chartdataTypes";
import * as d3 from 'd3'

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};




const AA: OptionsFlags<Features> = {
    darkMode: true,
    newUserProfile: true,
  };

// export interface ChartDataType {
//   xindex: number[];
//   close: number[];
//   open: number[];
// }

export interface ChartBaseData{
  plotName: Set<string>, 
  xscaleTag: Set<keyof xScaleConfigType>,
  yscaleTag: Set<keyof yScaleConfigType>
  yaxisTag:Set<string>
}

export interface yaxisType{
   [key:string] :{range:[number,number]}
}

// export interface ChartBaseData{
//   plotName: string[], 
//   xscaleTag: string[],
//   yscaleTag: string[]
// }

export interface XScaleConfigInputType {
  xscaleTag: string;
  ypoint: number;
  xsaleType:'Linear'|'TimeScale'|'Band'
  scaleSide:'Bottom'|'Top'
  ticlavelmappedwith:keyof ChartDataType
  xscaleRange: [number, number];
  xscaleDataTag:keyof ChartDataType;
  zoomstatus?: boolean;
}

export interface XScaleConfigItemType {
  xscaleTag: string;
  xsaleType:'Linear'|'TimeScale'|'Band'
  scaleSide:'Bottom'|'Top'
  ticlavelmappedwith:keyof ChartDataType
  ypoint: number;
  xscaleRange: [number, number];
  xscaleDataTag:keyof ChartDataType;
  zoomstatus: boolean;
  xscale: (this:XScaleConfigItemType) => {domain:any,XSCALE:any};
}

export interface xScaleConfigType {
  [key: string]: XScaleConfigItemType;
}

export interface YScaleConfigInputType {
  yscaleTag: string;
  scaleSide:'Left'|'Right'
  yaxisTag:string;
  xpoint: number;
  // yscaleRange: [number, number];
  yaxisrange?: [number, number];
  yscaleDataTag:'ohlc'|keyof ChartDataType;
  xscaleVisibleRange: [number, number];
  zoomstatus?: boolean;
  autozoom?:boolean;
}
export interface YScaleConfigItemType {
  yscaleTag: string;
  scaleSide:'Left'|'Right'
  yaxisTag:string;
  xpoint: number;
  // yscaleRange: [number, number];
  yaxisrange: [number, number]|null;
  yscaleDataTag:'ohlc'|keyof ChartDataType;
  xscaleVisibleRange: [number, number];
  zoomstatus: boolean;
  autozoom:boolean;
  ydomaindata:[number, number];
  yscale: (this:YScaleConfigItemType) => {domain:any,YSCALE:any};
  yzoomtransform:typeof d3.zoomIdentity

}

export interface yScaleConfigType {
  [key: string]: YScaleConfigItemType;
}

export interface PlotInfoInputType {
  plotStatus: boolean;
  plotName: string;
  xdataTag: keyof ChartDataType;
  ydataTag: 'ohlc'|keyof ChartDataType;
  xscaleTag: keyof xScaleConfigType;
  yscaleTag: keyof yScaleConfigType;
  plotType: string;
  plotcolor?: string;
  buttontag?:string
}

export interface PlotInfoItem {
  plotStatus: boolean;
  plotName: string;
  xdata: number[];
  ydata: number[];
  xscaleTag: keyof xScaleConfigType;
  yscaleTag: keyof xScaleConfigType;
  plotType: string;
  plotcolor: string;
  buttontag:string
}
export interface PlotInfoType {
  [key: string]: PlotInfoItem;
}

export interface XscaleYscaleRelation {
  [key: string]: string[];
}

export interface PlotStatusByButtonTag {
  [key: string]: { plotStatus: boolean, plotName: string,buttonid:string };
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
  innerLeft: number;
  innerRight: number;
  innerBottom: number;
  innertop: number;
}

// export interface ChartOptions extends ChartOptionsIn {
//   margin: Margin;
// }

export interface CandlestickData {
xData: number;
open: number;
high: number;
low: number;
close: number;
}

export interface MulitlineLineChartData {
x1: number;
x2: number;
y1: number;
y2: number;
label: string;
color: string;
}

export interface ScatterDataType {
xData: number;
yData: number;
label: string;
color: string;
size: number;
}

export interface ChartDimensionType {
svgWidth: number;
svgHeight: number;
targetID: string;
stockid: string;
liveupdatefunction: () => void;
margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    innerLeft: number;
    innerRight: number;
    innerBottom: number;
    innerTop: number; // Fixed typo in the property name "innertop" -> "innerTop"
};
readonly width: number;
readonly height: number;
}

export type PartialChartBaseSetupType = Partial<ChartDimensionType>;

// export type CustomChartOptions = ChartOptionsIn & { [key: string]: never };
