import {contains, remove} from '../../basic/rxarray'

export class OptionRow{
  constructor(label) {
    this.label = label
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

} 