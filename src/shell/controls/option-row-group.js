import {RXComponent} from "../../basic/rxcomponent"
import {RXArray} from "../../basic/rxarray"
import {ObjectState} from "../../basic/object-state"
import {OptionRow, RowBase, OptionResponsiveRow} from "./option-row"
import {OpLabel} from "./label"


class GroupValueLabel extends OpLabel{
  constructor(labelText){
    super(labelText)
  }  
}

export class OptionRowGroup extends RowBase{
  constructor(value, schema, fieldName, screenWidth){
    super()
    this.value = value
    this.schema = schema
    this.fieldName = fieldName
    this.screenWidth = screenWidth
    this.cssClass('option-row-group')
    this.cssClass('sub-row-collapse')
    this.titleRow = new OptionRow(['tsss'], {
      label:schema.label,
      widget:'OpLabelGroup',
    })

    this.titleRow.rowLabel.cssClass('dropdown')
    this.titleRow.rowLabel.domOn('click',()=>{
      this.tongle('sub-row-collapse')
    })
    this.titleRow.input.setValues(this.getValuesOnLabel())

    this.pushChild(this.titleRow)
    this.body = new OptionRowGroupBody
    this.pushChild(this.body)

    //构造子行
    for(var fieldName in schema.fields){
      let fieldSchema = schema.fields[fieldName]
      let metaValue = value[fieldName]
      var row
      if(fieldSchema.isResponsive){
        row = new OptionResponsiveRow(metaValue, fieldSchema, fieldName, this.screenWidth)
      }
      else{
        row = new OptionRow(metaValue, fieldSchema, fieldName)
      }

      row.listenValueChaged((value, fdName)=>{
        this.value[fdName] = value
        this.onValueChanged(this.value)
        this.titleRow.input.setValues(this.getValuesOnLabel())
        this.updateLabelColor()
      })
      row.rowLabel.cssClass('sub-label')
      this.body.pushChild(row)
    }

    this.titleRow.input.onRemoveValue = (value)=>{
      this.body.children.forEach((row)=>{
        if(row.input.value === value){
          row.input.clear()
        }
      })
    }
    this.updateLabelColor()
    //if(!isShowSub){
      //this.cssClass('sub-row-collapse')
    //}
  }//

  updateLabelColor(){
    var showingDefault = true
    this.body.children.forEach((row)=>{
      if(!row.input.isShowingDefault()){
        showingDefault = false
      }
    })

    if(showingDefault){
      this.titleRow.removeCssClass('no-default')
    }
    else{
      this.titleRow.cssClass('no-default')
    }
  }

  getValuesOnLabel(){
    let schema = this.schema
    let values = []
    for(var fieldName in schema.fields){
      if(schema.fields[fieldName].isResponsive){
        values.push(this.value[fieldName][this.screenWidth])
      }
      else{
        values.push(this.value[fieldName])
      }
    }
    return values
  }

}

class OptionRowGroupBody extends RXComponent{
  constructor(){
    super()
    this.cssClass('option-row-group-body')
  }
}
