import {OptionGroup} from './OptionGroup'
import {OptionRowSmallGroup} from './OptionRowSmallGroup'

import backgroundColor from "./general/background-color"
import pseudoHeading from "./general/pseudo-heading"
import displaySize from "./general/display-size"
import textColor from "./general/text/color"
import textJustify from "./general/text/justify"
import textAlign from "./general/text/align"
import textWrapping from "./general/text/wrapping"
import textWordBreak from "./general/text/word-break"
import textTruncate from "./general/text/truncate"
import textTransform from "./general/text/transform"

import textLead from "./general/text/lead"

export class RXSchema{
  constructor(){
    this.optionGroups = []

    let generalOptions = new OptionGroup(i18n.t('optionbox.general-options'))
    generalOptions.addSelectRow(backgroundColor)

    let textSmallGroup = new OptionRowSmallGroup()
                     .setLabel(i18n.t('optionbox.text'))

    textSmallGroup.addSelectRow(textColor)
    textSmallGroup.addSwitchRow(textJustify)
    textSmallGroup.addSelectRow(textAlign)
    textSmallGroup.addSelectRow(pseudoHeading)
    textSmallGroup.addSelectRow(displaySize)
    textSmallGroup.addSelectRow(textWrapping)
    textSmallGroup.addSwitchRow(textTruncate)
    textSmallGroup.addSwitchRow(textWordBreak)
    textSmallGroup.addSelectRow(textTransform)
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