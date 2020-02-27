import {RXElement} from "../../rxelement"
import leadSchema from "../../schemas/general/lead"

export class BSParagraph extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupContent'
    this.toolboxInfo.elementId = 'bsParagraph'
    this.toolboxInfo.elementName = "Paragraph"
    this.className = 'BSParagraph'

    this.editMarginStyle = {}

    this.meta.tag = 'p'
    this.meta.innerHTML = "Please input paragraph text ..."
    this.label = "Paragraph"

    this.addSchema(leadSchema, 'textOptions')
    this.becomeToTextfield()
  }

  make(){
    return new BSParagraph
  }
  
}
