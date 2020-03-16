import {OptionGroup} from '../OptionGroup'
import {SwitchRow} from '../SwitchRow'

export class Container{
  constructor() {
    this.optionGroups = []
    let containerOptions = new OptionGroup(i18n.t('optionbox.container-options'), true)

    let fluidRow = new SwitchRow()
                   fluidRow.setLabel(i18n.t('optionbox.fluid'))
                   .setDefaultValue('container')
                   .setOnValue('container-fluid')
                   .setOffValue('container')

    containerOptions.rows.push(fluidRow)

    this.optionGroups.push(containerOptions)
  }

  resolveOptions(node){
    this.optionGroups.forEach(optionGroup=>{
      optionGroup.resolveValues(node)
    })
    return this.optionGroups
  }
} 