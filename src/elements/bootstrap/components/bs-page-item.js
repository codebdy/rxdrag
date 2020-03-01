import {HTMLLi} from "../../html/html-li"

import activeSchema from "../../schemas/components/list/active"
import disabledSchema from "../../schemas/components/list/disabled"

export class BSPageItem extends HTMLLi{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsPageItem'
    this.toolboxInfo.elementName = "Page Item"
    this.className = 'BSPageItem'
    this.acceptedChildren= ''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.unshiftGroup({
      id:'pageItemOptions',
      label:'Item Options',
    })

    this.label = "page item"
    this.addSchema(activeSchema, 'pageItemOptions')
    this.addSchema(disabledSchema, 'pageItemOptions')

    this.addClass('page-item')
  }

  make(){
    return new BSPageItem
  }

  configSelf(){
  }

}

