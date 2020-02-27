import {RXElement} from "../rxelement"
export class HTMLSource extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlSource'
    this.toolboxInfo.elementName = "Source"
    this.className = 'HTMLSource'

    this.meta.tag = 'source'
    this.label = "source"

  }

  make(){
    return new HTMLSource
  }
  
}
