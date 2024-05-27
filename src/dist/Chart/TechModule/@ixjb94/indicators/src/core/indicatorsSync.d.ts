export declare class IndicatorsSync {
    constructor();
    /**
     * @param originalLength - example 100
     * @param source - example ema | sma | rsi | etc.
     * @param empty - example NaN | Null | 0 | false | etc.
     * @returns
     */
    normalize(originalLength: number, source: Array<number> | string, empty?: number): any[];
    floor(x: number): number;
    sqrt(number: number, guess?: number): number;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param volume
     * @param size
     * @returns
     */
    ad(high: Array<number>, low: Array<number>, close: Array<number>, volume: Array<number>, size?: number): number[];
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
    adosc(high: Array<number>, low: Array<number>, close: Array<number>, volume: Array<number>, short_period: number, long_period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    adx(high: Array<number>, low: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    adxr(high: Array<number>, low: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param size
     * @returns
     */
    ao(high: Array<number>, low: Array<number>, size?: number): number[];
    /**
     *
     * @param source
     * @param short_period
     * @param long_period
     * @param size
     * @returns
     */
    apo(source: Array<number>, short_period: number, long_period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns First output = Aroon Down, Second output = Aroon Up
     */
    aroon(high: Array<number>, low: Array<number>, period: number, size?: number): number[][];
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    aroonosc(high: Array<number>, low: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns
     */
    atr(high: Array<number>, low: Array<number>, close: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param open
     * @param high
     * @param low
     * @param close
     * @param size
     * @returns
     */
    avgprice(open: Array<number>, high: Array<number>, low: Array<number>, close: Array<number>, size?: number): number[];
    /**
     * @param source
     * @param period
     * @param stddev
     * @param size
     * @returns [Lower, Middle, Upper]
     */
    bbands(source: Array<number>, period: number, stddev: number, size?: number): number[][];
    /**
     *
     * @param open
     * @param high
     * @param low
     * @param close
     * @param size
     * @returns
     */
    bop(open: Array<number>, high: Array<number>, low: Array<number>, close: Array<number>, size?: number): number[];
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
    cci(high: Array<number>, low: Array<number>, close: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    cmo(source: Array<number>, period: number, size?: number): number[];
    /**
     * @param a
     * @param b
     * @param size
     * @returns
     */
    crossany(a: number[], b: number[], size?: number): boolean[];
    /**
     *
     * @param a
     * @param b
     * @param size
     * @returns
     */
    crossover(a: number[], b: number[], size?: number): boolean[];
    /**
     * @param seriesA
     * @param number
     * @returns
     */
    crossOverNumber(seriesA: number[], number: number): boolean[];
    /**
     *
     * @param seriesA
     * @param number
     * @returns
     */
    crossUnderNumber(seriesA: number[], number: number): boolean[];
    /**
     * @Updated
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    cvi(high: Array<number>, low: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    _cvi(high: Array<number>, low: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    decay(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    dema(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns [Plus DI, Minus DI]
     */
    di(high: Array<number>, low: Array<number>, close: Array<number>, period: number, size?: number): number[][];
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns [Plus DM, Minus DM]
     */
    dm(high: Array<number>, low: Array<number>, period: number, size?: number): number[][];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    dpo(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    dx(high: Array<number>, low: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    edecay(source: Array<number>, period: number, size?: number): number[];
    /**
     * @param source
     * @param period
     * @param size
     * @returns
     */
    ema(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param volume
     * @param size
     * @returns
     */
    emv(high: Array<number>, low: Array<number>, volume: Array<number>, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns [fisher, signal]
     */
    fisher(high: Array<number>, low: Array<number>, period: number, size?: number): number[][];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    fosc(source: Array<number>, period: number, size?: number): number[];
    /**
     * Remove Buffer Call, Remove Math usage
     * @param input
     * @param period
     * @param size
     * @returns
     * @deprecated
     */
    DEP_hma(input: number[], period: number, size?: number): number[];
    /**
     * @param input
     * @param period
     * @param size
     * @returns
     */
    hma(input: number[], period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    kama(source: Array<number>, period: number, size?: number): number[];
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
    kvo(high: Array<number>, low: Array<number>, close: Array<number>, volume: Array<number>, short_period: number, long_period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    lag(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    linreg(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    linregintercept(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    linregslope(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param short_period
     * @param long_period
     * @param signal_period
     * @param size
     * @returns [macd, signal, hist]
     */
    macd(source: Array<number>, short_period: number, long_period: number, signal_period: number, size?: number): number[][];
    /**
     *
     * @param high
     * @param low
     * @param volume
     * @param size
     * @returns
     */
    marketfi(high: Array<number>, low: Array<number>, volume: Array<number>, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    mass(high: Array<number>, low: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    max(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    md(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param size
     * @returns
     */
    medprice(high: Array<number>, low: Array<number>, size?: number): number[];
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
    mfi(high: Array<number>, low: Array<number>, close: Array<number>, volume: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    min(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    mom(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    msw(source: Array<number>, period: number, size?: number): number[][];
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns
     */
    natr(high: Array<number>, low: Array<number>, close: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param close
     * @param volume
     * @param size
     * @returns
     */
    nvi(close: Array<number>, volume: Array<number>, size?: number): number[];
    /**
     *
     * @param close
     * @param volume
     * @param size
     * @returns
     */
    obv(close: Array<number>, volume: Array<number>, size?: number): number[];
    /**
     *
     * @param source
     * @param short_period
     * @param long_period
     * @param size
     * @returns
     */
    ppo(source: Array<number>, short_period: number, long_period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param accel_step
     * @param accel_max
     * @param size
     * @returns
     */
    psar(high: Array<number>, low: Array<number>, accel_step: number, accel_max: number, size?: number): number[];
    /**
     *
     * @param close
     * @param volume
     * @param size
     * @returns
     */
    pvi(close: Array<number>, volume: Array<number>, size?: number): number[];
    /**
     *
     * @param open
     * @param close
     * @param period
     * @param size
     * @returns
     */
    qstick(open: number[], close: number[], period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    roc(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    rocr(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    rsi(source: Array<number>, period: number, size?: number): number[];
    /**
     * @param source
     * @param period
     * @param size
     * @returns
     */
    sma(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    stddev(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    stderr(source: Array<number>, period: number, size?: number): number[];
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
    stoch(high: Array<number>, low: Array<number>, close: Array<number>, kperiod: number, kslow: number, dperiod: number, size?: number): number[][];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    stochrsi(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    sum(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    tema(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param size
     * @returns
     */
    tr(high: Array<number>, low: Array<number>, close: Array<number>, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    trima(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    trix(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    tsf(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param size
     */
    typprice(high: Array<number>, low: Array<number>, close: Array<number>, size?: number): number[];
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
    ultosc(high: Array<number>, low: Array<number>, close: Array<number>, short_period: number, medium_period: number, long_period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    var(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    vhf(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param short_period
     * @param long_period
     * @param alpha
     * @param size
     * @returns
     */
    vidya(source: Array<number>, short_period: number, long_period: number, alpha: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    volatility(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param short_period
     * @param long_period
     * @param size
     * @returns
     */
    vosc(source: Array<number>, short_period: number, long_period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param volume
     * @param period
     * @param size
     * @returns
     */
    vwma(source: Array<number>, volume: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param size
     * @returns
     */
    wad(high: Array<number>, low: Array<number>, close: Array<number>, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param size
     */
    wcprice(high: Array<number>, low: Array<number>, close: Array<number>, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    wilders(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns
     */
    willr(high: Array<number>, low: Array<number>, close: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    wma(source: Array<number>, period: number, size?: number): number[];
    /**
     *
     * @param input
     * @param period
     * @param size
     * @returns
     */
    zlema(input: number[], period: number, size?: number): number[];
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns [upper_band, lower_band, middle_point]
     */
    abands(high: Array<number>, low: Array<number>, close: Array<number>, period: number, size?: number): number[][];
    /**
     *
     * @param source
     * @param period
     * @param offset
     * @param sigma
     * @param size
     * @returns
     */
    alma(source: Array<number>, period: number, offset: number, sigma: number, size?: number): number[];
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
    ce(high: Array<number>, low: Array<number>, close: Array<number>, period: number, coef: number, size?: number): number[][];
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
    cmf(high: Array<number>, low: Array<number>, close: Array<number>, volume: Array<number>, period: number, size?: number): number[];
    /**
     * @ChatGPT
     * @param data
     * @param period1
     * @param period2
     * @returns
     */
    copp(data: number[], period1: number, period2: number): any[];
    /**
     * @param highs
     * @param lows
     * @param period
     * @returns [upper, middle, lower]
     */
    dc(highs: number[], lows: number[], period: number): number[][];
    /**
     *
     * @param close
     * @param volume
     * @param period
     * @param size
     * @returns
     */
    fi(close: Array<number>, volume: Array<number>, period: number, size?: number): number[];
    /**
     * @TODO
     */
    ikhts(): void;
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
    kc(high: Array<number>, low: Array<number>, close: Array<number>, period: number, multiple: number, size?: number): number[][];
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
    kst(source: Array<number>, roc1: number, roc2: number, roc3: number, roc4: number, ma1: number, ma2: number, ma3: number, ma4: number, size?: number): number[][];
    /**
     * @TODO
     */
    mama(): void;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns [pbands_lower, pbands_upper]
     */
    pbands(high: Array<number>, low: Array<number>, close: Array<number>, period: number, size?: number): number[][];
    /**
     * @TODO
     */
    pc(): void;
    /**
     *
     * @param source
     * @param period
     * @param ema_period
     * @param size
     * @returns
     */
    pfe(source: Array<number>, period: number, ema_period: number, size?: number): number[];
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
    posc(high: Array<number>, low: Array<number>, close: Array<number>, period: number, ema_period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param lookback_period
     * @param size
     * @returns
     */
    rmi(source: Array<number>, period: number, lookback_period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param beta
     * @param size
     * @returns
     */
    rmta(source: Array<number>, period: number, beta: number, size?: number): number[];
    /**
     *
     * @param source
     * @param period
     * @param stddev_period
     * @param size
     * @returns
     */
    rvi(source: Array<number>, sma_period: number, stddev_period: number, size?: number): number[];
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
    smi(high: Array<number>, low: Array<number>, close: Array<number>, q_period: number, r_period: number, s_period: number, size?: number): number[];
    /**
     *
     * @param source
     * @param y_period
     * @param z_period
     * @param size
     * @returns
     */
    tsi(source: Array<number>, y_period: number, z_period: number, size?: number): number[];
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
    vwap(high: Array<number>, low: Array<number>, close: Array<number>, volume: Array<number>, period: number, size?: number): number[];
}
