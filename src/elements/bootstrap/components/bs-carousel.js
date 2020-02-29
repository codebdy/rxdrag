import {HTMLDiv} from "../../html/html-div"

//import {BSTextarea} from "./bs-textarea"

export class BSCarousel extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCarousel'
    this.toolboxInfo.elementName = "Carousel"
    this.className = 'BSCarousel'

    //this.editMarginStyle.padding = '20px;'
    this.editMarginStyle.padding = '10px'

    this.acceptedChildren= ''/*[
      'BSCarouselIndicators', 
      'BSCarouselInner', 
      'BSCarouselControlPrev',
      'BSCarouselControlNext',
    ]*/
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "carousel"
    this.addClass('carousel')
    this.addClass('slide')
  }

  make(){
    return new BSCarousel
  }

  configSelf(){

  }

}
