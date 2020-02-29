import {HTMLH} from "../../html/html-h"

export class BSCardTitle extends HTMLH{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCardTitle'
    this.toolboxInfo.elementName = "CardTitle"
    this.className = 'BSCardTitle'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle.padding = '10px'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "card title"
    this.meta.tag = 'h5'
    this.addClass('card-title')
  }

  make(){
    return new BSCardTitle
  }

  configSelf(){
    this.setInnerHTML('Card title')
  }
}
