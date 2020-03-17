import {RXSchema} from '../RXSchema'
import {OptionGroup} from '../OptionGroup'
import {SwitchRow} from '../SwitchRow'
import fluid from './fluid'

export class Container extends RXSchema{
  constructor() {
    super()

    let containerOptions = new OptionGroup(i18n.t('optionbox.container-options'), true)
    containerOptions.addSwitchRow(fluid, 'container')

    this.optionGroups.unshift(containerOptions)

  }

  resolveOptions(node){
    this.optionGroups.forEach(optionGroup=>{
      optionGroup.resolveValue(node)
    })
    return this.optionGroups
  }
} 