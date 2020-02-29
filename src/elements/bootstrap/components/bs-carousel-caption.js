import {HTMLDiv} from "../../html/html-div"

//import {BSTextarea} from "./bs-textarea"

export class BSCarouselCaption extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCarouselCaption'
    this.toolboxInfo.elementName = "Carousel Caption"
    this.className = 'BSCarouselCaption'

    this.editMarginStyle.padding = '10px'

    this.acceptedChildren= ''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "carousel caption"
    this.addClass('carousel-caption')
  }

  make(){
    return new BSCarouselCaption
  }

  configSelf(){

  }

}
