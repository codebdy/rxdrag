import {BSFormGroup} from "./bs-form-group"
import {BSInput} from "./bs-input"
import {HTMLLabel} from "../../html/html-label"
import {HTMLSmall} from "../../html/html-small"

export class BSInputGroup extends BSFormGroup{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupForm'
    this.toolboxInfo.elementId = 'bsInputGroup'
    this.toolboxInfo.elementName = "Form group: Input"
    this.className = 'BSInputGroup'
  }

  configSelf(){
    let input = new BSInput
    let label = new HTMLLabel
    let help  = new HTMLSmall
    let inputId = 'groupInput' + this.id
    input.setAttribute('id', inputId)
    label.setAttribute('for', inputId)
    label.setInnerHTML('Label')
    help.setAttribute('id', 'groupHelp' + this.id)
    help.setInnerHTML('Input help info')
        .addClass('form-text')
        .addClass('text-muted')

    this.pushChild(label)
    this.pushChild(input)
    this.pushChild(help)
  }

  make(){
    return new BSInputGroup
  }


}
