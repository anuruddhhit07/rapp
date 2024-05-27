"use strict";
!function (e, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.indicators = t() : e.indicators = t(); }(self, (() => (() => {
    "use strict";
    var e = { 409: (e, t) => { Object.defineProperty(t, "__esModule", { value: !0 }), t.ti_buffer = void 0; class s {
            constructor(e) { this.size = e, this.pushes = 0, this.index = 0, this.sum = 0, this.vals = []; }
            static new(e) { return new s(e); }
            push(e) { this.pushes >= this.size && (this.sum -= this.vals[this.index]), this.sum += e, this.vals[this.index] = e, this.pushes += 1, this.index = (this.index + 1) % this.size; }
            qpush(e) { this.vals[this.index] = e, this.index = (this.index + 1) % this.size; }
            get(e) { return this.vals[(this.index + this.size - 1 + e) % this.size]; }
        } t.ti_buffer = s; } }, t = {};
    function s(n) { var l = t[n]; if (void 0 !== l)
        return l.exports; var r = t[n] = { exports: {} }; return e[n](r, r.exports, s), r.exports; }
    var n = {};
    return (() => { var e = n; Object.defineProperty(e, "__esModule", { value: !0 }), e.IndicatorsSync = void 0; const t = s(409); e.IndicatorsSync = class {
        constructor() { }
        normalize(e, t, s = NaN) { const n = e - t.length, l = []; for (let e = 0; e < n; ++e)
            l.push(s); return [...l, ...t]; }
        floor(e) { return e < 0 ? ~~e - 1 : ~~e; }
        sqrt(e, t = e / 2) { const s = (t + e / t) / 2; return (t > s ? t - s : s - t) < 1e-7 ? s : this.sqrt(e, s); }
        ad(e, t, s, n, l = s.length) { const r = []; let o = 0; for (let h = 0; h < l; ++h) {
            const l = e[h] - t[h];
            0 != l && (o += (s[h] - t[h] - e[h] + s[h]) / l * n[h]), r[h] = o;
        } return r; }
        adosc(e, t, s, n, l, r, o = s.length) { const h = r - 1, u = 2 / (l + 1), i = 2 / (r + 1), p = []; let a = 0, f = 0, c = 0; for (let l = 0; l < o; ++l) {
            const r = e[l] - t[l];
            0 != r && (a += (s[l] - t[l] - e[l] + s[l]) / r * n[l]), 0 == l ? (f = a, c = a) : (f = (a - f) * u + f, c = (a - c) * i + c), l >= h && p.push(f - c);
        } return p; }
        adx(e, t, s, n = e.length) { const l = [], r = (s - 1) / s, o = 1 / s; let h = 0, u = 0; for (let n = 1; n < s; ++n) {
            let s = e[n] - e[n - 1], l = t[n - 1] - t[n];
            s < 0 ? s = 0 : s > l && (l = 0), l < 0 ? l = 0 : l > s && (s = 0), h += s, u += l;
        } let i = 0, p = h, a = u, f = Math.abs(p - a), c = p + a, d = f / c * 100; i += d; for (let x = s; x < n; ++x) {
            let n = e[x] - e[x - 1], g = t[x - 1] - t[x];
            n < 0 ? n = 0 : n > g && (g = 0), g < 0 ? g = 0 : g > n && (n = 0), h = h * r + n, u = u * r + g, p = h, a = u, f = Math.abs(p - a), c = p + a, d = f / c * 100, x - s < s - 2 ? i += d : x - s == s - 2 ? (i += d, l.push(i * o)) : (i = i * r + d, l.push(i * o));
        } return l; }
        adxr(e, t, s, n = e.length) { const l = [], r = (s - 1) / s, o = 1 / s; let h = 0, u = 0; for (let n = 1; n < s; ++n) {
            let s = e[n] - e[n - 1], l = t[n - 1] - t[n];
            s < 0 ? s = 0 : s > l && (l = 0), l < 0 ? l = 0 : l > s && (s = 0), h += s, u += l;
        } let i = 0, p = h, a = u, f = Math.abs(p - a), c = p + a, d = f / c * 100; i += d; const x = { size: s - 1, pushes: 0, index: 0, vals: [] }, g = 3 * (s - 1); for (let m = s; m < n; ++m) {
            let n = e[m] - e[m - 1], v = t[m - 1] - t[m];
            if (n < 0 ? n = 0 : n > v && (v = 0), v < 0 ? v = 0 : v > n && (n = 0), h = h * r + n, u = u * r + v, p = h, a = u, f = Math.abs(p - a), c = p + a, d = f / c * 100, m - s < s - 2)
                i += d;
            else if (m - s == s - 2)
                i += d, x.vals[x.index] = i * o, x.index = x.index + 1, x.index >= x.size && (x.index = 0);
            else {
                if (i = i * r + d, m >= g) {
                    const e = x.vals[x.index] + (x.size - 1 + 1) % x.size;
                    l.push(.5 * (i * o + e));
                }
                x.vals[x.index] = i * o, x.index = x.index + 1, x.index >= x.size && (x.index = 0);
            }
        } return l; }
        ao(e, t, s = e.length) { const n = []; let l = 0, r = 0; const o = 1 / 34; for (let s = 0; s < 34; ++s) {
            const n = .5 * (e[s] + t[s]);
            l += n, s >= 29 && (r += n);
        } n.push(.2 * r - o * l); for (let h = 34; h < s; ++h) {
            const s = .5 * (e[h] + t[h]);
            l += s, r += s, l -= .5 * (e[h - 34] + t[h - 34]), r -= .5 * (e[h - 5] + t[h - 5]), n.push(.2 * r - o * l);
        } return n; }
        apo(e, t, s, n = e.length) { const l = [], r = 2 / (t + 1), o = 2 / (s + 1); let h = e[0], u = e[0]; for (let t = 1; t < n; ++t) {
            h = (e[t] - h) * r + h, u = (e[t] - u) * o + u;
            const s = h - u;
            l.push(s);
        } return l; }
        aroon(e, t, s, n = e.length) { const l = [], r = [], o = 100 / s; let h, u, i = 0, p = -1, a = -1, f = e[0], c = t[0]; for (let d = s; d < n; ++d, ++i) {
            if (h = e[d], p < i)
                for (p = i, f = e[p], u = i; ++u <= d;)
                    h = e[u], h >= f && (f = h, p = u);
            else
                h >= f && (p = d, f = h);
            if (h = t[d], a < i)
                for (a = i, c = t[a], u = i; ++u <= d;)
                    h = t[u], h <= c && (c = h, a = u);
            else
                h <= c && (a = d, c = h);
            l[l.length] = (s - (d - a)) * o, r[r.length] = (s - (d - p)) * o;
        } return [l, r]; }
        aroonosc(e, t, s, n = e.length) { const l = [], r = 100 / s; let o, h = 0, u = -1, i = -1, p = e[0], a = t[0]; for (let f = s; f < n; ++f, ++h) {
            let s = e[f];
            if (u < h)
                for (u = h, p = e[u], o = h; ++o <= f;)
                    s = e[o], s >= p && (p = s, u = o);
            else
                s >= p && (u = f, p = s);
            if (s = t[f], i < h)
                for (i = h, a = t[i], o = h; ++o <= f;)
                    s = t[o], s <= a && (a = s, i = o);
            else
                s <= a && (i = f, a = s);
            l.push((u - i) * r);
        } return l; }
        atr(e, t, s, n, l = e.length) { const r = [], o = 1 / n; let h, u = 0; u += e[0] - t[0]; for (let l = 1; l < n; ++l) {
            const n = t[l], r = e[l], o = s[l - 1], i = Math.abs(r - o), p = Math.abs(n - o);
            let a = r - n;
            i > a && (a = i), p > a && (a = p), h = a, u += h;
        } let i = u / n; r.push(i); for (let u = n; u < l; ++u) {
            const n = t[u], l = e[u], p = s[u - 1], a = Math.abs(l - p), f = Math.abs(n - p);
            let c = l - n;
            a > c && (c = a), f > c && (c = f), h = c, i = (h - i) * o + i, r.push(i);
        } return r; }
        avgprice(e, t, s, n, l = e.length) { const r = []; for (let o = 0; o < l; ++o)
            r.push(.25 * (e[o] + t[o] + s[o] + n[o])); return r; }
        bbands(e, t, s, n = e.length) { const l = [], r = [], o = [], h = 1 / t; let u = 0, i = 0; for (let s = 0; s < t; ++s)
            u += e[s], i += e[s] * e[s]; let p = Math.sqrt(i * h - u * h * (u * h)); const a = u * h; l.push(a - s * p), o.push(a + s * p), r.push(a); for (let a = t; a < n; ++a) {
            u += e[a], i += e[a] * e[a], u -= e[a - t], i -= e[a - t] * e[a - t], p = Math.sqrt(i * h - u * h * (u * h));
            const n = u * h;
            o.push(n + s * p), l.push(n - s * p), r.push(n);
        } return [l, r, o]; }
        bop(e, t, s, n, l = e.length) { const r = []; for (let o = 0; o < l; ++o) {
            const l = t[o] - s[o];
            r[o] = l <= 0 ? 0 : (n[o] - e[o]) / l;
        } return r; }
        cci(e, s, n, l, r = e.length) { const o = 1 / l, h = [], u = new t.ti_buffer(l); let i, p; for (i = 0; i < r; ++i) {
            const t = (e[i] + s[i] + n[i]) * (1 / 3);
            u.push(t);
            const r = u.sum * o;
            if (i >= 2 * l - 2) {
                let e = 0;
                for (p = 0; p < l; ++p)
                    e += Math.abs(r - u.vals[p]);
                let s = e * o;
                s *= .015, s = (t - r) / s, h.push(s);
            }
        } return h; }
        cmo(e, t, s = e.length) { const n = []; let l = 0, r = 0; for (let s = 1; s <= t; ++s)
            l += e[s] > e[s - 1] ? e[s] - e[s - 1] : 0, r += e[s] < e[s - 1] ? e[s - 1] - e[s] : 0; n.push(100 * (l - r) / (l + r)); for (let o = t + 1; o < s; ++o)
            l -= e[o - t] > e[o - t - 1] ? e[o - t] - e[o - t - 1] : 0, r -= e[o - t] < e[o - t - 1] ? e[o - t - 1] - e[o - t] : 0, l += e[o] > e[o - 1] ? e[o] - e[o - 1] : 0, r += e[o] < e[o - 1] ? e[o - 1] - e[o] : 0, n.push(100 * (l - r) / (l + r)); return n; }
        crossany(e, t, s = e.length) { const n = []; for (let l = 0; l < s; ++l)
            n.push(e[l] > t[l] && e[l - 1] <= t[l - 1] || e[l] < t[l] && e[l - 1] >= t[l - 1]); return n; }
        crossover(e, t, s = e.length) { const n = []; for (let l = 0; l < s; ++l)
            n.push(e[l] > t[l] && e[l - 1] <= t[l - 1]); return n; }
        crossOverNumber(e, t) { const s = []; for (let n = 0; n < e.length; n++) {
            const l = e[n], r = e[n - 1];
            l > t && r <= t ? s.push(!0) : s.push(!1);
        } return s; }
        crossUnderNumber(e, t) { const s = []; for (let n = 0; n < e.length; n++) {
            const l = e[n], r = e[n - 1];
            l < t && r >= t ? s.push(!0) : s.push(!1);
        } return s; }
        cvi(e, s, n, l = e.length) { const r = [], o = 2 / (n + 1), h = new t.ti_buffer(n); let u, i = e[0] - s[0]; for (u = 1; u < 2 * n - 1; ++u)
            i = (e[u] - s[u] - i) * o + i, h.qpush(i); for (u = 2 * n - 1; u < l; ++u) {
            i = (e[u] - s[u] - i) * o + i;
            const t = h.vals[h.index];
            r.push(100 * (i - t) / t), h.qpush(i);
        } return r; }
        _cvi(e, t, s, n = e.length) { const l = [], r = 2 / (s + 1), o = { size: s, index: 0, pushes: 0, vals: [] }; let h = e[0] - t[0]; for (let n = 1; n < 2 * s - 1; ++n)
            h = (e[n] - t[n] - h) * r + h, o.vals[o.index] = h, o.index = o.index + 1, o.index >= o.size && (o.index = 0); for (let u = 2 * s - 1; u < n; ++u) {
            h = (e[u] - t[u] - h) * r + h;
            const s = o.vals[o.index];
            l.push(100 * (h - s) / s), o.vals[o.index] = h, o.index = o.index + 1, o.index >= o.size && (o.index = 0);
        } return l; }
        decay(e, t, s = e.length) { const n = [], l = 1 / t; n.push(e[0]); for (let t = 1; t < s; ++t) {
            const s = n[n.length - 1] - l;
            n.push(e[t] > s ? e[t] : s);
        } return n; }
        dema(e, t, s = e.length) { const n = [], l = 2 / (t + 1), r = 1 - l; let o = e[0], h = o; for (let u = 0; u < s; ++u)
            o = o * r + e[u] * l, u == t - 1 && (h = o), u >= t - 1 && (h = h * r + o * l, u >= 2 * (t - 1) && n.push(2 * o - h)); return n; }
        di(e, t, s, n, l = e.length) { const r = [], o = [], h = (n - 1) / n; let u = 0, i = 0, p = 0; for (let l = 1; l < n; ++l) {
            const n = t[l], r = e[l], o = s[l - 1], h = Math.abs(r - o), a = Math.abs(n - o);
            let f = r - n;
            h > f && (f = h), a > f && (f = a), u += f;
            let c = e[l] - e[l - 1], d = t[l - 1] - t[l];
            c < 0 ? c = 0 : c > d && (d = 0), d < 0 ? d = 0 : d > c && (c = 0), i += c, p += d;
        } r.push(100 * i / u), o.push(100 * p / u); for (let a = n; a < l; ++a) {
            const n = t[a], l = e[a], f = s[a - 1], c = Math.abs(l - f), d = Math.abs(n - f);
            let x = l - n;
            c > x && (x = c), d > x && (x = d), u = u * h + x;
            let g = e[a] - e[a - 1], m = t[a - 1] - t[a];
            g < 0 ? g = 0 : g > m && (m = 0), m < 0 ? m = 0 : m > g && (g = 0), i = i * h + g, p = p * h + m, r.push(100 * i / u), o.push(100 * p / u);
        } return [r, o]; }
        dm(e, t, s, n = e.length) { const l = [], r = [], o = (s - 1) / s; let h = 0, u = 0; for (let n = 1; n < s; ++n) {
            let s = e[n] - e[n - 1], l = t[n - 1] - t[n];
            s < 0 ? s = 0 : s > l && (l = 0), l < 0 ? l = 0 : l > s && (s = 0), h += s, u += l;
        } l.push(h), r.push(u); for (let i = s; i < n; ++i) {
            let s = e[i] - e[i - 1], n = t[i - 1] - t[i];
            s < 0 ? s = 0 : s > n && (n = 0), n < 0 ? n = 0 : n > s && (s = 0), h = h * o + s, u = u * o + n, l.push(h), r.push(u);
        } return [l, r]; }
        dpo(e, t, s = e.length) { const n = t / 2 + 1, l = [], r = 1 / t; let o = 0; for (let s = 0; s < t; ++s)
            o += e[s]; l.push(e[t - 1 - n] - o * r); for (let h = t; h < s; ++h)
            o += e[h], o -= e[h - t], l.push(e[h - n] - o * r); return l; }
        dx(e, t, s, n = e.length) { const l = [], r = (s - 1) / s; let o = 0, h = 0; for (let n = 1; n < s; ++n) {
            let s = e[n] - e[n - 1], l = t[n - 1] - t[n];
            s < 0 ? s = 0 : s > l && (l = 0), l < 0 ? l = 0 : l > s && (s = 0), o += s, h += l;
        } let u = o, i = h, p = Math.abs(u - i), a = u + i, f = p / a * 100; l.push(f); for (let c = s; c < n; ++c) {
            let s = e[c] - e[c - 1], n = t[c - 1] - t[c];
            s < 0 ? s = 0 : s > n && (n = 0), n < 0 ? n = 0 : n > s && (s = 0), o = o * r + s, h = h * r + n, u = o, i = h, p = Math.abs(u - i), a = u + i, f = p / a * 100, l.push(f);
        } return l; }
        edecay(e, t, s = e.length) { const n = [], l = 1 - 1 / t; n.push(e[0]); for (let t = 1; t < s; ++t) {
            const s = n[n.length - 1] * l;
            n.push(e[t] > s ? e[t] : s);
        } return n; }
        ema(e, t, s = e.length) { const n = [], l = 2 / (t + 1); let r = e[0]; n.push(r); for (let t = 1; t < s; ++t)
            r = (e[t] - r) * l + r, n.push(r); return n; }
        emv(e, t, s, n = e.length) { const l = []; let r = .5 * (e[0] + t[0]); for (let o = 1; o < n; ++o) {
            const n = .5 * (e[o] + t[o]), h = s[o] / 1e4 / (e[o] - t[o]);
            l.push((n - r) / h), r = n;
        } return l; }
        fisher(e, t, s, n = e.length) { const l = [], r = []; let o, h, u = 0, i = -1, p = -1, a = .5 * (e[0] + t[0]), f = .5 * (e[0] + t[0]), c = 0, d = 0; for (let x = s - 1; x < n; ++x, ++u) {
            if (o = .5 * (e[x] + t[x]), i < u)
                for (i = u, a = .5 * (e[i] + t[i]), h = u; ++h <= x;)
                    o = .5 * (e[h] + t[h]), o >= a && (a = o, i = h);
            else
                o >= a && (i = x, a = o);
            if (o = .5 * (e[x] + t[x]), p < u)
                for (p = u, f = .5 * (e[p] + t[p]), h = u; ++h <= x;)
                    o = .5 * (e[h] + t[h]), o <= f && (f = o, p = h);
            else
                o <= f && (p = x, f = o);
            let s = a - f;
            0 == s && (s = .001), c = .66 * ((.5 * (e[x] + t[x]) - f) / s - .5) + .67 * c, c > .99 && (c = .999), c < -.99 && (c = -.999), r.push(d), d = .5 * Math.log((1 + c) / (1 - c)) + .5 * d, l.push(d);
        } return [l, r]; }
        fosc(e, t, s = e.length) { const n = []; let l = 0, r = 0, o = 0, h = 0; const u = 1 / t; let i = 0; for (let s = 0; s < t - 1; ++s)
            l += s + 1, r += (s + 1) * (s + 1), h += e[s] * (s + 1), o += e[s]; l += t, r += t * t; const p = 1 / (t * r - l * l); for (let r = t - 1; r < s; ++r) {
            h += e[r] * t, o += e[r];
            const s = (t * h - l * o) * p, a = (o - s * l) * u;
            r >= t && n.push(100 * (e[r] - i) / e[r]), i = a + s * (t + 1), h -= o, o -= e[r - t + 1];
        } return n; }
        DEP_hma(e, t, s = e.length) { const n = [], l = this.floor(t / 2), r = this.floor(this.sqrt(t)), o = t * (t + 1) / 2, h = l * (l + 1) / 2, u = r * (r + 1) / 2; let i, p = 0, a = 0, f = 0, c = 0, d = 0, x = 0; for (i = 0; i < t - 1; ++i)
            a += e[i] * (i + 1), p += e[i], i >= t - l && (c += e[i] * (i + 1 - (t - l)), f += e[i]); const g = { size: r, pushes: 0, index: 0, vals: [] }; for (i = t - 1; i < s; ++i) {
            a += e[i] * t, p += e[i], c += e[i] * l, f += e[i];
            const s = c / h * 2 - a / o;
            x += s * r, d += s, g.vals[g.index] = s, g.index = g.index + 1, g.index >= g.size && (g.index = 0), i >= t - 1 + (r - 1) ? (n.push(x / u), x -= d, d -= g.vals[g.index] + (g.size - 1 + 1) % g.size) : x -= d, a -= p, p -= e[i - t + 1], c -= f, f -= e[i - l + 1];
        } return n; }
        hma(e, s, n = e.length) { const l = [], r = Math.floor(s / 2), o = Math.floor(Math.sqrt(s)), h = s * (s + 1) / 2, u = r * (r + 1) / 2, i = o * (o + 1) / 2; let p, a = 0, f = 0, c = 0, d = 0, x = 0, g = 0; for (p = 0; p < s - 1; ++p)
            f += e[p] * (p + 1), a += e[p], p >= s - r && (d += e[p] * (p + 1 - (s - r)), c += e[p]); const m = new t.ti_buffer(o); for (p = s - 1; p < n; ++p) {
            f += e[p] * s, a += e[p], d += e[p] * r, c += e[p];
            const t = d / u * 2 - f / h;
            g += t * o, x += t, m.qpush(t), p >= s - 1 + (o - 1) ? (l.push(g / i), g -= x, x -= m.get(1)) : g -= x, f -= a, a -= e[p - s + 1], d -= c, c -= e[p - r + 1];
        } return l; }
        kama(e, t, s = e.length) { const n = []; let l = 0; for (let s = 1; s < t; ++s)
            l += Math.abs(e[s] - e[s - 1]); let r, o, h = e[t - 1]; n.push(h); for (let u = t; u < s; ++u)
            l += Math.abs(e[u] - e[u - 1]), u > t && (l -= Math.abs(e[u - t] - e[u - t - 1])), r = 0 != l ? Math.abs(e[u] - e[u - t]) / l : 1, o = Math.pow(.6021505376344085 * r + .06451612903225806, 2), h += o * (e[u] - h), n.push(h); return n; }
        kvo(e, t, s, n, l, r, o = e.length) { const h = 2 / (l + 1), u = 2 / (r + 1), i = []; let p = 0, a = e[0] + t[0] + s[0], f = -1, c = 0, d = 0; for (let l = 1; l < o; ++l) {
            const r = e[l] + t[l] + s[l], o = e[l] - t[l];
            r > a && 1 != f ? (f = 1, p = e[l - 1] - t[l - 1]) : r < a && 0 != f && (f = 0, p = e[l - 1] - t[l - 1]), p += o;
            const x = n[l] * Math.abs(o / p * 2 - 1) * 100 * (f ? 1 : -1);
            1 == l ? (c = x, d = x) : (c = (x - c) * h + c, d = (x - d) * u + d), i.push(c - d), a = r;
        } return i; }
        lag(e, t, s = e.length) { const n = []; for (let l = t; l < s; ++l)
            n.push(e[l - t]); return n; }
        linreg(e, t, s = e.length) { const n = []; let l = 0, r = 0, o = 0, h = 0; const u = 1 / t; for (let s = 0; s < t - 1; ++s)
            l += s + 1, r += (s + 1) * (s + 1), h += e[s] * (s + 1), o += e[s]; l += t, r += t * t; const i = 1 / (t * r - l * l); for (let r = t - 1; r < s; ++r) {
            h += e[r] * t, o += e[r];
            const s = (t * h - l * o) * i, p = (o - s * l) * u;
            n.push(p + s * t), h -= o, o -= e[r - t + 1];
        } return n; }
        linregintercept(e, t, s = e.length) { const n = []; let l = 0, r = 0, o = 0, h = 0; const u = 1 / t; for (let s = 0; s < t - 1; ++s)
            l += s + 1, r += (s + 1) * (s + 1), h += e[s] * (s + 1), o += e[s]; l += t, r += t * t; const i = 1 / (t * r - l * l); for (let r = t - 1; r < s; ++r) {
            h += e[r] * t, o += e[r];
            const s = (t * h - l * o) * i, p = (o - s * l) * u;
            n.push(p + 1 * s), h -= o, o -= e[r - t + 1];
        } return n; }
        linregslope(e, t, s = e.length) { const n = []; let l = 0, r = 0, o = 0, h = 0; for (let s = 0; s < t - 1; ++s)
            l += s + 1, r += (s + 1) * (s + 1), h += e[s] * (s + 1), o += e[s]; l += t, r += t * t; const u = 1 / (t * r - l * l); for (let r = t - 1; r < s; ++r) {
            h += e[r] * t, o += e[r];
            const s = (t * h - l * o) * u;
            n.push(s), h -= o, o -= e[r - t + 1];
        } return n; }
        macd(e, t, s, n, l = e.length) { const r = [], o = [], h = [], u = 2 / (t + 1), i = 2 / (s + 1), p = 2 / (n + 1); let a = e[0], f = e[0], c = 0; for (let t = 1; t < l; ++t) {
            a = (e[t] - a) * u + a, f = (e[t] - f) * i + f;
            const n = a - f;
            t == s - 1 && (c = n), t >= s - 1 && (c = (n - c) * p + c, r.push(n), o.push(c), h.push(n - c));
        } return [r, o, h]; }
        marketfi(e, t, s, n = e.length) { const l = []; for (let r = 0; r < n; ++r)
            l.push((e[r] - t[r]) / s[r]); return l; }
        mass(e, t, s, n = e.length) { const l = []; let r = e[0] - t[0], o = r; const h = { index: 0, pushes: 0, size: s, sum: 0, vals: [] }; for (let u = 0; u < n; ++u)
            r = .8 * r + .2 * (e[u] - t[u]), 8 == u && (o = r), u >= 8 && (o = .8 * o + .2 * r, u >= 16 && (h.pushes >= h.size && (h.sum -= h.vals[h.index]), h.sum += r / o, h.vals[h.index] = r / o, h.pushes += 1, h.index = h.index + 1, h.index >= h.size && (h.index = 0), u >= 16 + s - 1 && l.push(h.sum))); return l; }
        max(e, t, s = e.length) { const n = []; let l, r = 0, o = -1, h = e[0]; for (let u = t - 1; u < s; ++u, ++r) {
            let t = e[u];
            if (o < r)
                for (o = r, h = e[o], l = r; ++l <= u;)
                    t = e[l], t >= h && (h = t, o = l);
            else
                t >= h && (o = u, h = t);
            n.push(h);
        } return n; }
        md(e, t, s = e.length) { const n = [], l = 1 / t; let r, o = 0; for (let h = 0; h < s; ++h) {
            o += e[h], h >= t && (o -= e[h - t]);
            const s = o * l;
            if (h >= t - 1) {
                let o = 0;
                for (r = 0; r < t; ++r)
                    o += Math.abs(s - e[h - r]);
                n.push(o * l);
            }
        } return n; }
        medprice(e, t, s = e.length) { const n = []; for (let l = 0; l < s; ++l)
            n.push(.5 * (e[l] + t[l])); return n; }
        mfi(e, t, s, n, l, r = e.length) { const o = []; let h = (e[0] + t[0] + s[0]) * (1 / 3); const u = { size: l, index: 0, pushes: 0, sum: 0, vals: [] }, i = { size: l, index: 0, pushes: 0, sum: 0, vals: [] }; for (let p = 1; p < r; ++p) {
            const r = (e[p] + t[p] + s[p]) * (1 / 3), a = r * n[p];
            r > h ? (u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += a, u.vals[u.index] = a, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += 0, i.vals[i.index] = 0, i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0)) : r < h ? (i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += a, i.vals[i.index] = a, i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0), u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += 0, u.vals[u.index] = 0, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0)) : (u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += 0, u.vals[u.index] = 0, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += 0, i.vals[i.index] = 0, i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0)), h = r, p >= l && o.push(u.sum / (u.sum + i.sum) * 100);
        } return o; }
        min(e, t, s = e.length) { const n = []; let l, r = 0, o = -1, h = e[0]; for (let u = t - 1; u < s; ++u, ++r) {
            let t = e[u];
            if (o < r)
                for (o = r, h = e[o], l = r; ++l <= u;)
                    t = e[l], t <= h && (h = t, o = l);
            else
                t <= h && (o = u, h = t);
            n.push(h);
        } return n; }
        mom(e, t, s = e.length) { const n = []; for (let l = t; l < s; ++l)
            n.push(e[l] - e[l - t]); return n; }
        msw(e, t, s = e.length) { const n = [], l = [], r = 3.1415926, o = 2 * r; let h, u, i, p, a = 0; for (let f = t; f < s; ++f) {
            for (u = 0, i = 0, p = 0; p < t; ++p)
                a = e[f - p], u += Math.cos(o * p / t) * a, i += Math.sin(o * p / t) * a;
            h = Math.abs(u) > .001 ? Math.atan(i / u) : o / 2 * (i < 0 ? -1 : 1), u < 0 && (h += r), h += r / 2, h < 0 && (h += o), h > o && (h -= o), n.push(Math.sin(h)), l.push(Math.sin(h + r / 4));
        } return [n, l]; }
        natr(e, t, s, n, l = e.length) { const r = [], o = 1 / n; let h, u = 0; u += e[0] - t[0]; for (let l = 1; l < n; ++l) {
            const n = t[l], r = e[l], o = s[l - 1], i = Math.abs(r - o), p = Math.abs(n - o);
            let a = r - n;
            i > a && (a = i), p > a && (a = p), h = a, u += h;
        } let i = u / n; r.push(100 * i / s[n - 1]); for (let u = n; u < l; ++u) {
            const n = t[u], l = e[u], p = s[u - 1], a = Math.abs(l - p), f = Math.abs(n - p);
            let c = l - n;
            a > c && (c = a), f > c && (c = f), h = c, i = (h - i) * o + i, r.push(100 * i / s[u]);
        } return r; }
        nvi(e, t, s = e.length) { const n = []; let l = 1e3; n.push(l); for (let r = 1; r < s; ++r)
            t[r] < t[r - 1] && (l += (e[r] - e[r - 1]) / e[r - 1] * l), n.push(l); return n; }
        obv(e, t, s = e.length) { const n = []; let l = 0; n.push(l); let r = e[0]; for (let o = 1; o < s; ++o)
            e[o] > r ? l += t[o] : e[o] < r && (l -= t[o]), r = e[o], n.push(l); return n; }
        ppo(e, t, s, n = e.length) { const l = [], r = 2 / (t + 1), o = 2 / (s + 1); let h = e[0], u = e[0]; for (let t = 1; t < n; ++t) {
            h = (e[t] - h) * r + h, u = (e[t] - u) * o + u;
            const s = 100 * (h - u) / u;
            l.push(s);
        } return l; }
        psar(e, t, s, n, l = e.length) { const r = []; let o, h, u; o = e[0] + t[0] <= e[1] + t[1] ? 1 : 0, o ? (u = e[0], h = t[0]) : (u = t[0], h = e[0]); let i = s; for (let p = 1; p < l; ++p)
            h = (u - h) * i + h, o ? (p >= 2 && h > t[p - 2] && (h = t[p - 2]), h > t[p - 1] && (h = t[p - 1]), i < n && e[p] > u && (i += s, i > n && (i = n)), e[p] > u && (u = e[p])) : (p >= 2 && h < e[p - 2] && (h = e[p - 2]), h < e[p - 1] && (h = e[p - 1]), i < n && t[p] < u && (i += s, i > n && (i = n)), t[p] < u && (u = t[p])), (o && t[p] < h || !o && e[p] > h) && (i = s, h = u, o = !o, u = o ? e[p] : t[p]), r.push(h); return r; }
        pvi(e, t, s = e.length) { const n = []; let l = 1e3; n.push(l); for (let r = 1; r < s; ++r)
            t[r] > t[r - 1] && (l += (e[r] - e[r - 1]) / e[r - 1] * l), n.push(l); return n; }
        qstick(e, t, s, n = t.length) { const l = [], r = 1 / s; let o, h = 0; for (o = 0; o < s; ++o)
            h += t[o] - e[o]; for (l.push(h * r), o = s; o < n; ++o)
            h += t[o] - e[o], h -= t[o - s] - e[o - s], l.push(h * r); return l; }
        roc(e, t, s = e.length) { const n = []; for (let l = t; l < s; ++l)
            n.push((e[l] - e[l - t]) / e[l - t]); return n; }
        rocr(e, t, s = e.length) { const n = []; for (let l = t; l < s; ++l)
            n.push(e[l] / e[l - t]); return n; }
        rsi(e, t, s = e.length) { const n = [], l = 1 / t; let r = 0, o = 0; for (let s = 1; s <= t; ++s)
            r += e[s] > e[s - 1] ? e[s] - e[s - 1] : 0, o += e[s] < e[s - 1] ? e[s - 1] - e[s] : 0; r /= t, o /= t, n.push(r / (r + o) * 100); for (let h = t + 1; h < s; ++h)
            r = ((e[h] > e[h - 1] ? e[h] - e[h - 1] : 0) - r) * l + r, o = ((e[h] < e[h - 1] ? e[h - 1] - e[h] : 0) - o) * l + o, n.push(r / (r + o) * 100); return n; }
        sma(e, t, s = e.length) { const n = [], l = 1 / t; let r = 0; for (let s = 0; s < t; ++s)
            r += e[s]; n.push(r * l); for (let o = t; o < s; ++o)
            r += e[o], r -= e[o - t], n.push(r * l); return n; }
        stddev(e, t, s = e.length) { const n = [], l = 1 / t; let r = 0, o = 0; for (let s = 0; s < t; ++s)
            r += e[s], o += e[s] * e[s]; let h = o * l - r * l * (r * l); h > 0 && (h = Math.sqrt(h)), n.push(h); for (let h = t; h < s; ++h) {
            r += e[h], o += e[h] * e[h], r -= e[h - t], o -= e[h - t] * e[h - t];
            let s = o * l - r * l * (r * l);
            s > 0 && (s = Math.sqrt(s)), n.push(s);
        } return n; }
        stderr(e, t, s = e.length) { const n = [], l = 1 / t; let r = 0, o = 0; const h = 1 / Math.sqrt(t); for (let s = 0; s < t; ++s)
            r += e[s], o += e[s] * e[s]; let u = o * l - r * l * (r * l); u > 0 && (u = Math.sqrt(u)), n.push(h * u); for (let u = t; u < s; ++u) {
            r += e[u], o += e[u] * e[u], r -= e[u - t], o -= e[u - t] * e[u - t];
            let s = o * l - r * l * (r * l);
            s > 0 && (s = Math.sqrt(s)), n.push(h * s);
        } return n; }
        stoch(e, t, s, n, l, r, o = e.length) { const h = 1 / l, u = 1 / r, i = [], p = []; let a, f = 0, c = -1, d = -1, x = e[0], g = t[0]; const m = { size: l, index: 0, pushes: 0, sum: 0, vals: [] }, v = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }; let M; for (let z = 0; z < o; ++z) {
            if (z >= n && ++f, a = e[z], c < f)
                for (c = f, x = e[c], M = f; ++M <= z;)
                    a = e[M], a >= x && (x = a, c = M);
            else
                a >= x && (c = z, x = a);
            if (a = t[z], d < f)
                for (d = f, g = t[d], M = f; ++M <= z;)
                    a = t[M], a <= g && (g = a, d = M);
            else
                a <= g && (d = z, g = a);
            const o = x - g, b = 0 == o ? 0 : (s[z] - g) / o * 100;
            if (m.pushes >= m.size && (m.sum -= m.vals[m.index]), m.sum += b, m.vals[m.index] = b, m.pushes += 1, m.index = m.index + 1, m.index >= m.size && (m.index = 0), z >= n - 1 + l - 1) {
                const e = m.sum * h;
                v.pushes >= v.size && (v.sum -= v.vals[v.index]), v.sum += e, v.vals[v.index] = e, v.pushes += 1, v.index = v.index + 1, v.index >= v.size && (v.index = 0), z >= n - 1 + l - 1 + r - 1 && (i.push(e), p.push(v.sum * u));
            }
        } return [i, p]; }
        stochrsi(e, t, s = e.length) { const n = [], l = 1 / t, r = { size: t, index: 0, pushes: 0, sum: 0, vals: [] }; let o = 0, h = 0; for (let s = 1; s <= t; ++s)
            o += e[s] > e[s - 1] ? e[s] - e[s - 1] : 0, h += e[s] < e[s - 1] ? e[s - 1] - e[s] : 0; o /= t, h /= t; let u = o / (o + h) * 100; r.pushes >= r.size && (r.sum -= r.vals[r.index]), r.sum += u, r.vals[r.index] = u, r.pushes += 1, r.index = r.index + 1, r.index >= r.size && (r.index = 0); let i = u, p = u, a = 0, f = 0; for (let c = t + 1; c < s; ++c) {
            if (o = ((e[c] > e[c - 1] ? e[c] - e[c - 1] : 0) - o) * l + o, h = ((e[c] < e[c - 1] ? e[c - 1] - e[c] : 0) - h) * l + h, u = o / (o + h) * 100, u > p)
                p = u, f = r.index;
            else if (f == r.index) {
                p = u;
                for (let e = 0; e < r.size; ++e)
                    e != r.index && r.vals[e] > p && (p = r.vals[e], f = e);
            }
            if (u < i)
                i = u, a = r.index;
            else if (a == r.index) {
                i = u;
                for (let e = 0; e < r.size; ++e)
                    e != r.index && r.vals[e] < i && (i = r.vals[e], a = e);
            }
            if (r.vals[r.index] = u, r.index = r.index + 1, r.index >= r.size && (r.index = 0), c > 2 * t - 2) {
                const e = p - i;
                0 == e ? n.push(0) : n.push((u - i) / e);
            }
        } return n; }
        sum(e, t, s = e.length) { const n = []; let l = 0; for (let s = 0; s < t; ++s)
            l += e[s]; n.push(l); for (let r = t; r < s; ++r)
            l += e[r], l -= e[r - t], n.push(l); return n; }
        tema(e, t, s = e.length) { const n = [], l = 2 / (t + 1), r = 1 - l; let o = e[0], h = 0, u = 0; for (let i = 0; i < s; ++i)
            o = o * r + e[i] * l, i == t - 1 && (h = o), i >= t - 1 && (h = h * r + o * l, i == 2 * (t - 1) && (u = h), i >= 2 * (t - 1) && (u = u * r + h * l, i >= 3 * (t - 1) && n.push(3 * o - 3 * h + u))); return n; }
        tr(e, t, s, n = e.length) { const l = []; let r; l[0] = e[0] - t[0]; for (let o = 1; o < n; ++o) {
            const n = t[o], h = e[o], u = s[o - 1], i = Math.abs(h - u), p = Math.abs(n - u);
            let a = h - n;
            i > a && (a = i), p > a && (a = p), r = a, l.push(r);
        } return l; }
        trima(e, t, s = e.length) { const n = [], l = 1 / (t % 2 ? (t / 2 + 1) * (t / 2 + 1) : t / 2 * (t / 2 + 1)); let r = 0, o = 0, h = 0; const u = t % 2 ? t / 2 : t / 2 - 1, i = u + 1; let p = 1; for (let s = 0; s < t - 1; ++s)
            r += e[s] * p, s + 1 > t - u && (o += e[s]), s + 1 <= i && (h += e[s]), s + 1 < i && ++p, s + 1 >= t - u && --p; let a = t - 1 - u + 1, f = t - 1 - t + 1 + i, c = t - 1 - t + 1; for (let u = t - 1; u < s; ++u)
            r += e[u], n.push(r * l), o += e[u], r += o, r -= h, o -= e[a++], h += e[f++], h -= e[c++]; return n; }
        trix(e, t, s = e.length) { const n = [], l = 3 * t - 2, r = 2 / (t + 1); let o = e[0], h = 0, u = 0; for (let s = 1; s < l; ++s)
            o = (e[s] - o) * r + o, s == t - 1 ? h = o : s > t - 1 && (h = (o - h) * r + h, s == 2 * t - 2 ? u = h : s > 2 * t - 2 && (u = (h - u) * r + u)); for (let t = l; t < s; ++t) {
            o = (e[t] - o) * r + o, h = (o - h) * r + h;
            const s = u;
            u = (h - u) * r + u, n.push((u - s) / u * 100);
        } return n; }
        tsf(e, t, s = e.length) { const n = []; let l = 0, r = 0, o = 0, h = 0; const u = 1 / t; for (let s = 0; s < t - 1; ++s)
            l += s + 1, r += (s + 1) * (s + 1), h += e[s] * (s + 1), o += e[s]; l += t, r += t * t; const i = 1 / (t * r - l * l); for (let r = t - 1; r < s; ++r) {
            h += e[r] * t, o += e[r];
            const s = (t * h - l * o) * i, p = (o - s * l) * u;
            n.push(p + s * (t + 1)), h -= o, o -= e[r - t + 1];
        } return n; }
        typprice(e, t, s, n = e.length) { const l = []; for (let r = 0; r < n; ++r)
            l.push((e[r] + t[r] + s[r]) * (1 / 3)); return l; }
        ultosc(e, t, s, n, l, r, o = e.length) { const h = [], u = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }, i = { size: r, index: 0, pushes: 0, sum: 0, vals: [] }; let p = 0, a = 0, f = 0, c = 0; for (let d = 1; d < o; ++d) {
            const o = t[d] < s[d - 1] ? t[d] : s[d - 1], x = e[d] > s[d - 1] ? e[d] : s[d - 1], g = s[d] - o, m = x - o;
            if (p += g, a += g, f += m, c += m, u.pushes >= u.size && (u.sum -= u.vals[u.index]), u.sum += g, u.vals[u.index] = g, u.pushes += 1, u.index = u.index + 1, u.index >= u.size && (u.index = 0), i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += m, i.vals[i.index] = m, i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0), d > n) {
                let e = u.index - n - 1;
                if (e < 0 && (e += r), p -= u.vals[e], f -= i.vals[e], d > l) {
                    let e = u.index - l - 1;
                    e < 0 && (e += r), a -= u.vals[e], c -= i.vals[e];
                }
            }
            if (d >= r) {
                const e = 100 * (4 * p / f + 2 * a / c + 1 * u.sum / i.sum) / 7;
                h.push(e);
            }
        } return h; }
        var(e, t, s = e.length) { const n = [], l = 1 / t; let r = 0, o = 0; for (let s = 0; s < t; ++s)
            r += e[s], o += e[s] * e[s]; n.push(o * l - r * l * (r * l)); for (let h = t; h < s; ++h)
            r += e[h], o += e[h] * e[h], r -= e[h - t], o -= e[h - t] * e[h - t], n.push(o * l - r * l * (r * l)); return n; }
        vhf(e, t, s = e.length) { const n = []; let l, r, o, h = 1, u = -1, i = -1, p = e[0], a = e[0], f = 0, c = e[0]; for (let s = 1; s < t; ++s)
            r = e[s], f += Math.abs(r - c), c = r; for (let d = t; d < s; ++d, ++h) {
            if (r = e[d], f += Math.abs(r - c), c = r, d > t && (f -= Math.abs(e[d - t] - e[d - t - 1])), l = r, u < h)
                for (u = h, p = e[u], o = h; ++o <= d;)
                    l = e[o], l >= p && (p = l, u = o);
            else
                l >= p && (u = d, p = l);
            if (l = r, i < h)
                for (i = h, a = e[i], o = h; ++o <= d;)
                    l = e[o], l <= a && (a = l, i = o);
            else
                l <= a && (i = d, a = l);
            n.push(Math.abs(p - a) / f);
        } return n; }
        vidya(e, t, s, n, l = e.length) { const r = [], o = 1 / t, h = 1 / s; let u = 0, i = 0, p = 0, a = 0; for (let n = 0; n < s; ++n)
            p += e[n], a += e[n] * e[n], n >= s - t && (u += e[n], i += e[n] * e[n]); let f = e[s - 2]; if (r.push(f), s - 1 < l) {
            let t = Math.sqrt(i * o - u * o * (u * o)) / Math.sqrt(a * h - p * h * (p * h));
            t != t && (t = 0), t *= n, f = (e[s - 1] - f) * t + f, r.push(f);
        } for (let c = s; c < l; ++c) {
            p += e[c], a += e[c] * e[c], u += e[c], i += e[c] * e[c], p -= e[c - s], a -= e[c - s] * e[c - s], u -= e[c - t], i -= e[c - t] * e[c - t];
            let l = Math.sqrt(i * o - u * o * (u * o)) / Math.sqrt(a * h - p * h * (p * h));
            l != l && (l = 0), l *= n, f = (e[c] - f) * l + f, r.push(f);
        } return r; }
        volatility(e, t, s = e.length) { const n = [], l = 1 / t, r = Math.sqrt(252); let o = 0, h = 0; for (let s = 1; s <= t; ++s) {
            const t = e[s] / e[s - 1] - 1;
            o += t, h += t * t;
        } n.push(Math.sqrt(h * l - o * l * (o * l)) * r); for (let u = t + 1; u < s; ++u) {
            const s = e[u] / e[u - 1] - 1;
            o += s, h += s * s;
            const i = e[u - t] / e[u - t - 1] - 1;
            o -= i, h -= i * i, n.push(Math.sqrt(h * l - o * l * (o * l)) * r);
        } return n; }
        vosc(e, t, s, n = e.length) { const l = [], r = 1 / t, o = 1 / s; let h = 0, u = 0; for (let n = 0; n < s; ++n)
            n >= s - t && (h += e[n]), u += e[n]; const i = h * r, p = u * o; l.push(100 * (i - p) / p); for (let i = s; i < n; ++i) {
            h += e[i], h -= e[i - t], u += e[i], u -= e[i - s];
            const n = h * r, p = u * o;
            l.push(100 * (n - p) / p);
        } return l; }
        vwma(e, t, s, n = e.length) { const l = []; let r = 0, o = 0; for (let n = 0; n < s; ++n)
            r += e[n] * t[n], o += t[n]; l.push(r / o); for (let h = s; h < n; ++h)
            r += e[h] * t[h], r -= e[h - s] * t[h - s], o += t[h], o -= t[h - s], l.push(r / o); return l; }
        wad(e, t, s, n = e.length) { const l = []; let r = 0, o = s[0]; for (let h = 1; h < n; ++h) {
            const n = s[h];
            n > o ? r += n - (o < t[h] ? o : t[h]) : n < o && (r += n - (o > e[h] ? o : e[h])), l.push(r), o = s[h];
        } return l; }
        wcprice(e, t, s, n = e.length) { const l = []; for (let r = 0; r < n; ++r)
            l.push(.25 * (e[r] + t[r] + s[r] + s[r])); return l; }
        wilders(e, t, s = e.length) { const n = [], l = 1 / t; let r = 0; for (let s = 0; s < t; ++s)
            r += e[s]; let o = r / t; n.push(o); for (let r = t; r < s; ++r)
            o = (e[r] - o) * l + o, n.push(o); return n; }
        willr(e, t, s, n, l = e.length) { const r = []; let o, h, u = 0, i = -1, p = -1, a = e[0], f = t[0]; for (let c = n - 1; c < l; ++c, ++u) {
            if (o = e[c], i < u)
                for (i = u, a = e[i], h = u; ++h <= c;)
                    o = e[h], o >= a && (a = o, i = h);
            else
                o >= a && (i = c, a = o);
            if (o = t[c], p < u)
                for (p = u, f = t[p], h = u; ++h <= c;)
                    o = t[h], o <= f && (f = o, p = h);
            else
                o <= f && (p = c, f = o);
            const n = a - f, l = 0 == n ? 0 : (a - s[c]) / n * -100;
            r.push(l);
        } return r; }
        wma(e, t, s = e.length) { const n = [], l = t * (t + 1) / 2; let r = 0, o = 0; for (let s = 0; s < t - 1; ++s)
            o += e[s] * (s + 1), r += e[s]; for (let h = t - 1; h < s; ++h)
            o += e[h] * t, r += e[h], n.push(o / l), o -= r, r -= e[h - t + 1]; return n; }
        zlema(e, t, s = e.length) { const n = Math.floor((t - 1) / 2), l = [], r = 2 / (t + 1); let o, h = e[n - 1]; for (l.push(h), o = n; o < s; ++o) {
            const t = e[o];
            h = (t + (t - e[o - n]) - h) * r + h, l.push(h);
        } return l; }
        abands(e, t, s, n, l = e.length) { const r = [], o = [], h = [], u = 1 / n, i = { size: n, index: 0, pushes: 0, sum: 0, vals: [] }, p = { size: n, index: 0, pushes: 0, sum: 0, vals: [] }; let a = 0; for (let l = 0; l < n; ++l) {
            const n = 4 * (e[l] - t[l]) / (e[l] + t[l]), r = (1 + n) * e[l];
            i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += r, i.vals[i.index] = r, i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0);
            const o = (1 - n) * t[l];
            p.pushes >= p.size && (p.sum -= p.vals[p.index]), p.sum += o, p.vals[p.index] = o, p.pushes += 1, p.index = p.index + 1, p.index >= p.size && (p.index = 0), a += s[l];
        } r.push(i.sum * u), o.push(p.sum * u), h.push(a * u); for (let f = n; f < l; ++f) {
            const l = 4 * (e[f] - t[f]) / (e[f] + t[f]), c = (1 + l) * e[f];
            i.pushes >= i.size && (i.sum -= i.vals[i.index]), i.sum += c, i.vals[i.index] = c, i.pushes += 1, i.index = i.index + 1, i.index >= i.size && (i.index = 0);
            const d = (1 - l) * t[f];
            p.pushes >= p.size && (p.sum -= p.vals[p.index]), p.sum += d, p.vals[p.index] = d, p.pushes += 1, p.index = p.index + 1, p.index >= p.size && (p.index = 0), a += s[f] - s[f - n], r.push(i.sum * u), o.push(p.sum * u), h.push(a * u);
        } return [r, o, h]; }
        alma(e, t, s, n, l = e.length) { const r = [], o = [], h = Math.floor(s * (t - 1)), u = t / n; let i = 0; for (let e = 0; e < t; e++)
            o[e] = Math.exp(-1 * Math.pow(e - h, 2) / (2 * Math.pow(u, 2))), i += o[e]; for (let e = 0; e < t; e++)
            o[e] /= i; for (let s = t - 1; s < l; s++) {
            let n = 0;
            for (let l = 0; l < t; l++)
                n += e[s - t + l + 1] * o[l];
            r.push(n);
        } return r; }
        ce(e, t, s, n, l, r = e.length) { const o = [], h = []; let u, i, p = e[0] - t[0], a = e[0], f = 0, c = t[0], d = 0; for (let l = 1; l < n; ++l) {
            const n = t[l], r = e[l], o = s[l - 1], h = Math.abs(r - o), x = Math.abs(n - o);
            let g = r - n;
            h > g && (g = h), x > g && (g = x), u = g, p += u, a <= (i = e[l]) && (a = i, f = l), c >= (i = t[l]) && (c = i, d = l);
        } p /= n; const x = (n - 1) / n, g = 1 / n; o.push(a - l * p), h.push(c + l * p); for (let m = n; m < r; ++m) {
            const r = t[m], v = e[m], M = s[m - 1], z = Math.abs(v - M), b = Math.abs(r - M);
            let q = v - r;
            if (z > q && (q = z), b > q && (q = b), u = q, p = p * x + u * g, a <= (i = e[m]))
                a = i, f = m;
            else if (f == m - n) {
                a = e[m - n + 1], f = m - n + 1;
                for (let t = m - n + 2; t <= m; ++t)
                    a <= (i = e[t]) && (a = i, f = t);
            }
            if (c >= (i = t[m]))
                c = i, d = m;
            else if (d == m - n) {
                c = t[m - n + 1], d = m - n + 1;
                for (let e = m - n + 2; e <= m; ++e)
                    c >= (i = t[e]) && (c = i, d = e);
            }
            o.push(a - l * p), h.push(c + l * p);
        } return [o, h]; }
        cmf(e, t, s, n, l, r = e.length) { const o = []; let h = 0, u = 0; for (let r = 0; r < l - 1; ++r)
            u += e[r] - t[r] ? n[r] * (s[r] - t[r] - (e[r] - s[r])) / (e[r] - t[r]) : 0, h += n[r]; for (let i = l - 1; i < r; ++i)
            u += e[i] - t[i] ? n[i] * (s[i] - t[i] - (e[i] - s[i])) / (e[i] - t[i]) : 0, h += n[i], o.push(u / h), u -= e[i - l + 1] - t[i - l + 1] ? n[i - l + 1] * (s[i - l + 1] - t[i - l + 1] - (e[i - l + 1] - s[i - l + 1])) / (e[i - l + 1] - t[i - l + 1]) : 0, h -= n[i - l + 1]; return o; }
        copp(e, t, s) { const n = new Array(e.length), l = new Array(e.length), r = new Array(e.length); for (let o = 0; o < e.length; o++)
            n[o] = o < t - 1 ? null : (e[o] - e[o - t]) / e[o - t] * 100, l[o] = o < s - 1 ? null : (e[o] - e[o - s]) / e[o - s] * 100, r[o] = 10 * (n[o] + l[o]); return r; }
        dc(e, t, s) { const n = [], l = [], r = []; for (let o = s - 1; o < e.length; o++)
            n.push(Math.max(...e.slice(o - s + 1, o + 1))), l.push(Math.min(...t.slice(o - s + 1, o + 1))), r.push((n[n.length - 1] + l[l.length - 1]) / 2); return [n, r, l]; }
        fi(e, t, s, n = e.length) { const l = [], r = 2 / (s + 1); let o = t[1] * (e[1] - e[0]); for (let s = 1; s < n; ++s)
            o = (t[s] * (e[s] - e[s - 1]) - o) * r + o, l.push(o); return l; }
        ikhts() { }
        kc(e, t, s, n, l, r = e.length) { const o = [], h = [], u = [], i = 2 / (n + 1); let p = s[0], a = e[0] - t[0]; o.push(p - l * a), h.push(p), u.push(p + l * a); let f = 0; for (let n = 1; n < r; ++n) {
            p = (s[n] - p) * i + p;
            const r = t[n], c = e[n], d = s[n - 1], x = Math.abs(c - d), g = Math.abs(r - d);
            let m = c - r;
            x > m && (m = x), g > m && (m = g), f = m, a = (f - a) * i + a, o.push(p - l * a), h.push(p), u.push(p + l * a);
        } return [o, h, u]; }
        kst(e, t, s, n, l, r, o, h, u, i = e.length) { const p = [], a = []; let f = r; f < o && (f = o), f < h && (f = h), f < u && (f = u); const c = 2 / (r + 1), d = 2 / (o + 1), x = 2 / (h + 1), g = 2 / (u + 1); function m(t, s) { return (e[t] - e[t - s]) / e[t - s]; } let v = m(t, t), M = m(s, s), z = m(n, n), b = m(l, l); for (let e = t + 1; e < l + 1 && e < i; ++e)
            v = (m(e, t) - v) * c + v; for (let e = s + 1; e < l + 1 && e < i; ++e)
            M = (m(e, s) - M) * d + M; for (let e = n + 1; e < l + 1 && e < i; ++e)
            z = (m(e, n) - z) * x + z; for (let e = l + 1; e < l + 1 && e < i; ++e)
            b = (m(e, l) - b) * g + b; let q = (1 * v + 2 * M + 3 * z + 4 * b) / 10; a.push(q); let w = q; p.push(w); for (let e = l + 1; e < i; ++e)
            v = (m(e, t) - v) * c + v, M = (m(e, s) - M) * d + M, z = (m(e, n) - z) * x + z, b = (m(e, l) - b) * g + b, q = (1 * v + 2 * M + 3 * z + 4 * b) / 10, p.push(q), w = .2 * (q - w) + w, a.push(w); return [p, a]; }
        mama() { }
        pbands(e, t, s, n, l = e.length) { const r = [], o = []; let h = 0, u = 0; const i = n * (n + 1) / 2, p = n * (n + 1) * (2 * n + 1) / 6; let a; for (a = 0; a < n; ++a)
            u += s[a] * (a + 1), h += s[a]; --a; const f = (u / n - i / n * h / n) / (p / n - i / n * (i / n)); let c = e[a]; for (let t = 1; t < n; ++t)
            c < e[a - t] + t * f && (c = e[a - t] + t * f); let d = t[a]; for (let e = 1; e < n; ++e)
            d > t[a - e] + e * f && (d = t[a - e] + e * f); for (o.push(c), r.push(d), ++a; a < l; ++a) {
            u += -h + s[a] * n, h += -s[a - n] + s[a];
            const l = (u / n - i / n * h / n) / (p / n - i / n * (i / n));
            let f = e[a];
            for (let t = 1; t < n; ++t)
                f < e[a - t] + t * l && (f = e[a - t] + t * l);
            let c = t[a];
            for (let e = 1; e < n; ++e)
                c > t[a - e] + e * l && (c = t[a - e] + e * l);
            r.push(c), o.push(f);
        } return [r, o]; }
        pc() { }
        pfe(e, t, s, n = e.length) { const l = [], r = 2 / (s + 1), o = { size: t, index: 0, pushes: 0, sum: 0, vals: [] }; let h; for (h = 1; h < t; ++h)
            o.pushes >= o.size && (o.sum -= o.vals[o.index]), o.sum += Math.sqrt(Math.pow(e[h] - e[h - 1], 2) + 1), o.vals[o.index] = Math.sqrt(Math.pow(e[h] - e[h - 1], 2) + 1), o.pushes += 1, o.index = o.index + 1, o.index >= o.size && (o.index = 0); o.pushes >= o.size && (o.sum -= o.vals[o.index]), o.sum += Math.sqrt(Math.pow(e[h] - e[h - 1], 2) + 1), o.vals[o.index] = Math.sqrt(Math.pow(e[h] - e[h - 1], 2) + 1), o.pushes += 1, o.index = o.index + 1, o.index >= o.size && (o.index = 0); let u = 100 * (e[h] - e[h - t] > 0 ? 1 : -1) * Math.sqrt(Math.pow(e[h] - e[h - t], 2) + 100) / o.sum; for (l.push(u), h = t + 1; h < n; ++h)
            o.pushes >= o.size && (o.sum -= o.vals[o.index]), o.sum += Math.sqrt(Math.pow(e[h] - e[h - 1], 2) + 1), o.vals[o.index] = Math.sqrt(Math.pow(e[h] - e[h - 1], 2) + 1), o.pushes += 1, o.index = o.index + 1, o.index >= o.size && (o.index = 0), u = (100 * (e[h] - e[h - t] > 0 ? 1 : -1) * Math.sqrt(Math.pow(e[h] - e[h - t], 2) + 100) / o.sum - u) * r + u, l.push(u); return l; }
        posc(e, t, s, n, l, r = e.length) { const o = []; let h, u = 0, i = 0; const p = n * (n + 1) / 2, a = n * (n + 1) * (2 * n + 1) / 6; let f; for (f = 0; f < n; ++f)
            i += s[f] * (f + 1), u += s[f]; --f; const c = (i / n - p / n * u / n) / (a / n - p / n * (p / n)); let d = e[f]; for (let t = 1; t < n; ++t)
            d < e[f - t] + t * c && (d = e[f - t] + t * c); let x = t[f]; for (let e = 1; e < n; ++e)
            x > t[f - e] + e * c && (x = t[f - e] + e * c); for (h = (s[f] - x) / (d - x) * 100, o.push(h), ++f; f < r; ++f) {
            i += -u + s[f] * n, u += -s[f - n] + s[f];
            const r = (i / n - p / n * u / n) / (a / n - p / n * (p / n));
            let c = e[f];
            for (let t = 1; t < n; ++t)
                c < e[f - t] + t * r && (c = e[f - t] + t * r);
            let d = t[f];
            for (let e = 1; e < n; ++e)
                d > t[f - e] + e * r && (d = t[f - e] + e * r);
            h = 2 * ((s[f] - d) / (c - d) * 100 - h) / (1 + l) + h, o.push(h);
        } return o; }
        rmi(e, t, s, n = e.length) { const l = []; let r, o, h = s; for (r = 0 > e[h] - e[h - s] ? 0 : e[h] - e[h - s], o = 0 > e[h - s] - e[h] ? 0 : e[h - s] - e[h], ++h, l.push(r / (r + o) * 100); h < n; ++h)
            r = 2 * (0 > e[h] - e[h - s] ? 0 : e[h] - e[h - s] - r) / (1 + t) + r, o = 2 * (0 > e[h - s] - e[h] ? 0 : e[h - s] - e[h] - o) / (1 + t) + o, l.push(r / (r + o) * 100); return l; }
        rmta(e, t, s, n = e.length) { const l = [], r = 1 - s; let o = (1 - r) * e[0] + e[0], h = (1 - r) * e[0] + r * (e[0] + o); for (let s = 1; s < t - 1; ++s) {
            const t = (1 - r) * o + e[s];
            h = (1 - r) * h + r * (e[s] + t - o), o = t;
        } for (let s = t - 1; s < n; ++s) {
            const t = (1 - r) * o + e[s];
            h = (1 - r) * h + r * (e[s] + t - o), o = t, l.push(h);
        } return l; }
        rvi(e, t, s, n = e.length) { const l = []; let r = 0, o = 0; const h = s * (s + 1) / 2, u = s * (s + 1) * (2 * s + 1) / 6; let i = 0, p = 0, a = 0; for (; a < s; ++a)
            o += e[a] * (a + 1), r += e[a]; --a; const f = (o / s - h / s * r / s) / (u / s - h / s * (h / s)), c = r / s - f * h / s, d = e[a] - (c + f * s); for (d > 0 ? i = d * d / s : p = d * d / s, i + p == 0 ? l.push(50) : l.push(i / (i + p) * 100), ++a; a < n; ++a) {
            o += -r + e[a] * s, r += -e[a - s] + e[a];
            const n = (o / s - h / s * r / s) / (u / s - h / s * (h / s)), f = r / s - n * h / s, c = e[a] - (f + n * s);
            c > 0 ? i = 2 * (c * c / s - i) / (t + 1) + i : p = 2 * (c * c / s - p) / (t + 1) + p, i + p == 0 ? l.push(50) : l.push(i / (i + p) * 100);
        } return l; }
        smi(e, t, s, n, l, r, o = e.length) { const h = []; let u = 1 - n, i = NaN, p = NaN, a = NaN, f = NaN, c = 0, d = 0, x = 0, g = 0, m = 0, v = 0; for (; v < o && u == 1 - n; ++v, ++u)
            d = e[v], x = u, c = t[v], g = u; for (; v < o && u < 0; ++v, ++u)
            d <= e[v] && (d = e[v], x = u), c >= t[v] && (c = t[v], g = u); for (; v < o && 0 == u; ++v, ++u)
            d <= e[v] && (d = e[v], x = u), c >= t[v] && (c = t[v], g = u), i = p = s[v] - .5 * (d + c), a = f = d - c, h.push(100 * p / (.5 * f)); for (; v < o; ++v, ++u) {
            if (x == u - n) {
                d = e[v], x = u;
                for (let t = 1; t < n; ++t)
                    m = e[v - t], m > d && (d = m, x = u - t);
            }
            else
                d <= e[v] && (d = e[v], x = u);
            if (g == u - n) {
                c = t[v], g = u;
                for (let e = 1; e < n; ++e)
                    m = t[v - e], m < c && (c = m, g = u - e);
            }
            else
                c >= t[v] && (c = t[v], g = u);
            i = (s[v] - .5 * (d + c) - i) * (2 / (1 + l)) + i, p = 2 / (1 + r) * (i - p) + p, a = 2 / (1 + l) * (d - c - a) + a, f = 2 / (1 + r) * (a - f) + f, h.push(100 * p / (.5 * f));
        } return h; }
        tsi(e, t, s, n = e.length) { const l = []; let r = -1, o = 0, h = 0, u = 0, i = 0, p = 0, a = 0; for (; a < n && -1 == r; ++a, ++r)
            o = e[a]; for (; a < n && 0 == r; ++a, ++r)
            u = h = e[a] - o, p = i = Math.abs(e[a] - o), l.push(100 * (p ? u / p : 0)), o = e[a]; for (; a < n; ++a, ++r)
            h = 2 * (e[a] - o - h) / (1 + t) + h, i = 2 * (Math.abs(e[a] - o) - i) / (1 + t) + i, u = 2 * (h - u) / (1 + s) + u, p = 2 * (i - p) / (1 + s) + p, l.push(100 * (p ? u / p : 0)), o = e[a]; return l; }
        vwap(e, t, s, n, l, r = e.length) { const o = []; let h = 1 - l, u = 0, i = 0, p = 0; for (; p < r && h < 1; ++p, ++h)
            u += (e[p] + t[p] + s[p]) / 3 * n[p], i += n[p]; for (p > 0 && 1 == h && o.push(u / i); p < r; ++p, ++h)
            u += (e[p] + t[p] + s[p]) / 3 * n[p] - (e[p - l] + t[p - l] + s[p - l]) / 3 * n[p - l], i += n[p] - n[p - l], o.push(u / i); return o; }
    }; })(), n;
})()));
