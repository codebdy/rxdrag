import {RXComponent} from "../../basic/rxcomponent"
import {RXArray} from "../../basic/rxarray"

export class OpInput extends RXComponent{
  constructor(value='', defaultValue = ''){
    super()
    this.valueChangedHandlers = new RXArray

    this.onValueChanged = (value)=>{
      this.valueChangedHandlers.forEach((handler)=>{
        handler(value)
      })
    }
    this.value = value
    this.defaultValue = defaultValue
  }

  isShowingDefault(){
    return this.defaultValue == this.value
  }

  listenValueChaged(callback){
    this.valueChangedHandlers.add(callback)
  }

  offValueChaged(callback){
    this.valueChangedHandlers.remove(callback)
  }

  hasValue(value){
    return this.value === value
  }
} 