import {RXComponent} from "../../basic/rxcomponent"
import {ObjectState} from "../../basic/object-state"

export class OptionRow extends RXComponent{
  constructor(){
    super()
    this.cssClass('option-row')
  }

}

export class OptionRowLabel extends RXComponent{
  constructor(label){
    super()
    this.cssClass('option-row-label')
    this.innerHTML = label
  }

}
