import {RXElement} from "../rxelement"
import {addonUtilColor} from "../schemas/utilities/color"
import {addonUtilBorder} from "../schemas/utilities/border"
import {addonUtilPadding} from "../schemas/utilities/padding"
import {addonUtilMargin} from "../schemas/utilities/margin"
import {addonUtilWidth} from "../schemas/utilities/sizing/width"
import {addonUtilHeight} from "../schemas/utilities/sizing/height"
//import {addonUtilMarginAuto} from "../schemas/utilities/margin/margin-auto"
import {addonUtilClearfix} from "../schemas/utilities/clearfix"
import {addonUtilDisplay} from "../schemas/utilities/display"
import {addonUtilEmbed} from "../schemas/utilities/embed"
import {addonUtilResponsiveItem} from "../schemas/utilities/embed/responsive-item"
import {addonUtilFlex} from "../schemas/utilities/flex"
import {addonUtilFloat} from "../schemas/utilities/float"
import {addonUtilTextHide} from "../schemas/utilities/text-hide"
import {addonUtilOverflow} from "../schemas/utilities/overflow"
import {addonUtilPosition} from "../schemas/utilities/position"


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
    //addonUtilMarginAuto(this)
    addonUtilClearfix(this)
    addonUtilDisplay(this)
    addonUtilEmbed(this)
    addonUtilResponsiveItem(this)
    addonUtilFlex(this)
    addonUtilFloat(this)
    addonUtilTextHide(this)
    addonUtilOverflow(this)
    addonUtilPosition(this)
  }

  make(){
    return new HTMLDiv
  }

  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "div"
    return model
  }
}
