import {RXElement} from "../rxelement"
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
    this.meta.tag = 'strong'
    this.meta.innerHTML = "Strong text ..."
    this.label = "strong"

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
    return new HTMLStrong
  }
  
}
