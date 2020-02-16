import {RXElement} from "../rxelement"
import {addonUtilColor} from "../schemas/utilities/color"
import {addonUtilPadding} from "../schemas/utilities/padding"
import {addonUtilMargin} from "../schemas/utilities/margin"

export class HTMLDiv extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'div'
    this.toolboxInfo.elementName = "DIV"
    this.className = 'HTMLDiv'
    addonUtilColor(this)
    addonUtilPadding(this)
    addonUtilMargin(this)
    //super.addColor()
    super.addBorder()
    super.addWidth()
    super.addHeight()
    super.addMarginAuto()
   // super.addMargin()
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
