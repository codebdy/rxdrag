import {BSFormGroup} from "./bs-form-group"
import {BSTextarea} from "./bs-textarea"
import {HTMLLabel} from "../../html/html-label"
import {HTMLSmall} from "../../html/html-small"

export class BSTextareaGroup extends BSFormGroup{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupForm'
    this.toolboxInfo.elementId = 'bsTextareaGroup'
    this.toolboxInfo.elementName = "Form group: Textarea"
    this.className = 'BSTextareaGroup'
  }

  make(){
    return new BSTextareaGroup
  }

  configSelf(){
    let textarea = new BSTextarea
    let label = new HTMLLabel
    let help  = new HTMLSmall
    let inputId = 'groupTextarea' + this.id
    textarea.setAttribute('id', inputId)
    label.setAttribute('for', inputId)
    label.setInnerHTML('Label')
    help.setAttribute('id', 'groupHelp' + this.id)
    help.setInnerHTML('Input help info')
        .addClass('form-text')
        .addClass('text-muted')
   
    this.pushChild(label)
    this.pushChild(textarea)
    this.pushChild(help)
  }

}
