import {RXElement} from "../../rxelement"
//import {addonFluid} from "../../schemas/container/fluid"
//import {addonUtilColor} from "../../schemas/utilities/color"
//import {addonUtilBorder} from "../../schemas/utilities/border"

export class BSHeading extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupContent'
    this.toolboxInfo.elementId = 'bsHeading'
    this.toolboxInfo.elementName = "Heading"
    this.className = 'BSHeading'

    this.groups.headingOptions = {
      label:'Heading Options'
    }
    this.$meta.tag = 'h2'
    this.label = "Heading"

    //addonFluid(this)
    //addonUtilColor(this)
    //addonUtilBorder(this)
  }

  make(){
    return new BSHeading
  }
  
  toViewModel(){
    let model = super.toViewModel()
    //model.label.text = "Heading"
    model.innerHTML = 'Heading'
    model.attributes.contentEditable = true
    model.on.onkeydown = (event)=>{
      if (event.keyCode === 13) {
        event.preventDefault()
        return false
      }
    }
    model.on.onfocus = (event)=>{
      rxEditor.miniEditbar.show(this.view.$dom)
    }
    return model
  }
}
