import {HTMLA} from "../../html/html-a"

import {HTMLSpan} from "../../html/html-span"

//import {BSTextarea} from "./bs-textarea"

export class BSCarouselControlPrev extends HTMLA{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCarouselControlPrev'
    this.toolboxInfo.elementName = "Carousel Control Prev"
    this.className = 'BSCarouselControlPrev'

    //this.editMarginStyle.padding = ''

    this.acceptedChildren= []

    this.label = "prev"
    this.addClass('carousel-control-prev')
    this.setEditPadding('')
  }

  make(){
    return new BSCarouselControlPrev
  }

  setCarouselId(carouselId){
    this.carouselId = carouselId
    return this
  }

  configSelf(){
    this.setAttribute('href', "#" + this.carouselId)
    this.setAttribute('role', "button")
    this.setAttribute('data-slide', "prev")
    this.setInnerHTML(`<span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Prev</span>`)
    /*this.pushChild(
      new HTMLSpan()
      .addClass('carousel-control-prev-icon')
      .setAttribute('aria-hidden', true)
      .setInnerHTML('')
      .setEditPadding('')
    )
    this.pushChild(
      new HTMLSpan()
      .addClass('sr-only')
      .setInnerHTML('Previous')
      .setEditPadding('')
    )*/
  }

}
