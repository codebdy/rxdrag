import {RXElement} from "../../rxelement"
import fluidSchema from "../../schemas/container/fluid"

export class BSContainer extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupLayout'
    this.toolboxInfo.elementId = 'container'
    this.toolboxInfo.elementName = "Container"
    this.className = 'BSContainer'
    this.heightDropMargin = 15;
    this.acceptedChildren= ''
    this.rejectChildren = ['BSCol']
    this.label = "container"

    this.groups.containerOptions = {
      label:'Container Options'
    }

    this.addClass('container')

    this.addSchema(fluidSchema, 'containerOptions')
  }

  make(){
    return new BSContainer
  }
}
