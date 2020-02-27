import {RXElement} from "../rxelement"

export class HTMLDl extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlDl'
    this.toolboxInfo.elementName = "dl"
    this.className = 'HTMLDl'

    this.meta.tag = 'dl'
    this.label = "dl"
    this.acceptedChildren=['HTMLDd','HTMLDt']
  }

  make(){
    return new HTMLDl
  }
}
