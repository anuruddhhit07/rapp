// type backtestfinaloutput = {
//     query_output: any[];
//     common_output: {};
//     backtestresult: backtestresult ;
//   };
export let Shared_Allstockdata = {
    histdata: [],
    techdata: {
        zigzagdatasub: {
            sublist: [],
            brlist: []
        },
        indicatordata: { LineInd: [{ crsi_avg: [], crsi: [] }], signalline: [] },
        darvasBoxList: '',
        btresult: {
            status: true,
            backtestLine: [],
            backtestreport: ''
        }
    }
    // fundadata?: {
    //   profitLossData?: any;
    //   quartersData?: any;
    //   shareholdingData?: any;
    // };
};
export function updateChartData(key, value, subKey, subValue) {
    if (subKey !== undefined) {
        if (Shared_Allstockdata[key] !== undefined && Shared_Allstockdata[key][subKey] !== undefined) {
            Shared_Allstockdata[key][subKey] = subValue;
        }
        else {
            Shared_Allstockdata[key] = Object.assign(Object.assign({}, (Shared_Allstockdata[key] || {})), { [subKey]: subValue });
        }
    }
    else {
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
