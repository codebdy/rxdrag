import {SelectRow} from './SelectRow'
import {SwitchRow} from './SwitchRow'

export class OptionGroup{
  constructor(label, selected) {
    this.rows = []
    this.label = label
    this.selected = selected
  }

  setLabel(label){
    this.label = label
    return this
  }

  addSelectRow(schema, defaultValue = ''){
    this.rows.push(
      new SelectRow(schema)
      .setDefaultValue(defaultValue)
    )
  }

  addSwitchRow(schema, defaultValue = ''){
    this.rows.push(
      new SwitchRow(schema)
      .setDefaultValue(defaultValue)
    )
  }

  resolveValue(node){
    this.rows.forEach(row=>{
      row.resolveValue(node)
    })
  }

  fillBackValue(node){
    this.rows.forEach(row=>{
      row.fillBackValue(node)
    })
  }
} 