import {OptionRow} from './OptionRow'

export class SelectRow extends OptionRow{
  constructor(schema) {
    super(schema)
    this.inputName = 'RxSelect'
    this.props.list = {}
    this.setLabel(i18n.t('optionbox.'+ schema.label))
    this.init()
  }

  init(){
    let schema = this.schema
    //console.log(this.breakPoint, this.schema)
    this.setValueScope(
      schema.isResponsive ? schema[this.breakPoint].valueScope
                          : schema.valueScope
    ) 
  }

  setValueScope(valueScope){
    this.valueScope = valueScope
    this.props.list = {}
    valueScope.forEach(value=>{
      this.props.list[value] = i18n.t('classes.' + value)
    })
    return this
  }
}