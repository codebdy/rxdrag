import {contains, remove} from '../../basic/rxarray'

export class OptionRow{
  constructor(schema) {
    this.breakPoint = 'md'
    this.schema = schema
    this.props = {}
    this.valueScope = []
    this.defaultValue = ""
  }

  setBreakPoint(breakPoint){
    this.breakPoint = breakPoint
    return this
  }

  changeBreakPoint(breakPoint){
    this.breakPoint = breakPoint
    this.init()
    return this
  }

  setLabel(label){
    this.label = label
    return this
  }

  //setDefaultValue(defaultValue){
  //  this.defaultValue = defaultValue
  //  return this
  //}

  setProps(props){
    this.props = props
    return this
  }

  resolveValue(node){
    this.node = node
    this.value = this.extractValue(this.valueScope, this.node.meta.classList)
    this.defaultValue = this.extractValue(this.valueScope, this.node.defaultMeta.classList)
  }

  fillBackValue(node){
    this.node = node
    this.setValueToClassList(this.valueScope)
  }

  extractValue(valueScope, classList){
    for(var i = 0; i < valueScope.length; i ++){
      let value = valueScope[i]
      if(contains(value, classList)){
        return value
      }
    }

    return ''
  }
  setValueToClassList(valueScope){
    this.clearRowScopValue(valueScope)
    if(this.value){
      this.node.meta.classList.push(this.value)
    }
  }

  extractMultipleValue(valueScope, classList){
    let values = []
    for(var i = 0; i < valueScope.length; i ++){
      let value = valueScope[i]
      if(contains(value, classList)){
        values.push(value)
      }
    }
    return values
  }
  
  setMultipleValueToClassList(valueScope){
    this.clearRowScopValue(valueScope)
    this.value.forEach(val =>{
      this.node.meta.classList.push(val)
    })
  }



  clearRowScopValue(valueScope){
    valueScope.forEach(scopValue=>{
      remove(scopValue, this.node.meta.classList)
    })
  }


} 