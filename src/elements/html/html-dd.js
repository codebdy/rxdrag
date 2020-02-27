import {RXElement} from "../rxelement"

export class HTMLDd extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlDl'
    this.toolboxInfo.elementName = "dd"
    this.className = 'HTMLDd'

    this.meta.tag = 'dd'
    this.label = "dd"
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol']
    this.becomeToTextfield()
  }

  make(){
    return new HTMLDd
  }


}
