import {HTMLLi} from "../../html/html-li"

import activeSchema from "../../schemas/components/list/active"
import disabledSchema from "../../schemas/components/list/disabled"

export class BSNavItem extends HTMLLi{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsNavItem'
    this.toolboxInfo.elementName = "Nav Item"
    this.className = 'BSNavItem'
    this.acceptedChildren= ''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']
    this.label = "nav-item"
    this.addClass('nav-item')

    this.addSchema(activeSchema, 'listOptions')
    this.addSchema(disabledSchema, 'listOptions')
  }

  make(){
    return new BSNavItem
  }

}

