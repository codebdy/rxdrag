import {HTMLDiv} from "../../html/html-div"

//import {BSTextarea} from "./bs-textarea"

export class BSCarouselItem extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCarouselItem'
    this.toolboxInfo.elementName = "Carousel Item"
    this.className = 'BSCarouselItem'

    this.editMarginStyle.padding = '10px'

    this.acceptedChildren= ''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "carousel item"
    this.addClass('carousel-item')
  }

  make(){
    return new BSCarouselItem
  }

  configSelf(){

  }

}
