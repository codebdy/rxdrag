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

    this.indicators = new BSCarouselIndicators()
    this.inner = new BSCarouselInner()
    this.prev = new BSCarouselControlPrev()
    this.next = new BSCarouselControlNext()
    this.activeIndex = 0
  }

  make(){
    return new BSCarousel
  }

  getCarouselId(){
    return 'carousel-' + this.id
  }

  getItemsCount(){
    return this.inner.children.length
  }

  configSelf(){
    let carouselId = this.getCarouselId()
    this.setAttribute('id', carouselId)
    let indicators = this.indicators
    indicators.setCarousel(this)
    //indicators.addIndicator('0', 'active')
    //indicators.addIndicator('1')
    //indicators.addIndicator('2')
    this.pushChild(indicators)
    this.pushChild(this.inner.loadConfig())
    this.pushChild(this.prev.setCarouselId(carouselId).loadConfig())
    this.pushChild(this.next.setCarouselId(carouselId).loadConfig())
  }

}
