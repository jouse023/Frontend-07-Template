import { createElement } from './lib'
import Carousel from './Carousel'
import { Timeline, Animation } from './animation'

const WIDTH = 160
const SOURCE = [0, 1, 2, 3]

// type: swipe | autoplay
let carousel = (
  <Carousel
    src={SOURCE}
    type="swipe"
    delay={3000}
    width={WIDTH}
    onChange={(e) => console.log(e.detail.position)}
    onClick={(e) => console.log(e.detail.data)}
  />
)
carousel.mountOn(document.body)

let tl = new Timeline()
window.tl = tl
window.animation = new Animation(
  {
    set ani(v) {
      console.log(v)
    },
  },
  'ani',
  0,
  100,
  1000,
  null
)
// tl.start()

let button = <Button>text</Button>

let list = <List data={SOURCE}>{(item) => <span>{item}</span>}</List>