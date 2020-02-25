import {RXElement} from "../../rxelement"
import parkMiniEditbar from "../../../core/park-mini-editbar"
import {addonHeadingTag} from "../../schemas/heading/tag"
import {addonHeadingDisplay} from "../../schemas/heading/display"

export class BSHeading extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupContent'
    this.toolboxInfo.elementId = 'bsHeading'
    this.toolboxInfo.elementName = "Heading"
    this.className = 'BSHeading'

    this.editMarginStyle = {}

    this.groups.headingOptions = {
      label:'Heading Options'
    }
    this.$meta.tag = 'h2'
    this.$meta.innerHTML = "Heading"
    this.label = "heading"

    addonHeadingTag(this)
    addonHeadingDisplay(this, 'typographyOptions')
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
