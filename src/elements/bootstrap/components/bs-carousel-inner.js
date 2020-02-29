import {HTMLDiv} from "../../html/html-div"

//import {BSTextarea} from "./bs-textarea"

export class BSCarouselInner extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCarouselInner'
    this.toolboxInfo.elementName = "Carousel Inner"
    this.className = 'BSCarouselInner'

    this.editMarginStyle.padding = '10px'

    this.acceptedChildren= ''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "carousel inner"
    this.addClass('carousel-inner')
  }

  make(){
    return new BSCarouselInner
  }

  configSelf(){

  }

}
