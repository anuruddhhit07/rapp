import { ZigzaglineData,HistoryResponceData, BreakoutData,BreakoutData_ToBe_base,BreakdownData_ToBe_base } from "../types/type"

interface DataPoint {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  time: number;
  orgindex: number;
  zigind: string;
}

interface ZigData {
  gpoint: { index: number; ind: string }[];
}


interface BreakStrengthResult {
  [percentageRange: number]: { totalWeight: number; numAttempts: number };
}

interface GetLatestBreakout {
  latestbrindex: number;
  breakoutperiod: number;
  latestbreakobj: BreakoutData;
  laststockindex: number;
}

interface FullBRResult {
  FullBRDATA: BreakoutData[];
  latestbreakout: GetLatestBreakout;
  breakStrength: BreakStrengthResult; // Adjusted breakStrength (Assuming the correct function is used)
}

function filterByKeyValue<T>(array: T[], filterkey: keyof T, filterValue: string, includes: boolean = true): T[] {
  return array.filter((val) => {
    if (includes) {
      return (val[filterkey] as string).includes(filterValue);
    } else {
      return !(val[filterkey] as string).includes(filterValue);
    }
  });
}

function checkifkeyvalueinarrobj(array: BreakoutData[], key: keyof BreakoutData, value: number): boolean {
  return array.some((item) => item[key] === value);
}

class ZigProcessor {
  private static instance: ZigProcessor | null = null;
  private data: HistoryResponceData[] | null = null;
  private previouslow: number;
  private previoushigh: number;
  private previouspoint: string;
  private reqdnmove: number;
  private requpmove: number;
  private lasthighpoint: DataPoint;
  private lastlowpoint: DataPoint;
  private currentminind: number;
  private currentmaxind: number;
  private currentcdmin: number;
  private currentcdmax: number;
  private zigdata: ZigData;
  private upsidecount: number;
  private downsidecount: number;
  private permitmove: number;

  constructor() {
    this.previouslow = 0;
    this.previoushigh = 0;
    this.previouspoint = 'B';
    this.reqdnmove = 0;
    this.requpmove = 0;
    this.lasthighpoint = {} as DataPoint;
    this.lastlowpoint = {} as DataPoint;
    this.currentminind = 0;
    this.currentmaxind = 0;
    this.currentcdmin = 0;
    this.currentcdmax = 0;
    this.zigdata = { gpoint: [] };
    this.upsidecount = 1;
    this.downsidecount = 1;
    this.permitmove = 0.0001;
  }

  static getInstance(): ZigProcessor {
    if (!ZigProcessor.instance) {
      ZigProcessor.instance = new ZigProcessor();
    }
    return ZigProcessor.instance;
}

attachOHLCV(ohlcv: HistoryResponceData[]): void {
  this.data = ohlcv;
}


