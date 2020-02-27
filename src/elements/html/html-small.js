import {RXElement} from "../rxelement"

export class HTMLSmall extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlSmall'
    this.toolboxInfo.elementName = "Small"
    this.className = 'HTMLSmall'

    this.editMarginStyle = {}

    this.meta.tag = 'small'
    this.meta.innerHTML = "Small text ..."
    this.label = "small"

    this.becomeToTextfield()
  }

  make(){
    return new HTMLSmall
  }
  }
