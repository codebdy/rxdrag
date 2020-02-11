import {BSElement} from "./bselement"

export class BSRow extends BSElement{
  constructor(parent) {
    super()
    this.toolboxInfo.groupId = 'groupGrid'
    this.toolboxInfo.elementId = 'row'
    this.toolboxInfo.elementName = "Row"
    this.className = 'BSRow'
    this.heightDropMargin = 15;
    this.acceptedChildren=['BSCol']
  }
 
  make(){
    return new BSRow
  }
 
  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Row"
    model.styles.margin = "0"
    model.classList.push('row')
    return model
  }
}
