import {RXElement} from "../../rxelement"
import {addonWidth} from "../../schemas/column/col-width"
import {addonOffset} from "../../schemas/column/col-offset"
import {addonAlignSelf} from "../../schemas/column/col-align-self"
import {addonOrder} from "../../schemas/column/col-order"
import {addonUtilMarginAuto} from "../../schemas/column/margin-auto"

export class BSCol extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupLayout'
    this.toolboxInfo.elementId = 'column'
    this.toolboxInfo.elementName = "Column"
    this.className = 'BSCol'
    this.widthDropMargin = 15;
    this.acceptedChildren=['BSRow','BSContainer', 'HTMLDiv']
    this.groups.columnOptions = {
      label:'Column Options'
    }

    addonWidth(this)
    addonOffset(this)
    addonAlignSelf(this)
    addonOrder(this)
    addonUtilMarginAuto(this)
    this.setDefaultWidth()
  }

  setDefaultWidth(){
    if(window.rxEditor){
      let width = window.rxEditor.state.screenWidth
      if(width == 'xs'){
        this.$meta.colWidth.xs = 'col'
        return
      }
      
      this.$meta.colWidth[width] = 'col-' + width
      return
    }
    this.$meta.colWidth.md = 'col-md'
  }

  make(){
    return new BSCol
  }

  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Column"
    return model
  }
}
