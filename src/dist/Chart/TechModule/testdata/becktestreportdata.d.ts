type backtestLineItem = {
    ID: number;
    index: number;
    buyorsell: "PatternBaseIndex" | "trigger" | "buy" | "sell" | "cancel_PatternBaseIndex" | "cancel_trigger";
    buyprice?: number;
    exitPrice?: number;
    pnl?: number;
    Comment?: string;
};
type backtestresult = {
    status: boolean;
    backtestLine: backtestLineItem[];
    backtestreport: string;
};
export declare function getbackestdata(index?: number): backtestresult;
export {};
