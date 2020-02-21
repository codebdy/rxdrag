import {RXTextfieldable} from "./textfieldable"
import {addonTypyListInlineItem} from "../schemas/content/list-inline-item"

export class HTMLLi extends RXTextfieldable{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlLi'
    this.toolboxInfo.elementName = "li"
    this.className = 'HTMLLi'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'li'
    this.label = "li"
    this.acceptedChildren=''
    this.exceptChildren = ['BSCol']

    addonTypyListInlineItem(this)
  }

  make(){
    return new HTMLLi
  }

}
