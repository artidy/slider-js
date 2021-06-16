
import {createElement} from '../../core/dom'
import SliderComponent from '../SliderComponent'

export default class Slide extends SliderComponent {
  constructor(src, description) {
    super('Slide')
    this.src = src
    this.description = description
    this.init()
  }

  init() {
    this.element = createElement('div', ['slider__slide'],
        `<img src="${this.src}" alt="${this.description}" />`)
    this.element.setAttribute('data-type', 'slide')
  }

  getTemplate() {
    return this.element
  }
}