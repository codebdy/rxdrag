import {RXElement} from "../rxelement"
import parkMiniEditbar from "../../core/park-mini-editbar"
import {addonUtilColor} from "../schemas/utilities/color"
import {addonUtilBorder} from "../schemas/utilities/border"
import {addonUtilPadding} from "../schemas/utilities/padding"
import {addonUtilMargin} from "../schemas/utilities/margin"
import {addonUtilText} from "../schemas/utilities/text"
//import {addonHeadingPseudo} from "../../schemas/heading/pseudo-heading"
//import {addonHeadingDisplay} from "../../schemas/heading/display"
//import {addonUtilBorder} from "../../schemas/utilities/border"

export class HTMLStrong extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlStrong'
    this.toolboxInfo.elementName = "Strong"
    this.className = 'HTMLStrong'

    this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Strong Options'
    //}
    this.$meta.tag = 'strong'
    this.$meta.innerHTML = "Strong text ..."
    this.label = "Strong"

    addonUtilColor(this)
    addonUtilBorder(this)
    addonUtilMargin(this)
    addonUtilPadding(this)
    addonUtilText(this)
    //addonHeadingPseudo(this, 'typographyOptions')
    //addonHeadingDisplay(this, 'typographyOptions')
  }

  make(){
    return new HTMLStrong
  }
  
  toViewModel(){
    let model = super.toViewModel()

    parkMiniEditbar(model, this)

    return model
  }
}
