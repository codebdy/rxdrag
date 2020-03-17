import {SelectRow} from './SelectRow'
import {SwitchRow} from './SwitchRow'
import {BorderRow} from './BorderRow'
import {GenerateSchemaRow} from './GenerateSchemaRow'

export class OptionGroup{
  constructor(label, selected) {
    this.rows = []
    this.label = label
    this.selected = selected
    this.breakPoint = 'md'
  }

  setLabel(label){
    this.label = label
    return this
  }

  setBreakPoint(breakPoint){
    this.breakPoint = breakPoint
    return this
  }

  changeBreakPoint(breakPoint){
    this.breakPoint = breakPoint
    this.rows.forEach(row=>{
      row.changeBreakPoint(breakPoint)
    })
  }

  addSelectRow(schema, defaultValue = ''){
    //schema = Object.assign({}, schema)
    this.rows.push(
      new SelectRow(schema)
      .setBreakPoint(this.breakPoint)
      .setDefaultValue(defaultValue)
    )
  }

  addSwitchRow(schema, defaultValue = ''){
    //schema = Object.assign({}, schema)
    this.rows.push(
      new SwitchRow(schema)
      .setBreakPoint(this.breakPoint)
      .setDefaultValue(defaultValue)
    )
  }

  addBorderRow(schema, defaultValue = []){
    this.rows.push(
      new BorderRow(schema)
      .setBreakPoint(this.breakPoint)
      .setDefaultValue(defaultValue)
    )
  }

  addGenerateSchemaRow(schema, defaultValue = ''){
    this.rows.push(
      new GenerateSchemaRow(schema)
      .setBreakPoint(this.breakPoint)
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