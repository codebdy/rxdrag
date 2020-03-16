import {OptionGroup} from './OptionGroup'
import {SwitchRow} from './SwitchRow'

export class RXSchema{
  constructor(){
    this.optionGroups = []

    let textOptions = new OptionGroup(i18n.t('optionbox.text-options'))
    this.optionGroups.push(textOptions)
  }
}