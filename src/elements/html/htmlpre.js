import {RXTextfieldable} from "./textfieldable"
import {addonHeadingPseudo} from "../schemas/heading/pseudo-heading"
import {addonHeadingDisplay} from "../schemas/heading/display"
import {addonTypyLead} from "../schemas/content/lead"

export class HTMLPre extends RXTextfieldable{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlPre'
    this.toolboxInfo.elementName = "Pre"
    this.className = 'HTMLPre'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'pre'
    this.label = "pre"
    this.acceptedChildren=['HTMLDiv', 'HTMLSmall', 'HTMLCode','HTMLSpan']

    addonHeadingPseudo(this, 'typographyOptions')
    addonHeadingDisplay(this, 'typographyOptions')
    addonTypyLead(this, 'typographyOptions')
  }

  make(){
    return new HTMLPre
  }

}

