import {RXElement} from "../rxelement"

export class HTMLFooter extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlFooter'
    this.toolboxInfo.elementName = "Footer"
    this.className = 'HTMLFooter'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol']
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Footer Options'
    //}
    this.meta.tag = 'footer'
    //this.meta.innerHTML = "Footer text ..."
    this.label = "footer"
  }

  make(){
    return new HTMLFooter
  }
}
