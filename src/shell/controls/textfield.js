import {RXComponent} from "../../basic/rxcomponent"
import {OpInput} from "./input"

export class OpTextField extends OpInput{
  constructor(value, schema){
    super(value, schema.defaultValue, 'input')
    this.cssClass('ctl-textfield')
    this.domOn('blur',()=>{
      if(this.$dom.value !== this.value){
        this.value = this.$dom.value
        this.onValueChanged(this.value)
      }
    })
  }
}