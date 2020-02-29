import {HTMLDiv} from "../../html/html-div"
import {BSCarouselIndicators} from "./bs-carousel-indicators"
import {BSCarouselInner} from "./bs-carousel-inner"
import {BSCarouselItem} from "./bs-carousel-item"
import {BSCarouselControlPrev} from "./bs-carousel-control-prev"
import {BSCarouselControlNext} from "./bs-carousel-control-next"

import fadeSchema from "../../schemas/components/carousel/fade"
import controlsSchema from "../../schemas/components/carousel/controls"
import indicatorsSchema from "../../schemas/components/carousel/indicators"

export class BSCarousel extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCarousel'
    this.toolboxInfo.elementName = "Carousel"
    this.className = 'BSCarousel'

    //this.editMarginStyle.padding = '20px;'
    this.setEditPadding('10px')

    this.acceptedChildren= []
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

    this.setField('showControls', true)
    this.addSchema(controlsSchema, 'carouselOptions')

    this.setField('showIndicators', true)
    this.addSchema(indicatorsSchema, 'carouselOptions')
    this.setAttribute('id', this.getCarouselId())

    this.indicators = new BSCarouselIndicators()
    this.inner = new BSCarouselInner()
    this.prev = new BSCarouselControlPrev()
    this.next = new BSCarouselControlNext()
    this.activeIndex = 0
  }

  make(){
    return new BSCarousel
  }

  nodeChanged(node){
    super.nodeChanged(node)
    if(node.id === this.id){
      this.children.length = 0;
      if(this.getField('showIndicators')){
        this.indicators.setIndicators()
        this.pushChild(this.indicators)
      }
      this.pushChild(this.inner)
      if(this.getField('showControls')){
        this.pushChild(this.prev)
        this.pushChild(this.next)
      }
    }
  }

  getCarouselId(){
    return 'carousel-' + this.id
  }

  activeItem(i){
    this.activeIndex = i
    this.doActive()
  }

  activePrev(){
    this.activeIndex --
    if(this.activeIndex < 0){
      this.activeIndex = this.getItemsCount() - 1
    }
    this.doActive()
  }

  activeNext(){
    this.activeIndex ++
    if(this.activeIndex >= this.getItemsCount()){
      this.activeIndex = 0
    }
    this.doActive()
  }

  doActive(){
    this.indicators.activeItem(this.activeIndex)
    this.inner.activeItem(this.activeIndex)
  }

  getItemsCount(){
    return this.inner.children.length
  }

  configSelf(){
    let indicators = this.indicators
    indicators.setCarousel(this)
    //indicators.addIndicator('0', 'active')
    //indicators.addIndicator('1')
    //indicators.addIndicator('2')
    this.pushChild(indicators)
    this.pushChild(this.inner.loadConfig())
    indicators.setIndicators()
    this.pushChild(this.prev.setCarousel(this).loadConfig())
    this.pushChild(this.next.setCarousel(this).loadConfig())
  }

  clone(){
    let copy = this.make()
    copy.indicators = this.indicators.clone().setCarousel(copy)
    copy.inner = this.inner.clone()
    copy.prev.setCarousel(copy).loadConfig()
    copy.next.setCarousel(copy).loadConfig()
    copy.nodeChanged(copy)
    return copy
  }
}