  private zdata(): DataPoint[] {
    let data=this.data
    const filterdata: DataPoint[] = [];
    

    if (data && data.length === 0) return filterdata;

    const S1 = 0;
    const E1 = 100;

    var rdata = JSON.parse(JSON.stringify(data)) as DataPoint[];

    const datatocal: DataPoint[] = [];
    for (let i = 0; i < rdata.length; i++) {
      var orgindex = S1 + i;
      rdata[i].orgindex = orgindex;
      datatocal.push(rdata[i]);
    }

    for (let index = 0; index < datatocal.length; index++) {
      var currentrow = datatocal[index];
      // var currhigh = currentrow.high;
      // var currlow = currentrow.low;

      if (index == 0) {
        this.zigdata.gpoint = [{ index: index, ind: 'B' }];
        this.previouslow = currentrow.low;
        this.previoushigh = currentrow.high;
        this.previouspoint = 'B';
        this.reqdnmove = datatocal[0].low - (datatocal[0].high - datatocal[0].low);
        this.requpmove = datatocal[0].high + (datatocal[0].high - datatocal[0].low);
        this.lasthighpoint = datatocal[0];
        this.lastlowpoint = datatocal[0];
        this.currentminind = datatocal[0].low;
        this.currentmaxind = datatocal[0].high;
        this.currentcdmin = datatocal[0].low;
        this.currentcdmax = datatocal[0].high;
      }

      if (index !== 0) {
        if (currentrow.high > this.currentcdmax && currentrow.low > this.currentcdmin) {
          this.currentcdmin = currentrow.low;
          this.currentcdmax = currentrow.high;
          this.up_move(index, currentrow, this.zigdata, datatocal, this.requpmove, this.lastlowpoint);
        } else if (currentrow.high < this.currentcdmax && currentrow.low < this.currentcdmin) {
          this.currentcdmin = currentrow.low;
          this.currentcdmax = currentrow.high;
          this.down_move(index, currentrow, this.zigdata, datatocal, this.reqdnmove, this.lasthighpoint);
        } else if (currentrow.high > this.currentcdmax && currentrow.low < this.currentcdmin) {
          if (this.previouspoint == 'HS') {
            this.currentcdmin = currentrow.low;
            this.currentcdmax = currentrow.high;
            this.up_move(index, currentrow, this.zigdata, datatocal, this.requpmove, this.lastlowpoint);
          }
          if (this.previouspoint == 'LS') {
            this.currentcdmin = currentrow.low;
            this.currentcdmax = currentrow.high;
            this.down_move(index, currentrow, this.zigdata, datatocal, this.reqdnmove, this.lasthighpoint);
          }
        }
      }
    }

    this.zigdata.gpoint.map((value, i) => {
      var fdata = datatocal[value.index];
      fdata.zigind = value.ind;
      fdata.orgindex = value.index;
      filterdata.push(fdata);
    });

    if (rdata.slice(-1)[0].timestamp > filterdata.slice(-1)[0].timestamp) {
      var fdata00: DataPoint = {
        timestamp: rdata.slice(-1)[0].timestamp,
        time: rdata.slice(-1)[0].time,
        zigind: 'E',
        orgindex: rdata.length,
        high: filterdata.slice(-1)[0].zigind == 'LS' ? filterdata.slice(-1)[0].low : filterdata.slice(-1)[0].high,
        low: filterdata.slice(-1)[0].low,
        open: filterdata.slice(-1)[0].open,
        close: filterdata.slice(-1)[0].close,
        volume: filterdata.slice(-1)[0].volume,
      };

      // var fdata0 = {};
      // fdata0.timestamp = rdata.slice(-1)[0].timestamp;
      // fdata0.zigind = 'E';
      // fdata0.orgindex = rdata.length;
      // fdata0.high = filterdata.slice(-1)[0].zigind == 'LS' ? filterdata.slice(-1)[0].low : filterdata.slice(-1)[0].high;
      filterdata.push(fdata00);
    }

    return filterdata;
  }

  private up_move(index: number, currentrow: DataPoint, zigdata: ZigData, datatocal: DataPoint[], requpmove: number, lastlowpoint: DataPoint): void {
    var cind = 1;

    if (zigdata.gpoint.length > 1) {
      var tempvar = zigdata.gpoint[zigdata.gpoint.length - 1]?.index || 0;
    } else {
      var tempvar = 0;
    }

    var slice_array = datatocal.slice(tempvar, index + 1);
    let currentax = Math.max(...slice_array.map((item) => item.high));

    if (this.upsidecount >= 2 || this.previouspoint == 'HS') {
      if (currentrow.high > requpmove && currentrow.high >= currentax) {
        if (zigdata.gpoint.at(-1)?.ind == 'HS') {
          var lastItem = zigdata.gpoint.pop();
        }

        if (this.previouspoint == 'HS') {
          this.downsidecount = 1;
        }

        this.upsidecount = 1;
        this.previouspoint = 'HS';
        zigdata.gpoint = [...zigdata.gpoint, { index: index, ind: 'HS' }];
        this.get_newmove(lastlowpoint, index, datatocal, cind);
        this.lasthighpoint = datatocal[index];
        this.currentmaxind = currentrow.high;
      }
    } else if (currentrow.high >= currentax) {
      this.upsidecount = this.upsidecount + 1;
      this.currentmaxind = currentrow.high;
    }
  }

