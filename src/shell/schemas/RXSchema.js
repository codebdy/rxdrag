import {OptionGroup} from './OptionGroup'
import {SwitchRow} from './SwitchRow'
import {SelectRow} from './SelectRow'

export class RXSchema{
  constructor(){
    this.optionGroups = []

    let textOptions = new OptionGroup(i18n.t('optionbox.text-options'))
    textOptions.rows.push(
      new SelectRow()
      .setLabel(i18n.t('optionbox.pseudo-heading'))
      .setDefaultValue('')//需要修改，等待内核提供改功能
      .setValueScope([
        'h1','h2','h3','h4','h5','h6'
      ])
    )
    this.optionGroups.push(textOptions)
  }
}