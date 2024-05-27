"use strict";
!function (t, e) { "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.indicators = e() : t.indicators = e(); }(self, (() => (() => {
    "use strict";
    var t = { 104: function (t, e, s) { var n = this && this.__awaiter || function (t, e, s, n) { return new (s || (s = Promise))((function (o, r) { function i(t) { try {
            u(n.next(t));
        }
        catch (t) {
            r(t);
        } } function l(t) { try {
            u(n.throw(t));
        }
        catch (t) {
            r(t);
        } } function u(t) { var e; t.done ? o(t.value) : (e = t.value, e instanceof s ? e : new s((function (t) { t(e); }))).then(i, l); } u((n = n.apply(t, e || [])).next()); })); }; Object.defineProperty(e, "__esModule", { value: !0 }), e.Indicators = void 0; const o = s(409); e.Indicators = class {
            constructor() { }
            normalize(t, e, s = NaN) { return n(this, void 0, void 0, (function* () { const n = t - e.length, o = []; for (let t = 0; t < n; ++t)
                o.push(s); return [...o, ...e]; })); }
            floor(t) { return t < 0 ? ~~t - 1 : ~~t; }
            sqrt(t, e = t / 2) { const s = (e + t / e) / 2; return (e > s ? e - s : s - e) < 1e-7 ? s : this.sqrt(t, s); }
            ad(t, e, s, o, r = s.length) { return n(this, void 0, void 0, (function* () { const n = []; let i = 0; for (let l = 0; l < r; ++l) {
                const r = t[l] - e[l];
                0 != r && (i += (s[l] - e[l] - t[l] + s[l]) / r * o[l]), n[l] = i;
            } return n; })); }
            adosc(t, e, s, o, r, i, l = s.length) { return n(this, void 0, void 0, (function* () { const n = i - 1, u = 2 / (r + 1), h = 2 / (i + 1), c = []; let a = 0, f = 0, d = 0; for (let r = 0; r < l; ++r) {
                const i = t[r] - e[r];
                0 != i && (a += (s[r] - e[r] - t[r] + s[r]) / i * o[r]), 0 == r ? (f = a, d = a) : (f = (a - f) * u + f, d = (a - d) * h + d), r >= n && c.push(f - d);
            } return c; })); }
            adx(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = (s - 1) / s, i = 1 / s; let l = 0, u = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), l += s, u += o;
            } let h = 0, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100; h += p; for (let v = s; v < o; ++v) {
                let o = t[v] - t[v - 1], x = e[v - 1] - e[v];
                o < 0 ? o = 0 : o > x && (x = 0), x < 0 ? x = 0 : x > o && (o = 0), l = l * r + o, u = u * r + x, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100, v - s < s - 2 ? h += p : v - s == s - 2 ? (h += p, n.push(h * i)) : (h = h * r + p, n.push(h * i));
            } return n; })); }
            adxr(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = (s - 1) / s, i = 1 / s; let l = 0, u = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), l += s, u += o;
            } let h = 0, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100; h += p; const v = { size: s - 1, pushes: 0, index: 0, vals: [] }, x = 3 * (s - 1); for (let g = s; g < o; ++g) {
                let o = t[g] - t[g - 1], N = e[g - 1] - e[g];
                if (o < 0 ? o = 0 : o > N && (N = 0), N < 0 ? N = 0 : N > o && (o = 0), l = l * r + o, u = u * r + N, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100, g - s < s - 2)
                    h += p;
                else if (g - s == s - 2)
                    h += p, v.vals[v.index] = h * i, v.index = v.index + 1, v.index >= v.size && (v.index = 0);
                else {
                    if (h = h * r + p, g >= x) {
                        const t = v.vals[v.index] + (v.size - 1 + 1) % v.size;
                        n.push(.5 * (h * i + t));
                    }
                    v.vals[v.index] = h * i, v.index = v.index + 1, v.index >= v.size && (v.index = 0);
                }
            } return n; })); }
            ao(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 0, r = 0; const i = 1 / 34; for (let s = 0; s < 34; ++s) {
                const n = .5 * (t[s] + e[s]);
                o += n, s >= 29 && (r += n);
            } n.push(.2 * r - i * o); for (let l = 34; l < s; ++l) {
                const s = .5 * (t[l] + e[l]);
                o += s, r += s, o -= .5 * (t[l - 34] + e[l - 34]), r -= .5 * (t[l - 5] + e[l - 5]), n.push(.2 * r - i * o);
            } return n; })); }
            apo(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = 2 / (e + 1), i = 2 / (s + 1); let l = t[0], u = t[0]; for (let e = 1; e < o; ++e) {
                l = (t[e] - l) * r + l, u = (t[e] - u) * i + u;
                const s = l - u;
                n.push(s);
            } return n; })); }
            aroon(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = [], i = 100 / s; let l, u, h = 0, c = -1, a = -1, f = t[0], d = e[0]; for (let p = s; p < o; ++p, ++h) {
                if (l = t[p], c < h)
                    for (c = h, f = t[c], u = h; ++u <= p;)
                        l = t[u], l >= f && (f = l, c = u);
                else
                    l >= f && (c = p, f = l);
                if (l = e[p], a < h)
                    for (a = h, d = e[a], u = h; ++u <= p;)
                        l = e[u], l <= d && (d = l, a = u);
                else
                    l <= d && (a = p, d = l);
                n[n.length] = (s - (p - a)) * i, r[r.length] = (s - (p - c)) * i;
            } return [n, r]; })); }
            aroonosc(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = 100 / s; let i, l = 0, u = -1, h = -1, c = t[0], a = e[0]; for (let f = s; f < o; ++f, ++l) {
                let s = t[f];
                if (u < l)
                    for (u = l, c = t[u], i = l; ++i <= f;)
                        s = t[i], s >= c && (c = s, u = i);
                else
                    s >= c && (u = f, c = s);
                if (s = e[f], h < l)
                    for (h = l, a = e[h], i = l; ++i <= f;)
                        s = e[i], s <= a && (a = s, h = i);
                else
                    s <= a && (h = f, a = s);
                n.push((u - h) * r);
            } return n; })); }
            atr(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 1 / o; let l, u = 0; u += t[0] - e[0]; for (let n = 1; n < o; ++n) {
                const o = e[n], r = t[n], i = s[n - 1], h = Math.abs(r - i), c = Math.abs(o - i);
                let a = r - o;
                h > a && (a = h), c > a && (a = c), l = a, u += l;
            } let h = u / o; n.push(h); for (let u = o; u < r; ++u) {
                const o = e[u], r = t[u], c = s[u - 1], a = Math.abs(r - c), f = Math.abs(o - c);
                let d = r - o;
                a > d && (d = a), f > d && (d = f), l = d, h = (l - h) * i + h, n.push(h);
            } return n; })); }
            avgprice(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let i = 0; i < r; ++i)
                n.push(.25 * (t[i] + e[i] + s[i] + o[i])); return n; })); }
            bbands(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = [], i = [], l = 1 / e; let u = 0, h = 0; for (let s = 0; s < e; ++s)
                u += t[s], h += t[s] * t[s]; let c = Math.sqrt(h * l - u * l * (u * l)); const a = u * l; n.push(a - s * c), i.push(a + s * c), r.push(a); for (let a = e; a < o; ++a) {
                u += t[a], h += t[a] * t[a], u -= t[a - e], h -= t[a - e] * t[a - e], c = Math.sqrt(h * l - u * l * (u * l));
                const o = u * l;
                i.push(o + s * c), n.push(o - s * c), r.push(o);
            } return [n, r, i]; })); }
            bop(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let i = 0; i < r; ++i) {
                const r = e[i] - s[i];
                n[i] = r <= 0 ? 0 : (o[i] - t[i]) / r;
            } return n; })); }
            cci(t, e, s, r, i = t.length) { return n(this, void 0, void 0, (function* () { const n = 1 / r, l = [], u = new o.ti_buffer(r); let h, c; for (h = 0; h < i; ++h) {
                const o = (t[h] + e[h] + s[h]) * (1 / 3);
                u.push(o);
                const i = u.sum * n;
                if (h >= 2 * r - 2) {
                    let t = 0;
                    for (c = 0; c < r; ++c)
                        t += Math.abs(i - u.vals[c]);
                    let e = t * n;
                    e *= .015, e = (o - i) / e, l.push(e);
                }
            } return l; })); }
            cmo(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 0, r = 0; for (let s = 1; s <= e; ++s)
                o += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, r += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; n.push(100 * (o - r) / (o + r)); for (let i = e + 1; i < s; ++i)
                o -= t[i - e] > t[i - e - 1] ? t[i - e] - t[i - e - 1] : 0, r -= t[i - e] < t[i - e - 1] ? t[i - e - 1] - t[i - e] : 0, o += t[i] > t[i - 1] ? t[i] - t[i - 1] : 0, r += t[i] < t[i - 1] ? t[i - 1] - t[i] : 0, n.push(100 * (o - r) / (o + r)); return n; })); }
            crossany(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = 0; o < s; ++o)
                n.push(t[o] > e[o] && t[o - 1] <= e[o - 1] || t[o] < e[o] && t[o - 1] >= e[o - 1]); return n; })); }
            crossover(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = 0; o < s; ++o)
                n.push(t[o] > e[o] && t[o - 1] <= e[o - 1]); return n; })); }
            crossOverNumber(t, e) { const s = []; for (let n = 0; n < t.length; n++) {
                const o = t[n], r = t[n - 1];
                o > e && r <= e ? s.push(!0) : s.push(!1);
            } return s; }
            crossUnderNumber(t, e) { const s = []; for (let n = 0; n < t.length; n++) {
                const o = t[n], r = t[n - 1];
                o < e && r >= e ? s.push(!0) : s.push(!1);
            } return s; }
            cvi(t, e, s, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 2 / (s + 1), l = new o.ti_buffer(s); let u, h = t[0] - e[0]; for (u = 1; u < 2 * s - 1; ++u)
                h = (t[u] - e[u] - h) * i + h, l.qpush(h); for (u = 2 * s - 1; u < r; ++u) {
                h = (t[u] - e[u] - h) * i + h;
                const s = l.vals[l.index];
                n.push(100 * (h - s) / s), l.qpush(h);
            } return n; })); }
            _cvi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = 2 / (s + 1), i = { size: s, index: 0, pushes: 0, vals: [] }; let l = t[0] - e[0]; for (let n = 1; n < 2 * s - 1; ++n)
                l = (t[n] - e[n] - l) * r + l, i.vals[i.index] = l, i.index = i.index + 1, i.index >= i.size && (i.index = 0); for (let u = 2 * s - 1; u < o; ++u) {
                l = (t[u] - e[u] - l) * r + l;
                const s = i.vals[i.index];
                n.push(100 * (l - s) / s), i.vals[i.index] = l, i.index = i.index + 1, i.index >= i.size && (i.index = 0);
            } return n; })); }
            decay(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 / e; n.push(t[0]); for (let e = 1; e < s; ++e) {
                const s = n[n.length - 1] - o;
                n.push(t[e] > s ? t[e] : s);
            } return n; })); }
            dema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 2 / (e + 1), r = 1 - o; let i = t[0], l = i; for (let u = 0; u < s; ++u)
                i = i * r + t[u] * o, u == e - 1 && (l = i), u >= e - 1 && (l = l * r + i * o, u >= 2 * (e - 1) && n.push(2 * i - l)); return n; })); }
            di(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = [], l = (o - 1) / o; let u = 0, h = 0, c = 0; for (let n = 1; n < o; ++n) {
                const o = e[n], r = t[n], i = s[n - 1], l = Math.abs(r - i), a = Math.abs(o - i);
                let f = r - o;
                l > f && (f = l), a > f && (f = a), u += f;
                let d = t[n] - t[n - 1], p = e[n - 1] - e[n];
                d < 0 ? d = 0 : d > p && (p = 0), p < 0 ? p = 0 : p > d && (d = 0), h += d, c += p;
            } n.push(100 * h / u), i.push(100 * c / u); for (let a = o; a < r; ++a) {
                const o = e[a], r = t[a], f = s[a - 1], d = Math.abs(r - f), p = Math.abs(o - f);
                let v = r - o;
                d > v && (v = d), p > v && (v = p), u = u * l + v;
                let x = t[a] - t[a - 1], g = e[a - 1] - e[a];
                x < 0 ? x = 0 : x > g && (g = 0), g < 0 ? g = 0 : g > x && (x = 0), h = h * l + x, c = c * l + g, n.push(100 * h / u), i.push(100 * c / u);
            } return [n, i]; })); }
            dm(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = [], i = (s - 1) / s; let l = 0, u = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), l += s, u += o;
            } n.push(l), r.push(u); for (let h = s; h < o; ++h) {
                let s = t[h] - t[h - 1], o = e[h - 1] - e[h];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), l = l * i + s, u = u * i + o, n.push(l), r.push(u);
            } return [n, r]; })); }
            dpo(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = e / 2 + 1, o = [], r = 1 / e; let i = 0; for (let s = 0; s < e; ++s)
                i += t[s]; o.push(t[e - 1 - n] - i * r); for (let l = e; l < s; ++l)
                i += t[l], i -= t[l - e], o.push(t[l - n] - i * r); return o; })); }
            dx(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = (s - 1) / s; let i = 0, l = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), i += s, l += o;
            } let u = i, h = l, c = Math.abs(u - h), a = u + h, f = c / a * 100; n.push(f); for (let d = s; d < o; ++d) {
                let s = t[d] - t[d - 1], o = e[d - 1] - e[d];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), i = i * r + s, l = l * r + o, u = i, h = l, c = Math.abs(u - h), a = u + h, f = c / a * 100, n.push(f);
            } return n; })); }
            edecay(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 - 1 / e; n.push(t[0]); for (let e = 1; e < s; ++e) {
                const s = n[n.length - 1] * o;
                n.push(t[e] > s ? t[e] : s);
            } return n; })); }
            ema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 2 / (e + 1); let r = t[0]; n.push(r); for (let e = 1; e < s; ++e)
                r = (t[e] - r) * o + r, n.push(r); return n; })); }
            emv(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let r = .5 * (t[0] + e[0]); for (let i = 1; i < o; ++i) {
                const o = .5 * (t[i] + e[i]), l = s[i] / 1e4 / (t[i] - e[i]);
                n.push((o - r) / l), r = o;
            } return n; })); }
            fisher(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = []; let i, l, u = 0, h = -1, c = -1, a = .5 * (t[0] + e[0]), f = .5 * (t[0] + e[0]), d = 0, p = 0; for (let v = s - 1; v < o; ++v, ++u) {
                if (i = .5 * (t[v] + e[v]), h < u)
                    for (h = u, a = .5 * (t[h] + e[h]), l = u; ++l <= v;)
                        i = .5 * (t[l] + e[l]), i >= a && (a = i, h = l);
                else
                    i >= a && (h = v, a = i);
                if (i = .5 * (t[v] + e[v]), c < u)
                    for (c = u, f = .5 * (t[c] + e[c]), l = u; ++l <= v;)
                        i = .5 * (t[l] + e[l]), i <= f && (f = i, c = l);
                else
                    i <= f && (c = v, f = i);
                let s = a - f;
                0 == s && (s = .001), d = .66 * ((.5 * (t[v] + e[v]) - f) / s - .5) + .67 * d, d > .99 && (d = .999), d < -.99 && (d = -.999), r.push(p), p = .5 * Math.log((1 + d) / (1 - d)) + .5 * p, n.push(p);
            } return [n, r]; })); }
            fosc(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; let h = 0; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const c = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * c, a = (i - s * o) * u;
                r >= e && n.push(100 * (t[r] - h) / t[r]), h = a + s * (e + 1), l -= i, i -= t[r - e + 1];
            } return n; })); }
            DEP_hma(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = this.floor(e / 2), r = this.floor(this.sqrt(e)), i = e * (e + 1) / 2, l = o * (o + 1) / 2, u = r * (r + 1) / 2; let h, c = 0, a = 0, f = 0, d = 0, p = 0, v = 0; for (h = 0; h < e - 1; ++h)
                a += t[h] * (h + 1), c += t[h], h >= e - o && (d += t[h] * (h + 1 - (e - o)), f += t[h]); const x = { size: r, pushes: 0, index: 0, vals: [] }; for (h = e - 1; h < s; ++h) {
                a += t[h] * e, c += t[h], d += t[h] * o, f += t[h];
                const s = d / l * 2 - a / i;
                v += s * r, p += s, x.vals[x.index] = s, x.index = x.index + 1, x.index >= x.size && (x.index = 0), h >= e - 1 + (r - 1) ? (n.push(v / u), v -= p, p -= x.vals[x.index] + (x.size - 1 + 1) % x.size) : v -= p, a -= c, c -= t[h - e + 1], d -= f, f -= t[h - o + 1];
            } return n; })); }
            hma(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = Math.floor(e / 2), i = Math.floor(Math.sqrt(e)), l = e * (e + 1) / 2, u = r * (r + 1) / 2, h = i * (i + 1) / 2; let c, a = 0, f = 0, d = 0, p = 0, v = 0, x = 0; for (c = 0; c < e - 1; ++c)
                f += t[c] * (c + 1), a += t[c], c >= e - r && (p += t[c] * (c + 1 - (e - r)), d += t[c]); const g = new o.ti_buffer(i); for (c = e - 1; c < s; ++c) {
                f += t[c] * e, a += t[c], p += t[c] * r, d += t[c];
                const s = p / u * 2 - f / l;
                x += s * i, v += s, g.qpush(s), c >= e - 1 + (i - 1) ? (n.push(x / h), x -= v, v -= g.get(1)) : x -= v, f -= a, a -= t[c - e + 1], p -= d, d -= t[c - r + 1];
            } return n; })); }
            kama(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 0; for (let s = 1; s < e; ++s)
                o += Math.abs(t[s] - t[s - 1]); let r, i, l = t[e - 1]; n.push(l); for (let u = e; u < s; ++u)
                o += Math.abs(t[u] - t[u - 1]), u > e && (o -= Math.abs(t[u - e] - t[u - e - 1])), r = 0 != o ? Math.abs(t[u] - t[u - e]) / o : 1, i = Math.pow(.6021505376344085 * r + .06451612903225806, 2), l += i * (t[u] - l), n.push(l); return n; })); }
            kvo(t, e, s, o, r, i, l = t.length) { return n(this, void 0, void 0, (function* () { const n = 2 / (r + 1), u = 2 / (i + 1), h = []; let c = 0, a = t[0] + e[0] + s[0], f = -1, d = 0, p = 0; for (let r = 1; r < l; ++r) {
                const i = t[r] + e[r] + s[r], l = t[r] - e[r];
                i > a && 1 != f ? (f = 1, c = t[r - 1] - e[r - 1]) : i < a && 0 != f && (f = 0, c = t[r - 1] - e[r - 1]), c += l;
                const v = o[r] * Math.abs(l / c * 2 - 1) * 100 * (f ? 1 : -1);
                1 == r ? (d = v, p = v) : (d = (v - d) * n + d, p = (v - p) * u + p), h.push(d - p), a = i;
            } return h; })); }
            lag(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = e; o < s; ++o)
                n.push(t[o - e]); return n; })); }
            linreg(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const h = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * h, c = (i - s * o) * u;
                n.push(c + s * e), l -= i, i -= t[r - e + 1];
            } return n; })); }
            linregintercept(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const h = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * h, c = (i - s * o) * u;
                n.push(c + 1 * s), l -= i, i -= t[r - e + 1];
            } return n; })); }
            linregslope(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 0, r = 0, i = 0, l = 0; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const u = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * u;
                n.push(s), l -= i, i -= t[r - e + 1];
            } return n; })); }
            macd(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = [], l = [], u = 2 / (e + 1), h = 2 / (s + 1), c = 2 / (o + 1); let a = t[0], f = t[0], d = 0; for (let e = 1; e < r; ++e) {
                a = (t[e] - a) * u + a, f = (t[e] - f) * h + f;
                const o = a - f;
                e == s - 1 && (d = o), e >= s - 1 && (d = (o - d) * c + d, n.push(o), i.push(d), l.push(o - d));
            } return [n, i, l]; })); }
            marketfi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let r = 0; r < o; ++r)
                n.push((t[r] - e[r]) / s[r]); return n; })); }
            mass(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let r = t[0] - e[0], i = r; const l = { index: 0, pushes: 0, size: s, sum: 0, vals: [] }; for (let u = 0; u < o; ++u)
                r = .8 * r + .2 * (t[u] - e[u]), 8 == u && (i = r), u >= 8 && (i = .8 * i + .2 * r, u >= 16 && (l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += r / i, l.vals[l.index] = r / i, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0), u >= 16 + s - 1 && n.push(l.sum))); return n; })); }
            max(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o, r = 0, i = -1, l = t[0]; for (let u = e - 1; u < s; ++u, ++r) {
                let e = t[u];
                if (i < r)
                    for (i = r, l = t[i], o = r; ++o <= u;)
                        e = t[o], e >= l && (l = e, i = o);
                else
                    e >= l && (i = u, l = e);
                n.push(l);
            } return n; })); }
            md(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 / e; let r, i = 0; for (let l = 0; l < s; ++l) {
                i += t[l], l >= e && (i -= t[l - e]);
                const s = i * o;
                if (l >= e - 1) {
                    let i = 0;
                    for (r = 0; r < e; ++r)
                        i += Math.abs(s - t[l - r]);
                    n.push(i * o);
                }
            } return n; })); }
            medprice(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = 0; o < s; ++o)
                n.push(.5 * (t[o] + e[o])); return n; })); }
            mfi(t, e, s, o, r, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let l = (t[0] + e[0] + s[0]) * (1 / 3); const u = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }, h = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }; for (let c = 1; c < i; ++c) {
                const i = (t[c] + e[c] + s[c]) * (1 / 3), a = i * o[c];
                i > l ? (u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += a, u.vals[u.index] = a, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += 0, h.vals[h.index] = 0, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0)) : i < l ? (h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += a, h.vals[h.index] = a, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0), u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += 0, u.vals[u.index] = 0, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0)) : (u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += 0, u.vals[u.index] = 0, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += 0, h.vals[h.index] = 0, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0)), l = i, c >= r && n.push(u.sum / (u.sum + h.sum) * 100);
            } return n; })); }
            min(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o, r = 0, i = -1, l = t[0]; for (let u = e - 1; u < s; ++u, ++r) {
                let e = t[u];
                if (i < r)
                    for (i = r, l = t[i], o = r; ++o <= u;)
                        e = t[o], e <= l && (l = e, i = o);
                else
                    e <= l && (i = u, l = e);
                n.push(l);
            } return n; })); }
            mom(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = e; o < s; ++o)
                n.push(t[o] - t[o - e]); return n; })); }
            msw(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = [], r = 3.1415926, i = 2 * r; let l, u, h, c, a = 0; for (let f = e; f < s; ++f) {
                for (u = 0, h = 0, c = 0; c < e; ++c)
                    a = t[f - c], u += Math.cos(i * c / e) * a, h += Math.sin(i * c / e) * a;
                l = Math.abs(u) > .001 ? Math.atan(h / u) : i / 2 * (h < 0 ? -1 : 1), u < 0 && (l += r), l += r / 2, l < 0 && (l += i), l > i && (l -= i), n.push(Math.sin(l)), o.push(Math.sin(l + r / 4));
            } return [n, o]; })); }
            natr(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 1 / o; let l, u = 0; u += t[0] - e[0]; for (let n = 1; n < o; ++n) {
                const o = e[n], r = t[n], i = s[n - 1], h = Math.abs(r - i), c = Math.abs(o - i);
                let a = r - o;
                h > a && (a = h), c > a && (a = c), l = a, u += l;
            } let h = u / o; n.push(100 * h / s[o - 1]); for (let u = o; u < r; ++u) {
                const o = e[u], r = t[u], c = s[u - 1], a = Math.abs(r - c), f = Math.abs(o - c);
                let d = r - o;
                a > d && (d = a), f > d && (d = f), l = d, h = (l - h) * i + h, n.push(100 * h / s[u]);
            } return n; })); }
            nvi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 1e3; n.push(o); for (let r = 1; r < s; ++r)
                e[r] < e[r - 1] && (o += (t[r] - t[r - 1]) / t[r - 1] * o), n.push(o); return n; })); }
            obv(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 0; n.push(o); let r = t[0]; for (let i = 1; i < s; ++i)
                t[i] > r ? o += e[i] : t[i] < r && (o -= e[i]), r = t[i], n.push(o); return n; })); }
            ppo(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = 2 / (e + 1), i = 2 / (s + 1); let l = t[0], u = t[0]; for (let e = 1; e < o; ++e) {
                l = (t[e] - l) * r + l, u = (t[e] - u) * i + u;
                const s = 100 * (l - u) / u;
                n.push(s);
            } return n; })); }
            psar(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i, l, u; i = t[0] + e[0] <= t[1] + e[1] ? 1 : 0, i ? (u = t[0], l = e[0]) : (u = e[0], l = t[0]); let h = s; for (let c = 1; c < r; ++c)
                l = (u - l) * h + l, i ? (c >= 2 && l > e[c - 2] && (l = e[c - 2]), l > e[c - 1] && (l = e[c - 1]), h < o && t[c] > u && (h += s, h > o && (h = o)), t[c] > u && (u = t[c])) : (c >= 2 && l < t[c - 2] && (l = t[c - 2]), l < t[c - 1] && (l = t[c - 1]), h < o && e[c] < u && (h += s, h > o && (h = o)), e[c] < u && (u = e[c])), (i && e[c] < l || !i && t[c] > l) && (h = s, l = u, i = !i, u = i ? t[c] : e[c]), n.push(l); return n; })); }
            pvi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 1e3; n.push(o); for (let r = 1; r < s; ++r)
                e[r] > e[r - 1] && (o += (t[r] - t[r - 1]) / t[r - 1] * o), n.push(o); return n; })); }
            qstick(t, e, s, o = e.length) { return n(this, void 0, void 0, (function* () { const n = [], r = 1 / s; let i, l = 0; for (i = 0; i < s; ++i)
                l += e[i] - t[i]; for (n.push(l * r), i = s; i < o; ++i)
                l += e[i] - t[i], l -= e[i - s] - t[i - s], n.push(l * r); return n; })); }
            roc(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = e; o < s; ++o)
                n.push((t[o] - t[o - e]) / t[o - e]); return n; })); }
            rocr(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = e; o < s; ++o)
                n.push(t[o] / t[o - e]); return n; })); }
            rsi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 / e; let r = 0, i = 0; for (let s = 1; s <= e; ++s)
                r += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, i += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; r /= e, i /= e, n.push(r / (r + i) * 100); for (let l = e + 1; l < s; ++l)
                r = ((t[l] > t[l - 1] ? t[l] - t[l - 1] : 0) - r) * o + r, i = ((t[l] < t[l - 1] ? t[l - 1] - t[l] : 0) - i) * o + i, n.push(r / (r + i) * 100); return n; })); }
            sma(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 / e; let r = 0; for (let s = 0; s < e; ++s)
                r += t[s]; n.push(r * o); for (let i = e; i < s; ++i)
                r += t[i], r -= t[i - e], n.push(r * o); return n; })); }
            stddev(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 / e; let r = 0, i = 0; for (let s = 0; s < e; ++s)
                r += t[s], i += t[s] * t[s]; let l = i * o - r * o * (r * o); l > 0 && (l = Math.sqrt(l)), n.push(l); for (let l = e; l < s; ++l) {
                r += t[l], i += t[l] * t[l], r -= t[l - e], i -= t[l - e] * t[l - e];
                let s = i * o - r * o * (r * o);
                s > 0 && (s = Math.sqrt(s)), n.push(s);
            } return n; })); }
            stderr(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 / e; let r = 0, i = 0; const l = 1 / Math.sqrt(e); for (let s = 0; s < e; ++s)
                r += t[s], i += t[s] * t[s]; let u = i * o - r * o * (r * o); u > 0 && (u = Math.sqrt(u)), n.push(l * u); for (let u = e; u < s; ++u) {
                r += t[u], i += t[u] * t[u], r -= t[u - e], i -= t[u - e] * t[u - e];
                let s = i * o - r * o * (r * o);
                s > 0 && (s = Math.sqrt(s)), n.push(l * s);
            } return n; })); }
            stoch(t, e, s, o, r, i, l = t.length) { return n(this, void 0, void 0, (function* () { const n = 1 / r, u = 1 / i, h = [], c = []; let a, f = 0, d = -1, p = -1, v = t[0], x = e[0]; const g = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }, N = { size: i, index: 0, pushes: 0, sum: 0, vals: [] }; let m; for (let M = 0; M < l; ++M) {
                if (M >= o && ++f, a = t[M], d < f)
                    for (d = f, v = t[d], m = f; ++m <= M;)
                        a = t[m], a >= v && (v = a, d = m);
                else
                    a >= v && (d = M, v = a);
                if (a = e[M], p < f)
                    for (p = f, x = e[p], m = f; ++m <= M;)
                        a = e[m], a <= x && (x = a, p = m);
                else
                    a <= x && (p = M, x = a);
                const l = v - x, z = 0 == l ? 0 : (s[M] - x) / l * 100;
                if (g.pushes >= g.size && (g.sum -= g.vals[g.index]), g.sum += z, g.vals[g.index] = z, g.pushes += 1, g.index = g.index + 1, g.index >= g.size && (g.index = 0), M >= o - 1 + r - 1) {
                    const t = g.sum * n;
                    N.pushes >= N.size && (N.sum -= N.vals[N.index]), N.sum += t, N.vals[N.index] = t, N.pushes += 1, N.index = N.index + 1, N.index >= N.size && (N.index = 0), M >= o - 1 + r - 1 + i - 1 && (h.push(t), c.push(N.sum * u));
                }
            } return [h, c]; })); }
            stochrsi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 / e, r = { size: e, index: 0, pushes: 0, sum: 0, vals: [] }; let i = 0, l = 0; for (let s = 1; s <= e; ++s)
                i += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, l += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; i /= e, l /= e; let u = i / (i + l) * 100; r.pushes >= r.size && (r.sum -= r.vals[r.index]), r.sum += u, r.vals[r.index] = u, r.pushes += 1, r.index = r.index + 1, r.index >= r.size && (r.index = 0); let h = u, c = u, a = 0, f = 0; for (let d = e + 1; d < s; ++d) {
                if (i = ((t[d] > t[d - 1] ? t[d] - t[d - 1] : 0) - i) * o + i, l = ((t[d] < t[d - 1] ? t[d - 1] - t[d] : 0) - l) * o + l, u = i / (i + l) * 100, u > c)
                    c = u, f = r.index;
                else if (f == r.index) {
                    c = u;
                    for (let t = 0; t < r.size; ++t)
                        t != r.index && r.vals[t] > c && (c = r.vals[t], f = t);
                }
                if (u < h)
                    h = u, a = r.index;
                else if (a == r.index) {
                    h = u;
                    for (let t = 0; t < r.size; ++t)
                        t != r.index && r.vals[t] < h && (h = r.vals[t], a = t);
                }
                if (r.vals[r.index] = u, r.index = r.index + 1, r.index >= r.size && (r.index = 0), d > 2 * e - 2) {
                    const t = c - h;
                    0 == t ? n.push(0) : n.push((u - h) / t);
                }
            } return n; })); }
            sum(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 0; for (let s = 0; s < e; ++s)
                o += t[s]; n.push(o); for (let r = e; r < s; ++r)
                o += t[r], o -= t[r - e], n.push(o); return n; })); }
            tema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 2 / (e + 1), r = 1 - o; let i = t[0], l = 0, u = 0; for (let h = 0; h < s; ++h)
                i = i * r + t[h] * o, h == e - 1 && (l = i), h >= e - 1 && (l = l * r + i * o, h == 2 * (e - 1) && (u = l), h >= 2 * (e - 1) && (u = u * r + l * o, h >= 3 * (e - 1) && n.push(3 * i - 3 * l + u))); return n; })); }
            tr(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let r; n[0] = t[0] - e[0]; for (let i = 1; i < o; ++i) {
                const o = e[i], l = t[i], u = s[i - 1], h = Math.abs(l - u), c = Math.abs(o - u);
                let a = l - o;
                h > a && (a = h), c > a && (a = c), r = a, n.push(r);
            } return n; })); }
            trima(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 / (e % 2 ? (e / 2 + 1) * (e / 2 + 1) : e / 2 * (e / 2 + 1)); let r = 0, i = 0, l = 0; const u = e % 2 ? e / 2 : e / 2 - 1, h = u + 1; let c = 1; for (let s = 0; s < e - 1; ++s)
                r += t[s] * c, s + 1 > e - u && (i += t[s]), s + 1 <= h && (l += t[s]), s + 1 < h && ++c, s + 1 >= e - u && --c; let a = e - 1 - u + 1, f = e - 1 - e + 1 + h, d = e - 1 - e + 1; for (let u = e - 1; u < s; ++u)
                r += t[u], n.push(r * o), i += t[u], r += i, r -= l, i -= t[a++], l += t[f++], l -= t[d++]; return n; })); }
            trix(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 3 * e - 2, r = 2 / (e + 1); let i = t[0], l = 0, u = 0; for (let s = 1; s < o; ++s)
                i = (t[s] - i) * r + i, s == e - 1 ? l = i : s > e - 1 && (l = (i - l) * r + l, s == 2 * e - 2 ? u = l : s > 2 * e - 2 && (u = (l - u) * r + u)); for (let e = o; e < s; ++e) {
                i = (t[e] - i) * r + i, l = (i - l) * r + l;
                const s = u;
                u = (l - u) * r + u, n.push((u - s) / u * 100);
            } return n; })); }
            tsf(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const h = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * h, c = (i - s * o) * u;
                n.push(c + s * (e + 1)), l -= i, i -= t[r - e + 1];
            } return n; })); }
            typprice(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let r = 0; r < o; ++r)
                n.push((t[r] + e[r] + s[r]) * (1 / 3)); return n; })); }
            ultosc(t, e, s, o, r, i, l = t.length) { return n(this, void 0, void 0, (function* () { const n = [], u = { size: i, index: 0, pushes: 0, sum: 0, vals: [] }, h = { size: i, index: 0, pushes: 0, sum: 0, vals: [] }; let c = 0, a = 0, f = 0, d = 0; for (let p = 1; p < l; ++p) {
                const l = e[p] < s[p - 1] ? e[p] : s[p - 1], v = t[p] > s[p - 1] ? t[p] : s[p - 1], x = s[p] - l, g = v - l;
                if (c += x, a += x, f += g, d += g, u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += x, u.vals[u.index] = x, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += g, h.vals[h.index] = g, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0), p > o) {
                    let t = u.index - o - 1;
                    if (t < 0 && (t += i), c -= u.vals[t], f -= h.vals[t], p > r) {
                        let t = u.index - r - 1;
                        t < 0 && (t += i), a -= u.vals[t], d -= h.vals[t];
                    }
                }
                if (p >= i) {
                    const t = 100 * (4 * c / f + 2 * a / d + 1 * u.sum / h.sum) / 7;
                    n.push(t);
                }
            } return n; })); }
            var(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 / e; let r = 0, i = 0; for (let s = 0; s < e; ++s)
                r += t[s], i += t[s] * t[s]; n.push(i * o - r * o * (r * o)); for (let l = e; l < s; ++l)
                r += t[l], i += t[l] * t[l], r -= t[l - e], i -= t[l - e] * t[l - e], n.push(i * o - r * o * (r * o)); return n; })); }
            vhf(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o, r, i, l = 1, u = -1, h = -1, c = t[0], a = t[0], f = 0, d = t[0]; for (let s = 1; s < e; ++s)
                r = t[s], f += Math.abs(r - d), d = r; for (let p = e; p < s; ++p, ++l) {
                if (r = t[p], f += Math.abs(r - d), d = r, p > e && (f -= Math.abs(t[p - e] - t[p - e - 1])), o = r, u < l)
                    for (u = l, c = t[u], i = l; ++i <= p;)
                        o = t[i], o >= c && (c = o, u = i);
                else
                    o >= c && (u = p, c = o);
                if (o = r, h < l)
                    for (h = l, a = t[h], i = l; ++i <= p;)
                        o = t[i], o <= a && (a = o, h = i);
                else
                    o <= a && (h = p, a = o);
                n.push(Math.abs(c - a) / f);
            } return n; })); }
            vidya(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 1 / e, l = 1 / s; let u = 0, h = 0, c = 0, a = 0; for (let n = 0; n < s; ++n)
                c += t[n], a += t[n] * t[n], n >= s - e && (u += t[n], h += t[n] * t[n]); let f = t[s - 2]; if (n.push(f), s - 1 < r) {
                let e = Math.sqrt(h * i - u * i * (u * i)) / Math.sqrt(a * l - c * l * (c * l));
                e != e && (e = 0), e *= o, f = (t[s - 1] - f) * e + f, n.push(f);
            } for (let d = s; d < r; ++d) {
                c += t[d], a += t[d] * t[d], u += t[d], h += t[d] * t[d], c -= t[d - s], a -= t[d - s] * t[d - s], u -= t[d - e], h -= t[d - e] * t[d - e];
                let r = Math.sqrt(h * i - u * i * (u * i)) / Math.sqrt(a * l - c * l * (c * l));
                r != r && (r = 0), r *= o, f = (t[d] - f) * r + f, n.push(f);
            } return n; })); }
            volatility(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 / e, r = Math.sqrt(252); let i = 0, l = 0; for (let s = 1; s <= e; ++s) {
                const e = t[s] / t[s - 1] - 1;
                i += e, l += e * e;
            } n.push(Math.sqrt(l * o - i * o * (i * o)) * r); for (let u = e + 1; u < s; ++u) {
                const s = t[u] / t[u - 1] - 1;
                i += s, l += s * s;
                const h = t[u - e] / t[u - e - 1] - 1;
                i -= h, l -= h * h, n.push(Math.sqrt(l * o - i * o * (i * o)) * r);
            } return n; })); }
            vosc(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = 1 / e, i = 1 / s; let l = 0, u = 0; for (let n = 0; n < s; ++n)
                n >= s - e && (l += t[n]), u += t[n]; const h = l * r, c = u * i; n.push(100 * (h - c) / c); for (let h = s; h < o; ++h) {
                l += t[h], l -= t[h - e], u += t[h], u -= t[h - s];
                const o = l * r, c = u * i;
                n.push(100 * (o - c) / c);
            } return n; })); }
            vwma(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let r = 0, i = 0; for (let n = 0; n < s; ++n)
                r += t[n] * e[n], i += e[n]; n.push(r / i); for (let l = s; l < o; ++l)
                r += t[l] * e[l], r -= t[l - s] * e[l - s], i += e[l], i -= e[l - s], n.push(r / i); return n; })); }
            wad(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let r = 0, i = s[0]; for (let l = 1; l < o; ++l) {
                const o = s[l];
                o > i ? r += o - (i < e[l] ? i : e[l]) : o < i && (r += o - (i > t[l] ? i : t[l])), n.push(r), i = s[l];
            } return n; })); }
            wcprice(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let r = 0; r < o; ++r)
                n.push(.25 * (t[r] + e[r] + s[r] + s[r])); return n; })); }
            wilders(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 / e; let r = 0; for (let s = 0; s < e; ++s)
                r += t[s]; let i = r / e; n.push(i); for (let r = e; r < s; ++r)
                i = (t[r] - i) * o + i, n.push(i); return n; })); }
            willr(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i, l, u = 0, h = -1, c = -1, a = t[0], f = e[0]; for (let d = o - 1; d < r; ++d, ++u) {
                if (i = t[d], h < u)
                    for (h = u, a = t[h], l = u; ++l <= d;)
                        i = t[l], i >= a && (a = i, h = l);
                else
                    i >= a && (h = d, a = i);
                if (i = e[d], c < u)
                    for (c = u, f = e[c], l = u; ++l <= d;)
                        i = e[l], i <= f && (f = i, c = l);
                else
                    i <= f && (c = d, f = i);
                const o = a - f, r = 0 == o ? 0 : (a - s[d]) / o * -100;
                n.push(r);
            } return n; })); }
            wma(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = e * (e + 1) / 2; let r = 0, i = 0; for (let s = 0; s < e - 1; ++s)
                i += t[s] * (s + 1), r += t[s]; for (let l = e - 1; l < s; ++l)
                i += t[l] * e, r += t[l], n.push(i / o), i -= r, r -= t[l - e + 1]; return n; })); }
            zlema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = Math.floor((e - 1) / 2), o = [], r = 2 / (e + 1); let i, l = t[n - 1]; for (o.push(l), i = n; i < s; ++i) {
                const e = t[i];
                l = (e + (e - t[i - n]) - l) * r + l, o.push(l);
            } return o; })); }
            abands(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = [], l = [], u = 1 / o, h = { size: o, index: 0, pushes: 0, sum: 0, vals: [] }, c = { size: o, index: 0, pushes: 0, sum: 0, vals: [] }; let a = 0; for (let n = 0; n < o; ++n) {
                const o = 4 * (t[n] - e[n]) / (t[n] + e[n]), r = (1 + o) * t[n];
                h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += r, h.vals[h.index] = r, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0);
                const i = (1 - o) * e[n];
                c.pushes >= c.size && (c.sum -= c.vals[c.index]), c.sum += i, c.vals[c.index] = i, c.pushes += 1, c.index = c.index + 1, c.index >= c.size && (c.index = 0), a += s[n];
            } n.push(h.sum * u), i.push(c.sum * u), l.push(a * u); for (let f = o; f < r; ++f) {
                const r = 4 * (t[f] - e[f]) / (t[f] + e[f]), d = (1 + r) * t[f];
                h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += d, h.vals[h.index] = d, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0);
                const p = (1 - r) * e[f];
                c.pushes >= c.size && (c.sum -= c.vals[c.index]), c.sum += p, c.vals[c.index] = p, c.pushes += 1, c.index = c.index + 1, c.index >= c.size && (c.index = 0), a += s[f] - s[f - o], n.push(h.sum * u), i.push(c.sum * u), l.push(a * u);
            } return [n, i, l]; })); }
            alma(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = [], l = Math.floor(s * (e - 1)), u = e / o; let h = 0; for (let t = 0; t < e; t++)
                i[t] = Math.exp(-1 * Math.pow(t - l, 2) / (2 * Math.pow(u, 2))), h += i[t]; for (let t = 0; t < e; t++)
                i[t] /= h; for (let s = e - 1; s < r; s++) {
                let o = 0;
                for (let n = 0; n < e; n++)
                    o += t[s - e + n + 1] * i[n];
                n.push(o);
            } return n; })); }
            ce(t, e, s, o, r, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], l = []; let u, h, c = t[0] - e[0], a = t[0], f = 0, d = e[0], p = 0; for (let n = 1; n < o; ++n) {
                const o = e[n], r = t[n], i = s[n - 1], l = Math.abs(r - i), v = Math.abs(o - i);
                let x = r - o;
                l > x && (x = l), v > x && (x = v), u = x, c += u, a <= (h = t[n]) && (a = h, f = n), d >= (h = e[n]) && (d = h, p = n);
            } c /= o; const v = (o - 1) / o, x = 1 / o; n.push(a - r * c), l.push(d + r * c); for (let g = o; g < i; ++g) {
                const i = e[g], N = t[g], m = s[g - 1], M = Math.abs(N - m), z = Math.abs(i - m);
                let b = N - i;
                if (M > b && (b = M), z > b && (b = z), u = b, c = c * v + u * x, a <= (h = t[g]))
                    a = h, f = g;
                else if (f == g - o) {
                    a = t[g - o + 1], f = g - o + 1;
                    for (let e = g - o + 2; e <= g; ++e)
                        a <= (h = t[e]) && (a = h, f = e);
                }
                if (d >= (h = e[g]))
                    d = h, p = g;
                else if (p == g - o) {
                    d = e[g - o + 1], p = g - o + 1;
                    for (let t = g - o + 2; t <= g; ++t)
                        d >= (h = e[t]) && (d = h, p = t);
                }
                n.push(a - r * c), l.push(d + r * c);
            } return [n, l]; })); }
            cmf(t, e, s, o, r, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let l = 0, u = 0; for (let n = 0; n < r - 1; ++n)
                u += t[n] - e[n] ? o[n] * (s[n] - e[n] - (t[n] - s[n])) / (t[n] - e[n]) : 0, l += o[n]; for (let h = r - 1; h < i; ++h)
                u += t[h] - e[h] ? o[h] * (s[h] - e[h] - (t[h] - s[h])) / (t[h] - e[h]) : 0, l += o[h], n.push(u / l), u -= t[h - r + 1] - e[h - r + 1] ? o[h - r + 1] * (s[h - r + 1] - e[h - r + 1] - (t[h - r + 1] - s[h - r + 1])) / (t[h - r + 1] - e[h - r + 1]) : 0, l -= o[h - r + 1]; return n; })); }
            copp(t, e, s) { return n(this, void 0, void 0, (function* () { const n = new Array(t.length), o = new Array(t.length), r = new Array(t.length); for (let i = 0; i < t.length; i++)
                n[i] = i < e - 1 ? null : (t[i] - t[i - e]) / t[i - e] * 100, o[i] = i < s - 1 ? null : (t[i] - t[i - s]) / t[i - s] * 100, r[i] = 10 * (n[i] + o[i]); return r; })); }
            dc(t, e, s) { return n(this, void 0, void 0, (function* () { const n = [], o = [], r = []; for (let i = s - 1; i < t.length; i++)
                n.push(Math.max(...t.slice(i - s + 1, i + 1))), o.push(Math.min(...e.slice(i - s + 1, i + 1))), r.push((n[n.length - 1] + o[o.length - 1]) / 2); return [n, r, o]; })); }
            fi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = 2 / (s + 1); let i = e[1] * (t[1] - t[0]); for (let s = 1; s < o; ++s)
                i = (e[s] * (t[s] - t[s - 1]) - i) * r + i, n.push(i); return n; })); }
            ikhts() { return n(this, void 0, void 0, (function* () { })); }
            kc(t, e, s, o, r, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], l = [], u = [], h = 2 / (o + 1); let c = s[0], a = t[0] - e[0]; n.push(c - r * a), l.push(c), u.push(c + r * a); let f = 0; for (let o = 1; o < i; ++o) {
                c = (s[o] - c) * h + c;
                const i = e[o], d = t[o], p = s[o - 1], v = Math.abs(d - p), x = Math.abs(i - p);
                let g = d - i;
                v > g && (g = v), x > g && (g = x), f = g, a = (f - a) * h + a, n.push(c - r * a), l.push(c), u.push(c + r * a);
            } return [n, l, u]; })); }
            kst(t, e, s, o, r, i, l, u, h, c = t.length) { return n(this, void 0, void 0, (function* () { const n = [], a = []; let f = i; f < l && (f = l), f < u && (f = u), f < h && (f = h); const d = 2 / (i + 1), p = 2 / (l + 1), v = 2 / (u + 1), x = 2 / (h + 1); function g(e, s) { return (t[e] - t[e - s]) / t[e - s]; } let N = g(e, e), m = g(s, s), M = g(o, o), z = g(r, r); for (let t = e + 1; t < r + 1 && t < c; ++t)
                N = (g(t, e) - N) * d + N; for (let t = s + 1; t < r + 1 && t < c; ++t)
                m = (g(t, s) - m) * p + m; for (let t = o + 1; t < r + 1 && t < c; ++t)
                M = (g(t, o) - M) * v + M; for (let t = r + 1; t < r + 1 && t < c; ++t)
                z = (g(t, r) - z) * x + z; let b = (1 * N + 2 * m + 3 * M + 4 * z) / 10; a.push(b); let q = b; n.push(q); for (let t = r + 1; t < c; ++t)
                N = (g(t, e) - N) * d + N, m = (g(t, s) - m) * p + m, M = (g(t, o) - M) * v + M, z = (g(t, r) - z) * x + z, b = (1 * N + 2 * m + 3 * M + 4 * z) / 10, n.push(b), q = .2 * (b - q) + q, a.push(q); return [n, a]; })); }
            mama() { return n(this, void 0, void 0, (function* () { })); }
            pbands(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = []; let l = 0, u = 0; const h = o * (o + 1) / 2, c = o * (o + 1) * (2 * o + 1) / 6; let a; for (a = 0; a < o; ++a)
                u += s[a] * (a + 1), l += s[a]; --a; const f = (u / o - h / o * l / o) / (c / o - h / o * (h / o)); let d = t[a]; for (let e = 1; e < o; ++e)
                d < t[a - e] + e * f && (d = t[a - e] + e * f); let p = e[a]; for (let t = 1; t < o; ++t)
                p > e[a - t] + t * f && (p = e[a - t] + t * f); for (i.push(d), n.push(p), ++a; a < r; ++a) {
                u += -l + s[a] * o, l += -s[a - o] + s[a];
                const r = (u / o - h / o * l / o) / (c / o - h / o * (h / o));
                let f = t[a];
                for (let e = 1; e < o; ++e)
                    f < t[a - e] + e * r && (f = t[a - e] + e * r);
                let d = e[a];
                for (let t = 1; t < o; ++t)
                    d > e[a - t] + t * r && (d = e[a - t] + t * r);
                n.push(d), i.push(f);
            } return [n, i]; })); }
            pc() { return n(this, void 0, void 0, (function* () { })); }
            pfe(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = 2 / (s + 1), i = { size: e, index: 0, pushes: 0, sum: 0, vals: [] }; let l; for (l = 1; l < e; ++l)
                i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.vals[i.index] = Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0); i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.vals[i.index] = Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0); let u = 100 * (t[l] - t[l - e] > 0 ? 1 : -1) * Math.sqrt(Math.pow(t[l] - t[l - e], 2) + 100) / i.sum; for (n.push(u), l = e + 1; l < o; ++l)
                i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.vals[i.index] = Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0), u = (100 * (t[l] - t[l - e] > 0 ? 1 : -1) * Math.sqrt(Math.pow(t[l] - t[l - e], 2) + 100) / i.sum - u) * r + u, n.push(u); return n; })); }
            posc(t, e, s, o, r, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let l, u = 0, h = 0; const c = o * (o + 1) / 2, a = o * (o + 1) * (2 * o + 1) / 6; let f; for (f = 0; f < o; ++f)
                h += s[f] * (f + 1), u += s[f]; --f; const d = (h / o - c / o * u / o) / (a / o - c / o * (c / o)); let p = t[f]; for (let e = 1; e < o; ++e)
                p < t[f - e] + e * d && (p = t[f - e] + e * d); let v = e[f]; for (let t = 1; t < o; ++t)
                v > e[f - t] + t * d && (v = e[f - t] + t * d); for (l = (s[f] - v) / (p - v) * 100, n.push(l), ++f; f < i; ++f) {
                h += -u + s[f] * o, u += -s[f - o] + s[f];
                const i = (h / o - c / o * u / o) / (a / o - c / o * (c / o));
                let d = t[f];
                for (let e = 1; e < o; ++e)
                    d < t[f - e] + e * i && (d = t[f - e] + e * i);
                let p = e[f];
                for (let t = 1; t < o; ++t)
                    p > e[f - t] + t * i && (p = e[f - t] + t * i);
                l = 2 * ((s[f] - p) / (d - p) * 100 - l) / (1 + r) + l, n.push(l);
            } return n; })); }
            rmi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let r, i, l = s; for (r = 0 > t[l] - t[l - s] ? 0 : t[l] - t[l - s], i = 0 > t[l - s] - t[l] ? 0 : t[l - s] - t[l], ++l, n.push(r / (r + i) * 100); l < o; ++l)
                r = 2 * (0 > t[l] - t[l - s] ? 0 : t[l] - t[l - s] - r) / (1 + e) + r, i = 2 * (0 > t[l - s] - t[l] ? 0 : t[l - s] - t[l] - i) / (1 + e) + i, n.push(r / (r + i) * 100); return n; })); }
            rmta(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = 1 - s; let i = (1 - r) * t[0] + t[0], l = (1 - r) * t[0] + r * (t[0] + i); for (let s = 1; s < e - 1; ++s) {
                const e = (1 - r) * i + t[s];
                l = (1 - r) * l + r * (t[s] + e - i), i = e;
            } for (let s = e - 1; s < o; ++s) {
                const e = (1 - r) * i + t[s];
                l = (1 - r) * l + r * (t[s] + e - i), i = e, n.push(l);
            } return n; })); }
            rvi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let r = 0, i = 0; const l = s * (s + 1) / 2, u = s * (s + 1) * (2 * s + 1) / 6; let h = 0, c = 0, a = 0; for (; a < s; ++a)
                i += t[a] * (a + 1), r += t[a]; --a; const f = (i / s - l / s * r / s) / (u / s - l / s * (l / s)), d = r / s - f * l / s, p = t[a] - (d + f * s); for (p > 0 ? h = p * p / s : c = p * p / s, h + c == 0 ? n.push(50) : n.push(h / (h + c) * 100), ++a; a < o; ++a) {
                i += -r + t[a] * s, r += -t[a - s] + t[a];
                const o = (i / s - l / s * r / s) / (u / s - l / s * (l / s)), f = r / s - o * l / s, d = t[a] - (f + o * s);
                d > 0 ? h = 2 * (d * d / s - h) / (e + 1) + h : c = 2 * (d * d / s - c) / (e + 1) + c, h + c == 0 ? n.push(50) : n.push(h / (h + c) * 100);
            } return n; })); }
            smi(t, e, s, o, r, i, l = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let u = 1 - o, h = NaN, c = NaN, a = NaN, f = NaN, d = 0, p = 0, v = 0, x = 0, g = 0, N = 0; for (; N < l && u == 1 - o; ++N, ++u)
                p = t[N], v = u, d = e[N], x = u; for (; N < l && u < 0; ++N, ++u)
                p <= t[N] && (p = t[N], v = u), d >= e[N] && (d = e[N], x = u); for (; N < l && 0 == u; ++N, ++u)
                p <= t[N] && (p = t[N], v = u), d >= e[N] && (d = e[N], x = u), h = c = s[N] - .5 * (p + d), a = f = p - d, n.push(100 * c / (.5 * f)); for (; N < l; ++N, ++u) {
                if (v == u - o) {
                    p = t[N], v = u;
                    for (let e = 1; e < o; ++e)
                        g = t[N - e], g > p && (p = g, v = u - e);
                }
                else
                    p <= t[N] && (p = t[N], v = u);
                if (x == u - o) {
                    d = e[N], x = u;
                    for (let t = 1; t < o; ++t)
                        g = e[N - t], g < d && (d = g, x = u - t);
                }
                else
                    d >= e[N] && (d = e[N], x = u);
                h = (s[N] - .5 * (p + d) - h) * (2 / (1 + r)) + h, c = 2 / (1 + i) * (h - c) + c, a = 2 / (1 + r) * (p - d - a) + a, f = 2 / (1 + i) * (a - f) + f, n.push(100 * c / (.5 * f));
            } return n; })); }
            tsi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let r = -1, i = 0, l = 0, u = 0, h = 0, c = 0, a = 0; for (; a < o && -1 == r; ++a, ++r)
                i = t[a]; for (; a < o && 0 == r; ++a, ++r)
                u = l = t[a] - i, c = h = Math.abs(t[a] - i), n.push(100 * (c ? u / c : 0)), i = t[a]; for (; a < o; ++a, ++r)
                l = 2 * (t[a] - i - l) / (1 + e) + l, h = 2 * (Math.abs(t[a] - i) - h) / (1 + e) + h, u = 2 * (l - u) / (1 + s) + u, c = 2 * (h - c) / (1 + s) + c, n.push(100 * (c ? u / c : 0)), i = t[a]; return n; })); }
            vwap(t, e, s, o, r, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let l = 1 - r, u = 0, h = 0, c = 0; for (; c < i && l < 1; ++c, ++l)
                u += (t[c] + e[c] + s[c]) / 3 * o[c], h += o[c]; for (c > 0 && 1 == l && n.push(u / h); c < i; ++c, ++l)
                u += (t[c] + e[c] + s[c]) / 3 * o[c] - (t[c - r] + e[c - r] + s[c - r]) / 3 * o[c - r], h += o[c] - o[c - r], n.push(u / h); return n; })); }
        }; }, 830: function (t, e, s) { var n = this && this.__awaiter || function (t, e, s, n) { return new (s || (s = Promise))((function (o, r) { function i(t) { try {
            u(n.next(t));
        }
        catch (t) {
            r(t);
        } } function l(t) { try {
            u(n.throw(t));
        }
        catch (t) {
            r(t);
        } } function u(t) { var e; t.done ? o(t.value) : (e = t.value, e instanceof s ? e : new s((function (t) { t(e); }))).then(i, l); } u((n = n.apply(t, e || [])).next()); })); }; Object.defineProperty(e, "__esModule", { value: !0 }), e.IndicatorsNormalized = void 0; const o = s(409); e.IndicatorsNormalized = class {
            constructor() { }
            normalize(t, e, s = NaN) { return n(this, void 0, void 0, (function* () { const n = t - e.length, o = []; for (let t = 0; t < n; ++t)
                o.push(s); return [...o, ...e]; })); }
            floor(t) { return t < 0 ? ~~t - 1 : ~~t; }
            sqrt(t, e = t / 2) { const s = (e + t / e) / 2; return (e > s ? e - s : s - e) < 1e-7 ? s : this.sqrt(t, s); }
            ad(t, e, s, o, r = s.length) { return n(this, void 0, void 0, (function* () { const n = []; let i = 0; for (let l = 0; l < r; ++l) {
                const r = t[l] - e[l];
                0 != r && (i += (s[l] - e[l] - t[l] + s[l]) / r * o[l]), n[l] = i;
            } return n; })); }
            adosc(t, e, s, o, r, i, l = s.length) { return n(this, void 0, void 0, (function* () { const n = i - 1, u = 2 / (r + 1), h = 2 / (i + 1), c = []; c[i - 2] = NaN; let a = 0, f = 0, d = 0; for (let r = 0; r < l; ++r) {
                const i = t[r] - e[r];
                0 != i && (a += (s[r] - e[r] - t[r] + s[r]) / i * o[r]), 0 == r ? (f = a, d = a) : (f = (a - f) * u + f, d = (a - d) * h + d), r >= n && c.push(f - d);
            } return c; })); }
            adx(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[2 * (s - 2) + 1] = NaN; const r = (s - 1) / s, i = 1 / s; let l = 0, u = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), l += s, u += o;
            } let h = 0, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100; h += p; for (let v = s; v < o; ++v) {
                let o = t[v] - t[v - 1], x = e[v - 1] - e[v];
                o < 0 ? o = 0 : o > x && (x = 0), x < 0 ? x = 0 : x > o && (o = 0), l = l * r + o, u = u * r + x, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100, v - s < s - 2 ? h += p : v - s == s - 2 ? (h += p, n.push(h * i)) : (h = h * r + p, n.push(h * i));
            } return n; })); }
            adxr(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[3 * (s - 1) - 1] = NaN; const r = (s - 1) / s, i = 1 / s; let l = 0, u = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), l += s, u += o;
            } let h = 0, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100; h += p; const v = { size: s - 1, pushes: 0, index: 0, vals: [] }, x = 3 * (s - 1); for (let g = s; g < o; ++g) {
                let o = t[g] - t[g - 1], N = e[g - 1] - e[g];
                if (o < 0 ? o = 0 : o > N && (N = 0), N < 0 ? N = 0 : N > o && (o = 0), l = l * r + o, u = u * r + N, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100, g - s < s - 2)
                    h += p;
                else if (g - s == s - 2)
                    h += p, v.vals[v.index] = h * i, v.index = v.index + 1, v.index >= v.size && (v.index = 0);
                else {
                    if (h = h * r + p, g >= x) {
                        const t = v.vals[v.index] + (v.size - 1 + 1) % v.size;
                        n.push(.5 * (h * i + t));
                    }
                    v.vals[v.index] = h * i, v.index = v.index + 1, v.index >= v.size && (v.index = 0);
                }
            } return n; })); }
            ao(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[32] = NaN; let o = 0, r = 0; const i = 1 / 34; for (let s = 0; s < 34; ++s) {
                const n = .5 * (t[s] + e[s]);
                o += n, s >= 29 && (r += n);
            } n.push(.2 * r - i * o); for (let l = 34; l < s; ++l) {
                const s = .5 * (t[l] + e[l]);
                o += s, r += s, o -= .5 * (t[l - 34] + e[l - 34]), r -= .5 * (t[l - 5] + e[l - 5]), n.push(.2 * r - i * o);
            } return n; })); }
            apo(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[0] = NaN; const r = 2 / (e + 1), i = 2 / (s + 1); let l = t[0], u = t[0]; for (let e = 1; e < o; ++e) {
                l = (t[e] - l) * r + l, u = (t[e] - u) * i + u;
                const s = l - u;
                n.push(s);
            } return n; })); }
            aroon(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = []; n[s - 1] = NaN, r[s - 1] = NaN; const i = 100 / s; let l, u, h = 0, c = -1, a = -1, f = t[0], d = e[0]; for (let p = s; p < o; ++p, ++h) {
                if (l = t[p], c < h)
                    for (c = h, f = t[c], u = h; ++u <= p;)
                        l = t[u], l >= f && (f = l, c = u);
                else
                    l >= f && (c = p, f = l);
                if (l = e[p], a < h)
                    for (a = h, d = e[a], u = h; ++u <= p;)
                        l = e[u], l <= d && (d = l, a = u);
                else
                    l <= d && (a = p, d = l);
                n[n.length] = (s - (p - a)) * i, r[r.length] = (s - (p - c)) * i;
            } return [n, r]; })); }
            aroonosc(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[s - 1] = NaN; const r = 100 / s; let i, l = 0, u = -1, h = -1, c = t[0], a = e[0]; for (let f = s; f < o; ++f, ++l) {
                let s = t[f];
                if (u < l)
                    for (u = l, c = t[u], i = l; ++i <= f;)
                        s = t[i], s >= c && (c = s, u = i);
                else
                    s >= c && (u = f, c = s);
                if (s = e[f], h < l)
                    for (h = l, a = e[h], i = l; ++i <= f;)
                        s = e[i], s <= a && (a = s, h = i);
                else
                    s <= a && (h = f, a = s);
                n.push((u - h) * r);
            } return n; })); }
            atr(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[o - 2] = NaN; const i = 1 / o; let l, u = 0; u += t[0] - e[0]; for (let n = 1; n < o; ++n) {
                const o = e[n], r = t[n], i = s[n - 1], h = Math.abs(r - i), c = Math.abs(o - i);
                let a = r - o;
                h > a && (a = h), c > a && (a = c), l = a, u += l;
            } let h = u / o; n.push(h); for (let u = o; u < r; ++u) {
                const o = e[u], r = t[u], c = s[u - 1], a = Math.abs(r - c), f = Math.abs(o - c);
                let d = r - o;
                a > d && (d = a), f > d && (d = f), l = d, h = (l - h) * i + h, n.push(h);
            } return n; })); }
            avgprice(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let i = 0; i < r; ++i)
                n.push(.25 * (t[i] + e[i] + s[i] + o[i])); return n; })); }
            bbands(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = [], i = []; n[e - 2] = NaN, r[e - 2] = NaN, i[e - 2] = NaN; const l = 1 / e; let u = 0, h = 0; for (let s = 0; s < e; ++s)
                u += t[s], h += t[s] * t[s]; let c = Math.sqrt(h * l - u * l * (u * l)); const a = u * l; n.push(a - s * c), i.push(a + s * c), r.push(a); for (let a = e; a < o; ++a) {
                u += t[a], h += t[a] * t[a], u -= t[a - e], h -= t[a - e] * t[a - e], c = Math.sqrt(h * l - u * l * (u * l));
                const o = u * l;
                i.push(o + s * c), n.push(o - s * c), r.push(o);
            } return [n, r, i]; })); }
            bop(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let i = 0; i < r; ++i) {
                const r = e[i] - s[i];
                n[i] = r <= 0 ? 0 : (o[i] - t[i]) / r;
            } return n; })); }
            cci(t, e, s, r, i = t.length) { return n(this, void 0, void 0, (function* () { const n = 1 / r, l = []; l[2 * (r - 2) + 1] = NaN; const u = new o.ti_buffer(r); let h, c; for (h = 0; h < i; ++h) {
                const o = (t[h] + e[h] + s[h]) * (1 / 3);
                u.push(o);
                const i = u.sum * n;
                if (h >= 2 * r - 2) {
                    let t = 0;
                    for (c = 0; c < r; ++c)
                        t += Math.abs(i - u.vals[c]);
                    let e = t * n;
                    e *= .015, e = (o - i) / e, l.push(e);
                }
            } return l; })); }
            cmo(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; let o = 0, r = 0; for (let s = 1; s <= e; ++s)
                o += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, r += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; n.push(100 * (o - r) / (o + r)); for (let i = e + 1; i < s; ++i)
                o -= t[i - e] > t[i - e - 1] ? t[i - e] - t[i - e - 1] : 0, r -= t[i - e] < t[i - e - 1] ? t[i - e - 1] - t[i - e] : 0, o += t[i] > t[i - 1] ? t[i] - t[i - 1] : 0, r += t[i] < t[i - 1] ? t[i - 1] - t[i] : 0, n.push(100 * (o - r) / (o + r)); return n; })); }
            crossany(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = 0; o < s; ++o)
                n.push(t[o] > e[o] && t[o - 1] <= e[o - 1] || t[o] < e[o] && t[o - 1] >= e[o - 1]); return n; })); }
            crossover(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = 0; o < s; ++o)
                n.push(t[o] > e[o] && t[o - 1] <= e[o - 1]); return n; })); }
            crossOverNumber(t, e) { const s = []; for (let n = 0; n < t.length; n++) {
                const o = t[n], r = t[n - 1];
                o > e && r <= e ? s.push(!0) : s.push(!1);
            } return s; }
            crossUnderNumber(t, e) { const s = []; for (let n = 0; n < t.length; n++) {
                const o = t[n], r = t[n - 1];
                o < e && r >= e ? s.push(!0) : s.push(!1);
            } return s; }
            cvi(t, e, s, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[2 * (s - 1)] = NaN; const i = 2 / (s + 1), l = new o.ti_buffer(s); let u, h = t[0] - e[0]; for (u = 1; u < 2 * s - 1; ++u)
                h = (t[u] - e[u] - h) * i + h, l.qpush(h); for (u = 2 * s - 1; u < r; ++u) {
                h = (t[u] - e[u] - h) * i + h;
                const s = l.vals[l.index];
                n.push(100 * (h - s) / s), l.qpush(h);
            } return n; })); }
            decay(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 / e; n.push(t[0]); for (let e = 1; e < s; ++e) {
                const s = n[n.length - 1] - o;
                n.push(t[e] > s ? t[e] : s);
            } return n; })); }
            dema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[2 * (e - 1) - 1] = NaN; const o = 2 / (e + 1), r = 1 - o; let i = t[0], l = i; for (let u = 0; u < s; ++u)
                i = i * r + t[u] * o, u == e - 1 && (l = i), u >= e - 1 && (l = l * r + i * o, u >= 2 * (e - 1) && n.push(2 * i - l)); return n; })); }
            di(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = []; n[o - 2] = NaN, i[o - 2] = NaN; const l = (o - 1) / o; let u = 0, h = 0, c = 0; for (let n = 1; n < o; ++n) {
                const o = e[n], r = t[n], i = s[n - 1], l = Math.abs(r - i), a = Math.abs(o - i);
                let f = r - o;
                l > f && (f = l), a > f && (f = a), u += f;
                let d = t[n] - t[n - 1], p = e[n - 1] - e[n];
                d < 0 ? d = 0 : d > p && (p = 0), p < 0 ? p = 0 : p > d && (d = 0), h += d, c += p;
            } n.push(100 * h / u), i.push(100 * c / u); for (let a = o; a < r; ++a) {
                const o = e[a], r = t[a], f = s[a - 1], d = Math.abs(r - f), p = Math.abs(o - f);
                let v = r - o;
                d > v && (v = d), p > v && (v = p), u = u * l + v;
                let x = t[a] - t[a - 1], g = e[a - 1] - e[a];
                x < 0 ? x = 0 : x > g && (g = 0), g < 0 ? g = 0 : g > x && (x = 0), h = h * l + x, c = c * l + g, n.push(100 * h / u), i.push(100 * c / u);
            } return [n, i]; })); }
            dm(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = []; n[s - 2] = NaN, r[s - 2] = NaN; const i = (s - 1) / s; let l = 0, u = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), l += s, u += o;
            } n.push(l), r.push(u); for (let h = s; h < o; ++h) {
                let s = t[h] - t[h - 1], o = e[h - 1] - e[h];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), l = l * i + s, u = u * i + o, n.push(l), r.push(u);
            } return [n, r]; })); }
            dpo(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = e / 2 + 1, o = []; o[e - 2] = NaN; const r = 1 / e; let i = 0; for (let s = 0; s < e; ++s)
                i += t[s]; o.push(t[e - 1 - n] - i * r); for (let l = e; l < s; ++l)
                i += t[l], i -= t[l - e], o.push(t[l - n] - i * r); return o; })); }
            dx(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[s - 2] = NaN; const r = (s - 1) / s; let i = 0, l = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), i += s, l += o;
            } let u = i, h = l, c = Math.abs(u - h), a = u + h, f = c / a * 100; n.push(f); for (let d = s; d < o; ++d) {
                let s = t[d] - t[d - 1], o = e[d - 1] - e[d];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), i = i * r + s, l = l * r + o, u = i, h = l, c = Math.abs(u - h), a = u + h, f = c / a * 100, n.push(f);
            } return n; })); }
            edecay(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 - 1 / e; n.push(t[0]); for (let e = 1; e < s; ++e) {
                const s = n[n.length - 1] * o;
                n.push(t[e] > s ? t[e] : s);
            } return n; })); }
            ema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 2 / (e + 1); let r = t[0]; n.push(r); for (let e = 1; e < s; ++e)
                r = (t[e] - r) * o + r, n.push(r); return n; })); }
            emv(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[0] = NaN; let r = .5 * (t[0] + e[0]); for (let i = 1; i < o; ++i) {
                const o = .5 * (t[i] + e[i]), l = s[i] / 1e4 / (t[i] - e[i]);
                n.push((o - r) / l), r = o;
            } return n; })); }
            fisher(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = []; n[s - 2] = NaN, r[s - 2] = NaN; let i, l, u = 0, h = -1, c = -1, a = .5 * (t[0] + e[0]), f = .5 * (t[0] + e[0]), d = 0, p = 0; for (let v = s - 1; v < o; ++v, ++u) {
                if (i = .5 * (t[v] + e[v]), h < u)
                    for (h = u, a = .5 * (t[h] + e[h]), l = u; ++l <= v;)
                        i = .5 * (t[l] + e[l]), i >= a && (a = i, h = l);
                else
                    i >= a && (h = v, a = i);
                if (i = .5 * (t[v] + e[v]), c < u)
                    for (c = u, f = .5 * (t[c] + e[c]), l = u; ++l <= v;)
                        i = .5 * (t[l] + e[l]), i <= f && (f = i, c = l);
                else
                    i <= f && (c = v, f = i);
                let s = a - f;
                0 == s && (s = .001), d = .66 * ((.5 * (t[v] + e[v]) - f) / s - .5) + .67 * d, d > .99 && (d = .999), d < -.99 && (d = -.999), r.push(p), p = .5 * Math.log((1 + d) / (1 - d)) + .5 * p, n.push(p);
            } return [n, r]; })); }
            fosc(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; let h = 0; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const c = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * c, a = (i - s * o) * u;
                r >= e && n.push(100 * (t[r] - h) / t[r]), h = a + s * (e + 1), l -= i, i -= t[r - e + 1];
            } return n; })); }
            hma(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = Math.floor(e / 2), i = Math.floor(Math.sqrt(e)), l = e * (e + 1) / 2, u = r * (r + 1) / 2, h = i * (i + 1) / 2; n[e - 1 + i - 2] = NaN; let c, a = 0, f = 0, d = 0, p = 0, v = 0, x = 0; for (c = 0; c < e - 1; ++c)
                f += t[c] * (c + 1), a += t[c], c >= e - r && (p += t[c] * (c + 1 - (e - r)), d += t[c]); const g = new o.ti_buffer(i); for (c = e - 1; c < s; ++c) {
                f += t[c] * e, a += t[c], p += t[c] * r, d += t[c];
                const s = p / u * 2 - f / l;
                x += s * i, v += s, g.qpush(s), c >= e - 1 + (i - 1) ? (n.push(x / h), x -= v, v -= g.get(1)) : x -= v, f -= a, a -= t[c - e + 1], p -= d, d -= t[c - r + 1];
            } return n; })); }
            kama(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o = 0; for (let s = 1; s < e; ++s)
                o += Math.abs(t[s] - t[s - 1]); let r, i, l = t[e - 1]; n.push(l); for (let u = e; u < s; ++u)
                o += Math.abs(t[u] - t[u - 1]), u > e && (o -= Math.abs(t[u - e] - t[u - e - 1])), r = 0 != o ? Math.abs(t[u] - t[u - e]) / o : 1, i = Math.pow(.6021505376344085 * r + .06451612903225806, 2), l += i * (t[u] - l), n.push(l); return n; })); }
            kvo(t, e, s, o, r, i, l = t.length) { return n(this, void 0, void 0, (function* () { const n = 2 / (r + 1), u = 2 / (i + 1), h = []; h[0] = NaN; let c = 0, a = t[0] + e[0] + s[0], f = -1, d = 0, p = 0; for (let r = 1; r < l; ++r) {
                const i = t[r] + e[r] + s[r], l = t[r] - e[r];
                i > a && 1 != f ? (f = 1, c = t[r - 1] - e[r - 1]) : i < a && 0 != f && (f = 0, c = t[r - 1] - e[r - 1]), c += l;
                const v = o[r] * Math.abs(l / c * 2 - 1) * 100 * (f ? 1 : -1);
                1 == r ? (d = v, p = v) : (d = (v - d) * n + d, p = (v - p) * u + p), h.push(d - p), a = i;
            } return h; })); }
            lag(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; for (let o = e; o < s; ++o)
                n.push(t[o - e]); return n; })); }
            linreg(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const h = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * h, c = (i - s * o) * u;
                n.push(c + s * e), l -= i, i -= t[r - e + 1];
            } return n; })); }
            linregintercept(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const h = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * h, c = (i - s * o) * u;
                n.push(c + 1 * s), l -= i, i -= t[r - e + 1];
            } return n; })); }
            linregslope(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o = 0, r = 0, i = 0, l = 0; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const u = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * u;
                n.push(s), l -= i, i -= t[r - e + 1];
            } return n; })); }
            macd(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = [], l = []; n[s - 2] = NaN, i[s - 2] = NaN, l[s - 2] = NaN; const u = 2 / (e + 1), h = 2 / (s + 1), c = 2 / (o + 1); let a = t[0], f = t[0], d = 0; for (let e = 1; e < r; ++e) {
                a = (t[e] - a) * u + a, f = (t[e] - f) * h + f;
                const o = a - f;
                e == s - 1 && (d = o), e >= s - 1 && (d = (o - d) * c + d, n.push(o), i.push(d), l.push(o - d));
            } return [n, i, l]; })); }
            marketfi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let r = 0; r < o; ++r)
                n.push((t[r] - e[r]) / s[r]); return n; })); }
            mass(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[16 + s - 2] = NaN; let r = t[0] - e[0], i = r; const l = { index: 0, pushes: 0, size: s, sum: 0, vals: [] }; for (let u = 0; u < o; ++u)
                r = .8 * r + .2 * (t[u] - e[u]), 8 == u && (i = r), u >= 8 && (i = .8 * i + .2 * r, u >= 16 && (l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += r / i, l.vals[l.index] = r / i, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0), u >= 16 + s - 1 && n.push(l.sum))); return n; })); }
            max(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o, r = 0, i = -1, l = t[0]; for (let u = e - 1; u < s; ++u, ++r) {
                let e = t[u];
                if (i < r)
                    for (i = r, l = t[i], o = r; ++o <= u;)
                        e = t[o], e >= l && (l = e, i = o);
                else
                    e >= l && (i = u, l = e);
                n.push(l);
            } return n; })); }
            md(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = 1 / e; let r, i = 0; for (let l = 0; l < s; ++l) {
                i += t[l], l >= e && (i -= t[l - e]);
                const s = i * o;
                if (l >= e - 1) {
                    let i = 0;
                    for (r = 0; r < e; ++r)
                        i += Math.abs(s - t[l - r]);
                    n.push(i * o);
                }
            } return n; })); }
            medprice(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = 0; o < s; ++o)
                n.push(.5 * (t[o] + e[o])); return n; })); }
            mfi(t, e, s, o, r, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[r - 1] = NaN; let l = (t[0] + e[0] + s[0]) * (1 / 3); const u = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }, h = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }; for (let c = 1; c < i; ++c) {
                const i = (t[c] + e[c] + s[c]) * (1 / 3), a = i * o[c];
                i > l ? (u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += a, u.vals[u.index] = a, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += 0, h.vals[h.index] = 0, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0)) : i < l ? (h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += a, h.vals[h.index] = a, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0), u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += 0, u.vals[u.index] = 0, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0)) : (u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += 0, u.vals[u.index] = 0, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += 0, h.vals[h.index] = 0, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0)), l = i, c >= r && n.push(u.sum / (u.sum + h.sum) * 100);
            } return n; })); }
            min(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o, r = 0, i = -1, l = t[0]; for (let u = e - 1; u < s; ++u, ++r) {
                let e = t[u];
                if (i < r)
                    for (i = r, l = t[i], o = r; ++o <= u;)
                        e = t[o], e <= l && (l = e, i = o);
                else
                    e <= l && (i = u, l = e);
                n.push(l);
            } return n; })); }
            mom(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; for (let o = e; o < s; ++o)
                n.push(t[o] - t[o - e]); return n; })); }
            msw(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = []; n[e - 1] = NaN, o[e - 1] = NaN; const r = 3.1415926, i = 2 * r; let l, u, h, c, a = 0; for (let f = e; f < s; ++f) {
                for (u = 0, h = 0, c = 0; c < e; ++c)
                    a = t[f - c], u += Math.cos(i * c / e) * a, h += Math.sin(i * c / e) * a;
                l = Math.abs(u) > .001 ? Math.atan(h / u) : i / 2 * (h < 0 ? -1 : 1), u < 0 && (l += r), l += r / 2, l < 0 && (l += i), l > i && (l -= i), n.push(Math.sin(l)), o.push(Math.sin(l + r / 4));
            } return [n, o]; })); }
            natr(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[o - 2] = NaN; const i = 1 / o; let l, u = 0; u += t[0] - e[0]; for (let n = 1; n < o; ++n) {
                const o = e[n], r = t[n], i = s[n - 1], h = Math.abs(r - i), c = Math.abs(o - i);
                let a = r - o;
                h > a && (a = h), c > a && (a = c), l = a, u += l;
            } let h = u / o; n.push(100 * h / s[o - 1]); for (let u = o; u < r; ++u) {
                const o = e[u], r = t[u], c = s[u - 1], a = Math.abs(r - c), f = Math.abs(o - c);
                let d = r - o;
                a > d && (d = a), f > d && (d = f), l = d, h = (l - h) * i + h, n.push(100 * h / s[u]);
            } return n; })); }
            nvi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 1e3; n.push(o); for (let r = 1; r < s; ++r)
                e[r] < e[r - 1] && (o += (t[r] - t[r - 1]) / t[r - 1] * o), n.push(o); return n; })); }
            obv(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 0; n.push(o); let r = t[0]; for (let i = 1; i < s; ++i)
                t[i] > r ? o += e[i] : t[i] < r && (o -= e[i]), r = t[i], n.push(o); return n; })); }
            ppo(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[0] = NaN; const r = 2 / (e + 1), i = 2 / (s + 1); let l = t[0], u = t[0]; for (let e = 1; e < o; ++e) {
                l = (t[e] - l) * r + l, u = (t[e] - u) * i + u;
                const s = 100 * (l - u) / u;
                n.push(s);
            } return n; })); }
            psar(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i, l, u; n[0] = NaN, i = t[0] + e[0] <= t[1] + e[1] ? 1 : 0, i ? (u = t[0], l = e[0]) : (u = e[0], l = t[0]); let h = s; for (let c = 1; c < r; ++c)
                l = (u - l) * h + l, i ? (c >= 2 && l > e[c - 2] && (l = e[c - 2]), l > e[c - 1] && (l = e[c - 1]), h < o && t[c] > u && (h += s, h > o && (h = o)), t[c] > u && (u = t[c])) : (c >= 2 && l < t[c - 2] && (l = t[c - 2]), l < t[c - 1] && (l = t[c - 1]), h < o && e[c] < u && (h += s, h > o && (h = o)), e[c] < u && (u = e[c])), (i && e[c] < l || !i && t[c] > l) && (h = s, l = u, i = !i, u = i ? t[c] : e[c]), n.push(l); return n; })); }
            pvi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 1e3; n.push(o); for (let r = 1; r < s; ++r)
                e[r] > e[r - 1] && (o += (t[r] - t[r - 1]) / t[r - 1] * o), n.push(o); return n; })); }
            qstick(t, e, s, o = e.length) { return n(this, void 0, void 0, (function* () { const n = []; n[s - 1] = NaN; const r = 1 / s; let i, l = 0; for (i = 0; i < s; ++i)
                l += e[i] - t[i]; for (n.push(l * r), i = s; i < o; ++i)
                l += e[i] - t[i], l -= e[i - s] - t[i - s], n.push(l * r); return n; })); }
            roc(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; for (let o = e; o < s; ++o)
                n.push((t[o] - t[o - e]) / t[o - e]); return n; })); }
            rocr(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; for (let o = e; o < s; ++o)
                n.push(t[o] / t[o - e]); return n; })); }
            rsi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; const o = 1 / e; let r = 0, i = 0; for (let s = 1; s <= e; ++s)
                r += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, i += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; r /= e, i /= e, n.push(r / (r + i) * 100); for (let l = e + 1; l < s; ++l)
                r = ((t[l] > t[l - 1] ? t[l] - t[l - 1] : 0) - r) * o + r, i = ((t[l] < t[l - 1] ? t[l - 1] - t[l] : 0) - i) * o + i, n.push(r / (r + i) * 100); return n; })); }
            sma(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = 1 / e; let r = 0; for (let s = 0; s < e; ++s)
                r += t[s]; n.push(r * o); for (let i = e; i < s; ++i)
                r += t[i], r -= t[i - e], n.push(r * o); return n; })); }
            stddev(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = 1 / e; let r = 0, i = 0; for (let s = 0; s < e; ++s)
                r += t[s], i += t[s] * t[s]; let l = i * o - r * o * (r * o); l > 0 && (l = Math.sqrt(l)), n.push(l); for (let l = e; l < s; ++l) {
                r += t[l], i += t[l] * t[l], r -= t[l - e], i -= t[l - e] * t[l - e];
                let s = i * o - r * o * (r * o);
                s > 0 && (s = Math.sqrt(s)), n.push(s);
            } return n; })); }
            stderr(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = 1 / e; let r = 0, i = 0; const l = 1 / Math.sqrt(e); for (let s = 0; s < e; ++s)
                r += t[s], i += t[s] * t[s]; let u = i * o - r * o * (r * o); u > 0 && (u = Math.sqrt(u)), n.push(l * u); for (let u = e; u < s; ++u) {
                r += t[u], i += t[u] * t[u], r -= t[u - e], i -= t[u - e] * t[u - e];
                let s = i * o - r * o * (r * o);
                s > 0 && (s = Math.sqrt(s)), n.push(l * s);
            } return n; })); }
            stoch(t, e, s, o, r, i, l = t.length) { return n(this, void 0, void 0, (function* () { const n = 1 / r, u = 1 / i, h = [], c = []; h[o + r + i - 3 - 1] = NaN, c[o + r + i - 3 - 1] = NaN; let a, f = 0, d = -1, p = -1, v = t[0], x = e[0]; const g = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }, N = { size: i, index: 0, pushes: 0, sum: 0, vals: [] }; let m; for (let M = 0; M < l; ++M) {
                if (M >= o && ++f, a = t[M], d < f)
                    for (d = f, v = t[d], m = f; ++m <= M;)
                        a = t[m], a >= v && (v = a, d = m);
                else
                    a >= v && (d = M, v = a);
                if (a = e[M], p < f)
                    for (p = f, x = e[p], m = f; ++m <= M;)
                        a = e[m], a <= x && (x = a, p = m);
                else
                    a <= x && (p = M, x = a);
                const l = v - x, z = 0 == l ? 0 : (s[M] - x) / l * 100;
                if (g.pushes >= g.size && (g.sum -= g.vals[g.index]), g.sum += z, g.vals[g.index] = z, g.pushes += 1, g.index = g.index + 1, g.index >= g.size && (g.index = 0), M >= o - 1 + r - 1) {
                    const t = g.sum * n;
                    N.pushes >= N.size && (N.sum -= N.vals[N.index]), N.sum += t, N.vals[N.index] = t, N.pushes += 1, N.index = N.index + 1, N.index >= N.size && (N.index = 0), M >= o - 1 + r - 1 + i - 1 && (h.push(t), c.push(N.sum * u));
                }
            } return [h, c]; })); }
            stochrsi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[2 * e - 2] = NaN; const o = 1 / e, r = { size: e, index: 0, pushes: 0, sum: 0, vals: [] }; let i = 0, l = 0; for (let s = 1; s <= e; ++s)
                i += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, l += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; i /= e, l /= e; let u = i / (i + l) * 100; r.pushes >= r.size && (r.sum -= r.vals[r.index]), r.sum += u, r.vals[r.index] = u, r.pushes += 1, r.index = r.index + 1, r.index >= r.size && (r.index = 0); let h = u, c = u, a = 0, f = 0; for (let d = e + 1; d < s; ++d) {
                if (i = ((t[d] > t[d - 1] ? t[d] - t[d - 1] : 0) - i) * o + i, l = ((t[d] < t[d - 1] ? t[d - 1] - t[d] : 0) - l) * o + l, u = i / (i + l) * 100, u > c)
                    c = u, f = r.index;
                else if (f == r.index) {
                    c = u;
                    for (let t = 0; t < r.size; ++t)
                        t != r.index && r.vals[t] > c && (c = r.vals[t], f = t);
                }
                if (u < h)
                    h = u, a = r.index;
                else if (a == r.index) {
                    h = u;
                    for (let t = 0; t < r.size; ++t)
                        t != r.index && r.vals[t] < h && (h = r.vals[t], a = t);
                }
                if (r.vals[r.index] = u, r.index = r.index + 1, r.index >= r.size && (r.index = 0), d > 2 * e - 2) {
                    const t = c - h;
                    0 == t ? n.push(0) : n.push((u - h) / t);
                }
            } return n; })); }
            sum(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o = 0; for (let s = 0; s < e; ++s)
                o += t[s]; n.push(o); for (let r = e; r < s; ++r)
                o += t[r], o -= t[r - e], n.push(o); return n; })); }
            tema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[3 * (e - 1) - 1] = NaN; const o = 2 / (e + 1), r = 1 - o; let i = t[0], l = 0, u = 0; for (let h = 0; h < s; ++h)
                i = i * r + t[h] * o, h == e - 1 && (l = i), h >= e - 1 && (l = l * r + i * o, h == 2 * (e - 1) && (u = l), h >= 2 * (e - 1) && (u = u * r + l * o, h >= 3 * (e - 1) && n.push(3 * i - 3 * l + u))); return n; })); }
            tr(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let r; n[0] = t[0] - e[0]; for (let i = 1; i < o; ++i) {
                const o = e[i], l = t[i], u = s[i - 1], h = Math.abs(l - u), c = Math.abs(o - u);
                let a = l - o;
                h > a && (a = h), c > a && (a = c), r = a, n.push(r);
            } return n; })); }
            trima(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = 1 / (e % 2 ? (e / 2 + 1) * (e / 2 + 1) : e / 2 * (e / 2 + 1)); let r = 0, i = 0, l = 0; const u = e % 2 ? e / 2 : e / 2 - 1, h = u + 1; let c = 1; for (let s = 0; s < e - 1; ++s)
                r += t[s] * c, s + 1 > e - u && (i += t[s]), s + 1 <= h && (l += t[s]), s + 1 < h && ++c, s + 1 >= e - u && --c; let a = e - 1 - u + 1, f = e - 1 - e + 1 + h, d = e - 1 - e + 1; for (let u = e - 1; u < s; ++u)
                r += t[u], n.push(r * o), i += t[u], r += i, r -= l, i -= t[a++], l += t[f++], l -= t[d++]; return n; })); }
            trix(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[3 * (e - 1) + 1 - 1] = NaN; const o = 3 * e - 2, r = 2 / (e + 1); let i = t[0], l = 0, u = 0; for (let s = 1; s < o; ++s)
                i = (t[s] - i) * r + i, s == e - 1 ? l = i : s > e - 1 && (l = (i - l) * r + l, s == 2 * e - 2 ? u = l : s > 2 * e - 2 && (u = (l - u) * r + u)); for (let e = o; e < s; ++e) {
                i = (t[e] - i) * r + i, l = (i - l) * r + l;
                const s = u;
                u = (l - u) * r + u, n.push((u - s) / u * 100);
            } return n; })); }
            tsf(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const h = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * h, c = (i - s * o) * u;
                n.push(c + s * (e + 1)), l -= i, i -= t[r - e + 1];
            } return n; })); }
            typprice(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let r = 0; r < o; ++r)
                n.push((t[r] + e[r] + s[r]) * (1 / 3)); return n; })); }
            ultosc(t, e, s, o, r, i, l = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[i - 1] = NaN; const u = { size: i, index: 0, pushes: 0, sum: 0, vals: [] }, h = { size: i, index: 0, pushes: 0, sum: 0, vals: [] }; let c = 0, a = 0, f = 0, d = 0; for (let p = 1; p < l; ++p) {
                const l = e[p] < s[p - 1] ? e[p] : s[p - 1], v = t[p] > s[p - 1] ? t[p] : s[p - 1], x = s[p] - l, g = v - l;
                if (c += x, a += x, f += g, d += g, u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += x, u.vals[u.index] = x, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += g, h.vals[h.index] = g, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0), p > o) {
                    let t = u.index - o - 1;
                    if (t < 0 && (t += i), c -= u.vals[t], f -= h.vals[t], p > r) {
                        let t = u.index - r - 1;
                        t < 0 && (t += i), a -= u.vals[t], d -= h.vals[t];
                    }
                }
                if (p >= i) {
                    const t = 100 * (4 * c / f + 2 * a / d + 1 * u.sum / h.sum) / 7;
                    n.push(t);
                }
            } return n; })); }
            var(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = 1 / e; let r = 0, i = 0; for (let s = 0; s < e; ++s)
                r += t[s], i += t[s] * t[s]; n.push(i * o - r * o * (r * o)); for (let l = e; l < s; ++l)
                r += t[l], i += t[l] * t[l], r -= t[l - e], i -= t[l - e] * t[l - e], n.push(i * o - r * o * (r * o)); return n; })); }
            vhf(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; let o, r, i, l = 1, u = -1, h = -1, c = t[0], a = t[0], f = 0, d = t[0]; for (let s = 1; s < e; ++s)
                r = t[s], f += Math.abs(r - d), d = r; for (let p = e; p < s; ++p, ++l) {
                if (r = t[p], f += Math.abs(r - d), d = r, p > e && (f -= Math.abs(t[p - e] - t[p - e - 1])), o = r, u < l)
                    for (u = l, c = t[u], i = l; ++i <= p;)
                        o = t[i], o >= c && (c = o, u = i);
                else
                    o >= c && (u = p, c = o);
                if (o = r, h < l)
                    for (h = l, a = t[h], i = l; ++i <= p;)
                        o = t[i], o <= a && (a = o, h = i);
                else
                    o <= a && (h = p, a = o);
                n.push(Math.abs(c - a) / f);
            } return n; })); }
            vidya(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[s - 3] = NaN; const i = 1 / e, l = 1 / s; let u = 0, h = 0, c = 0, a = 0; for (let n = 0; n < s; ++n)
                c += t[n], a += t[n] * t[n], n >= s - e && (u += t[n], h += t[n] * t[n]); let f = t[s - 2]; if (n.push(f), s - 1 < r) {
                let e = Math.sqrt(h * i - u * i * (u * i)) / Math.sqrt(a * l - c * l * (c * l));
                e != e && (e = 0), e *= o, f = (t[s - 1] - f) * e + f, n.push(f);
            } for (let d = s; d < r; ++d) {
                c += t[d], a += t[d] * t[d], u += t[d], h += t[d] * t[d], c -= t[d - s], a -= t[d - s] * t[d - s], u -= t[d - e], h -= t[d - e] * t[d - e];
                let r = Math.sqrt(h * i - u * i * (u * i)) / Math.sqrt(a * l - c * l * (c * l));
                r != r && (r = 0), r *= o, f = (t[d] - f) * r + f, n.push(f);
            } return n; })); }
            volatility(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; const o = 1 / e, r = Math.sqrt(252); let i = 0, l = 0; for (let s = 1; s <= e; ++s) {
                const e = t[s] / t[s - 1] - 1;
                i += e, l += e * e;
            } n.push(Math.sqrt(l * o - i * o * (i * o)) * r); for (let u = e + 1; u < s; ++u) {
                const s = t[u] / t[u - 1] - 1;
                i += s, l += s * s;
                const h = t[u - e] / t[u - e - 1] - 1;
                i -= h, l -= h * h, n.push(Math.sqrt(l * o - i * o * (i * o)) * r);
            } return n; })); }
            vosc(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[s - 2] = NaN; const r = 1 / e, i = 1 / s; let l = 0, u = 0; for (let n = 0; n < s; ++n)
                n >= s - e && (l += t[n]), u += t[n]; const h = l * r, c = u * i; n.push(100 * (h - c) / c); for (let h = s; h < o; ++h) {
                l += t[h], l -= t[h - e], u += t[h], u -= t[h - s];
                const o = l * r, c = u * i;
                n.push(100 * (o - c) / c);
            } return n; })); }
            vwma(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[s - 2] = NaN; let r = 0, i = 0; for (let n = 0; n < s; ++n)
                r += t[n] * e[n], i += e[n]; n.push(r / i); for (let l = s; l < o; ++l)
                r += t[l] * e[l], r -= t[l - s] * e[l - s], i += e[l], i -= e[l - s], n.push(r / i); return n; })); }
            wad(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[0] = NaN; let r = 0, i = s[0]; for (let l = 1; l < o; ++l) {
                const o = s[l];
                o > i ? r += o - (i < e[l] ? i : e[l]) : o < i && (r += o - (i > t[l] ? i : t[l])), n.push(r), i = s[l];
            } return n; })); }
            wcprice(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let r = 0; r < o; ++r)
                n.push(.25 * (t[r] + e[r] + s[r] + s[r])); return n; })); }
            wilders(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = 1 / e; let r = 0; for (let s = 0; s < e; ++s)
                r += t[s]; let i = r / e; n.push(i); for (let r = e; r < s; ++r)
                i = (t[r] - i) * o + i, n.push(i); return n; })); }
            willr(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[o - 2] = NaN; let i, l, u = 0, h = -1, c = -1, a = t[0], f = e[0]; for (let d = o - 1; d < r; ++d, ++u) {
                if (i = t[d], h < u)
                    for (h = u, a = t[h], l = u; ++l <= d;)
                        i = t[l], i >= a && (a = i, h = l);
                else
                    i >= a && (h = d, a = i);
                if (i = e[d], c < u)
                    for (c = u, f = e[c], l = u; ++l <= d;)
                        i = e[l], i <= f && (f = i, c = l);
                else
                    i <= f && (c = d, f = i);
                const o = a - f, r = 0 == o ? 0 : (a - s[d]) / o * -100;
                n.push(r);
            } return n; })); }
            wma(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = e * (e + 1) / 2; let r = 0, i = 0; for (let s = 0; s < e - 1; ++s)
                i += t[s] * (s + 1), r += t[s]; for (let l = e - 1; l < s; ++l)
                i += t[l] * e, r += t[l], n.push(i / o), i -= r, r -= t[l - e + 1]; return n; })); }
            zlema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = Math.floor((e - 1) / 2), o = []; o[(e - 2) / 2 - 2] = NaN; const r = 2 / (e + 1); let i, l = t[n - 1]; for (o.push(l), i = n; i < s; ++i) {
                const e = t[i];
                l = (e + (e - t[i - n]) - l) * r + l, o.push(l);
            } return o; })); }
            abands(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = [], l = []; n[o - 2] = NaN, i[o - 2] = NaN, l[o - 2] = NaN; const u = 1 / o, h = { size: o, index: 0, pushes: 0, sum: 0, vals: [] }, c = { size: o, index: 0, pushes: 0, sum: 0, vals: [] }; let a = 0; for (let n = 0; n < o; ++n) {
                const o = 4 * (t[n] - e[n]) / (t[n] + e[n]), r = (1 + o) * t[n];
                h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += r, h.vals[h.index] = r, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0);
                const i = (1 - o) * e[n];
                c.pushes >= c.size && (c.sum -= c.vals[c.index]), c.sum += i, c.vals[c.index] = i, c.pushes += 1, c.index = c.index + 1, c.index >= c.size && (c.index = 0), a += s[n];
            } n.push(h.sum * u), i.push(c.sum * u), l.push(a * u); for (let f = o; f < r; ++f) {
                const r = 4 * (t[f] - e[f]) / (t[f] + e[f]), d = (1 + r) * t[f];
                h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += d, h.vals[h.index] = d, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0);
                const p = (1 - r) * e[f];
                c.pushes >= c.size && (c.sum -= c.vals[c.index]), c.sum += p, c.vals[c.index] = p, c.pushes += 1, c.index = c.index + 1, c.index >= c.size && (c.index = 0), a += s[f] - s[f - o], n.push(h.sum * u), i.push(c.sum * u), l.push(a * u);
            } return [n, i, l]; })); }
            alma(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const i = [], l = Math.floor(s * (e - 1)), u = e / o; let h = 0; for (let t = 0; t < e; t++)
                i[t] = Math.exp(-1 * Math.pow(t - l, 2) / (2 * Math.pow(u, 2))), h += i[t]; for (let t = 0; t < e; t++)
                i[t] /= h; for (let s = e - 1; s < r; s++) {
                let o = 0;
                for (let n = 0; n < e; n++)
                    o += t[s - e + n + 1] * i[n];
                n.push(o);
            } return n; })); }
            ce(t, e, s, o, r, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], l = []; n[o - 2] = NaN, l[o - 2] = NaN; let u, h, c = t[0] - e[0], a = t[0], f = 0, d = e[0], p = 0; for (let n = 1; n < o; ++n) {
                const o = e[n], r = t[n], i = s[n - 1], l = Math.abs(r - i), v = Math.abs(o - i);
                let x = r - o;
                l > x && (x = l), v > x && (x = v), u = x, c += u, a <= (h = t[n]) && (a = h, f = n), d >= (h = e[n]) && (d = h, p = n);
            } c /= o; const v = (o - 1) / o, x = 1 / o; n.push(a - r * c), l.push(d + r * c); for (let g = o; g < i; ++g) {
                const i = e[g], N = t[g], m = s[g - 1], M = Math.abs(N - m), z = Math.abs(i - m);
                let b = N - i;
                if (M > b && (b = M), z > b && (b = z), u = b, c = c * v + u * x, a <= (h = t[g]))
                    a = h, f = g;
                else if (f == g - o) {
                    a = t[g - o + 1], f = g - o + 1;
                    for (let e = g - o + 2; e <= g; ++e)
                        a <= (h = t[e]) && (a = h, f = e);
                }
                if (d >= (h = e[g]))
                    d = h, p = g;
                else if (p == g - o) {
                    d = e[g - o + 1], p = g - o + 1;
                    for (let t = g - o + 2; t <= g; ++t)
                        d >= (h = e[t]) && (d = h, p = t);
                }
                n.push(a - r * c), l.push(d + r * c);
            } return [n, l]; })); }
            cmf(t, e, s, o, r, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[r - 2] = NaN; let l = 0, u = 0; for (let n = 0; n < r - 1; ++n)
                u += t[n] - e[n] ? o[n] * (s[n] - e[n] - (t[n] - s[n])) / (t[n] - e[n]) : 0, l += o[n]; for (let h = r - 1; h < i; ++h)
                u += t[h] - e[h] ? o[h] * (s[h] - e[h] - (t[h] - s[h])) / (t[h] - e[h]) : 0, l += o[h], n.push(u / l), u -= t[h - r + 1] - e[h - r + 1] ? o[h - r + 1] * (s[h - r + 1] - e[h - r + 1] - (t[h - r + 1] - s[h - r + 1])) / (t[h - r + 1] - e[h - r + 1]) : 0, l -= o[h - r + 1]; return n; })); }
            copp(t, e, s) { return n(this, void 0, void 0, (function* () { const n = new Array(t.length), o = new Array(t.length), r = new Array(t.length); for (let i = 0; i < t.length; i++)
                n[i] = i < e - 1 ? null : (t[i] - t[i - e]) / t[i - e] * 100, o[i] = i < s - 1 ? null : (t[i] - t[i - s]) / t[i - s] * 100, r[i] = 10 * (n[i] + o[i]); return r; })); }
            dc(t, e, s) { return n(this, void 0, void 0, (function* () { const n = [], o = [], r = []; n[s - 2] = NaN, o[s - 2] = NaN, r[s - 2] = NaN; for (let i = s - 1; i < t.length; i++)
                n.push(Math.max(...t.slice(i - s + 1, i + 1))), o.push(Math.min(...e.slice(i - s + 1, i + 1))), r.push((n[n.length - 1] + o[o.length - 1]) / 2); return [n, r, o]; })); }
            fi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[0] = NaN; const r = 2 / (s + 1); let i = e[1] * (t[1] - t[0]); for (let s = 1; s < o; ++s)
                i = (e[s] * (t[s] - t[s - 1]) - i) * r + i, n.push(i); return n; })); }
            ikhts() { return n(this, void 0, void 0, (function* () { })); }
            kc(t, e, s, o, r, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], l = [], u = [], h = 2 / (o + 1); let c = s[0], a = t[0] - e[0]; n.push(c - r * a), l.push(c), u.push(c + r * a); let f = 0; for (let o = 1; o < i; ++o) {
                c = (s[o] - c) * h + c;
                const i = e[o], d = t[o], p = s[o - 1], v = Math.abs(d - p), x = Math.abs(i - p);
                let g = d - i;
                v > g && (g = v), x > g && (g = x), f = g, a = (f - a) * h + a, n.push(c - r * a), l.push(c), u.push(c + r * a);
            } return [n, l, u]; })); }
            kst(t, e, s, o, r, i, l, u, h, c = t.length) { return n(this, void 0, void 0, (function* () { const n = [], a = []; n[r - 1] = NaN, a[r - 1] = NaN; let f = i; f < l && (f = l), f < u && (f = u), f < h && (f = h); const d = 2 / (i + 1), p = 2 / (l + 1), v = 2 / (u + 1), x = 2 / (h + 1); function g(e, s) { return (t[e] - t[e - s]) / t[e - s]; } let N = g(e, e), m = g(s, s), M = g(o, o), z = g(r, r); for (let t = e + 1; t < r + 1 && t < c; ++t)
                N = (g(t, e) - N) * d + N; for (let t = s + 1; t < r + 1 && t < c; ++t)
                m = (g(t, s) - m) * p + m; for (let t = o + 1; t < r + 1 && t < c; ++t)
                M = (g(t, o) - M) * v + M; for (let t = r + 1; t < r + 1 && t < c; ++t)
                z = (g(t, r) - z) * x + z; let b = (1 * N + 2 * m + 3 * M + 4 * z) / 10; a.push(b); let q = b; n.push(q); for (let t = r + 1; t < c; ++t)
                N = (g(t, e) - N) * d + N, m = (g(t, s) - m) * p + m, M = (g(t, o) - M) * v + M, z = (g(t, r) - z) * x + z, b = (1 * N + 2 * m + 3 * M + 4 * z) / 10, n.push(b), q = .2 * (b - q) + q, a.push(q); return [n, a]; })); }
            mama() { return n(this, void 0, void 0, (function* () { })); }
            pbands(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = []; n[o - 2] = NaN, i[o - 2] = NaN; let l = 0, u = 0; const h = o * (o + 1) / 2, c = o * (o + 1) * (2 * o + 1) / 6; let a; for (a = 0; a < o; ++a)
                u += s[a] * (a + 1), l += s[a]; --a; const f = (u / o - h / o * l / o) / (c / o - h / o * (h / o)); let d = t[a]; for (let e = 1; e < o; ++e)
                d < t[a - e] + e * f && (d = t[a - e] + e * f); let p = e[a]; for (let t = 1; t < o; ++t)
                p > e[a - t] + t * f && (p = e[a - t] + t * f); for (i.push(d), n.push(p), ++a; a < r; ++a) {
                u += -l + s[a] * o, l += -s[a - o] + s[a];
                const r = (u / o - h / o * l / o) / (c / o - h / o * (h / o));
                let f = t[a];
                for (let e = 1; e < o; ++e)
                    f < t[a - e] + e * r && (f = t[a - e] + e * r);
                let d = e[a];
                for (let t = 1; t < o; ++t)
                    d > e[a - t] + t * r && (d = e[a - t] + t * r);
                n.push(d), i.push(f);
            } return [n, i]; })); }
            pc() { return n(this, void 0, void 0, (function* () { })); }
            pfe(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; const r = 2 / (s + 1), i = { size: e, index: 0, pushes: 0, sum: 0, vals: [] }; let l; for (l = 1; l < e; ++l)
                i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.vals[i.index] = Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0); i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.vals[i.index] = Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0); let u = 100 * (t[l] - t[l - e] > 0 ? 1 : -1) * Math.sqrt(Math.pow(t[l] - t[l - e], 2) + 100) / i.sum; for (n.push(u), l = e + 1; l < o; ++l)
                i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.vals[i.index] = Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0), u = (100 * (t[l] - t[l - e] > 0 ? 1 : -1) * Math.sqrt(Math.pow(t[l] - t[l - e], 2) + 100) / i.sum - u) * r + u, n.push(u); return n; })); }
            posc(t, e, s, o, r, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[o - 2] = NaN; let l, u = 0, h = 0; const c = o * (o + 1) / 2, a = o * (o + 1) * (2 * o + 1) / 6; let f; for (f = 0; f < o; ++f)
                h += s[f] * (f + 1), u += s[f]; --f; const d = (h / o - c / o * u / o) / (a / o - c / o * (c / o)); let p = t[f]; for (let e = 1; e < o; ++e)
                p < t[f - e] + e * d && (p = t[f - e] + e * d); let v = e[f]; for (let t = 1; t < o; ++t)
                v > e[f - t] + t * d && (v = e[f - t] + t * d); for (l = (s[f] - v) / (p - v) * 100, n.push(l), ++f; f < i; ++f) {
                h += -u + s[f] * o, u += -s[f - o] + s[f];
                const i = (h / o - c / o * u / o) / (a / o - c / o * (c / o));
                let d = t[f];
                for (let e = 1; e < o; ++e)
                    d < t[f - e] + e * i && (d = t[f - e] + e * i);
                let p = e[f];
                for (let t = 1; t < o; ++t)
                    p > e[f - t] + t * i && (p = e[f - t] + t * i);
                l = 2 * ((s[f] - p) / (d - p) * 100 - l) / (1 + r) + l, n.push(l);
            } return n; })); }
            rmi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let r, i; n[s - 1] = NaN; let l = s; for (r = 0 > t[l] - t[l - s] ? 0 : t[l] - t[l - s], i = 0 > t[l - s] - t[l] ? 0 : t[l - s] - t[l], ++l, n.push(r / (r + i) * 100); l < o; ++l)
                r = 2 * (0 > t[l] - t[l - s] ? 0 : t[l] - t[l - s] - r) / (1 + e) + r, i = 2 * (0 > t[l - s] - t[l] ? 0 : t[l - s] - t[l] - i) / (1 + e) + i, n.push(r / (r + i) * 100); return n; })); }
            rmta(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const r = 1 - s; let i = (1 - r) * t[0] + t[0], l = (1 - r) * t[0] + r * (t[0] + i); for (let s = 1; s < e - 1; ++s) {
                const e = (1 - r) * i + t[s];
                l = (1 - r) * l + r * (t[s] + e - i), i = e;
            } for (let s = e - 1; s < o; ++s) {
                const e = (1 - r) * i + t[s];
                l = (1 - r) * l + r * (t[s] + e - i), i = e, n.push(l);
            } return n; })); }
            rvi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[s - 2] = NaN; let r = 0, i = 0; const l = s * (s + 1) / 2, u = s * (s + 1) * (2 * s + 1) / 6; let h = 0, c = 0, a = 0; for (; a < s; ++a)
                i += t[a] * (a + 1), r += t[a]; --a; const f = (i / s - l / s * r / s) / (u / s - l / s * (l / s)), d = r / s - f * l / s, p = t[a] - (d + f * s); for (p > 0 ? h = p * p / s : c = p * p / s, h + c == 0 ? n.push(50) : n.push(h / (h + c) * 100), ++a; a < o; ++a) {
                i += -r + t[a] * s, r += -t[a - s] + t[a];
                const o = (i / s - l / s * r / s) / (u / s - l / s * (l / s)), f = r / s - o * l / s, d = t[a] - (f + o * s);
                d > 0 ? h = 2 * (d * d / s - h) / (e + 1) + h : c = 2 * (d * d / s - c) / (e + 1) + c, h + c == 0 ? n.push(50) : n.push(h / (h + c) * 100);
            } return n; })); }
            smi(t, e, s, o, r, i, l = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[o - 2] = NaN; let u = 1 - o, h = NaN, c = NaN, a = NaN, f = NaN, d = 0, p = 0, v = 0, x = 0, g = 0, N = 0; for (; N < l && u == 1 - o; ++N, ++u)
                p = t[N], v = u, d = e[N], x = u; for (; N < l && u < 0; ++N, ++u)
                p <= t[N] && (p = t[N], v = u), d >= e[N] && (d = e[N], x = u); for (; N < l && 0 == u; ++N, ++u)
                p <= t[N] && (p = t[N], v = u), d >= e[N] && (d = e[N], x = u), h = c = s[N] - .5 * (p + d), a = f = p - d, n.push(100 * c / (.5 * f)); for (; N < l; ++N, ++u) {
                if (v == u - o) {
                    p = t[N], v = u;
                    for (let e = 1; e < o; ++e)
                        g = t[N - e], g > p && (p = g, v = u - e);
                }
                else
                    p <= t[N] && (p = t[N], v = u);
                if (x == u - o) {
                    d = e[N], x = u;
                    for (let t = 1; t < o; ++t)
                        g = e[N - t], g < d && (d = g, x = u - t);
                }
                else
                    d >= e[N] && (d = e[N], x = u);
                h = (s[N] - .5 * (p + d) - h) * (2 / (1 + r)) + h, c = 2 / (1 + i) * (h - c) + c, a = 2 / (1 + r) * (p - d - a) + a, f = 2 / (1 + i) * (a - f) + f, n.push(100 * c / (.5 * f));
            } return n; })); }
            tsi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[0] = NaN; let r = -1, i = 0, l = 0, u = 0, h = 0, c = 0, a = 0; for (; a < o && -1 == r; ++a, ++r)
                i = t[a]; for (; a < o && 0 == r; ++a, ++r)
                u = l = t[a] - i, c = h = Math.abs(t[a] - i), n.push(100 * (c ? u / c : 0)), i = t[a]; for (; a < o; ++a, ++r)
                l = 2 * (t[a] - i - l) / (1 + e) + l, h = 2 * (Math.abs(t[a] - i) - h) / (1 + e) + h, u = 2 * (l - u) / (1 + s) + u, c = 2 * (h - c) / (1 + s) + c, n.push(100 * (c ? u / c : 0)), i = t[a]; return n; })); }
            vwap(t, e, s, o, r, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[r - 2] = NaN; let l = 1 - r, u = 0, h = 0, c = 0; for (; c < i && l < 1; ++c, ++l)
                u += (t[c] + e[c] + s[c]) / 3 * o[c], h += o[c]; for (c > 0 && 1 == l && n.push(u / h); c < i; ++c, ++l)
                u += (t[c] + e[c] + s[c]) / 3 * o[c] - (t[c - r] + e[c - r] + s[c - r]) / 3 * o[c - r], h += o[c] - o[c - r], n.push(u / h); return n; })); }
        }; }, 186: (t, e, s) => { Object.defineProperty(e, "__esModule", { value: !0 }), e.IndicatorsNormalizedSync = void 0; const n = s(409); e.IndicatorsNormalizedSync = class {
            constructor() { }
            normalize(t, e, s = NaN) { const n = t - e.length, o = []; for (let t = 0; t < n; ++t)
                o.push(s); return [...o, ...e]; }
            floor(t) { return t < 0 ? ~~t - 1 : ~~t; }
            sqrt(t, e = t / 2) { const s = (e + t / e) / 2; return (e > s ? e - s : s - e) < 1e-7 ? s : this.sqrt(t, s); }
            ad(t, e, s, n, o = s.length) { const r = []; let i = 0; for (let l = 0; l < o; ++l) {
                const o = t[l] - e[l];
                0 != o && (i += (s[l] - e[l] - t[l] + s[l]) / o * n[l]), r[l] = i;
            } return r; }
            adosc(t, e, s, n, o, r, i = s.length) { const l = r - 1, u = 2 / (o + 1), h = 2 / (r + 1), c = []; c[r - 2] = NaN; let a = 0, f = 0, d = 0; for (let o = 0; o < i; ++o) {
                const r = t[o] - e[o];
                0 != r && (a += (s[o] - e[o] - t[o] + s[o]) / r * n[o]), 0 == o ? (f = a, d = a) : (f = (a - f) * u + f, d = (a - d) * h + d), o >= l && c.push(f - d);
            } return c; }
            adx(t, e, s, n = t.length) { const o = []; o[2 * (s - 2) + 1] = NaN; const r = (s - 1) / s, i = 1 / s; let l = 0, u = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), l += s, u += o;
            } let h = 0, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100; h += p; for (let v = s; v < n; ++v) {
                let n = t[v] - t[v - 1], x = e[v - 1] - e[v];
                n < 0 ? n = 0 : n > x && (x = 0), x < 0 ? x = 0 : x > n && (n = 0), l = l * r + n, u = u * r + x, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100, v - s < s - 2 ? h += p : v - s == s - 2 ? (h += p, o.push(h * i)) : (h = h * r + p, o.push(h * i));
            } return o; }
            adxr(t, e, s, n = t.length) { const o = []; o[3 * (s - 1) - 1] = NaN; const r = (s - 1) / s, i = 1 / s; let l = 0, u = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), l += s, u += o;
            } let h = 0, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100; h += p; const v = { size: s - 1, pushes: 0, index: 0, vals: [] }, x = 3 * (s - 1); for (let g = s; g < n; ++g) {
                let n = t[g] - t[g - 1], N = e[g - 1] - e[g];
                if (n < 0 ? n = 0 : n > N && (N = 0), N < 0 ? N = 0 : N > n && (n = 0), l = l * r + n, u = u * r + N, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100, g - s < s - 2)
                    h += p;
                else if (g - s == s - 2)
                    h += p, v.vals[v.index] = h * i, v.index = v.index + 1, v.index >= v.size && (v.index = 0);
                else {
                    if (h = h * r + p, g >= x) {
                        const t = v.vals[v.index] + (v.size - 1 + 1) % v.size;
                        o.push(.5 * (h * i + t));
                    }
                    v.vals[v.index] = h * i, v.index = v.index + 1, v.index >= v.size && (v.index = 0);
                }
            } return o; }
            ao(t, e, s = t.length) { const n = []; n[32] = NaN; let o = 0, r = 0; const i = 1 / 34; for (let s = 0; s < 34; ++s) {
                const n = .5 * (t[s] + e[s]);
                o += n, s >= 29 && (r += n);
            } n.push(.2 * r - i * o); for (let l = 34; l < s; ++l) {
                const s = .5 * (t[l] + e[l]);
                o += s, r += s, o -= .5 * (t[l - 34] + e[l - 34]), r -= .5 * (t[l - 5] + e[l - 5]), n.push(.2 * r - i * o);
            } return n; }
            apo(t, e, s, n = t.length) { const o = []; o[0] = NaN; const r = 2 / (e + 1), i = 2 / (s + 1); let l = t[0], u = t[0]; for (let e = 1; e < n; ++e) {
                l = (t[e] - l) * r + l, u = (t[e] - u) * i + u;
                const s = l - u;
                o.push(s);
            } return o; }
            aroon(t, e, s, n = t.length) { const o = [], r = []; o[s - 1] = NaN, r[s - 1] = NaN; const i = 100 / s; let l, u, h = 0, c = -1, a = -1, f = t[0], d = e[0]; for (let p = s; p < n; ++p, ++h) {
                if (l = t[p], c < h)
                    for (c = h, f = t[c], u = h; ++u <= p;)
                        l = t[u], l >= f && (f = l, c = u);
                else
                    l >= f && (c = p, f = l);
                if (l = e[p], a < h)
                    for (a = h, d = e[a], u = h; ++u <= p;)
                        l = e[u], l <= d && (d = l, a = u);
                else
                    l <= d && (a = p, d = l);
                o[o.length] = (s - (p - a)) * i, r[r.length] = (s - (p - c)) * i;
            } return [o, r]; }
            aroonosc(t, e, s, n = t.length) { const o = []; o[s - 1] = NaN; const r = 100 / s; let i, l = 0, u = -1, h = -1, c = t[0], a = e[0]; for (let f = s; f < n; ++f, ++l) {
                let s = t[f];
                if (u < l)
                    for (u = l, c = t[u], i = l; ++i <= f;)
                        s = t[i], s >= c && (c = s, u = i);
                else
                    s >= c && (u = f, c = s);
                if (s = e[f], h < l)
                    for (h = l, a = e[h], i = l; ++i <= f;)
                        s = e[i], s <= a && (a = s, h = i);
                else
                    s <= a && (h = f, a = s);
                o.push((u - h) * r);
            } return o; }
            atr(t, e, s, n, o = t.length) { const r = []; r[n - 2] = NaN; const i = 1 / n; let l, u = 0; u += t[0] - e[0]; for (let o = 1; o < n; ++o) {
                const n = e[o], r = t[o], i = s[o - 1], h = Math.abs(r - i), c = Math.abs(n - i);
                let a = r - n;
                h > a && (a = h), c > a && (a = c), l = a, u += l;
            } let h = u / n; r.push(h); for (let u = n; u < o; ++u) {
                const n = e[u], o = t[u], c = s[u - 1], a = Math.abs(o - c), f = Math.abs(n - c);
                let d = o - n;
                a > d && (d = a), f > d && (d = f), l = d, h = (l - h) * i + h, r.push(h);
            } return r; }
            avgprice(t, e, s, n, o = t.length) { const r = []; for (let i = 0; i < o; ++i)
                r.push(.25 * (t[i] + e[i] + s[i] + n[i])); return r; }
            bbands(t, e, s, n = t.length) { const o = [], r = [], i = []; o[e - 2] = NaN, r[e - 2] = NaN, i[e - 2] = NaN; const l = 1 / e; let u = 0, h = 0; for (let s = 0; s < e; ++s)
                u += t[s], h += t[s] * t[s]; let c = Math.sqrt(h * l - u * l * (u * l)); const a = u * l; o.push(a - s * c), i.push(a + s * c), r.push(a); for (let a = e; a < n; ++a) {
                u += t[a], h += t[a] * t[a], u -= t[a - e], h -= t[a - e] * t[a - e], c = Math.sqrt(h * l - u * l * (u * l));
                const n = u * l;
                i.push(n + s * c), o.push(n - s * c), r.push(n);
            } return [o, r, i]; }
            bop(t, e, s, n, o = t.length) { const r = []; for (let i = 0; i < o; ++i) {
                const o = e[i] - s[i];
                r[i] = o <= 0 ? 0 : (n[i] - t[i]) / o;
            } return r; }
            cci(t, e, s, o, r = t.length) { const i = 1 / o, l = []; l[2 * (o - 2) + 1] = NaN; const u = new n.ti_buffer(o); let h, c; for (h = 0; h < r; ++h) {
                const n = (t[h] + e[h] + s[h]) * (1 / 3);
                u.push(n);
                const r = u.sum * i;
                if (h >= 2 * o - 2) {
                    let t = 0;
                    for (c = 0; c < o; ++c)
                        t += Math.abs(r - u.vals[c]);
                    let e = t * i;
                    e *= .015, e = (n - r) / e, l.push(e);
                }
            } return l; }
            cmo(t, e, s = t.length) { const n = []; n[e - 1] = NaN; let o = 0, r = 0; for (let s = 1; s <= e; ++s)
                o += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, r += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; n.push(100 * (o - r) / (o + r)); for (let i = e + 1; i < s; ++i)
                o -= t[i - e] > t[i - e - 1] ? t[i - e] - t[i - e - 1] : 0, r -= t[i - e] < t[i - e - 1] ? t[i - e - 1] - t[i - e] : 0, o += t[i] > t[i - 1] ? t[i] - t[i - 1] : 0, r += t[i] < t[i - 1] ? t[i - 1] - t[i] : 0, n.push(100 * (o - r) / (o + r)); return n; }
            crossany(t, e, s = t.length) { const n = []; for (let o = 0; o < s; ++o)
                n.push(t[o] > e[o] && t[o - 1] <= e[o - 1] || t[o] < e[o] && t[o - 1] >= e[o - 1]); return n; }
            crossover(t, e, s = t.length) { const n = []; for (let o = 0; o < s; ++o)
                n.push(t[o] > e[o] && t[o - 1] <= e[o - 1]); return n; }
            crossOverNumber(t, e) { const s = []; for (let n = 0; n < t.length; n++) {
                const o = t[n], r = t[n - 1];
                o > e && r <= e ? s.push(!0) : s.push(!1);
            } return s; }
            crossUnderNumber(t, e) { const s = []; for (let n = 0; n < t.length; n++) {
                const o = t[n], r = t[n - 1];
                o < e && r >= e ? s.push(!0) : s.push(!1);
            } return s; }
            cvi(t, e, s, o = t.length) { const r = []; r[2 * (s - 1)] = NaN; const i = 2 / (s + 1), l = new n.ti_buffer(s); let u, h = t[0] - e[0]; for (u = 1; u < 2 * s - 1; ++u)
                h = (t[u] - e[u] - h) * i + h, l.qpush(h); for (u = 2 * s - 1; u < o; ++u) {
                h = (t[u] - e[u] - h) * i + h;
                const s = l.vals[l.index];
                r.push(100 * (h - s) / s), l.qpush(h);
            } return r; }
            decay(t, e, s = t.length) { const n = [], o = 1 / e; n.push(t[0]); for (let e = 1; e < s; ++e) {
                const s = n[n.length - 1] - o;
                n.push(t[e] > s ? t[e] : s);
            } return n; }
            dema(t, e, s = t.length) { const n = []; n[2 * (e - 1) - 1] = NaN; const o = 2 / (e + 1), r = 1 - o; let i = t[0], l = i; for (let u = 0; u < s; ++u)
                i = i * r + t[u] * o, u == e - 1 && (l = i), u >= e - 1 && (l = l * r + i * o, u >= 2 * (e - 1) && n.push(2 * i - l)); return n; }
            di(t, e, s, n, o = t.length) { const r = [], i = []; r[n - 2] = NaN, i[n - 2] = NaN; const l = (n - 1) / n; let u = 0, h = 0, c = 0; for (let o = 1; o < n; ++o) {
                const n = e[o], r = t[o], i = s[o - 1], l = Math.abs(r - i), a = Math.abs(n - i);
                let f = r - n;
                l > f && (f = l), a > f && (f = a), u += f;
                let d = t[o] - t[o - 1], p = e[o - 1] - e[o];
                d < 0 ? d = 0 : d > p && (p = 0), p < 0 ? p = 0 : p > d && (d = 0), h += d, c += p;
            } r.push(100 * h / u), i.push(100 * c / u); for (let a = n; a < o; ++a) {
                const n = e[a], o = t[a], f = s[a - 1], d = Math.abs(o - f), p = Math.abs(n - f);
                let v = o - n;
                d > v && (v = d), p > v && (v = p), u = u * l + v;
                let x = t[a] - t[a - 1], g = e[a - 1] - e[a];
                x < 0 ? x = 0 : x > g && (g = 0), g < 0 ? g = 0 : g > x && (x = 0), h = h * l + x, c = c * l + g, r.push(100 * h / u), i.push(100 * c / u);
            } return [r, i]; }
            dm(t, e, s, n = t.length) { const o = [], r = []; o[s - 2] = NaN, r[s - 2] = NaN; const i = (s - 1) / s; let l = 0, u = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), l += s, u += o;
            } o.push(l), r.push(u); for (let h = s; h < n; ++h) {
                let s = t[h] - t[h - 1], n = e[h - 1] - e[h];
                s < 0 ? s = 0 : s > n && (n = 0), n < 0 ? n = 0 : n > s && (s = 0), l = l * i + s, u = u * i + n, o.push(l), r.push(u);
            } return [o, r]; }
            dpo(t, e, s = t.length) { const n = e / 2 + 1, o = []; o[e - 2] = NaN; const r = 1 / e; let i = 0; for (let s = 0; s < e; ++s)
                i += t[s]; o.push(t[e - 1 - n] - i * r); for (let l = e; l < s; ++l)
                i += t[l], i -= t[l - e], o.push(t[l - n] - i * r); return o; }
            dx(t, e, s, n = t.length) { const o = []; o[s - 2] = NaN; const r = (s - 1) / s; let i = 0, l = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), i += s, l += o;
            } let u = i, h = l, c = Math.abs(u - h), a = u + h, f = c / a * 100; o.push(f); for (let d = s; d < n; ++d) {
                let s = t[d] - t[d - 1], n = e[d - 1] - e[d];
                s < 0 ? s = 0 : s > n && (n = 0), n < 0 ? n = 0 : n > s && (s = 0), i = i * r + s, l = l * r + n, u = i, h = l, c = Math.abs(u - h), a = u + h, f = c / a * 100, o.push(f);
            } return o; }
            edecay(t, e, s = t.length) { const n = [], o = 1 - 1 / e; n.push(t[0]); for (let e = 1; e < s; ++e) {
                const s = n[n.length - 1] * o;
                n.push(t[e] > s ? t[e] : s);
            } return n; }
            ema(t, e, s = t.length) { const n = [], o = 2 / (e + 1); let r = t[0]; n.push(r); for (let e = 1; e < s; ++e)
                r = (t[e] - r) * o + r, n.push(r); return n; }
            emv(t, e, s, n = t.length) { const o = []; o[0] = NaN; let r = .5 * (t[0] + e[0]); for (let i = 1; i < n; ++i) {
                const n = .5 * (t[i] + e[i]), l = s[i] / 1e4 / (t[i] - e[i]);
                o.push((n - r) / l), r = n;
            } return o; }
            fisher(t, e, s, n = t.length) { const o = [], r = []; o[s - 2] = NaN, r[s - 2] = NaN; let i, l, u = 0, h = -1, c = -1, a = .5 * (t[0] + e[0]), f = .5 * (t[0] + e[0]), d = 0, p = 0; for (let v = s - 1; v < n; ++v, ++u) {
                if (i = .5 * (t[v] + e[v]), h < u)
                    for (h = u, a = .5 * (t[h] + e[h]), l = u; ++l <= v;)
                        i = .5 * (t[l] + e[l]), i >= a && (a = i, h = l);
                else
                    i >= a && (h = v, a = i);
                if (i = .5 * (t[v] + e[v]), c < u)
                    for (c = u, f = .5 * (t[c] + e[c]), l = u; ++l <= v;)
                        i = .5 * (t[l] + e[l]), i <= f && (f = i, c = l);
                else
                    i <= f && (c = v, f = i);
                let s = a - f;
                0 == s && (s = .001), d = .66 * ((.5 * (t[v] + e[v]) - f) / s - .5) + .67 * d, d > .99 && (d = .999), d < -.99 && (d = -.999), r.push(p), p = .5 * Math.log((1 + d) / (1 - d)) + .5 * p, o.push(p);
            } return [o, r]; }
            fosc(t, e, s = t.length) { const n = []; n[e - 1] = NaN; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; let h = 0; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const c = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * c, a = (i - s * o) * u;
                r >= e && n.push(100 * (t[r] - h) / t[r]), h = a + s * (e + 1), l -= i, i -= t[r - e + 1];
            } return n; }
            hma(t, e, s = t.length) { const o = [], r = Math.floor(e / 2), i = Math.floor(Math.sqrt(e)), l = e * (e + 1) / 2, u = r * (r + 1) / 2, h = i * (i + 1) / 2; o[e - 1 + i - 2] = NaN; let c, a = 0, f = 0, d = 0, p = 0, v = 0, x = 0; for (c = 0; c < e - 1; ++c)
                f += t[c] * (c + 1), a += t[c], c >= e - r && (p += t[c] * (c + 1 - (e - r)), d += t[c]); const g = new n.ti_buffer(i); for (c = e - 1; c < s; ++c) {
                f += t[c] * e, a += t[c], p += t[c] * r, d += t[c];
                const s = p / u * 2 - f / l;
                x += s * i, v += s, g.qpush(s), c >= e - 1 + (i - 1) ? (o.push(x / h), x -= v, v -= g.get(1)) : x -= v, f -= a, a -= t[c - e + 1], p -= d, d -= t[c - r + 1];
            } return o; }
            kama(t, e, s = t.length) { const n = []; n[e - 2] = NaN; let o = 0; for (let s = 1; s < e; ++s)
                o += Math.abs(t[s] - t[s - 1]); let r, i, l = t[e - 1]; n.push(l); for (let u = e; u < s; ++u)
                o += Math.abs(t[u] - t[u - 1]), u > e && (o -= Math.abs(t[u - e] - t[u - e - 1])), r = 0 != o ? Math.abs(t[u] - t[u - e]) / o : 1, i = Math.pow(.6021505376344085 * r + .06451612903225806, 2), l += i * (t[u] - l), n.push(l); return n; }
            kvo(t, e, s, n, o, r, i = t.length) { const l = 2 / (o + 1), u = 2 / (r + 1), h = []; h[0] = NaN; let c = 0, a = t[0] + e[0] + s[0], f = -1, d = 0, p = 0; for (let o = 1; o < i; ++o) {
                const r = t[o] + e[o] + s[o], i = t[o] - e[o];
                r > a && 1 != f ? (f = 1, c = t[o - 1] - e[o - 1]) : r < a && 0 != f && (f = 0, c = t[o - 1] - e[o - 1]), c += i;
                const v = n[o] * Math.abs(i / c * 2 - 1) * 100 * (f ? 1 : -1);
                1 == o ? (d = v, p = v) : (d = (v - d) * l + d, p = (v - p) * u + p), h.push(d - p), a = r;
            } return h; }
            lag(t, e, s = t.length) { const n = []; n[e - 1] = NaN; for (let o = e; o < s; ++o)
                n.push(t[o - e]); return n; }
            linreg(t, e, s = t.length) { const n = []; n[e - 2] = NaN; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const h = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * h, c = (i - s * o) * u;
                n.push(c + s * e), l -= i, i -= t[r - e + 1];
            } return n; }
            linregintercept(t, e, s = t.length) { const n = []; n[e - 2] = NaN; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const h = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * h, c = (i - s * o) * u;
                n.push(c + 1 * s), l -= i, i -= t[r - e + 1];
            } return n; }
            linregslope(t, e, s = t.length) { const n = []; n[e - 2] = NaN; let o = 0, r = 0, i = 0, l = 0; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const u = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * u;
                n.push(s), l -= i, i -= t[r - e + 1];
            } return n; }
            macd(t, e, s, n, o = t.length) { const r = [], i = [], l = []; r[s - 2] = NaN, i[s - 2] = NaN, l[s - 2] = NaN; const u = 2 / (e + 1), h = 2 / (s + 1), c = 2 / (n + 1); let a = t[0], f = t[0], d = 0; for (let e = 1; e < o; ++e) {
                a = (t[e] - a) * u + a, f = (t[e] - f) * h + f;
                const n = a - f;
                e == s - 1 && (d = n), e >= s - 1 && (d = (n - d) * c + d, r.push(n), i.push(d), l.push(n - d));
            } return [r, i, l]; }
            marketfi(t, e, s, n = t.length) { const o = []; for (let r = 0; r < n; ++r)
                o.push((t[r] - e[r]) / s[r]); return o; }
            mass(t, e, s, n = t.length) { const o = []; o[16 + s - 2] = NaN; let r = t[0] - e[0], i = r; const l = { index: 0, pushes: 0, size: s, sum: 0, vals: [] }; for (let u = 0; u < n; ++u)
                r = .8 * r + .2 * (t[u] - e[u]), 8 == u && (i = r), u >= 8 && (i = .8 * i + .2 * r, u >= 16 && (l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += r / i, l.vals[l.index] = r / i, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0), u >= 16 + s - 1 && o.push(l.sum))); return o; }
            max(t, e, s = t.length) { const n = []; n[e - 2] = NaN; let o, r = 0, i = -1, l = t[0]; for (let u = e - 1; u < s; ++u, ++r) {
                let e = t[u];
                if (i < r)
                    for (i = r, l = t[i], o = r; ++o <= u;)
                        e = t[o], e >= l && (l = e, i = o);
                else
                    e >= l && (i = u, l = e);
                n.push(l);
            } return n; }
            md(t, e, s = t.length) { const n = []; n[e - 2] = NaN; const o = 1 / e; let r, i = 0; for (let l = 0; l < s; ++l) {
                i += t[l], l >= e && (i -= t[l - e]);
                const s = i * o;
                if (l >= e - 1) {
                    let i = 0;
                    for (r = 0; r < e; ++r)
                        i += Math.abs(s - t[l - r]);
                    n.push(i * o);
                }
            } return n; }
            medprice(t, e, s = t.length) { const n = []; for (let o = 0; o < s; ++o)
                n.push(.5 * (t[o] + e[o])); return n; }
            mfi(t, e, s, n, o, r = t.length) { const i = []; i[o - 1] = NaN; let l = (t[0] + e[0] + s[0]) * (1 / 3); const u = { size: o, index: 0, pushes: 0, sum: 0, vals: [] }, h = { size: o, index: 0, pushes: 0, sum: 0, vals: [] }; for (let c = 1; c < r; ++c) {
                const r = (t[c] + e[c] + s[c]) * (1 / 3), a = r * n[c];
                r > l ? (u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += a, u.vals[u.index] = a, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += 0, h.vals[h.index] = 0, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0)) : r < l ? (h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += a, h.vals[h.index] = a, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0), u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += 0, u.vals[u.index] = 0, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0)) : (u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += 0, u.vals[u.index] = 0, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += 0, h.vals[h.index] = 0, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0)), l = r, c >= o && i.push(u.sum / (u.sum + h.sum) * 100);
            } return i; }
            min(t, e, s = t.length) { const n = []; n[e - 2] = NaN; let o, r = 0, i = -1, l = t[0]; for (let u = e - 1; u < s; ++u, ++r) {
                let e = t[u];
                if (i < r)
                    for (i = r, l = t[i], o = r; ++o <= u;)
                        e = t[o], e <= l && (l = e, i = o);
                else
                    e <= l && (i = u, l = e);
                n.push(l);
            } return n; }
            mom(t, e, s = t.length) { const n = []; n[e - 1] = NaN; for (let o = e; o < s; ++o)
                n.push(t[o] - t[o - e]); return n; }
            msw(t, e, s = t.length) { const n = [], o = []; n[e - 1] = NaN, o[e - 1] = NaN; const r = 3.1415926, i = 2 * r; let l, u, h, c, a = 0; for (let f = e; f < s; ++f) {
                for (u = 0, h = 0, c = 0; c < e; ++c)
                    a = t[f - c], u += Math.cos(i * c / e) * a, h += Math.sin(i * c / e) * a;
                l = Math.abs(u) > .001 ? Math.atan(h / u) : i / 2 * (h < 0 ? -1 : 1), u < 0 && (l += r), l += r / 2, l < 0 && (l += i), l > i && (l -= i), n.push(Math.sin(l)), o.push(Math.sin(l + r / 4));
            } return [n, o]; }
            natr(t, e, s, n, o = t.length) { const r = []; r[n - 2] = NaN; const i = 1 / n; let l, u = 0; u += t[0] - e[0]; for (let o = 1; o < n; ++o) {
                const n = e[o], r = t[o], i = s[o - 1], h = Math.abs(r - i), c = Math.abs(n - i);
                let a = r - n;
                h > a && (a = h), c > a && (a = c), l = a, u += l;
            } let h = u / n; r.push(100 * h / s[n - 1]); for (let u = n; u < o; ++u) {
                const n = e[u], o = t[u], c = s[u - 1], a = Math.abs(o - c), f = Math.abs(n - c);
                let d = o - n;
                a > d && (d = a), f > d && (d = f), l = d, h = (l - h) * i + h, r.push(100 * h / s[u]);
            } return r; }
            nvi(t, e, s = t.length) { const n = []; let o = 1e3; n.push(o); for (let r = 1; r < s; ++r)
                e[r] < e[r - 1] && (o += (t[r] - t[r - 1]) / t[r - 1] * o), n.push(o); return n; }
            obv(t, e, s = t.length) { const n = []; let o = 0; n.push(o); let r = t[0]; for (let i = 1; i < s; ++i)
                t[i] > r ? o += e[i] : t[i] < r && (o -= e[i]), r = t[i], n.push(o); return n; }
            ppo(t, e, s, n = t.length) { const o = []; o[0] = NaN; const r = 2 / (e + 1), i = 2 / (s + 1); let l = t[0], u = t[0]; for (let e = 1; e < n; ++e) {
                l = (t[e] - l) * r + l, u = (t[e] - u) * i + u;
                const s = 100 * (l - u) / u;
                o.push(s);
            } return o; }
            psar(t, e, s, n, o = t.length) { const r = []; let i, l, u; r[0] = NaN, i = t[0] + e[0] <= t[1] + e[1] ? 1 : 0, i ? (u = t[0], l = e[0]) : (u = e[0], l = t[0]); let h = s; for (let c = 1; c < o; ++c)
                l = (u - l) * h + l, i ? (c >= 2 && l > e[c - 2] && (l = e[c - 2]), l > e[c - 1] && (l = e[c - 1]), h < n && t[c] > u && (h += s, h > n && (h = n)), t[c] > u && (u = t[c])) : (c >= 2 && l < t[c - 2] && (l = t[c - 2]), l < t[c - 1] && (l = t[c - 1]), h < n && e[c] < u && (h += s, h > n && (h = n)), e[c] < u && (u = e[c])), (i && e[c] < l || !i && t[c] > l) && (h = s, l = u, i = !i, u = i ? t[c] : e[c]), r.push(l); return r; }
            pvi(t, e, s = t.length) { const n = []; let o = 1e3; n.push(o); for (let r = 1; r < s; ++r)
                e[r] > e[r - 1] && (o += (t[r] - t[r - 1]) / t[r - 1] * o), n.push(o); return n; }
            qstick(t, e, s, n = e.length) { const o = []; o[s - 1] = NaN; const r = 1 / s; let i, l = 0; for (i = 0; i < s; ++i)
                l += e[i] - t[i]; for (o.push(l * r), i = s; i < n; ++i)
                l += e[i] - t[i], l -= e[i - s] - t[i - s], o.push(l * r); return o; }
            roc(t, e, s = t.length) { const n = []; n[e - 1] = NaN; for (let o = e; o < s; ++o)
                n.push((t[o] - t[o - e]) / t[o - e]); return n; }
            rocr(t, e, s = t.length) { const n = []; n[e - 1] = NaN; for (let o = e; o < s; ++o)
                n.push(t[o] / t[o - e]); return n; }
            rsi(t, e, s = t.length) { const n = []; n[e - 1] = NaN; const o = 1 / e; let r = 0, i = 0; for (let s = 1; s <= e; ++s)
                r += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, i += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; r /= e, i /= e, n.push(r / (r + i) * 100); for (let l = e + 1; l < s; ++l)
                r = ((t[l] > t[l - 1] ? t[l] - t[l - 1] : 0) - r) * o + r, i = ((t[l] < t[l - 1] ? t[l - 1] - t[l] : 0) - i) * o + i, n.push(r / (r + i) * 100); return n; }
            sma(t, e, s = t.length) { const n = []; n[e - 2] = NaN; const o = 1 / e; let r = 0; for (let s = 0; s < e; ++s)
                r += t[s]; n.push(r * o); for (let i = e; i < s; ++i)
                r += t[i], r -= t[i - e], n.push(r * o); return n; }
            stddev(t, e, s = t.length) { const n = []; n[e - 2] = NaN; const o = 1 / e; let r = 0, i = 0; for (let s = 0; s < e; ++s)
                r += t[s], i += t[s] * t[s]; let l = i * o - r * o * (r * o); l > 0 && (l = Math.sqrt(l)), n.push(l); for (let l = e; l < s; ++l) {
                r += t[l], i += t[l] * t[l], r -= t[l - e], i -= t[l - e] * t[l - e];
                let s = i * o - r * o * (r * o);
                s > 0 && (s = Math.sqrt(s)), n.push(s);
            } return n; }
            stderr(t, e, s = t.length) { const n = []; n[e - 2] = NaN; const o = 1 / e; let r = 0, i = 0; const l = 1 / Math.sqrt(e); for (let s = 0; s < e; ++s)
                r += t[s], i += t[s] * t[s]; let u = i * o - r * o * (r * o); u > 0 && (u = Math.sqrt(u)), n.push(l * u); for (let u = e; u < s; ++u) {
                r += t[u], i += t[u] * t[u], r -= t[u - e], i -= t[u - e] * t[u - e];
                let s = i * o - r * o * (r * o);
                s > 0 && (s = Math.sqrt(s)), n.push(l * s);
            } return n; }
            stoch(t, e, s, n, o, r, i = t.length) { const l = 1 / o, u = 1 / r, h = [], c = []; h[n + o + r - 3 - 1] = NaN, c[n + o + r - 3 - 1] = NaN; let a, f = 0, d = -1, p = -1, v = t[0], x = e[0]; const g = { size: o, index: 0, pushes: 0, sum: 0, vals: [] }, N = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }; let m; for (let M = 0; M < i; ++M) {
                if (M >= n && ++f, a = t[M], d < f)
                    for (d = f, v = t[d], m = f; ++m <= M;)
                        a = t[m], a >= v && (v = a, d = m);
                else
                    a >= v && (d = M, v = a);
                if (a = e[M], p < f)
                    for (p = f, x = e[p], m = f; ++m <= M;)
                        a = e[m], a <= x && (x = a, p = m);
                else
                    a <= x && (p = M, x = a);
                const i = v - x, z = 0 == i ? 0 : (s[M] - x) / i * 100;
                if (g.pushes >= g.size && (g.sum -= g.vals[g.index]), g.sum += z, g.vals[g.index] = z, g.pushes += 1, g.index = g.index + 1, g.index >= g.size && (g.index = 0), M >= n - 1 + o - 1) {
                    const t = g.sum * l;
                    N.pushes >= N.size && (N.sum -= N.vals[N.index]), N.sum += t, N.vals[N.index] = t, N.pushes += 1, N.index = N.index + 1, N.index >= N.size && (N.index = 0), M >= n - 1 + o - 1 + r - 1 && (h.push(t), c.push(N.sum * u));
                }
            } return [h, c]; }
            stochrsi(t, e, s = t.length) { const n = []; n[2 * e - 2] = NaN; const o = 1 / e, r = { size: e, index: 0, pushes: 0, sum: 0, vals: [] }; let i = 0, l = 0; for (let s = 1; s <= e; ++s)
                i += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, l += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; i /= e, l /= e; let u = i / (i + l) * 100; r.pushes >= r.size && (r.sum -= r.vals[r.index]), r.sum += u, r.vals[r.index] = u, r.pushes += 1, r.index = r.index + 1, r.index >= r.size && (r.index = 0); let h = u, c = u, a = 0, f = 0; for (let d = e + 1; d < s; ++d) {
                if (i = ((t[d] > t[d - 1] ? t[d] - t[d - 1] : 0) - i) * o + i, l = ((t[d] < t[d - 1] ? t[d - 1] - t[d] : 0) - l) * o + l, u = i / (i + l) * 100, u > c)
                    c = u, f = r.index;
                else if (f == r.index) {
                    c = u;
                    for (let t = 0; t < r.size; ++t)
                        t != r.index && r.vals[t] > c && (c = r.vals[t], f = t);
                }
                if (u < h)
                    h = u, a = r.index;
                else if (a == r.index) {
                    h = u;
                    for (let t = 0; t < r.size; ++t)
                        t != r.index && r.vals[t] < h && (h = r.vals[t], a = t);
                }
                if (r.vals[r.index] = u, r.index = r.index + 1, r.index >= r.size && (r.index = 0), d > 2 * e - 2) {
                    const t = c - h;
                    0 == t ? n.push(0) : n.push((u - h) / t);
                }
            } return n; }
            sum(t, e, s = t.length) { const n = []; n[e - 2] = NaN; let o = 0; for (let s = 0; s < e; ++s)
                o += t[s]; n.push(o); for (let r = e; r < s; ++r)
                o += t[r], o -= t[r - e], n.push(o); return n; }
            tema(t, e, s = t.length) { const n = []; n[3 * (e - 1) - 1] = NaN; const o = 2 / (e + 1), r = 1 - o; let i = t[0], l = 0, u = 0; for (let h = 0; h < s; ++h)
                i = i * r + t[h] * o, h == e - 1 && (l = i), h >= e - 1 && (l = l * r + i * o, h == 2 * (e - 1) && (u = l), h >= 2 * (e - 1) && (u = u * r + l * o, h >= 3 * (e - 1) && n.push(3 * i - 3 * l + u))); return n; }
            tr(t, e, s, n = t.length) { const o = []; let r; o[0] = t[0] - e[0]; for (let i = 1; i < n; ++i) {
                const n = e[i], l = t[i], u = s[i - 1], h = Math.abs(l - u), c = Math.abs(n - u);
                let a = l - n;
                h > a && (a = h), c > a && (a = c), r = a, o.push(r);
            } return o; }
            trima(t, e, s = t.length) { const n = []; n[e - 2] = NaN; const o = 1 / (e % 2 ? (e / 2 + 1) * (e / 2 + 1) : e / 2 * (e / 2 + 1)); let r = 0, i = 0, l = 0; const u = e % 2 ? e / 2 : e / 2 - 1, h = u + 1; let c = 1; for (let s = 0; s < e - 1; ++s)
                r += t[s] * c, s + 1 > e - u && (i += t[s]), s + 1 <= h && (l += t[s]), s + 1 < h && ++c, s + 1 >= e - u && --c; let a = e - 1 - u + 1, f = e - 1 - e + 1 + h, d = e - 1 - e + 1; for (let u = e - 1; u < s; ++u)
                r += t[u], n.push(r * o), i += t[u], r += i, r -= l, i -= t[a++], l += t[f++], l -= t[d++]; return n; }
            trix(t, e, s = t.length) { const n = []; n[3 * (e - 1) + 1 - 1] = NaN; const o = 3 * e - 2, r = 2 / (e + 1); let i = t[0], l = 0, u = 0; for (let s = 1; s < o; ++s)
                i = (t[s] - i) * r + i, s == e - 1 ? l = i : s > e - 1 && (l = (i - l) * r + l, s == 2 * e - 2 ? u = l : s > 2 * e - 2 && (u = (l - u) * r + u)); for (let e = o; e < s; ++e) {
                i = (t[e] - i) * r + i, l = (i - l) * r + l;
                const s = u;
                u = (l - u) * r + u, n.push((u - s) / u * 100);
            } return n; }
            tsf(t, e, s = t.length) { const n = []; n[e - 2] = NaN; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const h = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * h, c = (i - s * o) * u;
                n.push(c + s * (e + 1)), l -= i, i -= t[r - e + 1];
            } return n; }
            typprice(t, e, s, n = t.length) { const o = []; for (let r = 0; r < n; ++r)
                o.push((t[r] + e[r] + s[r]) * (1 / 3)); return o; }
            ultosc(t, e, s, n, o, r, i = t.length) { const l = []; l[r - 1] = NaN; const u = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }, h = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }; let c = 0, a = 0, f = 0, d = 0; for (let p = 1; p < i; ++p) {
                const i = e[p] < s[p - 1] ? e[p] : s[p - 1], v = t[p] > s[p - 1] ? t[p] : s[p - 1], x = s[p] - i, g = v - i;
                if (c += x, a += x, f += g, d += g, u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += x, u.vals[u.index] = x, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += g, h.vals[h.index] = g, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0), p > n) {
                    let t = u.index - n - 1;
                    if (t < 0 && (t += r), c -= u.vals[t], f -= h.vals[t], p > o) {
                        let t = u.index - o - 1;
                        t < 0 && (t += r), a -= u.vals[t], d -= h.vals[t];
                    }
                }
                if (p >= r) {
                    const t = 100 * (4 * c / f + 2 * a / d + 1 * u.sum / h.sum) / 7;
                    l.push(t);
                }
            } return l; }
            var(t, e, s = t.length) { const n = []; n[e - 2] = NaN; const o = 1 / e; let r = 0, i = 0; for (let s = 0; s < e; ++s)
                r += t[s], i += t[s] * t[s]; n.push(i * o - r * o * (r * o)); for (let l = e; l < s; ++l)
                r += t[l], i += t[l] * t[l], r -= t[l - e], i -= t[l - e] * t[l - e], n.push(i * o - r * o * (r * o)); return n; }
            vhf(t, e, s = t.length) { const n = []; n[e - 1] = NaN; let o, r, i, l = 1, u = -1, h = -1, c = t[0], a = t[0], f = 0, d = t[0]; for (let s = 1; s < e; ++s)
                r = t[s], f += Math.abs(r - d), d = r; for (let p = e; p < s; ++p, ++l) {
                if (r = t[p], f += Math.abs(r - d), d = r, p > e && (f -= Math.abs(t[p - e] - t[p - e - 1])), o = r, u < l)
                    for (u = l, c = t[u], i = l; ++i <= p;)
                        o = t[i], o >= c && (c = o, u = i);
                else
                    o >= c && (u = p, c = o);
                if (o = r, h < l)
                    for (h = l, a = t[h], i = l; ++i <= p;)
                        o = t[i], o <= a && (a = o, h = i);
                else
                    o <= a && (h = p, a = o);
                n.push(Math.abs(c - a) / f);
            } return n; }
            vidya(t, e, s, n, o = t.length) { const r = []; r[s - 3] = NaN; const i = 1 / e, l = 1 / s; let u = 0, h = 0, c = 0, a = 0; for (let n = 0; n < s; ++n)
                c += t[n], a += t[n] * t[n], n >= s - e && (u += t[n], h += t[n] * t[n]); let f = t[s - 2]; if (r.push(f), s - 1 < o) {
                let e = Math.sqrt(h * i - u * i * (u * i)) / Math.sqrt(a * l - c * l * (c * l));
                e != e && (e = 0), e *= n, f = (t[s - 1] - f) * e + f, r.push(f);
            } for (let d = s; d < o; ++d) {
                c += t[d], a += t[d] * t[d], u += t[d], h += t[d] * t[d], c -= t[d - s], a -= t[d - s] * t[d - s], u -= t[d - e], h -= t[d - e] * t[d - e];
                let o = Math.sqrt(h * i - u * i * (u * i)) / Math.sqrt(a * l - c * l * (c * l));
                o != o && (o = 0), o *= n, f = (t[d] - f) * o + f, r.push(f);
            } return r; }
            volatility(t, e, s = t.length) { const n = []; n[e - 1] = NaN; const o = 1 / e, r = Math.sqrt(252); let i = 0, l = 0; for (let s = 1; s <= e; ++s) {
                const e = t[s] / t[s - 1] - 1;
                i += e, l += e * e;
            } n.push(Math.sqrt(l * o - i * o * (i * o)) * r); for (let u = e + 1; u < s; ++u) {
                const s = t[u] / t[u - 1] - 1;
                i += s, l += s * s;
                const h = t[u - e] / t[u - e - 1] - 1;
                i -= h, l -= h * h, n.push(Math.sqrt(l * o - i * o * (i * o)) * r);
            } return n; }
            vosc(t, e, s, n = t.length) { const o = []; o[s - 2] = NaN; const r = 1 / e, i = 1 / s; let l = 0, u = 0; for (let n = 0; n < s; ++n)
                n >= s - e && (l += t[n]), u += t[n]; const h = l * r, c = u * i; o.push(100 * (h - c) / c); for (let h = s; h < n; ++h) {
                l += t[h], l -= t[h - e], u += t[h], u -= t[h - s];
                const n = l * r, c = u * i;
                o.push(100 * (n - c) / c);
            } return o; }
            vwma(t, e, s, n = t.length) { const o = []; o[s - 2] = NaN; let r = 0, i = 0; for (let n = 0; n < s; ++n)
                r += t[n] * e[n], i += e[n]; o.push(r / i); for (let l = s; l < n; ++l)
                r += t[l] * e[l], r -= t[l - s] * e[l - s], i += e[l], i -= e[l - s], o.push(r / i); return o; }
            wad(t, e, s, n = t.length) { const o = []; o[0] = NaN; let r = 0, i = s[0]; for (let l = 1; l < n; ++l) {
                const n = s[l];
                n > i ? r += n - (i < e[l] ? i : e[l]) : n < i && (r += n - (i > t[l] ? i : t[l])), o.push(r), i = s[l];
            } return o; }
            wcprice(t, e, s, n = t.length) { const o = []; for (let r = 0; r < n; ++r)
                o.push(.25 * (t[r] + e[r] + s[r] + s[r])); return o; }
            wilders(t, e, s = t.length) { const n = []; n[e - 2] = NaN; const o = 1 / e; let r = 0; for (let s = 0; s < e; ++s)
                r += t[s]; let i = r / e; n.push(i); for (let r = e; r < s; ++r)
                i = (t[r] - i) * o + i, n.push(i); return n; }
            willr(t, e, s, n, o = t.length) { const r = []; r[n - 2] = NaN; let i, l, u = 0, h = -1, c = -1, a = t[0], f = e[0]; for (let d = n - 1; d < o; ++d, ++u) {
                if (i = t[d], h < u)
                    for (h = u, a = t[h], l = u; ++l <= d;)
                        i = t[l], i >= a && (a = i, h = l);
                else
                    i >= a && (h = d, a = i);
                if (i = e[d], c < u)
                    for (c = u, f = e[c], l = u; ++l <= d;)
                        i = e[l], i <= f && (f = i, c = l);
                else
                    i <= f && (c = d, f = i);
                const n = a - f, o = 0 == n ? 0 : (a - s[d]) / n * -100;
                r.push(o);
            } return r; }
            wma(t, e, s = t.length) { const n = []; n[e - 2] = NaN; const o = e * (e + 1) / 2; let r = 0, i = 0; for (let s = 0; s < e - 1; ++s)
                i += t[s] * (s + 1), r += t[s]; for (let l = e - 1; l < s; ++l)
                i += t[l] * e, r += t[l], n.push(i / o), i -= r, r -= t[l - e + 1]; return n; }
            zlema(t, e, s = t.length) { const n = Math.floor((e - 1) / 2), o = []; o[(e - 2) / 2 - 2] = NaN; const r = 2 / (e + 1); let i, l = t[n - 1]; for (o.push(l), i = n; i < s; ++i) {
                const e = t[i];
                l = (e + (e - t[i - n]) - l) * r + l, o.push(l);
            } return o; }
            abands(t, e, s, n, o = t.length) { const r = [], i = [], l = []; r[n - 2] = NaN, i[n - 2] = NaN, l[n - 2] = NaN; const u = 1 / n, h = { size: n, index: 0, pushes: 0, sum: 0, vals: [] }, c = { size: n, index: 0, pushes: 0, sum: 0, vals: [] }; let a = 0; for (let o = 0; o < n; ++o) {
                const n = 4 * (t[o] - e[o]) / (t[o] + e[o]), r = (1 + n) * t[o];
                h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += r, h.vals[h.index] = r, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0);
                const i = (1 - n) * e[o];
                c.pushes >= c.size && (c.sum -= c.vals[c.index]), c.sum += i, c.vals[c.index] = i, c.pushes += 1, c.index = c.index + 1, c.index >= c.size && (c.index = 0), a += s[o];
            } r.push(h.sum * u), i.push(c.sum * u), l.push(a * u); for (let f = n; f < o; ++f) {
                const o = 4 * (t[f] - e[f]) / (t[f] + e[f]), d = (1 + o) * t[f];
                h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += d, h.vals[h.index] = d, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0);
                const p = (1 - o) * e[f];
                c.pushes >= c.size && (c.sum -= c.vals[c.index]), c.sum += p, c.vals[c.index] = p, c.pushes += 1, c.index = c.index + 1, c.index >= c.size && (c.index = 0), a += s[f] - s[f - n], r.push(h.sum * u), i.push(c.sum * u), l.push(a * u);
            } return [r, i, l]; }
            alma(t, e, s, n, o = t.length) { const r = []; r[e - 2] = NaN; const i = [], l = Math.floor(s * (e - 1)), u = e / n; let h = 0; for (let t = 0; t < e; t++)
                i[t] = Math.exp(-1 * Math.pow(t - l, 2) / (2 * Math.pow(u, 2))), h += i[t]; for (let t = 0; t < e; t++)
                i[t] /= h; for (let s = e - 1; s < o; s++) {
                let n = 0;
                for (let o = 0; o < e; o++)
                    n += t[s - e + o + 1] * i[o];
                r.push(n);
            } return r; }
            ce(t, e, s, n, o, r = t.length) { const i = [], l = []; i[n - 2] = NaN, l[n - 2] = NaN; let u, h, c = t[0] - e[0], a = t[0], f = 0, d = e[0], p = 0; for (let o = 1; o < n; ++o) {
                const n = e[o], r = t[o], i = s[o - 1], l = Math.abs(r - i), v = Math.abs(n - i);
                let x = r - n;
                l > x && (x = l), v > x && (x = v), u = x, c += u, a <= (h = t[o]) && (a = h, f = o), d >= (h = e[o]) && (d = h, p = o);
            } c /= n; const v = (n - 1) / n, x = 1 / n; i.push(a - o * c), l.push(d + o * c); for (let g = n; g < r; ++g) {
                const r = e[g], N = t[g], m = s[g - 1], M = Math.abs(N - m), z = Math.abs(r - m);
                let b = N - r;
                if (M > b && (b = M), z > b && (b = z), u = b, c = c * v + u * x, a <= (h = t[g]))
                    a = h, f = g;
                else if (f == g - n) {
                    a = t[g - n + 1], f = g - n + 1;
                    for (let e = g - n + 2; e <= g; ++e)
                        a <= (h = t[e]) && (a = h, f = e);
                }
                if (d >= (h = e[g]))
                    d = h, p = g;
                else if (p == g - n) {
                    d = e[g - n + 1], p = g - n + 1;
                    for (let t = g - n + 2; t <= g; ++t)
                        d >= (h = e[t]) && (d = h, p = t);
                }
                i.push(a - o * c), l.push(d + o * c);
            } return [i, l]; }
            cmf(t, e, s, n, o, r = t.length) { const i = []; i[o - 2] = NaN; let l = 0, u = 0; for (let r = 0; r < o - 1; ++r)
                u += t[r] - e[r] ? n[r] * (s[r] - e[r] - (t[r] - s[r])) / (t[r] - e[r]) : 0, l += n[r]; for (let h = o - 1; h < r; ++h)
                u += t[h] - e[h] ? n[h] * (s[h] - e[h] - (t[h] - s[h])) / (t[h] - e[h]) : 0, l += n[h], i.push(u / l), u -= t[h - o + 1] - e[h - o + 1] ? n[h - o + 1] * (s[h - o + 1] - e[h - o + 1] - (t[h - o + 1] - s[h - o + 1])) / (t[h - o + 1] - e[h - o + 1]) : 0, l -= n[h - o + 1]; return i; }
            copp(t, e, s) { const n = new Array(t.length), o = new Array(t.length), r = new Array(t.length); for (let i = 0; i < t.length; i++)
                n[i] = i < e - 1 ? null : (t[i] - t[i - e]) / t[i - e] * 100, o[i] = i < s - 1 ? null : (t[i] - t[i - s]) / t[i - s] * 100, r[i] = 10 * (n[i] + o[i]); return r; }
            dc(t, e, s) { const n = [], o = [], r = []; n[s - 2] = NaN, o[s - 2] = NaN, r[s - 2] = NaN; for (let i = s - 1; i < t.length; i++)
                n.push(Math.max(...t.slice(i - s + 1, i + 1))), o.push(Math.min(...e.slice(i - s + 1, i + 1))), r.push((n[n.length - 1] + o[o.length - 1]) / 2); return [n, r, o]; }
            fi(t, e, s, n = t.length) { const o = []; o[0] = NaN; const r = 2 / (s + 1); let i = e[1] * (t[1] - t[0]); for (let s = 1; s < n; ++s)
                i = (e[s] * (t[s] - t[s - 1]) - i) * r + i, o.push(i); return o; }
            ikhts() { }
            kc(t, e, s, n, o, r = t.length) { const i = [], l = [], u = [], h = 2 / (n + 1); let c = s[0], a = t[0] - e[0]; i.push(c - o * a), l.push(c), u.push(c + o * a); let f = 0; for (let n = 1; n < r; ++n) {
                c = (s[n] - c) * h + c;
                const r = e[n], d = t[n], p = s[n - 1], v = Math.abs(d - p), x = Math.abs(r - p);
                let g = d - r;
                v > g && (g = v), x > g && (g = x), f = g, a = (f - a) * h + a, i.push(c - o * a), l.push(c), u.push(c + o * a);
            } return [i, l, u]; }
            kst(t, e, s, n, o, r, i, l, u, h = t.length) { const c = [], a = []; c[o - 1] = NaN, a[o - 1] = NaN; let f = r; f < i && (f = i), f < l && (f = l), f < u && (f = u); const d = 2 / (r + 1), p = 2 / (i + 1), v = 2 / (l + 1), x = 2 / (u + 1); function g(e, s) { return (t[e] - t[e - s]) / t[e - s]; } let N = g(e, e), m = g(s, s), M = g(n, n), z = g(o, o); for (let t = e + 1; t < o + 1 && t < h; ++t)
                N = (g(t, e) - N) * d + N; for (let t = s + 1; t < o + 1 && t < h; ++t)
                m = (g(t, s) - m) * p + m; for (let t = n + 1; t < o + 1 && t < h; ++t)
                M = (g(t, n) - M) * v + M; for (let t = o + 1; t < o + 1 && t < h; ++t)
                z = (g(t, o) - z) * x + z; let b = (1 * N + 2 * m + 3 * M + 4 * z) / 10; a.push(b); let q = b; c.push(q); for (let t = o + 1; t < h; ++t)
                N = (g(t, e) - N) * d + N, m = (g(t, s) - m) * p + m, M = (g(t, n) - M) * v + M, z = (g(t, o) - z) * x + z, b = (1 * N + 2 * m + 3 * M + 4 * z) / 10, c.push(b), q = .2 * (b - q) + q, a.push(q); return [c, a]; }
            mama() { }
            pbands(t, e, s, n, o = t.length) { const r = [], i = []; r[n - 2] = NaN, i[n - 2] = NaN; let l = 0, u = 0; const h = n * (n + 1) / 2, c = n * (n + 1) * (2 * n + 1) / 6; let a; for (a = 0; a < n; ++a)
                u += s[a] * (a + 1), l += s[a]; --a; const f = (u / n - h / n * l / n) / (c / n - h / n * (h / n)); let d = t[a]; for (let e = 1; e < n; ++e)
                d < t[a - e] + e * f && (d = t[a - e] + e * f); let p = e[a]; for (let t = 1; t < n; ++t)
                p > e[a - t] + t * f && (p = e[a - t] + t * f); for (i.push(d), r.push(p), ++a; a < o; ++a) {
                u += -l + s[a] * n, l += -s[a - n] + s[a];
                const o = (u / n - h / n * l / n) / (c / n - h / n * (h / n));
                let f = t[a];
                for (let e = 1; e < n; ++e)
                    f < t[a - e] + e * o && (f = t[a - e] + e * o);
                let d = e[a];
                for (let t = 1; t < n; ++t)
                    d > e[a - t] + t * o && (d = e[a - t] + t * o);
                r.push(d), i.push(f);
            } return [r, i]; }
            pc() { }
            pfe(t, e, s, n = t.length) { const o = []; o[e - 1] = NaN; const r = 2 / (s + 1), i = { size: e, index: 0, pushes: 0, sum: 0, vals: [] }; let l; for (l = 1; l < e; ++l)
                i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.vals[i.index] = Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0); i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.vals[i.index] = Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0); let u = 100 * (t[l] - t[l - e] > 0 ? 1 : -1) * Math.sqrt(Math.pow(t[l] - t[l - e], 2) + 100) / i.sum; for (o.push(u), l = e + 1; l < n; ++l)
                i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.vals[i.index] = Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0), u = (100 * (t[l] - t[l - e] > 0 ? 1 : -1) * Math.sqrt(Math.pow(t[l] - t[l - e], 2) + 100) / i.sum - u) * r + u, o.push(u); return o; }
            posc(t, e, s, n, o, r = t.length) { const i = []; i[n - 2] = NaN; let l, u = 0, h = 0; const c = n * (n + 1) / 2, a = n * (n + 1) * (2 * n + 1) / 6; let f; for (f = 0; f < n; ++f)
                h += s[f] * (f + 1), u += s[f]; --f; const d = (h / n - c / n * u / n) / (a / n - c / n * (c / n)); let p = t[f]; for (let e = 1; e < n; ++e)
                p < t[f - e] + e * d && (p = t[f - e] + e * d); let v = e[f]; for (let t = 1; t < n; ++t)
                v > e[f - t] + t * d && (v = e[f - t] + t * d); for (l = (s[f] - v) / (p - v) * 100, i.push(l), ++f; f < r; ++f) {
                h += -u + s[f] * n, u += -s[f - n] + s[f];
                const r = (h / n - c / n * u / n) / (a / n - c / n * (c / n));
                let d = t[f];
                for (let e = 1; e < n; ++e)
                    d < t[f - e] + e * r && (d = t[f - e] + e * r);
                let p = e[f];
                for (let t = 1; t < n; ++t)
                    p > e[f - t] + t * r && (p = e[f - t] + t * r);
                l = 2 * ((s[f] - p) / (d - p) * 100 - l) / (1 + o) + l, i.push(l);
            } return i; }
            rmi(t, e, s, n = t.length) { const o = []; let r, i; o[s - 1] = NaN; let l = s; for (r = 0 > t[l] - t[l - s] ? 0 : t[l] - t[l - s], i = 0 > t[l - s] - t[l] ? 0 : t[l - s] - t[l], ++l, o.push(r / (r + i) * 100); l < n; ++l)
                r = 2 * (0 > t[l] - t[l - s] ? 0 : t[l] - t[l - s] - r) / (1 + e) + r, i = 2 * (0 > t[l - s] - t[l] ? 0 : t[l - s] - t[l] - i) / (1 + e) + i, o.push(r / (r + i) * 100); return o; }
            rmta(t, e, s, n = t.length) { const o = []; o[e - 2] = NaN; const r = 1 - s; let i = (1 - r) * t[0] + t[0], l = (1 - r) * t[0] + r * (t[0] + i); for (let s = 1; s < e - 1; ++s) {
                const e = (1 - r) * i + t[s];
                l = (1 - r) * l + r * (t[s] + e - i), i = e;
            } for (let s = e - 1; s < n; ++s) {
                const e = (1 - r) * i + t[s];
                l = (1 - r) * l + r * (t[s] + e - i), i = e, o.push(l);
            } return o; }
            rvi(t, e, s, n = t.length) { const o = []; o[s - 2] = NaN; let r = 0, i = 0; const l = s * (s + 1) / 2, u = s * (s + 1) * (2 * s + 1) / 6; let h = 0, c = 0, a = 0; for (; a < s; ++a)
                i += t[a] * (a + 1), r += t[a]; --a; const f = (i / s - l / s * r / s) / (u / s - l / s * (l / s)), d = r / s - f * l / s, p = t[a] - (d + f * s); for (p > 0 ? h = p * p / s : c = p * p / s, h + c == 0 ? o.push(50) : o.push(h / (h + c) * 100), ++a; a < n; ++a) {
                i += -r + t[a] * s, r += -t[a - s] + t[a];
                const n = (i / s - l / s * r / s) / (u / s - l / s * (l / s)), f = r / s - n * l / s, d = t[a] - (f + n * s);
                d > 0 ? h = 2 * (d * d / s - h) / (e + 1) + h : c = 2 * (d * d / s - c) / (e + 1) + c, h + c == 0 ? o.push(50) : o.push(h / (h + c) * 100);
            } return o; }
            smi(t, e, s, n, o, r, i = t.length) { const l = []; l[n - 2] = NaN; let u = 1 - n, h = NaN, c = NaN, a = NaN, f = NaN, d = 0, p = 0, v = 0, x = 0, g = 0, N = 0; for (; N < i && u == 1 - n; ++N, ++u)
                p = t[N], v = u, d = e[N], x = u; for (; N < i && u < 0; ++N, ++u)
                p <= t[N] && (p = t[N], v = u), d >= e[N] && (d = e[N], x = u); for (; N < i && 0 == u; ++N, ++u)
                p <= t[N] && (p = t[N], v = u), d >= e[N] && (d = e[N], x = u), h = c = s[N] - .5 * (p + d), a = f = p - d, l.push(100 * c / (.5 * f)); for (; N < i; ++N, ++u) {
                if (v == u - n) {
                    p = t[N], v = u;
                    for (let e = 1; e < n; ++e)
                        g = t[N - e], g > p && (p = g, v = u - e);
                }
                else
                    p <= t[N] && (p = t[N], v = u);
                if (x == u - n) {
                    d = e[N], x = u;
                    for (let t = 1; t < n; ++t)
                        g = e[N - t], g < d && (d = g, x = u - t);
                }
                else
                    d >= e[N] && (d = e[N], x = u);
                h = (s[N] - .5 * (p + d) - h) * (2 / (1 + o)) + h, c = 2 / (1 + r) * (h - c) + c, a = 2 / (1 + o) * (p - d - a) + a, f = 2 / (1 + r) * (a - f) + f, l.push(100 * c / (.5 * f));
            } return l; }
            tsi(t, e, s, n = t.length) { const o = []; o[0] = NaN; let r = -1, i = 0, l = 0, u = 0, h = 0, c = 0, a = 0; for (; a < n && -1 == r; ++a, ++r)
                i = t[a]; for (; a < n && 0 == r; ++a, ++r)
                u = l = t[a] - i, c = h = Math.abs(t[a] - i), o.push(100 * (c ? u / c : 0)), i = t[a]; for (; a < n; ++a, ++r)
                l = 2 * (t[a] - i - l) / (1 + e) + l, h = 2 * (Math.abs(t[a] - i) - h) / (1 + e) + h, u = 2 * (l - u) / (1 + s) + u, c = 2 * (h - c) / (1 + s) + c, o.push(100 * (c ? u / c : 0)), i = t[a]; return o; }
            vwap(t, e, s, n, o, r = t.length) { const i = []; i[o - 2] = NaN; let l = 1 - o, u = 0, h = 0, c = 0; for (; c < r && l < 1; ++c, ++l)
                u += (t[c] + e[c] + s[c]) / 3 * n[c], h += n[c]; for (c > 0 && 1 == l && i.push(u / h); c < r; ++c, ++l)
                u += (t[c] + e[c] + s[c]) / 3 * n[c] - (t[c - o] + e[c - o] + s[c - o]) / 3 * n[c - o], h += n[c] - n[c - o], i.push(u / h); return i; }
        }; }, 648: (t, e, s) => { Object.defineProperty(e, "__esModule", { value: !0 }), e.IndicatorsSync = void 0; const n = s(409); e.IndicatorsSync = class {
            constructor() { }
            normalize(t, e, s = NaN) { const n = t - e.length, o = []; for (let t = 0; t < n; ++t)
                o.push(s); return [...o, ...e]; }
            floor(t) { return t < 0 ? ~~t - 1 : ~~t; }
            sqrt(t, e = t / 2) { const s = (e + t / e) / 2; return (e > s ? e - s : s - e) < 1e-7 ? s : this.sqrt(t, s); }
            ad(t, e, s, n, o = s.length) { const r = []; let i = 0; for (let l = 0; l < o; ++l) {
                const o = t[l] - e[l];
                0 != o && (i += (s[l] - e[l] - t[l] + s[l]) / o * n[l]), r[l] = i;
            } return r; }
            adosc(t, e, s, n, o, r, i = s.length) { const l = r - 1, u = 2 / (o + 1), h = 2 / (r + 1), c = []; let a = 0, f = 0, d = 0; for (let o = 0; o < i; ++o) {
                const r = t[o] - e[o];
                0 != r && (a += (s[o] - e[o] - t[o] + s[o]) / r * n[o]), 0 == o ? (f = a, d = a) : (f = (a - f) * u + f, d = (a - d) * h + d), o >= l && c.push(f - d);
            } return c; }
            adx(t, e, s, n = t.length) { const o = [], r = (s - 1) / s, i = 1 / s; let l = 0, u = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), l += s, u += o;
            } let h = 0, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100; h += p; for (let v = s; v < n; ++v) {
                let n = t[v] - t[v - 1], x = e[v - 1] - e[v];
                n < 0 ? n = 0 : n > x && (x = 0), x < 0 ? x = 0 : x > n && (n = 0), l = l * r + n, u = u * r + x, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100, v - s < s - 2 ? h += p : v - s == s - 2 ? (h += p, o.push(h * i)) : (h = h * r + p, o.push(h * i));
            } return o; }
            adxr(t, e, s, n = t.length) { const o = [], r = (s - 1) / s, i = 1 / s; let l = 0, u = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), l += s, u += o;
            } let h = 0, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100; h += p; const v = { size: s - 1, pushes: 0, index: 0, vals: [] }, x = 3 * (s - 1); for (let g = s; g < n; ++g) {
                let n = t[g] - t[g - 1], N = e[g - 1] - e[g];
                if (n < 0 ? n = 0 : n > N && (N = 0), N < 0 ? N = 0 : N > n && (n = 0), l = l * r + n, u = u * r + N, c = l, a = u, f = Math.abs(c - a), d = c + a, p = f / d * 100, g - s < s - 2)
                    h += p;
                else if (g - s == s - 2)
                    h += p, v.vals[v.index] = h * i, v.index = v.index + 1, v.index >= v.size && (v.index = 0);
                else {
                    if (h = h * r + p, g >= x) {
                        const t = v.vals[v.index] + (v.size - 1 + 1) % v.size;
                        o.push(.5 * (h * i + t));
                    }
                    v.vals[v.index] = h * i, v.index = v.index + 1, v.index >= v.size && (v.index = 0);
                }
            } return o; }
            ao(t, e, s = t.length) { const n = []; let o = 0, r = 0; const i = 1 / 34; for (let s = 0; s < 34; ++s) {
                const n = .5 * (t[s] + e[s]);
                o += n, s >= 29 && (r += n);
            } n.push(.2 * r - i * o); for (let l = 34; l < s; ++l) {
                const s = .5 * (t[l] + e[l]);
                o += s, r += s, o -= .5 * (t[l - 34] + e[l - 34]), r -= .5 * (t[l - 5] + e[l - 5]), n.push(.2 * r - i * o);
            } return n; }
            apo(t, e, s, n = t.length) { const o = [], r = 2 / (e + 1), i = 2 / (s + 1); let l = t[0], u = t[0]; for (let e = 1; e < n; ++e) {
                l = (t[e] - l) * r + l, u = (t[e] - u) * i + u;
                const s = l - u;
                o.push(s);
            } return o; }
            aroon(t, e, s, n = t.length) { const o = [], r = [], i = 100 / s; let l, u, h = 0, c = -1, a = -1, f = t[0], d = e[0]; for (let p = s; p < n; ++p, ++h) {
                if (l = t[p], c < h)
                    for (c = h, f = t[c], u = h; ++u <= p;)
                        l = t[u], l >= f && (f = l, c = u);
                else
                    l >= f && (c = p, f = l);
                if (l = e[p], a < h)
                    for (a = h, d = e[a], u = h; ++u <= p;)
                        l = e[u], l <= d && (d = l, a = u);
                else
                    l <= d && (a = p, d = l);
                o[o.length] = (s - (p - a)) * i, r[r.length] = (s - (p - c)) * i;
            } return [o, r]; }
            aroonosc(t, e, s, n = t.length) { const o = [], r = 100 / s; let i, l = 0, u = -1, h = -1, c = t[0], a = e[0]; for (let f = s; f < n; ++f, ++l) {
                let s = t[f];
                if (u < l)
                    for (u = l, c = t[u], i = l; ++i <= f;)
                        s = t[i], s >= c && (c = s, u = i);
                else
                    s >= c && (u = f, c = s);
                if (s = e[f], h < l)
                    for (h = l, a = e[h], i = l; ++i <= f;)
                        s = e[i], s <= a && (a = s, h = i);
                else
                    s <= a && (h = f, a = s);
                o.push((u - h) * r);
            } return o; }
            atr(t, e, s, n, o = t.length) { const r = [], i = 1 / n; let l, u = 0; u += t[0] - e[0]; for (let o = 1; o < n; ++o) {
                const n = e[o], r = t[o], i = s[o - 1], h = Math.abs(r - i), c = Math.abs(n - i);
                let a = r - n;
                h > a && (a = h), c > a && (a = c), l = a, u += l;
            } let h = u / n; r.push(h); for (let u = n; u < o; ++u) {
                const n = e[u], o = t[u], c = s[u - 1], a = Math.abs(o - c), f = Math.abs(n - c);
                let d = o - n;
                a > d && (d = a), f > d && (d = f), l = d, h = (l - h) * i + h, r.push(h);
            } return r; }
            avgprice(t, e, s, n, o = t.length) { const r = []; for (let i = 0; i < o; ++i)
                r.push(.25 * (t[i] + e[i] + s[i] + n[i])); return r; }
            bbands(t, e, s, n = t.length) { const o = [], r = [], i = [], l = 1 / e; let u = 0, h = 0; for (let s = 0; s < e; ++s)
                u += t[s], h += t[s] * t[s]; let c = Math.sqrt(h * l - u * l * (u * l)); const a = u * l; o.push(a - s * c), i.push(a + s * c), r.push(a); for (let a = e; a < n; ++a) {
                u += t[a], h += t[a] * t[a], u -= t[a - e], h -= t[a - e] * t[a - e], c = Math.sqrt(h * l - u * l * (u * l));
                const n = u * l;
                i.push(n + s * c), o.push(n - s * c), r.push(n);
            } return [o, r, i]; }
            bop(t, e, s, n, o = t.length) { const r = []; for (let i = 0; i < o; ++i) {
                const o = e[i] - s[i];
                r[i] = o <= 0 ? 0 : (n[i] - t[i]) / o;
            } return r; }
            cci(t, e, s, o, r = t.length) { const i = 1 / o, l = [], u = new n.ti_buffer(o); let h, c; for (h = 0; h < r; ++h) {
                const n = (t[h] + e[h] + s[h]) * (1 / 3);
                u.push(n);
                const r = u.sum * i;
                if (h >= 2 * o - 2) {
                    let t = 0;
                    for (c = 0; c < o; ++c)
                        t += Math.abs(r - u.vals[c]);
                    let e = t * i;
                    e *= .015, e = (n - r) / e, l.push(e);
                }
            } return l; }
            cmo(t, e, s = t.length) { const n = []; let o = 0, r = 0; for (let s = 1; s <= e; ++s)
                o += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, r += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; n.push(100 * (o - r) / (o + r)); for (let i = e + 1; i < s; ++i)
                o -= t[i - e] > t[i - e - 1] ? t[i - e] - t[i - e - 1] : 0, r -= t[i - e] < t[i - e - 1] ? t[i - e - 1] - t[i - e] : 0, o += t[i] > t[i - 1] ? t[i] - t[i - 1] : 0, r += t[i] < t[i - 1] ? t[i - 1] - t[i] : 0, n.push(100 * (o - r) / (o + r)); return n; }
            crossany(t, e, s = t.length) { const n = []; for (let o = 0; o < s; ++o)
                n.push(t[o] > e[o] && t[o - 1] <= e[o - 1] || t[o] < e[o] && t[o - 1] >= e[o - 1]); return n; }
            crossover(t, e, s = t.length) { const n = []; for (let o = 0; o < s; ++o)
                n.push(t[o] > e[o] && t[o - 1] <= e[o - 1]); return n; }
            crossOverNumber(t, e) { const s = []; for (let n = 0; n < t.length; n++) {
                const o = t[n], r = t[n - 1];
                o > e && r <= e ? s.push(!0) : s.push(!1);
            } return s; }
            crossUnderNumber(t, e) { const s = []; for (let n = 0; n < t.length; n++) {
                const o = t[n], r = t[n - 1];
                o < e && r >= e ? s.push(!0) : s.push(!1);
            } return s; }
            cvi(t, e, s, o = t.length) { const r = [], i = 2 / (s + 1), l = new n.ti_buffer(s); let u, h = t[0] - e[0]; for (u = 1; u < 2 * s - 1; ++u)
                h = (t[u] - e[u] - h) * i + h, l.qpush(h); for (u = 2 * s - 1; u < o; ++u) {
                h = (t[u] - e[u] - h) * i + h;
                const s = l.vals[l.index];
                r.push(100 * (h - s) / s), l.qpush(h);
            } return r; }
            _cvi(t, e, s, n = t.length) { const o = [], r = 2 / (s + 1), i = { size: s, index: 0, pushes: 0, vals: [] }; let l = t[0] - e[0]; for (let n = 1; n < 2 * s - 1; ++n)
                l = (t[n] - e[n] - l) * r + l, i.vals[i.index] = l, i.index = i.index + 1, i.index >= i.size && (i.index = 0); for (let u = 2 * s - 1; u < n; ++u) {
                l = (t[u] - e[u] - l) * r + l;
                const s = i.vals[i.index];
                o.push(100 * (l - s) / s), i.vals[i.index] = l, i.index = i.index + 1, i.index >= i.size && (i.index = 0);
            } return o; }
            decay(t, e, s = t.length) { const n = [], o = 1 / e; n.push(t[0]); for (let e = 1; e < s; ++e) {
                const s = n[n.length - 1] - o;
                n.push(t[e] > s ? t[e] : s);
            } return n; }
            dema(t, e, s = t.length) { const n = [], o = 2 / (e + 1), r = 1 - o; let i = t[0], l = i; for (let u = 0; u < s; ++u)
                i = i * r + t[u] * o, u == e - 1 && (l = i), u >= e - 1 && (l = l * r + i * o, u >= 2 * (e - 1) && n.push(2 * i - l)); return n; }
            di(t, e, s, n, o = t.length) { const r = [], i = [], l = (n - 1) / n; let u = 0, h = 0, c = 0; for (let o = 1; o < n; ++o) {
                const n = e[o], r = t[o], i = s[o - 1], l = Math.abs(r - i), a = Math.abs(n - i);
                let f = r - n;
                l > f && (f = l), a > f && (f = a), u += f;
                let d = t[o] - t[o - 1], p = e[o - 1] - e[o];
                d < 0 ? d = 0 : d > p && (p = 0), p < 0 ? p = 0 : p > d && (d = 0), h += d, c += p;
            } r.push(100 * h / u), i.push(100 * c / u); for (let a = n; a < o; ++a) {
                const n = e[a], o = t[a], f = s[a - 1], d = Math.abs(o - f), p = Math.abs(n - f);
                let v = o - n;
                d > v && (v = d), p > v && (v = p), u = u * l + v;
                let x = t[a] - t[a - 1], g = e[a - 1] - e[a];
                x < 0 ? x = 0 : x > g && (g = 0), g < 0 ? g = 0 : g > x && (x = 0), h = h * l + x, c = c * l + g, r.push(100 * h / u), i.push(100 * c / u);
            } return [r, i]; }
            dm(t, e, s, n = t.length) { const o = [], r = [], i = (s - 1) / s; let l = 0, u = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), l += s, u += o;
            } o.push(l), r.push(u); for (let h = s; h < n; ++h) {
                let s = t[h] - t[h - 1], n = e[h - 1] - e[h];
                s < 0 ? s = 0 : s > n && (n = 0), n < 0 ? n = 0 : n > s && (s = 0), l = l * i + s, u = u * i + n, o.push(l), r.push(u);
            } return [o, r]; }
            dpo(t, e, s = t.length) { const n = e / 2 + 1, o = [], r = 1 / e; let i = 0; for (let s = 0; s < e; ++s)
                i += t[s]; o.push(t[e - 1 - n] - i * r); for (let l = e; l < s; ++l)
                i += t[l], i -= t[l - e], o.push(t[l - n] - i * r); return o; }
            dx(t, e, s, n = t.length) { const o = [], r = (s - 1) / s; let i = 0, l = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), i += s, l += o;
            } let u = i, h = l, c = Math.abs(u - h), a = u + h, f = c / a * 100; o.push(f); for (let d = s; d < n; ++d) {
                let s = t[d] - t[d - 1], n = e[d - 1] - e[d];
                s < 0 ? s = 0 : s > n && (n = 0), n < 0 ? n = 0 : n > s && (s = 0), i = i * r + s, l = l * r + n, u = i, h = l, c = Math.abs(u - h), a = u + h, f = c / a * 100, o.push(f);
            } return o; }
            edecay(t, e, s = t.length) { const n = [], o = 1 - 1 / e; n.push(t[0]); for (let e = 1; e < s; ++e) {
                const s = n[n.length - 1] * o;
                n.push(t[e] > s ? t[e] : s);
            } return n; }
            ema(t, e, s = t.length) { const n = [], o = 2 / (e + 1); let r = t[0]; n.push(r); for (let e = 1; e < s; ++e)
                r = (t[e] - r) * o + r, n.push(r); return n; }
            emv(t, e, s, n = t.length) { const o = []; let r = .5 * (t[0] + e[0]); for (let i = 1; i < n; ++i) {
                const n = .5 * (t[i] + e[i]), l = s[i] / 1e4 / (t[i] - e[i]);
                o.push((n - r) / l), r = n;
            } return o; }
            fisher(t, e, s, n = t.length) { const o = [], r = []; let i, l, u = 0, h = -1, c = -1, a = .5 * (t[0] + e[0]), f = .5 * (t[0] + e[0]), d = 0, p = 0; for (let v = s - 1; v < n; ++v, ++u) {
                if (i = .5 * (t[v] + e[v]), h < u)
                    for (h = u, a = .5 * (t[h] + e[h]), l = u; ++l <= v;)
                        i = .5 * (t[l] + e[l]), i >= a && (a = i, h = l);
                else
                    i >= a && (h = v, a = i);
                if (i = .5 * (t[v] + e[v]), c < u)
                    for (c = u, f = .5 * (t[c] + e[c]), l = u; ++l <= v;)
                        i = .5 * (t[l] + e[l]), i <= f && (f = i, c = l);
                else
                    i <= f && (c = v, f = i);
                let s = a - f;
                0 == s && (s = .001), d = .66 * ((.5 * (t[v] + e[v]) - f) / s - .5) + .67 * d, d > .99 && (d = .999), d < -.99 && (d = -.999), r.push(p), p = .5 * Math.log((1 + d) / (1 - d)) + .5 * p, o.push(p);
            } return [o, r]; }
            fosc(t, e, s = t.length) { const n = []; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; let h = 0; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const c = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * c, a = (i - s * o) * u;
                r >= e && n.push(100 * (t[r] - h) / t[r]), h = a + s * (e + 1), l -= i, i -= t[r - e + 1];
            } return n; }
            DEP_hma(t, e, s = t.length) { const n = [], o = this.floor(e / 2), r = this.floor(this.sqrt(e)), i = e * (e + 1) / 2, l = o * (o + 1) / 2, u = r * (r + 1) / 2; let h, c = 0, a = 0, f = 0, d = 0, p = 0, v = 0; for (h = 0; h < e - 1; ++h)
                a += t[h] * (h + 1), c += t[h], h >= e - o && (d += t[h] * (h + 1 - (e - o)), f += t[h]); const x = { size: r, pushes: 0, index: 0, vals: [] }; for (h = e - 1; h < s; ++h) {
                a += t[h] * e, c += t[h], d += t[h] * o, f += t[h];
                const s = d / l * 2 - a / i;
                v += s * r, p += s, x.vals[x.index] = s, x.index = x.index + 1, x.index >= x.size && (x.index = 0), h >= e - 1 + (r - 1) ? (n.push(v / u), v -= p, p -= x.vals[x.index] + (x.size - 1 + 1) % x.size) : v -= p, a -= c, c -= t[h - e + 1], d -= f, f -= t[h - o + 1];
            } return n; }
            hma(t, e, s = t.length) { const o = [], r = Math.floor(e / 2), i = Math.floor(Math.sqrt(e)), l = e * (e + 1) / 2, u = r * (r + 1) / 2, h = i * (i + 1) / 2; let c, a = 0, f = 0, d = 0, p = 0, v = 0, x = 0; for (c = 0; c < e - 1; ++c)
                f += t[c] * (c + 1), a += t[c], c >= e - r && (p += t[c] * (c + 1 - (e - r)), d += t[c]); const g = new n.ti_buffer(i); for (c = e - 1; c < s; ++c) {
                f += t[c] * e, a += t[c], p += t[c] * r, d += t[c];
                const s = p / u * 2 - f / l;
                x += s * i, v += s, g.qpush(s), c >= e - 1 + (i - 1) ? (o.push(x / h), x -= v, v -= g.get(1)) : x -= v, f -= a, a -= t[c - e + 1], p -= d, d -= t[c - r + 1];
            } return o; }
            kama(t, e, s = t.length) { const n = []; let o = 0; for (let s = 1; s < e; ++s)
                o += Math.abs(t[s] - t[s - 1]); let r, i, l = t[e - 1]; n.push(l); for (let u = e; u < s; ++u)
                o += Math.abs(t[u] - t[u - 1]), u > e && (o -= Math.abs(t[u - e] - t[u - e - 1])), r = 0 != o ? Math.abs(t[u] - t[u - e]) / o : 1, i = Math.pow(.6021505376344085 * r + .06451612903225806, 2), l += i * (t[u] - l), n.push(l); return n; }
            kvo(t, e, s, n, o, r, i = t.length) { const l = 2 / (o + 1), u = 2 / (r + 1), h = []; let c = 0, a = t[0] + e[0] + s[0], f = -1, d = 0, p = 0; for (let o = 1; o < i; ++o) {
                const r = t[o] + e[o] + s[o], i = t[o] - e[o];
                r > a && 1 != f ? (f = 1, c = t[o - 1] - e[o - 1]) : r < a && 0 != f && (f = 0, c = t[o - 1] - e[o - 1]), c += i;
                const v = n[o] * Math.abs(i / c * 2 - 1) * 100 * (f ? 1 : -1);
                1 == o ? (d = v, p = v) : (d = (v - d) * l + d, p = (v - p) * u + p), h.push(d - p), a = r;
            } return h; }
            lag(t, e, s = t.length) { const n = []; for (let o = e; o < s; ++o)
                n.push(t[o - e]); return n; }
            linreg(t, e, s = t.length) { const n = []; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const h = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * h, c = (i - s * o) * u;
                n.push(c + s * e), l -= i, i -= t[r - e + 1];
            } return n; }
            linregintercept(t, e, s = t.length) { const n = []; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const h = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * h, c = (i - s * o) * u;
                n.push(c + 1 * s), l -= i, i -= t[r - e + 1];
            } return n; }
            linregslope(t, e, s = t.length) { const n = []; let o = 0, r = 0, i = 0, l = 0; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const u = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * u;
                n.push(s), l -= i, i -= t[r - e + 1];
            } return n; }
            macd(t, e, s, n, o = t.length) { const r = [], i = [], l = [], u = 2 / (e + 1), h = 2 / (s + 1), c = 2 / (n + 1); let a = t[0], f = t[0], d = 0; for (let e = 1; e < o; ++e) {
                a = (t[e] - a) * u + a, f = (t[e] - f) * h + f;
                const n = a - f;
                e == s - 1 && (d = n), e >= s - 1 && (d = (n - d) * c + d, r.push(n), i.push(d), l.push(n - d));
            } return [r, i, l]; }
            marketfi(t, e, s, n = t.length) { const o = []; for (let r = 0; r < n; ++r)
                o.push((t[r] - e[r]) / s[r]); return o; }
            mass(t, e, s, n = t.length) { const o = []; let r = t[0] - e[0], i = r; const l = { index: 0, pushes: 0, size: s, sum: 0, vals: [] }; for (let u = 0; u < n; ++u)
                r = .8 * r + .2 * (t[u] - e[u]), 8 == u && (i = r), u >= 8 && (i = .8 * i + .2 * r, u >= 16 && (l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += r / i, l.vals[l.index] = r / i, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0), u >= 16 + s - 1 && o.push(l.sum))); return o; }
            max(t, e, s = t.length) { const n = []; let o, r = 0, i = -1, l = t[0]; for (let u = e - 1; u < s; ++u, ++r) {
                let e = t[u];
                if (i < r)
                    for (i = r, l = t[i], o = r; ++o <= u;)
                        e = t[o], e >= l && (l = e, i = o);
                else
                    e >= l && (i = u, l = e);
                n.push(l);
            } return n; }
            md(t, e, s = t.length) { const n = [], o = 1 / e; let r, i = 0; for (let l = 0; l < s; ++l) {
                i += t[l], l >= e && (i -= t[l - e]);
                const s = i * o;
                if (l >= e - 1) {
                    let i = 0;
                    for (r = 0; r < e; ++r)
                        i += Math.abs(s - t[l - r]);
                    n.push(i * o);
                }
            } return n; }
            medprice(t, e, s = t.length) { const n = []; for (let o = 0; o < s; ++o)
                n.push(.5 * (t[o] + e[o])); return n; }
            mfi(t, e, s, n, o, r = t.length) { const i = []; let l = (t[0] + e[0] + s[0]) * (1 / 3); const u = { size: o, index: 0, pushes: 0, sum: 0, vals: [] }, h = { size: o, index: 0, pushes: 0, sum: 0, vals: [] }; for (let c = 1; c < r; ++c) {
                const r = (t[c] + e[c] + s[c]) * (1 / 3), a = r * n[c];
                r > l ? (u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += a, u.vals[u.index] = a, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += 0, h.vals[h.index] = 0, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0)) : r < l ? (h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += a, h.vals[h.index] = a, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0), u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += 0, u.vals[u.index] = 0, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0)) : (u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += 0, u.vals[u.index] = 0, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += 0, h.vals[h.index] = 0, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0)), l = r, c >= o && i.push(u.sum / (u.sum + h.sum) * 100);
            } return i; }
            min(t, e, s = t.length) { const n = []; let o, r = 0, i = -1, l = t[0]; for (let u = e - 1; u < s; ++u, ++r) {
                let e = t[u];
                if (i < r)
                    for (i = r, l = t[i], o = r; ++o <= u;)
                        e = t[o], e <= l && (l = e, i = o);
                else
                    e <= l && (i = u, l = e);
                n.push(l);
            } return n; }
            mom(t, e, s = t.length) { const n = []; for (let o = e; o < s; ++o)
                n.push(t[o] - t[o - e]); return n; }
            msw(t, e, s = t.length) { const n = [], o = [], r = 3.1415926, i = 2 * r; let l, u, h, c, a = 0; for (let f = e; f < s; ++f) {
                for (u = 0, h = 0, c = 0; c < e; ++c)
                    a = t[f - c], u += Math.cos(i * c / e) * a, h += Math.sin(i * c / e) * a;
                l = Math.abs(u) > .001 ? Math.atan(h / u) : i / 2 * (h < 0 ? -1 : 1), u < 0 && (l += r), l += r / 2, l < 0 && (l += i), l > i && (l -= i), n.push(Math.sin(l)), o.push(Math.sin(l + r / 4));
            } return [n, o]; }
            natr(t, e, s, n, o = t.length) { const r = [], i = 1 / n; let l, u = 0; u += t[0] - e[0]; for (let o = 1; o < n; ++o) {
                const n = e[o], r = t[o], i = s[o - 1], h = Math.abs(r - i), c = Math.abs(n - i);
                let a = r - n;
                h > a && (a = h), c > a && (a = c), l = a, u += l;
            } let h = u / n; r.push(100 * h / s[n - 1]); for (let u = n; u < o; ++u) {
                const n = e[u], o = t[u], c = s[u - 1], a = Math.abs(o - c), f = Math.abs(n - c);
                let d = o - n;
                a > d && (d = a), f > d && (d = f), l = d, h = (l - h) * i + h, r.push(100 * h / s[u]);
            } return r; }
            nvi(t, e, s = t.length) { const n = []; let o = 1e3; n.push(o); for (let r = 1; r < s; ++r)
                e[r] < e[r - 1] && (o += (t[r] - t[r - 1]) / t[r - 1] * o), n.push(o); return n; }
            obv(t, e, s = t.length) { const n = []; let o = 0; n.push(o); let r = t[0]; for (let i = 1; i < s; ++i)
                t[i] > r ? o += e[i] : t[i] < r && (o -= e[i]), r = t[i], n.push(o); return n; }
            ppo(t, e, s, n = t.length) { const o = [], r = 2 / (e + 1), i = 2 / (s + 1); let l = t[0], u = t[0]; for (let e = 1; e < n; ++e) {
                l = (t[e] - l) * r + l, u = (t[e] - u) * i + u;
                const s = 100 * (l - u) / u;
                o.push(s);
            } return o; }
            psar(t, e, s, n, o = t.length) { const r = []; let i, l, u; i = t[0] + e[0] <= t[1] + e[1] ? 1 : 0, i ? (u = t[0], l = e[0]) : (u = e[0], l = t[0]); let h = s; for (let c = 1; c < o; ++c)
                l = (u - l) * h + l, i ? (c >= 2 && l > e[c - 2] && (l = e[c - 2]), l > e[c - 1] && (l = e[c - 1]), h < n && t[c] > u && (h += s, h > n && (h = n)), t[c] > u && (u = t[c])) : (c >= 2 && l < t[c - 2] && (l = t[c - 2]), l < t[c - 1] && (l = t[c - 1]), h < n && e[c] < u && (h += s, h > n && (h = n)), e[c] < u && (u = e[c])), (i && e[c] < l || !i && t[c] > l) && (h = s, l = u, i = !i, u = i ? t[c] : e[c]), r.push(l); return r; }
            pvi(t, e, s = t.length) { const n = []; let o = 1e3; n.push(o); for (let r = 1; r < s; ++r)
                e[r] > e[r - 1] && (o += (t[r] - t[r - 1]) / t[r - 1] * o), n.push(o); return n; }
            qstick(t, e, s, n = e.length) { const o = [], r = 1 / s; let i, l = 0; for (i = 0; i < s; ++i)
                l += e[i] - t[i]; for (o.push(l * r), i = s; i < n; ++i)
                l += e[i] - t[i], l -= e[i - s] - t[i - s], o.push(l * r); return o; }
            roc(t, e, s = t.length) { const n = []; for (let o = e; o < s; ++o)
                n.push((t[o] - t[o - e]) / t[o - e]); return n; }
            rocr(t, e, s = t.length) { const n = []; for (let o = e; o < s; ++o)
                n.push(t[o] / t[o - e]); return n; }
            rsi(t, e, s = t.length) { const n = [], o = 1 / e; let r = 0, i = 0; for (let s = 1; s <= e; ++s)
                r += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, i += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; r /= e, i /= e, n.push(r / (r + i) * 100); for (let l = e + 1; l < s; ++l)
                r = ((t[l] > t[l - 1] ? t[l] - t[l - 1] : 0) - r) * o + r, i = ((t[l] < t[l - 1] ? t[l - 1] - t[l] : 0) - i) * o + i, n.push(r / (r + i) * 100); return n; }
            sma(t, e, s = t.length) { const n = [], o = 1 / e; let r = 0; for (let s = 0; s < e; ++s)
                r += t[s]; n.push(r * o); for (let i = e; i < s; ++i)
                r += t[i], r -= t[i - e], n.push(r * o); return n; }
            stddev(t, e, s = t.length) { const n = [], o = 1 / e; let r = 0, i = 0; for (let s = 0; s < e; ++s)
                r += t[s], i += t[s] * t[s]; let l = i * o - r * o * (r * o); l > 0 && (l = Math.sqrt(l)), n.push(l); for (let l = e; l < s; ++l) {
                r += t[l], i += t[l] * t[l], r -= t[l - e], i -= t[l - e] * t[l - e];
                let s = i * o - r * o * (r * o);
                s > 0 && (s = Math.sqrt(s)), n.push(s);
            } return n; }
            stderr(t, e, s = t.length) { const n = [], o = 1 / e; let r = 0, i = 0; const l = 1 / Math.sqrt(e); for (let s = 0; s < e; ++s)
                r += t[s], i += t[s] * t[s]; let u = i * o - r * o * (r * o); u > 0 && (u = Math.sqrt(u)), n.push(l * u); for (let u = e; u < s; ++u) {
                r += t[u], i += t[u] * t[u], r -= t[u - e], i -= t[u - e] * t[u - e];
                let s = i * o - r * o * (r * o);
                s > 0 && (s = Math.sqrt(s)), n.push(l * s);
            } return n; }
            stoch(t, e, s, n, o, r, i = t.length) { const l = 1 / o, u = 1 / r, h = [], c = []; let a, f = 0, d = -1, p = -1, v = t[0], x = e[0]; const g = { size: o, index: 0, pushes: 0, sum: 0, vals: [] }, N = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }; let m; for (let M = 0; M < i; ++M) {
                if (M >= n && ++f, a = t[M], d < f)
                    for (d = f, v = t[d], m = f; ++m <= M;)
                        a = t[m], a >= v && (v = a, d = m);
                else
                    a >= v && (d = M, v = a);
                if (a = e[M], p < f)
                    for (p = f, x = e[p], m = f; ++m <= M;)
                        a = e[m], a <= x && (x = a, p = m);
                else
                    a <= x && (p = M, x = a);
                const i = v - x, z = 0 == i ? 0 : (s[M] - x) / i * 100;
                if (g.pushes >= g.size && (g.sum -= g.vals[g.index]), g.sum += z, g.vals[g.index] = z, g.pushes += 1, g.index = g.index + 1, g.index >= g.size && (g.index = 0), M >= n - 1 + o - 1) {
                    const t = g.sum * l;
                    N.pushes >= N.size && (N.sum -= N.vals[N.index]), N.sum += t, N.vals[N.index] = t, N.pushes += 1, N.index = N.index + 1, N.index >= N.size && (N.index = 0), M >= n - 1 + o - 1 + r - 1 && (h.push(t), c.push(N.sum * u));
                }
            } return [h, c]; }
            stochrsi(t, e, s = t.length) { const n = [], o = 1 / e, r = { size: e, index: 0, pushes: 0, sum: 0, vals: [] }; let i = 0, l = 0; for (let s = 1; s <= e; ++s)
                i += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, l += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; i /= e, l /= e; let u = i / (i + l) * 100; r.pushes >= r.size && (r.sum -= r.vals[r.index]), r.sum += u, r.vals[r.index] = u, r.pushes += 1, r.index = r.index + 1, r.index >= r.size && (r.index = 0); let h = u, c = u, a = 0, f = 0; for (let d = e + 1; d < s; ++d) {
                if (i = ((t[d] > t[d - 1] ? t[d] - t[d - 1] : 0) - i) * o + i, l = ((t[d] < t[d - 1] ? t[d - 1] - t[d] : 0) - l) * o + l, u = i / (i + l) * 100, u > c)
                    c = u, f = r.index;
                else if (f == r.index) {
                    c = u;
                    for (let t = 0; t < r.size; ++t)
                        t != r.index && r.vals[t] > c && (c = r.vals[t], f = t);
                }
                if (u < h)
                    h = u, a = r.index;
                else if (a == r.index) {
                    h = u;
                    for (let t = 0; t < r.size; ++t)
                        t != r.index && r.vals[t] < h && (h = r.vals[t], a = t);
                }
                if (r.vals[r.index] = u, r.index = r.index + 1, r.index >= r.size && (r.index = 0), d > 2 * e - 2) {
                    const t = c - h;
                    0 == t ? n.push(0) : n.push((u - h) / t);
                }
            } return n; }
            sum(t, e, s = t.length) { const n = []; let o = 0; for (let s = 0; s < e; ++s)
                o += t[s]; n.push(o); for (let r = e; r < s; ++r)
                o += t[r], o -= t[r - e], n.push(o); return n; }
            tema(t, e, s = t.length) { const n = [], o = 2 / (e + 1), r = 1 - o; let i = t[0], l = 0, u = 0; for (let h = 0; h < s; ++h)
                i = i * r + t[h] * o, h == e - 1 && (l = i), h >= e - 1 && (l = l * r + i * o, h == 2 * (e - 1) && (u = l), h >= 2 * (e - 1) && (u = u * r + l * o, h >= 3 * (e - 1) && n.push(3 * i - 3 * l + u))); return n; }
            tr(t, e, s, n = t.length) { const o = []; let r; o[0] = t[0] - e[0]; for (let i = 1; i < n; ++i) {
                const n = e[i], l = t[i], u = s[i - 1], h = Math.abs(l - u), c = Math.abs(n - u);
                let a = l - n;
                h > a && (a = h), c > a && (a = c), r = a, o.push(r);
            } return o; }
            trima(t, e, s = t.length) { const n = [], o = 1 / (e % 2 ? (e / 2 + 1) * (e / 2 + 1) : e / 2 * (e / 2 + 1)); let r = 0, i = 0, l = 0; const u = e % 2 ? e / 2 : e / 2 - 1, h = u + 1; let c = 1; for (let s = 0; s < e - 1; ++s)
                r += t[s] * c, s + 1 > e - u && (i += t[s]), s + 1 <= h && (l += t[s]), s + 1 < h && ++c, s + 1 >= e - u && --c; let a = e - 1 - u + 1, f = e - 1 - e + 1 + h, d = e - 1 - e + 1; for (let u = e - 1; u < s; ++u)
                r += t[u], n.push(r * o), i += t[u], r += i, r -= l, i -= t[a++], l += t[f++], l -= t[d++]; return n; }
            trix(t, e, s = t.length) { const n = [], o = 3 * e - 2, r = 2 / (e + 1); let i = t[0], l = 0, u = 0; for (let s = 1; s < o; ++s)
                i = (t[s] - i) * r + i, s == e - 1 ? l = i : s > e - 1 && (l = (i - l) * r + l, s == 2 * e - 2 ? u = l : s > 2 * e - 2 && (u = (l - u) * r + u)); for (let e = o; e < s; ++e) {
                i = (t[e] - i) * r + i, l = (i - l) * r + l;
                const s = u;
                u = (l - u) * r + u, n.push((u - s) / u * 100);
            } return n; }
            tsf(t, e, s = t.length) { const n = []; let o = 0, r = 0, i = 0, l = 0; const u = 1 / e; for (let s = 0; s < e - 1; ++s)
                o += s + 1, r += (s + 1) * (s + 1), l += t[s] * (s + 1), i += t[s]; o += e, r += e * e; const h = 1 / (e * r - o * o); for (let r = e - 1; r < s; ++r) {
                l += t[r] * e, i += t[r];
                const s = (e * l - o * i) * h, c = (i - s * o) * u;
                n.push(c + s * (e + 1)), l -= i, i -= t[r - e + 1];
            } return n; }
            typprice(t, e, s, n = t.length) { const o = []; for (let r = 0; r < n; ++r)
                o.push((t[r] + e[r] + s[r]) * (1 / 3)); return o; }
            ultosc(t, e, s, n, o, r, i = t.length) { const l = [], u = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }, h = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }; let c = 0, a = 0, f = 0, d = 0; for (let p = 1; p < i; ++p) {
                const i = e[p] < s[p - 1] ? e[p] : s[p - 1], v = t[p] > s[p - 1] ? t[p] : s[p - 1], x = s[p] - i, g = v - i;
                if (c += x, a += x, f += g, d += g, u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += x, u.vals[u.index] = x, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += g, h.vals[h.index] = g, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0), p > n) {
                    let t = u.index - n - 1;
                    if (t < 0 && (t += r), c -= u.vals[t], f -= h.vals[t], p > o) {
                        let t = u.index - o - 1;
                        t < 0 && (t += r), a -= u.vals[t], d -= h.vals[t];
                    }
                }
                if (p >= r) {
                    const t = 100 * (4 * c / f + 2 * a / d + 1 * u.sum / h.sum) / 7;
                    l.push(t);
                }
            } return l; }
            var(t, e, s = t.length) { const n = [], o = 1 / e; let r = 0, i = 0; for (let s = 0; s < e; ++s)
                r += t[s], i += t[s] * t[s]; n.push(i * o - r * o * (r * o)); for (let l = e; l < s; ++l)
                r += t[l], i += t[l] * t[l], r -= t[l - e], i -= t[l - e] * t[l - e], n.push(i * o - r * o * (r * o)); return n; }
            vhf(t, e, s = t.length) { const n = []; let o, r, i, l = 1, u = -1, h = -1, c = t[0], a = t[0], f = 0, d = t[0]; for (let s = 1; s < e; ++s)
                r = t[s], f += Math.abs(r - d), d = r; for (let p = e; p < s; ++p, ++l) {
                if (r = t[p], f += Math.abs(r - d), d = r, p > e && (f -= Math.abs(t[p - e] - t[p - e - 1])), o = r, u < l)
                    for (u = l, c = t[u], i = l; ++i <= p;)
                        o = t[i], o >= c && (c = o, u = i);
                else
                    o >= c && (u = p, c = o);
                if (o = r, h < l)
                    for (h = l, a = t[h], i = l; ++i <= p;)
                        o = t[i], o <= a && (a = o, h = i);
                else
                    o <= a && (h = p, a = o);
                n.push(Math.abs(c - a) / f);
            } return n; }
            vidya(t, e, s, n, o = t.length) { const r = [], i = 1 / e, l = 1 / s; let u = 0, h = 0, c = 0, a = 0; for (let n = 0; n < s; ++n)
                c += t[n], a += t[n] * t[n], n >= s - e && (u += t[n], h += t[n] * t[n]); let f = t[s - 2]; if (r.push(f), s - 1 < o) {
                let e = Math.sqrt(h * i - u * i * (u * i)) / Math.sqrt(a * l - c * l * (c * l));
                e != e && (e = 0), e *= n, f = (t[s - 1] - f) * e + f, r.push(f);
            } for (let d = s; d < o; ++d) {
                c += t[d], a += t[d] * t[d], u += t[d], h += t[d] * t[d], c -= t[d - s], a -= t[d - s] * t[d - s], u -= t[d - e], h -= t[d - e] * t[d - e];
                let o = Math.sqrt(h * i - u * i * (u * i)) / Math.sqrt(a * l - c * l * (c * l));
                o != o && (o = 0), o *= n, f = (t[d] - f) * o + f, r.push(f);
            } return r; }
            volatility(t, e, s = t.length) { const n = [], o = 1 / e, r = Math.sqrt(252); let i = 0, l = 0; for (let s = 1; s <= e; ++s) {
                const e = t[s] / t[s - 1] - 1;
                i += e, l += e * e;
            } n.push(Math.sqrt(l * o - i * o * (i * o)) * r); for (let u = e + 1; u < s; ++u) {
                const s = t[u] / t[u - 1] - 1;
                i += s, l += s * s;
                const h = t[u - e] / t[u - e - 1] - 1;
                i -= h, l -= h * h, n.push(Math.sqrt(l * o - i * o * (i * o)) * r);
            } return n; }
            vosc(t, e, s, n = t.length) { const o = [], r = 1 / e, i = 1 / s; let l = 0, u = 0; for (let n = 0; n < s; ++n)
                n >= s - e && (l += t[n]), u += t[n]; const h = l * r, c = u * i; o.push(100 * (h - c) / c); for (let h = s; h < n; ++h) {
                l += t[h], l -= t[h - e], u += t[h], u -= t[h - s];
                const n = l * r, c = u * i;
                o.push(100 * (n - c) / c);
            } return o; }
            vwma(t, e, s, n = t.length) { const o = []; let r = 0, i = 0; for (let n = 0; n < s; ++n)
                r += t[n] * e[n], i += e[n]; o.push(r / i); for (let l = s; l < n; ++l)
                r += t[l] * e[l], r -= t[l - s] * e[l - s], i += e[l], i -= e[l - s], o.push(r / i); return o; }
            wad(t, e, s, n = t.length) { const o = []; let r = 0, i = s[0]; for (let l = 1; l < n; ++l) {
                const n = s[l];
                n > i ? r += n - (i < e[l] ? i : e[l]) : n < i && (r += n - (i > t[l] ? i : t[l])), o.push(r), i = s[l];
            } return o; }
            wcprice(t, e, s, n = t.length) { const o = []; for (let r = 0; r < n; ++r)
                o.push(.25 * (t[r] + e[r] + s[r] + s[r])); return o; }
            wilders(t, e, s = t.length) { const n = [], o = 1 / e; let r = 0; for (let s = 0; s < e; ++s)
                r += t[s]; let i = r / e; n.push(i); for (let r = e; r < s; ++r)
                i = (t[r] - i) * o + i, n.push(i); return n; }
            willr(t, e, s, n, o = t.length) { const r = []; let i, l, u = 0, h = -1, c = -1, a = t[0], f = e[0]; for (let d = n - 1; d < o; ++d, ++u) {
                if (i = t[d], h < u)
                    for (h = u, a = t[h], l = u; ++l <= d;)
                        i = t[l], i >= a && (a = i, h = l);
                else
                    i >= a && (h = d, a = i);
                if (i = e[d], c < u)
                    for (c = u, f = e[c], l = u; ++l <= d;)
                        i = e[l], i <= f && (f = i, c = l);
                else
                    i <= f && (c = d, f = i);
                const n = a - f, o = 0 == n ? 0 : (a - s[d]) / n * -100;
                r.push(o);
            } return r; }
            wma(t, e, s = t.length) { const n = [], o = e * (e + 1) / 2; let r = 0, i = 0; for (let s = 0; s < e - 1; ++s)
                i += t[s] * (s + 1), r += t[s]; for (let l = e - 1; l < s; ++l)
                i += t[l] * e, r += t[l], n.push(i / o), i -= r, r -= t[l - e + 1]; return n; }
            zlema(t, e, s = t.length) { const n = Math.floor((e - 1) / 2), o = [], r = 2 / (e + 1); let i, l = t[n - 1]; for (o.push(l), i = n; i < s; ++i) {
                const e = t[i];
                l = (e + (e - t[i - n]) - l) * r + l, o.push(l);
            } return o; }
            abands(t, e, s, n, o = t.length) { const r = [], i = [], l = [], u = 1 / n, h = { size: n, index: 0, pushes: 0, sum: 0, vals: [] }, c = { size: n, index: 0, pushes: 0, sum: 0, vals: [] }; let a = 0; for (let o = 0; o < n; ++o) {
                const n = 4 * (t[o] - e[o]) / (t[o] + e[o]), r = (1 + n) * t[o];
                h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += r, h.vals[h.index] = r, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0);
                const i = (1 - n) * e[o];
                c.pushes >= c.size && (c.sum -= c.vals[c.index]), c.sum += i, c.vals[c.index] = i, c.pushes += 1, c.index = c.index + 1, c.index >= c.size && (c.index = 0), a += s[o];
            } r.push(h.sum * u), i.push(c.sum * u), l.push(a * u); for (let f = n; f < o; ++f) {
                const o = 4 * (t[f] - e[f]) / (t[f] + e[f]), d = (1 + o) * t[f];
                h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += d, h.vals[h.index] = d, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0);
                const p = (1 - o) * e[f];
                c.pushes >= c.size && (c.sum -= c.vals[c.index]), c.sum += p, c.vals[c.index] = p, c.pushes += 1, c.index = c.index + 1, c.index >= c.size && (c.index = 0), a += s[f] - s[f - n], r.push(h.sum * u), i.push(c.sum * u), l.push(a * u);
            } return [r, i, l]; }
            alma(t, e, s, n, o = t.length) { const r = [], i = [], l = Math.floor(s * (e - 1)), u = e / n; let h = 0; for (let t = 0; t < e; t++)
                i[t] = Math.exp(-1 * Math.pow(t - l, 2) / (2 * Math.pow(u, 2))), h += i[t]; for (let t = 0; t < e; t++)
                i[t] /= h; for (let s = e - 1; s < o; s++) {
                let n = 0;
                for (let o = 0; o < e; o++)
                    n += t[s - e + o + 1] * i[o];
                r.push(n);
            } return r; }
            ce(t, e, s, n, o, r = t.length) { const i = [], l = []; let u, h, c = t[0] - e[0], a = t[0], f = 0, d = e[0], p = 0; for (let o = 1; o < n; ++o) {
                const n = e[o], r = t[o], i = s[o - 1], l = Math.abs(r - i), v = Math.abs(n - i);
                let x = r - n;
                l > x && (x = l), v > x && (x = v), u = x, c += u, a <= (h = t[o]) && (a = h, f = o), d >= (h = e[o]) && (d = h, p = o);
            } c /= n; const v = (n - 1) / n, x = 1 / n; i.push(a - o * c), l.push(d + o * c); for (let g = n; g < r; ++g) {
                const r = e[g], N = t[g], m = s[g - 1], M = Math.abs(N - m), z = Math.abs(r - m);
                let b = N - r;
                if (M > b && (b = M), z > b && (b = z), u = b, c = c * v + u * x, a <= (h = t[g]))
                    a = h, f = g;
                else if (f == g - n) {
                    a = t[g - n + 1], f = g - n + 1;
                    for (let e = g - n + 2; e <= g; ++e)
                        a <= (h = t[e]) && (a = h, f = e);
                }
                if (d >= (h = e[g]))
                    d = h, p = g;
                else if (p == g - n) {
                    d = e[g - n + 1], p = g - n + 1;
                    for (let t = g - n + 2; t <= g; ++t)
                        d >= (h = e[t]) && (d = h, p = t);
                }
                i.push(a - o * c), l.push(d + o * c);
            } return [i, l]; }
            cmf(t, e, s, n, o, r = t.length) { const i = []; let l = 0, u = 0; for (let r = 0; r < o - 1; ++r)
                u += t[r] - e[r] ? n[r] * (s[r] - e[r] - (t[r] - s[r])) / (t[r] - e[r]) : 0, l += n[r]; for (let h = o - 1; h < r; ++h)
                u += t[h] - e[h] ? n[h] * (s[h] - e[h] - (t[h] - s[h])) / (t[h] - e[h]) : 0, l += n[h], i.push(u / l), u -= t[h - o + 1] - e[h - o + 1] ? n[h - o + 1] * (s[h - o + 1] - e[h - o + 1] - (t[h - o + 1] - s[h - o + 1])) / (t[h - o + 1] - e[h - o + 1]) : 0, l -= n[h - o + 1]; return i; }
            copp(t, e, s) { const n = new Array(t.length), o = new Array(t.length), r = new Array(t.length); for (let i = 0; i < t.length; i++)
                n[i] = i < e - 1 ? null : (t[i] - t[i - e]) / t[i - e] * 100, o[i] = i < s - 1 ? null : (t[i] - t[i - s]) / t[i - s] * 100, r[i] = 10 * (n[i] + o[i]); return r; }
            dc(t, e, s) { const n = [], o = [], r = []; for (let i = s - 1; i < t.length; i++)
                n.push(Math.max(...t.slice(i - s + 1, i + 1))), o.push(Math.min(...e.slice(i - s + 1, i + 1))), r.push((n[n.length - 1] + o[o.length - 1]) / 2); return [n, r, o]; }
            fi(t, e, s, n = t.length) { const o = [], r = 2 / (s + 1); let i = e[1] * (t[1] - t[0]); for (let s = 1; s < n; ++s)
                i = (e[s] * (t[s] - t[s - 1]) - i) * r + i, o.push(i); return o; }
            ikhts() { }
            kc(t, e, s, n, o, r = t.length) { const i = [], l = [], u = [], h = 2 / (n + 1); let c = s[0], a = t[0] - e[0]; i.push(c - o * a), l.push(c), u.push(c + o * a); let f = 0; for (let n = 1; n < r; ++n) {
                c = (s[n] - c) * h + c;
                const r = e[n], d = t[n], p = s[n - 1], v = Math.abs(d - p), x = Math.abs(r - p);
                let g = d - r;
                v > g && (g = v), x > g && (g = x), f = g, a = (f - a) * h + a, i.push(c - o * a), l.push(c), u.push(c + o * a);
            } return [i, l, u]; }
            kst(t, e, s, n, o, r, i, l, u, h = t.length) { const c = [], a = []; let f = r; f < i && (f = i), f < l && (f = l), f < u && (f = u); const d = 2 / (r + 1), p = 2 / (i + 1), v = 2 / (l + 1), x = 2 / (u + 1); function g(e, s) { return (t[e] - t[e - s]) / t[e - s]; } let N = g(e, e), m = g(s, s), M = g(n, n), z = g(o, o); for (let t = e + 1; t < o + 1 && t < h; ++t)
                N = (g(t, e) - N) * d + N; for (let t = s + 1; t < o + 1 && t < h; ++t)
                m = (g(t, s) - m) * p + m; for (let t = n + 1; t < o + 1 && t < h; ++t)
                M = (g(t, n) - M) * v + M; for (let t = o + 1; t < o + 1 && t < h; ++t)
                z = (g(t, o) - z) * x + z; let b = (1 * N + 2 * m + 3 * M + 4 * z) / 10; a.push(b); let q = b; c.push(q); for (let t = o + 1; t < h; ++t)
                N = (g(t, e) - N) * d + N, m = (g(t, s) - m) * p + m, M = (g(t, n) - M) * v + M, z = (g(t, o) - z) * x + z, b = (1 * N + 2 * m + 3 * M + 4 * z) / 10, c.push(b), q = .2 * (b - q) + q, a.push(q); return [c, a]; }
            mama() { }
            pbands(t, e, s, n, o = t.length) { const r = [], i = []; let l = 0, u = 0; const h = n * (n + 1) / 2, c = n * (n + 1) * (2 * n + 1) / 6; let a; for (a = 0; a < n; ++a)
                u += s[a] * (a + 1), l += s[a]; --a; const f = (u / n - h / n * l / n) / (c / n - h / n * (h / n)); let d = t[a]; for (let e = 1; e < n; ++e)
                d < t[a - e] + e * f && (d = t[a - e] + e * f); let p = e[a]; for (let t = 1; t < n; ++t)
                p > e[a - t] + t * f && (p = e[a - t] + t * f); for (i.push(d), r.push(p), ++a; a < o; ++a) {
                u += -l + s[a] * n, l += -s[a - n] + s[a];
                const o = (u / n - h / n * l / n) / (c / n - h / n * (h / n));
                let f = t[a];
                for (let e = 1; e < n; ++e)
                    f < t[a - e] + e * o && (f = t[a - e] + e * o);
                let d = e[a];
                for (let t = 1; t < n; ++t)
                    d > e[a - t] + t * o && (d = e[a - t] + t * o);
                r.push(d), i.push(f);
            } return [r, i]; }
            pc() { }
            pfe(t, e, s, n = t.length) { const o = [], r = 2 / (s + 1), i = { size: e, index: 0, pushes: 0, sum: 0, vals: [] }; let l; for (l = 1; l < e; ++l)
                i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.vals[i.index] = Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0); i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.vals[i.index] = Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0); let u = 100 * (t[l] - t[l - e] > 0 ? 1 : -1) * Math.sqrt(Math.pow(t[l] - t[l - e], 2) + 100) / i.sum; for (o.push(u), l = e + 1; l < n; ++l)
                i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.vals[i.index] = Math.sqrt(Math.pow(t[l] - t[l - 1], 2) + 1), i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0), u = (100 * (t[l] - t[l - e] > 0 ? 1 : -1) * Math.sqrt(Math.pow(t[l] - t[l - e], 2) + 100) / i.sum - u) * r + u, o.push(u); return o; }
            posc(t, e, s, n, o, r = t.length) { const i = []; let l, u = 0, h = 0; const c = n * (n + 1) / 2, a = n * (n + 1) * (2 * n + 1) / 6; let f; for (f = 0; f < n; ++f)
                h += s[f] * (f + 1), u += s[f]; --f; const d = (h / n - c / n * u / n) / (a / n - c / n * (c / n)); let p = t[f]; for (let e = 1; e < n; ++e)
                p < t[f - e] + e * d && (p = t[f - e] + e * d); let v = e[f]; for (let t = 1; t < n; ++t)
                v > e[f - t] + t * d && (v = e[f - t] + t * d); for (l = (s[f] - v) / (p - v) * 100, i.push(l), ++f; f < r; ++f) {
                h += -u + s[f] * n, u += -s[f - n] + s[f];
                const r = (h / n - c / n * u / n) / (a / n - c / n * (c / n));
                let d = t[f];
                for (let e = 1; e < n; ++e)
                    d < t[f - e] + e * r && (d = t[f - e] + e * r);
                let p = e[f];
                for (let t = 1; t < n; ++t)
                    p > e[f - t] + t * r && (p = e[f - t] + t * r);
                l = 2 * ((s[f] - p) / (d - p) * 100 - l) / (1 + o) + l, i.push(l);
            } return i; }
            rmi(t, e, s, n = t.length) { const o = []; let r, i, l = s; for (r = 0 > t[l] - t[l - s] ? 0 : t[l] - t[l - s], i = 0 > t[l - s] - t[l] ? 0 : t[l - s] - t[l], ++l, o.push(r / (r + i) * 100); l < n; ++l)
                r = 2 * (0 > t[l] - t[l - s] ? 0 : t[l] - t[l - s] - r) / (1 + e) + r, i = 2 * (0 > t[l - s] - t[l] ? 0 : t[l - s] - t[l] - i) / (1 + e) + i, o.push(r / (r + i) * 100); return o; }
            rmta(t, e, s, n = t.length) { const o = [], r = 1 - s; let i = (1 - r) * t[0] + t[0], l = (1 - r) * t[0] + r * (t[0] + i); for (let s = 1; s < e - 1; ++s) {
                const e = (1 - r) * i + t[s];
                l = (1 - r) * l + r * (t[s] + e - i), i = e;
            } for (let s = e - 1; s < n; ++s) {
                const e = (1 - r) * i + t[s];
                l = (1 - r) * l + r * (t[s] + e - i), i = e, o.push(l);
            } return o; }
            rvi(t, e, s, n = t.length) { const o = []; let r = 0, i = 0; const l = s * (s + 1) / 2, u = s * (s + 1) * (2 * s + 1) / 6; let h = 0, c = 0, a = 0; for (; a < s; ++a)
                i += t[a] * (a + 1), r += t[a]; --a; const f = (i / s - l / s * r / s) / (u / s - l / s * (l / s)), d = r / s - f * l / s, p = t[a] - (d + f * s); for (p > 0 ? h = p * p / s : c = p * p / s, h + c == 0 ? o.push(50) : o.push(h / (h + c) * 100), ++a; a < n; ++a) {
                i += -r + t[a] * s, r += -t[a - s] + t[a];
                const n = (i / s - l / s * r / s) / (u / s - l / s * (l / s)), f = r / s - n * l / s, d = t[a] - (f + n * s);
                d > 0 ? h = 2 * (d * d / s - h) / (e + 1) + h : c = 2 * (d * d / s - c) / (e + 1) + c, h + c == 0 ? o.push(50) : o.push(h / (h + c) * 100);
            } return o; }
            smi(t, e, s, n, o, r, i = t.length) { const l = []; let u = 1 - n, h = NaN, c = NaN, a = NaN, f = NaN, d = 0, p = 0, v = 0, x = 0, g = 0, N = 0; for (; N < i && u == 1 - n; ++N, ++u)
                p = t[N], v = u, d = e[N], x = u; for (; N < i && u < 0; ++N, ++u)
                p <= t[N] && (p = t[N], v = u), d >= e[N] && (d = e[N], x = u); for (; N < i && 0 == u; ++N, ++u)
                p <= t[N] && (p = t[N], v = u), d >= e[N] && (d = e[N], x = u), h = c = s[N] - .5 * (p + d), a = f = p - d, l.push(100 * c / (.5 * f)); for (; N < i; ++N, ++u) {
                if (v == u - n) {
                    p = t[N], v = u;
                    for (let e = 1; e < n; ++e)
                        g = t[N - e], g > p && (p = g, v = u - e);
                }
                else
                    p <= t[N] && (p = t[N], v = u);
                if (x == u - n) {
                    d = e[N], x = u;
                    for (let t = 1; t < n; ++t)
                        g = e[N - t], g < d && (d = g, x = u - t);
                }
                else
                    d >= e[N] && (d = e[N], x = u);
                h = (s[N] - .5 * (p + d) - h) * (2 / (1 + o)) + h, c = 2 / (1 + r) * (h - c) + c, a = 2 / (1 + o) * (p - d - a) + a, f = 2 / (1 + r) * (a - f) + f, l.push(100 * c / (.5 * f));
            } return l; }
            tsi(t, e, s, n = t.length) { const o = []; let r = -1, i = 0, l = 0, u = 0, h = 0, c = 0, a = 0; for (; a < n && -1 == r; ++a, ++r)
                i = t[a]; for (; a < n && 0 == r; ++a, ++r)
                u = l = t[a] - i, c = h = Math.abs(t[a] - i), o.push(100 * (c ? u / c : 0)), i = t[a]; for (; a < n; ++a, ++r)
                l = 2 * (t[a] - i - l) / (1 + e) + l, h = 2 * (Math.abs(t[a] - i) - h) / (1 + e) + h, u = 2 * (l - u) / (1 + s) + u, c = 2 * (h - c) / (1 + s) + c, o.push(100 * (c ? u / c : 0)), i = t[a]; return o; }
            vwap(t, e, s, n, o, r = t.length) { const i = []; let l = 1 - o, u = 0, h = 0, c = 0; for (; c < r && l < 1; ++c, ++l)
                u += (t[c] + e[c] + s[c]) / 3 * n[c], h += n[c]; for (c > 0 && 1 == l && i.push(u / h); c < r; ++c, ++l)
                u += (t[c] + e[c] + s[c]) / 3 * n[c] - (t[c - o] + e[c - o] + s[c - o]) / 3 * n[c - o], h += n[c] - n[c - o], i.push(u / h); return i; }
        }; }, 409: (t, e) => { Object.defineProperty(e, "__esModule", { value: !0 }), e.ti_buffer = void 0; class s {
            constructor(t) { this.size = t, this.pushes = 0, this.index = 0, this.sum = 0, this.vals = []; }
            static new(t) { return new s(t); }
            push(t) { this.pushes >= this.size && (this.sum -= this.vals[this.index]), this.sum += t, this.vals[this.index] = t, this.pushes += 1, this.index = (this.index + 1) % this.size; }
            qpush(t) { this.vals[this.index] = t, this.index = (this.index + 1) % this.size; }
            get(t) { return this.vals[(this.index + this.size - 1 + t) % this.size]; }
        } e.ti_buffer = s; } }, e = {};
    function s(n) { var o = e[n]; if (void 0 !== o)
        return o.exports; var r = e[n] = { exports: {} }; return t[n].call(r.exports, r, r.exports, s), r.exports; }
    var n = {};
    return (() => { var t = n; Object.defineProperty(t, "__esModule", { value: !0 }), t.IndicatorsNormalizedSync = t.IndicatorsNormalized = t.IndicatorsSync = t.Indicators = void 0; var e = s(104); Object.defineProperty(t, "Indicators", { enumerable: !0, get: function () { return e.Indicators; } }); var o = s(648); Object.defineProperty(t, "IndicatorsSync", { enumerable: !0, get: function () { return o.IndicatorsSync; } }); var r = s(830); Object.defineProperty(t, "IndicatorsNormalized", { enumerable: !0, get: function () { return r.IndicatorsNormalized; } }); var i = s(186); Object.defineProperty(t, "IndicatorsNormalizedSync", { enumerable: !0, get: function () { return i.IndicatorsNormalizedSync; } }); })(), n;
})()));
