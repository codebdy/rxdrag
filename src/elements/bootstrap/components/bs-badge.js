import {RXElement} from "../../rxelement"
import contextualSchema from "../../schemas/components/badge/contextual"
import pillSchema from "../../schemas/components/badge/pill"


export class BSBadge extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsBadge'
    this.toolboxInfo.elementName = "Badge"
    this.className = 'BSBadge'

    this.editMarginStyle.padding = ''
    //this.editMarginStyle = {}

    this.unshiftGroup({
      id:'badgeOptions',
      label:'Badge Options',
    })

    this.meta.tag = 'span'
    this.meta.baseClass = 'badge' 
    this.label = "badge"
    this.acceptedChildren=[]

    this.addClass('badge')
    this.addSchema(contextualSchema, 'badgeOptions')
    this.addSchema(pillSchema, 'badgeOptions')
  }

  make(){
    return new BSBadge
  }


  loadConfig(){
    this.addClass('badge-primary')
    this.setField('innerHTML', 'badge')
    return this
  }

}
