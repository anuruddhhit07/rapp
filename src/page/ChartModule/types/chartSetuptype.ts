export interface ChartOptionsIn {
    targetID: string;
    stockid: string;
    liveupdatefunction: () => void;
    chartsettings?: {
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
    };
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

  export interface ChartOptions extends ChartOptionsIn {
    margin: Margin;
}