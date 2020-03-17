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
      new SelectRow()
      .setLabel(i18n.t('optionbox.'+ schema.label))
      .setDefaultValue(defaultValue)//需要修改，等待内核提供改功能
      .setValueScope(schema.valueScope)
    )
  }

  addSwitchRow(schema, defaultValue = ''){
    this.rows.push(
      new SwitchRow()
      .setLabel(i18n.t('optionbox.'+ schema.label))
      .setDefaultValue(defaultValue)//需要修改，等待内核提供改功能
      .setOnValue(schema.onValue)
      .setOffValue(schema.offValue)
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