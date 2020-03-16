import {OptionRow} from './OptionRow'

export class SwitchRow extends OptionRow{
  constructor() {
    super()
    this.inputName = 'RxSwitch'
  }

  setOnValue(onValue){
    this.props.onValue = onValue
    return this
  }

  setOffValue(offValue){
    this.props.offValue = offValue
    return this
  }

  resolveValue(node){
    this.node = node
    this.value = this.extractValue([this.props.onValue, this.props.offValue])
  }

  fillBackValue(node){
    this.node = node
    this.setValueToClassList([this.props.onValue, this.props.offValue])
  }

}