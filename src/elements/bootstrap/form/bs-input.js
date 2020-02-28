import {HTMLInput} from "../../html/html-input"

export class BSInput extends HTMLInput{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupForm'
    this.toolboxInfo.elementId = 'htmlInput'
    this.toolboxInfo.elementName = "Input"
    this.className = 'BSInput'

    //this.editMarginStyle.padding = '20px;'
    this.editMarginStyle.padding = ''

    this.label = "input"
    this.addClass('form-control')
  }


  make(){
    return new BSInput
  }

}
