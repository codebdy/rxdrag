import {HTMLDiv} from "../../html/html-div"
import {HTMLImg} from "../../html/html-img"

import {BSCarouselItem} from "./bs-carousel-item"

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
  configSelf(){
    this.pushChild(
      new BSCarouselItem()
      .setImage('images/carousel1.jpg')
      .addClass('active')
      .loadConfig()
    )
    this.pushChild(
      new BSCarouselItem()
      .setImage('images/carousel2.jpg')
      .loadConfig()
    )
    this.pushChild(
      new BSCarouselItem()
      .setImage('images/carousel3.jpg')
      .loadConfig()
    )
  }

}
