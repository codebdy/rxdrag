import {RXElement} from "../rxelement"

export class HTMLHeader extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlHeader'
    this.toolboxInfo.elementName = "Header"
    this.className = 'HTMLHeader'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'header'
    this.label = "header"
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol']
  }

  make(){
    return new HTMLHeader
  }

}
