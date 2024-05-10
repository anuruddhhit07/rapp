interface ProxyHandler<T> {
    get(target: T, prop: string | number | symbol, receiver: any): any;
    set(target: T, prop: string | number | symbol, value: any, receiver: any): boolean;
    deleteProperty?(target: T, prop: string | number | symbol): boolean;
  }
  
export type ProxyCallback = (action: string, path: string, target: any, newValue?: any, previousValue?: any,data?:any) => void;
export function buildProxy<T extends Record<string, any>>(
    obj: T,
    callback: ProxyCallback,
    tree: (string | number)[] = []
  ): T {
    const getPath = (prop: string | number) => tree.concat(String(prop)).join(".");
  
    const handler: ProxyHandler<T> = {
      get(target, prop, receiver) {
        console.log("get",target,prop,receiver);
        if (prop === "__getTarget") {
          return () => target;
        }

        if (prop=='childrenNumer'){
            (target as any).updatechildrenNumer()
            // Reflect.set(target, prop, value, receiver)
            return Reflect.get(target, prop, receiver)
        }
  
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === "object" && value !== null) {
          return buildProxy(value, callback, tree.concat(String(prop)));
        }
  
        return value;
      },
  
      set(target, prop, value, receiver) {
        const oldValue = Reflect.get(target, prop, receiver);
        const result = Reflect.set(target, prop, value, receiver);
  
        // Trigger the callback only if the value actually changed
        if (value !== oldValue) {
          callback("set", getPath(prop as string|number), target, value, oldValue);
        }
  
        // Automatically update childrenNumer if children array is modified
        // console.log("target:",target,"prop:",prop,"tree:",tree);
        // console.log("chwd",target as any)
        // if (prop === "children" && Array.isArray(value)) {
        //     console.log((target as any).childrenNumer);
        //     // target.childrenNumer = value.length;
        //     callback("set", getPath("childrenNumer"), target, value.length, oldValue);
        //   }
  
        return result;
      },
  
      deleteProperty(target, prop) {
        const result = Reflect.deleteProperty(target, prop);
        callback("delete", getPath(prop as string|number), target);
        return result;
      },
    };
  
    return new Proxy(obj, handler);
  }
  