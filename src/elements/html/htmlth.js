import {RXTextfieldable} from "./textfieldable"
//import {addonTypyThstInthneItem} from "../schemas/content/thst-inthne-item"

export class HTMLTh extends RXTextfieldable{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlTh'
    this.toolboxInfo.elementName = "th"
    this.className = 'HTMLTh'

    //this.editMarginStyle.padding = ''
    this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'th'
    this.$meta.innerHTML = "TH text ..."
    this.label = "th"
    this.acceptedChildren=''
    this.exceptChildren = ['BSCol', 'HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    //addonTypyThstInthneItem(this)
  }

  make(){
    return new HTMLTh
  }

}
