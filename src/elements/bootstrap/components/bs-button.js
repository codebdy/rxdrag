import {RXElement} from "../../rxelement"
import {HTMLSpan} from "../../html/html-span"
import {addonButtonContextual} from "../../schemas/components/button/contextual"
import {addonButtonActive} from "../../schemas/components/button/active"
import {addonButtonDisabled} from "../../schemas/components/button/disabled"
import {addonButtonSize} from "../../schemas/components/button/size"
import {addonButtonTag} from "../../schemas/components/button/tag"
import {addonButtonType} from "../../schemas/components/button/type"

export class BSButton extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsButton'
    this.toolboxInfo.elementName = "Button"
    this.className = 'BSButton'

    this.editMarginStyle.padding = '20px'
    //this.editMarginStyle = {}

    this.groups.buttonOptions = {
      label:'Button Options'
    }
    this.$meta.tag = 'button'
    this.$meta.innerHTML = 'Button'
    this.label = "button"
    this.$meta.classList.push('btn')
    this.acceptedChildren=['HTMLSpan','HTMLDiv','BSBadge']

    this.becomeToTextfield()
    addonButtonContextual(this)
    addonButtonSize(this)
    addonButtonActive(this)
    addonButtonDisabled(this)
    addonButtonTag(this)
    addonButtonType(this)
  }

  make(){
    return new BSButton
  }

  /*toViewModel(){
    let model = super.toViewModel()
    //parkMiniEditbar(model, this)
    return model
  }*/

  metaToModel(model){
    if(this.$meta.tag == 'a'){
      model.attributes['role'] = 'button'
    }
    if(this.$meta.tag == 'input'){
      model.attributes['value'] = this.$meta.innerHTML
    }
    //model.attributes['data-dismiss'] = 'alert'
    //model.attributes['aria-label'] = 'close'
  }

  loadConfig(){
    //this.pushChild(new HTMLSpan().setInnerHTML('Button'))
    return this
  }
}
