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

    this.$meta.baseClass = 'container'

    this.$schema.baseClass={
      label:'Class',
      widget:'OpSelect',
      required:true,
      group:'layout',
      list:{
        container:'container',
        'container-fluid':'container-fluid',
      }
    } 
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
