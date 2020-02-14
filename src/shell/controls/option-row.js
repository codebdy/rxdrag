import {RXComponent} from "../../basic/rxcomponent"
import {ObjectState} from "../../basic/object-state"

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

}

export class OptionRowLabel extends RXComponent{
  constructor(label){
    super()
    this.cssClass('option-row-label')
    this.innerHTML = label
  }
}

export class OptionRowGroup extends RXComponent{
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
