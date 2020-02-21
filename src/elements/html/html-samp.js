import {RXTextfieldable} from "./textfieldable"
import {addonHeadingPseudo} from "../schemas/heading/pseudo-heading"
import {addonHeadingDisplay} from "../schemas/heading/display"
import {addonTypyLead} from "../schemas/content/lead"

export class HTMLSamp extends RXTextfieldable{
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
    this.$meta.tag = 'samp'
    this.label = "samp"
    this.acceptedChildren=['HTMLDiv', 'HTMLSmall', 'HTMLCode','HTMLSpan']

    addonHeadingPseudo(this, 'typographyOptions')
    addonHeadingDisplay(this, 'typographyOptions')
    addonTypyLead(this, 'typographyOptions')
  }

  make(){
    return new HTMLSamp
  }

}

