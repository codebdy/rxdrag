import {RXElement} from "../rxelement"

export class HTMLAbbr extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlAbbr'
    this.toolboxInfo.elementName = "Abbr"
    this.className = 'HTMLAbbr'

    this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Abbr Options'
    //}
    this.meta.tag = 'abbr'
    this.meta.innerHTML = "Abbr text ..."
    this.label = "abbr"

    this.becomeToTextfield()
  }

  make(){
    return new HTMLAbbr
  }
  
}
