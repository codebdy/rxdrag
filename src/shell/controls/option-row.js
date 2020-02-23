import {RXComponent} from "../../basic/rxcomponent"
import {RXArray} from "../../basic/rxarray"
import {ObjectState} from "../../basic/object-state"
import {OpInput} from "./input"
import {OpSwitch} from "./switch"
import {ButtonGroup, OpButton} from "./buttons"
import {OpSelect} from "./select"
import {OpLabelsInput} from "./label"
import {OpLabelGroup} from "./label"
import {OpNameValueInput} from "./name-value"
import {OpBorderInput} from "./border-input"
import {OpImageSelect} from "./image-select"
import {OpTextField} from "./textfield"

export class RowBase extends RXComponent{
  constructor(){
    super()
    this.valueChangedHandlers = new RXArray
    this.onValueChanged = (value)=>{
      this.valueChangedHandlers.forEach((handler)=>{
        handler(value, this.fieldName)
      })
      this.updateLabelColor(this.input)
    }
  }

  listenValueChaged(callback){
    this.valueChangedHandlers.add(callback)
  }

  offValueChaged(callback){
    this.valueChangedHandlers.remove(callback)
  }

}

export class OptionRow extends RowBase{
  constructor(value, schema, fieldName){
    super()
    this.cssClass('option-row')
    this.schema = schema
    this.value = value
    this.fieldName = fieldName
    this.setLabel(schema.label)
    this.setInput(this.createInput())
  }

  setLabel(labelText){
    this.rowLabel = new OptionRowLabel(labelText)
    this.pushChild(this.rowLabel)
  }

  setInput(input){
    this.input = input
    this.pushChild(input)
    this.updateLabelColor(input)
    input.listenValueChaged((value)=>{
      this.onValueChanged(value)
    })
  }

  updateLabelColor(input){
    if(input.isShowingDefault()){
      this.removeCssClass('changed')
    }
    else{
      this.cssClass('changed')
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
    if(schema.widget ==='OpLabelsInput'){
      return new OpLabelsInput(value, this.schema)
    }
    if(schema.widget ==='OpBorderInput'){
      return new OpBorderInput(value, this.schema)
    }
    if(schema.widget ==='ButtonGroup'){
      return new ButtonGroup(value, this.schema)
    }
    if(schema.widget ==='OpTextField'){
      return new OpTextField(value, this.schema)
    }
    if(schema.widget ==='OpImageSelect'){
      return new OpImageSelect(value, this.schema)
    }
    if(schema.widget ==='OpNameValueInput'){
      return new OpNameValueInput(value, this.schema)
    }
    if(schema.widget ==='OpLabelGroup'){
      return new OpLabelGroup(value, this.schema)
    }

  }
}

export class OptionResponsiveRow extends OptionRow{
  constructor(value, schema, fieldName, screenWidth){
    super(value[screenWidth], schema[screenWidth], fieldName)
    this.screenWidth = screenWidth
    this.allValue = value
    this.allSchema = schema

    this.onValueChanged = (value)=>{
      this.valueChangedHandlers.forEach((handler)=>{
        this.allValue[this.screenWidth] = value
        handler(this.allValue, this.fieldName)
        this.updateLabelColor(this.input)
      })
    }
  }  
}

export class OptionRowLabel extends RXComponent{
  constructor(label){
    super()
    this.cssClass('option-row-label')
    this.innerHTML = label
  }
}
