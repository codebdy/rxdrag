import {RXElement} from "../rxelement"

export class HTMLTr extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlTr'
    this.toolboxInfo.elementName = "tr"
    this.className = 'HTMLTr'

    this.editMarginStyle.padding = ''
    //this.editMarginStyle = {}

    this.unshiftGroup({
      id:'trOptions',
      label:'Tr Options',
    })

    this.meta.tag = 'tr'
    this.label = "tr"
    this.acceptedChildren=['HTMLTr']
    
    /*addonTrScope(this)
    addonTableContextual(this, 'trOptions')
    addonUtilColor(this)
    addonUtilText(this)*/
  }

  make(){
    return new HTMLTr
  }
}
