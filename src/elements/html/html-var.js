import {RXElement} from "../rxelement"
import {addonUtilColor} from "../schemas/utilities/color"
import {addonUtilBorder} from "../schemas/utilities/border"
import {addonUtilPadding} from "../schemas/utilities/padding"
import {addonUtilMargin} from "../schemas/utilities/margin"
import {addonUtilText} from "../schemas/utilities/text"
//import {addonHeadingPseudo} from "../../schemas/heading/pseudo-heading"
//import {addonHeadingDisplay} from "../../schemas/heading/display"
//import {addonUtilBorder} from "../../schemas/utilities/border"

export class HTMLVar extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlVar'
    this.toolboxInfo.elementName = "Var"
    this.className = 'HTMLVar'

    this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Var Options'
    //}
    this.meta.tag = 'var'
    this.meta.innerHTML = "Var text ..."
    this.label = "var"

    this.becomeToTextfield()
    /*addonUtilColor(this)
    addonUtilBorder(this)
    addonUtilMargin(this)
    addonUtilPadding(this)
    addonUtilText(this)*/
    //addonHeadingPseudo(this, 'textOptions')
    //addonHeadingDisplay(this, 'textOptions')
  }

  make(){
    return new HTMLVar
  }
  
}
