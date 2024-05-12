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

export interface ChartDataType {
  xindex: number[];
  close: number[];
  open: number[];
}

export interface ChartBaseData{
  plotName: Set<string>, 
  xscaleTag: Set<keyof xScaleConfigType>,
  yscaleTag: Set<keyof yScaleConfigType>
  yaxisTag:Set<string>
}

// export interface ChartBaseData{
//   plotName: string[], 
//   xscaleTag: string[],
//   yscaleTag: string[]
// }

export interface XScaleConfigInputType {
  xscaleTag: string;
  ypoint: number;
  xscaleRange: [number, number];
  xscaleDomainData: number[];
  zoomstatus?: boolean;
}

export interface XScaleConfigItemType {
  xscaleTag: string;
  ypoint: number;
  xscaleRange: [number, number];
  xscaleDomainData: number[];
  zoomstatus: boolean;
}

export interface xScaleConfigType {
  [key: string]: XScaleConfigItemType;
}

export interface YScaleConfigInputType {
  yscaleTag: string;
  yaxisTag:string;
  xpoint: number;
  yscaleRange: [number, number];
  yscaleDomainData: number[];
  xscaleVisibleRange: [number, number];
  zoomstatus?: boolean;
}
export interface YScaleConfigItemType {
  yscaleTag: string;
  yaxisTag:string;
  xpoint: number;
  yscaleRange: [number, number];
  yscaleDomainData: number[];
  xscaleVisibleRange: [number, number];
  zoomstatus: boolean;
}

export interface yScaleConfigType {
  [key: string]: YScaleConfigItemType;
}

export interface PlotInfoInputType {
  plotStatus: boolean;
  plotName: string;
  xdataTag: keyof ChartDataType;
  ydataTag: keyof ChartDataType;
  xscaleTag: keyof xScaleConfigType;
  yscaleTag: keyof xScaleConfigType;
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

export interface PlotStatusByButtonTag {
  [key: string]: { plotStatus: boolean, plotName: string,buttonid:string };
}
