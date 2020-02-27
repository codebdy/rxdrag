import {RXElement} from "../rxelement"

export class HTMLTd extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlTd'
    this.toolboxInfo.elementName = "td"
    this.className = 'HTMLTd'

    this.editMarginStyle.padding = '10px'
    //this.editMarginStyle = {}

    this.unshiftGroup({
      id:'tdOptions',
      label:'Td Options',
    })

    this.meta.tag = 'td'
    this.label = "td"
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.becomeToTextfield()
    /*addonGeneralTextfield(this)
    addonTableContextual(this, 'tdOptions')
    addonUtilColor(this)
    addonUtilText(this)*/
  }

  make(){
    return new HTMLTd
  }

}
