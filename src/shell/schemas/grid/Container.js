import {RXSchema} from '../RXSchema'
import {OptionGroup} from '../OptionGroup'
import fluid from './fluid'

export class Container extends RXSchema{
  constructor() {
    super()

    let containerOptions = new OptionGroup(i18n.t('optionbox.container-options'), true)
    containerOptions.addSwitchRow(fluid, 'container')

    this.optionGroups.unshift(containerOptions)
  }

} 