import {RXElement} from "../rxelement"
//import {addonHeadingPseudo} from "../../schemas/heading/pseudo-heading"
//import {addonHeadingDisplay} from "../../schemas/heading/display"
//import {addonUtilBorder} from "../../schemas/utilities/border"

export class HTMLKbd extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlKbd'
    this.toolboxInfo.elementName = "Kbd"
    this.className = 'HTMLKbd'

    this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Kbd Options'
    //}
    this.meta.tag = 'kbd'
    this.meta.innerHTML = "Kbd text ..."
    this.label = "kbd"

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
    return new HTMLKbd
  }
}
