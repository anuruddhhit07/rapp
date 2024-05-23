import { ChartDataIN, OHLCV } from "../types";

// type backtestfinaloutput = {
//     query_output: any[];
//     common_output: {};
//     backtestresult: backtestresult ;
//   };

export let Shared_Allstockdata:ChartDataIN={
    histdata: [],
    techdata: {
      zigzagdatasub:  {
        sublist: [],
        brlist: []
      },
      indicatordata: {LineInd: [{crsi_avg: [],crsi: []}],signalline: []},
      darvasBoxList: '',
      btresult:  {
        status:true,
        backtestLine: [],
        backtestreport: ''
      }
    }
    // fundadata?: {
    //   profitLossData?: any;
    //   quartersData?: any;
    //   shareholdingData?: any;
    // };
}

export function updateChartData<T extends keyof ChartDataIN>(
    key: T,
    value: ChartDataIN[T],
    subKey?: string,
    subValue?: any
): void {
    if (subKey !== undefined) {
        if (Shared_Allstockdata[key] !== undefined && (Shared_Allstockdata[key] as any)[subKey] !== undefined) {
            ((Shared_Allstockdata[key] as any)[subKey] as any) = subValue;
        } else {
            (Shared_Allstockdata[key] as any) = {
                ...((Shared_Allstockdata[key] as any) || {}),
                [subKey]: subValue,
            };
        }
    } else {
        Shared_Allstockdata[key] = value;
    }
}



  
  

//   const initialData: ChartDataIN = {
//     histdata: [],
//     techdata: {
//         zigzagdatasub: {
//             sublist: [],
//             brlist: []
//         }
//     }
// };

//   const updatedData1 = updateChartData(initialData, 'histdata', [{ timestamp: 1, open: 10, high: 20, low: 5, close: 15, volume: 100 }]);
// console.log(updatedData1);

// const updatedData2 = updateChartData(initialData, 'techdata', undefined, 'zigzagdatasub', { sublist: [{ orgindex: 1, value: 20 }], brlist: [] });
// console.log(updatedData2);

// const updatedData3 = updateChartData(initialData, 'techdata', undefined);
// console.log(updatedData3);

// updateChartData('histdata', [{ timestamp: 1, open: 10, high: 20, low: 5, close: 15, volume: 100 }]);
// updateChartData('techdata', undefined, 'zigzagdatasub', { sublist: [{ orgindex: 1, value: 20 }], brlist: [] });
// updateChartData('techdata', undefined);
  