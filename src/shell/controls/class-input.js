import {OpInput} from "./input"
export class OpClassInput extends OpInput{
  constructor(value=[], defaultValue = ''){
    //console.log(value)
    super(value, defaultValue)
    this.value = value
  }

  removeSelfValue(){
    let array = this.value
    let value = this.getSelfValue()
    for (var i = 0; i < array.length; i++) {
      if(array[i] === value){
        array.splice(i, 1)
        break
      }
    }
  }
}