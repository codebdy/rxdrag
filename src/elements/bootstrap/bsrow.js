import {RXElement} from "../rxelement"
import hAlign from "../schemas/row/row-h-align"
import vAlign from "../schemas/row/row-v-align"
import responsiveMeta from "../schemas/responsive"

export class BSRow extends RXElement{
  constructor(parent) {
    super()
    this.toolboxInfo.groupId = 'groupGrid'
    this.toolboxInfo.elementId = 'row'
    this.toolboxInfo.elementName = "Row"
    this.className = 'BSRow'
    this.heightDropMargin = 15;
    this.acceptedChildren=['BSCol','BSW100']

    this.$meta.baseClass = 'row' 
    this.editMarginStyle.margin = "0"


    this.$schema.groups = {
      'rowOptions':{
        label:'Row Options'
      }
    }
    this.$meta.gutters = ''
    this.$meta.hAlign =  Object.assign({}, responsiveMeta)
    this.$meta.vAlign =  Object.assign({}, responsiveMeta)

    this.$schema.fields.gutters = {
        label:'Gutters',
        widget:'OpSwitch',
        required:true,
        group:'rowOptions',
        onValue:'',
        offValue:'no-gutters',
        defaultValue:'',
      }//<----gutters

    this.$schema.fields.hAlign = hAlign
    this.$schema.fields.vAlign = vAlign

    super.addBorder()
    super.addMarginAuto()
    super.addMargin()
    super.addPadding()
  }
 
  make(){
    return new BSRow
  }

  clone(){
    let copy = super.clone()
    copy.$meta.gutters = this.$meta.gutters

    super.copyMetaTo(this.$meta.hAlign, copy.$meta.hAlign)
    super.copyMetaTo(this.$meta.vAlign, copy.$meta.vAlign)

    return copy
  }
 
  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Row"
    model.classList.push(this.$meta.baseClass)
    model.classList.push(this.$meta.gutters)

    super.metaFieldToViewModel(model, this.$meta.hAlign)
    super.metaFieldToViewModel(model, this.$meta.vAlign)

    return model
  }
}
