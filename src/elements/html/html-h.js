import {RXElement} from "../rxelement"
//import parkMiniEditbar from "../../../core/park-mini-editbar"
import {addonHeadingTag} from "../schemas/heading/tag"
import {addonHeadingDisplay} from "../schemas/heading/display"
//import {addonUtilBorder} from "../../schemas/utilities/border"

export class HTMLH extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlH'
    this.toolboxInfo.elementName = "H(1~6)"
    this.className = 'HTMLH'

    //this.editMarginStyle = {}

    this.groups.headingOptions = {
      label:'Heading Options'
    }
    this.$meta.tag = 'h2'
    //this.$meta.innerHTML = "Heading"
    this.label = "Heading"

    this.acceptedChildren=['HTMLDiv', 'HTMLSmall', 'HTMLSpan']

    addonHeadingTag(this, 'typographyOptions')
    addonHeadingDisplay(this, 'typographyOptions')
  }

  make(){
    return new HTMLH
  }
  
  /*toViewModel(){
    let model = super.toViewModel()

    parkMiniEditbar(model, this)
    return model
  }*/
}
