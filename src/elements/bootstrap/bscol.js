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

    this.$meta.baseClass = ['col'] 
    this.$meta.size = {
      xs:'col',
      sm:'',
      md:'',
      lg:'',
      xl:'',
    }
  }

  make(){
    return new BSCol
  }

  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Column"
    model.classList.push.apply(model.classList, this.$meta.baseClass)
    //model.attributes.contentEditable = false
    return model
  }
}
