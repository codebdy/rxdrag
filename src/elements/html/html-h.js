import {RXElement} from "../rxelement"
import {addonHeadingTag} from "../schemas/heading/tag"
import {addonHeadingDisplay} from "../schemas/heading/display"
import {addonGeneralTextfield} from "../schemas/general/textfield"

export class HTMLH extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlH'
    this.toolboxInfo.elementName = "H(1~6)"
    this.className = 'HTMLH'

    //this.editMarginStyle = {}

    this.unshiftGroup({
      id:'headingOptions',
      label:'Heading Options',
    })

    this.meta.tag = 'h2'
    //this.meta.innerHTML = "Heading"
    this.label = "heading"

    this.acceptedChildren=['HTMLDiv', 'HTMLSmall', 'HTMLSpan']

    this.becomeToTextfield()
    //addonGeneralTextfield(this)
    //addonHeadingTag(this, 'typographyOptions')
    //addonHeadingDisplay(this, 'typographyOptions')
  }

  make(){
    return new HTMLH
  }
  
}
