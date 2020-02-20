import {RXTextfieldable} from "./textfieldable"
import {addonUtilColor} from "../schemas/utilities/color"
import {addonUtilBorder} from "../schemas/utilities/border"
import {addonUtilPadding} from "../schemas/utilities/padding"
import {addonUtilMargin} from "../schemas/utilities/margin"
import {addonUtilText} from "../schemas/utilities/text"
//import {addonHeadingPseudo} from "../../schemas/heading/pseudo-heading"
//import {addonHeadingDisplay} from "../../schemas/heading/display"
//import {addonUtilBorder} from "../../schemas/utilities/border"

export class HTMLDt extends RXTextfieldable{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlDt'
    this.toolboxInfo.elementName = "Dt"
    this.className = 'HTMLDt'

    this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Dt Options'
    //}
    this.$meta.tag = 'dt'
    this.$meta.innerHTML = "Dt text ..."
    this.label = "dt"

    addonUtilColor(this)
    addonUtilBorder(this)
    addonUtilMargin(this)
    addonUtilPadding(this)
    addonUtilText(this)
    //addonHeadingPseudo(this, 'typographyOptions')
    //addonHeadingDisplay(this, 'typographyOptions')
  }

  make(){
    return new HTMLDt
  }
}
