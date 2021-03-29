const STATE = Symbol('state')
const ATTRIBUTE = Symbol('attribute')

class Component {
  constructor() {
    this[ATTRIBUTE] = Object.create(null)
    this[STATE] = Object.create(null)
  }

  setAttribute(name, value) {
    this[ATTRIBUTE][name] = value
  }

  appendChild(child) {
    child.mountOn(this.root)
  }

  mountOn(parent) {
    if (!this.root) this.render()
    parent.appendChild(this.root)
  }

  triggerEvent(type, args) {
    this[ATTRIBUTE]['on' + type.replace(/^[\s\S]/, (c) => c.toUpperCase())](
      new CustomEvent(type, { detail: args })
    )
  }

  render() {
    return this.root
  }
}

class ElementWrapper extends Component {
  constructor(type) {
    super()
    this.root = document.createElement(type)
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
}

class TextWrapper extends Component {
  constructor(content) {
    super()
    this.root = document.createTextNode(content)
  }
}

function createElement(type, attributes, ...children) {
  let element

  if (typeof type === 'string') element = new ElementWrapper(type)
  else element = new type()

  for (let name in attributes) {
    element.setAttribute(name, attributes[name])
  }

  const processChildren = (children) => {
    for (let child of children) {
      if (Array.isArray(child)) {
        processChildren(child)
        continue
      }

      if (typeof child === 'string') child = new TextWrapper(child)

      element.appendChild(child)
    }
  }
  processChildren(children)

  return element
}

export { Component, createElement, STATE, ATTRIBUTE }