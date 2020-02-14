import {RXComponent} from "../../basic/rxcomponent"
import {RXArray} from "../../basic/rxarray"

export class OpInput extends RXComponent{
  constructor(value, fieldName){
    super()
    this.valueChangedHandlers = new RXArray

    this.onValueChanged = (value, fieldName)=>{
      this.valueChangedHandlers.forEach((handler)=>{
        handler(value, fieldName)
      })
    }
    this.value = value
    this.fieldName = fieldName
  }

  listenValueChaged(callback){
    this.valueChangedHandlers.add(callback)
  }

  offValueChaged(callback){
    this.valueChangedHandlers.remove(callback)
  }

} 