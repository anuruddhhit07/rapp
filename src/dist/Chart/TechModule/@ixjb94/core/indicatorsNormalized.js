var t={717:(t,e,s)=>{s.d(e,{f:()=>n});class n{constructor(t){this.size=t,this.pushes=0,this.index=0,this.sum=0,this.vals=[]}static new(t){return new n(t)}push(t){this.pushes>=this.size&&(this.sum-=this.vals[this.index]),this.sum+=t,this.vals[this.index]=t,this.pushes+=1,this.index=(this.index+1)%this.size}qpush(t){this.vals[this.index]=t,this.index=(this.index+1)%this.size}get(t){return this.vals[(this.index+this.size-1+t)%this.size]}}}},e={};function s(n){var r=e[n];if(void 0!==r)return r.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,s),o.exports}s.d=(t,e)=>{for(var n in e)s.o(e,n)&&!s.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var n={};(()=>{s.d(n,{q:()=>r});var t=s(717),e=function(t,e,s,n){return new(s||(s=Promise))((function(r,o){function i(t){try{h(n.next(t))}catch(t){o(t)}}function u(t){try{h(n.throw(t))}catch(t){o(t)}}function h(t){var e;t.done?r(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(i,u)}h((n=n.apply(t,e||[])).next())}))};class r{constructor(){}normalize(t,s){return e(this,arguments,void 0,(function*(t,e,s=NaN){const n=t-e.length,r=[];for(let t=0;t<n;++t)r.push(s);return[...r,...e]}))}floor(t){return t<0?~~t-1:~~t}sqrt(t,e=t/2){const s=(e+t/e)/2;return(e>s?e-s:s-e)<1e-7?s:this.sqrt(t,s)}ad(t,s,n,r){return e(this,arguments,void 0,(function*(t,e,s,n,r=s.length){const o=[];let i=0;for(let u=0;u<r;++u){const r=t[u]-e[u];0!=r&&(i+=(s[u]-e[u]-t[u]+s[u])/r*n[u]),o[u]=i}return o}))}adosc(t,s,n,r,o,i){return e(this,arguments,void 0,(function*(t,e,s,n,r,o,i=s.length){const u=o-1,h=2/(r+1),l=2/(o+1),c=[];c[o-2]=NaN;let a=0,f=0,d=0;for(let r=0;r<i;++r){const o=t[r]-e[r];0!=o&&(a+=(s[r]-e[r]-t[r]+s[r])/o*n[r]),0==r?(f=a,d=a):(f=(a-f)*h+f,d=(a-d)*l+d),r>=u&&c.push(f-d)}return c}))}adx(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[2*(s-2)+1]=NaN;const o=(s-1)/s,i=1/s;let u=0,h=0;for(let n=1;n<s;++n){let s=t[n]-t[n-1],r=e[n-1]-e[n];s<0?s=0:s>r&&(r=0),r<0?r=0:r>s&&(s=0),u+=s,h+=r}let l=0,c=u,a=h,f=Math.abs(c-a),d=c+a,p=f/d*100;l+=p;for(let N=s;N<n;++N){let n=t[N]-t[N-1],v=e[N-1]-e[N];n<0?n=0:n>v&&(v=0),v<0?v=0:v>n&&(n=0),u=u*o+n,h=h*o+v,c=u,a=h,f=Math.abs(c-a),d=c+a,p=f/d*100,N-s<s-2?l+=p:N-s==s-2?(l+=p,r.push(l*i)):(l=l*o+p,r.push(l*i))}return r}))}adxr(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[3*(s-1)-1]=NaN;const o=(s-1)/s,i=1/s;let u=0,h=0;for(let n=1;n<s;++n){let s=t[n]-t[n-1],r=e[n-1]-e[n];s<0?s=0:s>r&&(r=0),r<0?r=0:r>s&&(s=0),u+=s,h+=r}let l=0,c=u,a=h,f=Math.abs(c-a),d=c+a,p=f/d*100;l+=p;const N={size:s-1,pushes:0,index:0,vals:[]},v=3*(s-1);for(let x=s;x<n;++x){let n=t[x]-t[x-1],g=e[x-1]-e[x];if(n<0?n=0:n>g&&(g=0),g<0?g=0:g>n&&(n=0),u=u*o+n,h=h*o+g,c=u,a=h,f=Math.abs(c-a),d=c+a,p=f/d*100,x-s<s-2)l+=p;else if(x-s==s-2)l+=p,N.vals[N.index]=l*i,N.index=N.index+1,N.index>=N.size&&(N.index=0);else{if(l=l*o+p,x>=v){const t=N.vals[N.index]+(N.size-1+1)%N.size;r.push(.5*(l*i+t))}N.vals[N.index]=l*i,N.index=N.index+1,N.index>=N.size&&(N.index=0)}}return r}))}ao(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[32]=NaN;let r=0,o=0;const i=1/34;for(let s=0;s<34;++s){const n=.5*(t[s]+e[s]);r+=n,s>=29&&(o+=n)}n.push(.2*o-i*r);for(let u=34;u<s;++u){const s=.5*(t[u]+e[u]);r+=s,o+=s,r-=.5*(t[u-34]+e[u-34]),o-=.5*(t[u-5]+e[u-5]),n.push(.2*o-i*r)}return n}))}apo(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[0]=NaN;const o=2/(e+1),i=2/(s+1);let u=t[0],h=t[0];for(let e=1;e<n;++e){u=(t[e]-u)*o+u,h=(t[e]-h)*i+h;const s=u-h;r.push(s)}return r}))}aroon(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[],o=[];r[s-1]=NaN,o[s-1]=NaN;const i=100/s;let u,h,l=0,c=-1,a=-1,f=t[0],d=e[0];for(let p=s;p<n;++p,++l){if(u=t[p],c<l)for(c=l,f=t[c],h=l;++h<=p;)u=t[h],u>=f&&(f=u,c=h);else u>=f&&(c=p,f=u);if(u=e[p],a<l)for(a=l,d=e[a],h=l;++h<=p;)u=e[h],u<=d&&(d=u,a=h);else u<=d&&(a=p,d=u);r[r.length]=(s-(p-a))*i,o[o.length]=(s-(p-c))*i}return[r,o]}))}aroonosc(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[s-1]=NaN;const o=100/s;let i,u=0,h=-1,l=-1,c=t[0],a=e[0];for(let f=s;f<n;++f,++u){let s=t[f];if(h<u)for(h=u,c=t[h],i=u;++i<=f;)s=t[i],s>=c&&(c=s,h=i);else s>=c&&(h=f,c=s);if(s=e[f],l<u)for(l=u,a=e[l],i=u;++i<=f;)s=e[i],s<=a&&(a=s,l=i);else s<=a&&(l=f,a=s);r.push((h-l)*o)}return r}))}atr(t,s,n,r){return e(this,arguments,void 0,(function*(t,e,s,n,r=t.length){const o=[];o[n-2]=NaN;const i=1/n;let u,h=0;h+=t[0]-e[0];for(let r=1;r<n;++r){const n=e[r],o=t[r],i=s[r-1],l=Math.abs(o-i),c=Math.abs(n-i);let a=o-n;l>a&&(a=l),c>a&&(a=c),u=a,h+=u}let l=h/n;o.push(l);for(let h=n;h<r;++h){const n=e[h],r=t[h],c=s[h-1],a=Math.abs(r-c),f=Math.abs(n-c);let d=r-n;a>d&&(d=a),f>d&&(d=f),u=d,l=(u-l)*i+l,o.push(l)}return o}))}avgprice(t,s,n,r){return e(this,arguments,void 0,(function*(t,e,s,n,r=t.length){const o=[];for(let i=0;i<r;++i)o.push(.25*(t[i]+e[i]+s[i]+n[i]));return o}))}bbands(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[],o=[],i=[];r[e-2]=NaN,o[e-2]=NaN,i[e-2]=NaN;const u=1/e;let h=0,l=0;for(let s=0;s<e;++s)h+=t[s],l+=t[s]*t[s];let c=Math.sqrt(l*u-h*u*(h*u));const a=h*u;r.push(a-s*c),i.push(a+s*c),o.push(a);for(let a=e;a<n;++a){h+=t[a],l+=t[a]*t[a],h-=t[a-e],l-=t[a-e]*t[a-e],c=Math.sqrt(l*u-h*u*(h*u));const n=h*u;i.push(n+s*c),r.push(n-s*c),o.push(n)}return[r,o,i]}))}bop(t,s,n,r){return e(this,arguments,void 0,(function*(t,e,s,n,r=t.length){const o=[];for(let i=0;i<r;++i){const r=e[i]-s[i];o[i]=r<=0?0:(n[i]-t[i])/r}return o}))}cci(s,n,r,o){return e(this,arguments,void 0,(function*(e,s,n,r,o=e.length){const i=1/r,u=[];u[2*(r-2)+1]=NaN;const h=new t.f(r);let l,c;for(l=0;l<o;++l){const t=(e[l]+s[l]+n[l])*(1/3);h.push(t);const o=h.sum*i;if(l>=2*r-2){let e=0;for(c=0;c<r;++c)e+=Math.abs(o-h.vals[c]);let s=e*i;s*=.015,s=(t-o)/s,u.push(s)}}return u}))}cmo(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-1]=NaN;let r=0,o=0;for(let s=1;s<=e;++s)r+=t[s]>t[s-1]?t[s]-t[s-1]:0,o+=t[s]<t[s-1]?t[s-1]-t[s]:0;n.push(100*(r-o)/(r+o));for(let i=e+1;i<s;++i)r-=t[i-e]>t[i-e-1]?t[i-e]-t[i-e-1]:0,o-=t[i-e]<t[i-e-1]?t[i-e-1]-t[i-e]:0,r+=t[i]>t[i-1]?t[i]-t[i-1]:0,o+=t[i]<t[i-1]?t[i-1]-t[i]:0,n.push(100*(r-o)/(r+o));return n}))}crossany(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];for(let r=0;r<s;++r)n.push(t[r]>e[r]&&t[r-1]<=e[r-1]||t[r]<e[r]&&t[r-1]>=e[r-1]);return n}))}crossover(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];for(let r=0;r<s;++r)n.push(t[r]>e[r]&&t[r-1]<=e[r-1]);return n}))}crossOverNumber(t,e){const s=[];for(let n=0;n<t.length;n++){const r=t[n],o=t[n-1];r>e&&o<=e?s.push(!0):s.push(!1)}return s}crossUnderNumber(t,e){const s=[];for(let n=0;n<t.length;n++){const r=t[n],o=t[n-1];r<e&&o>=e?s.push(!0):s.push(!1)}return s}cvi(s,n,r){return e(this,arguments,void 0,(function*(e,s,n,r=e.length){const o=[];o[2*(n-1)]=NaN;const i=2/(n+1),u=new t.f(n);let h,l=e[0]-s[0];for(h=1;h<2*n-1;++h)l=(e[h]-s[h]-l)*i+l,u.qpush(l);for(h=2*n-1;h<r;++h){l=(e[h]-s[h]-l)*i+l;const t=u.vals[u.index];o.push(100*(l-t)/t),u.qpush(l)}return o}))}decay(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[],r=1/e;n.push(t[0]);for(let e=1;e<s;++e){const s=n[n.length-1]-r;n.push(t[e]>s?t[e]:s)}return n}))}dema(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[2*(e-1)-1]=NaN;const r=2/(e+1),o=1-r;let i=t[0],u=i;for(let h=0;h<s;++h)i=i*o+t[h]*r,h==e-1&&(u=i),h>=e-1&&(u=u*o+i*r,h>=2*(e-1)&&n.push(2*i-u));return n}))}di(t,s,n,r){return e(this,arguments,void 0,(function*(t,e,s,n,r=t.length){const o=[],i=[];o[n-2]=NaN,i[n-2]=NaN;const u=(n-1)/n;let h=0,l=0,c=0;for(let r=1;r<n;++r){const n=e[r],o=t[r],i=s[r-1],u=Math.abs(o-i),a=Math.abs(n-i);let f=o-n;u>f&&(f=u),a>f&&(f=a),h+=f;let d=t[r]-t[r-1],p=e[r-1]-e[r];d<0?d=0:d>p&&(p=0),p<0?p=0:p>d&&(d=0),l+=d,c+=p}o.push(100*l/h),i.push(100*c/h);for(let a=n;a<r;++a){const n=e[a],r=t[a],f=s[a-1],d=Math.abs(r-f),p=Math.abs(n-f);let N=r-n;d>N&&(N=d),p>N&&(N=p),h=h*u+N;let v=t[a]-t[a-1],x=e[a-1]-e[a];v<0?v=0:v>x&&(x=0),x<0?x=0:x>v&&(v=0),l=l*u+v,c=c*u+x,o.push(100*l/h),i.push(100*c/h)}return[o,i]}))}dm(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[],o=[];r[s-2]=NaN,o[s-2]=NaN;const i=(s-1)/s;let u=0,h=0;for(let n=1;n<s;++n){let s=t[n]-t[n-1],r=e[n-1]-e[n];s<0?s=0:s>r&&(r=0),r<0?r=0:r>s&&(s=0),u+=s,h+=r}r.push(u),o.push(h);for(let l=s;l<n;++l){let s=t[l]-t[l-1],n=e[l-1]-e[l];s<0?s=0:s>n&&(n=0),n<0?n=0:n>s&&(s=0),u=u*i+s,h=h*i+n,r.push(u),o.push(h)}return[r,o]}))}dpo(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=e/2+1,r=[];r[e-2]=NaN;const o=1/e;let i=0;for(let s=0;s<e;++s)i+=t[s];r.push(t[e-1-n]-i*o);for(let u=e;u<s;++u)i+=t[u],i-=t[u-e],r.push(t[u-n]-i*o);return r}))}dx(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[s-2]=NaN;const o=(s-1)/s;let i=0,u=0;for(let n=1;n<s;++n){let s=t[n]-t[n-1],r=e[n-1]-e[n];s<0?s=0:s>r&&(r=0),r<0?r=0:r>s&&(s=0),i+=s,u+=r}let h=i,l=u,c=Math.abs(h-l),a=h+l,f=c/a*100;r.push(f);for(let d=s;d<n;++d){let s=t[d]-t[d-1],n=e[d-1]-e[d];s<0?s=0:s>n&&(n=0),n<0?n=0:n>s&&(s=0),i=i*o+s,u=u*o+n,h=i,l=u,c=Math.abs(h-l),a=h+l,f=c/a*100,r.push(f)}return r}))}edecay(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[],r=1-1/e;n.push(t[0]);for(let e=1;e<s;++e){const s=n[n.length-1]*r;n.push(t[e]>s?t[e]:s)}return n}))}ema(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[],r=2/(e+1);let o=t[0];n.push(o);for(let e=1;e<s;++e)o=(t[e]-o)*r+o,n.push(o);return n}))}emv(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[0]=NaN;let o=.5*(t[0]+e[0]);for(let i=1;i<n;++i){const n=.5*(t[i]+e[i]),u=s[i]/1e4/(t[i]-e[i]);r.push((n-o)/u),o=n}return r}))}fisher(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[],o=[];r[s-2]=NaN,o[s-2]=NaN;let i,u,h=0,l=-1,c=-1,a=.5*(t[0]+e[0]),f=.5*(t[0]+e[0]),d=0,p=0;for(let N=s-1;N<n;++N,++h){if(i=.5*(t[N]+e[N]),l<h)for(l=h,a=.5*(t[l]+e[l]),u=h;++u<=N;)i=.5*(t[u]+e[u]),i>=a&&(a=i,l=u);else i>=a&&(l=N,a=i);if(i=.5*(t[N]+e[N]),c<h)for(c=h,f=.5*(t[c]+e[c]),u=h;++u<=N;)i=.5*(t[u]+e[u]),i<=f&&(f=i,c=u);else i<=f&&(c=N,f=i);let s=a-f;0==s&&(s=.001),d=.66*((.5*(t[N]+e[N])-f)/s-.5)+.67*d,d>.99&&(d=.999),d<-.99&&(d=-.999),o.push(p),p=.5*Math.log((1+d)/(1-d))+.5*p,r.push(p)}return[r,o]}))}fosc(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-1]=NaN;let r=0,o=0,i=0,u=0;const h=1/e;let l=0;for(let s=0;s<e-1;++s)r+=s+1,o+=(s+1)*(s+1),u+=t[s]*(s+1),i+=t[s];r+=e,o+=e*e;const c=1/(e*o-r*r);for(let o=e-1;o<s;++o){u+=t[o]*e,i+=t[o];const s=(e*u-r*i)*c,a=(i-s*r)*h;o>=e&&n.push(100*(t[o]-l)/t[o]),l=a+s*(e+1),u-=i,i-=t[o-e+1]}return n}))}hma(s,n){return e(this,arguments,void 0,(function*(e,s,n=e.length){const r=[],o=Math.floor(s/2),i=Math.floor(Math.sqrt(s)),u=s*(s+1)/2,h=o*(o+1)/2,l=i*(i+1)/2;r[s-1+i-2]=NaN;let c,a=0,f=0,d=0,p=0,N=0,v=0;for(c=0;c<s-1;++c)f+=e[c]*(c+1),a+=e[c],c>=s-o&&(p+=e[c]*(c+1-(s-o)),d+=e[c]);const x=new t.f(i);for(c=s-1;c<n;++c){f+=e[c]*s,a+=e[c],p+=e[c]*o,d+=e[c];const t=p/h*2-f/u;v+=t*i,N+=t,x.qpush(t),c>=s-1+(i-1)?(r.push(v/l),v-=N,N-=x.get(1)):v-=N,f-=a,a-=e[c-s+1],p-=d,d-=e[c-o+1]}return r}))}kama(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;const r=2/31;let o=0;for(let s=1;s<e;++s)o+=Math.abs(t[s]-t[s-1]);let i,u,h=t[e-1];n.push(h);for(let l=e;l<s;++l)o+=Math.abs(t[l]-t[l-1]),l>e&&(o-=Math.abs(t[l-e]-t[l-e-1])),i=0!=o?Math.abs(t[l]-t[l-e])/o:1,u=Math.pow(.6021505376344085*i+r,2),h+=u*(t[l]-h),n.push(h);return n}))}kvo(t,s,n,r,o,i){return e(this,arguments,void 0,(function*(t,e,s,n,r,o,i=t.length){const u=2/(r+1),h=2/(o+1),l=[];l[0]=NaN;let c=0,a=t[0]+e[0]+s[0],f=-1,d=0,p=0;for(let r=1;r<i;++r){const o=t[r]+e[r]+s[r],i=t[r]-e[r];o>a&&1!=f?(f=1,c=t[r-1]-e[r-1]):o<a&&0!=f&&(f=0,c=t[r-1]-e[r-1]),c+=i;const N=n[r]*Math.abs(i/c*2-1)*100*(f?1:-1);1==r?(d=N,p=N):(d=(N-d)*u+d,p=(N-p)*h+p),l.push(d-p),a=o}return l}))}lag(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-1]=NaN;for(let r=e;r<s;++r)n.push(t[r-e]);return n}))}linreg(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;let r=0,o=0,i=0,u=0;const h=1/e;for(let s=0;s<e-1;++s)r+=s+1,o+=(s+1)*(s+1),u+=t[s]*(s+1),i+=t[s];r+=e,o+=e*e;const l=1/(e*o-r*r);for(let o=e-1;o<s;++o){u+=t[o]*e,i+=t[o];const s=(e*u-r*i)*l,c=(i-s*r)*h;n.push(c+s*e),u-=i,i-=t[o-e+1]}return n}))}linregintercept(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;let r=0,o=0,i=0,u=0;const h=1/e;for(let s=0;s<e-1;++s)r+=s+1,o+=(s+1)*(s+1),u+=t[s]*(s+1),i+=t[s];r+=e,o+=e*e;const l=1/(e*o-r*r);for(let o=e-1;o<s;++o){u+=t[o]*e,i+=t[o];const s=(e*u-r*i)*l,c=(i-s*r)*h;n.push(c+1*s),u-=i,i-=t[o-e+1]}return n}))}linregslope(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;let r=0,o=0,i=0,u=0;for(let s=0;s<e-1;++s)r+=s+1,o+=(s+1)*(s+1),u+=t[s]*(s+1),i+=t[s];r+=e,o+=e*e;const h=1/(e*o-r*r);for(let o=e-1;o<s;++o){u+=t[o]*e,i+=t[o];const s=(e*u-r*i)*h;n.push(s),u-=i,i-=t[o-e+1]}return n}))}macd(t,s,n,r){return e(this,arguments,void 0,(function*(t,e,s,n,r=t.length){const o=[],i=[],u=[];o[s-2]=NaN,i[s-2]=NaN,u[s-2]=NaN;const h=2/(e+1),l=2/(s+1),c=2/(n+1);let a=t[0],f=t[0],d=0;for(let e=1;e<r;++e){a=(t[e]-a)*h+a,f=(t[e]-f)*l+f;const n=a-f;e==s-1&&(d=n),e>=s-1&&(d=(n-d)*c+d,o.push(n),i.push(d),u.push(n-d))}return[o,i,u]}))}marketfi(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];for(let o=0;o<n;++o)r.push((t[o]-e[o])/s[o]);return r}))}mass(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[16+s-2]=NaN;let o=t[0]-e[0],i=o;const u={index:0,pushes:0,size:s,sum:0,vals:[]};for(let h=0;h<n;++h)o=.8*o+.2*(t[h]-e[h]),8==h&&(i=o),h>=8&&(i=.8*i+.2*o,h>=16&&(u.pushes>=u.size&&(u.sum-=u.vals[u.index]),u.sum+=o/i,u.vals[u.index]=o/i,u.pushes+=1,u.index=u.index+1,u.index>=u.size&&(u.index=0),h>=16+s-1&&r.push(u.sum)));return r}))}max(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;let r,o=0,i=-1,u=t[0];for(let h=e-1;h<s;++h,++o){let e=t[h];if(i<o)for(i=o,u=t[i],r=o;++r<=h;)e=t[r],e>=u&&(u=e,i=r);else e>=u&&(i=h,u=e);n.push(u)}return n}))}md(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;const r=1/e;let o,i=0;for(let u=0;u<s;++u){i+=t[u],u>=e&&(i-=t[u-e]);const s=i*r;if(u>=e-1){let i=0;for(o=0;o<e;++o)i+=Math.abs(s-t[u-o]);n.push(i*r)}}return n}))}medprice(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];for(let r=0;r<s;++r)n.push(.5*(t[r]+e[r]));return n}))}mfi(t,s,n,r,o){return e(this,arguments,void 0,(function*(t,e,s,n,r,o=t.length){const i=[];i[r-1]=NaN;let u=(t[0]+e[0]+s[0])*(1/3);const h={size:r,index:0,pushes:0,sum:0,vals:[]},l={size:r,index:0,pushes:0,sum:0,vals:[]};for(let c=1;c<o;++c){const o=(t[c]+e[c]+s[c])*(1/3),a=o*n[c];o>u?(h.pushes>=h.size&&(h.sum-=h.vals[h.index]),h.sum+=a,h.vals[h.index]=a,h.pushes+=1,h.index=h.index+1,h.index>=h.size&&(h.index=0),l.pushes>=l.size&&(l.sum-=l.vals[l.index]),l.sum+=0,l.vals[l.index]=0,l.pushes+=1,l.index=l.index+1,l.index>=l.size&&(l.index=0)):o<u?(l.pushes>=l.size&&(l.sum-=l.vals[l.index]),l.sum+=a,l.vals[l.index]=a,l.pushes+=1,l.index=l.index+1,l.index>=l.size&&(l.index=0),h.pushes>=h.size&&(h.sum-=h.vals[h.index]),h.sum+=0,h.vals[h.index]=0,h.pushes+=1,h.index=h.index+1,h.index>=h.size&&(h.index=0)):(h.pushes>=h.size&&(h.sum-=h.vals[h.index]),h.sum+=0,h.vals[h.index]=0,h.pushes+=1,h.index=h.index+1,h.index>=h.size&&(h.index=0),l.pushes>=l.size&&(l.sum-=l.vals[l.index]),l.sum+=0,l.vals[l.index]=0,l.pushes+=1,l.index=l.index+1,l.index>=l.size&&(l.index=0)),u=o,c>=r&&i.push(h.sum/(h.sum+l.sum)*100)}return i}))}min(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;let r,o=0,i=-1,u=t[0];for(let h=e-1;h<s;++h,++o){let e=t[h];if(i<o)for(i=o,u=t[i],r=o;++r<=h;)e=t[r],e<=u&&(u=e,i=r);else e<=u&&(i=h,u=e);n.push(u)}return n}))}mom(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-1]=NaN;for(let r=e;r<s;++r)n.push(t[r]-t[r-e]);return n}))}msw(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[],r=[];n[e-1]=NaN,r[e-1]=NaN;const o=3.1415926,i=2*o;let u,h,l,c,a=0;for(let f=e;f<s;++f){for(h=0,l=0,c=0;c<e;++c)a=t[f-c],h+=Math.cos(i*c/e)*a,l+=Math.sin(i*c/e)*a;u=Math.abs(h)>.001?Math.atan(l/h):i/2*(l<0?-1:1),h<0&&(u+=o),u+=o/2,u<0&&(u+=i),u>i&&(u-=i),n.push(Math.sin(u)),r.push(Math.sin(u+o/4))}return[n,r]}))}natr(t,s,n,r){return e(this,arguments,void 0,(function*(t,e,s,n,r=t.length){const o=[];o[n-2]=NaN;const i=1/n;let u,h=0;h+=t[0]-e[0];for(let r=1;r<n;++r){const n=e[r],o=t[r],i=s[r-1],l=Math.abs(o-i),c=Math.abs(n-i);let a=o-n;l>a&&(a=l),c>a&&(a=c),u=a,h+=u}let l=h/n;o.push(100*l/s[n-1]);for(let h=n;h<r;++h){const n=e[h],r=t[h],c=s[h-1],a=Math.abs(r-c),f=Math.abs(n-c);let d=r-n;a>d&&(d=a),f>d&&(d=f),u=d,l=(u-l)*i+l,o.push(100*l/s[h])}return o}))}nvi(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];let r=1e3;n.push(r);for(let o=1;o<s;++o)e[o]<e[o-1]&&(r+=(t[o]-t[o-1])/t[o-1]*r),n.push(r);return n}))}obv(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];let r=0;n.push(r);let o=t[0];for(let i=1;i<s;++i)t[i]>o?r+=e[i]:t[i]<o&&(r-=e[i]),o=t[i],n.push(r);return n}))}ppo(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[0]=NaN;const o=2/(e+1),i=2/(s+1);let u=t[0],h=t[0];for(let e=1;e<n;++e){u=(t[e]-u)*o+u,h=(t[e]-h)*i+h;const s=100*(u-h)/h;r.push(s)}return r}))}psar(t,s,n,r){return e(this,arguments,void 0,(function*(t,e,s,n,r=t.length){const o=[];let i,u,h;o[0]=NaN,i=t[0]+e[0]<=t[1]+e[1]?1:0,i?(h=t[0],u=e[0]):(h=e[0],u=t[0]);let l=s;for(let c=1;c<r;++c)u=(h-u)*l+u,i?(c>=2&&u>e[c-2]&&(u=e[c-2]),u>e[c-1]&&(u=e[c-1]),l<n&&t[c]>h&&(l+=s,l>n&&(l=n)),t[c]>h&&(h=t[c])):(c>=2&&u<t[c-2]&&(u=t[c-2]),u<t[c-1]&&(u=t[c-1]),l<n&&e[c]<h&&(l+=s,l>n&&(l=n)),e[c]<h&&(h=e[c])),(i&&e[c]<u||!i&&t[c]>u)&&(l=s,u=h,i=!i,h=i?t[c]:e[c]),o.push(u);return o}))}pvi(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];let r=1e3;n.push(r);for(let o=1;o<s;++o)e[o]>e[o-1]&&(r+=(t[o]-t[o-1])/t[o-1]*r),n.push(r);return n}))}qstick(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=e.length){const r=[];r[s-1]=NaN;const o=1/s;let i,u=0;for(i=0;i<s;++i)u+=e[i]-t[i];for(r.push(u*o),i=s;i<n;++i)u+=e[i]-t[i],u-=e[i-s]-t[i-s],r.push(u*o);return r}))}roc(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-1]=NaN;for(let r=e;r<s;++r)n.push((t[r]-t[r-e])/t[r-e]);return n}))}rocr(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-1]=NaN;for(let r=e;r<s;++r)n.push(t[r]/t[r-e]);return n}))}rsi(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-1]=NaN;const r=1/e;let o=0,i=0;for(let s=1;s<=e;++s)o+=t[s]>t[s-1]?t[s]-t[s-1]:0,i+=t[s]<t[s-1]?t[s-1]-t[s]:0;o/=e,i/=e,n.push(o/(o+i)*100);for(let u=e+1;u<s;++u)o=((t[u]>t[u-1]?t[u]-t[u-1]:0)-o)*r+o,i=((t[u]<t[u-1]?t[u-1]-t[u]:0)-i)*r+i,n.push(o/(o+i)*100);return n}))}sma(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;const r=1/e;let o=0;for(let s=0;s<e;++s)o+=t[s];n.push(o*r);for(let i=e;i<s;++i)o+=t[i],o-=t[i-e],n.push(o*r);return n}))}stddev(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;const r=1/e;let o=0,i=0;for(let s=0;s<e;++s)o+=t[s],i+=t[s]*t[s];let u=i*r-o*r*(o*r);u>0&&(u=Math.sqrt(u)),n.push(u);for(let u=e;u<s;++u){o+=t[u],i+=t[u]*t[u],o-=t[u-e],i-=t[u-e]*t[u-e];let s=i*r-o*r*(o*r);s>0&&(s=Math.sqrt(s)),n.push(s)}return n}))}stderr(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;const r=1/e;let o=0,i=0;const u=1/Math.sqrt(e);for(let s=0;s<e;++s)o+=t[s],i+=t[s]*t[s];let h=i*r-o*r*(o*r);h>0&&(h=Math.sqrt(h)),n.push(u*h);for(let h=e;h<s;++h){o+=t[h],i+=t[h]*t[h],o-=t[h-e],i-=t[h-e]*t[h-e];let s=i*r-o*r*(o*r);s>0&&(s=Math.sqrt(s)),n.push(u*s)}return n}))}stoch(t,s,n,r,o,i){return e(this,arguments,void 0,(function*(t,e,s,n,r,o,i=t.length){const u=1/r,h=1/o,l=[],c=[];l[n+r+o-3-1]=NaN,c[n+r+o-3-1]=NaN;let a,f=0,d=-1,p=-1,N=t[0],v=e[0];const x={size:r,index:0,pushes:0,sum:0,vals:[]},g={size:o,index:0,pushes:0,sum:0,vals:[]};let m;for(let M=0;M<i;++M){if(M>=n&&++f,a=t[M],d<f)for(d=f,N=t[d],m=f;++m<=M;)a=t[m],a>=N&&(N=a,d=m);else a>=N&&(d=M,N=a);if(a=e[M],p<f)for(p=f,v=e[p],m=f;++m<=M;)a=e[m],a<=v&&(v=a,p=m);else a<=v&&(p=M,v=a);const i=N-v,z=0==i?0:(s[M]-v)/i*100;if(x.pushes>=x.size&&(x.sum-=x.vals[x.index]),x.sum+=z,x.vals[x.index]=z,x.pushes+=1,x.index=x.index+1,x.index>=x.size&&(x.index=0),M>=n-1+r-1){const t=x.sum*u;g.pushes>=g.size&&(g.sum-=g.vals[g.index]),g.sum+=t,g.vals[g.index]=t,g.pushes+=1,g.index=g.index+1,g.index>=g.size&&(g.index=0),M>=n-1+r-1+o-1&&(l.push(t),c.push(g.sum*h))}}return[l,c]}))}stochrsi(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[2*e-2]=NaN;const r=1/e,o={size:e,index:0,pushes:0,sum:0,vals:[]};let i=0,u=0;for(let s=1;s<=e;++s)i+=t[s]>t[s-1]?t[s]-t[s-1]:0,u+=t[s]<t[s-1]?t[s-1]-t[s]:0;i/=e,u/=e;let h=i/(i+u)*100;o.pushes>=o.size&&(o.sum-=o.vals[o.index]),o.sum+=h,o.vals[o.index]=h,o.pushes+=1,o.index=o.index+1,o.index>=o.size&&(o.index=0);let l=h,c=h,a=0,f=0;for(let d=e+1;d<s;++d){if(i=((t[d]>t[d-1]?t[d]-t[d-1]:0)-i)*r+i,u=((t[d]<t[d-1]?t[d-1]-t[d]:0)-u)*r+u,h=i/(i+u)*100,h>c)c=h,f=o.index;else if(f==o.index){c=h;for(let t=0;t<o.size;++t)t!=o.index&&o.vals[t]>c&&(c=o.vals[t],f=t)}if(h<l)l=h,a=o.index;else if(a==o.index){l=h;for(let t=0;t<o.size;++t)t!=o.index&&o.vals[t]<l&&(l=o.vals[t],a=t)}if(o.vals[o.index]=h,o.index=o.index+1,o.index>=o.size&&(o.index=0),d>2*e-2){const t=c-l;0==t?n.push(0):n.push((h-l)/t)}}return n}))}sum(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;let r=0;for(let s=0;s<e;++s)r+=t[s];n.push(r);for(let o=e;o<s;++o)r+=t[o],r-=t[o-e],n.push(r);return n}))}tema(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[3*(e-1)-1]=NaN;const r=2/(e+1),o=1-r;let i=t[0],u=0,h=0;for(let l=0;l<s;++l)i=i*o+t[l]*r,l==e-1&&(u=i),l>=e-1&&(u=u*o+i*r,l==2*(e-1)&&(h=u),l>=2*(e-1)&&(h=h*o+u*r,l>=3*(e-1)&&n.push(3*i-3*u+h)));return n}))}tr(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];let o;r[0]=t[0]-e[0];for(let i=1;i<n;++i){const n=e[i],u=t[i],h=s[i-1],l=Math.abs(u-h),c=Math.abs(n-h);let a=u-n;l>a&&(a=l),c>a&&(a=c),o=a,r.push(o)}return r}))}trima(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;const r=1/(e%2?(e/2+1)*(e/2+1):e/2*(e/2+1));let o=0,i=0,u=0;const h=e%2?e/2:e/2-1,l=h+1;let c=1;for(let s=0;s<e-1;++s)o+=t[s]*c,s+1>e-h&&(i+=t[s]),s+1<=l&&(u+=t[s]),s+1<l&&++c,s+1>=e-h&&--c;let a=e-1-h+1,f=e-1-e+1+l,d=e-1-e+1;for(let h=e-1;h<s;++h)o+=t[h],n.push(o*r),i+=t[h],o+=i,o-=u,i-=t[a++],u+=t[f++],u-=t[d++];return n}))}trix(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[3*(e-1)+1-1]=NaN;const r=3*e-2,o=2/(e+1);let i=t[0],u=0,h=0;for(let s=1;s<r;++s)i=(t[s]-i)*o+i,s==e-1?u=i:s>e-1&&(u=(i-u)*o+u,s==2*e-2?h=u:s>2*e-2&&(h=(u-h)*o+h));for(let e=r;e<s;++e){i=(t[e]-i)*o+i,u=(i-u)*o+u;const s=h;h=(u-h)*o+h,n.push((h-s)/h*100)}return n}))}tsf(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;let r=0,o=0,i=0,u=0;const h=1/e;for(let s=0;s<e-1;++s)r+=s+1,o+=(s+1)*(s+1),u+=t[s]*(s+1),i+=t[s];r+=e,o+=e*e;const l=1/(e*o-r*r);for(let o=e-1;o<s;++o){u+=t[o]*e,i+=t[o];const s=(e*u-r*i)*l,c=(i-s*r)*h;n.push(c+s*(e+1)),u-=i,i-=t[o-e+1]}return n}))}typprice(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];for(let o=0;o<n;++o)r.push((t[o]+e[o]+s[o])*(1/3));return r}))}ultosc(t,s,n,r,o,i){return e(this,arguments,void 0,(function*(t,e,s,n,r,o,i=t.length){const u=[];u[o-1]=NaN;const h={size:o,index:0,pushes:0,sum:0,vals:[]},l={size:o,index:0,pushes:0,sum:0,vals:[]};let c=0,a=0,f=0,d=0;for(let p=1;p<i;++p){const i=e[p]<s[p-1]?e[p]:s[p-1],N=t[p]>s[p-1]?t[p]:s[p-1],v=s[p]-i,x=N-i;if(c+=v,a+=v,f+=x,d+=x,h.pushes>=h.size&&(h.sum-=h.vals[h.index]),h.sum+=v,h.vals[h.index]=v,h.pushes+=1,h.index=h.index+1,h.index>=h.size&&(h.index=0),l.pushes>=l.size&&(l.sum-=l.vals[l.index]),l.sum+=x,l.vals[l.index]=x,l.pushes+=1,l.index=l.index+1,l.index>=l.size&&(l.index=0),p>n){let t=h.index-n-1;if(t<0&&(t+=o),c-=h.vals[t],f-=l.vals[t],p>r){let t=h.index-r-1;t<0&&(t+=o),a-=h.vals[t],d-=l.vals[t]}}if(p>=o){const t=100*(4*c/f+2*a/d+1*h.sum/l.sum)/7;u.push(t)}}return u}))}var(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;const r=1/e;let o=0,i=0;for(let s=0;s<e;++s)o+=t[s],i+=t[s]*t[s];n.push(i*r-o*r*(o*r));for(let u=e;u<s;++u)o+=t[u],i+=t[u]*t[u],o-=t[u-e],i-=t[u-e]*t[u-e],n.push(i*r-o*r*(o*r));return n}))}vhf(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-1]=NaN;let r,o,i,u=1,h=-1,l=-1,c=t[0],a=t[0],f=0,d=t[0];for(let s=1;s<e;++s)o=t[s],f+=Math.abs(o-d),d=o;for(let p=e;p<s;++p,++u){if(o=t[p],f+=Math.abs(o-d),d=o,p>e&&(f-=Math.abs(t[p-e]-t[p-e-1])),r=o,h<u)for(h=u,c=t[h],i=u;++i<=p;)r=t[i],r>=c&&(c=r,h=i);else r>=c&&(h=p,c=r);if(r=o,l<u)for(l=u,a=t[l],i=u;++i<=p;)r=t[i],r<=a&&(a=r,l=i);else r<=a&&(l=p,a=r);n.push(Math.abs(c-a)/f)}return n}))}vidya(t,s,n,r){return e(this,arguments,void 0,(function*(t,e,s,n,r=t.length){const o=[];o[s-3]=NaN;const i=1/e,u=1/s;let h=0,l=0,c=0,a=0;for(let n=0;n<s;++n)c+=t[n],a+=t[n]*t[n],n>=s-e&&(h+=t[n],l+=t[n]*t[n]);let f=t[s-2];if(o.push(f),s-1<r){let e=Math.sqrt(l*i-h*i*(h*i))/Math.sqrt(a*u-c*u*(c*u));e!=e&&(e=0),e*=n,f=(t[s-1]-f)*e+f,o.push(f)}for(let d=s;d<r;++d){c+=t[d],a+=t[d]*t[d],h+=t[d],l+=t[d]*t[d],c-=t[d-s],a-=t[d-s]*t[d-s],h-=t[d-e],l-=t[d-e]*t[d-e];let r=Math.sqrt(l*i-h*i*(h*i))/Math.sqrt(a*u-c*u*(c*u));r!=r&&(r=0),r*=n,f=(t[d]-f)*r+f,o.push(f)}return o}))}volatility(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-1]=NaN;const r=1/e,o=Math.sqrt(252);let i=0,u=0;for(let s=1;s<=e;++s){const e=t[s]/t[s-1]-1;i+=e,u+=e*e}n.push(Math.sqrt(u*r-i*r*(i*r))*o);for(let h=e+1;h<s;++h){const s=t[h]/t[h-1]-1;i+=s,u+=s*s;const l=t[h-e]/t[h-e-1]-1;i-=l,u-=l*l,n.push(Math.sqrt(u*r-i*r*(i*r))*o)}return n}))}vosc(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[s-2]=NaN;const o=1/e,i=1/s;let u=0,h=0;for(let n=0;n<s;++n)n>=s-e&&(u+=t[n]),h+=t[n];const l=u*o,c=h*i;r.push(100*(l-c)/c);for(let l=s;l<n;++l){u+=t[l],u-=t[l-e],h+=t[l],h-=t[l-s];const n=u*o,c=h*i;r.push(100*(n-c)/c)}return r}))}vwma(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[s-2]=NaN;let o=0,i=0;for(let n=0;n<s;++n)o+=t[n]*e[n],i+=e[n];r.push(o/i);for(let u=s;u<n;++u)o+=t[u]*e[u],o-=t[u-s]*e[u-s],i+=e[u],i-=e[u-s],r.push(o/i);return r}))}wad(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[0]=NaN;let o=0,i=s[0];for(let u=1;u<n;++u){const n=s[u];n>i?o+=n-(i<e[u]?i:e[u]):n<i&&(o+=n-(i>t[u]?i:t[u])),r.push(o),i=s[u]}return r}))}wcprice(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];for(let o=0;o<n;++o)r.push(.25*(t[o]+e[o]+s[o]+s[o]));return r}))}wilders(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;const r=1/e;let o=0;for(let s=0;s<e;++s)o+=t[s];let i=o/e;n.push(i);for(let o=e;o<s;++o)i=(t[o]-i)*r+i,n.push(i);return n}))}willr(t,s,n,r){return e(this,arguments,void 0,(function*(t,e,s,n,r=t.length){const o=[];o[n-2]=NaN;let i,u,h=0,l=-1,c=-1,a=t[0],f=e[0];for(let d=n-1;d<r;++d,++h){if(i=t[d],l<h)for(l=h,a=t[l],u=h;++u<=d;)i=t[u],i>=a&&(a=i,l=u);else i>=a&&(l=d,a=i);if(i=e[d],c<h)for(c=h,f=e[c],u=h;++u<=d;)i=e[u],i<=f&&(f=i,c=u);else i<=f&&(c=d,f=i);const n=a-f,r=0==n?0:(a-s[d])/n*-100;o.push(r)}return o}))}wma(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=[];n[e-2]=NaN;const r=e*(e+1)/2;let o=0,i=0;for(let s=0;s<e-1;++s)i+=t[s]*(s+1),o+=t[s];for(let u=e-1;u<s;++u)i+=t[u]*e,o+=t[u],n.push(i/r),i-=o,o-=t[u-e+1];return n}))}zlema(t,s){return e(this,arguments,void 0,(function*(t,e,s=t.length){const n=Math.floor((e-1)/2),r=[];r[(e-2)/2-2]=NaN;const o=2/(e+1);let i,u=t[n-1];for(r.push(u),i=n;i<s;++i){const e=t[i];u=(e+(e-t[i-n])-u)*o+u,r.push(u)}return r}))}abands(t,s,n,r){return e(this,arguments,void 0,(function*(t,e,s,n,r=t.length){const o=[],i=[],u=[];o[n-2]=NaN,i[n-2]=NaN,u[n-2]=NaN;const h=1/n,l={size:n,index:0,pushes:0,sum:0,vals:[]},c={size:n,index:0,pushes:0,sum:0,vals:[]};let a=0;for(let r=0;r<n;++r){const n=4*(t[r]-e[r])/(t[r]+e[r]),o=(1+n)*t[r];l.pushes>=l.size&&(l.sum-=l.vals[l.index]),l.sum+=o,l.vals[l.index]=o,l.pushes+=1,l.index=l.index+1,l.index>=l.size&&(l.index=0);const i=(1-n)*e[r];c.pushes>=c.size&&(c.sum-=c.vals[c.index]),c.sum+=i,c.vals[c.index]=i,c.pushes+=1,c.index=c.index+1,c.index>=c.size&&(c.index=0),a+=s[r]}o.push(l.sum*h),i.push(c.sum*h),u.push(a*h);for(let f=n;f<r;++f){const r=4*(t[f]-e[f])/(t[f]+e[f]),d=(1+r)*t[f];l.pushes>=l.size&&(l.sum-=l.vals[l.index]),l.sum+=d,l.vals[l.index]=d,l.pushes+=1,l.index=l.index+1,l.index>=l.size&&(l.index=0);const p=(1-r)*e[f];c.pushes>=c.size&&(c.sum-=c.vals[c.index]),c.sum+=p,c.vals[c.index]=p,c.pushes+=1,c.index=c.index+1,c.index>=c.size&&(c.index=0),a+=s[f]-s[f-n],o.push(l.sum*h),i.push(c.sum*h),u.push(a*h)}return[o,i,u]}))}alma(t,s,n,r){return e(this,arguments,void 0,(function*(t,e,s,n,r=t.length){const o=[];o[e-2]=NaN;const i=[],u=Math.floor(s*(e-1)),h=e/n;let l=0;for(let t=0;t<e;t++)i[t]=Math.exp(-1*Math.pow(t-u,2)/(2*Math.pow(h,2))),l+=i[t];for(let t=0;t<e;t++)i[t]/=l;for(let s=e-1;s<r;s++){let n=0;for(let r=0;r<e;r++)n+=t[s-e+r+1]*i[r];o.push(n)}return o}))}ce(t,s,n,r,o){return e(this,arguments,void 0,(function*(t,e,s,n,r,o=t.length){const i=[],u=[];i[n-2]=NaN,u[n-2]=NaN;let h,l,c=t[0]-e[0],a=t[0],f=0,d=e[0],p=0;for(let r=1;r<n;++r){const n=e[r],o=t[r],i=s[r-1],u=Math.abs(o-i),N=Math.abs(n-i);let v=o-n;u>v&&(v=u),N>v&&(v=N),h=v,c+=h,a<=(l=t[r])&&(a=l,f=r),d>=(l=e[r])&&(d=l,p=r)}c/=n;const N=(n-1)/n,v=1/n;i.push(a-r*c),u.push(d+r*c);for(let x=n;x<o;++x){const o=e[x],g=t[x],m=s[x-1],M=Math.abs(g-m),z=Math.abs(o-m);let b=g-o;if(M>b&&(b=M),z>b&&(b=z),h=b,c=c*N+h*v,a<=(l=t[x]))a=l,f=x;else if(f==x-n){a=t[x-n+1],f=x-n+1;for(let e=x-n+2;e<=x;++e)a<=(l=t[e])&&(a=l,f=e)}if(d>=(l=e[x]))d=l,p=x;else if(p==x-n){d=e[x-n+1],p=x-n+1;for(let t=x-n+2;t<=x;++t)d>=(l=e[t])&&(d=l,p=t)}i.push(a-r*c),u.push(d+r*c)}return[i,u]}))}cmf(t,s,n,r,o){return e(this,arguments,void 0,(function*(t,e,s,n,r,o=t.length){const i=[];i[r-2]=NaN;let u=0,h=0;for(let o=0;o<r-1;++o)h+=t[o]-e[o]?n[o]*(s[o]-e[o]-(t[o]-s[o]))/(t[o]-e[o]):0,u+=n[o];for(let l=r-1;l<o;++l)h+=t[l]-e[l]?n[l]*(s[l]-e[l]-(t[l]-s[l]))/(t[l]-e[l]):0,u+=n[l],i.push(h/u),h-=t[l-r+1]-e[l-r+1]?n[l-r+1]*(s[l-r+1]-e[l-r+1]-(t[l-r+1]-s[l-r+1]))/(t[l-r+1]-e[l-r+1]):0,u-=n[l-r+1];return i}))}copp(t,s,n){return e(this,void 0,void 0,(function*(){const e=new Array(t.length),r=new Array(t.length),o=new Array(t.length);for(let i=0;i<t.length;i++)e[i]=i<s-1?null:(t[i]-t[i-s])/t[i-s]*100,r[i]=i<n-1?null:(t[i]-t[i-n])/t[i-n]*100,o[i]=10*(e[i]+r[i]);return o}))}dc(t,s,n){return e(this,void 0,void 0,(function*(){const e=[],r=[],o=[];e[n-2]=NaN,r[n-2]=NaN,o[n-2]=NaN;for(let i=n-1;i<t.length;i++)e.push(Math.max(...t.slice(i-n+1,i+1))),r.push(Math.min(...s.slice(i-n+1,i+1))),o.push((e[e.length-1]+r[r.length-1])/2);return[e,o,r]}))}fi(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[0]=NaN;const o=2/(s+1);let i=e[1]*(t[1]-t[0]);for(let s=1;s<n;++s)i=(e[s]*(t[s]-t[s-1])-i)*o+i,r.push(i);return r}))}ikhts(){return e(this,void 0,void 0,(function*(){}))}kc(t,s,n,r,o){return e(this,arguments,void 0,(function*(t,e,s,n,r,o=t.length){const i=[],u=[],h=[],l=2/(n+1);let c=s[0],a=t[0]-e[0];i.push(c-r*a),u.push(c),h.push(c+r*a);let f=0;for(let n=1;n<o;++n){c=(s[n]-c)*l+c;const o=e[n],d=t[n],p=s[n-1],N=Math.abs(d-p),v=Math.abs(o-p);let x=d-o;N>x&&(x=N),v>x&&(x=v),f=x,a=(f-a)*l+a,i.push(c-r*a),u.push(c),h.push(c+r*a)}return[i,u,h]}))}kst(t,s,n,r,o,i,u,h,l){return e(this,arguments,void 0,(function*(t,e,s,n,r,o,i,u,h,l=t.length){const c=[],a=[];c[r-1]=NaN,a[r-1]=NaN;let f=o;f<i&&(f=i),f<u&&(f=u),f<h&&(f=h);const d=2/(o+1),p=2/(i+1),N=2/(u+1),v=2/(h+1);function x(e,s){return(t[e]-t[e-s])/t[e-s]}let g=x(e,e),m=x(s,s),M=x(n,n),z=x(r,r);for(let t=e+1;t<r+1&&t<l;++t)g=(x(t,e)-g)*d+g;for(let t=s+1;t<r+1&&t<l;++t)m=(x(t,s)-m)*p+m;for(let t=n+1;t<r+1&&t<l;++t)M=(x(t,n)-M)*N+M;for(let t=r+1;t<r+1&&t<l;++t)z=(x(t,r)-z)*v+z;let b=(1*g+2*m+3*M+4*z)/10;a.push(b);let q=b;c.push(q);for(let t=r+1;t<l;++t)g=(x(t,e)-g)*d+g,m=(x(t,s)-m)*p+m,M=(x(t,n)-M)*N+M,z=(x(t,r)-z)*v+z,b=(1*g+2*m+3*M+4*z)/10,c.push(b),q=.2*(b-q)+q,a.push(q);return[c,a]}))}mama(){return e(this,void 0,void 0,(function*(){}))}pbands(t,s,n,r){return e(this,arguments,void 0,(function*(t,e,s,n,r=t.length){const o=[],i=[];o[n-2]=NaN,i[n-2]=NaN;let u=0,h=0;const l=n*(n+1)/2,c=n*(n+1)*(2*n+1)/6;let a;for(a=0;a<n;++a)h+=s[a]*(a+1),u+=s[a];--a;const f=(h/n-l/n*u/n)/(c/n-l/n*(l/n));let d=t[a];for(let e=1;e<n;++e)d<t[a-e]+e*f&&(d=t[a-e]+e*f);let p=e[a];for(let t=1;t<n;++t)p>e[a-t]+t*f&&(p=e[a-t]+t*f);for(i.push(d),o.push(p),++a;a<r;++a){h+=-u+s[a]*n,u+=-s[a-n]+s[a];const r=(h/n-l/n*u/n)/(c/n-l/n*(l/n));let f=t[a];for(let e=1;e<n;++e)f<t[a-e]+e*r&&(f=t[a-e]+e*r);let d=e[a];for(let t=1;t<n;++t)d>e[a-t]+t*r&&(d=e[a-t]+t*r);o.push(d),i.push(f)}return[o,i]}))}pc(){return e(this,void 0,void 0,(function*(){}))}pfe(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[e-1]=NaN;const o=2/(s+1),i={size:e,index:0,pushes:0,sum:0,vals:[]};let u;for(u=1;u<e;++u)i.pushes>=i.size&&(i.sum-=i.vals[i.index]),i.sum+=Math.sqrt(Math.pow(t[u]-t[u-1],2)+1),i.vals[i.index]=Math.sqrt(Math.pow(t[u]-t[u-1],2)+1),i.pushes+=1,i.index=i.index+1,i.index>=i.size&&(i.index=0);i.pushes>=i.size&&(i.sum-=i.vals[i.index]),i.sum+=Math.sqrt(Math.pow(t[u]-t[u-1],2)+1),i.vals[i.index]=Math.sqrt(Math.pow(t[u]-t[u-1],2)+1),i.pushes+=1,i.index=i.index+1,i.index>=i.size&&(i.index=0);let h=100*(t[u]-t[u-e]>0?1:-1)*Math.sqrt(Math.pow(t[u]-t[u-e],2)+100)/i.sum;for(r.push(h),u=e+1;u<n;++u)i.pushes>=i.size&&(i.sum-=i.vals[i.index]),i.sum+=Math.sqrt(Math.pow(t[u]-t[u-1],2)+1),i.vals[i.index]=Math.sqrt(Math.pow(t[u]-t[u-1],2)+1),i.pushes+=1,i.index=i.index+1,i.index>=i.size&&(i.index=0),h=(100*(t[u]-t[u-e]>0?1:-1)*Math.sqrt(Math.pow(t[u]-t[u-e],2)+100)/i.sum-h)*o+h,r.push(h);return r}))}posc(t,s,n,r,o){return e(this,arguments,void 0,(function*(t,e,s,n,r,o=t.length){const i=[];i[n-2]=NaN;let u,h=0,l=0;const c=n*(n+1)/2,a=n*(n+1)*(2*n+1)/6;let f;for(f=0;f<n;++f)l+=s[f]*(f+1),h+=s[f];--f;const d=(l/n-c/n*h/n)/(a/n-c/n*(c/n));let p=t[f];for(let e=1;e<n;++e)p<t[f-e]+e*d&&(p=t[f-e]+e*d);let N=e[f];for(let t=1;t<n;++t)N>e[f-t]+t*d&&(N=e[f-t]+t*d);for(u=(s[f]-N)/(p-N)*100,i.push(u),++f;f<o;++f){l+=-h+s[f]*n,h+=-s[f-n]+s[f];const o=(l/n-c/n*h/n)/(a/n-c/n*(c/n));let d=t[f];for(let e=1;e<n;++e)d<t[f-e]+e*o&&(d=t[f-e]+e*o);let p=e[f];for(let t=1;t<n;++t)p>e[f-t]+t*o&&(p=e[f-t]+t*o);u=2*((s[f]-p)/(d-p)*100-u)/(1+r)+u,i.push(u)}return i}))}rmi(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];let o,i;r[s-1]=NaN;let u=s;for(o=0>t[u]-t[u-s]?0:t[u]-t[u-s],i=0>t[u-s]-t[u]?0:t[u-s]-t[u],++u,r.push(o/(o+i)*100);u<n;++u)o=2*(0>t[u]-t[u-s]?0:t[u]-t[u-s]-o)/(1+e)+o,i=2*(0>t[u-s]-t[u]?0:t[u-s]-t[u]-i)/(1+e)+i,r.push(o/(o+i)*100);return r}))}rmta(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[e-2]=NaN;const o=1-s;let i=(1-o)*t[0]+t[0],u=(1-o)*t[0]+o*(t[0]+i);for(let s=1;s<e-1;++s){const e=(1-o)*i+t[s];u=(1-o)*u+o*(t[s]+e-i),i=e}for(let s=e-1;s<n;++s){const e=(1-o)*i+t[s];u=(1-o)*u+o*(t[s]+e-i),i=e,r.push(u)}return r}))}rvi(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[s-2]=NaN;let o=0,i=0;const u=s*(s+1)/2,h=s*(s+1)*(2*s+1)/6;let l=0,c=0,a=0;for(;a<s;++a)i+=t[a]*(a+1),o+=t[a];--a;const f=(i/s-u/s*o/s)/(h/s-u/s*(u/s)),d=o/s-f*u/s,p=t[a]-(d+f*s);for(p>0?l=p*p/s:c=p*p/s,l+c==0?r.push(50):r.push(l/(l+c)*100),++a;a<n;++a){i+=-o+t[a]*s,o+=-t[a-s]+t[a];const n=(i/s-u/s*o/s)/(h/s-u/s*(u/s)),f=o/s-n*u/s,d=t[a]-(f+n*s);d>0?l=2*(d*d/s-l)/(e+1)+l:c=2*(d*d/s-c)/(e+1)+c,l+c==0?r.push(50):r.push(l/(l+c)*100)}return r}))}smi(t,s,n,r,o,i){return e(this,arguments,void 0,(function*(t,e,s,n,r,o,i=t.length){const u=[];u[n-2]=NaN;let h=1-n,l=NaN,c=NaN,a=NaN,f=NaN,d=0,p=0,N=0,v=0,x=0,g=0;for(;g<i&&h==1-n;++g,++h)p=t[g],N=h,d=e[g],v=h;for(;g<i&&h<0;++g,++h)p<=t[g]&&(p=t[g],N=h),d>=e[g]&&(d=e[g],v=h);for(;g<i&&0==h;++g,++h)p<=t[g]&&(p=t[g],N=h),d>=e[g]&&(d=e[g],v=h),l=c=s[g]-.5*(p+d),a=f=p-d,u.push(100*c/(.5*f));for(;g<i;++g,++h){if(N==h-n){p=t[g],N=h;for(let e=1;e<n;++e)x=t[g-e],x>p&&(p=x,N=h-e)}else p<=t[g]&&(p=t[g],N=h);if(v==h-n){d=e[g],v=h;for(let t=1;t<n;++t)x=e[g-t],x<d&&(d=x,v=h-t)}else d>=e[g]&&(d=e[g],v=h);l=(s[g]-.5*(p+d)-l)*(2/(1+r))+l,c=2/(1+o)*(l-c)+c,a=2/(1+r)*(p-d-a)+a,f=2/(1+o)*(a-f)+f,u.push(100*c/(.5*f))}return u}))}tsi(t,s,n){return e(this,arguments,void 0,(function*(t,e,s,n=t.length){const r=[];r[0]=NaN;let o=-1,i=0,u=0,h=0,l=0,c=0,a=0;for(;a<n&&-1==o;++a,++o)i=t[a];for(;a<n&&0==o;++a,++o)h=u=t[a]-i,c=l=Math.abs(t[a]-i),r.push(100*(c?h/c:0)),i=t[a];for(;a<n;++a,++o)u=2*(t[a]-i-u)/(1+e)+u,l=2*(Math.abs(t[a]-i)-l)/(1+e)+l,h=2*(u-h)/(1+s)+h,c=2*(l-c)/(1+s)+c,r.push(100*(c?h/c:0)),i=t[a];return r}))}vwap(t,s,n,r,o){return e(this,arguments,void 0,(function*(t,e,s,n,r,o=t.length){const i=[];i[r-2]=NaN;let u=1-r,h=0,l=0,c=0;for(;c<o&&u<1;++c,++u)h+=(t[c]+e[c]+s[c])/3*n[c],l+=n[c];for(c>0&&1==u&&i.push(h/l);c<o;++c,++u)h+=(t[c]+e[c]+s[c])/3*n[c]-(t[c-r]+e[c-r]+s[c-r])/3*n[c-r],l+=n[c]-n[c-r],i.push(h/l);return i}))}}})();var r=n.q;export{r as IndicatorsNormalized};