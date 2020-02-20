import {RXElement} from "../rxelement"
import {addonHeadingPseudo} from "../schemas/heading/pseudo-heading"
import {addonHeadingDisplay} from "../schemas/heading/display"
//import {addonUtilBorder} from "../../schemas/utilities/border"

export class HTMLP extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupContent'
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

    addonHeadingPseudo(this, 'typographyOptions')
    addonHeadingDisplay(this, 'typographyOptions')
  }

  make(){
    return new HTMLP
  }
}
