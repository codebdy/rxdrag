import {RXElement} from "../rxelement"
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
    //addonHeadingPseudo(this, 'textOptions')
    //addonHeadingDisplay(this, 'textOptions')
  }

  make(){
    return new HTMLSpan
  }
  
}
