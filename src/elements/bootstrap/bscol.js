import {BSElement} from "./bselement"

export class BSCol extends BSElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupGrid'
    this.toolboxInfo.elementId = 'column'
    this.toolboxInfo.elementName = "Column"
    this.className = 'BSCol'
    this.widthDropMargin = 15;
    this.acceptedChildren=['BSRow','BSContainer', 'HTMLDiv']

    this.$option.essentialClasses = ['col'] 
  }

  make(){
    return new BSCol
  }

  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Column"
    //model.attributes.contentEditable = false
    return model
  }
}
