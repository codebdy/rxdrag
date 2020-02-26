import {RXElement} from "../rxelement"
//import {addonHeadingPseudo} from "../schemas/heading/pseudo-heading"
//import {addonHeadingDisplay} from "../schemas/heading/display"
//import {addonTypyLead} from "../schemas/content/lead"
//import {addonGeneralTextfield} from "../schemas/general/textfield"

export class HTMLPre extends RXElement{
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

    this.becomeToTextfield()
    //addonGeneralTextfield(this)
    //addonHeadingPseudo(this, 'typographyOptions')
    //addonHeadingDisplay(this, 'typographyOptions')
    //addonTypyLead(this, 'typographyOptions')
  }

  make(){
    return new HTMLPre
  }

}

