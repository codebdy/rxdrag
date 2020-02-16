import {RXElement} from "../rxelement"
import {addonFluid} from "../schemas/container/fluid"

export class BSContainer extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupContainer'
    this.toolboxInfo.elementId = 'container'
    this.toolboxInfo.elementName = "Container"
    this.className = 'BSContainer'
    this.heightDropMargin = 15;
    this.acceptedChildren=['BSRow','BSContainer', 'HTMLDiv']

    //this.$meta.baseClass = 'container'

    this.groups.containerOptions = {
      label:'Container Options'
    }

    addonFluid(this)
    /*this.$schema.fields.baseClass = {
      label:'Fluid',
      widget:'OpSwitch',
      required:true,
      group:'containerOptions',
      onValue:'container-fluid',
      offValue:'container',
      defaultValue:'container',
    }*/
     
    //super.addBorder()
    //super.addMargin()
    //super.addPadding()
  }

  make(){
    return new BSContainer
  }
  
  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Container"
    //model.classList.push(this.$meta.baseClass)
    return model
  }
}
