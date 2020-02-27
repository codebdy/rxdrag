import {RXElement} from "../rxelement"
//import {addonHeadingPseudo} from "../../schemas/heading/pseudo-heading"
//import {addonHeadingDisplay} from "../../schemas/heading/display"
//import {addonUtilBorder} from "../../schemas/utilities/border"

export class HTMLAbbr extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlAbbr'
    this.toolboxInfo.elementName = "Abbr"
    this.className = 'HTMLAbbr'

    this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Abbr Options'
    //}
    this.meta.tag = 'abbr'
    this.meta.innerHTML = "Abbr text ..."
    this.label = "abbr"

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
    return new HTMLAbbr
  }
  
}
