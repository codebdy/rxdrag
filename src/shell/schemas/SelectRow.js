import {OptionRow} from './OptionRow'

export class SelectRow extends OptionRow{
  constructor(schema, breakPoint = 'md') {
    super(schema, breakPoint)
    this.inputName = 'RxSelect'
    this.props.list = {}
    this.setLabel(i18n.t('optionbox.'+ schema.label))
    this.init()
  }

  init(){
    let schema = this.schema
    this.setValueScope(
      schema.isResponsive ? schema[breakPoint].valueScope
                          : schema.valueScope
    ) 
  }
  
  setValueScope(valueScope){
    this.valueScope = valueScope
    valueScope.forEach(value=>{
      this.props.list[value] = i18n.t('classes.' + value)
    })
    return this
  }
}