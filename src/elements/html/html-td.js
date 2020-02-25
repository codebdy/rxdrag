import {RXElement} from "../rxelement"
import {addonTableContextual} from "../schemas/table/contextual"
import {addonUtilColor} from "../schemas/utilities/color"
import {addonUtilText} from "../schemas/utilities/text"
import {addonGeneralTextfield} from "../schemas/general/textfield"

export class HTMLTd extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlTd'
    this.toolboxInfo.elementName = "td"
    this.className = 'HTMLTd'

    this.editMarginStyle.padding = '10px'
    //this.editMarginStyle = {}

    this.groups.tdOptions = {
      label:'Td Options'
    }
    this.$meta.tag = 'td'
    this.label = "td"
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.becomeToTextfield()
    addonGeneralTextfield(this)
    addonTableContextual(this, 'tdOptions')
    addonUtilColor(this)
    addonUtilText(this)
  }

  make(){
    return new HTMLTd
  }

}
