import {RXElement} from "../rxelement"
//import parkMiniEditbar from "../../core/park-mini-editbar"
import {addonUtilColor} from "../schemas/utilities/color"
import {addonUtilBorder} from "../schemas/utilities/border"
import {addonUtilPadding} from "../schemas/utilities/padding"
import {addonUtilMargin} from "../schemas/utilities/margin"
import {addonUtilText} from "../schemas/utilities/text"
//import {addonHeadingPseudo} from "../../schemas/heading/pseudo-heading"
//import {addonHeadingDisplay} from "../../schemas/heading/display"
//import {addonUtilBorder} from "../../schemas/utilities/border"

export class HTMLFooter extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlFooter'
    this.toolboxInfo.elementName = "Footer"
    this.className = 'HTMLFooter'

    this.acceptedChildren=''
    this.exceptChildren = ['BSCol']
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Footer Options'
    //}
    this.$meta.tag = 'footer'
    //this.$meta.innerHTML = "Footer text ..."
    this.label = "Footer"

    addonUtilColor(this)
    addonUtilBorder(this)
    addonUtilMargin(this)
    addonUtilPadding(this)
    addonUtilText(this)
    //addonHeadingPseudo(this, 'typographyOptions')
    //addonHeadingDisplay(this, 'typographyOptions')
  }

  make(){
    return new HTMLFooter
  }
  
  /*toViewModel(){
    let model = super.toViewModel()

    parkMiniEditbar(model, this)

    return model
  }*/
}
