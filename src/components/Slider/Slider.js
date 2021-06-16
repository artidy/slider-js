import Slide from '../Slide'
import Arrow from '../Arrow'
import Dot from '../Dot'
import {createElement} from '../../core/dom'

export default class Slider {
  constructor(selector, currentSlide = 0, speed = 1000) {
    this.slides = []
    this.dots = []
    this.leftBtn = null
    this.rightBtn = null
    this.directionRight = true
    this.currentSlide = currentSlide
    this.nextSlide = currentSlide + 1
    this.speed = speed
    this.selector = selector
    this.toLeft = this.toLeft.bind(this)
    this.toRight = this.toRight.bind(this)
    this.switchSlide = this.switchSlide.bind(this)
    this.options = {}
    this.init()
  }

  init() {
    this.slides.push(new Slide('img/slides/food-12.jpg', 'picture1'))
    this.slides.push(new Slide('img/slides/girl.jpg', 'picture2'))
    this.slides.push(new Slide('img/slides/lodka.jpg', 'picture3'))
    this.slides.push(new Slide('img/slides/olive-oil.jpg', 'picture4'))
    this.slides.push(new Slide('img/slides/paprika.jpg', 'picture5'))
    this.slides.push(new Slide('img/slides/pepper.jpg', 'picture6'))
    this.slides.push(new Slide('img/slides/planshet.jpg', 'picture7'))

    this.leftBtn = new Arrow('left')
    this.rightBtn = new Arrow('right')

    this.element = document.querySelector(this.selector)
    this.slides.forEach((slide, index) => {
      const dot = new Dot(index)
      this.dots.push(dot)
      this.element.append(slide.element)
      this.changeDirection(slide)
    })
    this.slides[this.currentSlide].addClass('active')
    this.element.append(this.leftBtn.element)
    this.element.append(this.rightBtn.element)

    const dotsWrapper = createElement('div', ['dots'])
    this.dots.forEach(dot => {
      dot.on('click', this.switchSlide)
      dotsWrapper.append(dot.element)
    })
    this.chooseDot()
    this.element.append(dotsWrapper)

    this.leftBtn.on('click', this.toLeft)
    this.rightBtn.on('click', this.toRight)
    this.leftBtn.on('mouseenter', this.mouseenter)
    this.rightBtn.on('mouseenter', this.mouseenter)
    this.leftBtn.on('mouseleave', this.mouseleave)
    this.rightBtn.on('mouseleave', this.mouseleave)
  }

  mouseenter() {
    const elements = document.querySelectorAll(
        '.arrow-element[data-type="button"]')
    elements.forEach(element => {
      element.classList.add('hover')
    })
  }

  mouseleave() {
    const elements = document.querySelectorAll(
        '.arrow-element[data-type="button"]')
    elements.forEach(element => {
      element.classList.remove('hover')
    })
  }

  chooseDot() {
    this.dots.forEach(dot => {
      dot.removeClass('active')
    })
    this.dots[this.currentSlide].addClass('active')
  }

  switchSlide(event) {
    this.nextSlide = +event.target.getAttribute('data-index')
    this.directionRight = this.nextSlide > this.currentSlide
    this.changeSlide(0)
  }

  toLeft() {
    this.directionRight = false
    this.changeSlide(-1)
  }

  toRight() {
    this.directionRight = true
    this.changeSlide(1)
  }

  changeDirection(slide) {
    if (this.directionRight) {
      slide.addClass('direction-right')
      slide.removeClass('direction-left')
    } else {
      slide.addClass('direction-left')
      slide.removeClass('direction-right')
    }
  }

  defineActiveSlides(slide, className) {
    slide.addClass(className)
    setTimeout(() => {
      this.changeDirection(slide)
      slide.removeClass(className)
    }, this.speed)
  }

  moveSlide() {
    const currentSlide = this.slides[this.currentSlide]
    const nextSlide = this.slides[this.nextSlide]
    const animationOut = this.directionRight ? 'current-left' : 'current-right'
    const animationIn = this.directionRight ? 'next-left' : 'next-right'
    this.slides.forEach((slide) => {
      this.changeDirection(slide)
    })
    this.defineActiveSlides(currentSlide, animationOut)
    this.defineActiveSlides(nextSlide, animationIn)
    currentSlide.removeClass('active')
    currentSlide.removeClass('animated')
    nextSlide.addClass('animated')
    nextSlide.addClass('active')
    this.currentSlide = this.nextSlide
    this.chooseDot()
  }

  changeSlide(n = 0) {
    this.deactivateButtons()
    this.nextSlide = n === 0 ? this.nextSlide : this.currentSlide + n
    if (this.nextSlide < 0) {
      this.nextSlide = this.slides.length - 1
    }
    if (this.nextSlide >= this.slides.length) {
      this.nextSlide = 0
    }
    this.moveSlide()
  }

  deactivateButtons() {
    this.leftBtn.off('click', this.toLeft)
    this.rightBtn.off('click', this.toRight)
    this.dots.forEach(dot => {
      dot.off('click', this.switchSlide)
    })
    setTimeout(() => {
      this.leftBtn.on('click', this.toLeft)
      this.rightBtn.on('click', this.toRight)
      this.dots.forEach(dot => {
        dot.on('click', this.switchSlide)
      })
    }, this.speed)
  }
}