import {HTMLDiv} from "../../html/html-div"

import {BSCarouselCaption} from "./bs-carousel-caption"

export class BSCarouselItem extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCarouselItem'
    this.toolboxInfo.elementName = "Carousel Item"
    this.className = 'BSCarouselItem'

    this.editMarginStyle.padding = ''

    this.acceptedChildren= ''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "carousel item"
    this.addClass('carousel-item')
  }

  make(){
    return new BSCarouselItem
  }

  metaToModel(model){
    model.innerHTML = `
      <img src="${this.getField('imgSrc')}" 
      class="d-block w-100" alt="${this.getField('imgAlt')}">
    `
  }

  setImage(imgSrc){
    this.setField('imgSrc', imgSrc)
    return this
  }

  configSelf(){
    this.pushChild(
      new BSCarouselCaption().loadConfig()
    )
  }

}
