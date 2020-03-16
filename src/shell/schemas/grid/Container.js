import {OptionGroup} from '../OptionGroup'
import {SwitchRow} from '../SwitchRow'

export class Container{
  constructor() {
    this.optionGroups = []
    let containerOptions = new OptionGroup(i18n.t('optionbox.container-options'), true)

    let fluidRow = new SwitchRow(
      i18n.t('optionbox.fluid'),//label
      'container',//defaultValue
      {//props
        onValue: 'container-fluid',
        offValue: 'container',
      }
    )

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