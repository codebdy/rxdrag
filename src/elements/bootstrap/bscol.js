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
    this.$meta.colWidth = {xs:'', sm:'', md:'', lg:'', xl:''}
    this.$meta.colWidth.md = 'col-md'

    this.$meta.colOffset = {xs:'', sm:'', md:'', lg:'', xl:''}

    this.$meta.colAlignSelf = {xs:'', sm:'', md:'', lg:'', xl:''}

    this.$meta.colOrder = {xs:'', sm:'', md:'', lg:'', xl:''}


    this.$schema.groups = {
      'columnOptions':{
        label:'Column Options'
      }
    }

    this.$schema.fields.colWidth = colWidth
    this.$schema.fields.colOffset = colOffset
    super.addMarginAuto()
    this.$schema.fields.colAlignSelf = colAlignSelf
    this.$schema.fields.colOrder = colOrder
    super.addMargin()
    super.addPadding()

    this.$schema.fields.marginAuto.group = 'columnOptions'
  }

  make(){
    return new BSCol
  }

  clone(){
    let copy = super.clone()
    super.copyMetaTo(this.$meta.colWidth, copy.$meta.colWidth)
    super.copyMetaTo(this.$meta.colOffset, copy.$meta.colOffset)
    super.copyMetaTo(this.$meta.colAlignSelf, copy.$meta.colAlignSelf)
    super.copyMetaTo(this.$meta.colOrder, copy.$meta.colOrder)

    return copy
  }

  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Column"

    super.metaFieldToViewModel(model, this.$meta.colWidth)
    super.metaFieldToViewModel(model, this.$meta.colOffset)
    super.metaFieldToViewModel(model, this.$meta.colAlignSelf)
    super.metaFieldToViewModel(model, this.$meta.colOrder)

    return model
  }
}
