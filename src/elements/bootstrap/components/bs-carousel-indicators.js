import {HTMLOl} from "../../html/html-ol"

//import {BSTextarea} from "./bs-textarea"

export class BSCarouselIndicators extends HTMLOl{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCarouselIndicators'
    this.toolboxInfo.elementName = "Carousel Indicators"
    this.className = 'BSCarouselIndicators'

    //this.editMarginStyle.padding = '20px;'
    this.editMarginStyle.padding = '10px'

    this.acceptedChildren= ''/*[
      'BSCarouselIndicatorsIndicators', 
      'BSCarouselIndicatorsInner', 
      'BSCarouselIndicatorsControlPrev',
      'BSCarouselIndicatorsControlNext',
    ]*/
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "carousel indicators"
    this.addClass('carousel-indicators')
  }

  make(){
    return new BSCarouselIndicators
  }

  configSelf(){

  }

}
