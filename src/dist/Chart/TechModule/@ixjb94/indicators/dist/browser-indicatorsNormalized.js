"use strict";
!function (t, e) { "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.indicators = e() : t.indicators = e(); }(self, (() => (() => {
    "use strict";
    var t = { 830: function (t, e, s) { var n = this && this.__awaiter || function (t, e, s, n) { return new (s || (s = Promise))((function (o, i) { function r(t) { try {
            h(n.next(t));
        }
        catch (t) {
            i(t);
        } } function u(t) { try {
            h(n.throw(t));
        }
        catch (t) {
            i(t);
        } } function h(t) { var e; t.done ? o(t.value) : (e = t.value, e instanceof s ? e : new s((function (t) { t(e); }))).then(r, u); } h((n = n.apply(t, e || [])).next()); })); }; Object.defineProperty(e, "__esModule", { value: !0 }), e.IndicatorsNormalized = void 0; const o = s(409); e.IndicatorsNormalized = class {
            constructor() { }
            normalize(t, e, s = NaN) { return n(this, void 0, void 0, (function* () { const n = t - e.length, o = []; for (let t = 0; t < n; ++t)
                o.push(s); return [...o, ...e]; })); }
            floor(t) { return t < 0 ? ~~t - 1 : ~~t; }
            sqrt(t, e = t / 2) { const s = (e + t / e) / 2; return (e > s ? e - s : s - e) < 1e-7 ? s : this.sqrt(t, s); }
            ad(t, e, s, o, i = s.length) { return n(this, void 0, void 0, (function* () { const n = []; let r = 0; for (let u = 0; u < i; ++u) {
                const i = t[u] - e[u];
                0 != i && (r += (s[u] - e[u] - t[u] + s[u]) / i * o[u]), n[u] = r;
            } return n; })); }
            adosc(t, e, s, o, i, r, u = s.length) { return n(this, void 0, void 0, (function* () { const n = r - 1, h = 2 / (i + 1), l = 2 / (r + 1), d = []; d[r - 2] = NaN; let c = 0, a = 0, f = 0; for (let i = 0; i < u; ++i) {
                const r = t[i] - e[i];
                0 != r && (c += (s[i] - e[i] - t[i] + s[i]) / r * o[i]), 0 == i ? (a = c, f = c) : (a = (c - a) * h + a, f = (c - f) * l + f), i >= n && d.push(a - f);
            } return d; })); }
            adx(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[2 * (s - 2) + 1] = NaN; const i = (s - 1) / s, r = 1 / s; let u = 0, h = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), u += s, h += o;
            } let l = 0, d = u, c = h, a = Math.abs(d - c), f = d + c, v = a / f * 100; l += v; for (let p = s; p < o; ++p) {
                let o = t[p] - t[p - 1], N = e[p - 1] - e[p];
                o < 0 ? o = 0 : o > N && (N = 0), N < 0 ? N = 0 : N > o && (o = 0), u = u * i + o, h = h * i + N, d = u, c = h, a = Math.abs(d - c), f = d + c, v = a / f * 100, p - s < s - 2 ? l += v : p - s == s - 2 ? (l += v, n.push(l * r)) : (l = l * i + v, n.push(l * r));
            } return n; })); }
            adxr(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[3 * (s - 1) - 1] = NaN; const i = (s - 1) / s, r = 1 / s; let u = 0, h = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), u += s, h += o;
            } let l = 0, d = u, c = h, a = Math.abs(d - c), f = d + c, v = a / f * 100; l += v; const p = { size: s - 1, pushes: 0, index: 0, vals: [] }, N = 3 * (s - 1); for (let x = s; x < o; ++x) {
                let o = t[x] - t[x - 1], g = e[x - 1] - e[x];
                if (o < 0 ? o = 0 : o > g && (g = 0), g < 0 ? g = 0 : g > o && (o = 0), u = u * i + o, h = h * i + g, d = u, c = h, a = Math.abs(d - c), f = d + c, v = a / f * 100, x - s < s - 2)
                    l += v;
                else if (x - s == s - 2)
                    l += v, p.vals[p.index] = l * r, p.index = p.index + 1, p.index >= p.size && (p.index = 0);
                else {
                    if (l = l * i + v, x >= N) {
                        const t = p.vals[p.index] + (p.size - 1 + 1) % p.size;
                        n.push(.5 * (l * r + t));
                    }
                    p.vals[p.index] = l * r, p.index = p.index + 1, p.index >= p.size && (p.index = 0);
                }
            } return n; })); }
            ao(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[32] = NaN; let o = 0, i = 0; const r = 1 / 34; for (let s = 0; s < 34; ++s) {
                const n = .5 * (t[s] + e[s]);
                o += n, s >= 29 && (i += n);
            } n.push(.2 * i - r * o); for (let u = 34; u < s; ++u) {
                const s = .5 * (t[u] + e[u]);
                o += s, i += s, o -= .5 * (t[u - 34] + e[u - 34]), i -= .5 * (t[u - 5] + e[u - 5]), n.push(.2 * i - r * o);
            } return n; })); }
            apo(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[0] = NaN; const i = 2 / (e + 1), r = 2 / (s + 1); let u = t[0], h = t[0]; for (let e = 1; e < o; ++e) {
                u = (t[e] - u) * i + u, h = (t[e] - h) * r + h;
                const s = u - h;
                n.push(s);
            } return n; })); }
            aroon(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = []; n[s - 1] = NaN, i[s - 1] = NaN; const r = 100 / s; let u, h, l = 0, d = -1, c = -1, a = t[0], f = e[0]; for (let v = s; v < o; ++v, ++l) {
                if (u = t[v], d < l)
                    for (d = l, a = t[d], h = l; ++h <= v;)
                        u = t[h], u >= a && (a = u, d = h);
                else
                    u >= a && (d = v, a = u);
                if (u = e[v], c < l)
                    for (c = l, f = e[c], h = l; ++h <= v;)
                        u = e[h], u <= f && (f = u, c = h);
                else
                    u <= f && (c = v, f = u);
                n[n.length] = (s - (v - c)) * r, i[i.length] = (s - (v - d)) * r;
            } return [n, i]; })); }
            aroonosc(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[s - 1] = NaN; const i = 100 / s; let r, u = 0, h = -1, l = -1, d = t[0], c = e[0]; for (let a = s; a < o; ++a, ++u) {
                let s = t[a];
                if (h < u)
                    for (h = u, d = t[h], r = u; ++r <= a;)
                        s = t[r], s >= d && (d = s, h = r);
                else
                    s >= d && (h = a, d = s);
                if (s = e[a], l < u)
                    for (l = u, c = e[l], r = u; ++r <= a;)
                        s = e[r], s <= c && (c = s, l = r);
                else
                    s <= c && (l = a, c = s);
                n.push((h - l) * i);
            } return n; })); }
            atr(t, e, s, o, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[o - 2] = NaN; const r = 1 / o; let u, h = 0; h += t[0] - e[0]; for (let n = 1; n < o; ++n) {
                const o = e[n], i = t[n], r = s[n - 1], l = Math.abs(i - r), d = Math.abs(o - r);
                let c = i - o;
                l > c && (c = l), d > c && (c = d), u = c, h += u;
            } let l = h / o; n.push(l); for (let h = o; h < i; ++h) {
                const o = e[h], i = t[h], d = s[h - 1], c = Math.abs(i - d), a = Math.abs(o - d);
                let f = i - o;
                c > f && (f = c), a > f && (f = a), u = f, l = (u - l) * r + l, n.push(l);
            } return n; })); }
            avgprice(t, e, s, o, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let r = 0; r < i; ++r)
                n.push(.25 * (t[r] + e[r] + s[r] + o[r])); return n; })); }
            bbands(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = [], r = []; n[e - 2] = NaN, i[e - 2] = NaN, r[e - 2] = NaN; const u = 1 / e; let h = 0, l = 0; for (let s = 0; s < e; ++s)
                h += t[s], l += t[s] * t[s]; let d = Math.sqrt(l * u - h * u * (h * u)); const c = h * u; n.push(c - s * d), r.push(c + s * d), i.push(c); for (let c = e; c < o; ++c) {
                h += t[c], l += t[c] * t[c], h -= t[c - e], l -= t[c - e] * t[c - e], d = Math.sqrt(l * u - h * u * (h * u));
                const o = h * u;
                r.push(o + s * d), n.push(o - s * d), i.push(o);
            } return [n, i, r]; })); }
            bop(t, e, s, o, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let r = 0; r < i; ++r) {
                const i = e[r] - s[r];
                n[r] = i <= 0 ? 0 : (o[r] - t[r]) / i;
            } return n; })); }
            cci(t, e, s, i, r = t.length) { return n(this, void 0, void 0, (function* () { const n = 1 / i, u = []; u[2 * (i - 2) + 1] = NaN; const h = new o.ti_buffer(i); let l, d; for (l = 0; l < r; ++l) {
                const o = (t[l] + e[l] + s[l]) * (1 / 3);
                h.push(o);
                const r = h.sum * n;
                if (l >= 2 * i - 2) {
                    let t = 0;
                    for (d = 0; d < i; ++d)
                        t += Math.abs(r - h.vals[d]);
                    let e = t * n;
                    e *= .015, e = (o - r) / e, u.push(e);
                }
            } return u; })); }
            cmo(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; let o = 0, i = 0; for (let s = 1; s <= e; ++s)
                o += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, i += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; n.push(100 * (o - i) / (o + i)); for (let r = e + 1; r < s; ++r)
                o -= t[r - e] > t[r - e - 1] ? t[r - e] - t[r - e - 1] : 0, i -= t[r - e] < t[r - e - 1] ? t[r - e - 1] - t[r - e] : 0, o += t[r] > t[r - 1] ? t[r] - t[r - 1] : 0, i += t[r] < t[r - 1] ? t[r - 1] - t[r] : 0, n.push(100 * (o - i) / (o + i)); return n; })); }
            crossany(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = 0; o < s; ++o)
                n.push(t[o] > e[o] && t[o - 1] <= e[o - 1] || t[o] < e[o] && t[o - 1] >= e[o - 1]); return n; })); }
            crossover(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = 0; o < s; ++o)
                n.push(t[o] > e[o] && t[o - 1] <= e[o - 1]); return n; })); }
            crossOverNumber(t, e) { const s = []; for (let n = 0; n < t.length; n++) {
                const o = t[n], i = t[n - 1];
                o > e && i <= e ? s.push(!0) : s.push(!1);
            } return s; }
            crossUnderNumber(t, e) { const s = []; for (let n = 0; n < t.length; n++) {
                const o = t[n], i = t[n - 1];
                o < e && i >= e ? s.push(!0) : s.push(!1);
            } return s; }
            cvi(t, e, s, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[2 * (s - 1)] = NaN; const r = 2 / (s + 1), u = new o.ti_buffer(s); let h, l = t[0] - e[0]; for (h = 1; h < 2 * s - 1; ++h)
                l = (t[h] - e[h] - l) * r + l, u.qpush(l); for (h = 2 * s - 1; h < i; ++h) {
                l = (t[h] - e[h] - l) * r + l;
                const s = u.vals[u.index];
                n.push(100 * (l - s) / s), u.qpush(l);
            } return n; })); }
            decay(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 / e; n.push(t[0]); for (let e = 1; e < s; ++e) {
                const s = n[n.length - 1] - o;
                n.push(t[e] > s ? t[e] : s);
            } return n; })); }
            dema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[2 * (e - 1) - 1] = NaN; const o = 2 / (e + 1), i = 1 - o; let r = t[0], u = r; for (let h = 0; h < s; ++h)
                r = r * i + t[h] * o, h == e - 1 && (u = r), h >= e - 1 && (u = u * i + r * o, h >= 2 * (e - 1) && n.push(2 * r - u)); return n; })); }
            di(t, e, s, o, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = []; n[o - 2] = NaN, r[o - 2] = NaN; const u = (o - 1) / o; let h = 0, l = 0, d = 0; for (let n = 1; n < o; ++n) {
                const o = e[n], i = t[n], r = s[n - 1], u = Math.abs(i - r), c = Math.abs(o - r);
                let a = i - o;
                u > a && (a = u), c > a && (a = c), h += a;
                let f = t[n] - t[n - 1], v = e[n - 1] - e[n];
                f < 0 ? f = 0 : f > v && (v = 0), v < 0 ? v = 0 : v > f && (f = 0), l += f, d += v;
            } n.push(100 * l / h), r.push(100 * d / h); for (let c = o; c < i; ++c) {
                const o = e[c], i = t[c], a = s[c - 1], f = Math.abs(i - a), v = Math.abs(o - a);
                let p = i - o;
                f > p && (p = f), v > p && (p = v), h = h * u + p;
                let N = t[c] - t[c - 1], x = e[c - 1] - e[c];
                N < 0 ? N = 0 : N > x && (x = 0), x < 0 ? x = 0 : x > N && (N = 0), l = l * u + N, d = d * u + x, n.push(100 * l / h), r.push(100 * d / h);
            } return [n, r]; })); }
            dm(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = []; n[s - 2] = NaN, i[s - 2] = NaN; const r = (s - 1) / s; let u = 0, h = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), u += s, h += o;
            } n.push(u), i.push(h); for (let l = s; l < o; ++l) {
                let s = t[l] - t[l - 1], o = e[l - 1] - e[l];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), u = u * r + s, h = h * r + o, n.push(u), i.push(h);
            } return [n, i]; })); }
            dpo(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = e / 2 + 1, o = []; o[e - 2] = NaN; const i = 1 / e; let r = 0; for (let s = 0; s < e; ++s)
                r += t[s]; o.push(t[e - 1 - n] - r * i); for (let u = e; u < s; ++u)
                r += t[u], r -= t[u - e], o.push(t[u - n] - r * i); return o; })); }
            dx(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[s - 2] = NaN; const i = (s - 1) / s; let r = 0, u = 0; for (let n = 1; n < s; ++n) {
                let s = t[n] - t[n - 1], o = e[n - 1] - e[n];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), r += s, u += o;
            } let h = r, l = u, d = Math.abs(h - l), c = h + l, a = d / c * 100; n.push(a); for (let f = s; f < o; ++f) {
                let s = t[f] - t[f - 1], o = e[f - 1] - e[f];
                s < 0 ? s = 0 : s > o && (o = 0), o < 0 ? o = 0 : o > s && (s = 0), r = r * i + s, u = u * i + o, h = r, l = u, d = Math.abs(h - l), c = h + l, a = d / c * 100, n.push(a);
            } return n; })); }
            edecay(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 1 - 1 / e; n.push(t[0]); for (let e = 1; e < s; ++e) {
                const s = n[n.length - 1] * o;
                n.push(t[e] > s ? t[e] : s);
            } return n; })); }
            ema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = 2 / (e + 1); let i = t[0]; n.push(i); for (let e = 1; e < s; ++e)
                i = (t[e] - i) * o + i, n.push(i); return n; })); }
            emv(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[0] = NaN; let i = .5 * (t[0] + e[0]); for (let r = 1; r < o; ++r) {
                const o = .5 * (t[r] + e[r]), u = s[r] / 1e4 / (t[r] - e[r]);
                n.push((o - i) / u), i = o;
            } return n; })); }
            fisher(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = []; n[s - 2] = NaN, i[s - 2] = NaN; let r, u, h = 0, l = -1, d = -1, c = .5 * (t[0] + e[0]), a = .5 * (t[0] + e[0]), f = 0, v = 0; for (let p = s - 1; p < o; ++p, ++h) {
                if (r = .5 * (t[p] + e[p]), l < h)
                    for (l = h, c = .5 * (t[l] + e[l]), u = h; ++u <= p;)
                        r = .5 * (t[u] + e[u]), r >= c && (c = r, l = u);
                else
                    r >= c && (l = p, c = r);
                if (r = .5 * (t[p] + e[p]), d < h)
                    for (d = h, a = .5 * (t[d] + e[d]), u = h; ++u <= p;)
                        r = .5 * (t[u] + e[u]), r <= a && (a = r, d = u);
                else
                    r <= a && (d = p, a = r);
                let s = c - a;
                0 == s && (s = .001), f = .66 * ((.5 * (t[p] + e[p]) - a) / s - .5) + .67 * f, f > .99 && (f = .999), f < -.99 && (f = -.999), i.push(v), v = .5 * Math.log((1 + f) / (1 - f)) + .5 * v, n.push(v);
            } return [n, i]; })); }
            fosc(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; let o = 0, i = 0, r = 0, u = 0; const h = 1 / e; let l = 0; for (let s = 0; s < e - 1; ++s)
                o += s + 1, i += (s + 1) * (s + 1), u += t[s] * (s + 1), r += t[s]; o += e, i += e * e; const d = 1 / (e * i - o * o); for (let i = e - 1; i < s; ++i) {
                u += t[i] * e, r += t[i];
                const s = (e * u - o * r) * d, c = (r - s * o) * h;
                i >= e && n.push(100 * (t[i] - l) / t[i]), l = c + s * (e + 1), u -= r, r -= t[i - e + 1];
            } return n; })); }
            hma(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], i = Math.floor(e / 2), r = Math.floor(Math.sqrt(e)), u = e * (e + 1) / 2, h = i * (i + 1) / 2, l = r * (r + 1) / 2; n[e - 1 + r - 2] = NaN; let d, c = 0, a = 0, f = 0, v = 0, p = 0, N = 0; for (d = 0; d < e - 1; ++d)
                a += t[d] * (d + 1), c += t[d], d >= e - i && (v += t[d] * (d + 1 - (e - i)), f += t[d]); const x = new o.ti_buffer(r); for (d = e - 1; d < s; ++d) {
                a += t[d] * e, c += t[d], v += t[d] * i, f += t[d];
                const s = v / h * 2 - a / u;
                N += s * r, p += s, x.qpush(s), d >= e - 1 + (r - 1) ? (n.push(N / l), N -= p, p -= x.get(1)) : N -= p, a -= c, c -= t[d - e + 1], v -= f, f -= t[d - i + 1];
            } return n; })); }
            kama(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o = 0; for (let s = 1; s < e; ++s)
                o += Math.abs(t[s] - t[s - 1]); let i, r, u = t[e - 1]; n.push(u); for (let h = e; h < s; ++h)
                o += Math.abs(t[h] - t[h - 1]), h > e && (o -= Math.abs(t[h - e] - t[h - e - 1])), i = 0 != o ? Math.abs(t[h] - t[h - e]) / o : 1, r = Math.pow(.6021505376344085 * i + .06451612903225806, 2), u += r * (t[h] - u), n.push(u); return n; })); }
            kvo(t, e, s, o, i, r, u = t.length) { return n(this, void 0, void 0, (function* () { const n = 2 / (i + 1), h = 2 / (r + 1), l = []; l[0] = NaN; let d = 0, c = t[0] + e[0] + s[0], a = -1, f = 0, v = 0; for (let i = 1; i < u; ++i) {
                const r = t[i] + e[i] + s[i], u = t[i] - e[i];
                r > c && 1 != a ? (a = 1, d = t[i - 1] - e[i - 1]) : r < c && 0 != a && (a = 0, d = t[i - 1] - e[i - 1]), d += u;
                const p = o[i] * Math.abs(u / d * 2 - 1) * 100 * (a ? 1 : -1);
                1 == i ? (f = p, v = p) : (f = (p - f) * n + f, v = (p - v) * h + v), l.push(f - v), c = r;
            } return l; })); }
            lag(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; for (let o = e; o < s; ++o)
                n.push(t[o - e]); return n; })); }
            linreg(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o = 0, i = 0, r = 0, u = 0; const h = 1 / e; for (let s = 0; s < e - 1; ++s)
                o += s + 1, i += (s + 1) * (s + 1), u += t[s] * (s + 1), r += t[s]; o += e, i += e * e; const l = 1 / (e * i - o * o); for (let i = e - 1; i < s; ++i) {
                u += t[i] * e, r += t[i];
                const s = (e * u - o * r) * l, d = (r - s * o) * h;
                n.push(d + s * e), u -= r, r -= t[i - e + 1];
            } return n; })); }
            linregintercept(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o = 0, i = 0, r = 0, u = 0; const h = 1 / e; for (let s = 0; s < e - 1; ++s)
                o += s + 1, i += (s + 1) * (s + 1), u += t[s] * (s + 1), r += t[s]; o += e, i += e * e; const l = 1 / (e * i - o * o); for (let i = e - 1; i < s; ++i) {
                u += t[i] * e, r += t[i];
                const s = (e * u - o * r) * l, d = (r - s * o) * h;
                n.push(d + 1 * s), u -= r, r -= t[i - e + 1];
            } return n; })); }
            linregslope(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o = 0, i = 0, r = 0, u = 0; for (let s = 0; s < e - 1; ++s)
                o += s + 1, i += (s + 1) * (s + 1), u += t[s] * (s + 1), r += t[s]; o += e, i += e * e; const h = 1 / (e * i - o * o); for (let i = e - 1; i < s; ++i) {
                u += t[i] * e, r += t[i];
                const s = (e * u - o * r) * h;
                n.push(s), u -= r, r -= t[i - e + 1];
            } return n; })); }
            macd(t, e, s, o, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = [], u = []; n[s - 2] = NaN, r[s - 2] = NaN, u[s - 2] = NaN; const h = 2 / (e + 1), l = 2 / (s + 1), d = 2 / (o + 1); let c = t[0], a = t[0], f = 0; for (let e = 1; e < i; ++e) {
                c = (t[e] - c) * h + c, a = (t[e] - a) * l + a;
                const o = c - a;
                e == s - 1 && (f = o), e >= s - 1 && (f = (o - f) * d + f, n.push(o), r.push(f), u.push(o - f));
            } return [n, r, u]; })); }
            marketfi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let i = 0; i < o; ++i)
                n.push((t[i] - e[i]) / s[i]); return n; })); }
            mass(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[16 + s - 2] = NaN; let i = t[0] - e[0], r = i; const u = { index: 0, pushes: 0, size: s, sum: 0, vals: [] }; for (let h = 0; h < o; ++h)
                i = .8 * i + .2 * (t[h] - e[h]), 8 == h && (r = i), h >= 8 && (r = .8 * r + .2 * i, h >= 16 && (u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += i / r, u.vals[u.index] = i / r, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), h >= 16 + s - 1 && n.push(u.sum))); return n; })); }
            max(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o, i = 0, r = -1, u = t[0]; for (let h = e - 1; h < s; ++h, ++i) {
                let e = t[h];
                if (r < i)
                    for (r = i, u = t[r], o = i; ++o <= h;)
                        e = t[o], e >= u && (u = e, r = o);
                else
                    e >= u && (r = h, u = e);
                n.push(u);
            } return n; })); }
            md(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = 1 / e; let i, r = 0; for (let u = 0; u < s; ++u) {
                r += t[u], u >= e && (r -= t[u - e]);
                const s = r * o;
                if (u >= e - 1) {
                    let r = 0;
                    for (i = 0; i < e; ++i)
                        r += Math.abs(s - t[u - i]);
                    n.push(r * o);
                }
            } return n; })); }
            medprice(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let o = 0; o < s; ++o)
                n.push(.5 * (t[o] + e[o])); return n; })); }
            mfi(t, e, s, o, i, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[i - 1] = NaN; let u = (t[0] + e[0] + s[0]) * (1 / 3); const h = { size: i, index: 0, pushes: 0, sum: 0, vals: [] }, l = { size: i, index: 0, pushes: 0, sum: 0, vals: [] }; for (let d = 1; d < r; ++d) {
                const r = (t[d] + e[d] + s[d]) * (1 / 3), c = r * o[d];
                r > u ? (h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += c, h.vals[h.index] = c, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0), l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += 0, l.vals[l.index] = 0, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0)) : r < u ? (l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += c, l.vals[l.index] = c, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0), h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += 0, h.vals[h.index] = 0, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0)) : (h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += 0, h.vals[h.index] = 0, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0), l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += 0, l.vals[l.index] = 0, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0)), u = r, d >= i && n.push(h.sum / (h.sum + l.sum) * 100);
            } return n; })); }
            min(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o, i = 0, r = -1, u = t[0]; for (let h = e - 1; h < s; ++h, ++i) {
                let e = t[h];
                if (r < i)
                    for (r = i, u = t[r], o = i; ++o <= h;)
                        e = t[o], e <= u && (u = e, r = o);
                else
                    e <= u && (r = h, u = e);
                n.push(u);
            } return n; })); }
            mom(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; for (let o = e; o < s; ++o)
                n.push(t[o] - t[o - e]); return n; })); }
            msw(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = [], o = []; n[e - 1] = NaN, o[e - 1] = NaN; const i = 3.1415926, r = 2 * i; let u, h, l, d, c = 0; for (let a = e; a < s; ++a) {
                for (h = 0, l = 0, d = 0; d < e; ++d)
                    c = t[a - d], h += Math.cos(r * d / e) * c, l += Math.sin(r * d / e) * c;
                u = Math.abs(h) > .001 ? Math.atan(l / h) : r / 2 * (l < 0 ? -1 : 1), h < 0 && (u += i), u += i / 2, u < 0 && (u += r), u > r && (u -= r), n.push(Math.sin(u)), o.push(Math.sin(u + i / 4));
            } return [n, o]; })); }
            natr(t, e, s, o, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[o - 2] = NaN; const r = 1 / o; let u, h = 0; h += t[0] - e[0]; for (let n = 1; n < o; ++n) {
                const o = e[n], i = t[n], r = s[n - 1], l = Math.abs(i - r), d = Math.abs(o - r);
                let c = i - o;
                l > c && (c = l), d > c && (c = d), u = c, h += u;
            } let l = h / o; n.push(100 * l / s[o - 1]); for (let h = o; h < i; ++h) {
                const o = e[h], i = t[h], d = s[h - 1], c = Math.abs(i - d), a = Math.abs(o - d);
                let f = i - o;
                c > f && (f = c), a > f && (f = a), u = f, l = (u - l) * r + l, n.push(100 * l / s[h]);
            } return n; })); }
            nvi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 1e3; n.push(o); for (let i = 1; i < s; ++i)
                e[i] < e[i - 1] && (o += (t[i] - t[i - 1]) / t[i - 1] * o), n.push(o); return n; })); }
            obv(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 0; n.push(o); let i = t[0]; for (let r = 1; r < s; ++r)
                t[r] > i ? o += e[r] : t[r] < i && (o -= e[r]), i = t[r], n.push(o); return n; })); }
            ppo(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[0] = NaN; const i = 2 / (e + 1), r = 2 / (s + 1); let u = t[0], h = t[0]; for (let e = 1; e < o; ++e) {
                u = (t[e] - u) * i + u, h = (t[e] - h) * r + h;
                const s = 100 * (u - h) / h;
                n.push(s);
            } return n; })); }
            psar(t, e, s, o, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let r, u, h; n[0] = NaN, r = t[0] + e[0] <= t[1] + e[1] ? 1 : 0, r ? (h = t[0], u = e[0]) : (h = e[0], u = t[0]); let l = s; for (let d = 1; d < i; ++d)
                u = (h - u) * l + u, r ? (d >= 2 && u > e[d - 2] && (u = e[d - 2]), u > e[d - 1] && (u = e[d - 1]), l < o && t[d] > h && (l += s, l > o && (l = o)), t[d] > h && (h = t[d])) : (d >= 2 && u < t[d - 2] && (u = t[d - 2]), u < t[d - 1] && (u = t[d - 1]), l < o && e[d] < h && (l += s, l > o && (l = o)), e[d] < h && (h = e[d])), (r && e[d] < u || !r && t[d] > u) && (l = s, u = h, r = !r, h = r ? t[d] : e[d]), n.push(u); return n; })); }
            pvi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let o = 1e3; n.push(o); for (let i = 1; i < s; ++i)
                e[i] > e[i - 1] && (o += (t[i] - t[i - 1]) / t[i - 1] * o), n.push(o); return n; })); }
            qstick(t, e, s, o = e.length) { return n(this, void 0, void 0, (function* () { const n = []; n[s - 1] = NaN; const i = 1 / s; let r, u = 0; for (r = 0; r < s; ++r)
                u += e[r] - t[r]; for (n.push(u * i), r = s; r < o; ++r)
                u += e[r] - t[r], u -= e[r - s] - t[r - s], n.push(u * i); return n; })); }
            roc(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; for (let o = e; o < s; ++o)
                n.push((t[o] - t[o - e]) / t[o - e]); return n; })); }
            rocr(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; for (let o = e; o < s; ++o)
                n.push(t[o] / t[o - e]); return n; })); }
            rsi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; const o = 1 / e; let i = 0, r = 0; for (let s = 1; s <= e; ++s)
                i += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, r += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; i /= e, r /= e, n.push(i / (i + r) * 100); for (let u = e + 1; u < s; ++u)
                i = ((t[u] > t[u - 1] ? t[u] - t[u - 1] : 0) - i) * o + i, r = ((t[u] < t[u - 1] ? t[u - 1] - t[u] : 0) - r) * o + r, n.push(i / (i + r) * 100); return n; })); }
            sma(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = 1 / e; let i = 0; for (let s = 0; s < e; ++s)
                i += t[s]; n.push(i * o); for (let r = e; r < s; ++r)
                i += t[r], i -= t[r - e], n.push(i * o); return n; })); }
            stddev(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = 1 / e; let i = 0, r = 0; for (let s = 0; s < e; ++s)
                i += t[s], r += t[s] * t[s]; let u = r * o - i * o * (i * o); u > 0 && (u = Math.sqrt(u)), n.push(u); for (let u = e; u < s; ++u) {
                i += t[u], r += t[u] * t[u], i -= t[u - e], r -= t[u - e] * t[u - e];
                let s = r * o - i * o * (i * o);
                s > 0 && (s = Math.sqrt(s)), n.push(s);
            } return n; })); }
            stderr(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = 1 / e; let i = 0, r = 0; const u = 1 / Math.sqrt(e); for (let s = 0; s < e; ++s)
                i += t[s], r += t[s] * t[s]; let h = r * o - i * o * (i * o); h > 0 && (h = Math.sqrt(h)), n.push(u * h); for (let h = e; h < s; ++h) {
                i += t[h], r += t[h] * t[h], i -= t[h - e], r -= t[h - e] * t[h - e];
                let s = r * o - i * o * (i * o);
                s > 0 && (s = Math.sqrt(s)), n.push(u * s);
            } return n; })); }
            stoch(t, e, s, o, i, r, u = t.length) { return n(this, void 0, void 0, (function* () { const n = 1 / i, h = 1 / r, l = [], d = []; l[o + i + r - 3 - 1] = NaN, d[o + i + r - 3 - 1] = NaN; let c, a = 0, f = -1, v = -1, p = t[0], N = e[0]; const x = { size: i, index: 0, pushes: 0, sum: 0, vals: [] }, g = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }; let m; for (let M = 0; M < u; ++M) {
                if (M >= o && ++a, c = t[M], f < a)
                    for (f = a, p = t[f], m = a; ++m <= M;)
                        c = t[m], c >= p && (p = c, f = m);
                else
                    c >= p && (f = M, p = c);
                if (c = e[M], v < a)
                    for (v = a, N = e[v], m = a; ++m <= M;)
                        c = e[m], c <= N && (N = c, v = m);
                else
                    c <= N && (v = M, N = c);
                const u = p - N, z = 0 == u ? 0 : (s[M] - N) / u * 100;
                if (x.pushes >= x.size && (x.sum -= x.vals[x.index]), x.sum += z, x.vals[x.index] = z, x.pushes += 1, x.index = x.index + 1, x.index >= x.size && (x.index = 0), M >= o - 1 + i - 1) {
                    const t = x.sum * n;
                    g.pushes >= g.size && (g.sum -= g.vals[g.index]), g.sum += t, g.vals[g.index] = t, g.pushes += 1, g.index = g.index + 1, g.index >= g.size && (g.index = 0), M >= o - 1 + i - 1 + r - 1 && (l.push(t), d.push(g.sum * h));
                }
            } return [l, d]; })); }
            stochrsi(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[2 * e - 2] = NaN; const o = 1 / e, i = { size: e, index: 0, pushes: 0, sum: 0, vals: [] }; let r = 0, u = 0; for (let s = 1; s <= e; ++s)
                r += t[s] > t[s - 1] ? t[s] - t[s - 1] : 0, u += t[s] < t[s - 1] ? t[s - 1] - t[s] : 0; r /= e, u /= e; let h = r / (r + u) * 100; i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += h, i.vals[i.index] = h, i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0); let l = h, d = h, c = 0, a = 0; for (let f = e + 1; f < s; ++f) {
                if (r = ((t[f] > t[f - 1] ? t[f] - t[f - 1] : 0) - r) * o + r, u = ((t[f] < t[f - 1] ? t[f - 1] - t[f] : 0) - u) * o + u, h = r / (r + u) * 100, h > d)
                    d = h, a = i.index;
                else if (a == i.index) {
                    d = h;
                    for (let t = 0; t < i.size; ++t)
                        t != i.index && i.vals[t] > d && (d = i.vals[t], a = t);
                }
                if (h < l)
                    l = h, c = i.index;
                else if (c == i.index) {
                    l = h;
                    for (let t = 0; t < i.size; ++t)
                        t != i.index && i.vals[t] < l && (l = i.vals[t], c = t);
                }
                if (i.vals[i.index] = h, i.index = i.index + 1, i.index >= i.size && (i.index = 0), f > 2 * e - 2) {
                    const t = d - l;
                    0 == t ? n.push(0) : n.push((h - l) / t);
                }
            } return n; })); }
            sum(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o = 0; for (let s = 0; s < e; ++s)
                o += t[s]; n.push(o); for (let i = e; i < s; ++i)
                o += t[i], o -= t[i - e], n.push(o); return n; })); }
            tema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[3 * (e - 1) - 1] = NaN; const o = 2 / (e + 1), i = 1 - o; let r = t[0], u = 0, h = 0; for (let l = 0; l < s; ++l)
                r = r * i + t[l] * o, l == e - 1 && (u = r), l >= e - 1 && (u = u * i + r * o, l == 2 * (e - 1) && (h = u), l >= 2 * (e - 1) && (h = h * i + u * o, l >= 3 * (e - 1) && n.push(3 * r - 3 * u + h))); return n; })); }
            tr(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i; n[0] = t[0] - e[0]; for (let r = 1; r < o; ++r) {
                const o = e[r], u = t[r], h = s[r - 1], l = Math.abs(u - h), d = Math.abs(o - h);
                let c = u - o;
                l > c && (c = l), d > c && (c = d), i = c, n.push(i);
            } return n; })); }
            trima(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = 1 / (e % 2 ? (e / 2 + 1) * (e / 2 + 1) : e / 2 * (e / 2 + 1)); let i = 0, r = 0, u = 0; const h = e % 2 ? e / 2 : e / 2 - 1, l = h + 1; let d = 1; for (let s = 0; s < e - 1; ++s)
                i += t[s] * d, s + 1 > e - h && (r += t[s]), s + 1 <= l && (u += t[s]), s + 1 < l && ++d, s + 1 >= e - h && --d; let c = e - 1 - h + 1, a = e - 1 - e + 1 + l, f = e - 1 - e + 1; for (let h = e - 1; h < s; ++h)
                i += t[h], n.push(i * o), r += t[h], i += r, i -= u, r -= t[c++], u += t[a++], u -= t[f++]; return n; })); }
            trix(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[3 * (e - 1) + 1 - 1] = NaN; const o = 3 * e - 2, i = 2 / (e + 1); let r = t[0], u = 0, h = 0; for (let s = 1; s < o; ++s)
                r = (t[s] - r) * i + r, s == e - 1 ? u = r : s > e - 1 && (u = (r - u) * i + u, s == 2 * e - 2 ? h = u : s > 2 * e - 2 && (h = (u - h) * i + h)); for (let e = o; e < s; ++e) {
                r = (t[e] - r) * i + r, u = (r - u) * i + u;
                const s = h;
                h = (u - h) * i + h, n.push((h - s) / h * 100);
            } return n; })); }
            tsf(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; let o = 0, i = 0, r = 0, u = 0; const h = 1 / e; for (let s = 0; s < e - 1; ++s)
                o += s + 1, i += (s + 1) * (s + 1), u += t[s] * (s + 1), r += t[s]; o += e, i += e * e; const l = 1 / (e * i - o * o); for (let i = e - 1; i < s; ++i) {
                u += t[i] * e, r += t[i];
                const s = (e * u - o * r) * l, d = (r - s * o) * h;
                n.push(d + s * (e + 1)), u -= r, r -= t[i - e + 1];
            } return n; })); }
            typprice(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let i = 0; i < o; ++i)
                n.push((t[i] + e[i] + s[i]) * (1 / 3)); return n; })); }
            ultosc(t, e, s, o, i, r, u = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[r - 1] = NaN; const h = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }, l = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }; let d = 0, c = 0, a = 0, f = 0; for (let v = 1; v < u; ++v) {
                const u = e[v] < s[v - 1] ? e[v] : s[v - 1], p = t[v] > s[v - 1] ? t[v] : s[v - 1], N = s[v] - u, x = p - u;
                if (d += N, c += N, a += x, f += x, h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += N, h.vals[h.index] = N, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0), l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += x, l.vals[l.index] = x, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0), v > o) {
                    let t = h.index - o - 1;
                    if (t < 0 && (t += r), d -= h.vals[t], a -= l.vals[t], v > i) {
                        let t = h.index - i - 1;
                        t < 0 && (t += r), c -= h.vals[t], f -= l.vals[t];
                    }
                }
                if (v >= r) {
                    const t = 100 * (4 * d / a + 2 * c / f + 1 * h.sum / l.sum) / 7;
                    n.push(t);
                }
            } return n; })); }
            var(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = 1 / e; let i = 0, r = 0; for (let s = 0; s < e; ++s)
                i += t[s], r += t[s] * t[s]; n.push(r * o - i * o * (i * o)); for (let u = e; u < s; ++u)
                i += t[u], r += t[u] * t[u], i -= t[u - e], r -= t[u - e] * t[u - e], n.push(r * o - i * o * (i * o)); return n; })); }
            vhf(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; let o, i, r, u = 1, h = -1, l = -1, d = t[0], c = t[0], a = 0, f = t[0]; for (let s = 1; s < e; ++s)
                i = t[s], a += Math.abs(i - f), f = i; for (let v = e; v < s; ++v, ++u) {
                if (i = t[v], a += Math.abs(i - f), f = i, v > e && (a -= Math.abs(t[v - e] - t[v - e - 1])), o = i, h < u)
                    for (h = u, d = t[h], r = u; ++r <= v;)
                        o = t[r], o >= d && (d = o, h = r);
                else
                    o >= d && (h = v, d = o);
                if (o = i, l < u)
                    for (l = u, c = t[l], r = u; ++r <= v;)
                        o = t[r], o <= c && (c = o, l = r);
                else
                    o <= c && (l = v, c = o);
                n.push(Math.abs(d - c) / a);
            } return n; })); }
            vidya(t, e, s, o, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[s - 3] = NaN; const r = 1 / e, u = 1 / s; let h = 0, l = 0, d = 0, c = 0; for (let n = 0; n < s; ++n)
                d += t[n], c += t[n] * t[n], n >= s - e && (h += t[n], l += t[n] * t[n]); let a = t[s - 2]; if (n.push(a), s - 1 < i) {
                let e = Math.sqrt(l * r - h * r * (h * r)) / Math.sqrt(c * u - d * u * (d * u));
                e != e && (e = 0), e *= o, a = (t[s - 1] - a) * e + a, n.push(a);
            } for (let f = s; f < i; ++f) {
                d += t[f], c += t[f] * t[f], h += t[f], l += t[f] * t[f], d -= t[f - s], c -= t[f - s] * t[f - s], h -= t[f - e], l -= t[f - e] * t[f - e];
                let i = Math.sqrt(l * r - h * r * (h * r)) / Math.sqrt(c * u - d * u * (d * u));
                i != i && (i = 0), i *= o, a = (t[f] - a) * i + a, n.push(a);
            } return n; })); }
            volatility(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; const o = 1 / e, i = Math.sqrt(252); let r = 0, u = 0; for (let s = 1; s <= e; ++s) {
                const e = t[s] / t[s - 1] - 1;
                r += e, u += e * e;
            } n.push(Math.sqrt(u * o - r * o * (r * o)) * i); for (let h = e + 1; h < s; ++h) {
                const s = t[h] / t[h - 1] - 1;
                r += s, u += s * s;
                const l = t[h - e] / t[h - e - 1] - 1;
                r -= l, u -= l * l, n.push(Math.sqrt(u * o - r * o * (r * o)) * i);
            } return n; })); }
            vosc(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[s - 2] = NaN; const i = 1 / e, r = 1 / s; let u = 0, h = 0; for (let n = 0; n < s; ++n)
                n >= s - e && (u += t[n]), h += t[n]; const l = u * i, d = h * r; n.push(100 * (l - d) / d); for (let l = s; l < o; ++l) {
                u += t[l], u -= t[l - e], h += t[l], h -= t[l - s];
                const o = u * i, d = h * r;
                n.push(100 * (o - d) / d);
            } return n; })); }
            vwma(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[s - 2] = NaN; let i = 0, r = 0; for (let n = 0; n < s; ++n)
                i += t[n] * e[n], r += e[n]; n.push(i / r); for (let u = s; u < o; ++u)
                i += t[u] * e[u], i -= t[u - s] * e[u - s], r += e[u], r -= e[u - s], n.push(i / r); return n; })); }
            wad(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[0] = NaN; let i = 0, r = s[0]; for (let u = 1; u < o; ++u) {
                const o = s[u];
                o > r ? i += o - (r < e[u] ? r : e[u]) : o < r && (i += o - (r > t[u] ? r : t[u])), n.push(i), r = s[u];
            } return n; })); }
            wcprice(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; for (let i = 0; i < o; ++i)
                n.push(.25 * (t[i] + e[i] + s[i] + s[i])); return n; })); }
            wilders(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = 1 / e; let i = 0; for (let s = 0; s < e; ++s)
                i += t[s]; let r = i / e; n.push(r); for (let i = e; i < s; ++i)
                r = (t[i] - r) * o + r, n.push(r); return n; })); }
            willr(t, e, s, o, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[o - 2] = NaN; let r, u, h = 0, l = -1, d = -1, c = t[0], a = e[0]; for (let f = o - 1; f < i; ++f, ++h) {
                if (r = t[f], l < h)
                    for (l = h, c = t[l], u = h; ++u <= f;)
                        r = t[u], r >= c && (c = r, l = u);
                else
                    r >= c && (l = f, c = r);
                if (r = e[f], d < h)
                    for (d = h, a = e[d], u = h; ++u <= f;)
                        r = e[u], r <= a && (a = r, d = u);
                else
                    r <= a && (d = f, a = r);
                const o = c - a, i = 0 == o ? 0 : (c - s[f]) / o * -100;
                n.push(i);
            } return n; })); }
            wma(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const o = e * (e + 1) / 2; let i = 0, r = 0; for (let s = 0; s < e - 1; ++s)
                r += t[s] * (s + 1), i += t[s]; for (let u = e - 1; u < s; ++u)
                r += t[u] * e, i += t[u], n.push(r / o), r -= i, i -= t[u - e + 1]; return n; })); }
            zlema(t, e, s = t.length) { return n(this, void 0, void 0, (function* () { const n = Math.floor((e - 1) / 2), o = []; o[(e - 2) / 2 - 2] = NaN; const i = 2 / (e + 1); let r, u = t[n - 1]; for (o.push(u), r = n; r < s; ++r) {
                const e = t[r];
                u = (e + (e - t[r - n]) - u) * i + u, o.push(u);
            } return o; })); }
            abands(t, e, s, o, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = [], u = []; n[o - 2] = NaN, r[o - 2] = NaN, u[o - 2] = NaN; const h = 1 / o, l = { size: o, index: 0, pushes: 0, sum: 0, vals: [] }, d = { size: o, index: 0, pushes: 0, sum: 0, vals: [] }; let c = 0; for (let n = 0; n < o; ++n) {
                const o = 4 * (t[n] - e[n]) / (t[n] + e[n]), i = (1 + o) * t[n];
                l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += i, l.vals[l.index] = i, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0);
                const r = (1 - o) * e[n];
                d.pushes >= d.size && (d.sum -= d.vals[d.index]), d.sum += r, d.vals[d.index] = r, d.pushes += 1, d.index = d.index + 1, d.index >= d.size && (d.index = 0), c += s[n];
            } n.push(l.sum * h), r.push(d.sum * h), u.push(c * h); for (let a = o; a < i; ++a) {
                const i = 4 * (t[a] - e[a]) / (t[a] + e[a]), f = (1 + i) * t[a];
                l.pushes >= l.size && (l.sum -= l.vals[l.index]), l.sum += f, l.vals[l.index] = f, l.pushes += 1, l.index = l.index + 1, l.index >= l.size && (l.index = 0);
                const v = (1 - i) * e[a];
                d.pushes >= d.size && (d.sum -= d.vals[d.index]), d.sum += v, d.vals[d.index] = v, d.pushes += 1, d.index = d.index + 1, d.index >= d.size && (d.index = 0), c += s[a] - s[a - o], n.push(l.sum * h), r.push(d.sum * h), u.push(c * h);
            } return [n, r, u]; })); }
            alma(t, e, s, o, i = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const r = [], u = Math.floor(s * (e - 1)), h = e / o; let l = 0; for (let t = 0; t < e; t++)
                r[t] = Math.exp(-1 * Math.pow(t - u, 2) / (2 * Math.pow(h, 2))), l += r[t]; for (let t = 0; t < e; t++)
                r[t] /= l; for (let s = e - 1; s < i; s++) {
                let o = 0;
                for (let n = 0; n < e; n++)
                    o += t[s - e + n + 1] * r[n];
                n.push(o);
            } return n; })); }
            ce(t, e, s, o, i, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], u = []; n[o - 2] = NaN, u[o - 2] = NaN; let h, l, d = t[0] - e[0], c = t[0], a = 0, f = e[0], v = 0; for (let n = 1; n < o; ++n) {
                const o = e[n], i = t[n], r = s[n - 1], u = Math.abs(i - r), p = Math.abs(o - r);
                let N = i - o;
                u > N && (N = u), p > N && (N = p), h = N, d += h, c <= (l = t[n]) && (c = l, a = n), f >= (l = e[n]) && (f = l, v = n);
            } d /= o; const p = (o - 1) / o, N = 1 / o; n.push(c - i * d), u.push(f + i * d); for (let x = o; x < r; ++x) {
                const r = e[x], g = t[x], m = s[x - 1], M = Math.abs(g - m), z = Math.abs(r - m);
                let b = g - r;
                if (M > b && (b = M), z > b && (b = z), h = b, d = d * p + h * N, c <= (l = t[x]))
                    c = l, a = x;
                else if (a == x - o) {
                    c = t[x - o + 1], a = x - o + 1;
                    for (let e = x - o + 2; e <= x; ++e)
                        c <= (l = t[e]) && (c = l, a = e);
                }
                if (f >= (l = e[x]))
                    f = l, v = x;
                else if (v == x - o) {
                    f = e[x - o + 1], v = x - o + 1;
                    for (let t = x - o + 2; t <= x; ++t)
                        f >= (l = e[t]) && (f = l, v = t);
                }
                n.push(c - i * d), u.push(f + i * d);
            } return [n, u]; })); }
            cmf(t, e, s, o, i, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[i - 2] = NaN; let u = 0, h = 0; for (let n = 0; n < i - 1; ++n)
                h += t[n] - e[n] ? o[n] * (s[n] - e[n] - (t[n] - s[n])) / (t[n] - e[n]) : 0, u += o[n]; for (let l = i - 1; l < r; ++l)
                h += t[l] - e[l] ? o[l] * (s[l] - e[l] - (t[l] - s[l])) / (t[l] - e[l]) : 0, u += o[l], n.push(h / u), h -= t[l - i + 1] - e[l - i + 1] ? o[l - i + 1] * (s[l - i + 1] - e[l - i + 1] - (t[l - i + 1] - s[l - i + 1])) / (t[l - i + 1] - e[l - i + 1]) : 0, u -= o[l - i + 1]; return n; })); }
            copp(t, e, s) { return n(this, void 0, void 0, (function* () { const n = new Array(t.length), o = new Array(t.length), i = new Array(t.length); for (let r = 0; r < t.length; r++)
                n[r] = r < e - 1 ? null : (t[r] - t[r - e]) / t[r - e] * 100, o[r] = r < s - 1 ? null : (t[r] - t[r - s]) / t[r - s] * 100, i[r] = 10 * (n[r] + o[r]); return i; })); }
            dc(t, e, s) { return n(this, void 0, void 0, (function* () { const n = [], o = [], i = []; n[s - 2] = NaN, o[s - 2] = NaN, i[s - 2] = NaN; for (let r = s - 1; r < t.length; r++)
                n.push(Math.max(...t.slice(r - s + 1, r + 1))), o.push(Math.min(...e.slice(r - s + 1, r + 1))), i.push((n[n.length - 1] + o[o.length - 1]) / 2); return [n, i, o]; })); }
            fi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[0] = NaN; const i = 2 / (s + 1); let r = e[1] * (t[1] - t[0]); for (let s = 1; s < o; ++s)
                r = (e[s] * (t[s] - t[s - 1]) - r) * i + r, n.push(r); return n; })); }
            ikhts() { return n(this, void 0, void 0, (function* () { })); }
            kc(t, e, s, o, i, r = t.length) { return n(this, void 0, void 0, (function* () { const n = [], u = [], h = [], l = 2 / (o + 1); let d = s[0], c = t[0] - e[0]; n.push(d - i * c), u.push(d), h.push(d + i * c); let a = 0; for (let o = 1; o < r; ++o) {
                d = (s[o] - d) * l + d;
                const r = e[o], f = t[o], v = s[o - 1], p = Math.abs(f - v), N = Math.abs(r - v);
                let x = f - r;
                p > x && (x = p), N > x && (x = N), a = x, c = (a - c) * l + c, n.push(d - i * c), u.push(d), h.push(d + i * c);
            } return [n, u, h]; })); }
            kst(t, e, s, o, i, r, u, h, l, d = t.length) { return n(this, void 0, void 0, (function* () { const n = [], c = []; n[i - 1] = NaN, c[i - 1] = NaN; let a = r; a < u && (a = u), a < h && (a = h), a < l && (a = l); const f = 2 / (r + 1), v = 2 / (u + 1), p = 2 / (h + 1), N = 2 / (l + 1); function x(e, s) { return (t[e] - t[e - s]) / t[e - s]; } let g = x(e, e), m = x(s, s), M = x(o, o), z = x(i, i); for (let t = e + 1; t < i + 1 && t < d; ++t)
                g = (x(t, e) - g) * f + g; for (let t = s + 1; t < i + 1 && t < d; ++t)
                m = (x(t, s) - m) * v + m; for (let t = o + 1; t < i + 1 && t < d; ++t)
                M = (x(t, o) - M) * p + M; for (let t = i + 1; t < i + 1 && t < d; ++t)
                z = (x(t, i) - z) * N + z; let b = (1 * g + 2 * m + 3 * M + 4 * z) / 10; c.push(b); let w = b; n.push(w); for (let t = i + 1; t < d; ++t)
                g = (x(t, e) - g) * f + g, m = (x(t, s) - m) * v + m, M = (x(t, o) - M) * p + M, z = (x(t, i) - z) * N + z, b = (1 * g + 2 * m + 3 * M + 4 * z) / 10, n.push(b), w = .2 * (b - w) + w, c.push(w); return [n, c]; })); }
            mama() { return n(this, void 0, void 0, (function* () { })); }
            pbands(t, e, s, o, i = t.length) { return n(this, void 0, void 0, (function* () { const n = [], r = []; n[o - 2] = NaN, r[o - 2] = NaN; let u = 0, h = 0; const l = o * (o + 1) / 2, d = o * (o + 1) * (2 * o + 1) / 6; let c; for (c = 0; c < o; ++c)
                h += s[c] * (c + 1), u += s[c]; --c; const a = (h / o - l / o * u / o) / (d / o - l / o * (l / o)); let f = t[c]; for (let e = 1; e < o; ++e)
                f < t[c - e] + e * a && (f = t[c - e] + e * a); let v = e[c]; for (let t = 1; t < o; ++t)
                v > e[c - t] + t * a && (v = e[c - t] + t * a); for (r.push(f), n.push(v), ++c; c < i; ++c) {
                h += -u + s[c] * o, u += -s[c - o] + s[c];
                const i = (h / o - l / o * u / o) / (d / o - l / o * (l / o));
                let a = t[c];
                for (let e = 1; e < o; ++e)
                    a < t[c - e] + e * i && (a = t[c - e] + e * i);
                let f = e[c];
                for (let t = 1; t < o; ++t)
                    f > e[c - t] + t * i && (f = e[c - t] + t * i);
                n.push(f), r.push(a);
            } return [n, r]; })); }
            pc() { return n(this, void 0, void 0, (function* () { })); }
            pfe(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 1] = NaN; const i = 2 / (s + 1), r = { size: e, index: 0, pushes: 0, sum: 0, vals: [] }; let u; for (u = 1; u < e; ++u)
                r.pushes >= r.size && (r.sum -= r.vals[r.index]), r.sum += Math.sqrt(Math.pow(t[u] - t[u - 1], 2) + 1), r.vals[r.index] = Math.sqrt(Math.pow(t[u] - t[u - 1], 2) + 1), r.pushes += 1, r.index = r.index + 1, r.index >= r.size && (r.index = 0); r.pushes >= r.size && (r.sum -= r.vals[r.index]), r.sum += Math.sqrt(Math.pow(t[u] - t[u - 1], 2) + 1), r.vals[r.index] = Math.sqrt(Math.pow(t[u] - t[u - 1], 2) + 1), r.pushes += 1, r.index = r.index + 1, r.index >= r.size && (r.index = 0); let h = 100 * (t[u] - t[u - e] > 0 ? 1 : -1) * Math.sqrt(Math.pow(t[u] - t[u - e], 2) + 100) / r.sum; for (n.push(h), u = e + 1; u < o; ++u)
                r.pushes >= r.size && (r.sum -= r.vals[r.index]), r.sum += Math.sqrt(Math.pow(t[u] - t[u - 1], 2) + 1), r.vals[r.index] = Math.sqrt(Math.pow(t[u] - t[u - 1], 2) + 1), r.pushes += 1, r.index = r.index + 1, r.index >= r.size && (r.index = 0), h = (100 * (t[u] - t[u - e] > 0 ? 1 : -1) * Math.sqrt(Math.pow(t[u] - t[u - e], 2) + 100) / r.sum - h) * i + h, n.push(h); return n; })); }
            posc(t, e, s, o, i, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[o - 2] = NaN; let u, h = 0, l = 0; const d = o * (o + 1) / 2, c = o * (o + 1) * (2 * o + 1) / 6; let a; for (a = 0; a < o; ++a)
                l += s[a] * (a + 1), h += s[a]; --a; const f = (l / o - d / o * h / o) / (c / o - d / o * (d / o)); let v = t[a]; for (let e = 1; e < o; ++e)
                v < t[a - e] + e * f && (v = t[a - e] + e * f); let p = e[a]; for (let t = 1; t < o; ++t)
                p > e[a - t] + t * f && (p = e[a - t] + t * f); for (u = (s[a] - p) / (v - p) * 100, n.push(u), ++a; a < r; ++a) {
                l += -h + s[a] * o, h += -s[a - o] + s[a];
                const r = (l / o - d / o * h / o) / (c / o - d / o * (d / o));
                let f = t[a];
                for (let e = 1; e < o; ++e)
                    f < t[a - e] + e * r && (f = t[a - e] + e * r);
                let v = e[a];
                for (let t = 1; t < o; ++t)
                    v > e[a - t] + t * r && (v = e[a - t] + t * r);
                u = 2 * ((s[a] - v) / (f - v) * 100 - u) / (1 + i) + u, n.push(u);
            } return n; })); }
            rmi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; let i, r; n[s - 1] = NaN; let u = s; for (i = 0 > t[u] - t[u - s] ? 0 : t[u] - t[u - s], r = 0 > t[u - s] - t[u] ? 0 : t[u - s] - t[u], ++u, n.push(i / (i + r) * 100); u < o; ++u)
                i = 2 * (0 > t[u] - t[u - s] ? 0 : t[u] - t[u - s] - i) / (1 + e) + i, r = 2 * (0 > t[u - s] - t[u] ? 0 : t[u - s] - t[u] - r) / (1 + e) + r, n.push(i / (i + r) * 100); return n; })); }
            rmta(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[e - 2] = NaN; const i = 1 - s; let r = (1 - i) * t[0] + t[0], u = (1 - i) * t[0] + i * (t[0] + r); for (let s = 1; s < e - 1; ++s) {
                const e = (1 - i) * r + t[s];
                u = (1 - i) * u + i * (t[s] + e - r), r = e;
            } for (let s = e - 1; s < o; ++s) {
                const e = (1 - i) * r + t[s];
                u = (1 - i) * u + i * (t[s] + e - r), r = e, n.push(u);
            } return n; })); }
            rvi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[s - 2] = NaN; let i = 0, r = 0; const u = s * (s + 1) / 2, h = s * (s + 1) * (2 * s + 1) / 6; let l = 0, d = 0, c = 0; for (; c < s; ++c)
                r += t[c] * (c + 1), i += t[c]; --c; const a = (r / s - u / s * i / s) / (h / s - u / s * (u / s)), f = i / s - a * u / s, v = t[c] - (f + a * s); for (v > 0 ? l = v * v / s : d = v * v / s, l + d == 0 ? n.push(50) : n.push(l / (l + d) * 100), ++c; c < o; ++c) {
                r += -i + t[c] * s, i += -t[c - s] + t[c];
                const o = (r / s - u / s * i / s) / (h / s - u / s * (u / s)), a = i / s - o * u / s, f = t[c] - (a + o * s);
                f > 0 ? l = 2 * (f * f / s - l) / (e + 1) + l : d = 2 * (f * f / s - d) / (e + 1) + d, l + d == 0 ? n.push(50) : n.push(l / (l + d) * 100);
            } return n; })); }
            smi(t, e, s, o, i, r, u = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[o - 2] = NaN; let h = 1 - o, l = NaN, d = NaN, c = NaN, a = NaN, f = 0, v = 0, p = 0, N = 0, x = 0, g = 0; for (; g < u && h == 1 - o; ++g, ++h)
                v = t[g], p = h, f = e[g], N = h; for (; g < u && h < 0; ++g, ++h)
                v <= t[g] && (v = t[g], p = h), f >= e[g] && (f = e[g], N = h); for (; g < u && 0 == h; ++g, ++h)
                v <= t[g] && (v = t[g], p = h), f >= e[g] && (f = e[g], N = h), l = d = s[g] - .5 * (v + f), c = a = v - f, n.push(100 * d / (.5 * a)); for (; g < u; ++g, ++h) {
                if (p == h - o) {
                    v = t[g], p = h;
                    for (let e = 1; e < o; ++e)
                        x = t[g - e], x > v && (v = x, p = h - e);
                }
                else
                    v <= t[g] && (v = t[g], p = h);
                if (N == h - o) {
                    f = e[g], N = h;
                    for (let t = 1; t < o; ++t)
                        x = e[g - t], x < f && (f = x, N = h - t);
                }
                else
                    f >= e[g] && (f = e[g], N = h);
                l = (s[g] - .5 * (v + f) - l) * (2 / (1 + i)) + l, d = 2 / (1 + r) * (l - d) + d, c = 2 / (1 + i) * (v - f - c) + c, a = 2 / (1 + r) * (c - a) + a, n.push(100 * d / (.5 * a));
            } return n; })); }
            tsi(t, e, s, o = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[0] = NaN; let i = -1, r = 0, u = 0, h = 0, l = 0, d = 0, c = 0; for (; c < o && -1 == i; ++c, ++i)
                r = t[c]; for (; c < o && 0 == i; ++c, ++i)
                h = u = t[c] - r, d = l = Math.abs(t[c] - r), n.push(100 * (d ? h / d : 0)), r = t[c]; for (; c < o; ++c, ++i)
                u = 2 * (t[c] - r - u) / (1 + e) + u, l = 2 * (Math.abs(t[c] - r) - l) / (1 + e) + l, h = 2 * (u - h) / (1 + s) + h, d = 2 * (l - d) / (1 + s) + d, n.push(100 * (d ? h / d : 0)), r = t[c]; return n; })); }
            vwap(t, e, s, o, i, r = t.length) { return n(this, void 0, void 0, (function* () { const n = []; n[i - 2] = NaN; let u = 1 - i, h = 0, l = 0, d = 0; for (; d < r && u < 1; ++d, ++u)
                h += (t[d] + e[d] + s[d]) / 3 * o[d], l += o[d]; for (d > 0 && 1 == u && n.push(h / l); d < r; ++d, ++u)
                h += (t[d] + e[d] + s[d]) / 3 * o[d] - (t[d - i] + e[d - i] + s[d - i]) / 3 * o[d - i], l += o[d] - o[d - i], n.push(h / l); return n; })); }
        }; }, 409: (t, e) => { Object.defineProperty(e, "__esModule", { value: !0 }), e.ti_buffer = void 0; class s {
            constructor(t) { this.size = t, this.pushes = 0, this.index = 0, this.sum = 0, this.vals = []; }
            static new(t) { return new s(t); }
            push(t) { this.pushes >= this.size && (this.sum -= this.vals[this.index]), this.sum += t, this.vals[this.index] = t, this.pushes += 1, this.index = (this.index + 1) % this.size; }
            qpush(t) { this.vals[this.index] = t, this.index = (this.index + 1) % this.size; }
            get(t) { return this.vals[(this.index + this.size - 1 + t) % this.size]; }
        } e.ti_buffer = s; } }, e = {};
    return function s(n) { var o = e[n]; if (void 0 !== o)
        return o.exports; var i = e[n] = { exports: {} }; return t[n].call(i.exports, i, i.exports, s), i.exports; }(830);
})()));
