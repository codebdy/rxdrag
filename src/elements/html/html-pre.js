import {RXElement} from "../rxelement"

export class HTMLPre extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlPre'
    this.toolboxInfo.elementName = "Pre"
    this.className = 'HTMLPre'

    this.meta.tag = 'pre'
    this.label = "pre"
    this.acceptedChildren=['HTMLDiv', 'HTMLSmall', 'HTMLCode','HTMLSpan']

    this.becomeToTextfield()
  }

  make(){
    return new HTMLPre
  }

}