  private down_move(index: number, currentrow: DataPoint, zigdata: ZigData, datatocal: DataPoint[], reqdnmove: number, lasthighpoint: DataPoint) {
    var cind = -1;

    if (zigdata.gpoint.length > 1) {
      var tempvar = zigdata.gpoint[zigdata.gpoint.length - 1]?.index || 0;
    } else {
      var tempvar = 0;
    }

    var slice_array = datatocal.slice(tempvar, index + 1);
    let currentmin = Math.min(...slice_array.map((item) => item.low));

    if (this.downsidecount >= 2 || this.previouspoint == 'LS') {
      if (currentrow.low < reqdnmove && currentrow.low < datatocal[tempvar].low) {
        if (zigdata.gpoint[zigdata.gpoint.length - 1]?.ind == 'LS') {
          var lastItem = zigdata.gpoint.pop();
        }

        if (this.previouspoint == 'LS') {
          this.upsidecount = 1;
        }

        this.downsidecount = 1;
        this.previouspoint = 'LS';
        zigdata.gpoint = [...zigdata.gpoint, { index: index, ind: 'LS' }];

        this.get_newmove(lasthighpoint, index, datatocal, cind);
        this.lastlowpoint = datatocal[index];
        this.currentminind = currentrow.low;
      }
    } else if (currentrow.low <= currentmin) {
      this.downsidecount = this.downsidecount + 1;
      this.currentminind = currentrow.low;
    }
  }

  private get_newmove(lastpoint: DataPoint, CurrentPindex: number, datatocal: DataPoint[], cind: number): void {
    var pre_P = cind == -1 ? lastpoint.high : lastpoint.low;
    var cur_P = cind == -1 ? datatocal[CurrentPindex].low : datatocal[CurrentPindex].high;

    var totelmove = Math.abs(pre_P - cur_P);

    if (cind == -1) {
      this.requpmove = cur_P + totelmove * this.permitmove;
    }

    if (cind == 1) {
      this.reqdnmove = cur_P - totelmove * this.permitmove;
    }
  }

  private calculateEffortMetric(
    stockData: HistoryResponceData[],
    breakoutPrice: number,
    percentageRange: number,
    startDate: number,
    endTime: number
  ): { totalWeight: number; numAttempts: number } {
    let totalWeightedEffort = 0;
    let numAttempts = 0;
    let totalWeight = 0;

    const priceUpperRange = breakoutPrice + (percentageRange / 100) * breakoutPrice;
    const priceLowerRange = breakoutPrice - (percentageRange / 100) * breakoutPrice;

    for (const point of stockData) {
      const timestamp = point.timestamp;

      if (point.high <= priceUpperRange && point.high >= priceLowerRange) {
        numAttempts++;

        var distanceWeight = 0;

        if (point.high >= breakoutPrice && point.close > breakoutPrice) {
          distanceWeight = 1;
        } else if (point.high >= breakoutPrice && point.close <= breakoutPrice) {
          distanceWeight = 1;
        } else {
          distanceWeight = (point.high - priceLowerRange) / (breakoutPrice - priceLowerRange);
        }

        const timeWeight = 1 - (endTime - timestamp) / (endTime - startDate);
        const weight = distanceWeight * timeWeight;

        totalWeight += weight;
      } else if (point.high > priceUpperRange) {
        totalWeight = 0;
        break;
      }
    }

    return { totalWeight, numAttempts };
  }

  private getbreakouttrength({ breakoutdetails, stockdata }: { breakoutdetails: GetLatestBreakout; stockdata: HistoryResponceData[] }): BreakStrengthResult {
    const startTime = breakoutdetails.latestbreakobj.broutfor;
    const endTime = breakoutdetails.latestbreakobj.broutat;
    const breakoutPrice = breakoutdetails.latestbreakobj.highatref;
    const percentageRangelist = [0.2, 0.5, 1, 3, 5, 8, 10];

    const breakStrength: BreakStrengthResult = {};

    const filteredData = stockdata.filter((dataPoint) => {
      const timestamp = dataPoint.timestamp; // Assuming the timestamp is stored in the 'time' property
      // console.log(timestamp,startTime,endTime);
      return timestamp > startTime && timestamp < endTime;
    });

    percentageRangelist.forEach((percentageRange) => {
      const breakstrength = this.calculateEffortMetric(filteredData, breakoutPrice, percentageRange, startTime, endTime);
      breakStrength[percentageRange] = breakstrength;
    });

    return breakStrength;
  }

