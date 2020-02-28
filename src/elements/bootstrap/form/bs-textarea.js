import {HTMLTextarea} from "../../html/html-textarea"

export class BSTextarea extends HTMLTextarea{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupForm'
    this.toolboxInfo.elementId = 'htmlTextarea'
    this.toolboxInfo.elementName = "Textarea"
    this.className = 'BSTextarea'

    //this.editMarginStyle.padding = '20px;'
    this.editMarginStyle.padding = ''

    this.label = "textarea"
    this.addClass('form-control')
  }

  make(){
    return new BSTextarea
  }

}
