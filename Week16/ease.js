class CubicBezier {
  constructor(p1x, p1y, p2x, p2y, functionName) {
    this.cx = 3.0 * p1x
    this.bx = 3.0 * (p2x - p1x) - this.cx
    this.ax = 1.0 - this.cx - this.bx

    this.cy = 3.0 * p1y
    this.by = 3.0 * (p2y - p1y) - this.cy
    this.ay = 1.0 - this.cy - this.by

    let BezierEasing = (t) => this.sampleCurveY(this.solveCurveX(t))

    Object.defineProperty(BezierEasing, 'name', { writable: true })
    BezierEasing.name = functionName
      ? functionName
      : `cubic-bezier(${[p1x, p1y, p2x, p2y]})`

    return BezierEasing
  }

  sampleCurveX(t) {
    return ((this.ax * t + this.bx) * t + this.cx) * t
  }
  sampleCurveY(t) {
    return ((this.ay * t + this.by) * t + this.cy) * t
  }
  sampleCurveDerivativeX(t) {
    return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx
  }
  solveCurveX(x) {
    let t0,
      t1,
      t2,
      x2,
      d2,
      i,
      epsilon = 1e-5

    for (t2 = x, i = 0; i < 32; i++) {
      x2 = this.sampleCurveX(t2) - x
      if (Math.abs(x2) < epsilon) return t2
      d2 = this.sampleCurveDerivativeX(t2)
      if (Math.abs(d2) < epsilon) break
      t2 = t2 - x2 / d2
    }

    t0 = 0.0
    t1 = 1.0
    t2 = x

    if (t2 < t0) return t0
    if (t2 > t1) return t1

    while (t0 < t1) {
      x2 = this.sampleCurveX(t2)
      if (Math.abs(x2 - x) < epsilon) return t2
      if (x > x2) t0 = t2
      else t1 = t2

      t2 = (t1 - t0) * 0.5 + t0
    }

    return t2
  }
}

const linear = (x) => x

const ease = new CubicBezier(0.25, 0.1, 0.25, 1)

const easeIn = new CubicBezier(0.42, 0, 1, 1)

const easeOut = new CubicBezier(0, 0, 0.58, 1)

const easeInOut = new CubicBezier(0.42, 0, 0.58, 1)

export { linear, ease, easeIn, easeOut, easeInOut }