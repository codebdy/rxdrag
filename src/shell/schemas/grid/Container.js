import {RXSchema} from '../RXSchema'
import {OptionGroup} from '../OptionGroup'
import {SwitchRow} from '../SwitchRow'

export class Container extends RXSchema{
  constructor() {
    super()

    let containerOptions = new OptionGroup(i18n.t('optionbox.container-options'), true)
    containerOptions.rows.push(
      new SwitchRow()
      .setLabel(i18n.t('optionbox.fluid'))
      .setDefaultValue('container')
      .setOnValue('container-fluid')
      .setOffValue('container')
    )

    this.optionGroups.unshift(containerOptions)

  }

  resolveOptions(node){
    this.optionGroups.forEach(optionGroup=>{
      optionGroup.resolveValue(node)
    })
    return this.optionGroups
  }
} 