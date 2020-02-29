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

  configSelf(){
    this.pushChild(
      new BSCarouselItem()
      .loadConfig()
      .pushChild(
        new HTMLImg()
        .setAttribute('src', 'images/carousel1.jpg')
        .addClass('d-block')
        .addClass('w-100')
      )
      .addClass('active')
    )
    this.pushChild(
      new BSCarouselItem()
      .loadConfig()
      .pushChild(
        new HTMLImg()
        .setAttribute('src', 'images/carousel2.jpg')
        .addClass('d-block')
        .addClass('w-100')
      )
    )
    this.pushChild(
      new BSCarouselItem()
      .loadConfig()
      .pushChild(
        new HTMLImg()
        .setAttribute('src', 'images/carousel3.jpg')
        .addClass('d-block')
        .addClass('w-100')
      )
    )
  }

}
