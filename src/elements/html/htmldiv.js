import {RXElement} from "../rxelement"
import {addonUtilColor} from "../schemas/utilities/color"
import {addonUtilBorder} from "../schemas/utilities/border"
import {addonUtilPadding} from "../schemas/utilities/padding"
import {addonUtilMargin} from "../schemas/utilities/margin"
//import {addonUtilWidth} from "../schemas/utilities/sizing/width"
//import {addonUtilHeight} from "../schemas/utilities/sizing/height"
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
import {addonUtilScreenReaders} from "../schemas/utilities/screen-readers"
import {addonUtilShadow} from "../schemas/utilities/shadow"
import {addonUtilSizing} from "../schemas/utilities/sizing"
import {addonUtilStretchedLink} from "../schemas/utilities/stretched-link"
import {addonUtilText} from "../schemas/utilities/text"
import {addonUtilVerticalAlignment} from "../schemas/utilities/vertical-align"
import {addonUtilVisibility} from "../schemas/utilities/visibility"

import {addonHeadingPseudo} from "../schemas/heading/pseudo-heading"
import {addonHeadingDisplay} from "../schemas/heading/display"
import {addonGridRow} from "../schemas/content/row"
import {addonWidth} from "../schemas/column/col-width"
import {addonOffset} from "../schemas/column/col-offset"
import {addonAlignSelf} from "../schemas/column/col-align-self"
import {addonOrder} from "../schemas/column/col-order"
import {addonUtilMarginAuto} from "../schemas/column/margin-auto"
import {addonTypyLead} from "../schemas/content/lead"
import {addonTypyInitialism} from "../schemas/content/Initialism"
import {addonTypyBlockquote} from "../schemas/content/blockquote"
import {addonTypyBlockquoteFooter} from "../schemas/content/blockquote-footer"

export class HTMLDiv extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'div'
    this.toolboxInfo.elementName = "DIV"
    this.className = 'HTMLDiv'
    this.label = "div"
    this.acceptedChildren=''
    this.exceptChildren = ['BSCol']

    addonHeadingPseudo(this, 'typographyOptions')
    addonHeadingDisplay(this, 'typographyOptions')
    addonGridRow(this, 'typographyOptions')
    let col = addonWidth(this, 'typographyOptions')
    col.schema.xs.label = 'Column'
    col.schema.sm.label = 'Column'
    col.schema.md.label = 'Column'
    col.schema.lg.label = 'Column'
    col.schema.xl.label = 'Column'
    addonOffset(this, 'typographyOptions')
    addonAlignSelf(this, 'typographyOptions')
    addonOrder(this, 'typographyOptions')
    addonUtilMarginAuto(this, 'typographyOptions')
    addonTypyLead(this)
    addonTypyInitialism(this)
    addonTypyBlockquote(this)
    addonTypyBlockquoteFooter(this)



    addonUtilColor(this)
    addonUtilBorder(this)
    addonUtilMargin(this)
    addonUtilPadding(this)
    //addonUtilMarginAuto(this)
    addonUtilClearfix(this)
    addonUtilDisplay(this)
    addonUtilEmbed(this)
    addonUtilResponsiveItem(this) //need to move to other tags
    addonUtilFlex(this)
    addonUtilFloat(this)
    addonUtilTextHide(this)
    addonUtilOverflow(this)
    addonUtilPosition(this)
    addonUtilScreenReaders(this)
    addonUtilShadow(this)
    addonUtilSizing(this)
    addonUtilStretchedLink(this) //need to move to a tag
    addonUtilText(this)
    addonUtilVerticalAlignment(this)
    addonUtilVisibility(this)
  }

  make(){
    return new HTMLDiv
  }

  toViewModel(){
    let model = super.toViewModel()
    return model
  }
}
