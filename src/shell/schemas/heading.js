import {RXSchema} from './RXSchema'
import {OptionGroup} from './OptionGroup'

let tags = {
  label:'heading',
  valueScope:[
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ],
}


export class Heading extends RXSchema{
  constructor() {
    super()

    let rowOptions = new OptionGroup(i18n.t('optionbox.heading-options'), true)
    rowOptions.addButtonsTagRow(tags, 'h2')

    this.optionGroups.unshift(rowOptions)
  }

} 