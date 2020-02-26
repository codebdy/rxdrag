import {RXComponent} from "../../basic/rxcomponent"
import {OpInput} from "./input"

export class OpSwitch extends OpInput{
  constructor(value, schema){
    super(value, schema.defaultValue)
    this.cssClass('op-switch')
    this.onValue = schema.onValue
    this.offValue = schema.offValue

    this.domOn('click',()=>{
      this.changeValue()
      this.updateState()
    })
  }

  render(parentDomElement){
    this.updateState()
    return super.render(parentDomElement)
  }

  changeValue(){
    if(this.value === this.onValue){
      this.value = this.offValue
    }
    else{
      this.value = this.onValue
    }
    this.onValueChanged(this.value)
  }

  updateState(){
    if(this.value === this.offValue){
      this.removeCssClass('on')
    }
    else{
      this.cssClass('on')
    }
  }

  removeValue(value){
    this.value = this.defaultValue
    this.onValueChanged(this.value)
    this.updateState()
  }

}