import { Component, STATE, ATTRIBUTE } from './lib'
import { Timeline, Animation } from './animation'
import { ease } from './ease'
import enableGesture from './gesture'

class Carousel extends Component {
  constructor() {
    super()
  }

  render() {
    this.root = document.createElement('div')
    this.root.classList.add('carousel')
    const { src, type, delay, width } = this[ATTRIBUTE]

    const palette = ['#d8ebe4', '#fbe6c2', '#e9896a', '#b8b5ff', '#f39189']
    const colorPick = () => palette[~~(Math.random() * palette.length)]

    for (let record of src) {
      let child = document.createElement('span')
      child.textContent = record
      child.style.backgroundColor = colorPick()
      this.root.appendChild(child)
    }

    enableGesture(this.root)
    let timeline = new Timeline()
    timeline.start()

    let handler = null
    let children = this.root.children
    this[STATE].position = 0
    let t = 0
    let ax = 0

    this.root.addEventListener('start', (e) => {
      timeline.pause()
      clearInterval(handler)
      let progress = (Date.now() - t) / (width * (src.length - 1))
      ax =
        Date.now() - t < width * (src.length - 1)
          ? ease(progress) * width - width
          : 0
    })

    this.root.addEventListener('tap', (e) => {
      this.triggerEvent('click', {
        data: this[ATTRIBUTE].src[this[STATE].position],
      })
    })

    this.root.addEventListener('pan', (e) => {
      let x = e.clientX - e.startX - ax
      let current = this[STATE].position - (x - (x % width)) / width

      for (let offset of [-1, 0, 1]) {
        let index = current + offset
        index = ((index % children.length) + children.length) % children.length

        children[index].style.transition = 'none'
        children[index].style.transform = `translateX(${
          (offset - index) * width + (x % width)
        }px)`
      }
    })

    this.root.addEventListener('end', (e) => {
      timeline.reset()
      timeline.start()
      handler = setInterval(nextPic, delay)

      let x = e.clientX - e.startX - ax
      let current = this[STATE].position - (x - (x % width)) / width
      let direction = Math.round((x % width) / width)
      if (e.isFlick) {
        direction =
          e.velocity < 0
            ? Math.ceil((x % width) / width)
            : ~~((x % width) / width)
      }

      for (let offset of [-1, 0, 1]) {
        let index = current + offset
        index = ((index % children.length) + children.length) % children.length

        children[index].style.transition = 'none'
        timeline.add(
          new Animation(
            children[index].style,
            'transform',
            (offset - index) * width + (x % width),
            (offset - index) * width + direction * width,
            500,
            0,
            ease,
            (x) => `translateX(${x}px)`
          )
        )
      }

      this[STATE].position =
        this[STATE].position - (x - (x % width)) / width - direction
      this[STATE].position =
        ((this[STATE].position % children.length) + children.length) %
        children.length
      this.triggerEvent('change', { position: this[STATE].position })
    })

    const nextPic = () => {
      let children = this.root.children

      let nextIndex = (this[STATE].position + 1) % children.length
      let current = children[this[STATE].position]
      let next = children[nextIndex]
      t = Date.now()

      timeline.add(
        new Animation(
          current.style,
          'transform',
          -this[STATE].position * width,
          (-this[STATE].position - 1) * width,
          500,
          0,
          ease,
          (x) => `translateX(${x}px)`
        )
      )
      timeline.add(
        new Animation(
          next.style,
          'transform',
          (1 - nextIndex) * width,
          -nextIndex * width,
          500,
          0,
          ease,
          (x) => `translateX(${x}px)`
        )
      )

      this.triggerEvent('Change', { position: this[STATE].position })
      this[STATE].position = nextIndex
    }

    handler = setInterval(nextPic, delay)

    return this.root
  }
}

export default Carousel