import {RXComponent} from "../../basic/rxcomponent"
import {OpInput} from "./input"

export class OpSwitch extends OpInput{
  constructor(value, fieldName){
    super(value, fieldName)
    this.cssClass('op-switch')
    this.onValue = ''
    this.offValue = ''
    //this.valueChanged=(value, fdName)=>{}
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
    this.onValueChanged(this.value, this.fieldName)
  }

  updateState(){
    if(this.value === this.offValue){
      this.removeCssClass('on')
    }
    else{
      this.cssClass('on')
    }
  }

}