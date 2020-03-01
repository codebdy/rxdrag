import {HTMLLi} from "../../html/html-li"

import actionSchema from "../../schemas/components/list/action"
import activeSchema from "../../schemas/components/list/active"
import disabledSchema from "../../schemas/components/list/disabled"
import contextualSchema from "../../schemas/components/list/contextual"

export class BSListGroupItem extends HTMLLi{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsListGroupItem'
    this.toolboxInfo.elementName = "List Group Item"
    this.className = 'BSListGroupItem'
    this.acceptedChildren= ''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']
    this.label = "item"
    this.addClass('list-group-item')

    this.addSchema(activeSchema, 'listOptions')
    this.addSchema(actionSchema, 'listOptions')
    this.addSchema(disabledSchema, 'listOptions')
    this.addSchema(contextualSchema, 'listOptions')
  }

  make(){
    return new BSListGroupItem
  }

}

