export declare class ti_buffer {
    size: number;
    pushes: number;
    index: number;
    sum: number;
    vals: number[];
    constructor(size: number);
    static new(size: number): ti_buffer;
    push(val: number): void;
    qpush(val: number): void;
    get(val: number): number;
}