  private getbreakout({
    stockdata,
    zigdata,
    refpoint,
    lowpointfilter,
    getlatestbreakout,
  }: {
    stockdata: HistoryResponceData[];
    zigdata: any; // Replace 'any' with the actual type of zigdata
    refpoint: number;
    lowpointfilter: number[];
    getlatestbreakout: GetLatestBreakout;
  }): BreakoutData {
    var startpoint = lowpointfilter.find((element) => element > refpoint);
    var refvalue = stockdata[refpoint].high;
    let rejCdindex: number=NaN ;

    var CANDLE_BROUT: BreakoutData = {
      broutfor: NaN,
      broutat: NaN,
      rejectat: NaN,
      brekoutcandleago: NaN,
      breakoutperiod: NaN,
      breakoutpercentage: NaN,
      highatref: NaN,
      highatrejec: NaN,
      highatbr: NaN,
      closeatbr: NaN
    };

    for (let i = startpoint!; i < stockdata.length; i++) {
      const high = stockdata[i].high;
      const close = stockdata[i].close;

      if (high > refvalue && close < refvalue) {
        refvalue = high;
        rejCdindex = i;
      }

      if (close > refvalue) {
        let validhighvalue = isNaN(rejCdindex) ? stockdata[refpoint].high : stockdata[rejCdindex].high;

        CANDLE_BROUT = {
          broutfor: refpoint,
          broutat: i,
          rejectat: isNaN(rejCdindex) ? refpoint : rejCdindex,
          brekoutcandleago: getlatestbreakout.laststockindex + 1 - i,
          highatref: stockdata[refpoint].high,
          highatrejec: validhighvalue,
          highatbr: high,
          closeatbr: close,
          breakoutperiod: i - refpoint,
          breakoutpercentage: ((close - validhighvalue) / validhighvalue) * 100,
        };

        if (i > getlatestbreakout.latestbrindex) {
          getlatestbreakout.latestbrindex = i;
          getlatestbreakout.breakoutperiod = i - refpoint;

          getlatestbreakout.latestbreakobj = {
            broutfor: stockdata[refpoint].timestamp,
            broutat: stockdata[i].timestamp,
            rejectat:isNaN(rejCdindex) ? stockdata[refpoint].timestamp : stockdata[rejCdindex].timestamp,
            brekoutcandleago: getlatestbreakout.laststockindex + 1 - i,
            highatref: stockdata[refpoint].high,
            highatrejec: validhighvalue,
            highatbr: high,
            closeatbr: close,
            breakoutperiod: i - refpoint,
            breakoutpercentage: ((close - validhighvalue) / validhighvalue) * 100,
          };
        } else if (i === getlatestbreakout.latestbrindex) {
          if (i - refpoint > getlatestbreakout.breakoutperiod!) {
            getlatestbreakout.breakoutperiod = i - refpoint;
            getlatestbreakout.latestbreakobj = {
              broutfor: stockdata[refpoint].timestamp,
              broutat: stockdata[i].timestamp,
              rejectat: isNaN(rejCdindex) ? stockdata[refpoint].timestamp : stockdata[rejCdindex].timestamp,
              brekoutcandleago: getlatestbreakout.laststockindex + 1 - i,
              highatref: stockdata[refpoint].high,
              highatrejec: validhighvalue,
              highatbr: high,
              closeatbr: close,
              breakoutperiod: i - refpoint,
              breakoutpercentage: ((close - validhighvalue) / validhighvalue) * 100,
            };
          }
        }

        return CANDLE_BROUT;
      }
    }

    return CANDLE_BROUT;
  }

