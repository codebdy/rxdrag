import {RXComponent} from "../../basic/rxcomponent"
import {RXArray} from "../../basic/rxarray"
import {ObjectState} from "../../basic/object-state"
import {OptionRow, RowBase, OptionResponsiveRow} from "./option-row"
import {OpLabel} from "./label"
import {getFieldMetaValue, setFiedlMetaValue} from "../class-data-extractor"


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
    schema.fields.forEach((fieldSchema)=>{
      //let fieldSchema = schema.fields[fieldName]
      let node = value
      let metaValue = getFieldMetaValue(node, fieldSchema)
      var row
      if(fieldSchema.isResponsive){
        row = new OptionResponsiveRow(metaValue, fieldSchema, fieldSchema, this.screenWidth)
      }
      else{
        row = new OptionRow(metaValue, fieldSchema, fieldSchema)
      }

      row.listenValueChaged((value, fdSchema)=>{
        setFiedlMetaValue(value, node, fdSchema)
        //this.value[fdName] = value
        this.onValueChanged(this.value)
        this.titleRow.input.setValues(this.getValuesOnLabel())
        this.updateLabelColor()
      })
      row.rowLabel.cssClass('sub-label')
      this.body.pushChild(row)
    })

    this.titleRow.input.onRemoveValue = (value)=>{
      this.body.children.forEach((row)=>{
        if(row.input.hasValue(value)){
          row.input.removeValue(value)
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
      this.titleRow.removeCssClass('changed')
    }
    else{
      this.titleRow.cssClass('changed')
    }
  }

  getValuesOnLabel(){
    let schema = this.schema
    let values = []
    schema.fields.forEach((fieldSchema)=>{
      if(fieldSchema.isResponsive){
        values.push(getFieldMetaValue(this.value, fieldSchema)[this.screenWidth])
      }
      else{
        let value = getFieldMetaValue(this.value, fieldSchema)
        if(value.constructor==Array){
          values.push.apply(values, value)
        }
        else{
          values.push(value)
        }
      }
    })
    return values
  }

}

class OptionRowGroupBody extends RXComponent{
  constructor(){
    super()
    this.cssClass('option-row-group-body')
  }
}