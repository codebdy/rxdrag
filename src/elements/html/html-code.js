import {RXElement} from "../rxelement"

export class HTMLCode extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlCode'
    this.toolboxInfo.elementName = "Code"
    this.className = 'HTMLCode'

    this.meta.tag = 'code'
    this.label = "code"
    this.acceptedChildren=['HTMLDiv', 'HTMLSmall', 'HTMLSpan']
    
    this.becomeToTextfield()
    this.meta.innerHTML = 'Code text'
  }

  make(){
    return new HTMLCode
  }

}

