import {RXComponent} from "../../basic/rxcomponent"
import {RXArray} from "../../basic/rxarray"

export class OpInput extends RXComponent{
  constructor(value='', fieldName){
    super()
    this.valueChangedHandlers = new RXArray
    this.differentFromDefaultHandlers = new RXArray
    this.sameToDefaultHandlers = new RXArray;

    this.onValueChanged = (value, fieldName)=>{
      this.valueChangedHandlers.forEach((handler)=>{
        handler(value, fieldName)
      })

      if(value === this.defualtValue){
        this.distributeSameEvent(value, fieldName)
      }
      else{
        this.distributeDifferentEvent(value, fieldName)
      }

    }
    this.value = value
    this.fieldName = fieldName
    this.defualtValue = ''
  }

  setDefaultValue(defualtValue){
    this.defualtValue = defualtValue
    if(defualtValue !== this.value){
       this.distributeDifferentEvent(this.value, this.fieldName)
    }
  }

  distributeSameEvent(value, fieldName){
    this.sameToDefaultHandlers.forEach((handler)=>{
      handler(value, fieldName)
    })
  }

  distributeDifferentEvent(value, fieldName){
    this.differentFromDefaultHandlers.forEach((handler)=>{
      handler(value, fieldName)
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