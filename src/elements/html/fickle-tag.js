import {RXTextfieldable} from "./textfieldable"
//import {addonTypyFickleTagstInlineItem} from "../schemas/content/list-inline-item"

export class HTMLFickleTag extends RXTextfieldable{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlFickleTag'
    this.toolboxInfo.elementName = "Fackle tag"
    this.className = 'HTMLFickleTag'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'div'
    this.label = "fackle tag"
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol']

    //addonTypyFickleTagstInlineItem(this)
  }

  make(){
    return new HTMLFickleTag
  }

}
