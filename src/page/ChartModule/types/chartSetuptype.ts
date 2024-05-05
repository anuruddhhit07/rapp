export interface ChartOptionsIn {
    targetID: string;
    stockid: string;
    liveupdatefunction: () => void;
    chartsettings?: {
     tooltipshow?: { status: boolean };
      mdbutton?: { status: boolean };
      fiibutton?: { status: boolean };
      opbutton?: { status: boolean };
      epsbutton?: { status: boolean };
      brlinebutton?: { status: boolean };
      crsibutton?: { status: boolean };
      adxbutton?: { status: boolean };
      atrbutton?: { status: boolean };
      emabutton?: { status: boolean };
      rsibutton?: { status: boolean };
      trendbutton?: { status: boolean };
      zigzagbutton?: { status: boolean };
      closebutton?: { status: boolean };
      cdbutton?: { status: boolean };
      volbutton?: { status: boolean };
      sigbutton?: { status: boolean };
      livebutton?: { status: boolean };
      toggleTrendLine?: { status: boolean };
      backgroundProp?: { color: string, opacity: number }
     buttonProps?: { color: string, opacity: number }
    };
  }

//   this.tooltipshow = true;
//     this.backtestreport = true;
//     this.backgroundProp = { color: "lightblue", opacity: 0.1 };
//     this.buttonProps = { color: "#90a7d5", opacity: 0.7 };
//     this.topyscalepadding = 1;
//     this.livebutton = false;
//     this.toggleTrendLine = false;

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

  export interface ChartOptions extends ChartOptionsIn {
    margin: Margin;
}

export interface ChartBaseSetupType {
  svgWidth: number;
  svgHeight: number;
  targetID: string;
  stockid: string;
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

export type PartialChartBaseSetupType = Partial<ChartBaseSetupType>;

export type CustomChartOptions = ChartOptionsIn & { [key: string]: never };