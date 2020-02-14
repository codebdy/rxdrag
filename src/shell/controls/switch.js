import {RXComponent} from "../../basic/rxcomponent"

export class OpSwitch extends RXComponent{
  constructor(value, fieldName){
    super()
    this.fieldName = fieldName
    this.cssClass('op-switch')
    this.value = value
    this.onValue = 'on'
    this.offValue = 'off'
    this.valueChanged=(value, fdName)=>{}
    this.domOn('onclick',()=>{
      this.changeValue()
    })

  }

  changeValue(){
    if(this.value === this.onValue){
      this.value = this.offValue
      this.removeCssClass('on')
    }
    else{
      this.value = this.onValue
      this.cssClass('on')
    }
    this.valueChanged(this.value, this.fieldName)
  }

}