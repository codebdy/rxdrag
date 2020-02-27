import {RXElement} from "../rxelement"
//import {addonHeadingPseudo} from "../../schemas/heading/pseudo-heading"
//import {addonHeadingDisplay} from "../../schemas/heading/display"
//import {addonUtilBorder} from "../../schemas/utilities/border"

export class HTMLU extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlU'
    this.toolboxInfo.elementName = "U"
    this.className = 'HTMLU'

    this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'U Options'
    //}
    this.meta.tag = 'u'
    this.meta.innerHTML = "U text ..."
    this.label = "u"

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
    return new HTMLU
  }
}
