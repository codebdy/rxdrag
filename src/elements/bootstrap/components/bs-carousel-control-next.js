import {HTMLA} from "../../html/html-a"
import {HTMLSpan} from "../../html/html-span"

//import {BSTextarea} from "./bs-textarea"

export class BSCarouselControlNext extends HTMLA{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCarouselControlNext'
    this.toolboxInfo.elementName = "Carousel Control Next"
    this.className = 'BSCarouselControlNext'

    this.acceptedChildren= []

    this.label = "next"
    this.addClass('carousel-control-next')
    this.setEditPadding('')
  }

  make(){
    return new BSCarouselControlNext
  }

  setCarouselId(carouselId){
    this.carouselId = carouselId
    return this
  }

  configSelf(){
    this.setAttribute('href', "#" + this.carouselId)
    this.setAttribute('role', "button")
    this.setAttribute('data-slide', "next")
    this.setInnerHTML(`<span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>`)
    /*this.pushChild(
      new HTMLSpan()
      .addClass('carousel-control-next-icon')
      .setAttribute('aria-hidden', true)
      .setInnerHTML('')
      .setEditPadding('')
    )
    this.pushChild(
      new HTMLSpan()
      .addClass('sr-only')
      .setInnerHTML('Next')
      .setEditPadding('')
    )*/
  }

}
