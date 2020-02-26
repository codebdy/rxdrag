import {RXElement} from "../../rxelement"
import guttersSchema from "../../schemas/row/gutters"
import justifyContentSchema from "../../schemas/utilities/flex/justify-content"
import alignItemsSchema from "../../schemas/utilities/flex/align-items"

export class BSRow extends RXElement{
  constructor(parent) {
    super()
    this.toolboxInfo.groupId = 'groupLayout'
    this.toolboxInfo.elementId = 'row'
    this.toolboxInfo.elementName = "Row"
    this.className = 'BSRow'
    this.heightDropMargin = 15;
    this.acceptedChildren=['BSCol','BSW100']
    this.label = "row"

    this.editMarginStyle.margin = "0"

    this.unshiftGroup({
      id:'rowOptions',
      label:'Row Options',
    })

    this.addClass('row')
    this.addSchema(guttersSchema, 'rowOptions')
    this.addSchema(justifyContentSchema, 'rowOptions')
    this.addSchema(alignItemsSchema, 'rowOptions')
  }
 
  make(){
    return new BSRow
  }
}
