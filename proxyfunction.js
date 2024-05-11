export function createNestedProxy(obj, updateCallback, rootProxy) {
    const proxy = new Proxy(obj, {
      set(target, key, value) {
          // console.log("rootProxy",rootProxy)
          // If the value is an object, create a proxy for it recursively
          if (typeof value === 'object' && value !== null) {
              target[key] = createNestedProxy(value, updateCallback, rootProxy);
          } else {
              target[key] = value;
          }
          // Call the update callback whenever a property is set
          updateCallback(rootProxy, proxy);
          return true;
      }
  });
  return proxy;
}