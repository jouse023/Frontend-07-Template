import { Timeline, Animation } from './animation.js'
import { ease } from './ease.js'

let tl = new Timeline()
tl.start()
tl.add(
  new Animation(
    document.getElementById('el').style,
    'transform',
    0,
    500,
    2000,
    0,
    ease,
    (x) => `translateX(${x}px)`
  )
)

document.querySelector('#btn-pause').addEventListener('click', () => tl.pause())
document
  .querySelector('#btn-resume')
  .addEventListener('click', () => tl.resume())
document.querySelector('#btn-reset').addEventListener('click', () => tl.reset())