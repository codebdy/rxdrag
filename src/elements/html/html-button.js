import {RXElement} from "../rxelement"
//import {addonUtilBorder} from "../schemas/utilities/border"


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
  }

  make(){
    return new HTMLButton
  }
 
 
}
