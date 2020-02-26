import {RXElement} from "../rxelement"
import {addonGeneralTextfield} from "../schemas/general/textfield"


export class HTMLButton extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlButton'
    this.toolboxInfo.elementName = "Button"
    this.className = 'HTMLButton'


    //this.groups.buttonOptions = {
    //  label:'Image Options'
    //}
    this.$meta.tag = 'button'
    this.label = "button"

    //addonFigureImg(this, 'imageOptions')
    //addonGeneralTextfield(this)
  }

  make(){
    return new HTMLButton
  }
 
 
}
