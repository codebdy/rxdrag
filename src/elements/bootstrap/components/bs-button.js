import {RXTextfieldable} from "../../html/textfieldable"
import {HTMLSpan} from "../../html/html-span"

export class BSButton extends RXTextfieldable{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsButton'
    this.toolboxInfo.elementName = "Button"
    this.className = 'BSButton'

    this.editMarginStyle.padding = ''
    //this.editMarginStyle = {}

    this.groups.buttonOptions = {
      label:'Button Options'
    }
    this.$meta.tag = 'button'
    this.$meta.innerHTML = 'Button'
    this.label = "button"
    this.$meta.classList.push('btn')
    this.acceptedChildren=['HTMLSpan','HTMLDiv','BSBadge']
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
    //model.attributes['type'] = 'button'
    //model.attributes['data-dismiss'] = 'alert'
    //model.attributes['aria-label'] = 'close'
  }

  loadConfig(){
    this.pushChild(new HTMLSpan().setInnerHTML('Button'))
    return this
  }
}
