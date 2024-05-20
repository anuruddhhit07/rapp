
import { IndicatorsNormalizedSync } from "./@ixjb94/indicators/dist";
let ta = new IndicatorsNormalizedSync()
var data = [5, 6, 6, 3, 4, 6, 7];
var length =2; // default = 25
const smaa=ta.sma(data, length);
console.log(smaa);
export const taa=2
// console.log(taa);
// export {window.ta}