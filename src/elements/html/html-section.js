import {RXElement} from "../rxelement"
import textfieldSchema from "../schemas/general/textfield"

export class HTMLSection extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'section'
    this.toolboxInfo.elementName = "Section"
    this.className = 'HTMLSection'
    this.meta.tag = 'section'
    this.label = "section"
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol']
  }

  make(){
    return new HTMLSection
  }

  toViewModel(){
    let model = super.toViewModel()
    return model
  }
}
