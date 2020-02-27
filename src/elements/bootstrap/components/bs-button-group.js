import {HTMLDiv} from "../../html/html-div"
import {BSButton} from "./bs-button"
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
    this.setAttribute('role', 'group')
    //addonAriaLabel(this)
  }

  make(){
    return new BSButtonGroup
  }

  loadConfig(){
    this.pushChild(
      new BSButton()
      .setInnerHTML('Left')
      .addClass('btn-primary')
      .becomeToTextfield()
    )
    this.pushChild(
      new BSButton()
      .setInnerHTML('Middle')
      .addClass('btn-primary')
      .becomeToTextfield()
    )
    this.pushChild(
      new BSButton()
      .setInnerHTML('Right')
      .addClass('btn-primary')
      .becomeToTextfield()
    )
    //this.setField('badgeContextual', 'badge-primary')
    //this.setField('innerHTML', 'badge')
    return this
  }

}
