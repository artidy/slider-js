
export default class SliderComponent {
  constructor(name) {
    this.name = name
    this.element = null
  }

  on(event, callback) {
    this.element.addEventListener(event, callback)
  }

  off(event, callback) {
    this.element.removeEventListener(event, callback)
  }

  addClass(className) {
    this.element.classList.add(className)
  }

  removeClass(className) {
    this.element.classList.remove(className)
  }

  containsClass(className) {
    this.element.classList.contains(className)
  }

  getTemplate() {
    throw new Error(`Для компонента ${this.name} 
      необходимо реализовать шаблон!`)
  }
}
