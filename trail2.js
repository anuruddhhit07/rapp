
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

  function buildProxy(poj, callback, tree = [],extra) {
    const getPath = (prop) => tree.concat(prop).join(".");
  
    return new Proxy(poj, {
      get(target, prop) {
        const value = Reflect.get(...arguments);
  
        if (
          value &&
          typeof value === "object" &&
          ["Array", "Object"].includes(value.constructor.name)
        )
          return buildProxy(value, callback, tree.concat(prop),extra);
  
        return value;
      },
  
      set(target, prop, value) {
        console.log("extra",extra)
        callback({
          action: "set",
          path: getPath(prop),
          target,
          newValue: value,
          previousValue: Reflect.get(...arguments),
          extra:extra,
        });
        return Reflect.set(...arguments);
      },
  
      deleteProperty(target, prop) {
        callback({ action: "delete", path: getPath(prop), target });
        return Reflect.deleteProperty(...arguments);
      },
    });
  }
  const callback = (action, path, target, newValue, previousValue,extra) => {
    console.log("plotdata",plotdata)
    console.log("extraaaa",extra)
    console.log(`Action: ${action}, Path: ${path}, New Value:`, newValue, 'Previous Value:', previousValue);
  };

const proxyplot=buildProxy(plotdata,callback,[],2)
// console.log(proxyplot)
proxyplot.ClosePlot.plotStatus=false
proxyplot.OpenPlot.xdata=[0,0]
console.log(plotdata)

// const trialobj = {
//   name: "David",
//   occupation: "freelancer",
//   children: [{ name: "oliver",status:false }, { name: "ruby",status:true }],
//   trigger:false,
//   childrenNumer: 0,
//   updatechildrenNumer: function () {
//     this.childrenNumer =this.children.filter(item=>item.status).length // Access children directly
//   },
// };

// // // Create a proxy using the buildProxy function
// const data = buildProxy(trialobj, callback);
// data.name = "Mike";
// data.children.push({ name: "baby" });
// console.log(data)