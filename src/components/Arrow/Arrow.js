import {createElement} from '../../core/dom'
import SliderComponent from '../SliderComponent'

export default class Arrow extends SliderComponent {
  constructor(type) {
    super('Arrow')
    this.type = type
    this.init()
  }

  init() {
    this.element = createElement('div', ['arrow', this.type])
    this.element.setAttribute('data-type', 'button')
    const topElement = createElement('div',
        ['arrow-element', 'top', this.type])
    topElement.setAttribute('data-type', 'button')
    const bottomElement = createElement('div',
        ['arrow-element', 'bottom', this.type])
    bottomElement.setAttribute('data-type', 'button')
    this.element.append(topElement)
    this.element.append(bottomElement)
  }

  getTemplate() {
    return this.element
  }
}