import {RXElement} from "../rxelement"
import {addonRowGutters} from "../schemas/row/gutters"
import {addonRowHAlign} from "../schemas/row/h-align"
import {addonRowVAlign} from "../schemas/row/v-align"

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

    //this.groups.

    this.groups.rowOptions = {
      label:'Row Options'
    }
    
    addonRowGutters(this)
    addonRowHAlign(this)
    addonRowVAlign(this)
  }
 
  make(){
    return new BSRow
  }

  clone(){
    let copy = super.clone()
    copy.$meta.baseClass = this.$meta.baseClass
    return copy
  }
 
  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Row"
    model.classList.push(this.$meta.baseClass)
    return model
  }
}
