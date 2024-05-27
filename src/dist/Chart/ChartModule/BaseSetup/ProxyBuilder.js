export function buildProxy(obj, callback, tree = [], parentobj) {
    const getPath = (prop) => tree.concat(String(prop)).join(".");
    const handler = {
        get(target, prop, receiver) {
            // console.log("get",target,prop,receiver);
            if (prop === "__getTarget") {
                return () => target;
            }
            // if (prop=='childrenNumer'){
            //     (target as any).updatechildrenNumer()
            //     // Reflect.set(target, prop, value, receiver)
            //     return Reflect.get(target, prop, receiver)
            // }
            const value = Reflect.get(target, prop, receiver);
            if (typeof value === "object" && value !== null) {
                return buildProxy(value, callback, tree.concat(String(prop)), parentobj);
            }
            return value;
        },
        set(target, prop, value, receiver) {
            const oldValue = Reflect.get(target, prop, receiver);
            const result = Reflect.set(target, prop, value, receiver);
            // Trigger the callback only if the value actually changed
            if (value !== oldValue) {
                // console.log("result",result)
                callback("set", getPath(prop), target, value, oldValue, parentobj);
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
            callback("delete", getPath(prop), target);
            return result;
        },
    };
    return new Proxy(obj, handler);
}
