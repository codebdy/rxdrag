import {RXElement} from "../rxelement"

export class IconFontAwesome extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupIcons'
    this.toolboxInfo.elementId = 'iconFontAwesome'
    this.toolboxInfo.elementName = "Font awesome"
    this.className = 'IconFontAwesome'

    this.editMarginStyle.padding = '10px'
    //this.editMarginStyle = {}

    //this.groups.tdOptions = {
    //  label:'Td Options'
    //}
    this.$meta.tag = 'i'
    this.label = "icon"
    this.acceptedChildren=[]
    this.addClass('fa')
   }

  make(){
    return new IconFontAwesome
  }

}
