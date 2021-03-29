class Listener {
  constructor(ele, recognizer) {
    let isListeningMouse = false
    let contexts = new Map()

    ele.addEventListener('mousedown', (e) => {
      let context = Object.create(null)
      contexts.set('mouse' + (1 << e.button), context) // mask

      recognizer.start(e, context)

      let mousemove = (e) => {
        let button = 1
        const keys = {
          2: 4,
          4: 2,
        } // different order

        while (button <= e.buttons) {
          if (button & e.buttons) {
            recognizer.move(e, contexts.get(`mouse${keys[button] ?? button}`))
          }
          button = button << 1
        }
      }

      let mouseup = (e) => {
        recognizer.end(e, contexts.get('mouse' + (1 << e.button)))
        contexts.delete('mouse' + (1 << e.button))

        if (e.buttons === 0) {
          document.removeEventListener('mousemove', mousemove)
          document.removeEventListener('mouseup', mouseup)

          isListeningMouse = false
        }
      }

      if (!isListeningMouse) {
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)

        isListeningMouse = true
      }
    })

    ele.addEventListener('touchstart', (e) => {
      for (let touch of e.changedTouches) {
        let context = Object.create(null)
        contexts.set(touch.identifier, context)
        recognizer.start(touch, context)
      }
    })

    ele.addEventListener('touchmove', (e) => {
      for (let touch of e.changedTouches) {
        recognizer.move(touch, contexts.get(touch.identifier))
      }
    })

    ele.addEventListener('touchend', (e) => {
      for (let touch of e.changedTouches) {
        recognizer.end(touch, contexts.get(touch.identifier))
        contexts.delete(touch.identifier)
      }
    })

    ele.addEventListener('touchcancel', (e) => {
      for (let touch of e.changedTouches) {
        recognizer.cancel(touch, contexts.get(touch.identifier))
        contexts.delete(touch.identifier)
      }
    })
  }
}

class Recognizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher
  }

  start(point, context) {
    context.startX = point.clientX
    context.startY = point.clientY
    this.dispatcher.dispatch('press', {
      clientX: point.clientX,
      clientY: point.clientY,
    })
    context.points = [
      {
        t: Date.now(),
        x: point.clientX,
        y: point.clientY,
      },
    ]

    context.isPan = false
    context.isTap = true
    context.isPress = false

    context.handler = setTimeout(() => {
      context.isPan = false
      context.isTap = false
      context.isPress = true

      context.handler = null // avoid being cleared many times

      this.dispatcher.dispatch('press')
    }, 500)
  }

  move(point, context) {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY

    if (context.isPan) {
      this.dispatcher.dispatch('pan', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
      })
    }
    if (dx ** 2 + dy ** 2 > 100) {
      context.isPan = true
      context.isTap = false
      context.isPress = false
      context.isVertical = Math.abs(dx) < Math.abs(dy)

      this.dispatcher.dispatch('panstart', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
      })
      clearTimeout(context.handler)
    }

    context.points = context.points.filter(
      (point) => Date.now() - point.t < 500
    )
    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY,
    })
  }

  end(point, context) {
    if (context.isTap) {
      this.dispatcher.dispatch('tap')
      clearTimeout(context.handler)
    }

    if (context.isPress) {
      this.dispatcher.dispatch('pressend')
    }

    context.points = context.points.filter(
      (point) => Date.now() - point.t < 500
    )

    let d, v
    if (!context.points.length) v = 0
    else {
      d = Math.sqrt(
        (point.clientX - context.points[0].x) ** 2 +
          (point.clientY - context.points[0].y) ** 2
      )
      v = d / (Date.now() - context.points[0].t)
    }

    context.isFlick = v > 1.5
    context.isFlick &&
      this.dispatcher.dispatch('flick', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v,
      })

    if (context.isPan) {
      this.dispatcher.dispatch('panend', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v,
      })
    }

    this.dispatcher.dispatch('end', {
      startX: context.startX,
      startY: context.startY,
      clientX: point.clientX,
      clientY: point.clientY,
      isVertical: context.isVertical,
      isFlick: context.isFlick,
      velocity: v,
    })
  }

  cancel(point, context) {
    this.dispatcher.dispatch('cancel')
    clearTimeout(context.handler)
  }
}

class Dispatcher {
  constructor(ele) {
    this.ele = ele
  }

  dispatch(type, properties = null) {
    let event = new Event(type)

    for (let name in properties) {
      event[name] = properties[name]
    }

    this.ele.dispatchEvent(event)
  }
}

function enableGesture(ele) {
  new Listener(ele, new Recognizer(new Dispatcher(ele)))
}

export default enableGesture