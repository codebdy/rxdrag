import {HTMLA} from "../../html/html-a"

//import {BSTextarea} from "./bs-textarea"

export class BSCarouselControlNext extends HTMLA{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCarouselControlNext'
    this.toolboxInfo.elementName = "Carousel Control Next"
    this.className = 'BSCarouselControlNext'

    this.editMarginStyle.padding = ''

    this.acceptedChildren= []

    this.label = "next"
    this.addClass('carousel-control-next')
  }

  make(){
    return new BSCarouselControlNext
  }

  configSelf(){

  }

}
