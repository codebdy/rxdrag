import {RXSchema} from '../RXSchema'
import {OptionGroup} from '../OptionGroup'

let gutters = {
  label: "gutters",
  onValue : "",
  offValue : "no-gutters"
}

export class Heading extends RXSchema{
  constructor() {
    super()

    let rowOptions = new OptionGroup(i18n.t('optionbox.heading'), true)
   // rowOptions.addSwitchRow(gutters, '')

    this.optionGroups.unshift(rowOptions)
  }

} 