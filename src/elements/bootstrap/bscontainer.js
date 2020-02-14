import {RXElement} from "../rxelement"

export class BSContainer extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupContainer'
    this.toolboxInfo.elementId = 'container'
    this.toolboxInfo.elementName = "Container"
    this.className = 'BSContainer'
    this.heightDropMargin = 15;
    this.acceptedChildren=['BSRow','BSContainer', 'HTMLDiv']

    this.$meta.baseClass = 'container'

    this.$schema.groups = {
      'containerOptions':{
        label:'Container Options'
      }
    }
    this.$schema.fields.baseClass = {
      label:'Fluid',
      widget:'OpSwitch',
      required:true,
      group:'containerOptions',
      onValue:'container-fluid',
      offValue:'container',
      defaultValue:'container',
    }
     
    super.addMargin()
    super.addPadding()
  }

  make(){
    return new BSContainer
  }
  
  clone(){
    let copy = super.clone()
    copy.$meta.baseClass = this.$meta.baseClass
    return copy
  }

  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Container"
    model.classList.push(this.$meta.baseClass)
    return model
  }
}
