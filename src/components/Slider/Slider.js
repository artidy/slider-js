import Slide from '../Slide'
import Arrow from '../Arrow'

export default class Slider {
  constructor(currentSlide = 0, speed = 1000) {
    this.slides = []
    this.dots = []
    this.leftBtn = null
    this.rightBtn = null
    this.directionToRight = true
    this.currentSlide = currentSlide
    this.speed = speed
    this.options = {}
    this.init()
  }

  init() {
    this.slides.push(new Slide('img/slides/food-12.jpg'), 'picture1')
    this.slides.push(new Slide('img/slides/girl.jpg'), 'picture2')
    this.slides.push(new Slide('img/slides/lodka.jpg'), 'picture3')
    this.slides.push(new Slide('img/slides/olive-oil.jpg'), 'picture4')
    this.slides.push(new Slide('img/slides/paprika.jpg'), 'picture5')
    this.slides.push(new Slide('img/slides/pepper.jpg'), 'picture6')
    this.slides.push(new Slide('img/slides/planshet.jpg'), 'picture7')

    this.leftBtn = new Arrow('left')
    this.rightBtn = new Arrow('right')

    this.element = document.querySelector('#slider')
    this.slides.forEach(slide => {
      this.element.append(slide.element)
    })
    this.element.append(this.leftBtn.element)
    this.element.append(this.rightBtn.element)
  }

  toLeft() {
    this.directionToRight = false
    this.changeSlide(-1)
  }

  toRight() {
    this.directionToRight = true
    this.changeSlide(1)
  }

  changeDirection(slide, directionRight) {
    if (!directionRight) {
      slide.addClass('direction-left')
      slide.removeClass('direction-right')
    } else {
      slide.addClass('direction-right')
      slide.removeClass('direction-left')
    }
  }

  changeSlide(n = 0, slide = -1) {
    this.deactivateButtons()
    this.changeDirection(
        this.slides[this.currentSlide], !this.directionRight
    )
    this.currentSlide += n
    if (slide !== -1) {
      this.currentSlide = slide
      this.changeDirection(
          this.slides[this.currentSlide], !this.directionRight
      )
    }
    this.slides.forEach((slide) => {
      slide.removeClass('active')
      if (slide.containsClass('animated')) {
        setTimeout(() => {
          slide.removeClass('animated')
        }, this.speed)
      } else {
        this.changeDirection(slide, this.directionRight)
      }
    })
    if (this.currentSlide < 0) {
      this.currentSlide = this.slides.length - 1
    }
    if (this.currentSlide === this.slides.length) {
      this.currentSlide = 0
    }
    this.slides[this.currentSlide].addClass('animated')
    this.slides[this.currentSlide].addClass('active')
    this.changeDirection(this.slides[this.currentSlide], !this.directionRight)
  }

  deactivateButtons() {
    this.leftBtn.off('click', this.toLeft)
    this.rightBtn.off('click', this.toRight)
    setTimeout(() => {
      this.leftBtn.on('click', this.toLeft)
      this.rightBtn.on('click', this.toRight)
    }, this.speed)
  }
}