import {HTMLLi} from "../../html/html-li"

export class BSCarouselIndicator extends HTMLLi{
  constructor(carousel, i, active) {
    super()
    this.carousel = carousel
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCarouselIndicator'
    this.toolboxInfo.elementName = "CarouselIndicator"
    this.className = 'BSCarouselIndicator'
    this.editMarginStyle.padding = ''

    this.label = "carousel indicator"
    this.setAttribute('data-target', "#" + carousel.getCarouselId())
    this.setAttribute('data-slide-to', "" + i)
    if(active){
      this.addClass('active')
    }

    this.onclick = (event)=>{
      event.stopPropagation()
      //this.state.onClick(event)
      this.carousel.activeItem(i)
    }
  }

  make(){
    return new BSCarouselIndicator
  }

}
