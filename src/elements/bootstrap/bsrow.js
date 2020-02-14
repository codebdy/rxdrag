import {RXElement} from "../rxelement"
import hAlign from "../schemas/row/row-h-align"
import vAlign from "../schemas/row/row-v-align"

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
    this.$meta.hAlign = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$meta.vAlign = {xs:'', sm:'', md:'', lg:'', xl:''}

    this.$schema.fields.gutters = {
        label:'Gutters',
        widget:'OpSwitch',
        required:true,
        group:'rowOptions',
        onValue:'',
        offValue:'no-gutters',
      }//<----gutters

    this.$schema.fields.hAlign = hAlign
    this.$schema.fields.vAlign = vAlign

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

    super.metaFieldToViewModel(model, 'hAlign')
    super.metaFieldToViewModel(model, 'vAlign')

    return model
  }
}
