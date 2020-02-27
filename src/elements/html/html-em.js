import {RXElement} from "../rxelement"
//import {addonHeadingPseudo} from "../../schemas/heading/pseudo-heading"
//import {addonHeadingDisplay} from "../../schemas/heading/display"
//import {addonUtilBorder} from "../../schemas/utilities/border"

export class HTMLEm extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlEm'
    this.toolboxInfo.elementName = "Em"
    this.className = 'HTMLEm'

    this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Em Options'
    //}
    this.meta.tag = 'em'
    this.meta.innerHTML = "Em text ..."
    this.label = "em"

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
    return new HTMLEm
  }
  }
