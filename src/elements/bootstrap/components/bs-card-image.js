import {HTMLImg} from "../../html/html-img"

export class BSCardImage extends HTMLImg{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCardImage'
    this.toolboxInfo.elementName = "Card Image"
    this.className = 'BSCardImage'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle.padding = ''

    //this.acceptedChildren=[]

    this.label = "card image"
    this.addClass('card-img-top')
  }

  make(){
    return new BSCardImage
  }
  configSelf(){
    this.setAttribute('src','images/card.jpg')
  }
}
