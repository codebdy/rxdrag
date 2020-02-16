import {RXElement} from "../rxelement"

export class HTMLDiv extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'div'
    this.toolboxInfo.elementName = "DIV"
    this.className = 'HTMLDiv'
    super.addBorder()
    super.addWidth()
    super.addHeight()
    super.addMarginAuto()
    super.addMargin()
    super.addPadding()
    super.addClearfix()
  }

  make(){
    return new HTMLDiv
  }

  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "div"
    //model.classList.push('col')
    return model
  }
}
