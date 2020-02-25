import {RXElement} from "../rxelement"
import {addonUtilColor} from "../schemas/utilities/color"
import {addonUtilBorder} from "../schemas/utilities/border"
import {addonUtilPadding} from "../schemas/utilities/padding"
import {addonUtilMargin} from "../schemas/utilities/margin"
import {addonUtilText} from "../schemas/utilities/text"
//import {addonHeadingPseudo} from "../../schemas/heading/pseudo-heading"
//import {addonHeadingDisplay} from "../../schemas/heading/display"
//import {addonUtilBorder} from "../../schemas/utilities/border"

export class HTMLBlockquote extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlBlockquote'
    this.toolboxInfo.elementName = "Blockquote"
    this.className = 'HTMLBlockquote'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol']

    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Blockquote Options'
    //}
    this.$meta.tag = 'blockquote'
    //this.$meta.innerHTML = "Blockquote text ..."
    this.label = "blockquote"

    this.becomeToTextfield()
    addonUtilColor(this)
    addonUtilBorder(this)
    addonUtilMargin(this)
    addonUtilPadding(this)
    addonUtilText(this)
    //addonHeadingPseudo(this, 'typographyOptions')
    //addonHeadingDisplay(this, 'typographyOptions')
  }

  make(){
    return new HTMLBlockquote
  }
  
}
