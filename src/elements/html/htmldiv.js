import {RXElement} from "../rxelement"
import {UtilColor} from "../schemas/utilities/color"
import {UtilPadding} from "../schemas/utilities/padding"

export class HTMLDiv extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'div'
    this.toolboxInfo.elementName = "DIV"
    this.className = 'HTMLDiv'
    let utilColor = new UtilColor
    utilColor.addon(this)

    let utilPadding = new UtilPadding
    utilPadding.addon(this)
    //super.addColor()
    super.addBorder()
    super.addWidth()
    super.addHeight()
    super.addMarginAuto()
    super.addMargin()
    //super.addPadding()
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
