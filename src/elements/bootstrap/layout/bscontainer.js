import {RXElement} from "../../rxelement"
import {addonFluid} from "../../schemas/container/fluid"
import {addonUtilColor} from "../../schemas/utilities/color"
import {addonUtilBorder} from "../../schemas/utilities/border"

export class BSContainer extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupLayout'
    this.toolboxInfo.elementId = 'container'
    this.toolboxInfo.elementName = "Container"
    this.className = 'BSContainer'
    this.heightDropMargin = 15;
    this.acceptedChildren=['BSRow','BSContainer', 'HTMLDiv']
    this.label = "Container"

    this.groups.containerOptions = {
      label:'Container Options'
    }

    addonFluid(this)
    addonUtilColor(this)
    addonUtilBorder(this)
  }

  make(){
    return new BSContainer
  }
  
  /*toViewModel(){
    let model = super.toViewModel()
    return model
  }*/
}
