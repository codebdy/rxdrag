import {HTMLA} from "../../html/html-a"

//import {BSTextarea} from "./bs-textarea"

export class BSCarouselControlPrev extends HTMLA{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCarouselControlPrev'
    this.toolboxInfo.elementName = "Carousel Control Prev"
    this.className = 'BSCarouselControlPrev'

    this.editMarginStyle.padding = ''

    this.acceptedChildren= []

    this.label = "prev"
    this.addClass('carousel-control-prev')
  }

  make(){
    return new BSCarouselControlPrev
  }

  configSelf(){

  }

}
