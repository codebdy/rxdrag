import {RXElement} from "../../rxelement"
import {addonHeadingTag} from "../../schemas/heading/tag"
import parkMiniEditbar from "../../../core/park-mini-editbar"
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
    this.$meta.innerHTML = "Heading"
    this.label = "Heading"

    addonHeadingTag(this)
  }

  make(){
    return new BSHeading
  }
  
  toViewModel(){
    let model = super.toViewModel()

    parkMiniEditbar(model, this)

    return model
  }
}
