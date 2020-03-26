import {RXSchema} from '../RXSchema'
import {OptionGroup} from '../OptionGroup'
import colOffset from './col-offset'
import colWidth from './col-width'

export class Column extends RXSchema{
  constructor() {
    super()

    let colOptions = new OptionGroup(i18n.t('optionbox.column-options'), true)
    colOptions.addGenerateSchemaRow(colWidth)
    colOptions.addGenerateSchemaRow(colOffset)

    this.optionGroups.unshift(colOptions)
  }

} 