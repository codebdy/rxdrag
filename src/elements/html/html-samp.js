import {RXElement} from "../rxelement"
//import {addonHeadingPseudo} from "../schemas/heading/pseudo-heading"
//import {addonHeadingDisplay} from "../schemas/heading/display"
import {addonTypyLead} from "../schemas/content/lead"

export class HTMLSamp extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlSamp'
    this.toolboxInfo.elementName = "Samp"
    this.className = 'HTMLSamp'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.meta.tag = 'samp'
    this.label = "samp"
    this.acceptedChildren=['HTMLDiv', 'HTMLSmall', 'HTMLCode','HTMLSpan']

    this.becomeToTextfield()
    //addonHeadingPseudo(this, 'textOptions')
    //addonHeadingDisplay(this, 'textOptions')
    //addonTypyLead(this, 'textOptions')
  }

  make(){
    return new HTMLSamp
  }

}

