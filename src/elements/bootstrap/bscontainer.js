import {BSElement} from "./bselement"

export class BSContainer extends BSElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupContainer'
    this.toolboxInfo.elementId = 'container'
    this.toolboxInfo.elementName = "Container"
    this.className = 'BSContainer'
    this.heightDropMargin = 15;
    this.acceptedChildren=['BSRow','BSContainer', 'HTMLDiv']

    this.$option.essentialClasses = ['container'] 
  }

  make(){
    return new BSContainer
  }
  
  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Container"
    return model
  }
}
