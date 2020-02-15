import {RXElement} from "../rxelement"
import colWidth from "../schemas/column/col-width"
import colOffset from "../schemas/column/col-offset"
import colAlignSelf from "../schemas/column/col-align-self"
import colOrder from "../schemas/column/col-order"

export class BSCol extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupGrid'
    this.toolboxInfo.elementId = 'column'
    this.toolboxInfo.elementName = "Column"
    this.className = 'BSCol'
    this.widthDropMargin = 15;
    this.acceptedChildren=['BSRow','BSContainer', 'HTMLDiv']

    //this.$meta.baseClass = ['col'] 
    this.$meta.width = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$meta.width.md = 'col-md'

    this.$meta.offset = {xs:'', sm:'', md:'', lg:'', xl:''}

    this.$meta.alignSelf = {xs:'', sm:'', md:'', lg:'', xl:''}

    this.$meta.order = {xs:'', sm:'', md:'', lg:'', xl:''}


    this.$schema.groups = {
      'columnOptions':{
        label:'Column Options'
      }
    }

    this.$schema.fields.width = colWidth
    this.$schema.fields.offset = colOffset
    this.$schema.fields.alignSelf = colAlignSelf
    this.$schema.fields.order = colOrder
    super.addMargin()
    super.addPadding()
  }

  make(){
    return new BSCol
  }

  clone(){
    let copy = super.clone()
    super.copyMetaTo(this.$meta.width, copy.$meta.width)
    super.copyMetaTo(this.$meta.offset, copy.$meta.offset)
    super.copyMetaTo(this.$meta.alignSelf, copy.$meta.alignSelf)
    super.copyMetaTo(this.$meta.order, copy.$meta.order)

    return copy
  }

  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Column"

    super.metaFieldToViewModel(model, this.$meta.width)
    super.metaFieldToViewModel(model, this.$meta.offset)
    super.metaFieldToViewModel(model, this.$meta.alignSelf)
    super.metaFieldToViewModel(model, this.$meta.order)

    return model
  }
}
