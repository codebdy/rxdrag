import {RXElement} from "../rxelement"

export class HTMLU extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlU'
    this.toolboxInfo.elementName = "U"
    this.className = 'HTMLU'

    this.editMarginStyle = {}

    this.meta.tag = 'u'
    this.meta.innerHTML = "U text ..."
    this.label = "u"

    this.becomeToTextfield()
  }

  make(){
    return new HTMLU
  }
}
