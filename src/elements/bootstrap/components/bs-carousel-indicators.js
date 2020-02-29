import {HTMLOl} from "../../html/html-ol"
import {HTMLLi} from "../../html/html-li"

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

  setCarouselId(carouselId){
    this.carouselId = carouselId
    return this
  }

  addIndicator(index, active){
    this.pushChild(
      new HTMLLi()
      .setAttribute('data-target', "#" + this.carouselId)
      .setAttribute('data-slide-to', index)
      .setEditPadding('')
      .addClass(active)
    )
  }

  configSelf(){

  }

}
