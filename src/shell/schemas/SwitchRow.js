import {OptionRow} from './OptionRow'

export class SwitchRow extends OptionRow{
  constructor(schema) {
    super(schema)
    this.inputName = 'RxSwitch'
    this.setLabel(i18n.t('optionbox.'+ schema.label))
    //this.setDefaultValue(defaultValue)//需要修改，等待内核提供改功能
    this.init()
  }

  init(){
    let schema = this.schema
    this.valueScope = []
    this.setOnValue(
      schema.isResponsive ? schema[this.breakPoint].onValue 
                          : schema.onValue
    )
    this.setOffValue(
      schema.isResponsive ? schema[this.breakPoint].offValue 
                          : schema.offValue
    )
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