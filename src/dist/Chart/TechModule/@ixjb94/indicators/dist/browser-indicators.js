"use strict";
!function (t, e) { "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.indicators = e() : t.indicators = e(); }(self, (() => (() => {
    "use strict";
    var t = { 104: function (t, e, s) { var n = this && this.__awaiter || function (t, e, s, n) { return new (s || (s = Promise))((function (i, o) { function r(t) { try {
            h(n.next(t));
        }
        catch (t) {
            o(t);
        } } function u(t) { try {
            h(n.throw(t));
        }
        catch (t) {
            o(t);
        } } function h(t) { var e; t.done ? i(t.value) : (e = t.value, e instanceof s ? e : new s((function (t) { t(e); }))).then(r, u); } h((n = n.apply(t, e || [])).next()); })); }; Object.defineProperty(e, "__esModule", { value: !0 }), e.Indicators = void 0; const i = s(409); e.Indicators = class {
            constructor() { }
            normalize(t, e, s = NaN) { return n(this, void 0, void 0, (function* () { const n = t - e.length, i = []; for (let t = 0; t < n; ++t)
                i.push(s); return [...i, ...e]; })); }
            floor(t) { return t < 0 ? ~~t - 1 : ~~t; }
            sqrt(t, e = t / 2) { const s = (e + t / e) / 2; return (e > s ? e - s : s - e) < 1e-7 ? s : this.sqrt(t, s); }
            ad(t, e, s, i, o = s.length) { return n(this, void 0, void 0, (function* () { const n = []; let r = 0; for (let u = 0; u < o; ++u) {
                const o = t[u] - e[u];
                0 != o && (r += (s[u] - e[u] - t[u] + s[u]) / o * i[u]), n[u] = r;
            } return n; })); }
            adosc(t, e, s, i, o, r, u = s.length) { return n(this, void 0, void 0, (function* () { const n = r - 1, h = 2 / (o + 1), l = 2 / (r + 1), d = []; let f = 0, c = 0, v = 0; for (let o = 0; o < u; ++o) {
                const r = t[o] - e[o];
                0 != r && (f += (s[o] - e[o] - t[o] + s[o]) / r * i[o]), 0 == o ? (c = f, v = f) : (c = (f - c) * h + c, v = (f - v) * l + v), o >= n && d.push(c - v);
            } return d; })); }
            adx(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = (s - 1) / s, r = 1 / s; let u = 0, h = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], i = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > i && (i = 0), i < 0 ? i = 0 : i > s && (s = 0), u += s, h += i;
            } let l = 0, d = u, f = h, c = Math.abs(d - f), v = d + f, p = c / v * 100; l += p; for (let a = s; a < i; ++a) {
                let i = t[a] - t[a - 1], x = e[a - 1] - e[a];
                i < 0 ? i = 0 : i > x && (x = 0), x < 0 ? x = 0 : x > i && (i = 0), u = u * o + i, h = h * o + x, d = u, f = h, c = Math.abs(d - f), v = d + f, p = c / v * 100, a - s < s - 2 ? l += p : a - s == s - 2 ? (l += p, n.push(l * r)) : (l = l * o + p, n.push(l * r));
            } return n; })); }
            adxr(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = (s - 1) / s, r = 1 / s; let u = 0, h = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], i = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > i && (i = 0), i < 0 ? i = 0 : i > s && (s = 0), u += s, h += i;
            } let l = 0, d = u, f = h, c = Math.abs(d - f), v = d + f, p = c / v * 100; l += p; const a = { size: s - 1, pushes: 0, index: 0, vals: [] }, x = 3 * (s - 1); for (let g = s; g < i; ++g) {
                let i = t[g] - t[g - 1], m = e[g - 1] - e[g];
                if (i < 0 ? i = 0 : i > m && (m = 0), m < 0 ? m = 0 : m > i && (i = 0), u = u * o + i, h = h * o + m, d = u, f = h, c = Math.abs(d - f), v = d + f, p = c / v * 100, g - s < s - 2)
                    l += p;
                else if (g - s == s - 2)
                    l += p, a.vals[a.index] = l * r, a.index = a.index + 1, a.index >= a.size && (a.index = 0);
                else {
                    if (l = l * o + p, g >= x) {
                        const t = a.vals[a.index] + (a.size - 1 + 1) % a.size;
                        n.push(.5 * (l * r + t));
                    }
                    a.vals[a.index] = l * r, a.index = a.index + 1, a.index >= a.size && (a.index = 0);
                }
            } return n; })); }
            ao(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i = 0, o = 0; const r = 1 / 34; for (let s = 0; s < 34; ++s) {
                const n = .5 * (t[s] + e[s]);
                i += n, s >= 29 && (o += n);
            } n.push(.2 * o - r * i); for (let u = 34; u < s; ++u) {
                const s = .5 * (t[u] + e[u]);
                i += s, o += s, i -= .5 * (t[u - 34] + e[u - 34]), o -= .5 * (t[u - 5] + e[u - 5]), n.push(.2 * o - r * i);
            } return n; })); }
            apo(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 2 / (e + 1), r = 2 / (s + 1); let u = t[0], h = t[0]; for (let e = 1; e < i; ++e) {
                u = (t[e] - u) * o + u, h = (t[e] - h) * r + h;
                const s = u - h;
                n.push(s);
            } return n; })); }
            aroon(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = [], r = 100 / s; let u, h, l = 0, d = -1, f = -1, c = t[0], v = e[0]; for (let p = s; p < i; ++p, ++l) {
                if (u = t[p], d < l)
                    for (d = l, c = t[d], h = l; ++h <= p;)
                        u = t[h], u >= c && (c = u, d = h);
                else
                    u >= c && (d = p, c = u);
                if (u = e[p], f < l)
                    for (f = l, v = e[f], h = l; ++h <= p;)
                        u = e[h], u <= v && (v = u, f = h);
                else
                    u <= v && (f = p, v = u);
                n[n.length] = (s - (p - f)) * r, o[o.length] = (s - (p - d)) * r;
            } return [n, o]; })); }
            aroonosc(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 100 / s; let r, u = 0, h = -1, l = -1, d = t[0], f = e[0]; for (let c = s; c < i; ++c, ++u) {
                let s = t[c];
                if (h < u)
                    for (h = u, d = t[h], r = u; ++r <= c;)
                        s = t[r], s >= d && (d = s, h = r);
                else
                    s >= d && (h = c, d = s);
                if (s = e[c], l < u)
                    for (l = u, f = e[l], r = u; ++r <= c;)
                        s = e[r], s <= f && (f = s, l = r);
                else
                    s <= f && (l = c, f = s);
                n.push((h - l) * o);
            } return n; })); }
            atr(t, e, s, i, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = 1 / i; let u, h = 0; h += t[0] - e[0]; for (let n = 1; n < i; ++n) {
                const i = e[n], o = t[n], r = s[n - 1], l = Math.abs(o - r), d = Math.abs(i - r);
                let f = o - i;
                l > f && (f = l), d > f && (f = d), u = f, h += u;
            } let l = h / i; n.push(l); for (let h = i; h < o; ++h) {
                const i = e[h], o = t[h], d = s[h - 1], f = Math.abs(o - d), c = Math.abs(i - d);
                let v = o - i;
                f > v && (v = f), c > v && (v = c), u = v, l = (u - l) * r + l, n.push(l);
            } return n; })); }
            avgprice(t, e, s, i, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let r = 0; r < o; ++r)
                n.push(.25 * (t[r] + e[r] + s[r] + i[r])); return n; })); }
            bbands(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = [], r = [], u = 1 / e; let h = 0, l = 0; for (let s = 0; s < e; ++s)
                h += t[s], l += t[s] * t[s]; let d = Math.sqrt(l * u - h * u * (h * u)); const f = h * u; n.push(f - s * d), r.push(f + s * d), o.push(f); for (let f = e; f < i; ++f) {
                h += t[f], l += t[f] * t[f], h -= t[f - e], l -= t[f - e] * t[f - e], d = Math.sqrt(l * u - h * u * (h * u));
                const i = h * u;
                r.push(i + s * d), n.push(i - s * d), o.push(i);
            } return [n, o, r]; })); }
            bop(t, e, s, i, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let r = 0; r < o; ++r) {
                const o = e[r] - s[r];
                n[r] = o <= 0 ? 0 : (i[r] - t[r]) / o;
            } return n; })); }
            cci(t, e, s, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = 1 / o, u = [], h = new i.ti_buffer(o); let l, d; for (l = 0; l < r; ++l) {
                const i = (t[l] + e[l] + s[l]) * (1 / 3);
                h.push(i);
                const r = h.sum * n;
                if (l >= 2 * o - 2) {
                    let t = 0;
                    for (d = 0; d < o; ++d)
                        t += Math.abs(r - h.vals[d]);
                    let e = t * n;
                    e *= .015, e = (i - r) / e, u.push(e);
                }
            } return u; })); }
            cmo(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i = 0, o = 0; for (let s = 1; s <= e; ++s)
                i += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, o += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; n.push(100 * (i - o) / (i + o)); for (let r = e + 1; r < s; ++r)
                i -= t[r - e] > t[r - e - 1] ? t[r - e] - t[r - e - 1] : 0, o -= t[r - e] < t[r - e - 1] ? t[r - e - 1] - t[r - e] : 0, i += t[r] > t[r - 1] ? t[r] - t[r - 1] : 0, o += t[r] < t[r - 1] ? t[r - 1] - t[r] : 0, n.push(100 * (i - o) / (i + o)); return n; })); }
            crossany(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let i = 0; i < s; ++i)
                n.push(t[i] > e[i] && t[i - 1] <= e[i - 1] || t[i] < e[i] && t[i - 1] >= e[i - 1]); return n; })); }
            crossover(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let i = 0; i < s; ++i)
                n.push(t[i] > e[i] && t[i - 1] <= e[i - 1]); return n; })); }
            crossOverNumber(t, e) { const s = []; for (let n = 0; n < t.length; n++) {
                const i = t[n], o = t[n - 1];
                i > e && o <= e ? s.push(!0) : s.push(!1);
            } return s; }
            crossUnderNumber(t, e) { const s = []; for (let n = 0; n < t.length; n++) {
                const i = t[n], o = t[n - 1];
                i < e && o >= e ? s.push(!0) : s.push(!1);
            } return s; }
            cvi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = 2 / (s + 1), u = new i.ti_buffer(s); let h, l = t[0] - e[0]; for (h = 1; h < 2 * s - 1; ++h)
                l = (t[h] - e[h] - l) * r + l, u.qpush(l); for (h = 2 * s - 1; h < o; ++h) {
                l = (t[h] - e[h] - l) * r + l;
                const s = u.vals[u.index];
                n.push(100 * (l - s) / s), u.qpush(l);
            } return n; })); }
            _cvi(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 2 / (s + 1), r = { size: s, index: 0, pushes: 0, vals: [] }; let u = t[0] - e[0]; for (let n = 1; n < 2 * s - 1; ++n)
                u = (t[n] - e[n] - u) * o + u, r.vals[r.index] = u, r.index = r.index + 1, r.index >= r.size && (r.index = 0); for (let h = 2 * s - 1; h < i; ++h) {
                u = (t[h] - e[h] - u) * o + u;
                const s = r.vals[r.index];
                n.push(100 * (u - s) / s), r.vals[r.index] = u, r.index = r.index + 1, r.index >= r.size && (r.index = 0);
            } return n; })); }
            decay(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 1 / e; n.push(t[0]); for (let e = 1; e < s; ++e) {
                const s = n[n.length - 1] - i;
                n.push(t[e] > s ? t[e] : s);
            } return n; })); }
            dema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 2 / (e + 1), o = 1 - i; let r = t[0], u = r; for (let h = 0; h < s; ++h)
                r = r * o + t[h] * i, h == e - 1 && (u = r), h >= e - 1 && (u = u * o + r * i, h >= 2 * (e - 1) && n.push(2 * r - u)); return n; })); }
            di(t, e, s, i, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = [], u = (i - 1) / i; let h = 0, l = 0, d = 0; for (let n = 1; n < i; ++n) {
                const i = e[n], o = t[n], r = s[n - 1], u = Math.abs(o - r), f = Math.abs(i - r);
                let c = o - i;
                u > c && (c = u), f > c && (c = f), h += c;
                let v = t[n] - t[n - 1], p = e[n - 1] - e[n];
                v < 0 ? v = 0 : v > p && (p = 0), p < 0 ? p = 0 : p > v && (v = 0), l += v, d += p;
            } n.push(100 * l / h), r.push(100 * d / h); for (let f = i; f < o; ++f) {
                const i = e[f], o = t[f], c = s[f - 1], v = Math.abs(o - c), p = Math.abs(i - c);
                let a = o - i;
                v > a && (a = v), p > a && (a = p), h = h * u + a;
                let x = t[f] - t[f - 1], g = e[f - 1] - e[f];
                x < 0 ? x = 0 : x > g && (g = 0), g < 0 ? g = 0 : g > x && (x = 0), l = l * u + x, d = d * u + g, n.push(100 * l / h), r.push(100 * d / h);
            } return [n, r]; })); }
            dm(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = [], r = (s - 1) / s; let u = 0, h = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], i = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > i && (i = 0), i < 0 ? i = 0 : i > s && (s = 0), u += s, h += i;
            } n.push(u), o.push(h); for (let l = s; l < i; ++l) {
                let s = t[l] - t[l - 1], i = e[l - 1] - e[l];
                s < 0 ? s = 0 : s > i && (i = 0), i < 0 ? i = 0 : i > s && (s = 0), u = u * r + s, h = h * r + i, n.push(u), o.push(h);
            } return [n, o]; })); }
            dpo(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = e / 2 + 1, i = [], o = 1 / e; let r = 0; for (let s = 0; s < e; ++s)
                r += t[s]; i.push(t[e - 1 - n] - r * o); for (let u = e; u < s; ++u)
                r += t[u], r -= t[u - e], i.push(t[u - n] - r * o); return i; })); }
            dx(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = (s - 1) / s; let r = 0, u = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], i = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > i && (i = 0), i < 0 ? i = 0 : i > s && (s = 0), r += s, u += i;
            } let h = r, l = u, d = Math.abs(h - l), f = h + l, c = d / f * 100; n.push(c); for (let v = s; v < i; ++v) {
                let s = t[v] - t[v - 1], i = e[v - 1] - e[v];
                s < 0 ? s = 0 : s > i && (i = 0), i < 0 ? i = 0 : i > s && (s = 0), r = r * o + s, u = u * o + i, h = r, l = u, d = Math.abs(h - l), f = h + l, c = d / f * 100, n.push(c);
            } return n; })); }
            edecay(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 1 - 1 / e; n.push(t[0]); for (let e = 1; e < s; ++e) {
                const s = n[n.length - 1] * i;
                n.push(t[e] > s ? t[e] : s);
            } return n; })); }
            ema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 2 / (e + 1); let o = t[0]; n.push(o); for (let e = 1; e < s; ++e)
                o = (t[e] - o) * i + o, n.push(o); return n; })); }
            emv(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = .5 * (t[0] + e[0]); for (let r = 1; r < i; ++r) {
                const i = .5 * (t[r] + e[r]), u = s[r] / 1e4 / (t[r] - e[r]);
                n.push((i - o) / u), o = i;
            } return n; })); }
            fisher(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = []; let r, u, h = 0, l = -1, d = -1, f = .5 * (t[0] + e[0]), c = .5 * (t[0] + e[0]), v = 0, p = 0; for (let a = s - 1; a < i; ++a, ++h) {
                if (r = .5 * (t[a] + e[a]), l < h)
                    for (l = h, f = .5 * (t[l] + e[l]), u = h; ++u <= a;)
                        r = .5 * (t[u] + e[u]), r >= f && (f = r, l = u);
                else
                    r >= f && (l = a, f = r);
                if (r = .5 * (t[a] + e[a]), d < h)
                    for (d = h, c = .5 * (t[d] + e[d]), u = h; ++u <= a;)
                        r = .5 * (t[u] + e[u]), r <= c && (c = r, d = u);
                else
                    r <= c && (d = a, c = r);
                let s = f - c;
                0 == s && (s = .001), v = .66 * ((.5 * (t[a] + e[a]) - c) / s - .5) + .67 * v, v > .99 && (v = .999), v < -.99 && (v = -.999), o.push(p), p = .5 * Math.log((1 + v) / (1 - v)) + .5 * p, n.push(p);
            } return [n, o]; })); }
            fosc(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i = 0, o = 0, r = 0, u = 0; const h = 1 / e; let l = 0; for (let s = 0; s < e - 1; ++s)
                i += s + 1, o += (s + 1) * (s + 1), u += t[s] * (s + 1), r += t[s]; i += e, o += e * e; const d = 1 / (e * o - i * i); for (let o = e - 1; o < s; ++o) {
                u += t[o] * e, r += t[o];
                const s = (e * u - i * r) * d, f = (r - s * i) * h;
                o >= e && n.push(100 * (t[o] - l) / t[o]), l = f + s * (e + 1), u -= r, r -= t[o - e + 1];
            } return n; })); }
            DEP_hma(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = this.floor(e / 2), o = this.floor(this.sqrt(e)), r = e * (e + 1) / 2, u = i * (i + 1) / 2, h = o * (o + 1) / 2; let l, d = 0, f = 0, c = 0, v = 0, p = 0, a = 0; for (l = 0; l < e - 1; ++l)
                f += t[l] * (l + 1), d += t[l], l >= e - i && (v += t[l] * (l + 1 - (e - i)), c += t[l]); const x = { size: o, pushes: 0, index: 0, vals: [] }; for (l = e - 1; l < s; ++l) {
                f += t[l] * e, d += t[l], v += t[l] * i, c += t[l];
                const s = v / u * 2 - f / r;
                a += s * o, p += s, x.vals[x.index] = s, x.index = x.index + 1, x.index >= x.size && (x.index = 0), l >= e - 1 + (o - 1) ? (n.push(a / h), a -= p, p -= x.vals[x.index] + (x.size - 1 + 1) % x.size) : a -= p, f -= d, d -= t[l - e + 1], v -= c, c -= t[l - i + 1];
            } return n; })); }
            hma(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = Math.floor(e / 2), r = Math.floor(Math.sqrt(e)), u = e * (e + 1) / 2, h = o * (o + 1) / 2, l = r * (r + 1) / 2; let d, f = 0, c = 0, v = 0, p = 0, a = 0, x = 0; for (d = 0; d < e - 1; ++d)
                c += t[d] * (d + 1), f += t[d], d >= e - o && (p += t[d] * (d + 1 - (e - o)), v += t[d]); const g = new i.ti_buffer(r); for (d = e - 1; d < s; ++d) {
                c += t[d] * e, f += t[d], p += t[d] * o, v += t[d];
                const s = p / h * 2 - c / u;
                x += s * r, a += s, g.qpush(s), d >= e - 1 + (r - 1) ? (n.push(x / l), x -= a, a -= g.get(1)) : x -= a, c -= f, f -= t[d - e + 1], p -= v, v -= t[d - o + 1];
            } return n; })); }
            kama(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i = 0; for (let s = 1; s < e; ++s)
                i += Math.abs(t[s] - t[s - 1]); let o, r, u = t[e - 1]; n.push(u); for (let h = e; h < s; ++h)
                i += Math.abs(t[h] - t[h - 1]), h > e && (i -= Math.abs(t[h - e] - t[h - e - 1])), o = 0 != i ? Math.abs(t[h] - t[h - e]) / i : 1, r = Math.pow(.6021505376344085 * o + .06451612903225806, 2), u += r * (t[h] - u), n.push(u); return n; })); }
            kvo(t, e, s, i, o, r, u = t.length) { return n(this, void 0, void 0, (function* () { const n = 2 / (o + 1), h = 2 / (r + 1), l = []; let d = 0, f = t[0] + e[0] + s[0], c = -1, v = 0, p = 0; for (let o = 1; o < u; ++o) {
                const r = t[o] + e[o] + s[o], u = t[o] - e[o];
                r > f && 1 != c ? (c = 1, d = t[o - 1] - e[o - 1]) : r < f && 0 != c && (c = 0, d = t[o - 1] - e[o - 1]), d += u;
                const a = i[o] * Math.abs(u / d * 2 - 1) * 100 * (c ? 1 : -1);
                1 == o ? (v = a, p = a) : (v = (a - v) * n + v, p = (a - p) * h + p), l.push(v - p), f = r;
            } return l; })); }
            lag(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let i = e; i < s; ++i)
                n.push(t[i - e]); return n; })); }
            linreg(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i = 0, o = 0, r = 0, u = 0; const h = 1 / e; for (let s = 0; s < e - 1; ++s)
                i += s + 1, o += (s + 1) * (s + 1), u += t[s] * (s + 1), r += t[s]; i += e, o += e * e; const l = 1 / (e * o - i * i); for (let o = e - 1; o < s; ++o) {
                u += t[o] * e, r += t[o];
                const s = (e * u - i * r) * l, d = (r - s * i) * h;
                n.push(d + s * e), u -= r, r -= t[o - e + 1];
            } return n; })); }
            linregintercept(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i = 0, o = 0, r = 0, u = 0; const h = 1 / e; for (let s = 0; s < e - 1; ++s)
                i += s + 1, o += (s + 1) * (s + 1), u += t[s] * (s + 1), r += t[s]; i += e, o += e * e; const l = 1 / (e * o - i * i); for (let o = e - 1; o < s; ++o) {
                u += t[o] * e, r += t[o];
                const s = (e * u - i * r) * l, d = (r - s * i) * h;
                n.push(d + 1 * s), u -= r, r -= t[o - e + 1];
            } return n; })); }
            linregslope(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i = 0, o = 0, r = 0, u = 0; for (let s = 0; s < e - 1; ++s)
                i += s + 1, o += (s + 1) * (s + 1), u += t[s] * (s + 1), r += t[s]; i += e, o += e * e; const h = 1 / (e * o - i * i); for (let o = e - 1; o < s; ++o) {
                u += t[o] * e, r += t[o];
                const s = (e * u - i * r) * h;
                n.push(s), u -= r, r -= t[o - e + 1];
            } return n; })); }
            macd(t, e, s, i, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = [], u = [], h = 2 / (e + 1), l = 2 / (s + 1), d = 2 / (i + 1); let f = t[0], c = t[0], v = 0; for (let e = 1; e < o; ++e) {
                f = (t[e] - f) * h + f, c = (t[e] - c) * l + c;
                const i = f - c;
                e == s - 1 && (v = i), e >= s - 1 && (v = (i - v) * d + v, n.push(i), r.push(v), u.push(i - v));
            } return [n, r, u]; })); }
            marketfi(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = 0; o < i; ++o)
                n.push((t[o] - e[o]) / s[o]); return n; })); }
            mass(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = t[0] - e[0], r = o; const u = { index: 0, pushes: 0, size: s, sum: 0, vals: [] }; for (let h = 0; h < i; ++h)
                o = .8 * o + .2 * (t[h] - e[h]), 8 == h && (r = o), h >= 8 && (r = .8 * r + .2 * o, h >= 16 && (u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += o / r, u.vals[u.index] = o / r, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), h >= 16 + s - 1 && n.push(u.sum))); return n; })); }
            max(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i, o = 0, r = -1, u = t[0]; for (let h = e - 1; h < s; ++h, ++o) {
                let e = t[h];
                if (r < o)
                    for (r = o, u = t[r], i = o; ++i <= h;)
                        e = t[i], e >= u && (u = e, r = i);
                else
                    e >= u && (r = h, u = e);
                n.push(u);
            } return n; })); }
            md(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 1 / e; let o, r = 0; for (let u = 0; u < s; ++u) {
                r += t[u], u >= e && (r -= t[u - e]);
                const s = r * i;
                if (u >= e - 1) {
                    let r = 0;
                    for (o = 0; o < e; ++o)
                        r += Math.abs(s - t[u - o]);
                    n.push(r * i);
                }
            } return n; })); }
            medprice(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let i = 0; i < s; ++i)
                n.push(.5 * (t[i] + e[i])); return n; })); }
            mfi(t, e, s, i, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let u = (t[0] + e[0] + s[0]) * (1 / 3); const h = { size: o, index: 0, pushes: 0, sum: 0, vals: [] }, l = { size: o, index: 0, pushes: 0, sum: 0, vals: [] }; for (let d = 1; d < r; ++d) {
                const r = (t[d] + e[d] + s[d]) * (1 / 3), f = r * i[d];
                r > u ? (h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += f, h.vals[h.index] = f, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0), l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += 0, l.vals[l.index] = 0, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0)) : r < u ? (l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += f, l.vals[l.index] = f, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0), h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += 0, h.vals[h.index] = 0, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0)) : (h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += 0, h.vals[h.index] = 0, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0), l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += 0, l.vals[l.index] = 0, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0)), u = r, d >= o && n.push(h.sum / (h.sum + l.sum) * 100);
            } return n; })); }
            min(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i, o = 0, r = -1, u = t[0]; for (let h = e - 1; h < s; ++h, ++o) {
                let e = t[h];
                if (r < o)
                    for (r = o, u = t[r], i = o; ++i <= h;)
                        e = t[i], e <= u && (u = e, r = i);
                else
                    e <= u && (r = h, u = e);
                n.push(u);
            } return n; })); }
            mom(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let i = e; i < s; ++i)
                n.push(t[i] - t[i - e]); return n; })); }
            msw(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = [], o = 3.1415926, r = 2 * o; let u, h, l, d, f = 0; for (let c = e; c < s; ++c) {
                for (h = 0, l = 0, d = 0; d < e; ++d)
                    f = t[c - d], h += Math.cos(r * d / e) * f, l += Math.sin(r * d / e) * f;
                u = Math.abs(h) > .001 ? Math.atan(l / h) : r / 2 * (l < 0 ? -1 : 1), h < 0 && (u += o), u += o / 2, u < 0 && (u += r), u > r && (u -= r), n.push(Math.sin(u)), i.push(Math.sin(u + o / 4));
            } return [n, i]; })); }
            natr(t, e, s, i, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = 1 / i; let u, h = 0; h += t[0] - e[0]; for (let n = 1; n < i; ++n) {
                const i = e[n], o = t[n], r = s[n - 1], l = Math.abs(o - r), d = Math.abs(i - r);
                let f = o - i;
                l > f && (f = l), d > f && (f = d), u = f, h += u;
            } let l = h / i; n.push(100 * l / s[i - 1]); for (let h = i; h < o; ++h) {
                const i = e[h], o = t[h], d = s[h - 1], f = Math.abs(o - d), c = Math.abs(i - d);
                let v = o - i;
                f > v && (v = f), c > v && (v = c), u = v, l = (u - l) * r + l, n.push(100 * l / s[h]);
            } return n; })); }
            nvi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i = 1e3; n.push(i); for (let o = 1; o < s; ++o)
                e[o] < e[o - 1] && (i += (t[o] - t[o - 1]) / t[o - 1] * i), n.push(i); return n; })); }
            obv(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i = 0; n.push(i); let o = t[0]; for (let r = 1; r < s; ++r)
                t[r] > o ? i += e[r] : t[r] < o && (i -= e[r]), o = t[r], n.push(i); return n; })); }
            ppo(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 2 / (e + 1), r = 2 / (s + 1); let u = t[0], h = t[0]; for (let e = 1; e < i; ++e) {
                u = (t[e] - u) * o + u, h = (t[e] - h) * r + h;
                const s = 100 * (u - h) / h;
                n.push(s);
            } return n; })); }
            psar(t, e, s, i, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let r, u, h; r = t[0] + e[0] <= t[1] + e[1] ? 1 : 0, r ? (h = t[0], u = e[0]) : (h = e[0], u = t[0]); let l = s; for (let d = 1; d < o; ++d)
                u = (h - u) * l + u, r ? (d >= 2 && u > e[d - 2] && (u = e[d - 2]), u > e[d - 1] && (u = e[d - 1]), l < i && t[d] > h && (l += s, l > i && (l = i)), t[d] > h && (h = t[d])) : (d >= 2 && u < t[d - 2] && (u = t[d - 2]), u < t[d - 1] && (u = t[d - 1]), l < i && e[d] < h && (l += s, l > i && (l = i)), e[d] < h && (h = e[d])), (r && e[d] < u || !r && t[d] > u) && (l = s, u = h, r = !r, h = r ? t[d] : e[d]), n.push(u); return n; })); }
            pvi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i = 1e3; n.push(i); for (let o = 1; o < s; ++o)
                e[o] > e[o - 1] && (i += (t[o] - t[o - 1]) / t[o - 1] * i), n.push(i); return n; })); }
            qstick(t, e, s, i = e.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 / s; let r, u = 0; for (r = 0; r < s; ++r)
                u += e[r] - t[r]; for (n.push(u * o), r = s; r < i; ++r)
                u += e[r] - t[r], u -= e[r - s] - t[r - s], n.push(u * o); return n; })); }
            roc(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let i = e; i < s; ++i)
                n.push((t[i] - t[i - e]) / t[i - e]); return n; })); }
            rocr(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let i = e; i < s; ++i)
                n.push(t[i] / t[i - e]); return n; })); }
            rsi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 1 / e; let o = 0, r = 0; for (let s = 1; s <= e; ++s)
                o += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, r += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; o /= e, r /= e, n.push(o / (o + r) * 100); for (let u = e + 1; u < s; ++u)
                o = ((t[u] > t[u - 1] ? t[u] - t[u - 1] : 0) - o) * i + o, r = ((t[u] < t[u - 1] ? t[u - 1] - t[u] : 0) - r) * i + r, n.push(o / (o + r) * 100); return n; })); }
            sma(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 1 / e; let o = 0; for (let s = 0; s < e; ++s)
                o += t[s]; n.push(o * i); for (let r = e; r < s; ++r)
                o += t[r], o -= t[r - e], n.push(o * i); return n; })); }
            stddev(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 1 / e; let o = 0, r = 0; for (let s = 0; s < e; ++s)
                o += t[s], r += t[s] * t[s]; let u = r * i - o * i * (o * i); u > 0 && (u = Math.sqrt(u)), n.push(u); for (let u = e; u < s; ++u) {
                o += t[u], r += t[u] * t[u], o -= t[u - e], r -= t[u - e] * t[u - e];
                let s = r * i - o * i * (o * i);
                s > 0 && (s = Math.sqrt(s)), n.push(s);
            } return n; })); }
            stderr(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 1 / e; let o = 0, r = 0; const u = 1 / Math.sqrt(e); for (let s = 0; s < e; ++s)
                o += t[s], r += t[s] * t[s]; let h = r * i - o * i * (o * i); h > 0 && (h = Math.sqrt(h)), n.push(u * h); for (let h = e; h < s; ++h) {
                o += t[h], r += t[h] * t[h], o -= t[h - e], r -= t[h - e] * t[h - e];
                let s = r * i - o * i * (o * i);
                s > 0 && (s = Math.sqrt(s)), n.push(u * s);
            } return n; })); }
            stoch(t, e, s, i, o, r, u = t.length) { return n(this, void 0, void 0, (function* () { const n = 1 / o, h = 1 / r, l = [], d = []; let f, c = 0, v = -1, p = -1, a = t[0], x = e[0]; const g = { size: o, index: 0, pushes: 0, sum: 0, vals: [] }, m = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }; let M; for (let z = 0; z < u; ++z) {
                if (z >= i && ++c, f = t[z], v < c)
                    for (v = c, a = t[v], M = c; ++M <= z;)
                        f = t[M], f >= a && (a = f, v = M);
                else
                    f >= a && (v = z, a = f);
                if (f = e[z], p < c)
                    for (p = c, x = e[p], M = c; ++M <= z;)
                        f = e[M], f <= x && (x = f, p = M);
                else
                    f <= x && (p = z, x = f);
                const u = a - x, b = 0 == u ? 0 : (s[z] - x) / u * 100;
                if (g.pushes >= g.size && (g.sum -= g.vals[g.index]), g.sum += b, g.vals[g.index] = b, g.pushes += 1, g.index = g.index + 1, g.index >= g.size && (g.index = 0), z >= i - 1 + o - 1) {
                    const t = g.sum * n;
                    m.pushes >= m.size && (m.sum -= m.vals[m.index]), m.sum += t, m.vals[m.index] = t, m.pushes += 1, m.index = m.index + 1, m.index >= m.size && (m.index = 0), z >= i - 1 + o - 1 + r - 1 && (l.push(t), d.push(m.sum * h));
                }
            } return [l, d]; })); }
            stochrsi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 1 / e, o = { size: e, index: 0, pushes: 0, sum: 0, vals: [] }; let r = 0, u = 0; for (let s = 1; s <= e; ++s)
                r += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, u += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; r /= e, u /= e; let h = r / (r + u) * 100; o.pushes >= o.size && (o.sum -= o.vals[o.index]), o.sum += h, o.vals[o.index] = h, o.pushes += 1, o.index = o.index + 1, o.index >= o.size && (o.index = 0); let l = h, d = h, f = 0, c = 0; for (let v = e + 1; v < s; ++v) {
                if (r = ((t[v] > t[v - 1] ? t[v] - t[v - 1] : 0) - r) * i + r, u = ((t[v] < t[v - 1] ? t[v - 1] - t[v] : 0) - u) * i + u, h = r / (r + u) * 100, h > d)
                    d = h, c = o.index;
                else if (c == o.index) {
                    d = h;
                    for (let t = 0; t < o.size; ++t)
                        t != o.index && o.vals[t] > d && (d = o.vals[t], c = t);
                }
                if (h < l)
                    l = h, f = o.index;
                else if (f == o.index) {
                    l = h;
                    for (let t = 0; t < o.size; ++t)
                        t != o.index && o.vals[t] < l && (l = o.vals[t], f = t);
                }
                if (o.vals[o.index] = h, o.index = o.index + 1, o.index >= o.size && (o.index = 0), v > 2 * e - 2) {
                    const t = d - l;
                    0 == t ? n.push(0) : n.push((h - l) / t);
                }
            } return n; })); }
            sum(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i = 0; for (let s = 0; s < e; ++s)
                i += t[s]; n.push(i); for (let o = e; o < s; ++o)
                i += t[o], i -= t[o - e], n.push(i); return n; })); }
            tema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 2 / (e + 1), o = 1 - i; let r = t[0], u = 0, h = 0; for (let l = 0; l < s; ++l)
                r = r * o + t[l] * i, l == e - 1 && (u = r), l >= e - 1 && (u = u * o + r * i, l == 2 * (e - 1) && (h = u), l >= 2 * (e - 1) && (h = h * o + u * i, l >= 3 * (e - 1) && n.push(3 * r - 3 * u + h))); return n; })); }
            tr(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o; n[0] = t[0] - e[0]; for (let r = 1; r < i; ++r) {
                const i = e[r], u = t[r], h = s[r - 1], l = Math.abs(u - h), d = Math.abs(i - h);
                let f = u - i;
                l > f && (f = l), d > f && (f = d), o = f, n.push(o);
            } return n; })); }
            trima(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 1 / (e % 2 ? (e / 2 + 1) * (e / 2 + 1) : e / 2 * (e / 2 + 1)); let o = 0, r = 0, u = 0; const h = e % 2 ? e / 2 : e / 2 - 1, l = h + 1; let d = 1; for (let s = 0; s < e - 1; ++s)
                o += t[s] * d, s + 1 > e - h && (r += t[s]), s + 1 <= l && (u += t[s]), s + 1 < l && ++d, s + 1 >= e - h && --d; let f = e - 1 - h + 1, c = e - 1 - e + 1 + l, v = e - 1 - e + 1; for (let h = e - 1; h < s; ++h)
                o += t[h], n.push(o * i), r += t[h], o += r, o -= u, r -= t[f++], u += t[c++], u -= t[v++]; return n; })); }
            trix(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 3 * e - 2, o = 2 / (e + 1); let r = t[0], u = 0, h = 0; for (let s = 1; s < i; ++s)
                r = (t[s] - r) * o + r, s == e - 1 ? u = r : s > e - 1 && (u = (r - u) * o + u, s == 2 * e - 2 ? h = u : s > 2 * e - 2 && (h = (u - h) * o + h)); for (let e = i; e < s; ++e) {
                r = (t[e] - r) * o + r, u = (r - u) * o + u;
                const s = h;
                h = (u - h) * o + h, n.push((h - s) / h * 100);
            } return n; })); }
            tsf(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i = 0, o = 0, r = 0, u = 0; const h = 1 / e; for (let s = 0; s < e - 1; ++s)
                i += s + 1, o += (s + 1) * (s + 1), u += t[s] * (s + 1), r += t[s]; i += e, o += e * e; const l = 1 / (e * o - i * i); for (let o = e - 1; o < s; ++o) {
                u += t[o] * e, r += t[o];
                const s = (e * u - i * r) * l, d = (r - s * i) * h;
                n.push(d + s * (e + 1)), u -= r, r -= t[o - e + 1];
            } return n; })); }
            typprice(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = 0; o < i; ++o)
                n.push((t[o] + e[o] + s[o]) * (1 / 3)); return n; })); }
            ultosc(t, e, s, i, o, r, u = t.length) { return n(this, void 0, void 0, (function* () { const n = [], h = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }, l = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }; let d = 0, f = 0, c = 0, v = 0; for (let p = 1; p < u; ++p) {
                const u = e[p] < s[p - 1] ? e[p] : s[p - 1], a = t[p] > s[p - 1] ? t[p] : s[p - 1], x = s[p] - u, g = a - u;
                if (d += x, f += x, c += g, v += g, h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += x, h.vals[h.index] = x, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0), l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += g, l.vals[l.index] = g, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0), p > i) {
                    let t = h.index - i - 1;
                    if (t < 0 && (t += r), d -= h.vals[t], c -= l.vals[t], p > o) {
                        let t = h.index - o - 1;
                        t < 0 && (t += r), f -= h.vals[t], v -= l.vals[t];
                    }
                }
                if (p >= r) {
                    const t = 100 * (4 * d / c + 2 * f / v + 1 * h.sum / l.sum) / 7;
                    n.push(t);
                }
            } return n; })); }
            var(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 1 / e; let o = 0, r = 0; for (let s = 0; s < e; ++s)
                o += t[s], r += t[s] * t[s]; n.push(r * i - o * i * (o * i)); for (let u = e; u < s; ++u)
                o += t[u], r += t[u] * t[u], o -= t[u - e], r -= t[u - e] * t[u - e], n.push(r * i - o * i * (o * i)); return n; })); }
            vhf(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i, o, r, u = 1, h = -1, l = -1, d = t[0], f = t[0], c = 0, v = t[0]; for (let s = 1; s < e; ++s)
                o = t[s], c += Math.abs(o - v), v = o; for (let p = e; p < s; ++p, ++u) {
                if (o = t[p], c += Math.abs(o - v), v = o, p > e && (c -= Math.abs(t[p - e] - t[p - e - 1])), i = o, h < u)
                    for (h = u, d = t[h], r = u; ++r <= p;)
                        i = t[r], i >= d && (d = i, h = r);
                else
                    i >= d && (h = p, d = i);
                if (i = o, l < u)
                    for (l = u, f = t[l], r = u; ++r <= p;)
                        i = t[r], i <= f && (f = i, l = r);
                else
                    i <= f && (l = p, f = i);
                n.push(Math.abs(d - f) / c);
            } return n; })); }
            vidya(t, e, s, i, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = 1 / e, u = 1 / s; let h = 0, l = 0, d = 0, f = 0; for (let n = 0; n < s; ++n)
                d += t[n], f += t[n] * t[n], n >= s - e && (h += t[n], l += t[n] * t[n]); let c = t[s - 2]; if (n.push(c), s - 1 < o) {
                let e = Math.sqrt(l * r - h * r * (h * r)) / Math.sqrt(f * u - d * u * (d * u));
                e != e && (e = 0), e *= i, c = (t[s - 1] - c) * e + c, n.push(c);
            } for (let v = s; v < o; ++v) {
                d += t[v], f += t[v] * t[v], h += t[v], l += t[v] * t[v], d -= t[v - s], f -= t[v - s] * t[v - s], h -= t[v - e], l -= t[v - e] * t[v - e];
                let o = Math.sqrt(l * r - h * r * (h * r)) / Math.sqrt(f * u - d * u * (d * u));
                o != o && (o = 0), o *= i, c = (t[v] - c) * o + c, n.push(c);
            } return n; })); }
            volatility(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 1 / e, o = Math.sqrt(252); let r = 0, u = 0; for (let s = 1; s <= e; ++s) {
                const e = t[s] / t[s - 1] - 1;
                r += e, u += e * e;
            } n.push(Math.sqrt(u * i - r * i * (r * i)) * o); for (let h = e + 1; h < s; ++h) {
                const s = t[h] / t[h - 1] - 1;
                r += s, u += s * s;
                const l = t[h - e] / t[h - e - 1] - 1;
                r -= l, u -= l * l, n.push(Math.sqrt(u * i - r * i * (r * i)) * o);
            } return n; })); }
            vosc(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 / e, r = 1 / s; let u = 0, h = 0; for (let n = 0; n < s; ++n)
                n >= s - e && (u += t[n]), h += t[n]; const l = u * o, d = h * r; n.push(100 * (l - d) / d); for (let l = s; l < i; ++l) {
                u += t[l], u -= t[l - e], h += t[l], h -= t[l - s];
                const i = u * o, d = h * r;
                n.push(100 * (i - d) / d);
            } return n; })); }
            vwma(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 0, r = 0; for (let n = 0; n < s; ++n)
                o += t[n] * e[n], r += e[n]; n.push(o / r); for (let u = s; u < i; ++u)
                o += t[u] * e[u], o -= t[u - s] * e[u - s], r += e[u], r -= e[u - s], n.push(o / r); return n; })); }
            wad(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 0, r = s[0]; for (let u = 1; u < i; ++u) {
                const i = s[u];
                i > r ? o += i - (r < e[u] ? r : e[u]) : i < r && (o += i - (r > t[u] ? r : t[u])), n.push(o), r = s[u];
            } return n; })); }
            wcprice(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = 0; o < i; ++o)
                n.push(.25 * (t[o] + e[o] + s[o] + s[o])); return n; })); }
            wilders(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = 1 / e; let o = 0; for (let s = 0; s < e; ++s)
                o += t[s]; let r = o / e; n.push(r); for (let o = e; o < s; ++o)
                r = (t[o] - r) * i + r, n.push(r); return n; })); }
            willr(t, e, s, i, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let r, u, h = 0, l = -1, d = -1, f = t[0], c = e[0]; for (let v = i - 1; v < o; ++v, ++h) {
                if (r = t[v], l < h)
                    for (l = h, f = t[l], u = h; ++u <= v;)
                        r = t[u], r >= f && (f = r, l = u);
                else
                    r >= f && (l = v, f = r);
                if (r = e[v], d < h)
                    for (d = h, c = e[d], u = h; ++u <= v;)
                        r = e[u], r <= c && (c = r, d = u);
                else
                    r <= c && (d = v, c = r);
                const i = f - c, o = 0 == i ? 0 : (f - s[v]) / i * -100;
                n.push(o);
            } return n; })); }
            wma(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = e * (e + 1) / 2; let o = 0, r = 0; for (let s = 0; s < e - 1; ++s)
                r += t[s] * (s + 1), o += t[s]; for (let u = e - 1; u < s; ++u)
                r += t[u] * e, o += t[u], n.push(r / i), r -= o, o -= t[u - e + 1]; return n; })); }
            zlema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = Math.floor((e - 1) / 2), i = [], o = 2 / (e + 1); let r, u = t[n - 1]; for (i.push(u), r = n; r < s; ++r) {
                const e = t[r];
                u = (e + (e - t[r - n]) - u) * o + u, i.push(u);
            } return i; })); }
            abands(t, e, s, i, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = [], u = [], h = 1 / i, l = { size: i, index: 0, pushes: 0, sum: 0, vals: [] }, d = { size: i, index: 0, pushes: 0, sum: 0, vals: [] }; let f = 0; for (let n = 0; n < i; ++n) {
                const i = 4 * (t[n] - e[n]) / (t[n] + e[n]), o = (1 + i) * t[n];
                l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += o, l.vals[l.index] = o, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0);
                const r = (1 - i) * e[n];
                d.pushes >= d.size && (d.sum -= d.vals[d.index]), d.sum += r, d.vals[d.index] = r, d.pushes += 1, d.index = d.index + 1, d.index >= d.size && (d.index = 0), f += s[n];
            } n.push(l.sum * h), r.push(d.sum * h), u.push(f * h); for (let c = i; c < o; ++c) {
                const o = 4 * (t[c] - e[c]) / (t[c] + e[c]), v = (1 + o) * t[c];
                l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += v, l.vals[l.index] = v, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0);
                const p = (1 - o) * e[c];
                d.pushes >= d.size && (d.sum -= d.vals[d.index]), d.sum += p, d.vals[d.index] = p, d.pushes += 1, d.index = d.index + 1, d.index >= d.size && (d.index = 0), f += s[c] - s[c - i], n.push(l.sum * h), r.push(d.sum * h), u.push(f * h);
            } return [n, r, u]; })); }
            alma(t, e, s, i, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = [], u = Math.floor(s * (e - 1)), h = e / i; let l = 0; for (let t = 0; t < e; t++)
                r[t] = Math.exp(-1 * Math.pow(t - u, 2) / (2 * Math.pow(h, 2))), l += r[t]; for (let t = 0; t < e; t++)
                r[t] /= l; for (let s = e - 1; s < o; s++) {
                let i = 0;
                for (let n = 0; n < e; n++)
                    i += t[s - e + n + 1] * r[n];
                n.push(i);
            } return n; })); }
            ce(t, e, s, i, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], u = []; let h, l, d = t[0] - e[0], f = t[0], c = 0, v = e[0], p = 0; for (let n = 1; n < i; ++n) {
                const i = e[n], o = t[n], r = s[n - 1], u = Math.abs(o - r), a = Math.abs(i - r);
                let x = o - i;
                u > x && (x = u), a > x && (x = a), h = x, d += h, f <= (l = t[n]) && (f = l, c = n), v >= (l = e[n]) && (v = l, p = n);
            } d /= i; const a = (i - 1) / i, x = 1 / i; n.push(f - o * d), u.push(v + o * d); for (let g = i; g < r; ++g) {
                const r = e[g], m = t[g], M = s[g - 1], z = Math.abs(m - M), b = Math.abs(r - M);
                let q = m - r;
                if (z > q && (q = z), b > q && (q = b), h = q, d = d * a + h * x, f <= (l = t[g]))
                    f = l, c = g;
                else if (c == g - i) {
                    f = t[g - i + 1], c = g - i + 1;
                    for (let e = g - i + 2; e <= g; ++e)
                        f <= (l = t[e]) && (f = l, c = e);
                }
                if (v >= (l = e[g]))
                    v = l, p = g;
                else if (p == g - i) {
                    v = e[g - i + 1], p = g - i + 1;
                    for (let t = g - i + 2; t <= g; ++t)
                        v >= (l = e[t]) && (v = l, p = t);
                }
                n.push(f - o * d), u.push(v + o * d);
            } return [n, u]; })); }
            cmf(t, e, s, i, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let u = 0, h = 0; for (let n = 0; n < o - 1; ++n)
                h += t[n] - e[n] ? i[n] * (s[n] - e[n] - (t[n] - s[n])) / (t[n] - e[n]) : 0, u += i[n]; for (let l = o - 1; l < r; ++l)
                h += t[l] - e[l] ? i[l] * (s[l] - e[l] - (t[l] - s[l])) / (t[l] - e[l]) : 0, u += i[l], n.push(h / u), h -= t[l - o + 1] - e[l - o + 1] ? i[l - o + 1] * (s[l - o + 1] - e[l - o + 1] - (t[l - o + 1] - s[l - o + 1])) / (t[l - o + 1] - e[l - o + 1]) : 0, u -= i[l - o + 1]; return n; })); }
            copp(t, e, s) { return n(this, void 0, void 0, (function* () { const n = new Array(t.length), i = new Array(t.length), o = new Array(t.length); for (let r = 0; r < t.length; r++)
                n[r] = r < e - 1 ? null : (t[r] - t[r - e]) / t[r - e] * 100, i[r] = r < s - 1 ? null : (t[r] - t[r - s]) / t[r - s] * 100, o[r] = 10 * (n[r] + i[r]); return o; })); }
            dc(t, e, s) { return n(this, void 0, void 0, (function* () { const n = [], i = [], o = []; for (let r = s - 1; r < t.length; r++)
                n.push(Math.max(...t.slice(r - s + 1, r + 1))), i.push(Math.min(...e.slice(r - s + 1, r + 1))), o.push((n[n.length - 1] + i[i.length - 1]) / 2); return [n, o, i]; })); }
            fi(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 2 / (s + 1); let r = e[1] * (t[1] - t[0]); for (let s = 1; s < i; ++s)
                r = (e[s] * (t[s] - t[s - 1]) - r) * o + r, n.push(r); return n; })); }
            ikhts() { return n(this, void 0, void 0, (function* () { })); }
            kc(t, e, s, i, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], u = [], h = [], l = 2 / (i + 1); let d = s[0], f = t[0] - e[0]; n.push(d - o * f), u.push(d), h.push(d + o * f); let c = 0; for (let i = 1; i < r; ++i) {
                d = (s[i] - d) * l + d;
                const r = e[i], v = t[i], p = s[i - 1], a = Math.abs(v - p), x = Math.abs(r - p);
                let g = v - r;
                a > g && (g = a), x > g && (g = x), c = g, f = (c - f) * l + f, n.push(d - o * f), u.push(d), h.push(d + o * f);
            } return [n, u, h]; })); }
            kst(t, e, s, i, o, r, u, h, l, d = t.length) { return n(this, void 0, void 0, (function* () { const n = [], f = []; let c = r; c < u && (c = u), c < h && (c = h), c < l && (c = l); const v = 2 / (r + 1), p = 2 / (u + 1), a = 2 / (h + 1), x = 2 / (l + 1); function g(e, s) { return (t[e] - t[e - s]) / t[e - s]; } let m = g(e, e), M = g(s, s), z = g(i, i), b = g(o, o); for (let t = e + 1; t < o + 1 && t < d; ++t)
                m = (g(t, e) - m) * v + m; for (let t = s + 1; t < o + 1 && t < d; ++t)
                M = (g(t, s) - M) * p + M; for (let t = i + 1; t < o + 1 && t < d; ++t)
                z = (g(t, i) - z) * a + z; for (let t = o + 1; t < o + 1 && t < d; ++t)
                b = (g(t, o) - b) * x + b; let q = (1 * m + 2 * M + 3 * z + 4 * b) / 10; f.push(q); let w = q; n.push(w); for (let t = o + 1; t < d; ++t)
                m = (g(t, e) - m) * v + m, M = (g(t, s) - M) * p + M, z = (g(t, i) - z) * a + z, b = (g(t, o) - b) * x + b, q = (1 * m + 2 * M + 3 * z + 4 * b) / 10, n.push(q), w = .2 * (q - w) + w, f.push(w); return [n, f]; })); }
            mama() { return n(this, void 0, void 0, (function* () { })); }
            pbands(t, e, s, i, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = []; let u = 0, h = 0; const l = i * (i + 1) / 2, d = i * (i + 1) * (2 * i + 1) / 6; let f; for (f = 0; f < i; ++f)
                h += s[f] * (f + 1), u += s[f]; --f; const c = (h / i - l / i * u / i) / (d / i - l / i * (l / i)); let v = t[f]; for (let e = 1; e < i; ++e)
                v < t[f - e] + e * c && (v = t[f - e] + e * c); let p = e[f]; for (let t = 1; t < i; ++t)
                p > e[f - t] + t * c && (p = e[f - t] + t * c); for (r.push(v), n.push(p), ++f; f < o; ++f) {
                h += -u + s[f] * i, u += -s[f - i] + s[f];
                const o = (h / i - l / i * u / i) / (d / i - l / i * (l / i));
                let c = t[f];
                for (let e = 1; e < i; ++e)
                    c < t[f - e] + e * o && (c = t[f - e] + e * o);
                let v = e[f];
                for (let t = 1; t < i; ++t)
                    v > e[f - t] + t * o && (v = e[f - t] + t * o);
                n.push(v), r.push(c);
            } return [n, r]; })); }
            pc() { return n(this, void 0, void 0, (function* () { })); }
            pfe(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 2 / (s + 1), r = { size: e, index: 0, pushes: 0, sum: 0, vals: [] }; let u; for (u = 1; u < e; ++u)
                r.pushes >= r.size && (r.sum -= r.vals[r.index]), r.sum += Math.sqrt(Math.pow(t[u] - t[u - 1], 2) + 1), r.vals[r.index] = Math.sqrt(Math.pow(t[u] - t[u - 1], 2) + 1), r.pushes += 1, r.index = r.index + 1, r.index >= r.size && (r.index = 0); r.pushes >= r.size && (r.sum -= r.vals[r.index]), r.sum += Math.sqrt(Math.pow(t[u] - t[u - 1], 2) + 1), r.vals[r.index] = Math.sqrt(Math.pow(t[u] - t[u - 1], 2) + 1), r.pushes += 1, r.index = r.index + 1, r.index >= r.size && (r.index = 0); let h = 100 * (t[u] - t[u - e] > 0 ? 1 : -1) * Math.sqrt(Math.pow(t[u] - t[u - e], 2) + 100) / r.sum; for (n.push(h), u = e + 1; u < i; ++u)
                r.pushes >= r.size && (r.sum -= r.vals[r.index]), r.sum += Math.sqrt(Math.pow(t[u] - t[u - 1], 2) + 1), r.vals[r.index] = Math.sqrt(Math.pow(t[u] - t[u - 1], 2) + 1), r.pushes += 1, r.index = r.index + 1, r.index >= r.size && (r.index = 0), h = (100 * (t[u] - t[u - e] > 0 ? 1 : -1) * Math.sqrt(Math.pow(t[u] - t[u - e], 2) + 100) / r.sum - h) * o + h, n.push(h); return n; })); }
            posc(t, e, s, i, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let u, h = 0, l = 0; const d = i * (i + 1) / 2, f = i * (i + 1) * (2 * i + 1) / 6; let c; for (c = 0; c < i; ++c)
                l += s[c] * (c + 1), h += s[c]; --c; const v = (l / i - d / i * h / i) / (f / i - d / i * (d / i)); let p = t[c]; for (let e = 1; e < i; ++e)
                p < t[c - e] + e * v && (p = t[c - e] + e * v); let a = e[c]; for (let t = 1; t < i; ++t)
                a > e[c - t] + t * v && (a = e[c - t] + t * v); for (u = (s[c] - a) / (p - a) * 100, n.push(u), ++c; c < r; ++c) {
                l += -h + s[c] * i, h += -s[c - i] + s[c];
                const r = (l / i - d / i * h / i) / (f / i - d / i * (d / i));
                let v = t[c];
                for (let e = 1; e < i; ++e)
                    v < t[c - e] + e * r && (v = t[c - e] + e * r);
                let p = e[c];
                for (let t = 1; t < i; ++t)
                    p > e[c - t] + t * r && (p = e[c - t] + t * r);
                u = 2 * ((s[c] - p) / (v - p) * 100 - u) / (1 + o) + u, n.push(u);
            } return n; })); }
            rmi(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o, r, u = s; for (o = 0 > t[u] - t[u - s] ? 0 : t[u] - t[u - s], r = 0 > t[u - s] - t[u] ? 0 : t[u - s] - t[u], ++u, n.push(o / (o + r) * 100); u < i; ++u)
                o = 2 * (0 > t[u] - t[u - s] ? 0 : t[u] - t[u - s] - o) / (1 + e) + o, r = 2 * (0 > t[u - s] - t[u] ? 0 : t[u - s] - t[u] - r) / (1 + e) + r, n.push(o / (o + r) * 100); return n; })); }
            rmta(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 - s; let r = (1 - o) * t[0] + t[0], u = (1 - o) * t[0] + o * (t[0] + r); for (let s = 1; s < e - 1; ++s) {
                const e = (1 - o) * r + t[s];
                u = (1 - o) * u + o * (t[s] + e - r), r = e;
            } for (let s = e - 1; s < i; ++s) {
                const e = (1 - o) * r + t[s];
                u = (1 - o) * u + o * (t[s] + e - r), r = e, n.push(u);
            } return n; })); }
            rvi(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 0, r = 0; const u = s * (s + 1) / 2, h = s * (s + 1) * (2 * s + 1) / 6; let l = 0, d = 0, f = 0; for (; f < s; ++f)
                r += t[f] * (f + 1), o += t[f]; --f; const c = (r / s - u / s * o / s) / (h / s - u / s * (u / s)), v = o / s - c * u / s, p = t[f] - (v + c * s); for (p > 0 ? l = p * p / s : d = p * p / s, l + d == 0 ? n.push(50) : n.push(l / (l + d) * 100), ++f; f < i; ++f) {
                r += -o + t[f] * s, o += -t[f - s] + t[f];
                const i = (r / s - u / s * o / s) / (h / s - u / s * (u / s)), c = o / s - i * u / s, v = t[f] - (c + i * s);
                v > 0 ? l = 2 * (v * v / s - l) / (e + 1) + l : d = 2 * (v * v / s - d) / (e + 1) + d, l + d == 0 ? n.push(50) : n.push(l / (l + d) * 100);
            } return n; })); }
            smi(t, e, s, i, o, r, u = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let h = 1 - i, l = NaN, d = NaN, f = NaN, c = NaN, v = 0, p = 0, a = 0, x = 0, g = 0, m = 0; for (; m < u && h == 1 - i; ++m, ++h)
                p = t[m], a = h, v = e[m], x = h; for (; m < u && h < 0; ++m, ++h)
                p <= t[m] && (p = t[m], a = h), v >= e[m] && (v = e[m], x = h); for (; m < u && 0 == h; ++m, ++h)
                p <= t[m] && (p = t[m], a = h), v >= e[m] && (v = e[m], x = h), l = d = s[m] - .5 * (p + v), f = c = p - v, n.push(100 * d / (.5 * c)); for (; m < u; ++m, ++h) {
                if (a == h - i) {
                    p = t[m], a = h;
                    for (let e = 1; e < i; ++e)
                        g = t[m - e], g > p && (p = g, a = h - e);
                }
                else
                    p <= t[m] && (p = t[m], a = h);
                if (x == h - i) {
                    v = e[m], x = h;
                    for (let t = 1; t < i; ++t)
                        g = e[m - t], g < v && (v = g, x = h - t);
                }
                else
                    v >= e[m] && (v = e[m], x = h);
                l = (s[m] - .5 * (p + v) - l) * (2 / (1 + o)) + l, d = 2 / (1 + r) * (l - d) + d, f = 2 / (1 + o) * (p - v - f) + f, c = 2 / (1 + r) * (f - c) + c, n.push(100 * d / (.5 * c));
            } return n; })); }
            tsi(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = -1, r = 0, u = 0, h = 0, l = 0, d = 0, f = 0; for (; f < i && -1 == o; ++f, ++o)
                r = t[f]; for (; f < i && 0 == o; ++f, ++o)
                h = u = t[f] - r, d = l = Math.abs(t[f] - r), n.push(100 * (d ? h / d : 0)), r = t[f]; for (; f < i; ++f, ++o)
                u = 2 * (t[f] - r - u) / (1 + e) + u, l = 2 * (Math.abs(t[f] - r) - l) / (1 + e) + l, h = 2 * (u - h) / (1 + s) + h, d = 2 * (l - d) / (1 + s) + d, n.push(100 * (d ? h / d : 0)), r = t[f]; return n; })); }
            vwap(t, e, s, i, o, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let u = 1 - o, h = 0, l = 0, d = 0; for (; d < r && u < 1; ++d, ++u)
                h += (t[d] + e[d] + s[d]) / 3 * i[d], l += i[d]; for (d > 0 && 1 == u && n.push(h / l); d < r; ++d, ++u)
                h += (t[d] + e[d] + s[d]) / 3 * i[d] - (t[d - o] + e[d - o] + s[d - o]) / 3 * i[d - o], l += i[d] - i[d - o], n.push(h / l); return n; })); }
        }; }, 409: (t, e) => { Object.defineProperty(e, "__esModule", { value: !0 }), e.ti_buffer = void 0; class s {
            constructor(t) { this.size = t, this.pushes = 0, this.index = 0, this.sum = 0, this.vals = []; }
            static new(t) { return new s(t); }
            push(t) { this.pushes >= this.size && (this.sum -= this.vals[this.index]), this.sum += t, this.vals[this.index] = t, this.pushes += 1, this.index = (this.index + 1) % this.size; }
            qpush(t) { this.vals[this.index] = t, this.index = (this.index + 1) % this.size; }
            get(t) { return this.vals[(this.index + this.size - 1 + t) % this.size]; }
        } e.ti_buffer = s; } }, e = {};
    return function s(n) { var i = e[n]; if (void 0 !== i)
        return i.exports; var o = e[n] = { exports: {} }; return t[n].call(o.exports, o, o.exports, s), o.exports; }(104);
})()));
