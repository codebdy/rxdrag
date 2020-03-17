import {OptionGroup} from './OptionGroup'
import {OptionRowSmallGroup} from './OptionRowSmallGroup'

import backgroundColor from "./general/background-color"
import pseudoHeading from "./general/text/pseudo-heading"
import displaySize from "./general/text/display-size"
import textColor from "./general/text/color"
import textJustify from "./general/text/justify"
import textAlign from "./general/text/align"
import textVAlign from "./general/text/vertical-align"
import textWrapping from "./general/text/wrapping"
import textWordBreak from "./general/text/word-break"
import textTruncate from "./general/text/truncate"
import textTransform from "./general/text/transform"
import textWeight from "./general/text/weight"
import textResetColor from "./general/text/reset-color"
import textDecoration from "./general/text/decoration"
import textLead from "./general/text/lead"

import borderColor from "./general/border/Color"
import borderAdd from "./general/border/add"
import borderRemove from "./general/border/remove"
import borderRadius from "./general/border/radius"

import generalShadow from "./general/shadow"

export class RXSchema{
  constructor(){
    this.optionGroups = []

    let generalOptions = new OptionGroup(i18n.t('optionbox.general-options'))
    generalOptions.addSelectRow(backgroundColor)

    let borderSmallGroup = new OptionRowSmallGroup()
                     .setLabel(i18n.t('optionbox.border'))

    borderSmallGroup.addSelectRow(borderColor)
    borderSmallGroup.addBorderRow(borderAdd)
    borderSmallGroup.addBorderRow(borderRemove)
    borderSmallGroup.addSelectRow(borderRadius)

    generalOptions.rows.push(borderSmallGroup)  

    generalOptions.addSelectRow(generalShadow)

    let textSmallGroup = new OptionRowSmallGroup()
                     .setLabel(i18n.t('optionbox.text'))

    textSmallGroup.addSelectRow(textColor)
    textSmallGroup.addSwitchRow(textJustify)
    textSmallGroup.addSelectRow(textAlign)
    textSmallGroup.addSelectRow(textVAlign)
    textSmallGroup.addSelectRow(pseudoHeading)
    textSmallGroup.addSelectRow(displaySize)
    textSmallGroup.addSelectRow(textWrapping)
    textSmallGroup.addSwitchRow(textTruncate)
    textSmallGroup.addSwitchRow(textWordBreak)
    textSmallGroup.addSelectRow(textTransform)
    textSmallGroup.addSelectRow(textWeight)
    textSmallGroup.addSwitchRow(textResetColor)
    textSmallGroup.addSwitchRow(textDecoration)
    textSmallGroup.addSwitchRow(textLead)
    generalOptions.rows.push(textSmallGroup)  


   this.optionGroups.push(generalOptions)
  }

  resolveOptions(node, breakPoint){
    this.optionGroups.forEach(optionGroup=>{
      optionGroup.setBreakPoint(breakPoint).resolveValue(node, breakPoint)
    })
    return this.optionGroups
  }

}