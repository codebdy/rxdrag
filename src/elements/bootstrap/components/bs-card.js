import {HTMLDiv} from "../../html/html-div"

import {BSCardImage} from "./bs-card-image"
import {BSCardHeader} from "./bs-card-header"
import {BSCardBody} from "./bs-card-body"
import {BSCardFooter} from "./bs-card-footer"
//import {BSTextarea} from "./bs-textarea"

export class BSCard extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCard'
    this.toolboxInfo.elementName = "Card"
    this.className = 'BSCard'

    //this.editMarginStyle.padding = '20px;'
    this.editMarginStyle.padding = '10px'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "card"
    this.addClass('card')
  }

  make(){
    return new BSCard
  }

  configSelf(){
    this.addClass('text-center')
    this.pushChild(new BSCardHeader().loadConfig().setInnerHTML('Card Header'))
    this.pushChild(new BSCardImage().loadConfig())
    this.pushChild(new BSCardBody().loadConfig())
    this.pushChild(new BSCardFooter().loadConfig().addClass('text-muted').setInnerHTML('2 days ago'))
  }

}
