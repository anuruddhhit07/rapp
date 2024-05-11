const plotdata={
    ClosePlot: {
      plotStatus: true,
      plotName: 'ClosePlot',
      xdata: [ 0, 1, 2, 5, 6 ],
      ydata: [ 11, 12, 13, 65, 34 ],
      xscaleTag: 'bot',
      yscaleTag: 'TL',
      plotType: 'line',
      plotcolor: 'red'
    },
    OpenPlot: {
      plotStatus: false,
      plotName: 'OpenPlot',
      xdata: [ 0, 1, 2, 5, 6 ],
      ydata: [ 5, 8, 1, 3, 7 ],
      xscaleTag: 'bot',
      yscaleTag: 'TR',
      plotType: 'line',
      plotcolor: 'black'
    }
  }
  const xscale={
    bot: {
      xscaleTag: 'bot',
      ypoint: 100,
      xscaleRange: [ 0, 100 ],
      xscaleDomainData: [ 0, 1, 2, 3, 4 ],
      zoomstatus: true
    },
    top: {
      xscaleTag: 'top',
      ypoint: 20,
      xscaleRange: [ 0, 100 ],
      xscaleDomainData: [ 0, 1, 2, 3, 4 ],
      zoomstatus: false
    }
  }
  const yscale={
    TL: {
      yscaleTag: 'TL',
      xpoint: 100,
      yscaleRange: [ 0, 100 ],
      yscaleDomainData: [ 0, 1, 2, 3, 4 ],
      xscaleVisibleRange: [ 0, 5 ],
      zoomstatus: false
    },
    TR: {
      yscaleTag: 'TR',
      xpoint: 20,
      yscaleRange: [ 0, 100 ],
      yscaleDomainData: [ 0, 1, 2, 3, 4 ],
      xscaleVisibleRange: [ 0, 5 ],
      zoomstatus: false
    }
  }

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
//   if (Object.keys(rootProxy).length>0){
//       rootProxy.setcurrentcity()
//   }
  // rootProxy.setcurrentcity()
}

const proxyplot=createNestedProxy(plotdata,handleUpdate,plotdata)
// console.log(proxyplot)
proxyplot.ClosePlot=false
console.log(plotdata)