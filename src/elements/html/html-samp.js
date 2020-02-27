import {RXElement} from "../rxelement"

export class HTMLSamp extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlSamp'
    this.toolboxInfo.elementName = "Samp"
    this.className = 'HTMLSamp'

    this.meta.tag = 'samp'
    this.label = "samp"
    this.acceptedChildren=['HTMLDiv', 'HTMLSmall', 'HTMLCode','HTMLSpan']

    this.becomeToTextfield()
  }

  make(){
    return new HTMLSamp
  }

}

