import {OptionRow} from './OptionRow'

export class SelectRow extends OptionRow{
  constructor() {
    super()
    this.inputName = 'RxSelect'
    this.props.list = {}
  }

  setValueScope(valueScope){
    this.valueScope = valueScope
    valueScope.forEach(value=>{
      this.props.list[value] = i18n.t('classes.' + value)
    })
    return this
  }
}