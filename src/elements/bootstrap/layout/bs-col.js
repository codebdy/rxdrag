import {RXElement} from "../../rxelement"
import widthSchema from "../../schemas/column/col-width"
import offsetSchema from "../../schemas/column/col-offset"
import alignSelfSchema from "../../schemas/utilities/flex/align-self"
import orderSchema from "../../schemas/utilities/flex/order"
import marginAutoSchema from "../../schemas/utilities/flex/margin-auto"

export class BSCol extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupLayout'
    this.toolboxInfo.elementId = 'column'
    this.toolboxInfo.elementName = "Column"
    this.className = 'BSCol'
    this.widthDropMargin = 15;
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol']
    this.label = "column"

    this.unshiftGroup({
      id:'columnOptions',
      label:'Column Options',
    })

    this.addSchema(widthSchema, 'columnOptions')
    this.addSchema(offsetSchema, 'columnOptions')
    this.addSchema(alignSelfSchema, 'columnOptions')
    this.addSchema(orderSchema, 'columnOptions')
    this.addSchema(marginAutoSchema, 'columnOptions')
  }

  make(){
    return new BSCol
  }

  configSelf(){
    this.setDefaultWidth()
  }

  setDefaultWidth(){
    if(window.rxEditor){
      let width = window.rxEditor.state.screenWidth
      if(width == 'xs'){
        this.addClass('col')
      }
      else{
        this.addClass('col-' + width)
      }
    }
  }


}
