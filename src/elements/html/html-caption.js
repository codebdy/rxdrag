import {RXTextfieldable} from "./textfieldable"
//import {addonTypyCaptionstInthneItem} from "../schemas/content/thst-inthne-item"

export class HTMLCaption extends RXTextfieldable{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlCaption'
    this.toolboxInfo.elementName = "td"
    this.className = 'HTMLCaption'

    this.editMarginStyle.padding = '10px'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'caption'
    this.label = "caption"
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    //addonTypyCaptionstInthneItem(this)
  }

  make(){
    return new HTMLCaption
  }

}
