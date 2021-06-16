import SliderComponent from '../SliderComponent'
import {createElement} from '../../core/dom'

export default class Dot extends SliderComponent {
  constructor(index = 0) {
    super('Dot')
    this.index = index
    this.init()
  }

  init() {
    this.element = createElement('div', ['dot'])
    this.element.setAttribute('data-index', this.index)
  }

  getTemplate() {
    return this.element
  }
}