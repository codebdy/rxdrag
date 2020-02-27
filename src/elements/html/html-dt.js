import {RXElement} from "../rxelement"

export class HTMLDt extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlDt'
    this.toolboxInfo.elementName = "Dt"
    this.className = 'HTMLDt'

    this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Dt Options'
    //}
    this.meta.tag = 'dt'
    this.meta.innerHTML = "Dt text ..."
    this.label = "dt"

    this.becomeToTextfield()

  }

  make(){
    return new HTMLDt
  }
}
