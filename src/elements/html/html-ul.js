import {RXElement} from "../rxelement"
import unstyledSchema from "../schemas/list/unstyled"
import inlineSchema from "../schemas/list/inline"

export class HTMLUl extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlUL'
    this.toolboxInfo.elementName = "ul"
    this.className = 'HTMLUl'

    this.unshiftGroup({
      id:'listOptions',
      label:'List Options',
    })
    this.meta.tag = 'ul'
    this.label = "ul"
    this.acceptedChildren=['HTMLLi']
    
    this.addSchema(unstyledSchema, 'listOptions')
    this.addSchema(inlineSchema, 'listOptions')
    //addonTypyListUnstyled(this)
    //addonTypyListInline(this)
  }

  make(){
    return new HTMLUl
  }
}
