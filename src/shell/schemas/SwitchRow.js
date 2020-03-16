import {OptionRow} from './OptionRow'

export class SwitchRow extends OptionRow{
  constructor(label, defaultValue, props) {
    super(label)
    this.inputName = 'RxSwitch'
    this.defaultValue = defaultValue
    this.props = props
  }

  resolveValue(node){
    this.node = node
    this.value = this.extractValue([this.props.onValue, this.props.offValue])
  }
}