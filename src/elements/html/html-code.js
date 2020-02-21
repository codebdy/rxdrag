import {RXTextfieldable} from "./textfieldable"
import {addonHeadingPseudo} from "../schemas/heading/pseudo-heading"
import {addonHeadingDisplay} from "../schemas/heading/display"
import {addonTypyLead} from "../schemas/content/lead"

export class HTMLCode extends RXTextfieldable{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlCode'
    this.toolboxInfo.elementName = "Code"
    this.className = 'HTMLCode'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'code'
    this.label = "code"
    this.acceptedChildren=['HTMLDiv', 'HTMLSmall', 'HTMLSpan']

    addonHeadingPseudo(this, 'typographyOptions')
    addonHeadingDisplay(this, 'typographyOptions')
    addonTypyLead(this, 'typographyOptions')
  }

  make(){
    return new HTMLCode
  }

}

