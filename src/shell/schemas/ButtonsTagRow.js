import {OptionRow} from './OptionRow'

export class ButtonsTagRow extends OptionRow{
  constructor(schema) {
    super(schema)
    this.inputName = 'RxButtonSelect'
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

  resolveValue(node){
    this.node = node
    this.value = node.meta.tag
    this.defaultValue = node.defaultMeta.tag
  }

  fillBackValue(node){
    this.node = node
    this.node.meta.tag = this.value
  }

}