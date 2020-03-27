import {RXSchema} from './RXSchema'
import {OptionGroup} from './OptionGroup'

let schema = {
  label:'contextual',
  valueScope:[
    'alert-primary',
    'alert-secondary',
    'alert-success',
    'alert-danger',
    'alert-warning',
    'alert-info',
    'alert-light',
    'alert-dark',
  ],
}

export class Alert extends RXSchema{
  constructor() {
    super()

    let options = new OptionGroup(i18n.t('optionbox.alert-options'), true)
    options.addSelectRow(schema, '')

    this.optionGroups.unshift(options)
  }

} 