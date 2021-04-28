const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("start-time")
const PAUSE_START = Symbol("pause-start")
const PAUSE_TIME = Symbol("pause-time")

export class Timeline {
  constructor() {
    this.state = "Inited";
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
  }

  start() {
    if (this.state !== "Inited") {
      return;
    }
    this.state = "started";
    let startTime = Date.now();
    this[PAUSE_TIME] = 0;
    //　私有
    this[TICK] = () => {
      //console.log("tick");
      //let t = Date.now() - startTime;
      let now = Date.now();
      for (let animation of this[ANIMATIONS]) {
        //let t0 = t;
        let t0;
        if (this[START_TIME].get(animation) < startTime) {
          t0 = now - startTime - this[PAUSE_TIME] - animation.delay;
        } else {
          t0 = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay;
        }

        if (animation.duration < t0) {

          this[ANIMATIONS].delete(animation);
          t0 = animation.duration;
        }

        if (t0 > 0) {
          animation.receiveTime(t0);
        }
        //animation.receiveTime(t0);

      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
    }
    this[TICK]();

  }
  // set rate() {}
  // get rate() {}
  pause() {
    if (this.state !== "started") {
      return;
    }
    this.state = "paused";
    this[PAUSE_START] = Date.now();
    console.log("Pause");
    cancelAnimationFrame(this[TICK_HANDLER]);
  }

  resume() {
    if (this.state !== "paused") {
      return;
    }
    this.state = "started";
    console.log("Resume");
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
    this[TICK]();
  }

  reset() {
    this.pause();
    this.state = "Inited";
    let startTime = Date.now();
    this[PAUSE_TIME] = 0;
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
    this[PAUSE_START] = 0;
    this[TICK_HANDLER] = null;
  }

  add(animation, startTime) {
    if (arguments.length < 2) {
      startTime = Date.now();
    }
    this[ANIMATIONS].add(animation);
    this[START_TIME].set(animation, startTime)
  }
}

export class Animation {
  constructor(object, property, startValue, endValue, duration, delay, timingFunc, template) {
    timingFunc = timingFunc || (v => v);
    template = template || (v => v);

    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.delay = delay;
    this.timingFunc = timingFunc;
    this.template = template;
  }
  receiveTime(time) {
    console.log(time)
    let range = this.endValue - this.startValue;
    let progress = this.timingFunc(time / this.duration);
    this.object[this.property] = this.template(this.startValue + range * progress);
  }
}