  private fullbrtable({ stockdata, zigdata }: { stockdata: HistoryResponceData[]; zigdata: ZigzaglineData[] }): FullBRResult {
    const highpointfilter = filterByKeyValue(zigdata, 'zigind', 'HS', true).map((item) => item.orgindex);
    const lowpointfilter = filterByKeyValue(zigdata, 'zigind', 'LS', true).map((item) => item.orgindex);

    const FullBRDATA: BreakoutData[] = [];
    const getlatestbreakout: GetLatestBreakout = {
      latestbrindex: -1,
      breakoutperiod: 0,
      latestbreakobj: {
        broutfor: NaN,
        broutat: NaN,
        rejectat: NaN,
        brekoutcandleago: NaN,
        highatref: NaN,
        highatrejec: NaN,
        highatbr: NaN,
        closeatbr: NaN,
        breakoutperiod: NaN,
        breakoutpercentage: NaN,
      },
      laststockindex: stockdata.length - 1,
    };

    for (let i = 0; i < highpointfilter.length; i++) {
      const refpoint = highpointfilter[i];
      const ifreject = checkifkeyvalueinarrobj(FullBRDATA, 'rejectat', refpoint);

      if (!ifreject) {
        const CANDLE_BROUT = this.getbreakout({
          stockdata,
          zigdata,
          refpoint,
          lowpointfilter,
          getlatestbreakout,
        });

        if (CANDLE_BROUT) FullBRDATA.push(CANDLE_BROUT);
      }
    }
    const ind_break = false;
    var breakStrength = {};
    if (ind_break) {
      breakStrength = this.getbreakouttrength({ breakoutdetails: getlatestbreakout, stockdata });
    }
    
    return { FullBRDATA, latestbreakout: getlatestbreakout, breakStrength };
  }
  private nearbrtable({ stockdata, zigdata }: { stockdata: HistoryResponceData[]; zigdata: ZigzaglineData[] }): BreakoutData_ToBe_base {
    let getneartobreakout: BreakoutData_ToBe_base;

    let lastElement = zigdata[zigdata.length - 1];

    if (lastElement.zigind == 'HS') {
      zigdata.splice(-1);
    }

    var lastcd = stockdata.slice(-1);
    var highpointfilter = filterByKeyValue(zigdata, 'zigind', 'HS', true).map((item) => item.orgindex);
    var lastclose = lastcd[0].close;
    var timestamp = lastcd[0].timestamp;

    var validindex = highpointfilter.filter((item) => stockdata[item].high > lastclose).slice(-1);

    if (validindex.length > 0) {
      var pricepoint1 = validindex[0];
      var pricetobebreak = stockdata[pricepoint1].high;
      var laginprct0 = ((pricetobebreak - lastclose) / pricetobebreak) * 100;
      var laginprct = Math.round(laginprct0 * 1000) / 1000;
      var candeldistance = stockdata.length - 1 - pricepoint1;

      getneartobreakout = {
        pricetobebreak,
        lastclose,
        laginprct,
        candeldistance,
        tobebreakcandelid: pricepoint1,
        timestamp,
      };
    } else {
      getneartobreakout = {
        pricetobebreak: -1,
        lastclose: -1,
        laginprct: -1,
        candeldistance: -1,
        tobebreakcandelid: -1,
        timestamp,
      };
    }

    return getneartobreakout;
  }
  private nearbreakdown({ stockdata, zigdata }: { stockdata: HistoryResponceData[]; zigdata: ZigzaglineData[] }): BreakdownData_ToBe_base {
    var lastcd = stockdata.slice(-1);
    var lastclose = lastcd[0].close;
    var timestamp = lastcd[0].timestamp;

    let getneartobreakdown: BreakdownData_ToBe_base;

    let lastElement = zigdata[zigdata.length - 1];

    if (lastElement.zigind == 'LS') {
      zigdata.splice(-1);
    }

    var lowpointfilter = filterByKeyValue(zigdata, 'zigind', 'LS', true).map((item) => item.orgindex);
    var validindex = lowpointfilter.filter((item) => stockdata[item].low < lastclose).slice(-1);

    if (validindex.length > 0) {
      var pricepoint1 = validindex[0];
      var pricetobebreakdown = stockdata[pricepoint1].low;
      var laginprct0 = ((lastclose - pricetobebreakdown) / pricetobebreakdown) * 100;
      var laginprct = Math.round(laginprct0 * 1000) / 1000;
      var candeldistance = stockdata.length - 1 - pricepoint1;

      getneartobreakdown = {
        pricetobebreakdown,
        lastclose,
        laginprct,
        candeldistance,
        tobebreakcandelid: pricepoint1,
        timestamp,
      };
    } else {
      getneartobreakdown = {
        pricetobebreakdown: -1,
        lastclose: -1,
        laginprct: -1,
        candeldistance: -1,
        tobebreakcandelid: -1,
        timestamp,
      };
    }

    return getneartobreakdown;
  }

