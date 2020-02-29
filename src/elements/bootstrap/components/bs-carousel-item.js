import {HTMLDiv} from "../../html/html-div"

import {BSCarouselCaption} from "./bs-carousel-caption"
import srcSchema from "../../schemas/components/carousel/src"
import altSchema from "../../schemas/components/carousel/alt"

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

    this.unshiftGroup({
      id:'slideOptions',
      label:'Slide Options',
    })

    this.addSchema(srcSchema, 'slideOptions')
    this.addSchema(altSchema, 'slideOptions')

    this.duplicate = ()=>{
      this.changeToState('normalState')
      rxEditor.commandManager.duplicate(this)
      this.setImage('images/carousel-new.jpg')
      rxEditor.render()
    }
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
