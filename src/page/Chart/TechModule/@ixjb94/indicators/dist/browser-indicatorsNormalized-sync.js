!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.indicators=e():t.indicators=e()}(self,(()=>(()=>{"use strict";var t={409:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.ti_buffer=void 0;class s{constructor(t){this.size=t,this.pushes=0,this.index=0,this.sum=0,this.vals=[]}static new(t){return new s(t)}push(t){this.pushes>=this.size&&(this.sum-=this.vals[this.index]),this.sum+=t,this.vals[this.index]=t,this.pushes+=1,this.index=(this.index+1)%this.size}qpush(t){this.vals[this.index]=t,this.index=(this.index+1)%this.size}get(t){return this.vals[(this.index+this.size-1+t)%this.size]}}e.ti_buffer=s}},e={};function s(n){var l=e[n];if(void 0!==l)return l.exports;var r=e[n]={exports:{}};return t[n](r,r.exports,s),r.exports}var n={};return(()=>{var t=n;Object.defineProperty(t,"__esModule",{value:!0}),t.IndicatorsNormalizedSync=void 0;const e=s(409);t.IndicatorsNormalizedSync=class{constructor(){}normalize(t,e,s=NaN){const n=t-e.length,l=[];for(let t=0;t<n;++t)l.push(s);return[...l,...e]}floor(t){return t<0?~~t-1:~~t}sqrt(t,e=t/2){const s=(e+t/e)/2;return(e>s?e-s:s-e)<1e-7?s:this.sqrt(t,s)}ad(t,e,s,n,l=s.length){const r=[];let o=0;for(let h=0;h<l;++h){const l=t[h]-e[h];0!=l&&(o+=(s[h]-e[h]-t[h]+s[h])/l*n[h]),r[h]=o}return r}adosc(t,e,s,n,l,r,o=s.length){const h=r-1,u=2/(l+1),a=2/(r+1),i=[];i[r-2]=NaN;let c=0,p=0,f=0;for(let l=0;l<o;++l){const r=t[l]-e[l];0!=r&&(c+=(s[l]-e[l]-t[l]+s[l])/r*n[l]),0==l?(p=c,f=c):(p=(c-p)*u+p,f=(c-f)*a+f),l>=h&&i.push(p-f)}return i}adx(t,e,s,n=t.length){const l=[];l[2*(s-2)+1]=NaN;const r=(s-1)/s,o=1/s;let h=0,u=0;for(let n=1;n<s;++n){let s=t[n]-t[n-1],l=e[n-1]-e[n];s<0?s=0:s>l&&(l=0),l<0?l=0:l>s&&(s=0),h+=s,u+=l}let a=0,i=h,c=u,p=Math.abs(i-c),f=i+c,N=p/f*100;a+=N;for(let d=s;d<n;++d){let n=t[d]-t[d-1],x=e[d-1]-e[d];n<0?n=0:n>x&&(x=0),x<0?x=0:x>n&&(n=0),h=h*r+n,u=u*r+x,i=h,c=u,p=Math.abs(i-c),f=i+c,N=p/f*100,d-s<s-2?a+=N:d-s==s-2?(a+=N,l.push(a*o)):(a=a*r+N,l.push(a*o))}return l}adxr(t,e,s,n=t.length){const l=[];l[3*(s-1)-1]=NaN;const r=(s-1)/s,o=1/s;let h=0,u=0;for(let n=1;n<s;++n){let s=t[n]-t[n-1],l=e[n-1]-e[n];s<0?s=0:s>l&&(l=0),l<0?l=0:l>s&&(s=0),h+=s,u+=l}let a=0,i=h,c=u,p=Math.abs(i-c),f=i+c,N=p/f*100;a+=N;const d={size:s-1,pushes:0,index:0,vals:[]},x=3*(s-1);for(let g=s;g<n;++g){let n=t[g]-t[g-1],m=e[g-1]-e[g];if(n<0?n=0:n>m&&(m=0),m<0?m=0:m>n&&(n=0),h=h*r+n,u=u*r+m,i=h,c=u,p=Math.abs(i-c),f=i+c,N=p/f*100,g-s<s-2)a+=N;else if(g-s==s-2)a+=N,d.vals[d.index]=a*o,d.index=d.index+1,d.index>=d.size&&(d.index=0);else{if(a=a*r+N,g>=x){const t=d.vals[d.index]+(d.size-1+1)%d.size;l.push(.5*(a*o+t))}d.vals[d.index]=a*o,d.index=d.index+1,d.index>=d.size&&(d.index=0)}}return l}ao(t,e,s=t.length){const n=[];n[32]=NaN;let l=0,r=0;const o=1/34;for(let s=0;s<34;++s){const n=.5*(t[s]+e[s]);l+=n,s>=29&&(r+=n)}n.push(.2*r-o*l);for(let h=34;h<s;++h){const s=.5*(t[h]+e[h]);l+=s,r+=s,l-=.5*(t[h-34]+e[h-34]),r-=.5*(t[h-5]+e[h-5]),n.push(.2*r-o*l)}return n}apo(t,e,s,n=t.length){const l=[];l[0]=NaN;const r=2/(e+1),o=2/(s+1);let h=t[0],u=t[0];for(let e=1;e<n;++e){h=(t[e]-h)*r+h,u=(t[e]-u)*o+u;const s=h-u;l.push(s)}return l}aroon(t,e,s,n=t.length){const l=[],r=[];l[s-1]=NaN,r[s-1]=NaN;const o=100/s;let h,u,a=0,i=-1,c=-1,p=t[0],f=e[0];for(let N=s;N<n;++N,++a){if(h=t[N],i<a)for(i=a,p=t[i],u=a;++u<=N;)h=t[u],h>=p&&(p=h,i=u);else h>=p&&(i=N,p=h);if(h=e[N],c<a)for(c=a,f=e[c],u=a;++u<=N;)h=e[u],h<=f&&(f=h,c=u);else h<=f&&(c=N,f=h);l[l.length]=(s-(N-c))*o,r[r.length]=(s-(N-i))*o}return[l,r]}aroonosc(t,e,s,n=t.length){const l=[];l[s-1]=NaN;const r=100/s;let o,h=0,u=-1,a=-1,i=t[0],c=e[0];for(let p=s;p<n;++p,++h){let s=t[p];if(u<h)for(u=h,i=t[u],o=h;++o<=p;)s=t[o],s>=i&&(i=s,u=o);else s>=i&&(u=p,i=s);if(s=e[p],a<h)for(a=h,c=e[a],o=h;++o<=p;)s=e[o],s<=c&&(c=s,a=o);else s<=c&&(a=p,c=s);l.push((u-a)*r)}return l}atr(t,e,s,n,l=t.length){const r=[];r[n-2]=NaN;const o=1/n;let h,u=0;u+=t[0]-e[0];for(let l=1;l<n;++l){const n=e[l],r=t[l],o=s[l-1],a=Math.abs(r-o),i=Math.abs(n-o);let c=r-n;a>c&&(c=a),i>c&&(c=i),h=c,u+=h}let a=u/n;r.push(a);for(let u=n;u<l;++u){const n=e[u],l=t[u],i=s[u-1],c=Math.abs(l-i),p=Math.abs(n-i);let f=l-n;c>f&&(f=c),p>f&&(f=p),h=f,a=(h-a)*o+a,r.push(a)}return r}avgprice(t,e,s,n,l=t.length){const r=[];for(let o=0;o<l;++o)r.push(.25*(t[o]+e[o]+s[o]+n[o]));return r}bbands(t,e,s,n=t.length){const l=[],r=[],o=[];l[e-2]=NaN,r[e-2]=NaN,o[e-2]=NaN;const h=1/e;let u=0,a=0;for(let s=0;s<e;++s)u+=t[s],a+=t[s]*t[s];let i=Math.sqrt(a*h-u*h*(u*h));const c=u*h;l.push(c-s*i),o.push(c+s*i),r.push(c);for(let c=e;c<n;++c){u+=t[c],a+=t[c]*t[c],u-=t[c-e],a-=t[c-e]*t[c-e],i=Math.sqrt(a*h-u*h*(u*h));const n=u*h;o.push(n+s*i),l.push(n-s*i),r.push(n)}return[l,r,o]}bop(t,e,s,n,l=t.length){const r=[];for(let o=0;o<l;++o){const l=e[o]-s[o];r[o]=l<=0?0:(n[o]-t[o])/l}return r}cci(t,s,n,l,r=t.length){const o=1/l,h=[];h[2*(l-2)+1]=NaN;const u=new e.ti_buffer(l);let a,i;for(a=0;a<r;++a){const e=(t[a]+s[a]+n[a])*(1/3);u.push(e);const r=u.sum*o;if(a>=2*l-2){let t=0;for(i=0;i<l;++i)t+=Math.abs(r-u.vals[i]);let s=t*o;s*=.015,s=(e-r)/s,h.push(s)}}return h}cmo(t,e,s=t.length){const n=[];n[e-1]=NaN;let l=0,r=0;for(let s=1;s<=e;++s)l+=t[s]>t[s-1]?t[s]-t[s-1]:0,r+=t[s]<t[s-1]?t[s-1]-t[s]:0;n.push(100*(l-r)/(l+r));for(let o=e+1;o<s;++o)l-=t[o-e]>t[o-e-1]?t[o-e]-t[o-e-1]:0,r-=t[o-e]<t[o-e-1]?t[o-e-1]-t[o-e]:0,l+=t[o]>t[o-1]?t[o]-t[o-1]:0,r+=t[o]<t[o-1]?t[o-1]-t[o]:0,n.push(100*(l-r)/(l+r));return n}crossany(t,e,s=t.length){const n=[];for(let l=0;l<s;++l)n.push(t[l]>e[l]&&t[l-1]<=e[l-1]||t[l]<e[l]&&t[l-1]>=e[l-1]);return n}crossover(t,e,s=t.length){const n=[];for(let l=0;l<s;++l)n.push(t[l]>e[l]&&t[l-1]<=e[l-1]);return n}crossOverNumber(t,e){const s=[];for(let n=0;n<t.length;n++){const l=t[n],r=t[n-1];l>e&&r<=e?s.push(!0):s.push(!1)}return s}crossUnderNumber(t,e){const s=[];for(let n=0;n<t.length;n++){const l=t[n],r=t[n-1];l<e&&r>=e?s.push(!0):s.push(!1)}return s}cvi(t,s,n,l=t.length){const r=[];r[2*(n-1)]=NaN;const o=2/(n+1),h=new e.ti_buffer(n);let u,a=t[0]-s[0];for(u=1;u<2*n-1;++u)a=(t[u]-s[u]-a)*o+a,h.qpush(a);for(u=2*n-1;u<l;++u){a=(t[u]-s[u]-a)*o+a;const e=h.vals[h.index];r.push(100*(a-e)/e),h.qpush(a)}return r}decay(t,e,s=t.length){const n=[],l=1/e;n.push(t[0]);for(let e=1;e<s;++e){const s=n[n.length-1]-l;n.push(t[e]>s?t[e]:s)}return n}dema(t,e,s=t.length){const n=[];n[2*(e-1)-1]=NaN;const l=2/(e+1),r=1-l;let o=t[0],h=o;for(let u=0;u<s;++u)o=o*r+t[u]*l,u==e-1&&(h=o),u>=e-1&&(h=h*r+o*l,u>=2*(e-1)&&n.push(2*o-h));return n}di(t,e,s,n,l=t.length){const r=[],o=[];r[n-2]=NaN,o[n-2]=NaN;const h=(n-1)/n;let u=0,a=0,i=0;for(let l=1;l<n;++l){const n=e[l],r=t[l],o=s[l-1],h=Math.abs(r-o),c=Math.abs(n-o);let p=r-n;h>p&&(p=h),c>p&&(p=c),u+=p;let f=t[l]-t[l-1],N=e[l-1]-e[l];f<0?f=0:f>N&&(N=0),N<0?N=0:N>f&&(f=0),a+=f,i+=N}r.push(100*a/u),o.push(100*i/u);for(let c=n;c<l;++c){const n=e[c],l=t[c],p=s[c-1],f=Math.abs(l-p),N=Math.abs(n-p);let d=l-n;f>d&&(d=f),N>d&&(d=N),u=u*h+d;let x=t[c]-t[c-1],g=e[c-1]-e[c];x<0?x=0:x>g&&(g=0),g<0?g=0:g>x&&(x=0),a=a*h+x,i=i*h+g,r.push(100*a/u),o.push(100*i/u)}return[r,o]}dm(t,e,s,n=t.length){const l=[],r=[];l[s-2]=NaN,r[s-2]=NaN;const o=(s-1)/s;let h=0,u=0;for(let n=1;n<s;++n){let s=t[n]-t[n-1],l=e[n-1]-e[n];s<0?s=0:s>l&&(l=0),l<0?l=0:l>s&&(s=0),h+=s,u+=l}l.push(h),r.push(u);for(let a=s;a<n;++a){let s=t[a]-t[a-1],n=e[a-1]-e[a];s<0?s=0:s>n&&(n=0),n<0?n=0:n>s&&(s=0),h=h*o+s,u=u*o+n,l.push(h),r.push(u)}return[l,r]}dpo(t,e,s=t.length){const n=e/2+1,l=[];l[e-2]=NaN;const r=1/e;let o=0;for(let s=0;s<e;++s)o+=t[s];l.push(t[e-1-n]-o*r);for(let h=e;h<s;++h)o+=t[h],o-=t[h-e],l.push(t[h-n]-o*r);return l}dx(t,e,s,n=t.length){const l=[];l[s-2]=NaN;const r=(s-1)/s;let o=0,h=0;for(let n=1;n<s;++n){let s=t[n]-t[n-1],l=e[n-1]-e[n];s<0?s=0:s>l&&(l=0),l<0?l=0:l>s&&(s=0),o+=s,h+=l}let u=o,a=h,i=Math.abs(u-a),c=u+a,p=i/c*100;l.push(p);for(let f=s;f<n;++f){let s=t[f]-t[f-1],n=e[f-1]-e[f];s<0?s=0:s>n&&(n=0),n<0?n=0:n>s&&(s=0),o=o*r+s,h=h*r+n,u=o,a=h,i=Math.abs(u-a),c=u+a,p=i/c*100,l.push(p)}return l}edecay(t,e,s=t.length){const n=[],l=1-1/e;n.push(t[0]);for(let e=1;e<s;++e){const s=n[n.length-1]*l;n.push(t[e]>s?t[e]:s)}return n}ema(t,e,s=t.length){const n=[],l=2/(e+1);let r=t[0];n.push(r);for(let e=1;e<s;++e)r=(t[e]-r)*l+r,n.push(r);return n}emv(t,e,s,n=t.length){const l=[];l[0]=NaN;let r=.5*(t[0]+e[0]);for(let o=1;o<n;++o){const n=.5*(t[o]+e[o]),h=s[o]/1e4/(t[o]-e[o]);l.push((n-r)/h),r=n}return l}fisher(t,e,s,n=t.length){const l=[],r=[];l[s-2]=NaN,r[s-2]=NaN;let o,h,u=0,a=-1,i=-1,c=.5*(t[0]+e[0]),p=.5*(t[0]+e[0]),f=0,N=0;for(let d=s-1;d<n;++d,++u){if(o=.5*(t[d]+e[d]),a<u)for(a=u,c=.5*(t[a]+e[a]),h=u;++h<=d;)o=.5*(t[h]+e[h]),o>=c&&(c=o,a=h);else o>=c&&(a=d,c=o);if(o=.5*(t[d]+e[d]),i<u)for(i=u,p=.5*(t[i]+e[i]),h=u;++h<=d;)o=.5*(t[h]+e[h]),o<=p&&(p=o,i=h);else o<=p&&(i=d,p=o);let s=c-p;0==s&&(s=.001),f=.66*((.5*(t[d]+e[d])-p)/s-.5)+.67*f,f>.99&&(f=.999),f<-.99&&(f=-.999),r.push(N),N=.5*Math.log((1+f)/(1-f))+.5*N,l.push(N)}return[l,r]}fosc(t,e,s=t.length){const n=[];n[e-1]=NaN;let l=0,r=0,o=0,h=0;const u=1/e;let a=0;for(let s=0;s<e-1;++s)l+=s+1,r+=(s+1)*(s+1),h+=t[s]*(s+1),o+=t[s];l+=e,r+=e*e;const i=1/(e*r-l*l);for(let r=e-1;r<s;++r){h+=t[r]*e,o+=t[r];const s=(e*h-l*o)*i,c=(o-s*l)*u;r>=e&&n.push(100*(t[r]-a)/t[r]),a=c+s*(e+1),h-=o,o-=t[r-e+1]}return n}hma(t,s,n=t.length){const l=[],r=Math.floor(s/2),o=Math.floor(Math.sqrt(s)),h=s*(s+1)/2,u=r*(r+1)/2,a=o*(o+1)/2;l[s-1+o-2]=NaN;let i,c=0,p=0,f=0,N=0,d=0,x=0;for(i=0;i<s-1;++i)p+=t[i]*(i+1),c+=t[i],i>=s-r&&(N+=t[i]*(i+1-(s-r)),f+=t[i]);const g=new e.ti_buffer(o);for(i=s-1;i<n;++i){p+=t[i]*s,c+=t[i],N+=t[i]*r,f+=t[i];const e=N/u*2-p/h;x+=e*o,d+=e,g.qpush(e),i>=s-1+(o-1)?(l.push(x/a),x-=d,d-=g.get(1)):x-=d,p-=c,c-=t[i-s+1],N-=f,f-=t[i-r+1]}return l}kama(t,e,s=t.length){const n=[];n[e-2]=NaN;let l=0;for(let s=1;s<e;++s)l+=Math.abs(t[s]-t[s-1]);let r,o,h=t[e-1];n.push(h);for(let u=e;u<s;++u)l+=Math.abs(t[u]-t[u-1]),u>e&&(l-=Math.abs(t[u-e]-t[u-e-1])),r=0!=l?Math.abs(t[u]-t[u-e])/l:1,o=Math.pow(.6021505376344085*r+.06451612903225806,2),h+=o*(t[u]-h),n.push(h);return n}kvo(t,e,s,n,l,r,o=t.length){const h=2/(l+1),u=2/(r+1),a=[];a[0]=NaN;let i=0,c=t[0]+e[0]+s[0],p=-1,f=0,N=0;for(let l=1;l<o;++l){const r=t[l]+e[l]+s[l],o=t[l]-e[l];r>c&&1!=p?(p=1,i=t[l-1]-e[l-1]):r<c&&0!=p&&(p=0,i=t[l-1]-e[l-1]),i+=o;const d=n[l]*Math.abs(o/i*2-1)*100*(p?1:-1);1==l?(f=d,N=d):(f=(d-f)*h+f,N=(d-N)*u+N),a.push(f-N),c=r}return a}lag(t,e,s=t.length){const n=[];n[e-1]=NaN;for(let l=e;l<s;++l)n.push(t[l-e]);return n}linreg(t,e,s=t.length){const n=[];n[e-2]=NaN;let l=0,r=0,o=0,h=0;const u=1/e;for(let s=0;s<e-1;++s)l+=s+1,r+=(s+1)*(s+1),h+=t[s]*(s+1),o+=t[s];l+=e,r+=e*e;const a=1/(e*r-l*l);for(let r=e-1;r<s;++r){h+=t[r]*e,o+=t[r];const s=(e*h-l*o)*a,i=(o-s*l)*u;n.push(i+s*e),h-=o,o-=t[r-e+1]}return n}linregintercept(t,e,s=t.length){const n=[];n[e-2]=NaN;let l=0,r=0,o=0,h=0;const u=1/e;for(let s=0;s<e-1;++s)l+=s+1,r+=(s+1)*(s+1),h+=t[s]*(s+1),o+=t[s];l+=e,r+=e*e;const a=1/(e*r-l*l);for(let r=e-1;r<s;++r){h+=t[r]*e,o+=t[r];const s=(e*h-l*o)*a,i=(o-s*l)*u;n.push(i+1*s),h-=o,o-=t[r-e+1]}return n}linregslope(t,e,s=t.length){const n=[];n[e-2]=NaN;let l=0,r=0,o=0,h=0;for(let s=0;s<e-1;++s)l+=s+1,r+=(s+1)*(s+1),h+=t[s]*(s+1),o+=t[s];l+=e,r+=e*e;const u=1/(e*r-l*l);for(let r=e-1;r<s;++r){h+=t[r]*e,o+=t[r];const s=(e*h-l*o)*u;n.push(s),h-=o,o-=t[r-e+1]}return n}macd(t,e,s,n,l=t.length){const r=[],o=[],h=[];r[s-2]=NaN,o[s-2]=NaN,h[s-2]=NaN;const u=2/(e+1),a=2/(s+1),i=2/(n+1);let c=t[0],p=t[0],f=0;for(let e=1;e<l;++e){c=(t[e]-c)*u+c,p=(t[e]-p)*a+p;const n=c-p;e==s-1&&(f=n),e>=s-1&&(f=(n-f)*i+f,r.push(n),o.push(f),h.push(n-f))}return[r,o,h]}marketfi(t,e,s,n=t.length){const l=[];for(let r=0;r<n;++r)l.push((t[r]-e[r])/s[r]);return l}mass(t,e,s,n=t.length){const l=[];l[16+s-2]=NaN;let r=t[0]-e[0],o=r;const h={index:0,pushes:0,size:s,sum:0,vals:[]};for(let u=0;u<n;++u)r=.8*r+.2*(t[u]-e[u]),8==u&&(o=r),u>=8&&(o=.8*o+.2*r,u>=16&&(h.pushes>=h.size&&(h.sum-=h.vals[h.index]),h.sum+=r/o,h.vals[h.index]=r/o,h.pushes+=1,h.index=h.index+1,h.index>=h.size&&(h.index=0),u>=16+s-1&&l.push(h.sum)));return l}max(t,e,s=t.length){const n=[];n[e-2]=NaN;let l,r=0,o=-1,h=t[0];for(let u=e-1;u<s;++u,++r){let e=t[u];if(o<r)for(o=r,h=t[o],l=r;++l<=u;)e=t[l],e>=h&&(h=e,o=l);else e>=h&&(o=u,h=e);n.push(h)}return n}md(t,e,s=t.length){const n=[];n[e-2]=NaN;const l=1/e;let r,o=0;for(let h=0;h<s;++h){o+=t[h],h>=e&&(o-=t[h-e]);const s=o*l;if(h>=e-1){let o=0;for(r=0;r<e;++r)o+=Math.abs(s-t[h-r]);n.push(o*l)}}return n}medprice(t,e,s=t.length){const n=[];for(let l=0;l<s;++l)n.push(.5*(t[l]+e[l]));return n}mfi(t,e,s,n,l,r=t.length){const o=[];o[l-1]=NaN;let h=(t[0]+e[0]+s[0])*(1/3);const u={size:l,index:0,pushes:0,sum:0,vals:[]},a={size:l,index:0,pushes:0,sum:0,vals:[]};for(let i=1;i<r;++i){const r=(t[i]+e[i]+s[i])*(1/3),c=r*n[i];r>h?(u.pushes>=u.size&&(u.sum-=u.vals[u.index]),u.sum+=c,u.vals[u.index]=c,u.pushes+=1,u.index=u.index+1,u.index>=u.size&&(u.index=0),a.pushes>=a.size&&(a.sum-=a.vals[a.index]),a.sum+=0,a.vals[a.index]=0,a.pushes+=1,a.index=a.index+1,a.index>=a.size&&(a.index=0)):r<h?(a.pushes>=a.size&&(a.sum-=a.vals[a.index]),a.sum+=c,a.vals[a.index]=c,a.pushes+=1,a.index=a.index+1,a.index>=a.size&&(a.index=0),u.pushes>=u.size&&(u.sum-=u.vals[u.index]),u.sum+=0,u.vals[u.index]=0,u.pushes+=1,u.index=u.index+1,u.index>=u.size&&(u.index=0)):(u.pushes>=u.size&&(u.sum-=u.vals[u.index]),u.sum+=0,u.vals[u.index]=0,u.pushes+=1,u.index=u.index+1,u.index>=u.size&&(u.index=0),a.pushes>=a.size&&(a.sum-=a.vals[a.index]),a.sum+=0,a.vals[a.index]=0,a.pushes+=1,a.index=a.index+1,a.index>=a.size&&(a.index=0)),h=r,i>=l&&o.push(u.sum/(u.sum+a.sum)*100)}return o}min(t,e,s=t.length){const n=[];n[e-2]=NaN;let l,r=0,o=-1,h=t[0];for(let u=e-1;u<s;++u,++r){let e=t[u];if(o<r)for(o=r,h=t[o],l=r;++l<=u;)e=t[l],e<=h&&(h=e,o=l);else e<=h&&(o=u,h=e);n.push(h)}return n}mom(t,e,s=t.length){const n=[];n[e-1]=NaN;for(let l=e;l<s;++l)n.push(t[l]-t[l-e]);return n}msw(t,e,s=t.length){const n=[],l=[];n[e-1]=NaN,l[e-1]=NaN;const r=3.1415926,o=2*r;let h,u,a,i,c=0;for(let p=e;p<s;++p){for(u=0,a=0,i=0;i<e;++i)c=t[p-i],u+=Math.cos(o*i/e)*c,a+=Math.sin(o*i/e)*c;h=Math.abs(u)>.001?Math.atan(a/u):o/2*(a<0?-1:1),u<0&&(h+=r),h+=r/2,h<0&&(h+=o),h>o&&(h-=o),n.push(Math.sin(h)),l.push(Math.sin(h+r/4))}return[n,l]}natr(t,e,s,n,l=t.length){const r=[];r[n-2]=NaN;const o=1/n;let h,u=0;u+=t[0]-e[0];for(let l=1;l<n;++l){const n=e[l],r=t[l],o=s[l-1],a=Math.abs(r-o),i=Math.abs(n-o);let c=r-n;a>c&&(c=a),i>c&&(c=i),h=c,u+=h}let a=u/n;r.push(100*a/s[n-1]);for(let u=n;u<l;++u){const n=e[u],l=t[u],i=s[u-1],c=Math.abs(l-i),p=Math.abs(n-i);let f=l-n;c>f&&(f=c),p>f&&(f=p),h=f,a=(h-a)*o+a,r.push(100*a/s[u])}return r}nvi(t,e,s=t.length){const n=[];let l=1e3;n.push(l);for(let r=1;r<s;++r)e[r]<e[r-1]&&(l+=(t[r]-t[r-1])/t[r-1]*l),n.push(l);return n}obv(t,e,s=t.length){const n=[];let l=0;n.push(l);let r=t[0];for(let o=1;o<s;++o)t[o]>r?l+=e[o]:t[o]<r&&(l-=e[o]),r=t[o],n.push(l);return n}ppo(t,e,s,n=t.length){const l=[];l[0]=NaN;const r=2/(e+1),o=2/(s+1);let h=t[0],u=t[0];for(let e=1;e<n;++e){h=(t[e]-h)*r+h,u=(t[e]-u)*o+u;const s=100*(h-u)/u;l.push(s)}return l}psar(t,e,s,n,l=t.length){const r=[];let o,h,u;r[0]=NaN,o=t[0]+e[0]<=t[1]+e[1]?1:0,o?(u=t[0],h=e[0]):(u=e[0],h=t[0]);let a=s;for(let i=1;i<l;++i)h=(u-h)*a+h,o?(i>=2&&h>e[i-2]&&(h=e[i-2]),h>e[i-1]&&(h=e[i-1]),a<n&&t[i]>u&&(a+=s,a>n&&(a=n)),t[i]>u&&(u=t[i])):(i>=2&&h<t[i-2]&&(h=t[i-2]),h<t[i-1]&&(h=t[i-1]),a<n&&e[i]<u&&(a+=s,a>n&&(a=n)),e[i]<u&&(u=e[i])),(o&&e[i]<h||!o&&t[i]>h)&&(a=s,h=u,o=!o,u=o?t[i]:e[i]),r.push(h);return r}pvi(t,e,s=t.length){const n=[];let l=1e3;n.push(l);for(let r=1;r<s;++r)e[r]>e[r-1]&&(l+=(t[r]-t[r-1])/t[r-1]*l),n.push(l);return n}qstick(t,e,s,n=e.length){const l=[];l[s-1]=NaN;const r=1/s;let o,h=0;for(o=0;o<s;++o)h+=e[o]-t[o];for(l.push(h*r),o=s;o<n;++o)h+=e[o]-t[o],h-=e[o-s]-t[o-s],l.push(h*r);return l}roc(t,e,s=t.length){const n=[];n[e-1]=NaN;for(let l=e;l<s;++l)n.push((t[l]-t[l-e])/t[l-e]);return n}rocr(t,e,s=t.length){const n=[];n[e-1]=NaN;for(let l=e;l<s;++l)n.push(t[l]/t[l-e]);return n}rsi(t,e,s=t.length){const n=[];n[e-1]=NaN;const l=1/e;let r=0,o=0;for(let s=1;s<=e;++s)r+=t[s]>t[s-1]?t[s]-t[s-1]:0,o+=t[s]<t[s-1]?t[s-1]-t[s]:0;r/=e,o/=e,n.push(r/(r+o)*100);for(let h=e+1;h<s;++h)r=((t[h]>t[h-1]?t[h]-t[h-1]:0)-r)*l+r,o=((t[h]<t[h-1]?t[h-1]-t[h]:0)-o)*l+o,n.push(r/(r+o)*100);return n}sma(t,e,s=t.length){const n=[];n[e-2]=NaN;const l=1/e;let r=0;for(let s=0;s<e;++s)r+=t[s];n.push(r*l);for(let o=e;o<s;++o)r+=t[o],r-=t[o-e],n.push(r*l);return n}stddev(t,e,s=t.length){const n=[];n[e-2]=NaN;const l=1/e;let r=0,o=0;for(let s=0;s<e;++s)r+=t[s],o+=t[s]*t[s];let h=o*l-r*l*(r*l);h>0&&(h=Math.sqrt(h)),n.push(h);for(let h=e;h<s;++h){r+=t[h],o+=t[h]*t[h],r-=t[h-e],o-=t[h-e]*t[h-e];let s=o*l-r*l*(r*l);s>0&&(s=Math.sqrt(s)),n.push(s)}return n}stderr(t,e,s=t.length){const n=[];n[e-2]=NaN;const l=1/e;let r=0,o=0;const h=1/Math.sqrt(e);for(let s=0;s<e;++s)r+=t[s],o+=t[s]*t[s];let u=o*l-r*l*(r*l);u>0&&(u=Math.sqrt(u)),n.push(h*u);for(let u=e;u<s;++u){r+=t[u],o+=t[u]*t[u],r-=t[u-e],o-=t[u-e]*t[u-e];let s=o*l-r*l*(r*l);s>0&&(s=Math.sqrt(s)),n.push(h*s)}return n}stoch(t,e,s,n,l,r,o=t.length){const h=1/l,u=1/r,a=[],i=[];a[n+l+r-3-1]=NaN,i[n+l+r-3-1]=NaN;let c,p=0,f=-1,N=-1,d=t[0],x=e[0];const g={size:l,index:0,pushes:0,sum:0,vals:[]},m={size:r,index:0,pushes:0,sum:0,vals:[]};let v;for(let M=0;M<o;++M){if(M>=n&&++p,c=t[M],f<p)for(f=p,d=t[f],v=p;++v<=M;)c=t[v],c>=d&&(d=c,f=v);else c>=d&&(f=M,d=c);if(c=e[M],N<p)for(N=p,x=e[N],v=p;++v<=M;)c=e[v],c<=x&&(x=c,N=v);else c<=x&&(N=M,x=c);const o=d-x,z=0==o?0:(s[M]-x)/o*100;if(g.pushes>=g.size&&(g.sum-=g.vals[g.index]),g.sum+=z,g.vals[g.index]=z,g.pushes+=1,g.index=g.index+1,g.index>=g.size&&(g.index=0),M>=n-1+l-1){const t=g.sum*h;m.pushes>=m.size&&(m.sum-=m.vals[m.index]),m.sum+=t,m.vals[m.index]=t,m.pushes+=1,m.index=m.index+1,m.index>=m.size&&(m.index=0),M>=n-1+l-1+r-1&&(a.push(t),i.push(m.sum*u))}}return[a,i]}stochrsi(t,e,s=t.length){const n=[];n[2*e-2]=NaN;const l=1/e,r={size:e,index:0,pushes:0,sum:0,vals:[]};let o=0,h=0;for(let s=1;s<=e;++s)o+=t[s]>t[s-1]?t[s]-t[s-1]:0,h+=t[s]<t[s-1]?t[s-1]-t[s]:0;o/=e,h/=e;let u=o/(o+h)*100;r.pushes>=r.size&&(r.sum-=r.vals[r.index]),r.sum+=u,r.vals[r.index]=u,r.pushes+=1,r.index=r.index+1,r.index>=r.size&&(r.index=0);let a=u,i=u,c=0,p=0;for(let f=e+1;f<s;++f){if(o=((t[f]>t[f-1]?t[f]-t[f-1]:0)-o)*l+o,h=((t[f]<t[f-1]?t[f-1]-t[f]:0)-h)*l+h,u=o/(o+h)*100,u>i)i=u,p=r.index;else if(p==r.index){i=u;for(let t=0;t<r.size;++t)t!=r.index&&r.vals[t]>i&&(i=r.vals[t],p=t)}if(u<a)a=u,c=r.index;else if(c==r.index){a=u;for(let t=0;t<r.size;++t)t!=r.index&&r.vals[t]<a&&(a=r.vals[t],c=t)}if(r.vals[r.index]=u,r.index=r.index+1,r.index>=r.size&&(r.index=0),f>2*e-2){const t=i-a;0==t?n.push(0):n.push((u-a)/t)}}return n}sum(t,e,s=t.length){const n=[];n[e-2]=NaN;let l=0;for(let s=0;s<e;++s)l+=t[s];n.push(l);for(let r=e;r<s;++r)l+=t[r],l-=t[r-e],n.push(l);return n}tema(t,e,s=t.length){const n=[];n[3*(e-1)-1]=NaN;const l=2/(e+1),r=1-l;let o=t[0],h=0,u=0;for(let a=0;a<s;++a)o=o*r+t[a]*l,a==e-1&&(h=o),a>=e-1&&(h=h*r+o*l,a==2*(e-1)&&(u=h),a>=2*(e-1)&&(u=u*r+h*l,a>=3*(e-1)&&n.push(3*o-3*h+u)));return n}tr(t,e,s,n=t.length){const l=[];let r;l[0]=t[0]-e[0];for(let o=1;o<n;++o){const n=e[o],h=t[o],u=s[o-1],a=Math.abs(h-u),i=Math.abs(n-u);let c=h-n;a>c&&(c=a),i>c&&(c=i),r=c,l.push(r)}return l}trima(t,e,s=t.length){const n=[];n[e-2]=NaN;const l=1/(e%2?(e/2+1)*(e/2+1):e/2*(e/2+1));let r=0,o=0,h=0;const u=e%2?e/2:e/2-1,a=u+1;let i=1;for(let s=0;s<e-1;++s)r+=t[s]*i,s+1>e-u&&(o+=t[s]),s+1<=a&&(h+=t[s]),s+1<a&&++i,s+1>=e-u&&--i;let c=e-1-u+1,p=e-1-e+1+a,f=e-1-e+1;for(let u=e-1;u<s;++u)r+=t[u],n.push(r*l),o+=t[u],r+=o,r-=h,o-=t[c++],h+=t[p++],h-=t[f++];return n}trix(t,e,s=t.length){const n=[];n[3*(e-1)+1-1]=NaN;const l=3*e-2,r=2/(e+1);let o=t[0],h=0,u=0;for(let s=1;s<l;++s)o=(t[s]-o)*r+o,s==e-1?h=o:s>e-1&&(h=(o-h)*r+h,s==2*e-2?u=h:s>2*e-2&&(u=(h-u)*r+u));for(let e=l;e<s;++e){o=(t[e]-o)*r+o,h=(o-h)*r+h;const s=u;u=(h-u)*r+u,n.push((u-s)/u*100)}return n}tsf(t,e,s=t.length){const n=[];n[e-2]=NaN;let l=0,r=0,o=0,h=0;const u=1/e;for(let s=0;s<e-1;++s)l+=s+1,r+=(s+1)*(s+1),h+=t[s]*(s+1),o+=t[s];l+=e,r+=e*e;const a=1/(e*r-l*l);for(let r=e-1;r<s;++r){h+=t[r]*e,o+=t[r];const s=(e*h-l*o)*a,i=(o-s*l)*u;n.push(i+s*(e+1)),h-=o,o-=t[r-e+1]}return n}typprice(t,e,s,n=t.length){const l=[];for(let r=0;r<n;++r)l.push((t[r]+e[r]+s[r])*(1/3));return l}ultosc(t,e,s,n,l,r,o=t.length){const h=[];h[r-1]=NaN;const u={size:r,index:0,pushes:0,sum:0,vals:[]},a={size:r,index:0,pushes:0,sum:0,vals:[]};let i=0,c=0,p=0,f=0;for(let N=1;N<o;++N){const o=e[N]<s[N-1]?e[N]:s[N-1],d=t[N]>s[N-1]?t[N]:s[N-1],x=s[N]-o,g=d-o;if(i+=x,c+=x,p+=g,f+=g,u.pushes>=u.size&&(u.sum-=u.vals[u.index]),u.sum+=x,u.vals[u.index]=x,u.pushes+=1,u.index=u.index+1,u.index>=u.size&&(u.index=0),a.pushes>=a.size&&(a.sum-=a.vals[a.index]),a.sum+=g,a.vals[a.index]=g,a.pushes+=1,a.index=a.index+1,a.index>=a.size&&(a.index=0),N>n){let t=u.index-n-1;if(t<0&&(t+=r),i-=u.vals[t],p-=a.vals[t],N>l){let t=u.index-l-1;t<0&&(t+=r),c-=u.vals[t],f-=a.vals[t]}}if(N>=r){const t=100*(4*i/p+2*c/f+1*u.sum/a.sum)/7;h.push(t)}}return h}var(t,e,s=t.length){const n=[];n[e-2]=NaN;const l=1/e;let r=0,o=0;for(let s=0;s<e;++s)r+=t[s],o+=t[s]*t[s];n.push(o*l-r*l*(r*l));for(let h=e;h<s;++h)r+=t[h],o+=t[h]*t[h],r-=t[h-e],o-=t[h-e]*t[h-e],n.push(o*l-r*l*(r*l));return n}vhf(t,e,s=t.length){const n=[];n[e-1]=NaN;let l,r,o,h=1,u=-1,a=-1,i=t[0],c=t[0],p=0,f=t[0];for(let s=1;s<e;++s)r=t[s],p+=Math.abs(r-f),f=r;for(let N=e;N<s;++N,++h){if(r=t[N],p+=Math.abs(r-f),f=r,N>e&&(p-=Math.abs(t[N-e]-t[N-e-1])),l=r,u<h)for(u=h,i=t[u],o=h;++o<=N;)l=t[o],l>=i&&(i=l,u=o);else l>=i&&(u=N,i=l);if(l=r,a<h)for(a=h,c=t[a],o=h;++o<=N;)l=t[o],l<=c&&(c=l,a=o);else l<=c&&(a=N,c=l);n.push(Math.abs(i-c)/p)}return n}vidya(t,e,s,n,l=t.length){const r=[];r[s-3]=NaN;const o=1/e,h=1/s;let u=0,a=0,i=0,c=0;for(let n=0;n<s;++n)i+=t[n],c+=t[n]*t[n],n>=s-e&&(u+=t[n],a+=t[n]*t[n]);let p=t[s-2];if(r.push(p),s-1<l){let e=Math.sqrt(a*o-u*o*(u*o))/Math.sqrt(c*h-i*h*(i*h));e!=e&&(e=0),e*=n,p=(t[s-1]-p)*e+p,r.push(p)}for(let f=s;f<l;++f){i+=t[f],c+=t[f]*t[f],u+=t[f],a+=t[f]*t[f],i-=t[f-s],c-=t[f-s]*t[f-s],u-=t[f-e],a-=t[f-e]*t[f-e];let l=Math.sqrt(a*o-u*o*(u*o))/Math.sqrt(c*h-i*h*(i*h));l!=l&&(l=0),l*=n,p=(t[f]-p)*l+p,r.push(p)}return r}volatility(t,e,s=t.length){const n=[];n[e-1]=NaN;const l=1/e,r=Math.sqrt(252);let o=0,h=0;for(let s=1;s<=e;++s){const e=t[s]/t[s-1]-1;o+=e,h+=e*e}n.push(Math.sqrt(h*l-o*l*(o*l))*r);for(let u=e+1;u<s;++u){const s=t[u]/t[u-1]-1;o+=s,h+=s*s;const a=t[u-e]/t[u-e-1]-1;o-=a,h-=a*a,n.push(Math.sqrt(h*l-o*l*(o*l))*r)}return n}vosc(t,e,s,n=t.length){const l=[];l[s-2]=NaN;const r=1/e,o=1/s;let h=0,u=0;for(let n=0;n<s;++n)n>=s-e&&(h+=t[n]),u+=t[n];const a=h*r,i=u*o;l.push(100*(a-i)/i);for(let a=s;a<n;++a){h+=t[a],h-=t[a-e],u+=t[a],u-=t[a-s];const n=h*r,i=u*o;l.push(100*(n-i)/i)}return l}vwma(t,e,s,n=t.length){const l=[];l[s-2]=NaN;let r=0,o=0;for(let n=0;n<s;++n)r+=t[n]*e[n],o+=e[n];l.push(r/o);for(let h=s;h<n;++h)r+=t[h]*e[h],r-=t[h-s]*e[h-s],o+=e[h],o-=e[h-s],l.push(r/o);return l}wad(t,e,s,n=t.length){const l=[];l[0]=NaN;let r=0,o=s[0];for(let h=1;h<n;++h){const n=s[h];n>o?r+=n-(o<e[h]?o:e[h]):n<o&&(r+=n-(o>t[h]?o:t[h])),l.push(r),o=s[h]}return l}wcprice(t,e,s,n=t.length){const l=[];for(let r=0;r<n;++r)l.push(.25*(t[r]+e[r]+s[r]+s[r]));return l}wilders(t,e,s=t.length){const n=[];n[e-2]=NaN;const l=1/e;let r=0;for(let s=0;s<e;++s)r+=t[s];let o=r/e;n.push(o);for(let r=e;r<s;++r)o=(t[r]-o)*l+o,n.push(o);return n}willr(t,e,s,n,l=t.length){const r=[];r[n-2]=NaN;let o,h,u=0,a=-1,i=-1,c=t[0],p=e[0];for(let f=n-1;f<l;++f,++u){if(o=t[f],a<u)for(a=u,c=t[a],h=u;++h<=f;)o=t[h],o>=c&&(c=o,a=h);else o>=c&&(a=f,c=o);if(o=e[f],i<u)for(i=u,p=e[i],h=u;++h<=f;)o=e[h],o<=p&&(p=o,i=h);else o<=p&&(i=f,p=o);const n=c-p,l=0==n?0:(c-s[f])/n*-100;r.push(l)}return r}wma(t,e,s=t.length){const n=[];n[e-2]=NaN;const l=e*(e+1)/2;let r=0,o=0;for(let s=0;s<e-1;++s)o+=t[s]*(s+1),r+=t[s];for(let h=e-1;h<s;++h)o+=t[h]*e,r+=t[h],n.push(o/l),o-=r,r-=t[h-e+1];return n}zlema(t,e,s=t.length){const n=Math.floor((e-1)/2),l=[];l[(e-2)/2-2]=NaN;const r=2/(e+1);let o,h=t[n-1];for(l.push(h),o=n;o<s;++o){const e=t[o];h=(e+(e-t[o-n])-h)*r+h,l.push(h)}return l}abands(t,e,s,n,l=t.length){const r=[],o=[],h=[];r[n-2]=NaN,o[n-2]=NaN,h[n-2]=NaN;const u=1/n,a={size:n,index:0,pushes:0,sum:0,vals:[]},i={size:n,index:0,pushes:0,sum:0,vals:[]};let c=0;for(let l=0;l<n;++l){const n=4*(t[l]-e[l])/(t[l]+e[l]),r=(1+n)*t[l];a.pushes>=a.size&&(a.sum-=a.vals[a.index]),a.sum+=r,a.vals[a.index]=r,a.pushes+=1,a.index=a.index+1,a.index>=a.size&&(a.index=0);const o=(1-n)*e[l];i.pushes>=i.size&&(i.sum-=i.vals[i.index]),i.sum+=o,i.vals[i.index]=o,i.pushes+=1,i.index=i.index+1,i.index>=i.size&&(i.index=0),c+=s[l]}r.push(a.sum*u),o.push(i.sum*u),h.push(c*u);for(let p=n;p<l;++p){const l=4*(t[p]-e[p])/(t[p]+e[p]),f=(1+l)*t[p];a.pushes>=a.size&&(a.sum-=a.vals[a.index]),a.sum+=f,a.vals[a.index]=f,a.pushes+=1,a.index=a.index+1,a.index>=a.size&&(a.index=0);const N=(1-l)*e[p];i.pushes>=i.size&&(i.sum-=i.vals[i.index]),i.sum+=N,i.vals[i.index]=N,i.pushes+=1,i.index=i.index+1,i.index>=i.size&&(i.index=0),c+=s[p]-s[p-n],r.push(a.sum*u),o.push(i.sum*u),h.push(c*u)}return[r,o,h]}alma(t,e,s,n,l=t.length){const r=[];r[e-2]=NaN;const o=[],h=Math.floor(s*(e-1)),u=e/n;let a=0;for(let t=0;t<e;t++)o[t]=Math.exp(-1*Math.pow(t-h,2)/(2*Math.pow(u,2))),a+=o[t];for(let t=0;t<e;t++)o[t]/=a;for(let s=e-1;s<l;s++){let n=0;for(let l=0;l<e;l++)n+=t[s-e+l+1]*o[l];r.push(n)}return r}ce(t,e,s,n,l,r=t.length){const o=[],h=[];o[n-2]=NaN,h[n-2]=NaN;let u,a,i=t[0]-e[0],c=t[0],p=0,f=e[0],N=0;for(let l=1;l<n;++l){const n=e[l],r=t[l],o=s[l-1],h=Math.abs(r-o),d=Math.abs(n-o);let x=r-n;h>x&&(x=h),d>x&&(x=d),u=x,i+=u,c<=(a=t[l])&&(c=a,p=l),f>=(a=e[l])&&(f=a,N=l)}i/=n;const d=(n-1)/n,x=1/n;o.push(c-l*i),h.push(f+l*i);for(let g=n;g<r;++g){const r=e[g],m=t[g],v=s[g-1],M=Math.abs(m-v),z=Math.abs(r-v);let b=m-r;if(M>b&&(b=M),z>b&&(b=z),u=b,i=i*d+u*x,c<=(a=t[g]))c=a,p=g;else if(p==g-n){c=t[g-n+1],p=g-n+1;for(let e=g-n+2;e<=g;++e)c<=(a=t[e])&&(c=a,p=e)}if(f>=(a=e[g]))f=a,N=g;else if(N==g-n){f=e[g-n+1],N=g-n+1;for(let t=g-n+2;t<=g;++t)f>=(a=e[t])&&(f=a,N=t)}o.push(c-l*i),h.push(f+l*i)}return[o,h]}cmf(t,e,s,n,l,r=t.length){const o=[];o[l-2]=NaN;let h=0,u=0;for(let r=0;r<l-1;++r)u+=t[r]-e[r]?n[r]*(s[r]-e[r]-(t[r]-s[r]))/(t[r]-e[r]):0,h+=n[r];for(let a=l-1;a<r;++a)u+=t[a]-e[a]?n[a]*(s[a]-e[a]-(t[a]-s[a]))/(t[a]-e[a]):0,h+=n[a],o.push(u/h),u-=t[a-l+1]-e[a-l+1]?n[a-l+1]*(s[a-l+1]-e[a-l+1]-(t[a-l+1]-s[a-l+1]))/(t[a-l+1]-e[a-l+1]):0,h-=n[a-l+1];return o}copp(t,e,s){const n=new Array(t.length),l=new Array(t.length),r=new Array(t.length);for(let o=0;o<t.length;o++)n[o]=o<e-1?null:(t[o]-t[o-e])/t[o-e]*100,l[o]=o<s-1?null:(t[o]-t[o-s])/t[o-s]*100,r[o]=10*(n[o]+l[o]);return r}dc(t,e,s){const n=[],l=[],r=[];n[s-2]=NaN,l[s-2]=NaN,r[s-2]=NaN;for(let o=s-1;o<t.length;o++)n.push(Math.max(...t.slice(o-s+1,o+1))),l.push(Math.min(...e.slice(o-s+1,o+1))),r.push((n[n.length-1]+l[l.length-1])/2);return[n,r,l]}fi(t,e,s,n=t.length){const l=[];l[0]=NaN;const r=2/(s+1);let o=e[1]*(t[1]-t[0]);for(let s=1;s<n;++s)o=(e[s]*(t[s]-t[s-1])-o)*r+o,l.push(o);return l}ikhts(){}kc(t,e,s,n,l,r=t.length){const o=[],h=[],u=[],a=2/(n+1);let i=s[0],c=t[0]-e[0];o.push(i-l*c),h.push(i),u.push(i+l*c);let p=0;for(let n=1;n<r;++n){i=(s[n]-i)*a+i;const r=e[n],f=t[n],N=s[n-1],d=Math.abs(f-N),x=Math.abs(r-N);let g=f-r;d>g&&(g=d),x>g&&(g=x),p=g,c=(p-c)*a+c,o.push(i-l*c),h.push(i),u.push(i+l*c)}return[o,h,u]}kst(t,e,s,n,l,r,o,h,u,a=t.length){const i=[],c=[];i[l-1]=NaN,c[l-1]=NaN;let p=r;p<o&&(p=o),p<h&&(p=h),p<u&&(p=u);const f=2/(r+1),N=2/(o+1),d=2/(h+1),x=2/(u+1);function g(e,s){return(t[e]-t[e-s])/t[e-s]}let m=g(e,e),v=g(s,s),M=g(n,n),z=g(l,l);for(let t=e+1;t<l+1&&t<a;++t)m=(g(t,e)-m)*f+m;for(let t=s+1;t<l+1&&t<a;++t)v=(g(t,s)-v)*N+v;for(let t=n+1;t<l+1&&t<a;++t)M=(g(t,n)-M)*d+M;for(let t=l+1;t<l+1&&t<a;++t)z=(g(t,l)-z)*x+z;let b=(1*m+2*v+3*M+4*z)/10;c.push(b);let q=b;i.push(q);for(let t=l+1;t<a;++t)m=(g(t,e)-m)*f+m,v=(g(t,s)-v)*N+v,M=(g(t,n)-M)*d+M,z=(g(t,l)-z)*x+z,b=(1*m+2*v+3*M+4*z)/10,i.push(b),q=.2*(b-q)+q,c.push(q);return[i,c]}mama(){}pbands(t,e,s,n,l=t.length){const r=[],o=[];r[n-2]=NaN,o[n-2]=NaN;let h=0,u=0;const a=n*(n+1)/2,i=n*(n+1)*(2*n+1)/6;let c;for(c=0;c<n;++c)u+=s[c]*(c+1),h+=s[c];--c;const p=(u/n-a/n*h/n)/(i/n-a/n*(a/n));let f=t[c];for(let e=1;e<n;++e)f<t[c-e]+e*p&&(f=t[c-e]+e*p);let N=e[c];for(let t=1;t<n;++t)N>e[c-t]+t*p&&(N=e[c-t]+t*p);for(o.push(f),r.push(N),++c;c<l;++c){u+=-h+s[c]*n,h+=-s[c-n]+s[c];const l=(u/n-a/n*h/n)/(i/n-a/n*(a/n));let p=t[c];for(let e=1;e<n;++e)p<t[c-e]+e*l&&(p=t[c-e]+e*l);let f=e[c];for(let t=1;t<n;++t)f>e[c-t]+t*l&&(f=e[c-t]+t*l);r.push(f),o.push(p)}return[r,o]}pc(){}pfe(t,e,s,n=t.length){const l=[];l[e-1]=NaN;const r=2/(s+1),o={size:e,index:0,pushes:0,sum:0,vals:[]};let h;for(h=1;h<e;++h)o.pushes>=o.size&&(o.sum-=o.vals[o.index]),o.sum+=Math.sqrt(Math.pow(t[h]-t[h-1],2)+1),o.vals[o.index]=Math.sqrt(Math.pow(t[h]-t[h-1],2)+1),o.pushes+=1,o.index=o.index+1,o.index>=o.size&&(o.index=0);o.pushes>=o.size&&(o.sum-=o.vals[o.index]),o.sum+=Math.sqrt(Math.pow(t[h]-t[h-1],2)+1),o.vals[o.index]=Math.sqrt(Math.pow(t[h]-t[h-1],2)+1),o.pushes+=1,o.index=o.index+1,o.index>=o.size&&(o.index=0);let u=100*(t[h]-t[h-e]>0?1:-1)*Math.sqrt(Math.pow(t[h]-t[h-e],2)+100)/o.sum;for(l.push(u),h=e+1;h<n;++h)o.pushes>=o.size&&(o.sum-=o.vals[o.index]),o.sum+=Math.sqrt(Math.pow(t[h]-t[h-1],2)+1),o.vals[o.index]=Math.sqrt(Math.pow(t[h]-t[h-1],2)+1),o.pushes+=1,o.index=o.index+1,o.index>=o.size&&(o.index=0),u=(100*(t[h]-t[h-e]>0?1:-1)*Math.sqrt(Math.pow(t[h]-t[h-e],2)+100)/o.sum-u)*r+u,l.push(u);return l}posc(t,e,s,n,l,r=t.length){const o=[];o[n-2]=NaN;let h,u=0,a=0;const i=n*(n+1)/2,c=n*(n+1)*(2*n+1)/6;let p;for(p=0;p<n;++p)a+=s[p]*(p+1),u+=s[p];--p;const f=(a/n-i/n*u/n)/(c/n-i/n*(i/n));let N=t[p];for(let e=1;e<n;++e)N<t[p-e]+e*f&&(N=t[p-e]+e*f);let d=e[p];for(let t=1;t<n;++t)d>e[p-t]+t*f&&(d=e[p-t]+t*f);for(h=(s[p]-d)/(N-d)*100,o.push(h),++p;p<r;++p){a+=-u+s[p]*n,u+=-s[p-n]+s[p];const r=(a/n-i/n*u/n)/(c/n-i/n*(i/n));let f=t[p];for(let e=1;e<n;++e)f<t[p-e]+e*r&&(f=t[p-e]+e*r);let N=e[p];for(let t=1;t<n;++t)N>e[p-t]+t*r&&(N=e[p-t]+t*r);h=2*((s[p]-N)/(f-N)*100-h)/(1+l)+h,o.push(h)}return o}rmi(t,e,s,n=t.length){const l=[];let r,o;l[s-1]=NaN;let h=s;for(r=0>t[h]-t[h-s]?0:t[h]-t[h-s],o=0>t[h-s]-t[h]?0:t[h-s]-t[h],++h,l.push(r/(r+o)*100);h<n;++h)r=2*(0>t[h]-t[h-s]?0:t[h]-t[h-s]-r)/(1+e)+r,o=2*(0>t[h-s]-t[h]?0:t[h-s]-t[h]-o)/(1+e)+o,l.push(r/(r+o)*100);return l}rmta(t,e,s,n=t.length){const l=[];l[e-2]=NaN;const r=1-s;let o=(1-r)*t[0]+t[0],h=(1-r)*t[0]+r*(t[0]+o);for(let s=1;s<e-1;++s){const e=(1-r)*o+t[s];h=(1-r)*h+r*(t[s]+e-o),o=e}for(let s=e-1;s<n;++s){const e=(1-r)*o+t[s];h=(1-r)*h+r*(t[s]+e-o),o=e,l.push(h)}return l}rvi(t,e,s,n=t.length){const l=[];l[s-2]=NaN;let r=0,o=0;const h=s*(s+1)/2,u=s*(s+1)*(2*s+1)/6;let a=0,i=0,c=0;for(;c<s;++c)o+=t[c]*(c+1),r+=t[c];--c;const p=(o/s-h/s*r/s)/(u/s-h/s*(h/s)),f=r/s-p*h/s,N=t[c]-(f+p*s);for(N>0?a=N*N/s:i=N*N/s,a+i==0?l.push(50):l.push(a/(a+i)*100),++c;c<n;++c){o+=-r+t[c]*s,r+=-t[c-s]+t[c];const n=(o/s-h/s*r/s)/(u/s-h/s*(h/s)),p=r/s-n*h/s,f=t[c]-(p+n*s);f>0?a=2*(f*f/s-a)/(e+1)+a:i=2*(f*f/s-i)/(e+1)+i,a+i==0?l.push(50):l.push(a/(a+i)*100)}return l}smi(t,e,s,n,l,r,o=t.length){const h=[];h[n-2]=NaN;let u=1-n,a=NaN,i=NaN,c=NaN,p=NaN,f=0,N=0,d=0,x=0,g=0,m=0;for(;m<o&&u==1-n;++m,++u)N=t[m],d=u,f=e[m],x=u;for(;m<o&&u<0;++m,++u)N<=t[m]&&(N=t[m],d=u),f>=e[m]&&(f=e[m],x=u);for(;m<o&&0==u;++m,++u)N<=t[m]&&(N=t[m],d=u),f>=e[m]&&(f=e[m],x=u),a=i=s[m]-.5*(N+f),c=p=N-f,h.push(100*i/(.5*p));for(;m<o;++m,++u){if(d==u-n){N=t[m],d=u;for(let e=1;e<n;++e)g=t[m-e],g>N&&(N=g,d=u-e)}else N<=t[m]&&(N=t[m],d=u);if(x==u-n){f=e[m],x=u;for(let t=1;t<n;++t)g=e[m-t],g<f&&(f=g,x=u-t)}else f>=e[m]&&(f=e[m],x=u);a=(s[m]-.5*(N+f)-a)*(2/(1+l))+a,i=2/(1+r)*(a-i)+i,c=2/(1+l)*(N-f-c)+c,p=2/(1+r)*(c-p)+p,h.push(100*i/(.5*p))}return h}tsi(t,e,s,n=t.length){const l=[];l[0]=NaN;let r=-1,o=0,h=0,u=0,a=0,i=0,c=0;for(;c<n&&-1==r;++c,++r)o=t[c];for(;c<n&&0==r;++c,++r)u=h=t[c]-o,i=a=Math.abs(t[c]-o),l.push(100*(i?u/i:0)),o=t[c];for(;c<n;++c,++r)h=2*(t[c]-o-h)/(1+e)+h,a=2*(Math.abs(t[c]-o)-a)/(1+e)+a,u=2*(h-u)/(1+s)+u,i=2*(a-i)/(1+s)+i,l.push(100*(i?u/i:0)),o=t[c];return l}vwap(t,e,s,n,l,r=t.length){const o=[];o[l-2]=NaN;let h=1-l,u=0,a=0,i=0;for(;i<r&&h<1;++i,++h)u+=(t[i]+e[i]+s[i])/3*n[i],a+=n[i];for(i>0&&1==h&&o.push(u/a);i<r;++i,++h)u+=(t[i]+e[i]+s[i])/3*n[i]-(t[i-l]+e[i-l]+s[i-l])/3*n[i-l],a+=n[i]-n[i-l],o.push(u/a);return o}}})(),n})()));