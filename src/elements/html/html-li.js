import {RXElement} from "../rxelement"
import inlineItemSchema from "../schemas/list/inline-item"

export class HTMLLi extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlLi'
    this.toolboxInfo.elementName = "li"
    this.className = 'HTMLLi'

    this.unshiftGroup({
      id:'listOptions',
      label:'List Options',
    })

    this.meta.tag = 'li'
    this.label = "li"
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol']
    //this.becomeToTextfield()
    //addonGeneralTextfield(this)
    this.addSchema(inlineItemSchema, 'listOption')
  }

  make(){
    return new HTMLLi
  }

}
