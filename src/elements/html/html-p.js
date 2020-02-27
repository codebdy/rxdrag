import {RXElement} from "../rxelement"

export class HTMLP extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlP'
    this.toolboxInfo.elementName = "P"
    this.className = 'HTMLP'

    this.meta.tag = 'p'
    this.label = "p"
    this.acceptedChildren=['HTMLDiv', 'HTMLSmall', 'HTMLSpan']
    this.becomeToTextfield()
  }

  make(){
    return new HTMLP
  }

}

