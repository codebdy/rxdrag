import {RXTextfieldable} from "./textfieldable"
import {addonTableContextual} from "../schemas/table/contextual"
import {addonUtilColor} from "../schemas/utilities/color"
import {addonUtilText} from "../schemas/utilities/text"

export class HTMLTh extends RXTextfieldable{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlTh'
    this.toolboxInfo.elementName = "th"
    this.className = 'HTMLTh'

    //this.editMarginStyle.padding = ''
    this.editMarginStyle = {}

    this.groups.thOptions = {
      label:'Paragraph Options'
    }
    this.$meta.tag = 'th'
    this.$meta.innerHTML = "TH text ..."
    this.label = "th"
    this.acceptedChildren=''
    this.exceptChildren = ['BSCol', 'HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    addonTableContextual(this, 'thOptions')
    addonUtilColor(this)
    addonUtilText(this)
  }

  make(){
    return new HTMLTh
  }

}
