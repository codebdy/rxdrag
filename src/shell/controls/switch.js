import {RXComponent} from "../../basic/rxcomponent"

export class OpSwitch extends RXComponent{
  constructor(value, fieldName){
    super()
    this.fieldName = fieldName
    this.cssClass('op-switch')
    this.value = value
    this.onValue = ''
    this.offValue = ''
    this.valueChanged=(value, fdName)=>{}
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
    this.valueChanged(this.value, this.fieldName)
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