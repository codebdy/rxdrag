import {RXElement} from "../../rxelement"
import tagSchema from "../../schemas/heading/tag"
import displaySchema from "../../schemas/heading/display"
import textfieldSchema from "../../schemas/general/textfield"
//import {addonGeneralTextfield} from "../schemas/general/textfield"

export class BSHeading extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupContent'
    this.toolboxInfo.elementId = 'bsHeading'
    this.toolboxInfo.elementName = "Heading"
    this.className = 'BSHeading'

    this.editMarginStyle = {}

    this.unshiftGroup({
      id:'headingOptions',
      label:'Heading Options',
    })

    this.empertyInnerHTML = 'Emperty Heading'
    this.meta.tag = 'h2'
    this.meta.innerHTML = this.empertyInnerHTML
    this.label = "heading"

    this.becomeToTextfield()

    this.addSchema(textfieldSchema, 'textOptions')
    this.addSchema(tagSchema, 'headingOptions')
    this.addSchema(displaySchema, 'headingOptions')
    //addonHeadingTag(this)
    //addonHeadingDisplay(this, 'textOptions')
  }

  make(){
    return new BSHeading
  }
}
