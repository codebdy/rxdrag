import {RXComponent} from "../../basic/rxcomponent"
import {ObjectState} from "../../basic/object-state"
import {OpInput} from "./input"

export class OptionRow extends RXComponent{
  constructor(){
    super()
    this.cssClass('option-row')
  }

  addRowLabel(rowLabel){
    this.rowLabel = rowLabel
    this.pushChild(rowLabel)
    return this
  }

  addInput(input){
    this.pushChild(input)
    input.listenDifferentFromDefault(()=>{
      this.cssClass('no-default')
    })

    input.listenSameToDefault(()=>{
      this.removeCssClass('no-default')
    })
    return this
  }

}

export class OptionRowLabel extends RXComponent{
  constructor(label){
    super()
    this.cssClass('option-row-label')
    this.innerHTML = label
  }
}

export class OptionRowGroup extends OpInput{
  constructor(isShowSub = false){
    super()
    this.cssClass('option-row-group')
    this.body = new OptionRowGroupBody
    this.pushChild(this.body)
    if(!isShowSub){
      this.cssClass('sub-row-collapse')
    }
  }

  addFirstRow(row){
    row.rowLabel.cssClass('dropdown')
    this.firstRow = row
    this.unshiftChild(row)

    row.rowLabel.domOn('click',()=>{
      this.tongle('sub-row-collapse')
    })

    return this
  }

  addRow(row){
    row.rowLabel.cssClass('sub-label')
    this.body.pushChild(row)
    return this
  }
}

class OptionRowGroupBody extends RXComponent{
  constructor(){
    super()
    this.cssClass('option-row-group-body')
  }
}
