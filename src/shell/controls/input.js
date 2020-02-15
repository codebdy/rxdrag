import {RXComponent} from "../../basic/rxcomponent"
import {RXArray} from "../../basic/rxarray"

export class OpInput extends RXComponent{
  constructor(value='', defaultValue = ''){
    super()
    this.valueChangedHandlers = new RXArray
    this.differentFromDefaultHandlers = new RXArray
    this.sameToDefaultHandlers = new RXArray;

    this.onValueChanged = (value)=>{
      this.valueChangedHandlers.forEach((handler)=>{
        handler(value)
      })

      if(value === this.defaultValue){
        this.distributeSameEvent(value)
      }
      else{
        this.distributeDifferentEvent(value)
      }

    }
    this.value = value
    this.defaultValue = defaultValue
  }

  distributeSameEvent(value){
    this.sameToDefaultHandlers.forEach((handler)=>{
      handler(value)
    })
  }

  distributeDifferentEvent(value){
    this.differentFromDefaultHandlers.forEach((handler)=>{
      handler(value)
    })
  }

  listenValueChaged(callback){
    this.valueChangedHandlers.add(callback)
  }

  offValueChaged(callback){
    this.valueChangedHandlers.remove(callback)
  }

  listenDifferentFromDefault(callback){
    this.differentFromDefaultHandlers.add(callback)
  }

  offDifferentFromDefault(callback){
    this.differentFromDefaultHandlers.remove(callback)
  }

  listenSameToDefault(callback){
    this.sameToDefaultHandlers.add(callback)
  }

  offSameToDefault(callback){
    this.sameToDefaultHandlers.remove(callback)
  }

} 