// Function to recursively create proxies for nested objects
function createNestedProxy(obj, updateCallback, rootProxy) {
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

// Function to handle updates
function handleUpdate(rootProxy, proxy) {
    console.log('Root proxy:', rootProxy);
    console.log('Child proxy:', proxy);
    if (Object.keys(rootProxy).length>0){
        rootProxy.setcurrentcity()
    }
    // rootProxy.setcurrentcity()
}

// Define the original nested object
const nestedObj = {
    person: {
        name: 'Alice',
        age: 30,
        address: {
            city: 'New York',
            country: 'USA'
        }
    },
    currentcity:"",
    setcurrentcity: function(){
        this.currentcity=this.person.address.city
    }
};

const childob=nestedObj.person.address
// let proxyNestedObj={}

// Create a nested proxy for the original object
// const rootNestedObj = createNestedProxy(nestedObj, handleUpdate,{})
const proxyNestedObj = createNestedProxy(childob, handleUpdate,nestedObj);

// Now, any change to proxyNestedObj will automatically trigger the update callback
nestedObj.person.name = 'Bob';
proxyNestedObj.city = 'Los Angeles1';

// console.log(proxyNestedObj)
console.log(nestedObj)
