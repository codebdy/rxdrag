import {OptionRow} from './OptionRow'

export class BorderRow extends OptionRow{
  constructor(schema) {
    super(schema)
    this.inputName = 'RxBorderInput'
    this.setLabel(i18n.t('optionbox.'+ schema.label))
    this.isMultiple = true
    //this.setDefaultValue(defaultValue)//需要修改，等待内核提供改功能
    this.init()
  }

  init(){
    let schema = this.schema
    this.valueScope = []
    this.setList(
      schema.isResponsive ? schema[this.breakPoint].list 
                          : schema.list
    )
    this.setAddBorder(
      schema.isResponsive ? schema[this.breakPoint].addBorder 
                          : schema.addBorder
    )
  }

  setList(list){
    this.props.list = list
    for(var name in list){
      this.valueScope.push(list[name])
    }
    return this
  }

  setAddBorder(addBorder){
    this.props.addBorder = addBorder
    return this
  }

  resolveValue(node){
    this.node = node
    this.value = this.extractMultipleValue(this.valueScope, this.node.meta.classList)
    this.defaultValue = this.extractMultipleValue(this.valueScope, this.node.defaultMeta.classList)
  }

  fillBackValue(node){
    this.node = node
    this.setMultipleValueToClassList(this.valueScope)
  }
  
}