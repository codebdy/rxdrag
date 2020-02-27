import {RXElement} from "../rxelement"

export class HTMLP extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlP'
    this.toolboxInfo.elementName = "P"
    this.className = 'HTMLP'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.meta.tag = 'p'
    this.label = "p"
    this.acceptedChildren=['HTMLDiv', 'HTMLSmall', 'HTMLSpan']
    this.becomeToTextfield()
  }

  make(){
    return new HTMLP
  }

}