  zseries(): {
    sublist: ZigzaglineData[];
    brlist: BreakoutData[];
    lastbreakout: GetLatestBreakout;
    tobebreakdata: BreakoutData_ToBe_base;
    tobebreakdowndata: BreakdownData_ToBe_base;
    breakStrenth: BreakStrengthResult;
    Tr_patternMark: number;
} {
    let data=this.data
    const rawzdata: DataPoint[] = this.zdata();

    let sublist: ZigzaglineData[] = rawzdata.map(({ time, zigind, low, high, orgindex }) => {
      return { time: time, orgindex: orgindex, value: zigind == 'LS' ? low : high, zigind: zigind, zigType: '' };
    });

    // Assuming 'sublist' is your array
    for (let i = 2; i < sublist.length-1; i++) {
      const currentValue = sublist[i].value;
      const prevHigh = Math.max(sublist[i - 1].value, sublist[i - 2].value);
      const prevLow = Math.min(sublist[i - 1].value, sublist[i - 2].value);

      // if (i==sublist.length - 1) {
      //   sublist[i].zigType = '';
      // }
      if (currentValue > prevHigh) {
        sublist[i].zigType = 'HH';
      } else if (currentValue < prevLow) {
        sublist[i].zigType = 'LL';
      } else {
        // currentValue is between prevHigh and prevLow
        // Assuming your first point is higher and the second point is lower
        if (currentValue > sublist[i - 1].value) {
          sublist[i].zigType = 'LH';
        } else {
          sublist[i].zigType = 'HL';
        }
      }
    }

    // Assuming 'sublist' is your array
    const latestIndex = sublist.length - 1;
    var Tr_patternMark = 0;
    // Check if there are at least 4 data points
    if (latestIndex >= 6) {
      const lastFourZigTypes = [
        // sublist[latestIndex].zigType,
        // sublist[latestIndex - 6].zigType,
        sublist[latestIndex - 5].zigType,
        sublist[latestIndex - 4].zigType,
        sublist[latestIndex - 3].zigType,
        sublist[latestIndex - 2].zigType,
        sublist[latestIndex - 1].zigType,
      ];

      // console.log('lastFourZigTypes', lastFourZigTypes);
      // Convert the last four zigTypes to a string for pattern matching
      const pattern = lastFourZigTypes.join('-');
      // console.log(pattern);

      // Check for the specified patterns and assign markers
      // Check for the specified patterns and assign markers
      if (pattern === 'HL-LH-HL-LH-HL') {
        const h0 = sublist[latestIndex - 2].value;
        const h1 = sublist[latestIndex - 4].value;
        // console.log(Math.abs(h0-h1)/h0);
        if ((Math.abs(h0 - h1) / h0) * 100 < 1) {
          Tr_patternMark = 1;
        }
      } else if (pattern === 'HL-HH-HL-HH-HL') {
        const h0 = sublist[latestIndex - 2].value;
        const h1 = sublist[latestIndex - 4].value;
        // console.log(Math.abs(h0-h1)/h0);
        if ((Math.abs(h0 - h1) / h0) * 100 < 1) {
          Tr_patternMark = 1;
        }
      } else if (pattern === 'LH-HL-HH-HL-HH') {
        const h0 = sublist[latestIndex - 1].value;
        const h1 = sublist[latestIndex - 3].value;
        // console.log(Math.abs(h0-h1)/h0);
        if ((Math.abs(h0 - h1) / h0) * 100 < 1) {
          Tr_patternMark = 1;
        }
      }

      // if (pattern === 'LH-LL-LH-LL') {
      //   Tr_patternMark = 1;
      // } else if (pattern === 'HH-LL-LH-HL') {
      //   Tr_patternMark = 2;
      // } else if (pattern === 'HH-LL-LH-LL') {
      //   Tr_patternMark = 3;
      // } else if (pattern === 'HL-LH-LL-LH') {
      //   Tr_patternMark = 4;
      // } else if (pattern === 'HH-LH-LL-HL') {
      //   Tr_patternMark = 5;
      // } else if (pattern === 'LL-LH-HL-HH') {
      //   Tr_patternMark = 6;
      // } else if (pattern === 'LH-HH-LL-LH') {
      //   Tr_patternMark = 7;
      // } else if (pattern === 'HL-LH-LL-HH') {
      //   Tr_patternMark = 8;
      // }
    }

    // console.log('Tr_patternMark', Tr_patternMark);

    const brtable = this.fullbrtable({ stockdata: data as HistoryResponceData[], zigdata: [...sublist] });
    const tobebreakdata = this.nearbrtable({ stockdata: data as HistoryResponceData[], zigdata: [...sublist] });
    const tobebreakdowndata = this.nearbreakdown({ stockdata: data as HistoryResponceData[], zigdata: [...sublist] });

    return {
      sublist: sublist,
      brlist: brtable.FullBRDATA,
      lastbreakout: brtable.latestbreakout,
      tobebreakdata: tobebreakdata,
      tobebreakdowndata: tobebreakdowndata,
      breakStrenth: brtable.breakStrength,
      Tr_patternMark: Tr_patternMark,
    };
  }
}
export default ZigProcessor;
