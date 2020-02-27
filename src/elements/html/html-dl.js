import {RXElement} from "../rxelement"
import {addonHeadingPseudo} from "../schemas/heading/pseudo-heading"
import {addonHeadingDisplay} from "../schemas/heading/display"
import {addonTypyLead} from "../schemas/content/lead"

export class HTMLDl extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlDl'
    this.toolboxInfo.elementName = "dl"
    this.className = 'HTMLDl'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.meta.tag = 'dl'
    this.label = "dl"
    this.acceptedChildren=['HTMLDd','HTMLDt']
  }

  make(){
    return new HTMLDl
  }
}
