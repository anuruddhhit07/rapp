export const __esModule: boolean;
export class Indicators {
    /**
     * @param originalLength - example 100
     * @param source - example ema | sma | rsi | etc.
     * @param empty - example NaN | Null | 0 | false | etc.
     * @returns
     */
    normalize(originalLength: any, source: any, empty?: number): any;
    floor(x: any): number;
    sqrt(number: any, guess?: number): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param volume
     * @param size
     * @returns
     */
    ad(high: any, low: any, close: any, volume: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param volume
     * @param short_period
     * @param long_period
     * @param size
     * @returns
     */
    adosc(high: any, low: any, close: any, volume: any, short_period: any, long_period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    adx(high: any, low: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    adxr(high: any, low: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param size
     * @returns
     */
    ao(high: any, low: any, size?: any): any;
    /**
     *
     * @param source
     * @param short_period
     * @param long_period
     * @param size
     * @returns
     */
    apo(source: any, short_period: any, long_period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns First output = Aroon Down, Second output = Aroon Up
     */
    aroon(high: any, low: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    aroonosc(high: any, low: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns
     */
    atr(high: any, low: any, close: any, period: any, size?: any): any;
    /**
     *
     * @param open
     * @param high
     * @param low
     * @param close
     * @param size
     * @returns
     */
    avgprice(open: any, high: any, low: any, close: any, size?: any): any;
    /**
     * @param source
     * @param period
     * @param stddev
     * @param size
     * @returns [Lower, Middle, Upper]
     */
    bbands(source: any, period: any, stddev: any, size?: any): any;
    /**
     *
     * @param open
     * @param high
     * @param low
     * @param close
     * @param size
     * @returns
     */
    bop(open: any, high: any, low: any, close: any, size?: any): any;
    /**
     * @TODO Update TYPEPRICE
     * @Updated
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns
     */
    cci(high: any, low: any, close: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    cmo(source: any, period: any, size?: any): any;
    /**
     * @param a
     * @param b
     * @param size
     * @returns
     */
    crossany(a: any, b: any, size?: any): any;
    /**
     *
     * @param a
     * @param b
     * @param size
     * @returns
     */
    crossover(a: any, b: any, size?: any): any;
    /**
     * @param seriesA
     * @param number
     * @returns
     */
    crossOverNumber(seriesA: any, number: any): boolean[];
    /**
     *
     * @param seriesA
     * @param number
     * @returns
     */
    crossUnderNumber(seriesA: any, number: any): boolean[];
    /**
     * @Updated
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    cvi(high: any, low: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    _cvi(high: any, low: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    decay(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    dema(source: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns [Plus DI, Minus DI]
     */
    di(high: any, low: any, close: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns [Plus DM, Minus DM]
     */
    dm(high: any, low: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    dpo(source: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    dx(high: any, low: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    edecay(source: any, period: any, size?: any): any;
    /**
     * @param source
     * @param period
     * @param size
     * @returns
     */
    ema(source: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param volume
     * @param size
     * @returns
     */
    emv(high: any, low: any, volume: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns [fisher, signal]
     */
    fisher(high: any, low: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    fosc(source: any, period: any, size?: any): any;
    /**
     * Remove Buffer Call, Remove Math usage
     * @param input
     * @param period
     * @param size
     * @returns
     * @deprecated
     */
    DEP_hma(input: any, period: any, size?: any): any;
    /**
     * @param input
     * @param period
     * @param size
     * @returns
     */
    hma(input: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    kama(source: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param volume
     * @param short_period
     * @param long_period
     * @param size
     * @returns
     */
    kvo(high: any, low: any, close: any, volume: any, short_period: any, long_period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    lag(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    linreg(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    linregintercept(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    linregslope(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param short_period
     * @param long_period
     * @param signal_period
     * @param size
     * @returns [macd, signal, hist]
     */
    macd(source: any, short_period: any, long_period: any, signal_period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param volume
     * @param size
     * @returns
     */
    marketfi(high: any, low: any, volume: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    mass(high: any, low: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    max(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    md(source: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param size
     * @returns
     */
    medprice(high: any, low: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param volume
     * @param period
     * @param size
     * @returns
     */
    mfi(high: any, low: any, close: any, volume: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    min(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    mom(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    msw(source: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns
     */
    natr(high: any, low: any, close: any, period: any, size?: any): any;
    /**
     *
     * @param close
     * @param volume
     * @param size
     * @returns
     */
    nvi(close: any, volume: any, size?: any): any;
    /**
     *
     * @param close
     * @param volume
     * @param size
     * @returns
     */
    obv(close: any, volume: any, size?: any): any;
    /**
     *
     * @param source
     * @param short_period
     * @param long_period
     * @param size
     * @returns
     */
    ppo(source: any, short_period: any, long_period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param accel_step
     * @param accel_max
     * @param size
     * @returns
     */
    psar(high: any, low: any, accel_step: any, accel_max: any, size?: any): any;
    /**
     *
     * @param close
     * @param volume
     * @param size
     * @returns
     */
    pvi(close: any, volume: any, size?: any): any;
    /**
     *
     * @param open
     * @param close
     * @param period
     * @param size
     * @returns
     */
    qstick(open: any, close: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    roc(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    rocr(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    rsi(source: any, period: any, size?: any): any;
    /**
     * @param source
     * @param period
     * @param size
     * @returns
     */
    sma(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    stddev(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    stderr(source: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param kperiod
     * @param kslow
     * @param dperiod
     * @param size
     * @returns [stoch, stoch_ma]
     */
    stoch(high: any, low: any, close: any, kperiod: any, kslow: any, dperiod: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    stochrsi(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    sum(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    tema(source: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param size
     * @returns
     */
    tr(high: any, low: any, close: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    trima(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    trix(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    tsf(source: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param size
     */
    typprice(high: any, low: any, close: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param short_period
     * @param medium_period
     * @param long_period
     * @param size
     * @returns
     */
    ultosc(high: any, low: any, close: any, short_period: any, medium_period: any, long_period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    var(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    vhf(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param short_period
     * @param long_period
     * @param alpha
     * @param size
     * @returns
     */
    vidya(source: any, short_period: any, long_period: any, alpha: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    volatility(source: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param short_period
     * @param long_period
     * @param size
     * @returns
     */
    vosc(source: any, short_period: any, long_period: any, size?: any): any;
    /**
     *
     * @param source
     * @param volume
     * @param period
     * @param size
     * @returns
     */
    vwma(source: any, volume: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param size
     * @returns
     */
    wad(high: any, low: any, close: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param size
     */
    wcprice(high: any, low: any, close: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    wilders(source: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns
     */
    willr(high: any, low: any, close: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    wma(source: any, period: any, size?: any): any;
    /**
     *
     * @param input
     * @param period
     * @param size
     * @returns
     */
    zlema(input: any, period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns [upper_band, lower_band, middle_point]
     */
    abands(high: any, low: any, close: any, period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param offset
     * @param sigma
     * @param size
     * @returns
     */
    alma(source: any, period: any, offset: any, sigma: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param coef
     * @param size
     * @returns [ce_high, ce_low]
     */
    ce(high: any, low: any, close: any, period: any, coef: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param volume
     * @param period
     * @param size
     * @returns
     */
    cmf(high: any, low: any, close: any, volume: any, period: any, size?: any): any;
    /**
     * @ChatGPT
     * @param data
     * @param period1
     * @param period2
     * @returns
     */
    copp(data: any, period1: any, period2: any): any;
    /**
     * @param highs
     * @param lows
     * @param period
     * @returns [upper, middle, lower]
     */
    dc(highs: any, lows: any, period: any): any;
    /**
     *
     * @param close
     * @param volume
     * @param period
     * @param size
     * @returns
     */
    fi(close: any, volume: any, period: any, size?: any): any;
    /**
     * @TODO
     */
    ikhts(): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param multiple
     * @param size
     * @returns [kc_lower, kc_middle, kc_upper]
     */
    kc(high: any, low: any, close: any, period: any, multiple: any, size?: any): any;
    /**
     *
     * @param source
     * @param roc1
     * @param roc2
     * @param roc3
     * @param roc4
     * @param ma1
     * @param ma2
     * @param ma3
     * @param ma4
     * @param size
     * @returns
     */
    kst(source: any, roc1: any, roc2: any, roc3: any, roc4: any, ma1: any, ma2: any, ma3: any, ma4: any, size?: any): any;
    /**
     * @TODO
     */
    mama(): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns [pbands_lower, pbands_upper]
     */
    pbands(high: any, low: any, close: any, period: any, size?: any): any;
    /**
     * @TODO
     */
    pc(): any;
    /**
     *
     * @param source
     * @param period
     * @param ema_period
     * @param size
     * @returns
     */
    pfe(source: any, period: any, ema_period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param ema_period
     * @param size
     * @returns
     */
    posc(high: any, low: any, close: any, period: any, ema_period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param lookback_period
     * @param size
     * @returns
     */
    rmi(source: any, period: any, lookback_period: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param beta
     * @param size
     * @returns
     */
    rmta(source: any, period: any, beta: any, size?: any): any;
    /**
     *
     * @param source
     * @param period
     * @param stddev_period
     * @param size
     * @returns
     */
    rvi(source: any, sma_period: any, stddev_period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param q_period
     * @param r_period
     * @param s_period
     * @param size
     * @returns
     */
    smi(high: any, low: any, close: any, q_period: any, r_period: any, s_period: any, size?: any): any;
    /**
     *
     * @param source
     * @param y_period
     * @param z_period
     * @param size
     * @returns
     */
    tsi(source: any, y_period: any, z_period: any, size?: any): any;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param volume
     * @param period
     * @param size
     * @returns
     */
    vwap(high: any, low: any, close: any, volume: any, period: any, size?: any): any;
}
