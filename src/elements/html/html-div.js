import {RXElement} from "../rxelement"
import {addonGeneralTextfield} from "../schemas/general/textfield"

export class HTMLDiv extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'div'
    this.toolboxInfo.elementName = "DIV"
    this.className = 'HTMLDiv'
    this.label = "div"
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol']

    //addonGeneralTextfield(this)
  }

  make(){
    return new HTMLDiv
  }

  toViewModel(){
    let model = super.toViewModel()
    return model
  }
}
