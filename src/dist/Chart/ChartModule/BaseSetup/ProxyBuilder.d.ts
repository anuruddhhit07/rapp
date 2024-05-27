export type ProxyCallback = (action: string, path: string, target: any, newValue?: any, previousValue?: any, parentobj?: any) => void;
export declare function buildProxy<T extends Record<string, any>, ParentObject extends Record<string, any>>(obj: T, callback: ProxyCallback, tree: (string | number)[] | undefined, parentobj: ParentObject): T;
