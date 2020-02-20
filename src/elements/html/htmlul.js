import {RXElement} from "../rxelement"
import {addonHeadingPseudo} from "../schemas/heading/pseudo-heading"
import {addonHeadingDisplay} from "../schemas/heading/display"
import {addonTypyLead} from "../schemas/content/lead"

export class HTMLUl extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlUL'
    this.toolboxInfo.elementName = "ul"
    this.className = 'HTMLUl'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'ul'
    this.label = "ul"
    this.acceptedChildren=['HTMLLi']
  }

  make(){
    return new HTMLUl
  }
}
