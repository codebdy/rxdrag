import {RXElement} from "../rxelement"

export class HTMLBlockquote extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlBlockquote'
    this.toolboxInfo.elementName = "Blockquote"
    this.className = 'HTMLBlockquote'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol']

    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Blockquote Options'
    //}
    this.meta.tag = 'blockquote'
    //this.meta.innerHTML = "Blockquote text ..."
    this.label = "blockquote"

    this.becomeToTextfield()
  }

  make(){
    return new HTMLBlockquote
  }
  
}
