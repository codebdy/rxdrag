import {HTMLDiv} from "../../html/html-div"
import {BSCarouselIndicators} from "./bs-carousel-indicators"
import {BSCarouselInner} from "./bs-carousel-inner"
import {BSCarouselItem} from "./bs-carousel-item"
import {BSCarouselControlPrev} from "./bs-carousel-control-prev"
import {BSCarouselControlNext} from "./bs-carousel-control-next"

import fadeSchema from "../../schemas/components/carousel/fade"

export class BSCarousel extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCarousel'
    this.toolboxInfo.elementName = "Carousel"
    this.className = 'BSCarousel'

    //this.editMarginStyle.padding = '20px;'
    this.setEditPadding('10px')

    this.acceptedChildren= ''/*[
      'BSCarouselIndicators', 
      'BSCarouselInner', 
      'BSCarouselControlPrev',
      'BSCarouselControlNext',
    ]*/
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.unshiftGroup({
      id:'carouselOptions',
      label:'Carousel Options',
    })

    this.label = "carousel"
    this.addClass('carousel')
    this.addClass('slide')
    this.setAttribute('data-ride', 'carousel')
    this.addSchema(fadeSchema, 'carouselOptions')
  }

  make(){
    return new BSCarousel
  }

  configSelf(){
    let carouselId = 'carousel-' + this.id
    this.setAttribute('id', carouselId)
    let indicators = new BSCarouselIndicators().loadConfig()
    indicators.setCarouselId(carouselId)
    indicators.addIndicator('0', 'active')
    indicators.addIndicator('1')
    indicators.addIndicator('2')
    this.pushChild(indicators)
    this.pushChild(new BSCarouselInner().loadConfig())
    this.pushChild(new BSCarouselControlPrev().setCarouselId(carouselId).loadConfig())
    this.pushChild(new BSCarouselControlNext().setCarouselId(carouselId).loadConfig())
  }

}
