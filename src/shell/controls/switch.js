import {RXComponent} from "../../basic/rxcomponent"
import {OpClassInput} from "./class-input"

export class OpSwitch extends OpClassInput{
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
    if(this.getSelfValue() === this.onValue){
      this.setSelfValue(this.offValue)
    }
    else{
      this.setSelfValue(this.onValue)
    }
    this.onValueChanged(this.value)
  }

  updateState(){
    if(this.getSelfValue() === this.offValue){
      this.removeCssClass('on')
    }
    else{
      this.cssClass('on')
    }
  }

  getSelfValue(){
    let sAllValue = new Set([this.onValue, this.offValue])
    let intersect = this.value.filter(x => sAllValue.has(x))
    if(intersect.length > 0){
      return intersect[0]
    }
    return ''
  }

  setSelfValue(value){
    this.removeSelfValue()
    this.value = Array.from(new Set([...this.value, value]))
  }

}