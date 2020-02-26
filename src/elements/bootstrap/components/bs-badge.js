import {RXElement} from "../../rxelement"
import parkMiniEditbar from "../../../core/park-mini-editbar"
import {HTMLSpan} from "../../html/html-span"
import {HTMLA} from "../../html/html-a"
import {BSCloseButton} from "./bs-close-button"
import {addonBadgeContextual} from "../../schemas/components/badge/contextual"
import {addonBadgePill} from "../../schemas/components/badge/pill"
import {addonBadgeLink} from "../../schemas/components/badge/link"
import {addonAHref} from "../../schemas/general/ahref"
import {addonATarget} from "../../schemas/general/atarget"
import {addonGeneralTitle} from "../../schemas/general/title"


export class BSBadge extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsBadge'
    this.toolboxInfo.elementName = "Badge"
    this.className = 'BSBadge'

    this.editMarginStyle.padding = ''
    //this.editMarginStyle = {}

    this.unshiftGroup({
      id:'badgeOptions',
      label:'Badge Options',
    })

    this.$meta.tag = 'span'
    this.$meta.baseClass = 'badge' 
    this.label = "badge"
    this.acceptedChildren=[]

    /*addonBadgeContextual(this)
    addonBadgePill(this)
    addonBadgeLink(this)
    addonAHref(this, 'badgeOptions')
    addonATarget(this, 'badgeOptions')
    addonGeneralTitle(this, 'badgeOptions')*/
  }

  make(){
    return new BSBadge
  }

  toViewModel(){
    let model = super.toViewModel()
    parkMiniEditbar(model, this)
    return model
  }
  metaToModel(model){
    model.classList.push(this.$meta.baseClass)
  }

  loadConfig(){
    this.setField('badgeContextual', 'badge-primary')
    this.setField('innerHTML', 'badge')
    return this
  }

}
