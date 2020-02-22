import {RXElement} from "../rxelement"

export class HTMLNav extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlNav'
    this.toolboxInfo.elementName = "Nav"
    this.className = 'HTMLNav'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'nav'
    this.label = "nav"
    this.acceptedChildren=['HTMLLi','HTMLdiv', 'HTMLSpan']
}

  make(){
    return new HTMLNav
  }
}
