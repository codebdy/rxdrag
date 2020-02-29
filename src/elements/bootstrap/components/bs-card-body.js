import {HTMLDiv} from "../../html/html-div"

import {BSCardTitle} from "./bs-card-title"
import {BSCardText} from "./bs-card-text"

export class BSCardBody extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCardBody'
    this.toolboxInfo.elementName = "CardBody"
    this.className = 'BSCardBody'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle.padding = '10px'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "card body"
    this.addClass('card-body')
  }

  make(){
    return new BSCardBody
  }

  configSelf(){
    this.pushChild(new BSCardTitle().loadConfig())
    this.pushChild(new BSCardText().loadConfig())
  }
}
