import {HTMLOl} from "../../html/html-ol"
import {HTMLLi} from "../../html/html-li"
import {BSCarouselIndicator} from "./bs-carousel-indicator"

export class BSCarouselIndicators extends HTMLOl{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCarouselIndicators'
    this.toolboxInfo.elementName = "Carousel Indicators"
    this.className = 'BSCarouselIndicators'
    this.editMarginStyle.padding = ''

    this.acceptedChildren= []
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "carousel indicators"
    this.addClass('carousel-indicators')
  }

  make(){
    return new BSCarouselIndicators
  }

  activeItem(i){
    for(var index = 0; index < this.children.length; index ++){
      if(this.children[index].view){
        if(i === index){
          this.children[index].view.$dom.classList.add('active')
        }
        else{
          this.children[index].view.$dom.classList.remove('active')
        }
      }
    }
  }

  setCarousel(carousel){
    this.carousel = carousel
    return this
  }

  setIndicators(){
    this.children.length = 0
    for(var i = 0; i < this.carousel.getItemsCount(); i++){
      this.pushChild(
        new BSCarouselIndicator(this.carousel, i, i === this.carousel.activeIndex)
      )
    }
  }

  clone(){
    let copy = this.make()
    copy.toolboxInfo = JSON.parse(JSON.stringify(this.toolboxInfo))
    copy.meta = JSON.parse(JSON.stringify(this.meta))
    copy.setCarousel(this.carousel)
    return copy
  }

}

