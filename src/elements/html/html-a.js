import {RXElement} from "../rxelement"
import {RXTextfieldable} from "./textfieldable"
import {addonAHref} from "../schemas/general/ahref"
import {addonATarget} from "../schemas/general/atarget"
import {addonGeneralTitle} from "../schemas/general/title"
import {addonAlertLink} from "../schemas/components/alert/link"


export class HTMLA extends RXTextfieldable{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlA'
    this.toolboxInfo.elementName = "A"
    this.className = 'HTMLA'

    this.editMarginStyle.padding = ''


    this.groups.aOptions = {
      label:'Link Options'
    }
    this.$meta.tag = 'a'
    this.label = "a"
    this.$meta.innerHTML = "Sample Link "
    this.$meta.generalTextfield = 'contentEditable'

    addonAHref(this)
    addonATarget(this)
    addonGeneralTitle(this)
    addonAlertLink(this)
  }

  make(){
    return new HTMLA
  } 
}
