import {RXElement} from "../rxelement"
//import {addonHeadingPseudo} from "../../schemas/heading/pseudo-heading"
//import {addonHeadingDisplay} from "../../schemas/heading/display"
//import {addonUtilBorder} from "../../schemas/utilities/border"

export class HTMLIns extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlIns'
    this.toolboxInfo.elementName = "Ins"
    this.className = 'HTMLIns'

    this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Ins Options'
    //}
    this.meta.tag = 'ins'
    this.meta.innerHTML = "Ins text ..."
    this.label = "ins"

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
    return new HTMLIns
  }
}
