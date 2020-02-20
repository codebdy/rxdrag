import {RXElement} from "../rxelement"
import {addonHeadingPseudo} from "../schemas/heading/pseudo-heading"
import {addonHeadingDisplay} from "../schemas/heading/display"
import {addonTypyLead} from "../schemas/content/lead"
import {addonGeneralTextfield} from "../schemas/general/textfield"

export class HTMLP extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlP'
    this.toolboxInfo.elementName = "P"
    this.className = 'HTMLP'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'p'
    this.label = "p"
    this.acceptedChildren=['HTMLDiv', 'HTMLSmall', 'HTMLSpan']

    addonGeneralTextfield(this)
    addonHeadingPseudo(this, 'typographyOptions')
    addonHeadingDisplay(this, 'typographyOptions')
    addonTypyLead(this, 'typographyOptions')
  }

  make(){
    return new HTMLP
  }

  toViewModel(){
    if(this.$meta.generalTextfield === 'contentEditable'
      || this.children.length > 0){
      this.editMarginStyle.padding = ''
    }
    else{
      this.editMarginStyle.padding = '30px'
    }
    return super.toViewModel()
  }

}

