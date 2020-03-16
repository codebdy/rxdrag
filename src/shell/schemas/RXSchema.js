import {OptionGroup} from './OptionGroup'
import {SwitchRow} from './SwitchRow'
import {SelectRow} from './SelectRow'
import {OptionRowSmallGroup} from './OptionRowSmallGroup'

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

    textOptions.rows.push(
      new SelectRow()
      .setLabel(i18n.t('optionbox.display-size'))
      .setDefaultValue('')//需要修改，等待内核提供改功能
      .setValueScope([
        'display-1','display-2','display-3','display-4'
      ])
    )

    let colorSmallGroup = new OptionRowSmallGroup()
                     .setLabel(i18n.t('optionbox.color'))
    colorSmallGroup.rows.push(
      new SelectRow()
      .setLabel(i18n.t('optionbox.text-color'))
      .setDefaultValue('')//需要修改，等待内核提供改功能
      .setValueScope([
        'text-primary',
        'text-secondary',
        'text-success',
        'text-danger',
        'text-warning',
        'text-info',
        'text-light',
        'text-dark',
        'text-muted',
        'text-white',
      ])
    )

    colorSmallGroup.rows.push(
      new SelectRow()
      .setLabel(i18n.t('optionbox.background-color'))
      .setDefaultValue('')//需要修改，等待内核提供改功能
      .setValueScope([
        'bg-primary',
        'bg-secondary',
        'bg-success',
        'bg-danger',
        'bg-warning',
        'bg-info',
        'bg-light',
        'bg-dark',
        'bg-muted',
        'bg-white',
      ])
    )

    textOptions.rows.push(colorSmallGroup)  
    this.optionGroups.push(textOptions)
  }
}