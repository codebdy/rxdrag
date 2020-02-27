import {RXElement} from "../rxelement"
import {addonUtilColor} from "../schemas/utilities/color"
import {addonUtilBorder} from "../schemas/utilities/border"
import {addonUtilPadding} from "../schemas/utilities/padding"
import {addonUtilMargin} from "../schemas/utilities/margin"
import {addonUtilText} from "../schemas/utilities/text"
import {addonGeneralTextfield} from "../schemas/general/textfield"
//import {addonHeadingDisplay} from "../../schemas/heading/display"
//import {addonUtilBorder} from "../../schemas/utilities/border"

export class HTMLSpan extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlSpan'
    this.toolboxInfo.elementName = "Span"
    this.className = 'HTMLSpan'

    //this.groups.paragraphOptions = {
    //  label:'Span Options'
    //}
    this.meta.tag = 'span'
    this.meta.innerHTML = "Span text ..."
    this.label = "span"

    this.becomeToTextfield()
    /*addonGeneralTextfield(this)
    addonUtilColor(this)
    addonUtilBorder(this)
    addonUtilMargin(this)
    addonUtilPadding(this)
    addonUtilText(this)*/
    //addonHeadingPseudo(this, 'typographyOptions')
    //addonHeadingDisplay(this, 'typographyOptions')
  }

  make(){
    return new HTMLSpan
  }
  
}
