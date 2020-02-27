import {RXElement} from "../rxelement"
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
    this.meta.tag = 'blockquote'
    //this.meta.innerHTML = "Blockquote text ..."
    this.label = "blockquote"

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
    return new HTMLBlockquote
  }
  
}
