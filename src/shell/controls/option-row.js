import {RXComponent} from "../../basic/rxcomponent"
import {RXArray} from "../../basic/rxarray"
import {ObjectState} from "../../basic/object-state"
import {OpInput} from "./input"
import {OpSwitch} from "./switch"
import {ButtonGroup, OpButton} from "./buttons"
import {OpSelect} from "./select"
import {OpLabelsInput} from "./label"

export class OptionRow extends RXComponent{
  constructor(value, schema, fieldName){
    super()
    this.cssClass('option-row')
    this.schema = schema
    this.value = value
    this.fieldName = fieldName

    this.valueChangedHandlers = new RXArray

    this.onValueChanged = (value)=>{
      this.valueChangedHandlers.forEach((handler)=>{
        handler(value, this.fieldName)
      })
    }

    this.setLabel(schema.label)
    this.setInput(this.createInput())
  }

  setLabel(labelText){
    this.rowLabel = new OptionRowLabel(labelText)
    this.pushChild(this.rowLabel)
  }

  setInput(input){
    this.pushChild(input)
    input.listenValueChaged((value)=>{
      this.onValueChanged(value)
      this.updateLabelColor(input)
    })

    /*input.listenDifferentFromDefault(()=>{
      this.cssClass('no-default')
    })

    input.listenSameToDefault(()=>{
      this.removeCssClass('no-default')
    })

    if(input.isShowingDefault){
      this.removeCssClass('no-default')
    }
    else{

    }*/
  }

  updateLabelColor(input){
    if(input.isShowingDefault){
      this.removeCssClass('no-default')
    }
    else{
      this.cssClass('no-default')
    }
  }

  createInput(){
    let schema = this.schema
    let value = this.value
    if(schema.widget ==='OpSelect'){
      return new OpSelect(value, schema)
    }
    if(schema.widget ==='OpSwitch'){
      return new OpSwitch(value, schema)
    }
  }

  listenValueChaged(callback){
    this.valueChangedHandlers.add(callback)
  }

  offValueChaged(callback){
    this.valueChangedHandlers.remove(callback)
  }

}

/*export class OptionRowForResponsive extends OptionRow{
  constructor(value, schema, fieldName){
    super(value, schema, fieldName)
  }

  getSchema(){
    return this.schema.sm
  }

  getValue(){
    return this.value.sm
  }

}*/

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
