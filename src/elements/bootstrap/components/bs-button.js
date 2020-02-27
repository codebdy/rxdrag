import {RXElement} from "../../rxelement"
import {HTMLSpan} from "../../html/html-span"
import contextualSchema from "../../schemas/components/button/contextual"
import activeSchema from "../../schemas/components/button/active"
import disabledSchema from "../../schemas/components/button/disabled"
import sizeSchema from "../../schemas/components/button/size"

export class BSButton extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsButton'
    this.toolboxInfo.elementName = "Button"
    this.className = 'BSButton'

    this.editMarginStyle.padding = '20px'
    //this.editMarginStyle = {}

    this.unshiftGroup({
      id:'buttonOptions',
      label:'Button Options',
    })

    this.meta.tag = 'button'
    this.meta.innerHTML = 'Button'
    this.label = "button"
    this.addClass('btn')
    this.acceptedChildren=['HTMLSpan','HTMLDiv','BSBadge']

    //this.becomeToTextfield()

    this.addSchema(contextualSchema, 'buttonOptions')
    this.addSchema(sizeSchema, 'buttonOptions')
    this.addSchema(activeSchema, 'buttonOptions')
    this.addSchema(disabledSchema, 'buttonOptions')

  }

  make(){
    return new BSButton
  }

  loadConfig(){
    //this.pushChild(new HTMLSpan().setInnerHTML('Button'))
    return this
  }
}
