import {HTMLDiv} from "../../html/html-div"

import {BSInput} from "./bs-input"
import {BSTextarea} from "./bs-textarea"

export class BSFormGroup extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupForm'
    this.toolboxInfo.elementId = 'bsFormGroup'
    this.toolboxInfo.elementName = "FormGroup"
    this.className = 'BSFormGroup'

    //this.editMarginStyle.padding = '20px;'
    this.editMarginStyle.padding = '10px'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "form group"
    this.addClass('form-group')
  }

 
  make(){
    return new BSFormGroup
  }

}
