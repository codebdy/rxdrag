import {RXElement} from "../rxelement"
import unstyledSchema from "../schemas/list/unstyled"
import inlineSchema from "../schemas/list/inline"

export class HTMLOl extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlOl'
    this.toolboxInfo.elementName = "Ol"
    this.className = 'HTMLOl'

    this.unshiftGroup({
      id:'listOptions',
      label:'List Options',
    })
    this.meta.tag = 'ol'
    this.label = "ol"
    this.acceptedChildren=['HTMLLi']
    
    this.addSchema(unstyledSchema, 'listOptions')
    this.addSchema(inlineSchema, 'listOptions')
  }

  make(){
    return new HTMLOl
  }
}
