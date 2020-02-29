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
    this.onclick = (event)=>{
      //event.stopPropagation()
      this.carousel.activePrev()
    }
  }

  make(){
    return new BSCarouselControlPrev
  }

  setCarousel(carousel){
    this.carousel = carousel
    return this
  }

  configSelf(){
    this.setAttribute('href', "#" + this.carousel.getCarouselId())
    this.setAttribute('role', "button")
    this.setAttribute('data-slide', "prev")
    this.setInnerHTML(`<span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Prev</span>`)
  }

}
