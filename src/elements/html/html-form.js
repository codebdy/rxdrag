import {RXElement} from "../rxelement"

export class HTMLForm extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlForm'
    this.toolboxInfo.elementName = "Form"
    this.className = 'HTMLForm'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Form Options'
    //}
    this.meta.tag = 'form'
    //this.meta.innerHTML = "Form text ..."
    this.label = "form"
  }

  make(){
    return new HTMLForm
  }
}
