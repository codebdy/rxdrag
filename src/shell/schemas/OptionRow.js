import {contains, remove} from '../../basic/rxarray'

export class OptionRow{
  constructor() {
    this.props = {}
  }

  setLabel(label){
    this.label = label
    return this
  }

  setDefaultValue(defaultValue){
    this.defaultValue = defaultValue
    return this
  }

  setProps(props){
    this.props = props
    return this
  }

  extractValue(valueScope){
    for(var i = 0; i < valueScope.length; i ++){
      let value = valueScope[i]
      if(contains(value, this.node.meta.classList)){
        return value
      }
    }

    return ''
  }
  /*  setMultipleValueToClassList(row){
      this.clearRowScopValue(row)
      row.value.forEach(val =>{
        this.node.meta.classList.push(val)
      })
    },*/

    /*extractMultipleValue(valueScope){
      let values = []
      for(var i = 0; i < valueScope.length; i ++){
        let value = valueScope[i]
        if(contains(value, this.node.meta.classList)){
          values.push(value)
        }
      }
      return values
    },*/

  setValueToClassList(valueScope){
    this.clearRowScopValue(valueScope)
    if(this.value){
      this.node.meta.classList.push(this.value)
    }
  }

  clearRowScopValue(valueScope){
    valueScope.forEach(scopValue=>{
      remove(scopValue, this.node.meta.classList)
    })
  }


} 