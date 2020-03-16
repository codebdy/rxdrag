import {OptionRow} from './OptionRow'

export class SwitchRow extends OptionRow{
  constructor() {
    super()
    this.inputName = 'RxSwitch'
  }

  setOnValue(onValue){
    this.props.onValue = onValue
    this.valueScope.push(onValue)
    return this
  }

  setOffValue(offValue){
    this.props.offValue = offValue
    this.valueScope.push(offValue)
    return this
  }


}