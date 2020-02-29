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
    //this.editMarginStyle.padding = ''

    this.acceptedChildren= []/*[
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

  setCarousel(carousel){
    this.carousel = carousel
    return this
  }

  metaToModel(model){
    let innerHTML = ''
    for(var i = 0; i < this.carousel.getItemsCount(); i++){
      innerHTML = innerHTML 
                + `<li data-target="#${this.carousel.getCarouselId()}" 
                    data-slide-to="${i}" 
                    ${this.carousel.activeIndex === i ? 'class="active"' : ''}>
                   </li>`
    }
    this.setInnerHTML(innerHTML)
  }

}

