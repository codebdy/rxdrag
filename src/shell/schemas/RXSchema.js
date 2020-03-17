import {OptionGroup} from './OptionGroup'
import {OptionRowSmallGroup} from './OptionRowSmallGroup'

import backgroundColor from "./general/background-color"
import pseudoHeading from "./general/pseudo-heading"
import displaySize from "./general/display-size"
import textColor from "./general/text/color"

export class RXSchema{
  constructor(){
    this.optionGroups = []

    let generalOptions = new OptionGroup(i18n.t('optionbox.general-options'))
    generalOptions.addSelectRow(backgroundColor)
    generalOptions.addSelectRow(pseudoHeading)
    generalOptions.addSelectRow(displaySize)

    let textSmallGroup = new OptionRowSmallGroup()
                     .setLabel(i18n.t('optionbox.text'))

    textSmallGroup.addSelectRow(textColor)

    generalOptions.rows.push(textSmallGroup)  

    this.optionGroups.push(generalOptions)
  }
}