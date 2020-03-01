import {HTMLA} from "../../html/html-a"

import activeSchema from "../../schemas/components/list/active"
import disabledSchema from "../../schemas/components/list/disabled"

export class BSNavLink extends HTMLA{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsNavLink'
    this.toolboxInfo.elementName = "Nav Link"
    this.className = 'BSNavLink'
    this.acceptedChildren= ''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']
    this.label = "nav link"
    this.addClass('nav-link')
    
    this.unshiftGroup({
      id:'navOptions',
      label:'Nav Options',
    })

    this.addSchema(activeSchema, 'navOptions')
    this.addSchema(disabledSchema, 'navOptions')
  }

  make(){
    return new BSNavLink
  }

}

