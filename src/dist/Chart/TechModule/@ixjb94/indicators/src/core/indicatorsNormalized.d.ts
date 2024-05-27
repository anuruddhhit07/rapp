export declare class IndicatorsNormalized {
    constructor();
    /**
     * @param originalLength - example 100
     * @param source - example ema | sma | rsi | etc.
     * @param empty - example NaN | Null | 0 | false | etc.
     * @returns
     */
    normalize(originalLength: number, source: Array<number> | string, empty?: number): Promise<Array<number>>;
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
    ad(high: number[], low: number[], close: number[], volume: number[], size?: number): Promise<number[]>;
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
    adosc(high: number[], low: number[], close: number[], volume: number[], short_period: number, long_period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    adx(high: number[], low: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    adxr(high: number[], low: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param size
     * @returns
     */
    ao(high: number[], low: number[], size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param short_period
     * @param long_period
     * @param size
     * @returns
     */
    apo(source: number[], short_period: number, long_period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns [Aroon_Down, Aroon_Up]
     */
    aroon(high: number[], low: number[], period: number, size?: number): Promise<number[][]>;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    aroonosc(high: number[], low: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns
     */
    atr(high: number[], low: number[], close: number[], period: number, size?: number): Promise<Array<number>>;
    /**
     *
     * @param open
     * @param high
     * @param low
     * @param close
     * @param size
     * @returns
     */
    avgprice(open: number[], high: number[], low: number[], close: number[], size?: number): Promise<number[]>;
    /**
     * @param source
     * @param period
     * @param stddev
     * @param size
     * @returns [Lower, Middle, Upper]
     */
    bbands(source: number[], period: number, stddev: number, size?: number): Promise<number[][]>;
    /**
     *
     * @param open
     * @param high
     * @param low
     * @param close
     * @param size
     * @returns
     */
    bop(open: number[], high: number[], low: number[], close: number[], size?: number): Promise<Array<number>>;
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
    cci(high: number[], low: number[], close: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    cmo(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     * @param a
     * @param b
     * @param size
     */
    crossany(a: number[], b: number[], size?: number): Promise<boolean[]>;
    /**
     * @param a
     * @param b
     * @param size
     * @returns
     */
    crossover(a: number[], b: number[], size?: number): Promise<boolean[]>;
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
    cvi(high: number[], low: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    decay(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    dema(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns [Plus DI, Minus DI]
     */
    di(high: number[], low: number[], close: number[], period: number, size?: number): Promise<number[][]>;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns [Plus DM, Minus DM]
     */
    dm(high: number[], low: number[], period: number, size?: number): Promise<number[][]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    dpo(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    dx(high: number[], low: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    edecay(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     * @param source
     * @param period
     * @param size
     * @returns
     */
    ema(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param volume
     * @param size
     * @returns
     */
    emv(high: number[], low: number[], volume: number[], size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns [fisher, signal]
     */
    fisher(high: number[], low: number[], period: number, size?: number): Promise<number[][]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    fosc(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param input
     * @param period
     * @param size
     * @returns
     */
    hma(input: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    kama(source: number[], period: number, size?: number): Promise<number[]>;
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
    kvo(high: number[], low: number[], close: number[], volume: number[], short_period: number, long_period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    lag(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    linreg(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    linregintercept(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    linregslope(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param short_period
     * @param long_period
     * @param signal_period
     * @param size
     * @returns [macd, signal, hist]
     */
    macd(source: number[], short_period: number, long_period: number, signal_period: number, size?: number): Promise<number[][]>;
    /**
     *
     * @param high
     * @param low
     * @param volume
     * @param size
     * @returns
     */
    marketfi(high: number[], low: number[], volume: number[], size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param period
     * @param size
     * @returns
     */
    mass(high: number[], low: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    max(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    md(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param size
     * @returns
     */
    medprice(high: number[], low: number[], size?: number): Promise<number[]>;
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
    mfi(high: number[], low: number[], close: number[], volume: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    min(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    mom(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns [sine, lead]
     */
    msw(source: number[], period: number, size?: number): Promise<number[][]>;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns
     */
    natr(high: number[], low: number[], close: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param close
     * @param volume
     * @param size
     * @returns
     */
    nvi(close: number[], volume: number[], size?: number): Promise<number[]>;
    /**
     *
     * @param close
     * @param volume
     * @param size
     * @returns
     */
    obv(close: number[], volume: number[], size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param short_period
     * @param long_period
     * @param size
     * @returns
     */
    ppo(source: number[], short_period: number, long_period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param accel_step
     * @param accel_max
     * @param size
     * @returns
     */
    psar(high: number[], low: number[], accel_step: number, accel_max: number, size?: number): Promise<number[]>;
    /**
     *
     * @param close
     * @param volume
     * @param size
     * @returns
     */
    pvi(close: number[], volume: number[], size?: number): Promise<number[]>;
    /**
     *
     * @param open
     * @param close
     * @param period
     * @param size
     * @returns
     */
    qstick(open: number[], close: number[], period: number, size?: number): Promise<Array<number>>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    roc(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    rocr(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    rsi(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     * @param source
     * @param period
     * @param size
     * @returns
     */
    sma(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    stddev(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    stderr(source: number[], period: number, size?: number): Promise<number[]>;
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
    stoch(high: number[], low: number[], close: number[], kperiod: number, kslow: number, dperiod: number, size?: number): Promise<number[][]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    stochrsi(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    sum(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    tema(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param size
     * @returns
     */
    tr(high: number[], low: number[], close: number[], size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    trima(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    trix(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    tsf(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param size
     */
    typprice(high: number[], low: number[], close: number[], size?: number): Promise<number[]>;
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
    ultosc(high: number[], low: number[], close: number[], short_period: number, medium_period: number, long_period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    var(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    vhf(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param short_period
     * @param long_period
     * @param alpha
     * @param size
     * @returns
     */
    vidya(source: number[], short_period: number, long_period: number, alpha: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    volatility(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param short_period
     * @param long_period
     * @param size
     * @returns
     */
    vosc(source: number[], short_period: number, long_period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param volume
     * @param period
     * @param size
     * @returns
     */
    vwma(source: number[], volume: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param size
     * @returns
     */
    wad(high: number[], low: number[], close: number[], size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param size
     */
    wcprice(high: number[], low: number[], close: number[], size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    wilders(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns
     */
    willr(high: number[], low: number[], close: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param size
     * @returns
     */
    wma(source: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param input
     * @param period
     * @param size
     * @returns
     */
    zlema(input: number[], period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns [upper_band, lower_band, middle_point]
     */
    abands(high: number[], low: number[], close: number[], period: number, size?: number): Promise<number[][]>;
    /**
     *
     * @param source
     * @param period
     * @param offset
     * @param sigma
     * @param size
     * @returns
     */
    alma(source: number[], period: number, offset: number, sigma: number, size?: number): Promise<number[]>;
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
    ce(high: number[], low: number[], close: number[], period: number, coef: number, size?: number): Promise<number[][]>;
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
    cmf(high: number[], low: number[], close: number[], volume: number[], period: number, size?: number): Promise<number[]>;
    /**
     * @ChatGPT
     * @param data
     * @param period1
     * @param period2
     * @returns
     */
    copp(data: number[], period1: number, period2: number): Promise<any[]>;
    /**
     * @param highs
     * @param lows
     * @param period
     * @returns [upper, middle, lower]
     */
    dc(highs: number[], lows: number[], period: number): Promise<number[][]>;
    /**
     *
     * @param close
     * @param volume
     * @param period
     * @param size
     * @returns
     */
    fi(close: number[], volume: number[], period: number, size?: number): Promise<number[]>;
    /**
     * @TODO
     */
    ikhts(): Promise<void>;
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
    kc(high: number[], low: number[], close: number[], period: number, multiple: number, size?: number): Promise<number[][]>;
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
     * @returns [kst, kst_signal]
     */
    kst(source: number[], roc1: number, roc2: number, roc3: number, roc4: number, ma1: number, ma2: number, ma3: number, ma4: number, size?: number): Promise<number[][]>;
    /**
     * @TODO
     */
    mama(): Promise<void>;
    /**
     *
     * @param high
     * @param low
     * @param close
     * @param period
     * @param size
     * @returns [pbands_lower, pbands_upper]
     */
    pbands(high: number[], low: number[], close: number[], period: number, size?: number): Promise<number[][]>;
    /**
     * @TODO
     */
    pc(): Promise<void>;
    /**
     *
     * @param source
     * @param period
     * @param ema_period
     * @param size
     * @returns
     */
    pfe(source: number[], period: number, ema_period: number, size?: number): Promise<number[]>;
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
    posc(high: number[], low: number[], close: number[], period: number, ema_period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param lookback_period
     * @param size
     * @returns
     */
    rmi(source: number[], period: number, lookback_period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param beta
     * @param size
     * @returns
     */
    rmta(source: number[], period: number, beta: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param period
     * @param stddev_period
     * @param size
     * @returns
     */
    rvi(source: number[], sma_period: number, stddev_period: number, size?: number): Promise<number[]>;
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
    smi(high: number[], low: number[], close: number[], q_period: number, r_period: number, s_period: number, size?: number): Promise<number[]>;
    /**
     *
     * @param source
     * @param y_period
     * @param z_period
     * @param size
     * @returns
     */
    tsi(source: number[], y_period: number, z_period: number, size?: number): Promise<number[]>;
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
    vwap(high: number[], low: number[], close: number[], volume: number[], period: number, size?: number): Promise<number[]>;
}
