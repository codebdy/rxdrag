import {RXElement} from "../../rxelement"
import parkMiniEditbar from "../../../core/park-mini-editbar"
import {addonHeadingPseudo} from "../../schemas/heading/pseudo-heading"
import {addonHeadingDisplay} from "../../schemas/heading/display"
//import {addonUtilBorder} from "../../schemas/utilities/border"

export class BSParagraph extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupContent'
    this.toolboxInfo.elementId = 'bsParagraph'
    this.toolboxInfo.elementName = "Paragraph"
    this.className = 'BSParagraph'

    this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'p'
    this.$meta.innerHTML = "Please input paragraph text ..."
    this.label = "Paragraph"

    addonHeadingPseudo(this, 'typographyOptions')
    addonHeadingDisplay(this, 'typographyOptions')
  }

  make(){
    return new BSParagraph
  }
  
  toViewModel(){
    let model = super.toViewModel()

    parkMiniEditbar(model, this)

    return model
  }
}
