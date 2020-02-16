import {RXElement} from "../rxelement"
import {addonUtilColor} from "../schemas/utilities/color"
import {addonUtilBorder} from "../schemas/utilities/border"
import {addonUtilPadding} from "../schemas/utilities/padding"
import {addonUtilMargin} from "../schemas/utilities/margin"
import {addonUtilWidth} from "../schemas/utilities/sizing/width"
import {addonUtilHeight} from "../schemas/utilities/sizing/height"

export class HTMLDiv extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'div'
    this.toolboxInfo.elementName = "DIV"
    this.className = 'HTMLDiv'
    addonUtilColor(this)
    addonUtilBorder(this)
    addonUtilWidth(this)
    addonUtilHeight(this)
    addonUtilMargin(this)
    addonUtilPadding(this)
    //super.addColor()
    //super.addBorder()
    //super.addWidth()
    //super.addHeight()
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
