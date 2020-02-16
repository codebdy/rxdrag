import {RXElement} from "../rxelement"
import {UtilColor} from "../schemas/utilities/color"

export class HTMLDiv extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'div'
    this.toolboxInfo.elementName = "DIV"
    this.className = 'HTMLDiv'
    let utilColor = new UtilColor
    utilColor.addon(this)
    //super.addColor()
    super.addBorder()
    super.addWidth()
    super.addHeight()
    super.addMarginAuto()
    super.addMargin()
    super.addPadding()
    super.addClearfix()
    super.addDisplay()
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
