import {RXComponent} from "../../basic/rxcomponent"
import {RXArray} from "../../basic/rxarray"
import {ObjectState} from "../../basic/object-state"
import {OptionRow} from "./option-row"


export class OptionRowGroup extends RXComponent{
  constructor(schema){
    super()
    this.cssClass('option-row-group')
    this.body = new OptionRowGroupBody
    this.pushChild(this.body)
    if(!isShowSub){
      this.cssClass('sub-row-collapse')
    }
  }

}

class OptionRowGroupBody extends RXComponent{
  constructor(){
    super()
    this.cssClass('option-row-group-body')
  }
}
