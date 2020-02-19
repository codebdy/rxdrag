import {RXElement} from "../../rxelement"
import {addonRowGutters} from "../../schemas/row/gutters"
import {addonRowJustifyContent} from "../../schemas/row/justify-content"
import {addonRowAlignItems} from "../../schemas/row/align-items"

export class BSRow extends RXElement{
  constructor(parent) {
    super()
    this.toolboxInfo.groupId = 'groupLayout'
    this.toolboxInfo.elementId = 'row'
    this.toolboxInfo.elementName = "Row"
    this.className = 'BSRow'
    this.heightDropMargin = 15;
    this.acceptedChildren=['BSCol','BSW100']
    this.label = "Row"

    this.$meta.baseClass = 'row' 
    this.editMarginStyle.margin = "0"

    //this.groups.

    this.groups.rowOptions = {
      label:'Row Options'
    }
    
    addonRowGutters(this)
    addonRowJustifyContent(this)
    addonRowAlignItems(this)
  }
 
  make(){
    return new BSRow
  }

  clone(){
    let copy = super.clone()
    copy.$meta.baseClass = this.$meta.baseClass
    return copy
  }
 
/*  toViewModel(){
    let model = super.toViewModel()
    return model
  }*/

  metaToModel(model){
    model.classList.push(this.$meta.baseClass)
  }
}
