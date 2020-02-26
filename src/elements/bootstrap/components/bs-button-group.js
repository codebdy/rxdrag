import {HTMLDiv} from "../../html/html-div"
import {BSButton} from "./bs-button"
import {addonAriaLabel} from "../../schemas/general/aria-label"

export class BSButtonGroup extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsButtonGroup'
    this.toolboxInfo.elementName = "Button Group"
    this.className = 'BSButtonGroup'

    this.editMarginStyle.padding = ''
    //this.editMarginStyle = {}
    this.label = 'button group'
    this.addClass('btn-group')

    this.acceptedChildren=['BSButton']
    //addonAriaLabel(this)
  }

  make(){
    return new BSButtonGroup
  }

  metaToModel(model){
    model.attributes['role'] = 'group'
  }

  loadConfig(){
    this.pushChild(
      new BSButton()
      .setInnerHTML('Left')
      .setField('buttonContextual', 'btn-primary')
      .becomeToTextfield()
    )
    this.pushChild(
      new BSButton()
      .setInnerHTML('Middle')
      .setField('buttonContextual', 'btn-primary')
      .becomeToTextfield()
    )
    this.pushChild(
      new BSButton()
      .setInnerHTML('Right')
      .setField('buttonContextual', 'btn-primary')
      .becomeToTextfield()
    )
    //this.setField('badgeContextual', 'badge-primary')
    //this.setField('innerHTML', 'badge')
    return this
  }

}
